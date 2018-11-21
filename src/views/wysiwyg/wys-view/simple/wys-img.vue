<template>
    <Form :label-width="80" class="imgWidthCont">
        <Tabs>

            <TabPane label="内容">

                <FormItem label="" prop="title">
                    <div class="demo-upload-list" v-for="item in share.uploadList">
                        <img :src="item.url">

                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </div>
                    <FormItem v-if="share.uploadList.length>0">
                        当前图片尺寸: {{share.imgInformation}}
                    </FormItem>
                    <FormItem v-if="share.uploadList.length == 0">
                        <Upload ref="upload" class="uploadWidth" action="cmsapi/upload/uploadimgNoDomainExt"
                            :default-file-list="share.defaultList" :format="['jpg','jpeg','png']" :on-success="uploadSuccess"
                            :on-format-error="uploadFormatError" :show-upload-list="false">
                            <Button type="ghost">添加图片</Button>
                        </Upload>
                    </FormItem>
                </FormItem>
                <FormItem label="标签">
                    <Input v-model="share.label"></Input>
                </FormItem>

                <Modal title="View Image" v-model="visible">
                    <img :src="imgUrl" v-if="visible" style="width: 100%">
                </Modal>

            </TabPane>
            <TabPane label="样式">
                <FormItem label="标签位置">
                    <Select v-model="share.position">
                        <Option value="text-label-0">左上</Option>
                        <Option value="text-label-1">顶部</Option>
                        <Option value="text-label-2">右上</Option>
                        <Option value="text-label-3">左下</Option>
                        <Option value="text-label-4">底部</Option>
                        <Option value="text-label-5">右下</Option>
                    </Select>
                </FormItem>
                <FormItem label="顶">
                    <Slider v-model="share.imgTop" show-input></Slider>
                </FormItem>
                <FormItem label="右">
                    <Slider v-model="share.imgRight" show-input></Slider>
                </FormItem>
                <FormItem label="底">
                    <Slider v-model="share.imgBottom" show-input></Slider>
                </FormItem>
                <FormItem label="左">
                    <Slider v-model="share.imgLeft" show-input></Slider>
                </FormItem>
            </TabPane>

        </Tabs>
    </Form>
</template>

<script>
export default {
    name: 'wys-img',
    data () {
        return {
            share: {
                imgTop: 0,
                imgRight: 0,
                imgBottom: 0,
                imgLeft: 0,
                image: 'http://wap-qn.toutiaofangchan.com/tpzw_image.png',
                defaultList: [],
                uploadList: [],
                imgInformation: '',
                label: '',
                position: 'text-label-1'
            },
            imgUrl: '',
            visible: false
        };
    },
    methods: {
        uploadSuccess (res, file) {
            if (res.code === 'success') {
                this.share.uploadList.push({ name: file.name, url: res.data.url });
                // 创建对象
                var img = new Image();

                // 改变图片的src
                img.src = res.data.url;
                var that = this;
                // 加载完成执行
                img.onload = function () {
                    that.share.imgInformation = img.width + 'px*' + img.height + 'px';
                };
            } else {
                this.$Notice.error({
                    title: '上传失败',
                    desc: res.data.url
                });
            }
        },
        uploadFormatError (file) {
            this.$Notice.error({
                title: '不能上传此格式的文件',
                desc: ''
            });
        },
        handleView (imgUrl) {
            this.imgUrl = imgUrl;
            this.visible = true;
        },
        handleRemove (file) {
            let index = this.share.uploadList.indexOf(file);
            this.share.uploadList.splice(index, 1);
        }
    },
    created: function () {
        // console.log('created',this.$options.customOption,this.$options.wysdocs,this.$options) // => 'foo'
    },
    mounted () {
        // console.log(this.$refs.upload.fileList);
        // this.uploadList = this.$refs.upload.fileList;
    }
};
</script>

<style scoped>
.uploadWidth button {
  width: 300px;
}
.demo-upload-list {
  display: inline-block;
  width: 279px;
  height: 176px;
  text-align: center;
  line-height: 176px;
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
.imgWidthCont {
  width: 95%;
}
</style>

<stage-template>
<section style="padding: {{@share.imgTop}}px {{@share.imgRight}}px {{@share.imgBottom}}px {{@share.imgLeft}}px;">
    {{if share.uploadList==0}}
         <div class="image-con" style="position: relative;">
            <img style="width:100%" id="{{@ share.brickid}}" src="http://wap-qn.toutiaofangchan.com/tpzw_image.png"/>
            {{if share.label!=""}}
                <span class="image-text {{@ share.position}}">{{@ share.label}}</span>
            {{/if}}
         </div>
    {{/if}}
    {{each share.uploadList}}
        <div class="image-con" style="position: relative;">
            <img style="width:100%" id="{{@ share.brickid}}" src="{{$value.url}}"/>
            {{if share.label!=""}}
                <span class="image-text {{@ share.position}}">{{@ share.label}}</span>
            {{/if}}
        </div>
    {{/each}}
</section>
</stage-template>
<stage-javascript type="text/javascript">

</stage-javascript>
<stage-css>
    body,html{
        padding:0;
        margin:0;
    }
    .image-text {
        position: absolute;
    }
    .image-con .text-label-0, .image-con .text-label-1, .image-con .text-label-2, .image-con .text-label-3, .image-con .text-label-4, .image-con .text-label-5 {
        font-size: 12px;
        color: #fff;
        background-color: rgba(0,0,0,.3);
        padding: 5px;
    }
    .image-con span {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        line-height: 1.5;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-text-size-adjust: none;
        display: inline-block;
    }
    .text-label-1 {
        width: 100%;
        left: 0;
        top: 0;
        text-align: center;
        padding-left: 10px;
        box-sizing: border-box;
    }
    .text-label-0 {
        width: auto;
        left: 0;
        top: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 5px 10px;
    }
    .text-label-2 {
        right: 0;
        top: 0;
        text-align: right;
        padding-right: 10px;
    }
    .text-label-3 {
        left: 0;
        bottom: 0;
        padding-left: 10px;
    }
    .text-label-4 {
        width: 100%;
        left: 0;
        bottom: 0;
        text-align: center;
        box-sizing: border-box;
    }
    .text-label-5 {
        width: auto;
        right: 0;
        bottom: 0;
        text-align: right;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 10px;
    }
</stage-css>