<template>
<div class="articleContainer">
    <Form ref="formInline" :model="form" :rules="rules" :label-width="80">

    <div class="publictop">
        <div class="articleTitle">发表文章</div>
        <FormItem label="标题">
            <Input v-model="form.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="内容">
            <quill-editor v-model="form.content"
                    ref="myQuillEditor" 
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)"
                    >
            </quill-editor>
        </FormItem>
        <FormItem label="封面">
            <div class="grid-content bg-purple-light">
                <RadioGroup v-model="form.listType">
                    <Radio label='1'>单图</Radio>
                    <Radio label='2'>三图</Radio>
                    <Radio label='0'>无</Radio>
                </RadioGroup>     
            </div>
            <div v-show="form.listType==='1'">
                <div class="avatar-uploader" v-if="coverImgOne.length > 0">                    
                    <img v-for="imgOne,index in coverImgOne" @click="coverEditUpImg(index)" :src="imgOne"/>
                </div>
                 <div class="avatar-uploader" v-else>                    
                    <img @click="coverUpImg" src="./img/suoluetu.png"/>
                </div>               
            </div>
            <div v-show="form.listType==='2'">
                <div class="avatar-uploader" v-if="coverImgTrue.length > 0" v-for="imgOne,index in coverImgTrue">                    
                    <img @click="coverEditUpImg(index)" :src="imgOne"/>
                </div>
                <div class="avatar-uploader" v-if="coverImgTrue.length < 1">                    
                        <img @click="coverUpImg" src="./img/suoluetu.png"/>
                </div>
                <div class="avatar-uploader"  v-if="coverImgTrue.length < 2">                    
                        <img @click="coverUpImg" src="./img/suoluetu.png"/>
                </div>
                <div class="avatar-uploader" v-if="coverImgTrue.length < 3">                    
                        <img @click="coverUpImg" src="./img/suoluetu.png"/>
                </div>      
            </div>
        </FormItem>
        <FormItem label="栏目">
            <CheckboxGroup v-model="form.topic" @on-change="lanmuChange">
                <Checkbox v-for="list,index in chaneeljmList" :label="list.id">{{list.title}}</Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="标签">
            <labelList @labelArr-event="callBacklabelFun"></labelList>
        </FormItem>
        <FormItem label="来源" style="width:200px;">
            <Input v-model="form.source" placeholder="请输入来源"></Input>
        </FormItem>
        <FormItem label="作者" style="width:200px;">
            <Input v-model="form.author" placeholder="请输入作者"></Input>
        </FormItem>
        <div class="acticleSubmit">
            <Button type="primary" @click="releaseNews(1)">发布</Button>
            <Button style="margin-left: 8px" @click="timingSubRelease">定时发布</Button>
            <Button style="margin-left: 8px" @click="releaseNews(2)">存为草稿</Button>
        </div>
  
    </div>
    <uploadzhImg @child-event='confirmParEvent' @cancel-event='cancleCallBack'  @uploadEditorSuccess-event = 'successPreview' v-show="uplopopDisplay"></uploadzhImg>
</Form>
<timingRelease @confirm-event = "callBackTime" @cancel-event = "callBackTimeCancel" v-show="vshowTimeSelect"></timingRelease>
   <!-- <div class="el-message-box__wrapper">
        <div class="uploadModal"></div>
    </div> -->
