<template>
    <div class="articleContainer">
        <Form ref="formInline" :model="form" :rules="ruleValidate" :label-width="80">
        <div class="publictop">
            <div class="articleTitle">发表文章</div>
            <FormItem label="标题" prop="title" style="margin-bottom:0px;">
                <Input v-model="form.title" placeholder="请输入标题"></Input>
            </FormItem>
            <FormItem >
                <div v-if="form.title.length > 0" style="height:10px;width:100%;color:red;">当前标题字数：{{form.title.length}}</div>
            </FormItem>
            <FormItem label="内容">
                <quill-editor v-model="form.content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)"
                        >

                        <div id="toolbar" slot="toolbar">
                <span class="ql-formats" title="H1标题"><button type="button" class="ql-header" value="1"></button></span>
                <span class="ql-formats" title="加粗"><button type="button" class="ql-bold"></button></span>
                <span class="ql-formats" title="引用"><button type="button" class="ql-blockquote"></button></span>
                <span class="ql-formats" title="有序列表"><button type="button" class="ql-list" value="ordered"></button></span>
                <span class="ql-formats" title="无序列表"><button type="button" class="ql-list" value="bullet"></button></span>
                <span class="ql-formats">
                    <button type="button" @click="imgClick">
                        <svg viewBox="0 0 18 18">
                            <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
                            <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
                            <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
                        </svg>
                    </button>
                </span>
                <span class="ql-formats">
                    <button type="button" class="ql-link"></button>
                </span>
                <span class="ql-formats">
                    <button type="button" class="ql-clean"></button>
                </span>
                <span class="ql-formats">
                    <select class="ql-align">
                    <option selected="selected"></option>
                    <option value="center"></option>
                    <option value="right"></option>
                    <option value="justify"></option>
                </select>
                </span>
                <span class="ql-formats"><select class="ql-color">
                    <option selected="selected"></option>
                    <option value="#e60000"></option>
                    <option value="#ff9900"></option>
                    <option value="#ffff00"></option>
                    <option value="#008a00"></option>
                    <option value="#0066cc"></option>
                    <option value="#9933ff"></option>
                    <option value="#ffffff"></option>
                    <option value="#facccc"></option>
                    <option value="#ffebcc"></option>
                    <option value="#ffffcc"></option>
                    <option value="#cce8cc"></option>
                    <option value="#cce0f5"></option>
                    <option value="#ebd6ff"></option>
                    <option value="#bbbbbb"></option>
                    <option value="#f06666"></option>
                    <option value="#ffc266"></option>
                    <option value="#ffff66"></option>
                    <option value="#66b966"></option>
                    <option value="#66a3e0"></option>
                    <option value="#c285ff"></option>
                    <option value="#888888"></option>
                    <option value="#a10000"></option>
                    <option value="#b26b00"></option>
                    <option value="#b2b200"></option>
                    <option value="#006100"></option>
                    <option value="#0047b2"></option>
                    <option value="#6b24b2"></option>
                    <option value="#444444"></option>
                    <option value="#5c0000"></option>
                    <option value="#663d00"></option>
                    <option value="#666600"></option>
                    <option value="#003700"></option>
                    <option value="#002966"></option>
                    <option value="#3d1466"></option>
                </select></span>
     </div>
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
                <div v-show="form.listType==='1' || form.listType===1">
                    <div class="avatar-uploader" v-if="coverImgOne.length > 0">
                        <img v-for="imgOne,index in coverImgOne" @click="coverEditUpImg(index)" :src="imgOne"/>
                    </div>
                    <div class="avatar-uploader" v-else>
                        <img @click="coverUpImg" src="./img/suoluetu.png"/>
                    </div>
                </div>
                <div v-show="form.listType==='2' || form.listType===2">
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
                <labelList ref="tabelArrList" @labelArr-event="callBacklabelFun" v-bind:parentlabelMsg="parentlabelMsg"></labelList>
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
                 <Button v-show="isTimeFlag" style="margin-left: 8px" @click="timingSubRelease" :disabled="isDisable">推送文章</Button>
                <Button style="margin-left: 8px" @click="previewFun(3)" :disabled="isDisable">预览</Button>
                <Button v-show="isDraftFlag" style="margin-left: 8px" @click="releaseNews(3)" :disabled="isDisable">存为草稿</Button>
            </FormItem>

        </div>
        <uploadzhImg @child-event='confirmParEvent' @cancel-event='cancleCallBack'  @uploadEditorSuccess-event = 'successPreview' v-show="uplopopDisplay"></uploadzhImg>

    <Modal v-model="qrcodeModal"  width="500" @on-cancel="previewCancel">
        <p slot="header" style="color:#f60;text-align:center">
            <span></span>
        </p>
        <Tabs type="card">
            <TabPane label="WEB预览">
                <div style="text-align:center">
                    <p class="qrcode" id="qrcode1"></p>
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
    <timingRelease @confirm-event = "callBackTime" @cancel-event = "callBackTimeCancel" v-show="vshowTimeSelect"></timingRelease>
    </div>
