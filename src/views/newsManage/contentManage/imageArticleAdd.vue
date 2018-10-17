<template>
<div class="articleContainer">
    <Form ref="formInline" :model="form" :rules="rules" :label-width="80">
    <div class="publictop">
        <div class="articleTitle">发表图集</div>
    <div>
        <FormItem label="标题">
            <Input v-model="form.title" placeholder="请输入标题"></Input>
        </FormItem>
        <div class="color-list">
        <div 
            class="color-item" 
            v-for="ImgArr,index in pitchImgArr" v-dragging="{ item: ImgArr, list: pitchImgArr, group: 'ImgArr' }"
            :key="ImgArr.img">  
                    <div class="gallery-img">
                        <img :src="ImgArr.img"/>
                    </div>                
                    <div class="areainput">
                        <Input v-model="ImgArr.describe" type="textarea" :rows="4" placeholder="图片说明（不超过150个子）" />             
                    </div>
                    <div class="czCon">
                        <Button type="primary" @click="editUpimg(index)">换图</Button>
                        <Button  @click="removeImg(index)">删除</Button>  
                        <Button >拖动排序</Button>             
                    </div>
        </div>
        </div>
        <div class="imagesBotton">
            <Button type="primary" @click="showPopupClick(3)">添加图片</Button>
        </div>
        <FormItem label="封面">
            <div class="grid-content bg-purple-light">
                <RadioGroup v-model="form.listType">
                    <Radio label='1'>单图</Radio>
                    <!-- <Radio label='2'>三图</Radio>
                    <Radio label='0'>无</Radio> -->
                </RadioGroup>    
            </div>
            <div v-show="form.listType==='1'">
                <div class="avatar-uploader" v-if="coverImgOne.length > 0">                    
                    <img v-for="imgOne,index in coverImgOne" @click="coverEditUpImg(index)" :src="imgOne"/>
                </div>
                 <div class="avatar-uploader" v-else>                    
                    <img @click="showPopupClick(2)" src="./img/suoluetu.png"/>
                </div>               
            </div>
            <div v-show="form.listType==='2'">
                <div class="avatar-uploader" v-if="coverImgTrue.length > 0" v-for="imgOne,index in coverImgTrue">                    
                    <img @click="coverEditUpImg(index)" :src="imgOne"/>
                </div>
                <div class="avatar-uploader" v-if="coverImgTrue.length < 1">                    
                        <img @click="showPopupClick(2)" src="./img/suoluetu.png"/>
                </div>
                <div class="avatar-uploader"  v-if="coverImgTrue.length < 2">                    
                        <img @click="showPopupClick(2)" src="./img/suoluetu.png"/>
                </div>
                <div class="avatar-uploader" v-if="coverImgTrue.length < 3">                    
                        <img @click="showPopupClick(2)" src="./img/suoluetu.png"/>
                </div>      
            </div>
        </FormItem>
        <FormItem label="栏目">
            <CheckboxGroup v-model="form.topic" @on-change="lanmuChange">
                <Checkbox v-for="list,index in chaneeljmList" :label="list.id">{{list.title}}</Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="标签">
            <labelList @labelArr-event="callBacklabelFun" v-bind:parentlabelMsg="parentlabelMsg"></labelList>
        </FormItem>
        <FormItem label="级别">
            <RadioGroup v-model="form.recommendLevel">
                <Radio label='1'>1级</Radio>
                <Radio label='2'>2级</Radio>
                <Radio label='3'>3级</Radio>
            </RadioGroup>               
        </FormItem>
        <FormItem label="来源" style="width:200px;">
            <Input v-model="form.source" placeholder="请输入来源"></Input>
        </FormItem>
        <FormItem label="作者" style="width:200px;">
            <Input v-model="form.author" placeholder="请输入作者"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="releaseNews(1)" :disabled="isDisable">发布</Button>        
            <Button v-show="isTimeFlag" @click="timingSubRelease" :disabled="isDisable">定时发布</Button>
            <Button style="margin-left: 8px" @click="previewFun(1)" :disabled="isDisable">预览</Button>
            <Button v-show="isDraftFlag" @click="releaseNews(2)" :disabled="isDisable">存为草稿</Button>
        </FormItem>
 </div> 
    </div>
