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
    .wys-main {
        width: 1920px;
        height: 100%;
        background: #FFFFFF;
    }
    .wys-menu-left {
        width: 320px;
        overflow: hidden;
        float: left;
        box-sizing: border-box;

    }
    .wys-content {
        float: left;
        box-sizing: border-box;
        min-width: 400px;
        position: relative;
        max-height: 100%;
        height: 100%;
    }
    .wys-isscrll {
        padding: 0px 360px 0 360px;
        overflow: auto;
        background: #F2F3F4;
        max-height: 100%;
        height: 100%;
    }
    .wys-contentOver {
        width: 375px;
        height: 100%;
        text-align: center;
        background: #FFFFFF;
        overflow: hidden;
    }
    /*滚动条样式*/
    .wys-isscrll::-webkit-scrollbar {/*滚动条整体样式*/
        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
    }
    .wys-isscrll::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #CACBCB;
    }
    .wys-isscrll::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: #EDEEEF;
    }
    .wys_title {
        position: absolute;
        top: -40px;
        left: 0;
        width: 160px;
        text-align: center;
        line-height: 40px;
        border-radius: 10px 10px 0 0;
        height: 40px;
        background: #f2f3f4;
        z-index: 10;
    }
</style>

<template>

 <div class="wys-main" >
     <div class="wys-header">
         <div class="wys-header-left"><img src="http://wap-qn.toutiaofangchan.com/adideas/4fa0cb767c5a42e7af2aa85003704eb1.jpg"/> </div>
         <div class="wys-header-content"></div>
     </div>
     <div class="wys-menu-left">
            <div id="wysiwyg_componentbox" wys-container>
                <div v-for="(item, index) in lefcomponents"  :editorregid="item.id" >
                    <img  :src="item.icon" style="width: 100px;height: 100px;"/>
                </div>
            </div>
     </div>
     <div class="wys-content">
        <div class="wys_title"><Icon type="ios-home" style="margin-right:5px;"></Icon>站点编辑器</div>
         <div class="wys-isscrll">
            <div class="wys-contentOver"><!-- 自助建站网页html容器 -->
                <div class="single-page" id="wysiwyg_stage" wys-container style="height: 100%">

                </div>
            </div>
         </div>
     </div>
     <div class="wys-edit-right">
            <navigation :include="includeIds">
                <component v-bind:is="currentEditor" :key="currentEditorKey"></component>
            </navigation>
     </div>
 </div>
    <!-- <div class="main" >
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
    </div> -->
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
