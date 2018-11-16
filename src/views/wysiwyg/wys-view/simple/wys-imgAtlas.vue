<template>
       <Form  :label-width="60" class="imgWidthCont">
    <Tabs>
    
        <TabPane label="内容" >
 
 
                <FormItem label="" prop="title">
                        <div v-for="item,index in share.uploadList">
                            <div class="demo-upload-list">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                    </div>
                            </div>
                            <div>当前图片尺寸: {{item.imgInformation}}</div>
                            <CheckboxGroup>
                                <Checkbox v-model="item.single" label="提示按钮"></Checkbox>
                            </CheckboxGroup>
                            <FormItem label="按钮内容" v-if="item.single">
                                <Input v-model="item.buttonText"></Input>
                            </FormItem>
                            <FormItem label="标题">
                                <Input v-model="item.title"></Input>
                            </FormItem>
                            <FormItem label="内容">
                                <Input v-model="item.content"></Input>
                            </FormItem>
                            <FormItem label="链接">
                                <Input v-model="item.httpUrl"></Input>
                            </FormItem>
                        </div>
                        <Upload  ref="upload" class="uploadWidth" action="cmsapi/upload/uploadimgNoDomainExt"   :default-file-list="share.defaultList"  :format="['jpg','jpeg','png','js','css']" :on-success="uploadSuccess"
                                :on-format-error="uploadFormatError"
                                :show-upload-list="false">
                            <Button type="ghost" >添加图片</Button>
                        </Upload>
                </FormItem>
                <Modal title="View Image" v-model="visible">
                    <img :src="imgUrl" v-if="visible" style="width: 100%">
                </Modal>

        </TabPane>
    </Tabs>
    </Form>



       <!-- <Form  class="imgWidthCont">
    <Tabs>
    
        <TabPane label="内容" :label-width="80">
 
                <FormItem label="" prop="title">
                        <div v-for="item,index in share.uploadList">
                            <div class="demo-upload-list">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                    </div>
                            </div>
                            <div>当前图片尺寸: {{item.imgInformation}}</div>
                            <CheckboxGroup v-model="item.single">
                                <Checkbox label="提示按钮"></Checkbox>
                            </CheckboxGroup>
                            <FormItem label="按钮内容" v-if="item.single">
                                <Input v-model="item.buttonText"></Input>
                            </FormItem>
                            <FormItem label="标题">
                                <Input v-model="item.title"></Input>
                            </FormItem>
                            <FormItem label="内容">
                                <Input v-model="item.content"></Input>
                            </FormItem>
                            <FormItem label="链接">
                                <Input v-model="item.httpUrl"></Input>
                            </FormItem>
                        </div>
                        <Upload  ref="upload" class="uploadWidth" action="cmsapi/upload/uploadimgNoDomainExt"   :default-file-list="share.defaultList"  :format="['jpg','jpeg','png','js','css']" :on-success="uploadSuccess"
                                :on-format-error="uploadFormatError"
                                :show-upload-list="false">
                            <Button type="ghost" >添加图片</Button>
                        </Upload>
                </FormItem>
                <Modal title="View Image" v-model="visible">
                    <img :src="imgUrl" v-if="visible" style="width: 100%">
                </Modal>

        </TabPane>  
    </Tabs>
    </Form> -->
</template>

