<style lang="less">
    @import "../main.less";
    @import "../../styles/common.less";
    @import "../../styles/table.less";
    @import "../../styles/css.less";
    @import '../../../node_modules/dragula/dist/dragula.css';
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
            <p slot="title">内容编辑器</p>
            <Row >
                <Col span="12">
                <div ref="stage">

                </div>
                </Col>
                <Col span="12" >
                    <navigation :include="includeIds">
                        <component v-bind:is="currentEditor" :key="currentEditorKey" v-on:sharechange="sharechange"></component>
                    </navigation>
                </Col>
            </Row>
        </Card>

        </Col>
    </Row>
</template>

<script>
    import navigation from '@/libs/navigation';
    import _ from 'lodash';
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
                arttemplate: ''
            };
        },
        methods: {
            sharechange(newVal, id) {
                if (this.arttemplate) {
                    var html = template.render(this.arttemplate, {share: newVal});
                    $(this.$refs['stage']).html(html);
                }
                console.log('sharechange', newVal, id);
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
                        /*
                    判断是不是右侧editor的子组件，如果不是一级子组件，不要触发这些钩子
                     */
                        // this.$set(this.share, 'brickid', this.$vnode.key);
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
            }

        },
        mounted() {
        },
        created() {
            // console.log('regEditor.editorRouters',regEditor)
            var that = this;
            this.$route.query.templateid;
            regEditor.editorRouters[1].component().then(function (res) {
                that.hookWatch(res.default);
                that.currentEditor = res.default;
                that.currentEditorKey = 'testdemo';
                that.arttemplate = _.trim(res.default.wys_stageTemplate);
            }).catch(function (res) {
                console.error('error', res);
            });
            // console.log('created');
        }
    };
</script>
