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
        init: function () {
            this.coms.splice(0,this.coms.length);
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
                    if (_.trim(com.component.wys_stageTemplate)) {
                        com.arttemplate = template.compile(_.trim(com.component.wys_stageTemplate));
                    } else {
                        com.arttemplate = function () {
                            return '错误 没有定义stage-template模板内容';
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
        console.log('stage engine init', this.canUseEditors);
        // template.defaults.debug=true;
        // template.defaults.bail =false;
        // todo 检查混入，没混入的话，要初始化失败
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
    stageComponents: [],
    stageComponentsDict: {},
    render: function (data, component_id, isNew) {
        var targetStageComponent = this.stageComponentsDict[component_id];
        var html = 'arttemplate render 错误';
        try {
            html = targetStageComponent.editor.arttemplate(data);
        } catch (e) {}
        targetStageComponent.dom.html(html);
        targetStageComponent.data = data;
        if (isNew) {
            this._stage.find('.wysi_hold').eq(0).after(targetStageComponent.dom);
            this._stage.find('.wysi_hold').remove();
        }
    },
    /*
    创建画布上的站位dom，是一个jquery对象
     */
    _createDom: function (stageComponent) {
        var that = this;
        var dom = $('<div class="comtest"></div>');
        dom.data('stageCompontHook', stageComponent);
        dom.click(function (event) {
            if ($(this).data('stageCompontHook').component_id != that.currentComponent.component_id) {
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
    /*
    创建 stageComponent
    @param editor_regid 组件的注册id
    @param isDragNew
            true:拖拽创建的
            false:从数据库取出的
     */
    create: function (editor_regid, isDragNew, data) {
        console.log('创建stage组件');
        var newStageComponent = {
            component_id: null, // 组件的唯一编号，方便vue组件的缓存，同时也为stageComponent提供了唯一依据
            dom: null, // jquery对象,即stage上的内容变换全靠它
            data: null, // vue组件 和 stageComponent 交互的数据，同时也会保存到数据库中
            editor: null, // vue组件
            editor_regid: null, // vue组件的注册id
            isDragNew: isDragNew || true
        };
        newStageComponent.editor_regid = editor_regid;
        newStageComponent.editor = this.canUseEditors.getComponent(newStageComponent.editor_regid);
        if (!newStageComponent.editor) {
            newStageComponent.editor_regid = 'wys_wrong';
            newStageComponent.editor = this.canUseEditors.getComponent(newStageComponent.editor_regid);
        }
        newStageComponent.dom = this._createDom(newStageComponent);
        newStageComponent.component_id = this._createComponentId(newStageComponent.editor_regid);
        newStageComponent.data = data || {};
        this.stageComponents.push(newStageComponent);
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
