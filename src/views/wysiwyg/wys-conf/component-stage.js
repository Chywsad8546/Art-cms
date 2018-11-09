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
                    console.log('com.component.wys_stageJavascript', com.component.wys_stageJavascript);
                    if (_.trim(com.component.wys_stageJavascript)) {
                        com.artjavascript = template.compile(_.trim(com.component.wys_stageJavascript));
                    } else {
                        com.artjavascript = function () {
                            return '';
                        };
                    }
                    /**
                     * 编译 stage-css
                     */
                    console.log('com.component.wys_stageCss', com.component.wys_stageCss);
                    if (_.trim(com.component.wys_stageCss)) {
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
    initComponentFromDB:function(){
        var dbdata = [];
        for(var i=0;i<dbdata.length;i++){
            var d= dbdata[i];
            this.create(d.editor_regid,false,d.data,d.lastSaveHtml,d.js,d.css,d.component_id);
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
        var dom = $('<div id="'+stageComponent.component_id+'"></div>');
        dom.data('stageCompontHook', stageComponent);
        dom.click(function (event) {
            if (that.currentComponent && $(this).data('stageCompontHook').component_id != that.currentComponent.component_id) {
                that.setCurrent($(this).data('stageCompontHook'));
            }
            event.stopPropagation();
            event.preventDefault();
        });
        // this._stage.find('.wysi_active').size()
        return dom;
    },
    setCurrent: function (stageComponent) {
        this.currentComponent = stageComponent;
        this._stage.find('.wysi_active').removeClass('wysi_active');
        this.currentComponent.dom.addClass('wysi_active');
        this._currentComponentChangeEvent(this.currentComponent);
    },
    save: function () {
        // console.log(this.stageComponentsDict.length);
        var results = [];
        for (var key in this.stageComponentsDict) {
            var index = this.stageComponentsDict[key].dom.prevAll().length;
            results[index] ={
                component_id: this.stageComponentsDict[key].component_id, // 组件的唯一编号，方便vue组件的缓存，同时也为stageComponent提供了唯一依据
                js: this.stageComponentsDict[key].js, // 会最终展示出来shi
                css: this.stageComponentsDict[key].css,
                data: this.stageComponentsDict[key].data, // vue组件 和 stageComponent 交互的数据，同时也会保存到数据库中
                editor_regid: this.stageComponentsDict[key].editor_regid, // vue编辑器组件的注册id
                lastSaveHtml: this.stageComponentsDict[key].dom.html()
            };
            //  this.stageComponentsDict[key];
            // console.log(this.stageComponentsDict[key].dom.prevAll().length)
        }
        var strHtml = "";
        results.forEach(item => {
            strHtml += item.lastSaveHtml;
        })
        return results;    
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
        /*
        如果没有找到编辑器，或者编辑器初始化报错，都会导致生成的新html出问题，所以这种情况下，不去更新html
         */

        var html = 'arttemplate render 错误';
        var js = '';
        var css = '';

        try {
            html = targetStageComponent.editor.arttemplate({share:data,brickid:component_id});
            js = targetStageComponent.editor.artjavascript({share:data,brickid:component_id});
            css = targetStageComponent.editor.artcss({share:data,brickid:component_id});
        } catch (e) {
            console.error('arttemplate渲染报错', e);
        }
        if (_.trim(css) && $('#css-'+component_id).length==0) {
            css = '<style id="css-'+component_id+'">' + css + '</style>';
            $('head').append(css);
            targetStageComponent.css = css;
        }
        if (_.trim(js)) {
            js = '<script id="js-'+component_id+'" type=\'text/javascript\'>' + js + '</script>'
            $('body').append(js);
        }
        targetStageComponent.js = js;
        targetStageComponent.dom.html(html);

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
    /*
    创建 stageComponent
    @param editor_regid 组件的注册id
     */
    create: function (editor_regid, isDragNew, data, lastSaveHtml,js,css,component_id) {
        var newStageComponent = {
            component_id: component_id || null, // 组件的唯一编号，方便vue组件的缓存，同时也为stageComponent提供了唯一依据
            dom: null, // jquery对象,即stage上的内容变换全靠它
            js: js || '', // 会最终展示出来shi
            css: css || '',
            data: null, // vue组件 和 stageComponent 交互的数据，同时也会保存到数据库中
            editor: null, // vue编辑器组件
            editor_regid: null, // vue编辑器组件的注册id
            isDragNew: isDragNew, // 是否是拖拽产生的新建组件
            canFindEditor: true, // 是否能找到对应的编辑器组件
            lastSaveHtml: lastSaveHtml || '' // 上一次保存的html
        };
        newStageComponent.editor_regid = editor_regid;
        newStageComponent.editor = this.canUseEditors.getComponent(newStageComponent.editor_regid);
        if (!newStageComponent.editor) {
            /*
            如果可用组件里找不到这个组件，说明组件被下架了，不能再用了。
            然后用disable组件填充编辑器
             */
            newStageComponent.canFindEditor = false;
            newStageComponent.editor_regid = 'wysHasMiss';
            newStageComponent.editor = this.canUseEditors.getComponent('wysHasMiss');
        }
        newStageComponent.dom = this._createDom(newStageComponent);
        if (!isDragNew) {
            newStageComponent.dom.html(newStageComponent.lastSaveHtml);
        }
        newStageComponent.component_id = this._createComponentId(component_id);
        newStageComponent.data = data || {};
        // this.stageComponents.push(newStageComponent);
        this.stageComponentsDict[newStageComponent.component_id] = newStageComponent;
        this.setCurrent(newStageComponent);
    },
    _increase: 1,
    /*
    创建唯一id
     */
    _createComponentId: function (component_id) {
        if(!component_id) {
            this._increase = this._increase + 1;
            // return 'wsycom_' + this.PageID + '_' + editor_regid + '_' + this._increase;
            return 'wsyblock-' + this._increase;
        }
        var increaseSeed = parseInt(component_id.split('-')[1]);
        if(increaseSeed>this._increase){
            this._increase = increaseSeed;
        }

    }
};