<script>

    export default {
        name: 'wys-img',
        data() {
            return {
                share:{
                    imgTop: 0,
                    imgRight: 0,
                    imgBottom:0,
                    imgLeft:0,
                    image:'http://wap-qn.toutiaofangchan.com/tpzw_image.png',
                    defaultList:[],
                    uploadList:[
                    ],
                    imgInformation:"",
                    label:"",
                    position:"text-label-1",
                },
                imgUrl:"",
                visible:false
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
                    img.onload = function(){
                         that.share.uploadList.push({
                             name: file.name,
                             url: res.data.url,
                             imgInformation: img.width+"px*"+img.height+"px",
                             single:false
                         });
                    };
                }
                else {
                    this.$Notice.error({
                        title: '上传失败',
                        desc: res.data.url
                    });
                }
            },
            uploadFormatError(file) {
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
                this.share.uploadList.splice(index,1);
            },
            handleTitle(item){
                console.log(item);
                // this.share.uploadList[index].title = this.share.title;
                // console.log(this.share.uploadList);
            },
            handleContent(item){
                console.log(item);
                // this.share.uploadList[index].content = this.share.content;
                // console.log(this.share.uploadList);
            },
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
    margin-top:20px;

}
  .demo-upload-list{
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
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .imgWidthCont {
        width: 95%;           
    }
</style>
<style>
.ivu-form .ivu-form-item-label {
    text-align: left !important;
    vertical-align: middle;
    float: left;
    font-size: 12px;
    color: #495060;
    line-height: 1;
    padding: 10px 12px 10px 0;
    box-sizing: border-box;
}

</style>

<stage-template>
<div id="{{@ brickid}}" class="pictureset-box" style="height:100%">
    <div class="pictureset-container" style="height:100%">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            {{each share.uploadList}}
                <div class="swiper-slide">
                    <a href="{{$value.httpUrl}}" target="_self"  class="link">
                        <img style="width:100%" id="{{@ share.brickid}}" src="{{$value.url}}"/>   
                    </a>       
                    <div class="description">
                        <div class="title-wrapper clearfix">
                            <a href="javascript:void(0);" target="_self" class="link-btn link">{{$value.buttonText}}</a>
                            <div class="title">{{$value.title}}</div>
                        </div>
                        <div class="content">
                            <span class="pictureset-content-current-page">{{$index+1}}</span>
                            <span class="total">/{{@ share.uploadList.length}}</span>
                            <span class="text">{{$value.content}}</span>
                        </div>
                    </div>
                </div>
            {{/each}}  
         
        </div>
    </div>
    </div>
</div>
</stage-template>
<stage-javascript type="text/javascript">
  setTimeout(function(){
    $(".wysi_active").css("height","100%");
    var swiper = new Swiper('.swiper-container', {
    });
  },300);
</stage-javascript>
<stage-css>
     .swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      color:#FFFFFF;
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
    .pictureset-container {
        position: relative;
        background-color: #000;
    }
    .pictureset-box .description {
        padding: 12px 15px;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        color: #fff;
        box-sizing: border-box;
        background-color: rgba(27,27,27,.7);
        max-height: 50%;
        overflow: hidden;
        text-align:left;
    }
    .pictureset-box .description .title-wrapper {
        margin-bottom: 10px;
    }
    .pictureset-box .invisible {
        visibility: hidden;
    }
    .pictureset-box .link-btn {
        float: right;
        color: #fff;
        background-color: #e66462;
        font-size: 14px;
        border-radius: 3px;
        padding: 0 10px;
        line-height: 30px;
        text-align: center;
        text-decoration: none;
    }
    .pictureset-box .description .title {
        font-size: 18px;
        line-height: 30px;

    }
    .pictureset-box .description .content {
        min-width: 0;
        color: #aaa;
        font-size: 0.427rem;
        line-height: 0.613rem;
    }
    .pictureset-box .description .content .pictureset-content-current-page {
        display: inline;
    }
    .pictureset-box .description .content .total {
        display: inline;
        font-size: 0.373rem;
    }
    .pictureset-box .description .content .text {
        display: inline;
    }
    .pictureset-box .link-btn {
        float: right;
        color: #fff;
        background-color: #e66462;
        font-size: 14px;
        border-radius: 3px;
        padding: 0 10px;
        line-height: 30px;
        text-align: center;
        text-decoration: none;
    }    
    .link {
        display: block;
        cursor: pointer;
        font-size: 16px;
        line-height: 22px;
        word-wrap: break-word;
        word-break: break-all;
    }
</stage-css>