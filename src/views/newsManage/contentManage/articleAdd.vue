<template>
<div class="articleContainer">
    <el-form ref="form" :model="form" label-width="80px">
    <div class="publictop">
        <div class="articleTitle">发表文章</div>
        <div class="syl-editor-input">
            <span class="tui2-input-wrapper">
                <el-input v-model="form.title"  placeholder="请输入文章标题（5-30个汉字）"></el-input>
            </span>
        </div>
        <quill-editor v-model="form.content"
                ref="myQuillEditor" 
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
                >
        </quill-editor>
        <el-row>
        <el-col :span="2"><div class="grid-content bg-purple fmtitle">封面</div></el-col>
        <el-col :span="22">
            <div class="grid-content bg-purple-light">
                <el-radio-group v-model="radio2">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="2">三图</el-radio>
                    <el-radio :label="3">无</el-radio>
                </el-radio-group>      
            </div>
            <div v-show="radio2===1">
                    <div class="avatar-uploader">                    
                            <img @click="uploadImg" src="./img/suoluetu.png"/>
                    </div>
            </div>
            <div v-show="radio2===2">
                    <div class="avatar-uploader">                    
                            <img @click="uploadImg" src="./img/suoluetu.png"/>
                    </div>
                    <div class="avatar-uploader">                    
                            <img @click="uploadImg" src="./img/suoluetu.png"/>
                    </div>
                    <div class="avatar-uploader">                    
                            <img @click="uploadImg" src="./img/suoluetu.png"/>
                    </div>      
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
            <labelList></labelList>
        </el-form-item>

        <div class="acticleSubmit">
            <el-button type="primary" @click="releaseNews">发布</el-button>
            <el-button type="ghost" style="margin-left: 8px" @click="timingRelease">定时发布</el-button>
            <el-button>预览</el-button>
            <el-button>存为草稿</el-button>
        </div>
  
    </div>

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
        </ul>

        <div class="botton">
            <el-button type="primary" @click="confirmxz()">确定</el-button>
            <el-button @click="cancelFun()">取消</el-button>
        </div>
    </div>
    <div class="articlePopupBack" @click="uploadImg" v-if="uploadimgFlag"></div>
</el-form>
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
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction
        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                      // remove formatting button
    ]
    export default {
        name: 'articleAdd',
        components: {
            timingRelease,
            labelList
        },
        data() {
            return {
                content:null,
                uploadFlag: false,
                radio2: 3,
                dialogImageUrl: '',
                dialogVisible: false,
                uploadimgFlag: false,
                imgDom: "",
                selectImgSrc: "",
                columnList: [],
                LabelList: [],
                // 七牛云的上传地址，根据自己所在地区选择，我这里是华南区
                domain: '/cmsapi/sys/uploadImg',
                uploadimgList: [],
                vshowTimeSelect: false,
                form: {
                    title: '',
                    content: '',
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
                                    document.querySelector('#iviewUp input').click();
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
        watch: {

        },
        computed: {},
        methods: {
            // 上传文件到七牛云
            upqiniu (req) {
                this.uploadFun(req);
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
                console.log(time);
                this.vshowTimeSelect = !this.vshowTimeSelect;
            },
            callBackTimeCancel() {
                this.vshowTimeSelect = !this.vshowTimeSelect;
            },
            timingRelease() {
                this.vshowTimeSelect = !this.vshowTimeSelect;
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
                console.log(file.data);
                let selfQuill = this.$refs.myQuillEditor.quill;
                let length = selfQuill.getSelection().index;
                selfQuill.insertEmbed(length, 'image', file.data);
                // 调整光标到最后
                selfQuill.setSelection(length + 1)                
            },
            uploadImg() {
                this.uploadimgFlag = !this.uploadimgFlag;
                this.uploadimgList.forEach(function(obj){
                    obj.isActive = false;
                });
                var el = event.currentTarget;
                this.imgDom = el;
            },
            confirmxz() {
                this.uploadimgFlag = !this.uploadimgFlag;
                this.imgDom.src = this.selectImgSrc;
            },
            cancelFun() {
                this.uploadimgFlag = !this.uploadimgFlag;
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
            },
            releaseNews() {
                console.log(this.form);
                //  api.addArticle(pas).then(response => {

                //     console.log("response",response);
                // }).catch(response => {
                //     this.$Notice.warning({
                //         title: response.msg
                //     });
                // })               
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
  .el-input__inner {
      border-top:0px solid #dcdfe6; 
      border-left:0px solid #dcdfe6; 
      border-right:0px solid #dcdfe6; 
      border-bottom:1px solid #dcdfe6; 
  }
  .ql-container.ql-snow {
      border: 0px;
  }
</style>
