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
            <p slot="title">编辑创意</p>
            <Row >
                <Col span="12" style="background-color:#eeeeee">
                <!--<Alert type="warning" v-if="!isNewSystem">此创意由旧广告系统录入，不能修改了，用当前系统再录入一个吧:)</Alert>-->
                <div style="display: block;width: 375px;min-height:500px;margin: 0px auto;background-color:#ffffff;overflow: hidden">
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
                <Card >
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        广告内容
                    </p>
                    <navigation :include="includeIds">
                        <component v-bind:is="currentEditor" :key="currentEditorKey" v-on:sharechange="sharechange" v-on:save="save"></component>
                    </navigation>
                </Card>

                </Col>
            </Row>
        </Card>

        </Col>
    </Row>
</template>

<script>
    import navigation from '@/libs/navigation';
    import _ from 'lodash';
    import editortemplate from '@/api/advertisement/formtemplateApi';
    import ad from '@/api/advertisement/ad';
    import regEditor from './adSeniorEditorRouter';
    import defaultEditor from './adSeniorEditor/defaultEditor.vue';
    import util from '@/libs/util';
    export default {
        components: {
            navigation
        },
        data() {
            return {
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
                }
            };
        },
        methods: {
            save(success, error) {

                this.$refs['commonForm'].validate((commvalid) => {
                    if (commvalid) {
                        if (this.$route.query.id) {
                            ad.editIdea({
                                idcode: this.$route.query.id,
                                ideaData: JSON.stringify(this.share),
                                typeId: this.typeId,
                                positionId: this.positionId,
                                adCompany: this.commonForm.adCompany,
                                adName: this.commonForm.adName,
                                adResource: this.adResource
                            }).then(function (res) {
                                // todo 跳回到列表页
                                // this.$router.push({});
                            });
                        } else {
                            ad.addIdea({
                                ideaData: JSON.stringify(this.formItem),
                                typeId: this.typeId,
                                positionId: this.positionId,
                                adCompany: this.commonForm.adCompany,
                                adName: this.commonForm.adName,
                                adResource: this.adResource
                            }).then(function (res) {
                                // todo 跳回到列表页
                                // this.$router.push({});
                            });
                        }
                    } else {
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
                let mix = {
                    __wys_mixin_hook: true,
                    created: function () {
                        console.log('created');
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
            }

        },
        mounted() {
        },
        created() {
            var that = this;
            if (this.$route.query.id) {
                ad.getIdea(this.$route.query.id).then(function (res) {
                    that.typeId = res.data.data.typeId;
                    let ideares = res.data.data;
                    let ideaData = JSON.parse(res.data.data.adData);
                    editortemplate.getTemplate(res.data.data.typeId).then(function (res) {
                        let editor = this.getEditor(res.data.data.form);
                        that.typeId = that.$route.query.templateid;
                        that.positionId = res.data.data.positionId;
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
                                console.error('error', res);
                            });
                        } else {
                            // todo 没有找到editor
                        }
                    });
                });
            } else {
                editortemplate.getTemplate(this.$route.query.templateid).then(function (res) {
                    let editor = that.getEditor(res.data.data.form);
                    that.typeId = that.$route.query.templateid;
                    that.positionId = res.data.data.positionId;
                    if (editor) {
                        editor.component().then(function (res) {
                            that.share = {};
                            that.hookWatch(res.default, {});
                            that.currentEditor = res.default;
                            that.currentEditorKey = editor.name;
                            that.arttemplate = _.trim(res.default.wys_stageTemplate);
                        }).catch(function (res) {
                            console.error('error', res);
                        });
                    } else {
                        // todo 没有找到editor
                    }
                });
            }
        }
    };
</script>
