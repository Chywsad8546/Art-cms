<template>
    <div>
        <div v-for="item in uploadList" :key="item.name">
            <template>
                <Progress :stroke-width="5" v-if="item.showProgress" :percent="item.percentage"></Progress>
                <p :v-if="preview" v-else>上传成功
                    <Button type="text" @click.native="handleRemove(item)">删除</Button>
                    <Button type="text" @click.native="handleView(item.name)">预览</Button>
                </p>
            </template>
        </div>
        <Upload v-show="show" ref="upload" :action="action" :show-upload-list="false" :default-file-list="defaultList"
                :on-success="handleSuccess" :format="['jpg','jpeg','png','gif']" :max-size="6144"
                :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload" style="display: inline-block;">
            <slot></slot>
        </Upload>
        <Modal title="预览" v-model="visible" class="img-desc">
            <img :src="imgName" v-if="visible" style="width: 100%">
        </Modal>

        <Modal ref="modal" v-model="isClip" title="图片裁剪" @on-ok="clipOk" @on-cancel="">
            <Row>
                <Col span="16">
                <div class="container-bg">
                    <div class="img-container">
                        <img id="clip_src_img" @load="srcImgLoaded" :src="clipUrl" alt="">
                        <div class="shadow-box"></div>
                        <Select-Box ref="box" :srcSize="imgSize" :ratio="ratio || 16/10" :img="clipUrl"
                                    @selectEnd="selectEnd" @selectChange="selectChange"></Select-Box>
                    </div>
                </div>
                </Col>

                <Col span="7" offset="1">
                <p>预览</p>
                <div class="pre-container">
                    <img id="clip_res_img" :src="clipUrl">
                </div>
                </Col>
            </Row>
        </Modal>

    </div>
