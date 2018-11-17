import _ from 'lodash';
import regComponentConf from '../reg-component';
import wysmixin from './wys-mixin';
/*
引擎管理器，wysiwyg最核心的组件
 */
export default {
    canUseEditors: {
        coms: [],
        _comsDict: {},
        /*
        初始化可用组件，并挂上mixin钩子
         */
        init: function () {
            this.coms.splice(0, this.coms.length);
            this._comsDict = {};
            for (var i = 0; i < regComponentConf.stageComponents.length; i++) {
                var com = regComponentConf.stageComponents[i];
                if (!this._comsDict[com.id]) {
                    this._comsDict[com.id] = com;
                    /*
                    挂接上 created事件钩子 和 watch.$data钩子
                     */
                    if (!com.component.mixins) {
                        com.component.mixins = [wysmixin];
                    } else {
                        var addMixinHook = true;
                        for (var mixinIndex = 0; mixinIndex < com.component.mixins.length; mixinIndex++) {
                            if (com.component.mixins[mixinIndex].__wys_mixin_hook) {
                                addMixinHook = false;
                            }
                        }
                        if (addMixinHook) {
                            com.component.mixins.push(wysmixin);
                        }
                    }
                    /**
                     * 编译 html template
                     */
                    // console.log('_.trim(com.component.wys_stageTemplate',_.trim(com.component.wys_stageTemplate))
                    if (_.trim(com.component.wys_stageTemplate)) {
                        com.arttemplate = template.compile(_.trim(com.component.wys_stageTemplate));
                    } else {
                        com.arttemplate = function () {
                            return '错误 没有定义stage-template模板内容';
                        };
                    }
                    /**
                     * 编译 stage-javascript
                     */
                    // 运行和保存最终前端js
                    if (_.trim(com.component.wys_stageJavascript)) {
                        com.artjavascript = template.compile(_.trim(com.component.wys_stageJavascript));
                    } else {
                        com.artjavascript = function () {
                            return '';
                        };
                    }
                    // 导入外部js
                    if (_.trim(com.component.wys_stageJavascript_import)) {
                        var tmpstageJavascript_import=_.cloneDeep(com.component.wys_stageJavascript_import);
                        com.artjavascriptincludes = function () {
                            return tmpstageJavascript_import;
                        };
                    } else {
                        com.artjavascriptincludes = function () {
                            return [];
                        };
                    }
                    // 编辑阶段使用的js,不会被保存
                    if (_.trim(com.component.wys_stageJsWys)) {
                        com.artjavascriptwys = template.compile(_.trim(com.component.wys_stageJsWys));
                    } else {
                        com.artjavascriptwys = function () {
                            return '';
                        };
                    }

                    /**
                     * 编译 stage-css
                     */
                    // console.log('com.component.wys_stageCss', com.component.wys_stageCss);
                    if (_.trim(com.component.wys_stageCss)) {
                        // var tmpcomwysstageCss = com.component.wys_stageCss;
                        com.artcss = template.compile(_.trim(com.component.wys_stageCss));
                    } else {
                        com.artcss = function () {
                            return '';
                        };
                    }

                    this.coms.push(com);
                } else {
                    console.log(this._comsDict, regComponentConf.stageComponents);
                    throw '错误:重复注册组件 ' + com.id + '';
                }
            }
        },
        getComponent: function (editorRegid) {
            return this._comsDict[editorRegid];
        }
    },
    init: function (mainPage, editchangeEvent, stageDomElId, Pageid) {
        // template.defaults.debug=true;
        // template.defaults.bail =false;
        this._mainPage = mainPage;
        this._currentComponentChangeEvent = editchangeEvent;
        this.PageID = Pageid || 0;
        this._stage = $('#' + stageDomElId);
        this.canUseEditors.init();
        this.initComponentFromDB();
    },
    initComponentFromDB: function() {
        var dbdata = [];
        for (var i = 0; i < dbdata.length; i++) {
            var d = dbdata[i];
            this.create(d.editor_regid, false, d.data,  d.js,d.jsincludes, d.css, d.component_id);
        }
    },
    PageID: null, // 页面的数据库id
    _stage: null,
    _mainPage: null,
    /*
    修改选中组件时回调事件
     */
    _currentComponentChangeEvent: function () {},
    currentComponent: null,
    stageComponentsDict: {},
    /*
    创建画布上的站位dom，是一个jquery对象
     */
    _createDom: function (stageComponent) {
        var that = this;
        var dom = $('<div id="' + stageComponent.component_id + '" editorregid="'+stageComponent.editor.id+'" style="position: relative"></div>');
        dom.data('stageCompontHook', stageComponent);
        /**
         * 鼠标经过的时候，增加一个“删除”按钮
         */
        dom.mouseenter(function () {
            $('.wysiclose').remove();
            $('.wysidrag').remove();
            $('.wysi_hrive').removeClass('wysi_hrive');
            var deletebtn = $('<span class="wysiclose" style="z-index: 1000000;position: absolute;right: 0px;top:0px"><img style="width:20px;" src="http://wap-qn.toutiaofangchan.com/adideas/fae2789c085e47398b716e5adeec32df.png"/></span>');
            deletebtn.click(function () {
                if(window.confirm('确定要删除么？')) {
                    that.delete(stageComponent.component_id);
                }
            });
            dom.prepend(deletebtn);
            // todo 拖拽按钮
            var dragbtn=$('<img class="wysidrag" style="z-index: 1000000;position: absolute;left: 50%; margin-left:-20px; top:-2px;width:40px;" src="http://wap-qn.toutiaofangchan.com/adideas/00a75c5ecdd343789003cc3d229cb8dc.png"/>');
            dom.prepend(dragbtn);
            dom.addClass("wysi_hrive");

        });
        dom.mouseleave(function () {
            dom.find('.wysiclose').remove();
            dom.find('.wysidrag').remove();
            dom.removeClass("wysi_hrive");
           // dom.css("border",'0px solid red');
        });
        /**
         * 鼠标点击的时候，设置当前的 高亮
         */
        dom.click(function (event) {
            if (that.currentComponent && $(this).data('stageCompontHook').component_id != that.currentComponent.component_id) {
                that.setCurrent($(this).data('stageCompontHook'));
            }
            event.stopPropagation();
            event.preventDefault();
        });
        return dom;
    },
    setCurrent: function (stageComponent) {
        this.currentComponent = stageComponent;
        this._stage.find('.wysi_active').removeClass('wysi_active');
        this.currentComponent.dom.addClass('wysi_active');
        this._currentComponentChangeEvent(this.currentComponent);
    },
    save: function () {
        console.log('save')
        // console.log(this.stageComponentsDict.length);
        var jsincludes='';
        var css='';
        var js='';
        var stagedict={};
        for (var key in this.stageComponentsDict) {

            this.stageComponentsDict[key].jsincludes.forEach(iteminclude => {
                jsincludes = jsincludes+'<script type="text/javascript" src="'+iteminclude+'"></script>';
            });
            css += this.stageComponentsDict[key].css;
            js += this.stageComponentsDict[key].js;

            stagedict[key] = {
                component_id: this.stageComponentsDict[key].component_id, // 组件的唯一编号，方便vue组件的缓存，同时也为stageComponent提供了唯一依据
                js: this.stageComponentsDict[key].js, // 会最终展示出来shi
                css: this.stageComponentsDict[key].css,
                jsincludes:this.stageComponentsDict[key].jsincludes,
                data: this.stageComponentsDict[key].data, // vue组件 和 stageComponent 交互的数据，同时也会保存到数据库中
                editor_regid: this.stageComponentsDict[key].editor_regid // vue编辑器组件的注册id
            };

        }
        console.log($('#wysiwyg_stage').html())
        var strHtml = $('#wysiwyg_stage').html();

        strHtml = css  + strHtml;
        strHtml = strHtml + jsincludes + js
        return { html:strHtml,stage:stagedict};
    },
    /**
     * render方法负责2个事情：
     *  1，负责对拖拽产生的新组件实例，进行第一次渲染
     *  2，负责对已经在舞台上的组件进行更新
     * @param data
     * @param component_id
     * @param isCreateEventRender
     * @param editorRenderTriggerERROR
     */
    render: function (data, component_id, isCreateEventRender, editorRenderTriggerERROR) {
        var targetStageComponent = this.stageComponentsDict[component_id];
        if(!targetStageComponent){
            return;
        }
        /*
        如果没有找到编辑器，或者编辑器初始化报错，都会导致生成的新html出问题，所以这种情况下，不去更新html
         */

        var html = 'arttemplate render 错误';
        var js = '';
        var css = '';
        var jswys = '';
        try {
            html = targetStageComponent.editor.arttemplate({share: data, brickid: 'share'+component_id});
            js = targetStageComponent.editor.artjavascript({share: data, brickid: 'share'+component_id});
            css = targetStageComponent.editor.artcss();
            jswys = targetStageComponent.editor.artjavascriptwys({share: data, brickid: 'share'+component_id});
        } catch (e) {
            console.error('arttemplate渲染报错', e);
        }
        if(isCreateEventRender){
            var artjavascriptincludes = targetStageComponent.editor.artjavascriptincludes();
            for(var i=0;i<artjavascriptincludes.length;i++){
                $('body').append('<script type="text/javascript" src="'+artjavascriptincludes[i]+'"></script>');
            }
            targetStageComponent.jsincludes=artjavascriptincludes;
        }

        if (_.trim(css) && $('#css-' + component_id).length == 0) {
            css = css.replace(/wys_stageCss_hook/g, component_id);
            css = '<style id="css-' + component_id + '">' + css + '</style>';
            $('head').append(css);
            targetStageComponent.css = css;
        }
        // console.log('jswys',jswys)
        if(_.trim(jswys)){
            $('body').append('<script  type=\'text/javascript\'>$(function() {  var $t = $("#' + component_id + '");' + jswys + '});</script>');
        }
        else {
            targetStageComponent.dom.html(html); //children('div').eq(0)
        }

        if (_.trim(js)) {
            js = '<script id="js-' + component_id + '" type=\'text/javascript\'>$(function() {  var $t = $("#' + component_id + '");' + js + '});</script>';
            $('body').append(js);
        }
        targetStageComponent.js = js;
        targetStageComponent.data = data;

        /*
        如果是拖拽产生的新组件，第一次要做一个替换站位div
         */
        if (isCreateEventRender && targetStageComponent.isDragNew) {
            this._stage.find('.wysi_hold').eq(0).after(targetStageComponent.dom);
            this._stage.find('.wysi_hold').remove();
            targetStageComponent.isDragNew = false;
        }
    },

    /**
     * 删除组件
     * @param component_id
     */
    delete:function (component_id) {
        var willdeleteComponent = this.stageComponentsDict[component_id];
        if(!willdeleteComponent){
            return;
        }
        willdeleteComponent.editor_regid = 'wys_default';
        willdeleteComponent.editor = this.canUseEditors.getComponent('wys_default');
        delete this.stageComponentsDict[component_id];
        this.setCurrent(willdeleteComponent);
        willdeleteComponent.dom.remove();
    },
    /*
    创建 stageComponent
    @param editor_regid 组件的注册id
     */
    create: function (editor_regid, isDragNew, dom,data, js,jsincludes, css, component_id) {
        var newStageComponent = {
            component_id: component_id || null, // 组件的唯一编号，方便vue组件的缓存，同时也为stageComponent提供了唯一依据
            dom: null, // jquery对象,即stage上的内容变换全靠它
            js: js || '', // 会最终展示出来shi
            jsincludes: jsincludes || '',
            css: css || '',
            data: null, // vue组件 和 stageComponent 交互的数据，同时也会保存到数据库中
            editor: null, // vue编辑器组件
            editor_regid: null, // vue编辑器组件的注册id
            isDragNew: isDragNew // 是否是拖拽产生的新建组件
        };
        newStageComponent.editor_regid = editor_regid;
        newStageComponent.editor = this.canUseEditors.getComponent(newStageComponent.editor_regid);
        newStageComponent.component_id = this._createComponentId(component_id);
        newStageComponent.dom = dom || this._createDom(newStageComponent);

        newStageComponent.data = data || {};
        this.stageComponentsDict[newStageComponent.component_id] = newStageComponent;
        this.setCurrent(newStageComponent);
    },
    _increase: 1,
    /*
    创建唯一id
     */
    _createComponentId: function (component_id) {
        if (!component_id) {
            this._increase = this._increase + 1;
            // return 'wsycom_' + this.PageID + '_' + editor_regid + '_' + this._increase;
            return 'wsyblock-' + this._increase;
        }
        var increaseSeed = parseInt(component_id.split('-')[1]);
        if (increaseSeed > this._increase) {
            this._increase = increaseSeed;
        }
    }
};
