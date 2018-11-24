<style lang="less">
@import '../main.less';
@import '../../styles/common.less';
@import '../../styles/table.less';
@import '../../styles/css.less';
@import '../../../node_modules/dragula/dist/dragula.css';
img {
  max-width: 100%;
  height: auto;
  border: none;
  interpolation-mode: bicubic;
  vertical-align: middle;
}
.wysi_active {
  border: 1px solid #71a5f5;
}
.botton_top {
  position: absolute !important;
  width: 100%;
  z-index: 1000;
  top: 0;
  border: 1px solid #71a5f5;
}
.botton_bottom {
  position: absolute !important;
  width: 100%;
  z-index: 1000;
  bottom: 0;
  border: 1px solid #71a5f5;
}
.wysi_hrive {
  border: 1px solid #71a5f5;
}
.gu-mirror {
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  opacity: 1;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
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
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
  filter: alpha(opacity=100);
}
.wys-main {
  width: 1920px;
  height: 100%;
  background: #ffffff;
}
.wys-menu-left {
  width: 260px;
  overflow: hidden;
  float: left;
  background: #ffffff;
  box-sizing: border-box;
  height: 95%;
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
  background: #f2f3f4;
  max-height: 100%;
  height: 100%;
}
.wys-contentOver {
  width: 375px;
  height: 100%;
  text-align: center;
  background: #ffffff;
  overflow: hidden;
}
/*滚动条样式*/
.wys-isscrll::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.wys-isscrll::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #cacbcb;
}
.wys-isscrll::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: #edeeef;
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
.workarea-main {
  border-left: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  position: relative;
  height: 100%;
  background-color: #f2f3f4;
  margin: 0 320px 0 260px;
  padding-bottom: 1px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  min-width: 620px;
}
.workarea-stage {
  position: relative;
  top: 10px;
  overflow: hidden;
}
.phone-box {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.phone-wrapper {
  position: relative;
  overflow: visible;
  box-sizing: content-box;
  width: 340px;
  margin: 0 auto 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.phone-wrapper .signal-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 320px;
  height: 43px;
  z-index: 10;
  background: #222;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.wys-edit-right {
  position: absolute;
  background-color: #fff;
  box-shadow: 3px 3px 5px hsla(0, 4%, 69%, 0.1);
  display: none;
  box-sizing: border-box;
  bottom: 0;
}
#right {
  display: block;
  width: 320px;
  padding-left: 20px;
  box-sizing: border-box;
  top: 0;
  right: 0;
}
#main {
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 2px;
}
.layout.edit {
  margin: 0 auto;
  min-height: calc(100% - 66px);
  min-width: 1200px;
  box-sizing: border-box;
  height: auto;
}
.phone-wrapper .screen-border {
  position: relative;
  top: 43px;
  width: 375px;
  height: 625px;
  background-color: #fff;
}
.phone-wrapper .workarea {
  overflow-x: hidden;
  overflow-y: overlay;
  box-sizing: border-box;
  width: 330px;
  height: 524px;
  background: transparent;
}
.phone-wrapper .workarea::-webkit-scrollbar {
  display: none;
}
.operate-bar-wrap {
  float: right;
  position: relative;
}
.operate-bar {
  padding: 8px 25px 13px;
  height: 32px;
  box-sizing: content-box;
}
.operate-bar .btn {
  font-size: 14px;
  color: #222;
  padding: 0 8px 0 0;
  position: relative;
  display: -ms-inline-flexbox;
  display: inline-flex;
  cursor: pointer;
  -ms-flex-align: center;
  align-items: center;
  line-height: 20px;
  color: #444;
}
.btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  max-height: 38px;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 9px 16px;
  font-size: 14px;
  line-height: 1.42857143;
  border-radius: 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.wysiwyg_rightScroll {
  box-sizing: border-box;
  height: 85%;
  overflow-y: overlay;
  overflow-x: hidden;
}
.wysiwyg-leftIcon {
  width: 64px;
  height: 90px;
  float: left;
  margin-left: 15px;
  text-align: center;
}
.wysiwyg-contitle {
  font-size: 16px;
  padding-left: 20px;
  margin: 10px 0 10px 0;
}
.wys-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<template>
    <div style="height:100%">
        <div class="wys-header">
            <div class="wys-header-left"><img src="http://wap-qn.toutiaofangchan.com/adideas/4fa0cb767c5a42e7af2aa85003704eb1.jpg" />
            </div>
            <div class="wys-header-content"></div>
        </div>
        <div id="main" class="layout edit">
            <div class="wys-menu-left">
                <div id="wysiwyg_componentbox" wys-container>
                    <div class="wysiwyg-contitle">内容模块</div>
                    <div class="wysiwyg-leftIcon" v-for="(item, index) in lefcomponents" v-if="!item.hide" :editorregid="item.id">
                        <img :src="item.icon" />
                        <p>{{item.title}}</p>
                    </div>
                </div>
            </div>
            <section id="middle" class="workarea-main">
                <div class="operate-bar">
                    <div class="operate-bar-wrap">
                        <a @click="runBack()" class="btn">
                            <a class="return_home">返回站点列表</a>
                        </a>
                        <span class="btn" @click="fbClick(0)">
                            <Icon type="compose"></Icon><span>保存</span>
                        </span>
                        <span class="btn" @click="previewClick()">
                            <Icon type="ios-eye"></Icon><span>预览</span>
                        </span>
                        <span class="btn" @click="fbClick(1)">
                            <Icon type="ios-color-filter"></Icon><span>发布</span>
                        </span>
                    </div>
                </div>
                <div class="workarea-stage">
                    <div class="phone-box">
                        <div class="phone-wrapper" style="width: 375px; height: 668px;">
                            <div class="signal-wrapper" style="width: 375px;"><img src="http://wap-qn.toutiaofangchan.com/adideas/fcdb09632f114c768215e75d06ff48af.png" /></div>

                            <div class="screen-border">
                                <div class="workarea" id="wysiwyg_stage" wys-container style="width: 375px;height: 625px;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div id="right" class="wys-edit-right">
                <div class="wysiwyg_rightScroll">
                    <Form ref="formMainValidate" :model="formMain" :rules="ruleMainValidate" :label-width="80">
                        <FormItem label="标题" prop="title">
                            <Input v-model="formMain.title" placeholder="请填写标题"></Input>
                        </FormItem>

                    </Form>
                    <navigation :include="includeIds">
                        <component v-bind:is="currentEditor" :key="currentEditorKey"></component>
                    </navigation>
                </div>
            </div>
        </div>

        <Modal v-model="qrcodeModal" width="400">

            <p slot="header" style="color:#f60;text-align:center">
                <span></span>
            </p>
            <Tabs type="card">
                <TabPane label="WEB预览">
                    <div style="text-align:center">
                        <p class="qrcode" style="width:200px; margin:0 auto;" id="qrcode10"></p>
                    </div>
                    <div style="margin-top:20px;">
                        <span>专题URL</span>
                        <Input v-model="siteUrl" placeholder="" style="width: 300px"></Input>
                    </div>
                </TabPane>
            </Tabs>

            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>
