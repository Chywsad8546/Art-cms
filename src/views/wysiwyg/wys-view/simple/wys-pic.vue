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
                    <div>当前图片尺寸: {{item.imgInformation}}</div>
                    <Row>
                        <Row style="padding-bottom:10px;">
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
                        </Row>
                        <wysLink @link-cancelEvent="cancelPopup" @link-okEvent="okPopup" v-bind:createUrl="item.urlData"
                            v-bind:isBlock="item.navVisible"></wysLink>

                    </Row>
                </div>
                <Upload v-if="(share.imgSelect == 'line1' && share.uploadList.length <= 0) || (share.imgSelect == 'line2' && share.uploadList.length <= 1) || (share.imgSelect == 'line3' && share.uploadList.length <= 2) || (share.imgSelect == 'lineAll')"
                    ref="upload" class="uploadWidth" :action="$domain.uploadFile" :default-file-list="share.defaultList"
                    :format="['jpg','jpeg','png','js','css']" :on-success="uploadSuccess" :on-format-error="uploadFormatError"
                    :show-upload-list="false">
                    <Button type="ghost">添加图片</Button>
                </Upload>
                <Modal title="View Image" v-model="visible">
                    <img :src="imgUrl" v-if="visible" style="width: 100%">
                </Modal>
            </TabPane>
            <TabPane label="样式">
                <FormItem label="图片选项">
                    <Select v-model="share.imgSelect" style="width:200px">
                        <Option value="line1">单列</Option>
                        <Option value="line2">两列</Option>
                        <Option value="line3">三列</Option>
                        <Option value="lineAll">多列</Option>
                    </Select>
                </FormItem>
                <FormItem v-if="share.imgSelect=='lineAll'" label="图片宽度百分比">
                    <Slider v-model="share.imgWidth" :tip-format="format"></Slider>
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
                <FormItem label="背景颜色">
                    <Row>
                        <Col span="12"><Input v-model="share.backColor"></Input></Col>
                        <Col span="12">
                        <ColorPicker v-model="share.backColor" style="margin-left:10px;margin-bottom:300px;" size="default"
                            recommend />
                        </Col>
                    </Row>

                </FormItem>
            </TabPane>
        </Tabs>
    </Form>
</template>

<script>
import wysLink from '../components/link.vue';
export default {
    name: 'wys-pic',
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
                imgWidth: 30,
                imgSelect: 'line1',
                backColor: '',
                image: 'http://wap-qn.toutiaofangchan.com/tpzw_image.png',
                defaultList: [],
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
                        imgInformation: img.width + 'px*' + img.height + 'px',
                        navVisible: false,
                        single: false
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
        handleTitle (item) {
            console.log(item);
            // this.share.uploadList[index].title = this.share.title;
            // console.log(this.share.uploadList);
        },
        handleContent (item) {
            console.log(item);
            // this.share.uploadList[index].content = this.share.content;
            // console.log(this.share.uploadList);
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
.btn {
  font-size: 12px;
  color: #2d8cf0;
  cursor: pointer;
}
</style>


<stage-template>
<div  class="pictureset-box">
    <div class="specialListUl {{@share.imgSelect}}">
        <ul style="{{@share.backColor != "" ? "background:"+share.backColor : ""}}">
          {{if share.uploadList==0}}
             <li style="padding: {{@share.imgTop}}px {{@share.imgRight}}px {{@share.imgBottom}}px {{@share.imgLeft}}px;  {{@share.imgSelect == "lineAll" ? "width:"+share.imgWidth+"%" : ""}};"><a href="javascript:void(0)" target="_self"  class="link"><img src="http://wap-qn.toutiaofangchan.com/tpzw_image.png"/></a></li>
          {{/if}}
          {{each share.uploadList}}
             <li style="padding: {{@share.imgTop}}px {{@share.imgRight}}px {{@share.imgBottom}}px {{@share.imgLeft}}px;  {{@share.imgSelect == "lineAll" ? "width:"+share.imgWidth+"%" : ""}};"><a href="{{$value.httpUrl}}" target="_self"  class="link"><img src="{{$value.url}}"/></a></li>
          {{/each}} 
        </ul>
    </div>
</div>
</stage-template>
<stage-javascript type="text/javascript">


</stage-javascript>
<stage-css>
    .specialListUl {
        width: 100%;
    }
    .line1 {
        overflow: hidden;
    }
    .line1 li {
        width: 100%;
        font-size: 12px;
        color: #666666;
        line-height: 20px;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        list-style: none;
    }
    .line1 li img{
        width: 100%;
        font-size: 12px;
        color: #666666;
        line-height: 20px;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        list-style: none;
    }
    .line2 {
        overflow: hidden;
    }
    .line2 li {
        width: 50%;
        font-size: 12px;
        color: #666666;
        line-height: 20px;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        list-style: none;
    }
    .line2 li img{
        width: 100%;
        font-size: 12px;
        color: #666666;
        line-height: 20px;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        list-style: none;
    }
    .line3 {
        overflow: hidden;
    }
    .line3 li {
        width: 33.33%;
        font-size: 12px;
        color: #666666;
        line-height: 20px;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        list-style: none;
    }
    .line3 li img{
        width: 100%;
        font-size: 12px;
        color: #666666;
        line-height: 20px;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        list-style: none;
    }
    .lineAll {
        overflow-x: auto;
    }
    .lineAll li {
        width: 100px;
        font-size: 12px;
        color: #666666;
        line-height: 20px;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        list-style: none;
    }
    .specialListUl ul{
        width: 100%;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        box-sizing: border-box;
    }
</stage-css>