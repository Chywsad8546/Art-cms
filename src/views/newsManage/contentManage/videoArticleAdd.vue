<template>
<div class="articleContainer">
    <div class="publictop">
        <div class="articleTitle">上传视频</div>
    </div>
    <Form :model="form" :rules="ruleValidate" :label-width="80">
        <FormItem label="标题" prop="title">
            <Input v-model="form.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="视频简介">
            <Input v-model="form.content.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入视频简介"></Input>
        </FormItem>
        <FormItem label="视频">
                <Row v-if="loadingFlag">
                    <Col class="demo-spin-col" span="8">
                        <Spin fix>
                            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                            <div>Loading</div>
                        </Spin>
                    </Col>
                </Row>
                <div class="fmslt" v-show="loadingFlag===false">
                    <Upload
                            :show-upload-list="false"
                            :on-success="handleSuccess"
                            :format="['mp4','rm','rmvb','wma','avi']"
                            :on-format-error="handleFormatError"
                            action="/cmsapi/sys/uploadVideo"
                            >
                        <img ref="videoUpDom" src="./img/suoluetu.png"/>
                        <Button type="primary">上传视频</Button>
                    </Upload>
                </div>
        </FormItem>
        <FormItem label="封面">
                <div class="fmslt">
                    <img ref="videoCoverThum" @click="fmImgSetupFun" src="./img/suoluetu.png"/>
                    <Button type="primary"  @click="fmImgSetupFun">设置视频封面</Button>
                </div>

        </FormItem>
        <FormItem label="播放方式">
            <RadioGroup v-model="form.type">
                <Radio label="2">横屏模式</Radio>
                <Radio label="3">竖屏模式</Radio>
            </RadioGroup>
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
        <FormItem label="来源">
            <Input v-model="form.source" placeholder="请输入来源"></Input>
        </FormItem>
        <FormItem label="作者">
            <Input v-model="form.author" placeholder="请输入作者"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="contentRelease(1)" :disabled="isDisable">发布</Button>
            <Button v-show="isTimeFlag" @click="timingSubRelease" :disabled="isDisable">定时发布</Button>
            <Button style="margin-left: 8px" @click="previewFun(3)" :disabled="isDisable">预览</Button>
            <Button v-show="isDraftFlag" @click="contentRelease(3)" :disabled="isDisable">草稿箱</Button>
        </FormItem>
        <Modal v-model="qrcodeModal" @on-cancel="previewCancel" width="500">
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
                            <Button type="primary" @click="previewAppFun(form.isPublish)">保存</Button>
                        </FormItem>
                    </div>
                </TabPane>
            </Tabs>
            <div slot="footer">
            </div>
        </Modal>


    </Form>
    <uploadzhImg @child-event='parEvent' @cancel-event='cancleCallBack' @backColor-event='colorCallBack' v-show="uplopopDisplay" v-bind:uploadImgMsg="uploadImgMsg" ></uploadzhImg>
    <timingRelease @confirm-event = "callBackTime" @cancel-event = "timingSubRelease" v-show="vshowTimeSelect"></timingRelease>