</template>
<script>
    import api from "../../api/login";
    import SelectBox from './SelectBox.vue';

    export default {
        name: "uploadimg",
        props: {
            defaultList: {},
            citeText: {},
            type: {},
            reset: {},
            action: {},
            ratio: {default: 16 / 10},
            preview: {default: true}
        },
        components: {
            SelectBox
        },
        data() {
            return {
                // 裁剪相关数据
                file: null,
                sourceName: "",
                isClip: false,
                clipUrl: "",
                $srcImg: null,
                $resImg: null,
                $imgContainer: null,
                $preContainer: null,
                $containerBox: null,
                nw: 0,
                nh: 0,
                clipData: null,
                // ratio: 16 / 10, // 裁剪比例
                imgSize: {w: 0, h: 0},
                containerTop: 0,

                imgName: "",
                visible: false,
                uploadList: [],
                show: true
            };
        },
        mounted() {
            this.uploadList = this.$refs.upload.fileList;
            // 获取裁剪区域的相关dom元素
            this.$srcImg = this.$refs.modal.$el.querySelectorAll('#clip_src_img')[0]
            this.$resImg = this.$refs.modal.$el.querySelectorAll('#clip_res_img')[0]
            this.$imgContainer = this.$refs.modal.$el.querySelectorAll('.img-container')[0]
            this.$preContainer = this.$refs.modal.$el.querySelectorAll('.pre-container')[0]
            this.$containerBox = this.$refs.modal.$el.querySelectorAll('.container-bg')[0]
        },
        methods: {
            // ------------------裁剪相关方法--------------------
            clipOk() {
                this.file = this.dataURLtoFile(this.clipData, this.sourceName + '.jpg');
                var check = this.uploadList.length < 1;
                if (!check) {
                    this.$Notice.warning({
                        title: "最多上传1张."
                    });
                } else {
                    this.$refs.upload.post(this.file)
                }
            },
            dataURLtoFile(dataurl, sourceName) {
                var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], sourceName, {type: mime});
            },
            selectChange() {
                const rec = this.$refs.box.rec
                if (rec.w > 0 && rec.h > 0) {
                    this.updatePreview()
                }
            },
            selectEnd() {
                const rec = this.$refs.box.rec
                if (rec.w > 0 && rec.h > 0) {
                    this.clip()
                }
            },
            srcImgLoaded() {
                this.nw = this.$srcImg.naturalWidth
                this.nh = this.$srcImg.naturalHeight
                this.clearSelect()
                this.setImgSize()
                this.updatePreview()
                this.clip()
            },
            clearSelect() {
                const box = this.$refs.box
                box.clearRec()
                this.clipData = null
            },
            setImgSize() {
                // image's naturalWidth naturalHeight ratio
                const nr = this.nw / this.nh
                const scw = this.$containerBox.offsetWidth
                const sch = this.$containerBox.offsetHeight
                let rw = 0  // select box width
                let rh = 0  // select box height
                if (nr >= this.ratio) {
                    this.imgSize.w = scw
                    this.imgSize.h = scw / nr
                    this.containerTop = (sch - this.imgSize.h) / 2
                    rh = this.imgSize.h
                    rw = rh * this.ratio
                } else {
                    this.imgSize.h = sch
                    this.imgSize.w = sch * nr
                    this.containerTop = 0
                    rw = this.imgSize.w
                    rh = rw / this.ratio
                }
                this.$srcImg.setAttribute('style', `width:${this.imgSize.w}px;height:${this.imgSize.h}px;`)
                this.$imgContainer.setAttribute('style',
                    `width:${this.imgSize.w}px;height:${this.imgSize.h}px;top:${this.containerTop}px;`)
                this.$refs.box.rec = {w: rw, h: rh, l: 0, t: 0}
            },
            getComputedRec(r) {
                const cw = this.$imgContainer.offsetWidth
                const ch = this.$imgContainer.offsetHeight
                const wr = cw / this.nw
                const hr = ch / this.nh
                return {
                    l: r.l / wr, t: r.t / hr,
                    w: r.w / wr, h: r.h / hr
                }
            },
            updatePreview() {
                const rec = this.$refs.box.rec
                const pcw = this.$preContainer.offsetWidth
                const pch = this.$preContainer.offsetHeight
                const wr = pcw / rec.w
                const hr = pch / rec.h
                const w = wr * this.$imgContainer.offsetWidth
                const h = hr * this.$imgContainer.offsetHeight
                const l = -rec.l * wr
                const t = -rec.t * hr
                this.$resImg.setAttribute('style',
                    `width:${w}px;height:${h}px;top:${t}px;left:${l}px;`)
            },
            clip() {
                let rec = this.$refs.box.rec
                if (!rec.w || !rec.h) {
                    return
                }
                const bufferCanvas = document.createElement('canvas')
                const bfx = bufferCanvas.getContext('2d')
                const computedRec = this.getComputedRec(rec)
                bufferCanvas.width = computedRec.w
                bufferCanvas.height = computedRec.h
                bfx.drawImage(this.$srcImg, -computedRec.l, -computedRec.t, this.nw, this.nh)
                this.clipData = bufferCanvas.toDataURL('image/jpeg', .7)
            },
            // ------------------iview上传相关方法------------------
            handleView(name) {
                this.imgName = this.$imgurl(name, "agent400x300");
                this.visible = true;
            },
            handleRemove(file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                this.show = true;
            },
            handleSuccess(response, file) {
                this.show = false;
                if (this.type == "IDcard") {
                    file.name = response.data.imgUrl;
                    file.url = this.$imgurl(response.data.imgUrl, 'agent400x300');
                    this.$emit("uploadIDimg", {
                        fileName: response.data.fileName
                    });
                } else if (this.type == "bsCard") {
                    file.url = this.$imgurl(response.data.key, "agent400x300");
                    file.name = response.data.key;
                    this.$emit("uploadimg", {
                        url: response.data.key
                    });
                } else {
                    this.$emit("uploadimg", {
                        response, file
                    });
                }
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: "文件格式错误",
                    desc: "请上传jpg/jpeg/png/gif格式的文件"
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: "图片大小超标",
                    desc: "请上传2M以内的图片."
                });
            },
            handleBeforeUpload(file) {
                console.log(file);

                this.sourceName = file.name
                let fr = new FileReader();
                let that = this;
                fr.onload = function () {
                    that.isClip = true;
                    that.clipUrl = fr.result;
                }
                fr.readAsDataURL(file);
                return false;
            }
        },
        watch: {
            reset: function (val, oldVal) {
                if (val) {
                    this.$refs.upload.fileList.pop()
                    this.show = true
                }
            }
        }
    };
</script>
<style scoped>
    /* .demo-upload-list {
      display: inline-block;
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
      margin-right: 4px;
    }

    .demo-upload-list img {
      width: 100%;
      height: 100%;
    }

    .demo-upload-list-cover {
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
      display: block;
    }

    .demo-upload-list-cover i {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
    }

    .img-desc {
      position: relative;
      display: block;
    }
    .img-desc cite {
      background: #111;
      filter: alpha(opacity=55);
      opacity: 0.3;
      color: red;
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      padding: 10px;
      height: 44px;
      font-size: 14px;
      text-align: center;
    } */

    /* 裁剪样式 */
    .container-bg {
        width: 320px;
        /* height: 200px; */
        background-color: #000;
        border-radius: 4px;
    }

    .img-container .shadow-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }

    .img-container {
        position: relative;
        /* height:100%; */
        width: 100%;
        margin: auto;
    }

    .img-container img {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .pre-container {
        overflow: hidden;
        width: 128px;
        height: 80px;
        border-radius: 4px;
    }

    .pre-container img {
        position: relative;
        height: 100%;
        width: 100%;
        border-radius: 4px;
    }
</style>
