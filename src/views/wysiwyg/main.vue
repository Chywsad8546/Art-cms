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
    <div class="main" >
        <div class="sidebar-menu-con" :style="{width: '200px', overflow:  'auto'}">

            <div id="wysiwyg_componentbox" wys-container>
                <div v-for="(item, index) in lefcomponents"  :editorregid="item.id" >
                    <img  :src="item.icon" style="width: 100px;height: 100px;"/>
                </div>
            </div>
        </div>
        <div class="single-page-con" :style="{left: '200px',right:'300px',top:'0px',backgroundColor: '#7f8c8d'}">
            <div class="single-page" id="wysiwyg_stage" wys-container style="height: 100%">

            </div>
        </div>
        <div style="position: fixed;right: 0px;top:0px;width: 300px; background-color: white ">

                    <navigation :include="includeIds">
                        <component v-bind:is="currentEditor" :key="currentEditorKey"></component>
                    </navigation>


        </div>
    </div>
</template>
<script>
    import navigation from '@/libs/navigation';
    import util from '@/libs/util';
    import dragula from 'dragula/dist/dragula';
    import dragula_conf from './wys-conf/dragula-conf';
    import wys_default from './wys-view/wys-default.vue';
    import GlobalStage from './wys-conf/component-stage';
    export default {
        components: {
            navigation
        },
        data() {
            return {
                wysiwyg_prevent_mixin_isEditorRoot:true,
                includeIds: [],
                lefcomponents: GlobalStage.canUseEditors.coms,
                currentEditor: wys_default,
                currentEditorKey: 'wys_default'
            };
        },
        mounted() {
            console.log('mounteds')
            var that = this;
            // 初始化建站引擎
            GlobalStage.init(that,function (stageComponent) {
                that.currentEditor = stageComponent.editor.component;
                that.currentEditorKey = stageComponent.component_id;
                if(!util.oneOf(that.currentEditorKey,that.includeIds)){
                    that.includeIds.push(that.currentEditorKey);
                }
            }, 'wysiwyg_stage', this.$route.query.id);
            if(window.__drag){
                window.__drag.destroy();
            }
            var dra = dragula([document.querySelector('#wysiwyg_componentbox'), document.querySelector('#wysiwyg_stage')], dragula_conf.default);
            window.__drag=dra;
            dra.on('cloned', function (clone, original, type) {
                if (!$(clone).hasClass('gu-mirror')) {
                    $(clone).addClass('wysi_hold');
                    $(clone).html('<div  style="display: block;width: 100%; height: 50px;background-color:#a67f59;border:1px #aa5500 dashed; text-align: center;vertical-align:middle;font-size: 26px">放这里</div>');
                }
            });
            dra.on('drag', function (el, source) {
                if ($(source).attr('id') == 'wysiwyg_stage') {
                    dragula_conf.default.copySortSource = true;
                }
            });
            dra.on('dragend', function (el, source) {
                dragula_conf.default.copySortSource = false;
            });
            dra.on('drop', function (el, target, source, sibling) {
                if ($(target).attr("id")=='wysiwyg_stage' && $(source).attr("id")=='wysiwyg_componentbox' ) {
                    var editorregid = $(el).attr('editorregid');
                    GlobalStage.create(editorregid,true);
                }
                else if($(source).attr("id")=='wysiwyg_stage'){
                    $(el).click();
                }
            });
        },
        created() {
            // console.log('created');
        }
    };
</script>