</div>
</template>
<script>
    import api from '../../../api/news/index.js';
    import { setTimeout } from 'timers';
    import uploadzhImg from './components/uploadzhImg.vue';
    import timingRelease from './components/timingRelease.vue';
    import labelList from './components/labelLiat.vue';
    import QRCode from 'qrcodejs2';
     export default {
        components: {
            uploadzhImg,
            timingRelease,
            labelList
        },
        data () {
            return {
                form: {
                    title: '',
                    content: {textarea:''},
                    preContent:{},
                    isPublish: 0,
                    listType: 3,
                    source: '',
                    publishAt: '',
                    tags: [],
                    tagsName: [],
                    listImg: [],
                    type:'2',
                    author:'',
                    topic:[],
                    topicName:[],
                    textarea:"",
                    recommendLevel:'',
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
                uplopopDisplay: false,
                imgVideoDom: "",
                columnList: [],
                vshowTimeSelect: false,
                labelArrList:[],
                chaneeljmList:[],
                Lid: {},
                parentlabelMsg: [],
                uploadImgMsg: '',
                loadingFlag: false,
                isDisable: false,
                qrcodeModal: false,
                isTimeFlag:true,//控制定时发布按钮显示
                isDraftFlag:true,//控制草稿按钮显示
                flagPreview:false,
                tagsJson:{//保存标签全局json用
                        "1":[],
                        "2":[],
                        "3":[],
                        "4":[],
                        "5":[],
                        "6":[],
                        "7":[]
                },
                ruleValidate: {
                    title: [
                        { type: 'string', max: 25, message: '已超过25个字', trigger: 'change' }
                    ],
                },
            }
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
        methods: {
            previewCancel() {
                if(this.form.isPublish == 1 && this.flagPreview == false){
                    setTimeout(()=>{
                        this.$router.push({
                            name: "newsManageList"
                        });
                    },1000);
                }
            },
            getNewsDetail() {
                api.getNewsDetail(this.Lid).then(response => {
                    this.form.title = response.data.data.title;
                    if(response.data.data.tagsJson){
                        this.tagsJson = JSON.parse(response.data.data.tagsJson);
                        this.parentlabelMsg = JSON.parse(response.data.data.tagsJson);
                    }
                    let jsonContent = JSON.parse(response.data.data.content);
                    this.form.content.textarea = jsonContent.textarea;
                    this.$refs.videoCoverThum.src=response.data.data.listImg[0];
                    this.$refs.videoUpDom.src = jsonContent.coverURL;
                    this.form.content.duration = jsonContent.duration;
                    this.form.content.coverURL = jsonContent.coverURL;
                    this.form.content.playURL = jsonContent.playURL;
                    this.form.content.size = jsonContent.size;
                    this.form.type = response.data.data.type+'';
                    this.form.recommendLevel = response.data.data.recommendLevel+'';
                    if(response.data.data.topic){
                        this.form.topic = response.data.data.topic;
                    }
                    if(response.data.data.source){
                        this.form.source = response.data.data.source;
                    }
                    if(response.data.data.author){
                       this.form.author = response.data.data.author;
                    }
                    if(response.data.data.listImg){
                        this.form.listImg = response.data.data.listImg;
                    }
                    let isPublish = response.data.data.isPublish;
                    if(isPublish === 1 || isPublish === '1'){
                        this.isTimeFlag = false;
                    }
                    if(isPublish === 1 || isPublish === '1' || isPublish === '0' || isPublish === 0){
                        this.isDraftFlag = false;
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
            handleSuccess (res, file) {
                let self = this;
                this.loadingFlag = true;
                setTimeout(function(){
                    self.apiuploadVideo(file.response.data);
                }, 3000);
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
            apiuploadVideo (pas){
                api.uploadVideo(pas).then(response => {
                    var arr = Object.keys(response.data.data);
                    if(arr.length==0){
                        let _self = this;
                        setTimeout(function(){
                            _self.apiuploadVideo(pas);
                        }, 3000);
                        return false;
                    }
                    this.$refs.videoUpDom.src = response.data.data.coverURL;
                    this.form.content.duration = response.data.data.duration;
                    this.form.content.coverURL = response.data.data.coverURL;
                    this.form.content.playURL = response.data.data.playURL;
                    if(this.form.content.coverURL != null){
                        this.uploadImgMsg = this.form.content.coverURL;
                    }
                    this.form.content.size = response.data.data.size;
                    this.loadingFlag = false;
                })
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            parEvent(data) {
                this.uplopopDisplay = !this.uplopopDisplay;
                this.$refs.videoCoverThum.src = data;
                if(this.form.listImg.length>0){
                    this.form.listImg.splice(0,1,data);
                }else{
                    this.form.listImg.push(data);
                }
                //this.imgVideoDom.src=data;
            },
            fmImgSetupFun() {
                this.uplopopDisplay = !this.uplopopDisplay;
                // var el = event.currentTarget;
                // this.imgVideoDom = el;
            },
            colorCallBack(data) {
                this.uplopopDisplay = !this.uplopopDisplay;
            },
            cancleCallBack() {
                this.uplopopDisplay = !this.uplopopDisplay;
            },
            contentRelease(type) {
                if(this.verification() == false){
                    return false;
                }
                this.preventRepeatClick();
                this.keepArray();
               // this.form.content.textarea = this.form.textarea;
                //this.form.content = JSON.stringify(this.form.content);
                this.form.isPublish = type;
                if(this.Lid.id != undefined){
                        this.form.id = this.Lid.id;
                        api.editArticle(this.form).then(response => {
                                this.prevResponse(response);
                                this.$Modal.success({
                                    title: '',
                                    content: "修改成功"
                                });
                               // this.setJumpFun();
                        })
                    }else{
                        api.addArticle(this.form).then(response => {
                                this.prevResponse(response);
                                this.$Modal.success({
                                    title: '',
                                    content: "发布成功"
                                });
                             //   this.setJumpFun();
                        })
                    }
            },
            verification() {//验证方法
                if (this.form.title==="") {
                    this.$Notice.warning({
                        title: "请输入标题"
                    });
                    return false;
                }
                if(this.form.title.length > 25){
                        this.$Notice.warning({
                            title: "标题不能超过25字"
                        });
                        return false;
                }
                if(JSON.stringify(this.form.content) == "{}"){
                    this.$Notice.warning({
                        title: "请上传视频"
                    });
                    return false;
                }
                if(this.form.listImg.length == 0){
                    this.$Notice.warning({
                        title: "请上传封面"
                    });
                    return false;
                }
                if(this.form.topic.length <= 0){
                    this.$Notice.warning({
                        title: "请选择栏目"
                    });
                    return false;
                }
                if(this.form.recommendLevel == ''){
                    this.$Notice.warning({
                        title: "请选择视频级别"
                    });
                    return false;
                }
            },
            preventRepeatClick() {
                this.isDisable = true;
                setTimeout(() => {
                    this.isDisable = false
                }, 1000)
            },
            setJumpFun(){
                setTimeout(()=>{
                    this.$router.push({
                        name: "newsManageList"
                    });
                },1000);
            },
            timingSubRelease() {
                this.vshowTimeSelect = !this.vshowTimeSelect;
            },
            callBackTime(time) {
                this.form.publishAt = time;
                this.vshowTimeSelect = !this.vshowTimeSelect;
                this.contentRelease(0);
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
            callBackTime(time) {
                this.form.publishAt = time;
                this.vshowTimeSelect = !this.vshowTimeSelect;
                this.contentRelease(0);
            },
            keepArray(){
                this.form.content = JSON.stringify(this.form.content);
                this.form.tagsJson = JSON.stringify(this.tagsJson);
                this.form.preContent = this.form.content;
            },
            previewFun(type) {//预览事件
                if(this.verification() == false){
                    return false;
                }
                this.preventRepeatClick();
                this.keepArray();
                this.form.isPublish = type;
                if(this.Lid.id != undefined){
                        this.form.id = this.Lid.id;
                }
                api.addPreview(this.form).then(response => {
                    this.prevResponse(response);
                });
            },
            previewAppFun(type) {//预览事件
                if(this.verification() == false){
                    return false;
                }
                this.preventRepeatClick();
                this.keepArray();
                this.form.isPublish = type;
                if(this.Lid.id != undefined) {
                    this.form.id = this.Lid.id;
                }
                api.addPreview(this.form).then(response => {
                        this.prevResponse(response);
                        this.$Modal.success({
                            title: '',
                            content: "保存成功请在APP上预览"
                        });
                        this.previewCancel();
                });
            },
            prevResponse(response){
                    this.form.content = JSON.parse(this.form.content);
                    this.form.id = response.data.data.id;
                    this.qrcodeModal = !this.qrcodeModal;
                    let pre = response.data.data.pre;
                    let sign = response.data.data.sign;
                    let id = response.data.data.id;
                    let timestamp = response.data.data.timestamp;
                    let url = '';
                    if(this.form.type === 2 || this.form.type === '2'){
                        url = this.$domain.hshipinDomainurl+'?id='+id+'&pre='+pre+'&sign='+sign+'&timestamp='+timestamp;
                    }else if(this.form.type === 3 || this.form.type === '3'){
                        url = this.$domain.sshipinDomainurl+'?id='+id+'&pre='+pre+'&sign='+sign+'&timestamp='+timestamp;
                    }else{
                        this.$Notice.warning({
                            title: "请选择播放模式"
                        });
                    }
                    document.getElementById("qrcode").innerHTML = "";
                    this.qrcode(url);
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
        }
    }
</script>
<style>
.appcodePop {
    width: 170px;
    margin: 0 auto;
    overflow: hidden;
}
.fmslt {
    width: 166px;
    overflow: hidden;
    text-align: center;
}
.fmslt img {
    width: 100%;
}
.articleContainer {
    background: #FFFFFF;
    overflow: hidden;
    position: relative;
    padding-bottom: 20px;
}
.qrcode {
    width: 200px;
    height: 200px;
    margin: 0 auto;
}
.articleTitle {
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
}
.imagesBotton {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
}
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
</style>
