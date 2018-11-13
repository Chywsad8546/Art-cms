<template>
       <Form  :label-width="60" class="imgWidthCont">
    <Tabs>
    
        <TabPane label="内容" >
 
                <Button type="primary" @click="previewAppFun(form.isPublish)">添加tab</Button>

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
<style>
    .wysiwyg_tab {
        width: 100%;
        overflow-x: auto;
    }
    .wysiwyg_tab ul {
        width: 100%;
        padding: 20px 0 15px 0;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
    }
    .wysiwyg_tab ul li {
        padding: 0 10px 0 15px;
        font-size: 12px;
        color: #666666;
        list-style: none;
        line-height: 20px;
        /* float: left; */
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
    }


</style>

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
<div id="{{@ share.brickid}}" class="pictureset-box">
    <div class="wysiwyg_tab">
        <ul>
            <li>精选</li>
            <li>11.11</li>
            <li>水果</li>
            <li>海鲜</li>
            <li>肉禽蛋</li>
            <li>精选</li>
            <li>11.11</li>
            <li>水果</li>
            <li>海鲜</li>
            <li>肉禽蛋</li>
        </ul>
    </div>
</div>
</stage-template>
<stage-javascript type="text/javascript">
    setTimeout(function(){
        $(".wysiwyg_tab").on("click","li",function(){
            console.log($(this).html());
        })
        
    },1000)
</stage-javascript>
<stage-css>
    .wysiwyg_tab {
        width: 100%;
        overflow-x: auto;
    }
    .wysiwyg_tab ul {
        width: 100%;
        padding: 20px 0 15px 0;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
    }
    .wysiwyg_tab ul li {
        padding: 0 10px 0 15px;
        font-size: 12px;
        color: #666666;
        list-style: none;
        line-height: 20px;
        /* float: left; */
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
    }
</stage-css>