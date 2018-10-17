<style lang="less">
    @import "../main.less";
    @import "../../styles/common.less";
    @import "../../styles/table.less";
    @import "../../styles/css.less";
    @import '../../../node_modules/dragula/dist/dragula.css';
</style>

<template>
    <div class="main" >
        <div class="sidebar-menu-con" :style="{width: '200px', overflow:  'auto'}">

            <div id="wysiwyg_componentbox">
                <div v-for="(item, index) in lefcomponents" :wysiwyg_componentbox_index=index :wysiwyg_componentbox_id="item.id" >
                    <img  :src="item.icon" style="width: 100px;height: 100px;"/>
                </div>
                <!--<div><img src="http://wap-qn.bidewu.com/00081291-a6c4-11e8-94d8-00cfe03e854e.jpg" style="width: 100px;height: 100px" /></div>-->
            </div>
        </div>
        <div class="single-page-con" :style="{left: '200px',right:'300px',top:'0px',backgroundColor: '#7f8c8d'}">
            <div class="single-page" id="wysiwyg_stage">
                <div id="a"></div>
                <div id="b"></div>
                heelo
            </div>
        </div>
        <div style="position: fixed;right: 0px;top:0px;width: 300px; ">
            <component v-bind:is="currentView"></component>
        </div>
    </div>
</template>

<script>
    import dragula from 'dragula/dist/dragula';
    import dragula_conf from './wys-conf/dragula-conf';
    import reg_components from './reg-component';
    import wys_default from './wys-view/wys-default.vue';
    import component_stage from './wys-conf/component-stage';
    // import $ from "jquery";
    // import wysImg from './wys-view/wys-img';
    export default {
        components: {
        },
        data() {
            return {
                lefcomponents: reg_components.components,
                currentView: wys_default
            };
        },
        computed: {
        },
        methods: {
        },
        watch: {
        },
        mounted() {
            var that = this;
            var dra = dragula([document.querySelector('#wysiwyg_componentbox'), document.querySelector('#wysiwyg_stage')], dragula_conf.default);
            dra.on('cloned', function (clone, original, type) {
                if (!$(clone).hasClass('gu-mirror')) {
                    $(clone).html('<div wysiwyg_componentbox_index=' + $(original).attr('wysiwyg_componentbox_index') + ' wysiwyg_componentbox_id="' + $(original).attr('wysiwyg_componentbox_id') + '" style="display: block;width: 100%; height: 50px;background-color: #00a050"></div>');
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
                if (target) {
                    var get_tmp_wysiwyg_componentbox_index = $(el).attr('wysiwyg_componentbox_index');
                    var get_tmp_wysiwyg_componentbox_id = $(el).attr('wysiwyg_componentbox_id');
                    that.currentView = reg_components.components[get_tmp_wysiwyg_componentbox_index].component;
                    var newComponent = {
                        data: {},
                        editor: get_tmp_wysiwyg_componentbox_id
                    };
                    component_stage.components.push(newComponent);


                }
            });


        },
        created() {

        }
    };
</script>
