<template>
    <Form :label-width="40" class="imgWidthCont">
        <Tabs>
            <TabPane label="内容">
                <div v-for="item in share.uploadList">
                    <div class="demo-upload-list">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </div>
                    <FormItem v-if="share.uploadList.length>0">
                        当前图片尺寸: {{item.imgInformation}}
                    </FormItem>
                    <FormItem label="标签">
                        <Input v-model="item.label"></Input>
                    </FormItem>
                    <Col span="24">
                    <div v-if="item.httpUrl != ''">
                        <span style="margin-right:10px;">链接到 {{item.httpUrl}}</span>
                        <a v-if="item.httpUrl != ''" @click="addUrl(item)">
                            编辑
                        </a>
                    </div>
                    <a v-if="item.httpUrl == ''" class="btn" @click="addUrl(item)">
                        <Icon type="plus-round"></Icon>
                        添加链接
                    </a>
                    </Col>
                    <wysLink @link-cancelEvent="cancelPopup" @link-okEvent="okPopup" v-bind:createUrl="item.urlData"
                        v-bind:isBlock="item.navVisible"></wysLink>
                </div>
                <Upload ref="upload" class="uploadWidth" :action="$domain.uploadFile" :default-file-list="share.defaultList"
                    :format="['jpg','jpeg','png']" :on-success="uploadSuccess" :on-format-error="uploadFormatError"
                    :show-upload-list="false">
                    <Button type="ghost">添加图片</Button>
                </Upload>
                <Modal title="View Image" v-model="visible">
                    <img :src="imgUrl" v-if="visible" style="width: 100%">
                </Modal>
            </TabPane>
            <TabPane label="样式">
                <FormItem label="标签位置">
                    <Select v-model="share.position">
                        <Option value="text-label-1">顶部</Option>
                        <Option value="text-label-4">底部</Option>
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
import wysLink from '../components/link.vue';
export default {
    name: 'wys-groupdrawing',
    components: {
        wysLink
    },
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
            obj: '',
            imgUrl: '',
            visible: false
        };
    },
    methods: {
        uploadSuccess (res, file) {
            if (res.code === 'success') {
                // 创建对象
                var img = new Image();
                // 改变图片的src
                img.src = res.data.url;
                var that = this;
                // 加载完成执行
                img.onload = function () {
                    that.share.uploadList.push({
                        name: file.name,
                        url: res.data.url,
                        httpUrl: '',
                        urlData: {},
                        navVisible: false,
                        imgInformation: img.width + 'px*' + img.height + 'px',
                        single: false,
                        label: ''
                    });
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
        },
        addUrl (item) {
            item.navVisible = true;
            this.obj = this.share.uploadList[this.share.uploadList.indexOf(item)];
        },
        cancelPopup () {
            this.obj.navVisible = !this.obj.navVisible;
        },
        okPopup (data) {
            this.obj.navVisible = !this.obj.navVisible;
            this.obj.urlData = data;
            this.obj.httpUrl = data.url;
            if (data.id) {
                this.obj.httpUrl += data.id;
            }
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
</style>

<stage-template>
<section style="padding: {{@share.imgTop}}px {{@share.imgRight}}px {{@share.imgBottom}}px {{@share.imgLeft}}px;">
   <div class="groupdrawing-container">
        <div class="swiper-wrapper swiperHeight">
    {{if share.uploadList==0}}
        <div class="swiper-slide image-con swiperHeight">
                <img style="width:100%" id="{{@ share.brickid}}" src="http://wap-qn.toutiaofangchan.com/tpzw_image.png"/>   
            {{if share.label!=""}}
                <span class="image-text {{@ share.position}}">{{@ share.label}}</span>
            {{/if}}    
        </div>
    {{/if}}
    {{each share.uploadList}}
        <div class="swiper-slide image-con swiperHeight">
            <a href="{{$value.httpUrl}}" target="_self"  class="link">
                <img style="width:100%" id="{{@ share.brickid}}" src="{{$value.url}}"/>   
            </a>
            {{if $value.label!=""}}
                <span class="image-text {{@ share.position}}">{{$value.label}}</span>
            {{/if}}       
        </div>
    {{/each}} 
        </div>
        <div class="swiper-pagination"></div>
    </div>
</section>
</stage-template>
<stage-javascript type="text/javascript">
  setTimeout(function(){
    var groupdrawing = new Swiper('.groupdrawing-container', {
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
    });
    },300);
</stage-javascript>
<stage-css>
    .swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
        right:0;
        left:auto;
    }
    .swiperHeight {
        height: auto !important; 
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
    .groupdrawing-container {
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      z-index: 1;
     height: auto;
    visibility: visible;
    }
</stage-css>