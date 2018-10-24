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
                    // console.log('_.trim(com.component.wys_stageTemplate',_.trim(com.component.wys_stageTemplate))
                    if (_.trim(com.component.wys_stageTemplate)) {
                        com.arttemplate = template.compile(_.trim(com.component.wys_stageTemplate));
                    } else {
                        com.arttemplate = function () {
                            return '错误 没有定义stage-template模板内容';
                        };
                    }
                    console.log('com.component.wys_stageJavascript', com.component.wys_stageJavascript, com.component.wys_stageTemplate);
                    if (_.trim(com.component.wys_stageJavascript)) {
                        com.artjavascript = template.compile(_.trim(com.component.wys_stageJavascript));
                    } else {
                        com.artjavascript = function () {
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
        var dom = $('<div class="comtest"></div>');
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
        for (var key in this.stageComponentsDict) {

        }
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
        console.log('render', data, component_id, isCreateEventRender, editorRenderTriggerERROR);

        var html = 'arttemplate render 错误';
        var js = '';
        try {
            html = targetStageComponent.editor.arttemplate(data);
            js = targetStageComponent.editor.artjavascript(data);
        } catch (e) {
            console.error('arttemplate渲染报错', e);
        }
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
        if (_.trim(js)) {
            $('body').append('<script type=\'text/javascript\'>' + js + '</script>');
        }
        targetStageComponent.js = _.trim(js);
    },
    /*
    创建 stageComponent
    @param editor_regid 组件的注册id
     */
    create: function (editor_regid, isDragNew, data, lastSaveHtml) {
        console.log('创建stage组件');
        var newStageComponent = {
            component_id: null, // 组件的唯一编号，方便vue组件的缓存，同时也为stageComponent提供了唯一依据
            dom: null, // jquery对象,即stage上的内容变换全靠它
            js: '', // 会最终展示出来shi
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
        newStageComponent.component_id = this._createComponentId(newStageComponent.editor_regid);
        newStageComponent.data = data || {};
        // this.stageComponents.push(newStageComponent);
        this.stageComponentsDict[newStageComponent.component_id] = newStageComponent;
        this.setCurrent(newStageComponent);
    },
    _increase: 0,
    /*
    创建唯一id
     */
    _createComponentId: function (editor_regid) {
        this._increase = this._increase + 1;
        // return 'wsycom_' + this.PageID + '_' + editor_regid + '_' + this._increase;
        return 'wsy-block-' + this._increase;
    }
};
