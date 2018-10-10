<template>
<div class="articleContainer">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <div class="publictop">
        <div class="articleTitle">发表图集</div>
        <!-- <div class="imagesBotton"  v-if="pitchImgArr.length<=0">
            <el-button type="primary" @click="uploadImg">选择图片</el-button>
        </div> -->
    <div>
        <el-form-item label="标题" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <div class="color-list">
        <div 
            class="color-item" 
            v-for="ImgArr,index in pitchImgArr" v-dragging="{ item: ImgArr, list: pitchImgArr, group: 'ImgArr' }"
            :key="ImgArr.url">
            <el-row>
                <el-col :span="4">
                    <div class="gallery-img">
                        <img :src="ImgArr.url"/>
                    </div>                
                    </el-col>
                <el-col :span="16">  
                    <el-input type="textarea" class="tuptextareaClass" v-model="ruleForm.desc" placeholder="图片说明（不超过200个子）"></el-input>                     
                </el-col>
                <el-col :span="4" class="imglistleft">
                    <i-button type="primary" @click="editUpimg(index)">换图</i-button>
                    <i-button type="ghost" @click="removeImg(index)">删除</i-button>               
                </el-col>
            </el-row>
        </div>
        </div>
        <div class="imagesBotton">
            <el-button type="primary" @click="uploadImg">添加图片</el-button>
        </div>
        <el-row>
        <el-col :span="2"><div class="grid-content bg-purple fmtitle">封面</div></el-col>
        <el-col :span="22">
            <div class="grid-content bg-purple-light">
                <el-radio-group v-model="radio2">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="2">三图</el-radio>
                </el-radio-group>      
            </div>
                    <div class="avatar-uploader">                    
                            <img @click="choiceImgClick" src="./img/suoluetu.png"/>
                    </div>
                    <div class="avatar-uploader" v-show="radio2===2">                    
                            <img @click="choiceImgClick" src="./img/suoluetu.png"/>
                    </div>
                    <div class="avatar-uploader" v-show="radio2===2">                    
                            <img @click="choiceImgClick" src="./img/suoluetu.png"/>
                    </div>

        </el-col>
        </el-row>

        <el-form-item label="栏目">
            <el-checkbox-group v-model="columnList">
                <el-checkbox label="栏目1"></el-checkbox>
                <el-checkbox label="栏目2"></el-checkbox>
                <el-checkbox label="栏目3"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="标签">
            <el-checkbox-group v-model="LabelList">
                <el-checkbox label="标签1"></el-checkbox>
                <el-checkbox label="标签2"></el-checkbox>
                <el-checkbox label="标签3"></el-checkbox>
            </el-checkbox-group>
            <el-input style="width:200px" placeholder="请输入2-6个字"></el-input>
            <el-button type="primary">+标签</el-button>
        </el-form-item>

        <div class="acticleSubmit">
            <el-button type="primary">发表</el-button>
            <el-button>预览</el-button>
            <el-button>存为草稿</el-button>
        </div>
 </div> 
    </div>
<!-- 上传图片组件 -->
    <el-upload
      id="iviewUp"
      class="avatar-uploader"
      :action= domain
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-success="successPreview"
      :on-remove="handleRemove" v-show="uploadFlag">
    </el-upload>
    <div class="articlecontentPopup" v-if="uploadimgFlag">
        <ul class="uploadimg-list">
            <li v-for="uploadimgLists in uploadimgList" :class="{checked:uploadimgLists.isActive}"><img @click="selectSort(uploadimgLists)" :src="uploadimgLists.url" /></li>
            <li v-if="uploadimgList.length>0"><img @click="uplaqloadImg" src="./img/suoluetu.png" /></li>
        </ul>
        <div class="popupUploadImg" v-if="uploadimgList.length<=0">
                <el-button type="primary" @click="uplaqloadImg">选择图片</el-button>
                <p>支持绝大多数图片格式，单张图片最大支持5MB</p>
        </div>
       
        <div class="botton">
            <el-button type="primary" @click="confirmxz()">确定</el-button>
            <el-button @click="cancelFun()">取消</el-button>
        </div>
    </div>
    
    <div class="articlePopupBack" @click="uploadImg" v-if="uploadimgFlag"></div>

   <!-- <div class="el-message-box__wrapper">
        <div class="uploadModal"></div>
    </div> -->
