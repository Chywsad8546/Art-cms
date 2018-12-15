<template>
    <div>
        <div class="articlecontentPopup">
            <ul class="uploadimg-list" v-if="uploadimgList.length > 0">
                <li v-for="uploadimgLists in uploadimgList" :class="{checked:uploadimgLists.isActive}"><img @click="selectSort(uploadimgLists)"
                        :src="uploadimgLists.url" /></li>
                <li><img @click="uplaqloadImg" src="../img/suoluetu.png" /></li>
            </ul>

            <div class="popupUploadImg" v-if="uploadimgList.length<=0">
                <Button type="primary" @click="uplaqloadImg">选择图片</Button>
                <p>支持绝大多数图片格式，单张图片最大支持5MB</p>
            </div>

            <div class="botton">
                <Button type="primary" @click="confirmxz()">确定</Button>
                <Button @click="cancelFun()">取消</Button>
            </div>
        </div>
        <Upload id="iviewUp" action="/cmsapi/sys/uploadImg" :on-success="successPreview" v-show="uploadFlag">
            <i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
        </Upload>
        <Upload id="iviewUp2" action="/cmsapi/sys/uploadImg" :on-success="successPreviewTrue" v-show="uploadFlag">
            <i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
        </Upload>
        <div class="articlePopupBack" @click="uploadImg"></div>

    </div>
</template>


<script>
export default {
    props: [
        'uploadImgMsg'
    ],
    data () {
        return {
            uploadimgList: [],
            uploadimgFlag: true,
            uploadFlag: false,
            selectImgSrc: ''
        };
    },
    methods: {
        confirmxz () {
            if (this.selectImgSrc) {
                this.uploadimgList.forEach(function (obj) {
                    obj.isActive = false;
                });
                this.$emit('child-event', this.selectImgSrc);
                this.selectImgSrc = '';
            } else {
                this.$Notice.warning({
                    title: '请选择图片'
                });
            }
        },
        cancelFun () {
            this.uploadimgList.forEach(function (obj) {
                obj.isActive = false;
            });
            this.$emit('cancel-event', '');
        },
        uplaqloadImg () {
            document.querySelector('#iviewUp input').click();
        },
        successPreview (file) {
            let fileArr = { 'url': file.data, 'isActive': false };
            this.uploadimgList.push(fileArr);
            this.$emit('uploadSuccess-event', file);
        },
        successPreviewTrue (file) {
            let fileArr = { 'url': file.data, 'isActive': false };
            this.uploadimgList.push(fileArr);
            this.$emit('uploadEditorSuccess-event', file);
        },
        selectSort (data) {
            this.uploadimgList.forEach(function (obj) {
                obj.isActive = false;
            });
            data.isActive = !data.isActive;
            this.selectImgSrc = data.url;
        },
        uploadImg () {
            this.$emit('backColor-event', '');
        }
    },
    watch: {
        uploadImgMsg (curVal, oldVal) {
            let fileArr = { 'url': curVal, 'isActive': false };
            this.uploadimgList.push(fileArr);
        }
    }
};
</script>
<style>
.articlecontentPopup {
  background: #fff;
  width: 568px;
  height: 408px;
  z-index: 2200;
  top: 25%;
  left: 30%;
  border: 1px solid #cccccc;
  position: fixed;
}
.articlecontentPopup .botton {
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: absolute;
  bottom: 0;
  text-align: center;
}
.uploadimg-list {
  overflow: hidden;
  list-style: none;
  padding: 0;
  border-radius: 4px;
}
.uploadimg-list li {
  float: left;
  width: 16.66%;
  text-align: center;
  height: 93px;
  line-height: 120px;
  color: #666;
  font-size: 13px;
  transition: color 0.15s linear;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-right: 10px;
  margin-bottom: 10px;
  position: relative;
}
.uploadimg-list .checked:before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url('../img/pitchImg.png');
  -moz-background-size: 40px 40px;
  background-size: 40px 40px;
  background-position: 100% 0;
  background-repeat: no-repeat;
  text-align: center;
  color: #fffacd;
}
.uploadimg-list li img {
  width: 100%;
}
.popupUploadImg {
  width: 100%;
  height: 100px;
  position: absolute;
  top: 50%;
  margin-top: -50px;
  left: 0;
  right: 0;
  text-align: center;
}
.popupUploadImg p {
  line-height: 50px;
  color: #333;
}
.articlePopupBack {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2100;
  opacity: 0.5;
  background: #000;
}
</style>