</template>
<script>
    import api from '../../../api/news/index.js';
    import timingRelease from './components/timingRelease.vue';
    import labelList from './components/labelLiat.vue';
    import uploadzhImg from './components/uploadzhImg.vue';
    import QRCode from 'qrcodejs2';
    import { setTimeout } from 'timers';
    const toolbarOptions = [
        ['cssh1'],
        ['code-block'],
        ['bold'],
        ['blockquote'],
        [{'list': 'bullet'}],
        // [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        // [{'header': [1, false]}],
        // [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        // [{'font': []}],
        [{'align': []}],
        ['link', 'image'],
        ['clean']
        // remove formatting button
    ];
    export default {
        name: 'articleAdd',
        components: {
            timingRelease,
            labelList,
            uploadzhImg
        },
        data() {
            return {
                newCityId: '',
                content: null,
                uploadFlag: false,
                dialogImageUrl: '',
                dialogVisible: false,
                uploadimgFlag: false,
                imgDom: '',
                selectImgSrc: '',
                columnList: [],
                LabelList: [],
                parentlabelMsg: [],
                Lid: {}, // 修改文章用到
                uplopopDisplay: false,
                uploadimgList: [],
                vshowTimeSelect: false,
                coverImgIndex: 0,
                coverImgOne: [],
                coverImgTrue: [],
                chaneeljmList: [],
                isDisable: false,
                flagPreview: false,
                tabs: 2,
                qrcodeModal: false, // 二维码弹框
                isTimeFlag: true, // 控制定时发布按钮显示
                isDraftFlag: true, // 控制草稿按钮显示
                tagsJson: {// 保存标签全局json用
                    '1': [],
                    '2': [],
                    '3': [],
                    '4': [],
                    '5': [],
                    '6': [],
                    '7': []
                },
                form: {
                    title: '',
                    content: '',
                    preContent: '',
                    isPublish: 0, // 发布状态(0:待发布,1:已发布,2:草稿，3撤稿) 是
                    listType: '0', // 封面样式(0:大标题,1:单图,2:多图,3:视频) 是
                    source: '', // 文章来源 否
                    publishAt: '', // 发布时间 否
                    tags: [], // 标签1,2,3  否
                    tagsName: [],
                    listImg: [], // 封面图片数组
                    type: 0, // 内容类型(0:图文,1:图集,2:视频)
                    author: '', // 作者
                    topic: [], // 栏目
                    topicName: [], // 栏目名称
                    recommendLevel: '', // 1  2 3 级
                    tagsJson: {
                        '1': [],
                        '2': [],
                        '3': [],
                        '4': [],
                        '5': [],
                        '6': [],
                        '7': []
                    },
                    appCode: '',
                    releaseType: '',
                    equipmentNumber: ''
                },
                ruleValidate: {
                    title: [
                        { type: 'string', max: 50, message: '已超过50个字', trigger: 'change' }
                    ]
                },
                editorOption: {
                    placeholder: '',
                    theme: 'snow', // or 'bubble'
                    modules: {
                        toolbar: '#toolbar'
                        // toolbar: {
                        // container: toolbarOptions,  // 工具栏
                        // handlers: {
                        //     'image': function (value) {
                        //         if (value) {
                        //             document.querySelector('#iviewUp2 input').click();
                        //         } else {
                        //             this.quill.format('image', false);
                        //         }
                        //     },
                        //     'cssh1': function (value) {
                        //         console.log(11111);
                        //     }
                        // }
                        // }
                    }
                }
            };
        },
        created() {
            this.newsChaneelList();
            this.Lid.id = this.$route.query.newsId;
            if (this.Lid.id != undefined) {
                setTimeout(() => {
                    this.getNewsDetail();
                }, 500);
            }
        },
        watch: {

        },
        computed: {},
        methods: {
            computedByteLen(str) {
                return str.replace(/[^\x00-\xff]/g, '01').length;
            },
            lanmuChange(ids) {
                this.form.topicName = [];
                ids.forEach(id => {
                    this.chaneeljmList.forEach(item => {
                        if (item.id === id) {
                            this.form.topicName.push(item.title);
                        }
                    });
                });
            },
            imgClick() {
                document.querySelector('#iviewUp2 input').click();
            },
            getNewsDetail() {
                api.getNewsDetail(this.Lid).then(response => {
                    this.form.title = response.data.data.title;
                    this.form.content = response.data.data.content;
                    if (response.data.data.topic) {
                        this.form.topic = response.data.data.topic;
                    }
                    if (response.data.data.tagsJson) {
                        this.tagsJson = JSON.parse(response.data.data.tagsJson);
                        this.parentlabelMsg = JSON.parse(response.data.data.tagsJson);
                    }
                    let isPublish = response.data.data.isPublish;
                    if (isPublish === 2 || isPublish === 3) {
                        this.isTimeFlag = true;
                    } else {
                        this.isTimeFlag = false;
                    }
                    if (isPublish === 1 || isPublish === '1' || isPublish === '0' || isPublish === 0) {
                        this.isDraftFlag = false;
                    }
                    this.form.recommendLevel = response.data.data.recommendLevel + '';
                    this.form.source = response.data.data.source;
                    this.form.author = response.data.data.author;
                    this.form.newCityId = response.data.data.newCityId;
                    this.form.districtId = response.data.data.districtId;
                    this.form.listType = response.data.data.listType + '';
                    if (this.form.listType === 1 || this.form.listType === '1') {
                        if (response.data.data.listImg) {
                            this.coverImgOne = response.data.data.listImg;
                        }
                    } else if (this.form.listType === 2 || this.form.listType === '2') {
                        if (response.data.data.listImg) {
                            this.coverImgTrue = response.data.data.listImg;
                        }
                    }
                });
            },
            callBacklabelFun(data) {
                this.form.tags = [];
                this.form.tagsName = [];
                this.form.showTags = [];
                this.form.showTagsName = [];
                this.form.newCityId = '';
                this.form.districtId = ''
                let arr = ['1', '2', '3', '4', '5', '6', '7'];
                arr.forEach(key => {
                    this.tagsJson[key] = [];
                    data[key].forEach(item => {
                        if (key != '1' && key != '2' && key != '3' && key != '6') {
                            this.form.showTags.push(item.value);
                            this.form.showTagsName.push(item.label);
                        }
                        if (key == '2'){
                            api.getCityId({'cityName': item.label}).then(response => {
                                this.form.newCityId = response.data;
                                this.newCityId = response.data;
                                this.form.districtId = ''
                            })
                        }

                        if (key == '3'){
                            api.getDistrictId({'cityId': this.newCityId, 'districtName': item.label}).then(response => {
                                console.log(response.data)
                                this.form.districtId = response.data;
                            })
                        }
                        this.form.tags.push(item.value);
                        this.form.tagsName.push(item.label);
                        this.form.cityId = item.label;
                        // console.log(item);
                        this.tagsJson[key].push(item.value);
                    });
                });
            },
            // 验证文件合法性
            beforeUpload (file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            onEditorBlur() { // 失去焦点事件
                //  console.log(this.content);
            },
            onEditorFocus() { // 获得焦点事件

            },
            callBackTime(callBackValue) {
                this.form.publishAt = callBackValue.callBackTime;
                this.form.releaseType = callBackValue.releaseType;
                if (callBackValue.releaseType === '4') {
                    this.form.equipmentNumber = callBackValue.equipmentNumber;
                }
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
                }).catch(response => {
                    this.$Notice.warning({
                        title: '栏目获取失败'
                    });
                });
            },
            selectSort(data) {
                this.uploadimgList.forEach(function(obj) {
                    obj.isActive = false;
                });
                data.isActive = !data.isActive;
                this.selectImgSrc = data.url;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            successPreview(file) {
                let selfQuill = this.$refs.myQuillEditor.quill;
                selfQuill.focus();
                if (selfQuill) {
                    let length = selfQuill.getSelection().index;
                    selfQuill.insertEmbed(length, 'image', file.data);
                    // 调整光标到最后
                    selfQuill.setSelection(length + 1);
                }
            },
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
            confirmParEvent(data) { // 弹框确定事件
                this.uplopopDisplay = !this.uplopopDisplay;
                if (this.form.listType === '1' || this.form.listType === 1) {
                    if (this.coverImgOne.length > 0) {
                        // this.pitchImgArr.splice(index, 1);
                        this.coverImgOne.splice(this.coverImgIndex, 1, data);
                    } else {
                        this.coverImgOne.push(data);
                    }
                } else if (this.form.listType === '2' || this.form.listType === 2) {
                    if (this.coverImgTrue.length > 2) {
                        // this.pitchImgArr.splice(index, 1);
                        this.coverImgTrue.splice(this.coverImgIndex, 1, data);
                    } else {
                        this.coverImgTrue.push(data);
                    }
                }
            },
            cancleCallBack() { // 弹框取消事件
                this.uplopopDisplay = !this.uplopopDisplay;
            },
            onEditorChange() {
                this.form.preContent = this.form.content;
            },
            releaseNews(type) { // 发布按钮
                if (this.verification() === false) {
                    return false;
                }
                this.preventRepeatClick();
                this.typeKeepArr(); // 通过选项判断封面数组
                this.flagPreview = false;
                this.form.isPublish = type;
                var typeJson = JSON.parse(this.form.tagsJson);
                if (this.Lid.id !== undefined) {
                    this.form.id = this.Lid.id;
                    api.editArticle(this.form).then(response => {
                        this.prevResponse(response);
                        this.$Message.success('修改成功！');
                    });
                } else {
                    api.addArticle(this.form).then(response => {
                        this.prevResponse(response);
                        this.$Message.success('发布成功！');
                    });
                }
            },
            preventRepeatClick() {
                this.isDisable = true;
                setTimeout(() => {
                    this.isDisable = false;
                }, 1000);
            },
            typeKeepArr() {
                if (this.form.listType === '1' || this.form.listType === 1) {
                    this.form.listImg = this.coverImgOne;
                } else if (this.form.listType === '2' || this.form.listType === 2) {
                    this.form.listImg = this.coverImgTrue;
                } else {
                    this.form.listImg = [];
                }
                this.form.tagsJson = JSON.stringify(this.tagsJson);
            },
            verification() { // 验证方法
                if (this.form.title === '') {
                    this.$Notice.warning({
                        title: '请输入标题'
                    });
                    return false;
                }
                if (this.computedByteLen(this.form.title) > 50) {
                    this.$Notice.warning({
                        title: '标题不能超过25字'
                    });
                    return false;
                }
                if (this.form.content === '') {
                    this.$Notice.warning({
                        title: '请输入图文'
                    });
                    return false;
                }
                if (this.form.listType === '1' || this.form.listType === 1) {
                    if (this.coverImgOne.length <= 0) {
                        this.$Notice.warning({
                            title: '请上传封面'
                        });
                        return false;
                    }
                }
                if (this.form.listType === '2' || this.form.listType === 2) {
                    if (this.coverImgTrue.length < 3) {
                        this.$Notice.warning({
                            title: '请上传三张封面'
                        });
                        return false;
                    }
                }
                if (this.form.topic.length <= 0) {
                    this.$Notice.warning({
                        title: '请选择栏目'
                    });
                    return false;
                }
                if (this.form.recommendLevel == '') {
                    this.$Notice.warning({
                        title: '请选择图文级别'
                    });
                    return false;
                }
            },
            previewFun(type) { // 预览事件
                if (this.verification() === false) {
                    return false;
                }
                this.preventRepeatClick();
                this.typeKeepArr();// 通过选项判断封面数组
                this.flagPreview = true;
                this.form.isPublish = type;
                if (this.Lid.id !== undefined) {
                    this.form.id = this.Lid.id;
                }
                api.addPreview(this.form).then(response => {
                    this.prevResponse(response);
                });
            },
            previewAppFun(type) { // 预览事件
                if (this.verification() == false) {
                    return false;
                }
                if (this.form.appCode == '') {
                    this.$Notice.warning({
                        title: '请输入appCode'
                    });
                    return false;
                }
                this.preventRepeatClick();
                this.typeKeepArr();// 通过选项判断封面数组
                this.form.isPublish = type;
                if (this.Lid.id != undefined) {
                    this.form.id = this.Lid.id;
                }
                api.addPreview(this.form).then(response => {
                    this.prevResponse(response);
                    this.$Modal.success({
                        title: '',
                        content: '保存成功请在APP上预览'
                    });
                    this.previewCancel();
                });
            },
            prevResponse(response) {
                this.form.id = response.data.data.id;
                this.qrcodeModal = !this.qrcodeModal;
                let pre = response.data.data.pre;
                let sign = response.data.data.sign;
                let id = response.data.data.id;
                let timestamp = response.data.data.timestamp;
                // let url = this.$domain.cityDomain + '?id='+id+'&pre='+pre+'&sign='+sign+'&timestamp='+timestamp;
                let url = this.$domain.cityDomain + '?id=' + id + '&pre=1';
                document.getElementById('qrcode1').innerHTML = '';
                this.qrcode(url);
            },
            previewCancel() {
                if (this.flagPreview == false) {
                    setTimeout(() => {
                        this.$router.push({
                            name: 'newsManageList'
                        });
                    }, 1000);
                }
            },
            qrcode (url) {
                let qrcode = new QRCode('qrcode1', {
                    width: 200,
                    height: 200, // 高度
                    text: url // 二维码内容
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f'
                    // foreground: '#ff0'
                });
            }
        },
        mounted() {
        }
    };
</script>
<style>
.appcodePop {
    width: 170px;
    margin: 0 auto;
    overflow: hidden;
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
.qrcode {
    width: 200px;
    height: 200px;
    margin: 0 auto;
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