<!-- 上传图片组件 -->
    <uploadzhImg @child-event='confirmParEvent' @cancel-event='cancleCallBack'  v-show="uplopopDisplay"></uploadzhImg>
    <timingRelease @confirm-event = "callBackTime" @cancel-event = "callBackTimeCancel" v-show="vshowTimeSelect"></timingRelease>

    <Modal v-model="qrcodeModal" width="500">
        <p slot="header" style="color:#f60;text-align:center">
            <span></span>
        </p>
        <Tabs type="card">
            <TabPane label="WEB预览">
                <div style="text-align:center">
                    <p class="qrcode" id="qrcode"></p>
                </div>
            </TabPane>
            <TabPane label="APP预览">    
                <div class="appcodePop">      
                    <Input v-model="form.appCode" style="width:100px;float:left;margin-right:10px;" placeholder="请输入appCode"></Input>
                    <FormItem>
                         <Button type="primary" @click="previewFun(2)">保存</Button>
                    </FormItem>
                </div>
            </TabPane>
        </Tabs>
        <div slot="footer">
        </div>
    </Modal>
</Form>
</div>
</template>
<script>
    import api from '../../../api/news/index.js';
    import labelList from './components/labelLiat.vue';
    import uploadzhImg from './components/uploadzhImg.vue';
    import timingRelease from './components/timingRelease.vue';
    import QRCode from 'qrcodejs2';
    export default {
        name: 'articleAdd',
        components: {
            labelList,
            uploadzhImg,
            timingRelease
        },
        data() {
            return {
                content:null,
                uploadFlag: false,
                radio2: 1,
                dialogImageUrl: '',
                dialogVisible: false,
                uploadimgFlag: false,
                uplopopDisplay:false,
                imgDom: "",
                selectImgSrc: "",
                pitchImgArr: [],
                upState: 0,
                imgIndex: 0,
                columnList: [],
                LabelList: [],
                coverImgOne: [],
                coverImgTrue: [],
                chaneeljmList: [],
                vshowTimeSelect:false,
                parentlabelMsg: [],
                Lid: {},
                isDisable: false,
                qrcodeModal: false,
                isTimeFlag:true,//控制定时发布按钮显示
                isDraftFlag:true,//控制草稿按钮显示
                tagsJson:{//保存标签全局json用
                        "1":[],
                        "2":[],
                        "3":[],
                        "4":[],
                        "5":[],
                        "6":[],
                        "7":[]
                },
                form: {
                    title: '',
                    content: [],
                    preContent:[],
                    isPublish: 1,//发布状态(0:待发布,1:已发布,2:草稿，3撤稿)
                    listType: '1',//封面样式(0:大标题,1:单图,2:多图,3:视频)
                    source: '', //文章来源
                    publishAt: '',
                    tags: [],
                    tagsName: [],
                    listImg:[],//封面图片数组
                    type:1,//内容类型(0:图文,1:图集,2:视频)
                    author:'',
                    topic:[],
                    topicName:[],  //栏目数组
                    recommendLevel:'',//1 2 3 级
                    tagsJson:{
                        "1":[],
                        "2":[],
                        "3":[],
                        "4":[],
                        "5":[],
                        "6":[],
                        "7":[]
                    },
                    appCode:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]
                },
                // 七牛云的上传地址，根据自己所在地区选择，我这里是华南区
                domain: '/cmsapi/sys/uploadImg',
                uploadimgList: []
            };
        },
        watch: {

        },
        created() {
            this.newsChaneelList();
            this.Lid.id = this.$route.query.newsId;
            if(this.Lid.id != undefined){
                setTimeout(()=>{
                     this.getNewsDetail();
                },500); 
            }
        },
        computed: {},
        methods: {
            getNewsDetail() {
                api.getNewsDetail(this.Lid).then(response => {
                    this.form.title = response.data.data.title;
                    if(response.data.data.tagsJson){
                        this.tagsJson = JSON.parse(response.data.data.tagsJson);
                        this.parentlabelMsg = JSON.parse(response.data.data.tagsJson);
                    }
                    if(response.data.data.content){
                        this.form.content = response.data.data.content;
                        this.pitchImgArr = JSON.parse(response.data.data.content);
                    }
                    if(response.data.data.topic){
                        this.form.topic = response.data.data.topic;
                    }
                    let isPublish = response.data.data.isPublish;
                    if(isPublish === 3 || isPublish === '3'){
                        this.isTimeFlag = false;
                    }
                    if(isPublish === 1 || isPublish === '1' || isPublish === '0' || isPublish === 0){
                        this.isDraftFlag = false;
                    }
                    this.form.recommendLevel = response.data.data.recommendLevel+'';       
                    this.form.source = response.data.data.source;
                    this.form.author = response.data.data.author;
                    this.form.listType = response.data.data.listType+'';
                    if(this.form.listType === 1 || this.form.listType === '1'){
                        if(response.data.data.listImg){
                            this.coverImgOne = response.data.data.listImg;
                        }                    
                    }else if(this.form.listType === 2 || this.form.listType === '2'){
                        if(response.data.data.listImg){
                            this.coverImgTrue = response.data.data.listImg;
                        }                    
                    }
                })
            },
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

            },
            handleRemove(file, fileList) {
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
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
            confirmParEvent(data) {//弹框确定事件
                this.uplopopDisplay = !this.uplopopDisplay;
                if(this.upState === 1){
                    this.pitchImgArr[this.imgIndex].img = data;
                    return false;
                }
                if(this.upState === 2){
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
                    return false;
                }
                let imgArr = {"img":data,"describe":""};
                this.pitchImgArr.push(imgArr);

            },
            cancleCallBack() {//弹框取消事件
                this.uplopopDisplay = !this.uplopopDisplay;
            },
            coverEditUpImg(index) {
                this.upState = 2;
                this.uplopopDisplay = !this.uplopopDisplay;
                this.coverImgIndex = index;
            },   
            showPopupClick(state) {//弹框取消事件
                this.upState = state;
                this.uplopopDisplay = !this.uplopopDisplay;
            },
            editUpimg(index) {
                this.upState = 1;
                this.imgIndex = index;
                this.uplopopDisplay = !this.uplopopDisplay;
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
            callBacklabelFun(data){
                this.form.tags = [];
                this.form.tagsName = [];
                let arr = ["1","2","3","4","5","6","7"];  
                arr.forEach(key => {
                    this.tagsJson[key] = [];
                    data[key].forEach(item=> {                       
                        this.form.tags.push(item.value);
                        this.form.tagsName.push(item.label);
                        this.tagsJson[key].push(item.value);
                    })               
                });
            },
            newsChaneelList() {
                api.newsChaneelList().then(response => {
                    this.chaneeljmList = response.data.data;
                }).catch(response => {
                    this.$Notice.warning({
                        title: "栏目获取失败"
                    });
                })                
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
            releaseNews(type) {//发布按钮
                if(this.verification() == false){
                    return false;
                }
                this.typeKeepArr();
                this.preventRepeatClick();
                this.form.content = JSON.stringify(this.pitchImgArr);
                this.form.isPublish = type;
               if(this.Lid.id != undefined){
                    this.form.id = this.Lid.id;
                    api.editArticle(this.form).then(response => {
                            this.$Modal.success({
                                title: '',
                                content: "修改成功"
                            });
                            this.setJumpFun();
                    }) 
                }else{
                    api.addArticle(this.form).then(response => {
                            this.$Modal.success({
                                title: '',
                                content: "发布成功"
                            });
                            this.setJumpFun();
                    }) 
                }            
            },
            preventRepeatClick() {
                this.isDisable = true;
                setTimeout(() => {
                    this.isDisable = false
                }, 1000)
            },
            typeKeepArr() {
                if(this.form.listType === '1' || this.form.listType === 1){
                    this.form.listImg = this.coverImgOne;
                }else if(this.form.listType === '2' || this.form.listType === 2){
                    this.form.listImg = this.coverImgTrue;
                }else{
                    this.form.listImg = [];
                }
                this.form.tagsJson = JSON.stringify(this.tagsJson);
            },
            verification() {//验证方法
                if (this.form.title==="") {
                    this.$Notice.warning({
                        title: "请输入标题"
                    });
                    return false;
                }
                if(this.pitchImgArr.length <= 0){
                    this.$Notice.warning({
                        title: "请添加图片"
                    });
                    return false;
                }
               if(this.form.listType === '1' || this.form.listType === 1){
                    if(this.coverImgOne.length<=0){
                        this.$Notice.warning({
                            title: "请上传封面"
                        });
                        return false;
                    }
                }else if(this.form.listType === '2'|| this.form.listType === 2){
                    if(this.coverImgTrue.length < 3){
                        this.$Notice.warning({
                            title: "请上传三封面"
                        });
                        return false;
                    }
                }
                if(this.form.recommendLevel == ''){
                        this.$Notice.warning({
                            title: "请选择图集级别"
                        });
                        return false;
                }
            },
            setJumpFun(){
                setTimeout(()=>{
                    this.$router.push({
                        name: "newsManageList"
                    });
                },1000);
            },
            previewFun(type) {//预览事件
                if(this.verification() == false){
                    return false;
                }
                this.preventRepeatClick();
                this.typeKeepArr();//通过选项判断封面数组
                if(this.Lid.id != undefined){
                        this.form.id = this.Lid.id;
                }
                this.form.content = JSON.stringify(this.pitchImgArr);
                this.form.preContent = JSON.stringify(this.pitchImgArr);
                api.addPreview(this.form).then(response => {
                    this.form.id = response.data.data.id;
                    this.qrcodeModal = !this.qrcodeModal;
                    let pre = response.data.data.pre;
                    let sign = response.data.data.sign;
                    let id = response.data.data.id;
                    let timestamp = response.data.data.timestamp;
                    if(type == 2){
                        this.$Modal.success({
                            title: '',
                            content: "保存成功请在APP上预览"
                        });                     
                    }
                    let url = 'http://appdev.toutiaofangchan.com/#/look/images?id='+id+'&pre='+pre+'&sign='+sign+'&timestamp='+timestamp;
                    document.getElementById("qrcode").innerHTML = "";
                    this.qrcode(url);
                });
            },
            qrcode (url) {
                let qrcode = new QRCode('qrcode', {
                    width: 200,
                    height: 200, // 高度
                    text: url // 二维码内容
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f'
                    // foreground: '#ff0'
                })
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
            });
        }
    };
</script>
<style>
.appcodePop {
    width: 170px;
    margin: 0 auto;
    overflow: hidden;
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
    float: left;
    margin-right: 10px;
    overflow: hidden;
}
.gallery-img img{
    width: 100%;
    height: 100%;
}
.qrcode {
    width: 200px;
    height: 200px;
    margin: 0 auto;
}
.areainput {
    width: 60%;
    overflow: hidden;
    float: left;
    margin-right: 10px;
}
.czCon {
    width: 24%;
    float: left;
    padding-top: 20px;
    overflow: hidden;
}
.color-list {
    width: 100%;
    overflow: hidden;
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

/* 
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

.uploadModal {
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
  .color-item{
    border:1px solid #f1f1f1;
    padding:10px 5px;
    margin:5px 0;
    border-radius: 4px;
    overflow: hidden;
  }
</style>