</div>
</template>
<script>
    import api from '../../../api/news/index.js';
    import timingRelease from './components/timingRelease.vue';
    import labelList from './components/labelLiat.vue';
    import uploadzhImg from './components/uploadzhImg.vue';
    const toolbarOptions = [
        ['code-block'],
        [{'list': 'bullet'}],
        [{'direction': 'rtl'}],                         // text direction
        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image']                                  // remove formatting button
    ]
    export default {
        name: 'articleAdd',
        components: {
            timingRelease,
            labelList,
            uploadzhImg
        },
        data() {
            return {
                content:null,
                uploadFlag: false,
                dialogImageUrl: '',
                dialogVisible: false,
                uploadimgFlag: false,
                imgDom: "",
                selectImgSrc: "",
                columnList: [],
                LabelList: [],
                uplopopDisplay: false,
                // 七牛云的上传地址，根据自己所在地区选择，我这里是华南区
                domain: '/cmsapi/sys/uploadImg',
                uploadimgList: [],
                vshowTimeSelect: false,
                coverImgIndex: 0,
                coverImgOne: [],
                coverImgTrue: [],
                chaneeljmList: [],
                form: {
                    title: '',
                    content: '',
                    isPublish: 0,//发布状态(0:待发布,1:已发布,2:草稿，3撤稿) 是
                    listType:'0',//封面样式(0:大标题,1:单图,2:多图,3:视频) 是
                    source:'',//文章来源 否
                    publishAt:'',//发布时间 否
                    tags:'',  //标签1,2,3  否
                    tagsName: '',
                    listImg: [], //封面图片数组
                    type: 0,    //内容类型(0:图文,1:图集,2:视频)
                    author: '',//作者
                    topic: [],   //栏目
                    topicName:[] //栏目名称
                },
                 rules: {
                        title: [
                            { required: true, message: '请输入标题', trigger: 'blur' }
                        ]
                    },
                editorOption: {
                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                            toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                if (value) {
                                    //console.log(55555);
                                        //   let vm = this
                                        //   let quill = this.quill
                                        //   console.log('res---', quill.getSelection())
                                        //   // 获取光标所在位置
                                        //   let length = quill.getSelection().index;
                                        //   // 插入图片  res.info为服务器返回的图片地址
                                        //   quill.insertEmbed(length, 'image', 'http://file.dafy.com.cn/OSS/20180926/1634109cff964de698f2969dec05c045.jpg')
                                        //   // 调整光标到最后
                                        //   quill.setSelection(length + 1)
                                    document.querySelector('#iviewUp2 input').click();
                                } else {
                                    this.quill.format('image', false);
                                }
                                }
                            }
                            }
                    }
                }
            };
        },
        created() {
            this.newsChaneelList();
        },
        watch: {

        },
        computed: {},
        methods: {
            lanmuChange(ids){
                this.form.topicName=[];
                ids.forEach(id => {
                    this.chaneeljmList.forEach(item=>{
                        if(item.id==id){
                            this.form.topicName.push(item.title);
                        }
                    });
                });
            },
            // 上传文件到七牛云
            upqiniu (req) {
                this.uploadFun(req);
            },
            ceshidem() {
                console.log(1111);
            },
            callBacklabelFun(data){
                this.form.tagsName = data[0].arr1;
                this.form.tags = data[0].arr2;
            },
            uploadFun (req){
              //  console.log(req.file);
                // this.uploadFile.file = req.file;
                // console.log(this.uploadFile);
                // api.uploadImg(this.uploadFile).then(response => {
                //         // this.data = this.initTable = response.data.data.data;
                //         // this.total = response.data.data.total;
                // });
                // let selfQuill = this.$refs.myQuillEditor.quill;
                // //console.log('res---', this.$refs.myQuillEditor.quill.getSelection())
                // let length = selfQuill.getSelection().index;
                // const config = {
                //     headers: {'Content-Type': 'multipart/form-data'}
                // }
                // let filetype = ''
                // if (req.file.type === 'image/png') {
                //     filetype = 'png'
                // } else {
                //     filetype = 'jpg'
                // }
                // // 重命名要上传的文件
                // const keyname = 'lytton' + new Date() + Math.floor(Math.random() * 100) + '.' + filetype
                // // 从后端获取上传凭证token
                // this.axios.get('/up/token').then(res => {
                    // console.log(res)
                    // const formdata = new FormData()
                    // formdata.append('file', req.file)
                    // formdata.append('token', res.data)
                    // formdata.append('key', keyname)
                    // // 获取到凭证之后再将文件上传到七牛云空间
                    // this.axios.post(this.domain, formdata, config).then(res => {
                    // selfQuill.insertEmbed(length, 'image', 'http://' + this.qiniuaddr + '/' + res.data.key)
                    // // 调整光标到最后
                    // selfQuill.setSelection(length + 1)
                    // this.imageUrl = 'http://' + this.qiniuaddr + '/' + res.data.key
                    // // console.log(this.imageUrl)
                    // })
                // })
            },
            // 验证文件合法性
            beforeUpload (file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                }
                return isJPG && isLt2M
            },
            onEditorBlur(){//失去焦点事件              
              //  console.log(this.content);
            },
            onEditorFocus(){//获得焦点事件
            
            },
            callBackTime(time) {
                this.form.publishAt = time;
                this.vshowTimeSelect = !this.vshowTimeSelect;
                this.releaseNews(0);
            },
            callBackTimeCancel() {
                this.vshowTimeSelect = !this.vshowTimeSelect;
            },
            timingSubRelease() {
                this.vshowTimeSelect = !this.vshowTimeSelect;
            },
            newsChaneelList() {
                api.newsChaneelList().then(response => {
                    this.chaneeljmList = response.data.data;
                    console.log("response",response.data.data);
                }).catch(response => {
                    this.$Notice.warning({
                        title: "栏目获取失败"
                    });
                })                
            },
            selectSort(data) {
                this.uploadimgList.forEach(function(obj){
                    obj.isActive = false;
                });
                data.isActive = !data.isActive;
                this.selectImgSrc = data.url;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                console.log(this.dialogImageUrl);
                this.dialogVisible = true;
            },
            successPreview(file) {               
                    let selfQuill = this.$refs.myQuillEditor.quill;
                    if(selfQuill){
                        let length = selfQuill.getSelection().index;
                        selfQuill.insertEmbed(length, 'image', file.data);
                        // 调整光标到最后
                        selfQuill.setSelection(length + 1) 
                    }    
            },
            // uploadImg() {
            //     this.uploadimgFlag = !this.uploadimgFlag;
            //     this.uploadimgList.forEach(function(obj){
            //         obj.isActive = false;
            //     });
            //     var el = event.currentTarget;
            //     this.imgDom = el;
            // },
            coverUpImg() {
                this.editorUploadFlag = false;
                this.uplopopDisplay = !this.uplopopDisplay;
            },
            coverEditUpImg(index) {
                this.editorUploadFlag = false;
                this.uplopopDisplay = !this.uplopopDisplay;
                this.coverImgIndex = index;
            },          
            confirmxz() {
                this.uploadimgFlag = !this.uploadimgFlag;
                this.imgDom.src = this.selectImgSrc;
            },
            cancelFun() {
                this.uploadimgFlag = !this.uploadimgFlag;
            },
            confirmParEvent(data) {//弹框确定事件
                this.uplopopDisplay = !this.uplopopDisplay;
                if(this.form.listType === '1'){
                    if(this.coverImgOne.length>0){
                           // this.pitchImgArr.splice(index, 1);
                           this.coverImgOne.splice(this.coverImgIndex,1,data);
                    }else{
                        this.coverImgOne.push(data);
                    }                  
                }else if(this.form.listType === '2'){
                    if(this.coverImgTrue.length>2){
                           // this.pitchImgArr.splice(index, 1);
                           this.coverImgTrue.splice(this.coverImgIndex,1,data);
                    }else{
                        this.coverImgTrue.push(data);
                    }
                }
            },
            cancleCallBack() {//弹框取消事件
                this.uplopopDisplay = !this.uplopopDisplay;
            },
            onEditorChange(event) {
              console.log(event.html)
            //   var img = event.html.match(/<img[^>]+>/g); // 利用正则，取出所有img标签，数据格式为数组
            //   let self = this;
            //   self.uploadimgList = [];
            //   img.forEach(function(obj){
            //       var reg = /(?<=(src="))[^"]*?(?=")/ig;
            //       var surl=obj.match(reg);
            //       self.uploadimgList.push({"url":surl,"isActive":false});          
            //   });
            },
            releaseNews(type) {//发布按钮
                if (this.form.title==="") {
                    this.$Notice.warning({
                        title: "请输入标题"
                    });
                    return false;
                }
                if(this.form.content===""){
                    this.$Notice.warning({
                        title: "请输入图文"
                    });
                    return false;
                }
                this.form.isPublish = type;

                if(this.form.listType === 1){
                    this.form.listImg = this.coverImgOne;
                }else if(this.form.listType === 2){
                    this.form.listImg = this.coverImgTrue;
                }else{
                    this.form.listImg = [];
                }            
                // for(let s = 0;s<this.form.topicName.length;s++){
                //     console.log(this.form.topicName[s]);
                // }
                api.addArticle(this.form).then(response => {
                        this.$Modal.success({
                            title: '',
                            content: "发布成功"
                        });
                        this.$router.push({
                            name: "contentmanage"
                        });
                }).catch(response => {
                    this.$Notice.warning({
                        title: "发布失败"
                    });
                })               
            }
        },
        // created() {
        //     this.searchData.corpShortName = this.$route.query.corpShortName || ''
        //     this.searchData.storeName = this.$route.query.storeName || ''
        //     this.init();
        // },
        mounted() {

        }
    };
