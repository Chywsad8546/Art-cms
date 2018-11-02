<style lang="less">
    @import "../../main.less";
    @import "../../../styles/common.less";
    @import "../../../styles/table.less";
    @import "../../../styles/css.less";
    @import '../../../../node_modules/dragula/dist/dragula.css';
    .wysi_active{
        border-color: red;
        border: 1px solid;
    }
    .gu-mirror {
        position: fixed !important;
        margin: 0 !important;
        z-index: 9999 !important;
        opacity: 1;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
        filter: alpha(opacity=100);
    }
    .gu-hide {
        display: none !important;
    }
    .gu-unselectable {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
    }
    .gu-transit {
        opacity: 1;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
        filter: alpha(opacity=100);
    }

</style>

<template>
    <Row>

        <Col span="24">
        <Card>
            <p slot="title">{{positionName}}</p>
            <Row >
                <Col span="12" style="background-color:#eeeeee">
                <Alert type="error" v-if="!canFindEditor">内容编辑器走丢了，不能修改了:(</Alert>
                <div style="display: block;width: 375px;min-height:500px;margin: 0px auto;background-color:#ffffff;overflow: hidden">
                    <Row>
                        <Col :style="{backgroundColor:'#eee'}">
                            <Button type="primary" size="small" style="margin: 5px 10px" @click="save" :disabled="issaving">保存</Button>
                            <Button icon="iphone" type="primary" size="small" style="margin: 5px 10px" v-if="canFindEditor" @click="preview">预览</Button>
                        </Col>
                    </Row>
                    <img style="display: block;width: 375px;" src="http://wap-qn.bidewu.com/cms/shouji.png"/>
                    <div ref="stage" >
                    </div>
                </div>
                </Col>
                <Col span="12" >
                <Card >
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        标的信息
                    </p>
                    <Form ref="commonForm" :model="commonForm" :rules="commonFormRuleValidate" :label-width="80">
                        <FormItem label="甲方公司名称" required prop="adCompany">
                            <Input v-model="commonForm.adCompany" placeholder="请填写内容"></Input>
                        </FormItem>
                        <FormItem label="创意名称" required prop="adName">
                            <Input v-model="commonForm.adName" placeholder="请填写内容"></Input>
                        </FormItem>
                    </Form>
                </Card>
                <Card v-if="canFindEditor" >
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        广告内容
                    </p>
                    <navigation :include="includeIds">
                        <component v-bind:is="currentEditor" :key="currentEditorKey" ref="childcom" @sharechange="sharechange" ></component>
                    </navigation>
                </Card>

                </Col>
            </Row>
        </Card>

        </Col>
        <Form ref="previeForm" :model="previeForm" :rules="previeFormRuleValidate" :label-width="80">
            <Modal v-model="editorModal" width="300">
                <p slot="header" style="color:#f60;text-align:center">
                    <span></span>
                </p>
                <div style="text-align:center" v-show="previewWapType">
                    <p class="qrcode" ref="qrcode4"></p>
                </div>
                <div v-show="previewAppType">
                    <FormItem  required prop="appCode" :label-width="80">
                        <Input v-model="previeForm.appCode" placeholder="请输入appCode"></Input>
                    </FormItem>
                    <FormItem style="margin-left:20px;">
                        <Button type="primary" @click="previewAppFun()">保存</Button>
                    </FormItem>
                </div>
                <div slot="footer">
                </div>
            </Modal>
        </form>
    </Row>
</template>

<script>
    import navigation from '@/libs/navigation';
    import _ from 'lodash';
    import editortemplate from '@/api/advertisement/formtemplateApi';
    import ad from '@/api/advertisement/ad';
    import regEditor from './adSeniorEditorRouter';
    import defaultEditor from './adSeniorEditor/defaultEditor.vue';
    import api from '@/api/advertisement/formtemplateApi.js';
    import util from '@/libs/util';
    import QRCode from 'qrcodejs2';
    export default {
        components: {
            navigation
        },
        data() {
            return {
                issaving: false,
                id: this.$route.query.id,
                includeIds: [],
                currentEditor: defaultEditor,
                currentEditorKey: 'adHasMissEditor',
                arttemplate: '',
                share: {},
                adResource: '',
                positionId: 0,
                typeId: 0,
                commonForm: {
                    adCompany: '',
                    adName: ''
                },
                commonFormRuleValidate: {
                    adCompany: [
                        {required: true, message: '请填写', trigger: 'blur'}
                    ],
                    adName: [
                        {required: true, message: '请填写', trigger: 'blur'}
                    ]
                },
                canFindEditor: true,
                previewType: 0,
                previewUrl: '',
                editorModal: false,
                previewWapType: false,
                previewAppType: false,
                previeForm: {
                    appCode: ''
                },
                previeFormRuleValidate: {
                    appCode: [
                        {required: true, message: '请填写appCode', trigger: 'blur'}
                    ]
                },
                isEditShow: true,
                positionName:''
            };
        },
        methods: {
            getShareIncludes() {
                let result = {};
                let shareIncludes = this.$refs.childcom.shareIncludes;
                if (shareIncludes.shareIncludes && shareIncludes.shareIncludes.length > 0) {
                    for (let i = 0; i < shareIncludes.length; i++) {
                        let key = _.trim(shareIncludes[i]);
                        if (key) {
                            result[key] = this.share[key];
                        }
                    }
                    return result;
                }
                return this.share;
            },
            saveIdea(that) {
                if (that.id) {
                    ad.editIdea({
                        ideaCode: that.id,
                        ideaData: JSON.stringify(that.getShareIncludes()),
                        typeId: that.typeId,
                        positionId: that.positionId,
                        adCompany: that.commonForm.adCompany,
                        adName: that.commonForm.adName,
                        adResource: that.adResource
                    }).then(function (res) {
                        that.issaving = false;
                        that.$Message.success('保存成功');
                    }).catch(function (er) {
                        that.issaving = false;
                        that.$Message.error('保存失败');
                    });
                } else {
                    ad.addIdea({
                        ideaData: JSON.stringify(that.getShareIncludes()),
                        typeId: that.typeId,
                        positionId: that.positionId,
                        adCompany: that.commonForm.adCompany,
                        adName: that.commonForm.adName,
                        adResource: that.adResource,
                        planId: that.$route.query.planId || 0,
                        defaultAd: that.$route.query.isquesheng || 0,
                        PaiqiZhuangtai: that.$route.query.isquesheng || 0
                    }).then(function (res) {
                        that.id = res.data.data.ideaCode;
                        that.issaving = false;
                        that.$Message.success('保存成功');
                    }).catch(function (er) {
                        that.issaving = false;
                        that.$Message.error('保存失败');
                    });
                }
            },
            checkPosition() {
                ad.getAllPosition({
                    positionId: this.positionId
                }).then(response => {
                    if (response.data.data[0].previewType) {
                        this.previewType = response.data.data[0].previewType;
                        this.previewUrl = response.data.data[0].previewUrl;
                    } else {
                        this.$Message.error('位置没有填写类型或url');
                        return false;
                    }
                    this.prevResponse();
                });
            },
            prevResponse() {
                let id = this.positionId;
                this.editorModal = true;
                if (this.previewType == 1) {
                    this.addPreView();
                } else {
                    this.previewAppType = true;
                }
            },
            addPreView() {
                ad.addPreView({
                    positionId: this.positionId,
                    adData: JSON.stringify(this.share)
                }).then(response => {
                    this.previewWapType = true;
                    let url = this.previewUrl + '?madid=' + this.positionId + '&pre=' + response.data.data.pre;
                    new QRCode(this.$refs.qrcode4, {
                        width: 200,
                        height: 200, // 高度
                        text: url // 二维码内容
                        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                        // background: '#f0f'
                        // foreground: '#ff0'
                    });
                });
            },
            preview() {
                var that = this;
                this.$refs['commonForm'].validate((commvalid) => {
                    if (commvalid) {
                        that.checkPosition();
                    } else {
                        this.$Message.error('补充完善后，才能预览');
                    }
                });
            },
            previewAppFun() {
                this.$refs['previeForm'].validate((valid) => {
                    if (valid) {
                        ad.addPreView({
                            positionId: this.positionId,
                            adData: JSON.stringify(this.share),
                            appCode: this.previeForm.appCode
                        }).then(response => {
                            this.$Message.success('APP预览成功');
                            this.editorModal = false;
                        });
                    }
                });
            },
            save() {
                var that = this;
                this.issaving = true;
                this.$refs['commonForm'].validate((commvalid) => {
                    if (commvalid) {
                        /**
                         * 保存子组件的数据
                         */
                        this.$refs.childcom.save(function () {
                            that.saveIdea(that);
                        }, function () {
                            console.log('fffissaving');
                            that.issaving = false;
                            that.$Message.error('保存失败');
                        });
                    } else {
                        this.issaving = false;
                        this.$Message.error('补充完善后，才能保存');
                    }
                });
            },
            sharechange(newVal, id) {
                try {
                    this.share = newVal;
                } catch (e) {
                    console.error(e);
                }
                if (this.arttemplate) {
                    var html = template.render(this.arttemplate, {share: newVal});
                    this.adResource = html;
                    $(this.$refs['stage']).html(html);
                }
                // console.log('sharechange', newVal, id);
            },
            /**
             * 混入数据变化监听
             * @param component
             */
            hookWatch(component) {
                var that = this;

                let mix = {
                    __wys_mixin_hook: true,
                    data: function () {
                        return {
                            share: {},
                            shareIncludes: []
                        };
                    },
                    methods: {
                        save(success, fail) {
                            success();
                        }
                    },
                    created: function () {
                        for (var key in that.share) {
                            try {
                                this.$set(this.share, key, that.share[key]);
                            } catch (e) {
                                console.error(e);
                            }
                        }
                        this.$emit('sharechange', this.share, this.$vnode.key);
                        /**
                        判断是不是右侧editor的子组件，如果不是一级子组件，不要触发这些钩子
                         */
                        this.$watch('share', function (newVal, oldVal) {
                            this.$emit('sharechange', newVal, this.$vnode.key);
                        }, {
                            deep: true
                        });
                    }

                };
                var addMixinHook = true;
                if (!component.mixins) {
                    component.mixins = [mix];
                } else {
                    for (var mixinIndex = 0; mixinIndex < component.mixins.length; mixinIndex++) {
                        if (component.mixins[mixinIndex].__wys_mixin_hook) {
                            addMixinHook = false;
                        }
                    }
                    if (addMixinHook) {
                        component.mixins.push(mix);
                    }
                }
            },
            getEditor(editorRouterName) {
                for (var i = 0; i < regEditor.editorRouters.length; i++) {
                    let editor = regEditor.editorRouters[i];
                    if (editor.name === editorRouterName) {
                        return editor;
                    }
                }
                return null;
            },
            adListAll(positionId) {
                api.adListAll({positionId: positionId}).then(response => {
                    this.positionName = response.data.data[0].stationName+' / '+ response.data.data[0].pageName + ' / ' + response.data.data[0].positionName;
                });
            },

        },
        mounted() {
        },
        created() {
            var that = this;
            if (this.id) {
                ad.getIdea(this.id).then(function (res) {
                    that.typeId = res.data.data.typeId;
                    let ideares = res.data.data;
                    let ideaData = JSON.parse(res.data.data.adData || {});
                    editortemplate.getTemplate(res.data.data.typeId).then(function (res) {
                        let editor = that.getEditor(res.data.data.form);
                        that.positionId = res.data.data.positionId;
                        that.adListAll(that.positionId);
                        if (editor) {
                            editor.component().then(function (res) {
                                that.commonForm.adCompany = ideares.adCompany;
                                that.commonForm.adName = ideares.adName;
                                that.arttemplate = _.trim(res.default.wys_stageTemplate);
                                that.share = ideaData;
                                that.adResource = ideaData.adResource;
                                that.hookWatch(res.default, ideaData);
                                that.currentEditor = res.default;
                                that.currentEditorKey = editor.name;
                            }).catch(function (res) {
                                that.canFindEditor = false;
                                console.error('error', res);
                            });
                        } else {
                            that.canFindEditor = false;
                        }
                    });
                }).catch(function () {
                    that.canFindEditor = false;
                });
            } else {
                editortemplate.getTemplate(this.$route.query.templateid).then(function (res) {
                    let editor = that.getEditor(res.data.data.form);
                    that.typeId = that.$route.query.templateid;
                    that.positionId = res.data.data.positionId;
                    that.adListAll(that.positionId);
                    if (editor) {
                        editor.component().then(function (res) {
                            that.share = {};
                            that.hookWatch(res.default, {});
                            that.currentEditor = res.default;
                            that.currentEditorKey = editor.name;
                            that.arttemplate = _.trim(res.default.wys_stageTemplate);
                        }).catch(function (res) {
                            that.canFindEditor = false;
                            console.error('error', res);
                        });
                    } else {
                        that.canFindEditor = false;
                    }
                }).catch(function () {
                    that.canFindEditor = false;
                });
            }
        }
    };
</script>