</el-form>
</div>
</template>
<script>
    import api from '../../../api/news/index.js';
    export default {
        name: 'articleAdd',
        data() {
            return {
                content:null,
                uploadFlag: false,
                radio2: 1,
                dialogImageUrl: '',
                dialogVisible: false,
                uploadimgFlag: false,
                imgDom: "",
                selectImgSrc: "",
                pitchImgArr: [],
                upState: 0,
                imgIndex: 0,
                columnList: [],
                LabelList: [],
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                },
                // 七牛云的上传地址，根据自己所在地区选择，我这里是华南区
                domain: '/cmsapi/sys/uploadImg',
                uploadimgList: []
            };
        },
        watch: {

        },
        computed: {},
        methods: {
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
                console.log(this.content);
            },
            onEditorFocus(){//获得焦点事件
            
            },
            selectSort(data) {
                this.uploadimgList.forEach(function(obj){
                    obj.isActive = false;
                });
                data.isActive = !data.isActive;
                this.selectImgSrc = data.url;
                console.log(this.selectImgSrc);
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
                let fileArr = {"url":file.data,"isActive":false};
                this.uploadimgList.push(fileArr);
                // let selfQuill = this.$refs.myQuillEditor.quill;
                // let length = selfQuill.getSelection().index;
                // selfQuill.insertEmbed(length, 'image', file.data);
                // // 调整光标到最后
                // selfQuill.setSelection(length + 1)                
            },
            uploadImg() {
                this.upState = 0;
                this.uploadimgList.forEach(function(obj){
                    obj.isActive = false;
                });
                this.uploadimgFlag = !this.uploadimgFlag;
            },
            choiceImgClick() {
                this.upState = 1;
                this.uploadimgList.forEach(function(obj){
                    obj.isActive = false;
                });
                this.uploadimgFlag = !this.uploadimgFlag;
                var el = event.currentTarget;
                this.imgDom = el;               
            },
            uplaqloadImg() {
                 document.querySelector('#iviewUp input').click();
            },
            editUpimg(index) {
                this.upState = 2;
                this.imgIndex = index;
                this.uploadimgList.forEach(function(obj){
                    obj.isActive = false;
                });
                 this.uploadimgFlag = !this.uploadimgFlag;
                console.log(index);
            },
            confirmxz() {
                if(this.selectImgSrc){
                    this.uploadimgFlag = !this.uploadimgFlag;
                    if(this.upState === 0){
                        let imgArr = {"url":this.selectImgSrc,"text":""};
                        this.pitchImgArr.push(imgArr);
                    }else if(this.upState === 1){
                        this.imgDom.src = this.selectImgSrc;
                    }else{
                       // this.pitchImgArr[this.imgIndex].splice(this.imgIndex,1,'ttt');
                       this.pitchImgArr[this.imgIndex].url = this.selectImgSrc
                     //  console.log();
                    }
                }else{
                    this.$Notice.warning({
                        title: "请选择图片"
                    });
                }
            },
            cancelFun() {
                this.uploadimgFlag = !this.uploadimgFlag;
            },
            removeImg(index) {
                this.pitchImgArr.splice(index, 1);
            },
            onEditorChange(event) {
             // console.log(event.html)
              var img = event.html.match(/<img[^>]+>/g); // 利用正则，取出所有img标签，数据格式为数组
              let self = this;
              self.uploadimgList = [];
              img.forEach(function(obj){
                  var reg = /(?<=(src="))[^"]*?(?=")/ig;
                  var surl=obj.match(reg);
                  self.uploadimgList.push({"url":surl,"isActive":false});          
              });
            }
        },
        // created() {
        //     this.searchData.corpShortName = this.$route.query.corpShortName || ''
        //     this.searchData.storeName = this.$route.query.storeName || ''
        //     this.init();
        // },
        mounted() {
            this.$dragging.$on('dragged', ({ value }) => {
                console.log(value.item)
                console.log(value.list)
                console.log(value.group)
            })
        }
    };
</script>
<style>
.ivu-input {
    min-height: 79px !important; 
}
.imglistleft {
    padding: 25px 0 0 20px;
}
.tuptextareaClass textarea{
    min-height: 80px !important;
}
.popupUploadImg {
    width: 100%;
    height: 100PX;
    position: absolute;
    top: 50%;
    margin-top: -50px;
    left: 0;
    right: 0;
    text-align: center;
}
.popupUploadImg p{
    line-height: 50px;
    color: #333;
}
.gallery-img {
    position: relative;
    width: 102px;
    height: 78px;
    text-align: center;
    margin: 0 auto;
    overflow: hidden;
}
.gallery-img img{
    width: 100%;
    height: 100%;
}
.imagesBotton {
    width: 100%;
    height: 100px;
    line-height: 100px;
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
.articlePopupBack {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
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
  display: inline;

}
.avatar-uploader img {
      width: 180px;
  height: 180px;
}
.el-radio-group {
  line-height: 50px;
}
.ql-toolbar.ql-snow {
        border: 0px solid #FFFFFF;
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

  .ql-container.ql-snow {
      border: 0px;
  }
  .color-item{
    border:1px solid #f1f1f1;
    padding:10px 5px;
    margin:5px 0;
    border-radius: 4px;
  }
</style>
