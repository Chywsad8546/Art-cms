<template>
<div class="articleContainer">
    <div class="publictop">
        <div class="articleTitle">上传视频</div>
        <!-- <div class="imagesBotton">
           <Upload 
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :format="['mp4']"
                    :on-format-error="handleFormatError"
                    action="/cmsapi/sys/uploadVideo" 
                    >
                <i-button type="primary">上传视频</i-button>
            </Upload>
        </div> -->
    </div>

    <i-form :model="formItem" :label-width="80">
        <Form-item label="标题">
            <i-input :value.sync="formItem.input" placeholder="请输入标题"></i-input>
        </Form-item>
        <Form-item label="视频简介">
            <i-input :value.sync="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
        </Form-item>
        <Form-item label="视频">
                <div class="fmslt">
                    <Upload 
                            :show-upload-list="false"
                            :on-success="handleSuccess"
                            :format="['mp4']"
                            :on-format-error="handleFormatError"
                            action="/cmsapi/sys/uploadVideo" 
                            >
                        
                        <img ref="videoUpDom" src="./img/suoluetu.png"/>
                        <el-button type="primary">上传视频</el-button>
                    </Upload>
                </div>
                
        </Form-item>
        <Form-item label="封面">
                <div class="fmslt">
                    <img ref="videoCoverThum" @click="fmImgSetupFun" src="./img/suoluetu.png"/>
                    <el-button type="primary" @click="fmImgSetupFun">设置视频封面</el-button>
                </div>
                
        </Form-item>
        <Form-item label="栏目">
            <el-checkbox-group v-model="columnList">
                <el-checkbox label="栏目1"></el-checkbox>
                <el-checkbox label="栏目2"></el-checkbox>
                <el-checkbox label="栏目3"></el-checkbox>
            </el-checkbox-group>
        </Form-item>
        <Form-item label="标签">
          <labelList></labelList>
            <!-- <div class="labelreact">
                <el-input style="width:200px"  placeholder="请输入2-6个字"></el-input>
                <ul class="positrelater" style="display:none">
                    <li>标签1</li>
                    <li>标签2</li>
                    <li>标签1</li>
                    <li>标签2</li>
                    <li>标签1</li>
                    <li>标签2</li>
                    <li>标签1</li>
                    <li>标签2</li>
                </ul>
            </div>
            <div class="selectLabel">
                <ul>
                    <li v-for="labelList in labelArrList"><div class="labelLi"><span class="className">{{labelList}}</span><span @click="" class="classClose">×</span></div></li>
                   
                </ul>
            </div> -->
        </Form-item>
        <Form-item label="来源">
            <i-input :value.sync="formItem.input" placeholder="请输入标题"></i-input>
        </Form-item>
        <Form-item label="作者">
            <i-input :value.sync="formItem.input" placeholder="请输入标题"></i-input>
        </Form-item>
        <Form-item>
            <el-button type="primary" @click="contentRelease">发布</el-button>
            <el-button type="ghost" style="margin-left: 8px" @click="timingRelease">定时发布</el-button>
            <el-button type="ghost" style="margin-left: 8px">草稿箱</el-button>
        </Form-item>
    </i-form>
    <uploadzhImg @child-event='parEvent' @cancel-event='cancleCallBack' @backColor-event='colorCallBack' v-show="uplopopDisplay"></uploadzhImg>
    <timingRelease @confirm-event = "callBackTime" @cancel-event = "timingRelease" v-show="vshowTimeSelect"></timingRelease>
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
                formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                },
                uplopopDisplay: false,
                imgVideoDom: "",
                columnList: [],
                vshowTimeSelect: false,
                labelArrList:["标签5","标签2"]
            }
        },
        methods: {
            handleSuccess (res, file) {
                let self = this;
                setTimeout(function(){
                    self.apiuploadVideo(file.response.data);
                }, 6000);
            },
            apiuploadVideo (pas){
                api.uploadVideo(pas).then(response => {
                    this.$refs.videoUpDom.src = response.data.data.coverURL;
                    console.log("response",response);
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
            contentRelease() {
                console.log(this.checkList);
            },
            timingRelease() {
                this.vshowTimeSelect = !this.vshowTimeSelect;
            },
            callBackTime() {

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
</style>