</script>
<style>

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
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    transition: color .15s linear;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
}
.uploadimg-list .checked:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0,0,0,.5);
    background-image: url("./img/pitchImg.png");
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
.articleTitle {
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
}

.fmtitle {
    font-size: 16px;
    text-align: center;
    line-height: 38px;
}
.articlePopup {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    opacity: .5;
    display: block;
    background: #333;
    z-index: 1000;
}
.el-uoload-box__wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: none;
    text-align: center;
}
.acticleSubmit {
    float: right;
    padding-right: 20px;
    overflow: hidden;
}
.articlecontentPopup {
    background: #fff;
    width: 668px;
    height: 608px;
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
/* .uploadModal {
    position: fixed;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
} */
.ql-editor {
    height: 300px;
}
.quill-editor {
    background: #FFFFFF;
}
.articleContainer {
    background: #FFFFFF;
    overflow: hidden;
    position: relative;
    padding-bottom: 20px;
}
.avatar-uploader {
  display: block;
  float: left;
  width: 182px;
  height: 183px;
  margin-right: 10px;
}
.avatar-uploader img {
    width: 100%;
}
.el-radio-group {
  line-height: 50px;
}
.syl-editor-input .editor-title {
    border: 0;
    width: 100%;
    border-bottom: none;
    -webkit-border-radius: none;
    -moz-border-radius: none;
    border-radius: none;
    font-weight: 400;
    font-size: 20px;
    line-height: 58px;
    height: 58px;
    padding-left: 20px;
    padding-right: 55px;
}

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