<script>
import navigation from '@/libs/navigation';
import util from '@/libs/util';
import dragula from 'dragula/dist/dragula';
import dragula_conf from './wys-conf/dragula-conf';
import wys_default from './wys-view/wys-default.vue';
import GlobalStage from './wys-conf/component-stage';
import api from '../../api/wysiwyg/main.js';
import QRCode from 'qrcodejs2';
export default {
    components: {
        navigation
    },
    data () {
        return {
            wysiwyg_prevent_mixin_isEditorRoot: true,
            includeIds: [],
            lefcomponents: GlobalStage.canUseEditors.coms,
            currentEditor: wys_default,
            currentEditorKey: 'wys_default',
            qrcodeModal: false,
            siteUrl: '',
            formMain: {
                siteId: '',
                html: '',
                title: '',
                editor: ''
            },
            ruleMainValidate: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ]
            },
            id: this.$route.query.id
        };
    },
    methods: {
        fbClick (status) {
            this.$refs.formMainValidate.validate((valid) => {
                if (valid) {
                    this.addParameter();
                    this.formMain.status = status;
                    if (this.id) {
                        this.formMain.id = this.id;
                        api.updateDiyWebpage(this.formMain).then(response => {
                            this.$Message.success(status == 0 ? '保存成功' : '发布成功');
                        });
                    } else {
                        api.saveDiyWebpage(this.formMain).then(response => {
                            this.formMain.id = response.data.data.id;
                            this.id = response.data.data.id;
                            this.$Message.success(status == 0 ? '保存成功' : '发布成功');
                        });
                    }
                }
            });
        },
        previewClick () {
            this.$refs.formMainValidate.validate((valid) => {
                if (valid) {
                    this.addParameter();
                    api.saveDiyWebpageHistory(this.formMain).then(response => {
                        this.formMain.id = response.data.data.id;
                        this.qrcodeModal = true;
                        var url = 'http://cms.dev.bidewu.com/cmsapi/cmsapi/diyWebpage/diyWebpageHtml?id=' + response.data.data.pid;
                        this.siteUrl = url;
                        document.getElementById('qrcode10').innerHTML = '';
                        this.qrcode(url);
                    });
                }
            });
        },
        runBack () {
            this.$router.push({
                name: 'wysiwygWebList', query: { siteid: this.$route.query.siteid }
            });
        },
        initStage (editor) {
            var that = this;
            var stagedict = null;
            var lastsavehtml = null;
            if (editor) {
                stagedict = editor.stagedict;
                lastsavehtml = editor.strhtml;
            }
            // 初始化建站引擎
            GlobalStage.init(that, function (stageComponent) {
                that.currentEditor = stageComponent.editor.component;
                that.currentEditorKey = stageComponent.component_id;
                if (!util.oneOf(that.currentEditorKey, that.includeIds)) {
                    that.includeIds.push(that.currentEditorKey);
                }
            }, 'wysiwyg_stage', stagedict, lastsavehtml);
            if (window.__drag) {
                window.__drag.destroy();
            }
            var dra = dragula([document.querySelector('#wysiwyg_componentbox'), document.querySelector('#wysiwyg_stage')], dragula_conf.default);
            window.__drag = dra;
            dra.on('cloned', function (clone, original, type) {
                // console.log('clone',clone)
                console.log(!$(clone).hasClass('gu-mirror'));
                if (!$(clone).hasClass('gu-mirror')) {
                    $(clone).removeClass();
                    $(clone).addClass('wysi_hold');
                    // $(clone).prop('outerHTML', '<div  style="display: block;width: 100%; height: 50px;background-color:#a67f59;border:1px #aa5500 dashed; text-align: center;vertical-align:middle;font-size: 26px">放这里</div>');
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
                // if ($(target).attr("id")=='wysiwyg_stage' && $(source).attr("id")=='wysiwyg_componentbox' ) {
                if (target && $(target).attr('id') != 'wysiwyg_componentbox' && $(source).attr('id') == 'wysiwyg_componentbox') {
                    var editorregid = $(el).attr('editorregid');
                    GlobalStage.create(editorregid, true);
                } else if (target && $(source).attr('id') == 'wysiwyg_stage') {
                    $(el).click();
                }
            });
        },
        addParameter () {
            var html = '';
            html += '<html lang="zh-CN"><head>' +
                '<title>' + this.formMain.title + '</title><meta name=\'viewport\' content=\'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\'><meta name=\'format-detection\' content=\'telephone=no\'><link rel=\'stylesheet\' href=\'http://wap-qn.toutiaofangchan.com/adideas/fe83f8f268b84936b36ec0d568b89875.css\'><link rel=\'stylesheet\' href=\'http://wap-qn.toutiaofangchan.com/adideas/68593d3e866645efa4bad7928280a26a.css\'>' +
                '<script type=\'text/javascript\' src=\'http://wap-qn.toutiaofangchan.com/adideas/856c0e7ed84b4e32b3bdb79f5d2fb359.js\'><\/script>' +
                '<script type=\'text/javascript\' src=\'http://wap-qn.bidewu.com/jquery-3.3.1.min.js\'><\/script>' +
                '</head><body>';
            var stagereslut = GlobalStage.save();

            html += stagereslut.html;
            html += '</body>';
            html += '</html>';
            this.formMain.html = html;
            this.formMain.editor = JSON.stringify(stagereslut.stage);
            this.formMain.siteId = this.$route.query.siteid;
        },
        qrcode (url) {
            let qrcode = new QRCode('qrcode10', {
                width: 200,
                height: 200, // 高度
                text: url // 二维码内容
                // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                // background: '#f0f'
                // foreground: '#ff0'
            });
        }
    },
    mounted () {
        var that = this;
        if (this.id) {
            api.getDiyWebpages({
                id: this.id
            }).then(response => {
                that.formMain.title = response.data.data[0].title;
                that.initStage(JSON.parse(response.data.data[0].editor));
            });
        } else {
            that.initStage();
        }
    },
    created () {
    }
};
</script>
