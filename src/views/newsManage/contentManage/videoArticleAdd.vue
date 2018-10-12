<template>
<div class="articleContainer">
    <div class="publictop">
        <div class="articleTitle">上传视频</div>
    </div>
    <Form :model="form" :label-width="80">
        <FormItem label="标题">
            <Input v-model="form.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="视频简介">
            <Input v-model="form.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入视频简介"></Input>
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
                            :format="['mp4']"
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
        <FormItem label="来源">
            <Input v-model="form.source" placeholder="请输入来源"></Input>
        </FormItem>
        <FormItem label="作者">
            <Input v-model="form.author" placeholder="请输入作者"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="contentRelease(1)" :disabled="isDisable">发布</Button>
            <Button @click="timingSubRelease" :disabled="isDisable">定时发布</Button>
            <Button @click="contentRelease(2)" :disabled="isDisable">草稿箱</Button>
        </FormItem>
    </Form>
    <uploadzhImg @child-event='parEvent' @cancel-event='cancleCallBack' @backColor-event='colorCallBack' v-show="uplopopDisplay"></uploadzhImg>
    <timingRelease @confirm-event = "callBackTime" @cancel-event = "timingSubRelease" v-show="vshowTimeSelect"></timingRelease>
</div>
</template>
<script>
    import api from '../../../api/news/index.js';
    import { setTimeout } from 'timers';
    import uploadzhImg from './components/uploadzhImg.vue';
    import timingRelease from './components/timingRelease.vue';
    import labelList from './components/labelLiat.vue';
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
                    content: {},
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
                    textarea:""
                },
                uplopopDisplay: false,
                imgVideoDom: "",
                columnList: [],
                vshowTimeSelect: false,
                labelArrList:[],
                chaneeljmList:[],
                Lid: {},
                parentlabelMsg: [],
                loadingFlag: false,
                isDisable: false
            }
        },
        created() {
            this.newsChaneelList();
            this.Lid.id = this.$route.query.newsId;
            if(this.Lid.id != undefined){
                this.getNewsDetail();
            }
        },
        methods: {
            getNewsDetail() {
                api.getNewsDetail(this.Lid).then(response => {
                    this.form.title = response.data.data.title;
                    let jsonContent = JSON.parse(response.data.data.content);
                    this.form.textarea = jsonContent.textarea;
                    this.$refs.videoCoverThum.src=response.data.data.listImg[0];
                    this.$refs.videoUpDom.src = jsonContent.coverURL;
                    this.form.content.duration = jsonContent.duration;
                    this.form.content.coverURL = jsonContent.coverURL;
                    this.form.content.playURL = jsonContent.playURL;
                    this.form.content.size = jsonContent.size;
                    this.parentlabelMsg = response.data.data.tagsName;
                    this.form.type = response.data.data.type+'';
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
                }, 6000);
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
                    this.$refs.videoUpDom.src = response.data.data.coverURL;
                    this.form.content.duration = response.data.data.duration;
                    this.form.content.coverURL = response.data.data.coverURL;
                    this.form.content.playURL = response.data.data.playURL;
                    this.form.content.size = response.data.data.size;
                    this.loadingFlag = false;
                }).catch(response => {
                    this.$Notice.warning({
                        title: response.msg
                    });
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
                if (this.form.title==="") {
                    this.$Notice.warning({
                        title: "请输入标题"
                    });
                    return false;
                }
                if(this.form.content.length===0){
                    this.$Notice.warning({
                        title: "请上传视频"
                    });
                    return false;
                }
                this.isDisable = true
                setTimeout(() => {
                    this.isDisable = false
                }, 1000)
                this.form.content.textarea = this.form.textarea;
                this.form.content = JSON.stringify(this.form.content);
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
                this.form.tagsName = data[0].arr1;
                this.form.tags = data[0].arr2;
            },
            callBackTime(time) {
                this.form.publishAt = time;
                this.vshowTimeSelect = !this.vshowTimeSelect;
                this.contentRelease(0);
            }
        }
    }
</script>
<style>

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
