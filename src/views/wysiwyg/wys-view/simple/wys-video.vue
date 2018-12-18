<template>
  <Form :label-width="60" class="imgWidthCont">
    <Tabs>
      <TabPane label="内容">
        <div v-for="item,index in share.uploadList">
          <div class="demo-upload-list">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
          </div>
          <FormItem label="大小">
            <div>{{share.videoSize}}M</div>
          </FormItem>
          <FormItem label="标签">
            <Input v-model="share.httpUrl"></Input>
          </FormItem>
        </div>
        <Upload v-if="share.uploadList <= 0 && !share.isloading" ref="upload" class="uploadWidth" action="/cmsapi/cmsapi/sys/uploadVideo"
          :format="['mp4','rm','rmvb','wma','avi']" :on-success="uploadSuccess" :on-format-error="uploadFormatError"
          :show-upload-list="false">
          <Button type="ghost">添加视频</Button>
        </Upload>

        <Col v-if="share.isloading" class="demo-spin-col" span="8">
        <Spin fix>
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
        </Col>

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
        <FormItem label="上边距">
          <Slider v-model="share.imgTop" show-input></Slider>
        </FormItem>
        <FormItem label="右边距">
          <Slider v-model="share.imgRight" show-input></Slider>
        </FormItem>
        <FormItem label="下边距">
          <Slider v-model="share.imgBottom" show-input></Slider>
        </FormItem>
        <FormItem label="左边距">
          <Slider v-model="share.imgLeft" show-input></Slider>
        </FormItem>
      </TabPane>
    </Tabs>
  </Form>
</template>

<script>
import apiVoid from '../../../../api/news/index.js';
export default {
    name: 'wys-video',
    data () {
        return {
            share: {
                imgTop: 0,
                imgRight: 0,
                imgBottom: 0,
                imgLeft: 0,
                imgWidth: 30,
                imgSelect: 'line1',
                httpUrl: '',
                backColor: '',
                isloading: false,
                videoSize: 0,
                image: 'http://wap-qn.toutiaofangchan.com/tpzw_image.png',
                defaultList: [],
                videoUrl: '',
                videoImg: '',
                uploadList: [
                ],
                imgInformation: '',
                label: '',
                position: 'text-label-1'
            },
            imgUrl: '',
            visible: false
        };
    },
    methods: {
        format (val) {
            return 'width: ' + val + '%';
        },
        apiuploadVideo (pas) {
            apiVoid.uploadVideo(pas).then(response => {
                var arr = Object.keys(response.data.data);
                if (arr.length == 0) {
                    let _self = this;
                    setTimeout(function () {
                        _self.apiuploadVideo(pas);
                    }, 3000);
                    return false;
                }
                this.share.isloading = false;
                this.share.uploadList.push({
                    url: response.data.data.coverURL,
                    //  imgInformation: img.width+"px*"+img.height+"px",
                    single: false
                });
                this.share.videoUrl = response.data.data.playURL;
                this.share.videoImg = response.data.data.coverURL;
                this.share.videoSize = _.floor((response.data.data.size / 102400), 2);
            });
        },
        uploadSuccess (res, file) {
            this.share.isloading = true;
            let self = this;
            setTimeout(function () {
                self.apiuploadVideo(file.response.data);
            }, 3000);
            // if (res.code === 'success') {
            //     // 创建对象
            //     var img = new Image();

            //     // 改变图片的src
            //     img.src = res.data.url;
            //     var that = this;
            //     // 加载完成执行
            //     img.onload = function(){
            //          that.share.uploadList.push({
            //              name: file.name,
            //              url: res.data.url,
            //              imgInformation: img.width+"px*"+img.height+"px",
            //              single:false
            //          });
            //     };
            // }
            // else {
            //     this.$Notice.error({
            //         title: '上传失败',
            //         desc: res.data.url
            //     });
            // }
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
            this.share.videoUrl = '';
            this.share.videoImg = '';
        },
        handleTitle (item) {
            console.log(item);
            // this.share.uploadList[index].title = this.share.title;
            // console.log(this.share.uploadList);
        },
        handleContent (item) {
            console.log(item);
            // this.share.uploadList[index].content = this.share.content;
            // console.log(this.share.uploadList);
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
  width: 260px;
  margin-top: 20px;
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
.ivu-form-item {
  padding-right: 10px !important;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>


<stage-template>
<div style="padding: {{@share.imgTop}}px {{@share.imgRight}}px {{@share.imgBottom}}px {{@share.imgLeft}}px;">
{{if !share.videoUrl}}
<img style="width:100%;" src="http://wap-qn.toutiaofangchan.com/adideas/98c38e7e6a04492da19b94b47561e76e.png"/>
{{else}}
<div  style="margin: 0px auto;">
<video src="<%= share.videoUrl %>" type="video/mp4" controls="" poster="<%= share.videoImg %>" preload="none" webkit-playsinline="" playsinline="" style="width:100%;">
</video>
</div>
{{/if}}
</div>
</stage-template>
<stage-javascript-import>http://wap-qn.toutiaofangchan.com/adideas/55ad396d497544678af4f5c8e42386f6.js</stage-javascript-import>
<stage-css-import>http://wap-qn.toutiaofangchan.com/adideas/a85bfd05564440409e5ac8026a25ac72.css</stage-css-import>
<stage-javascript type="text/javascript">

</stage-javascript>
<stage-css>
  video {
    object-fit: contain !important;
    width: 100%;
  }
  .prism-player {
    position: relative;
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