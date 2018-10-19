import component_stage from '../wys-conf/component-stage';
export default {
    __wys_mixin_hook: true,
    created: function () {
        console.log('created');
        /*
                        判断是不是右侧editor的子组件，如果不是一级子组件，不要触发这些钩子
                         */
        if (this.$parent.wysiwyg_prevent_mixin_isEditorRoot) {
            component_stage.render(this.$data, this.$vnode.key, true); // this.$options.wys_stageTemplate,
        }
    },
    activated: function () {
        console.log('activated');
        // if(component_stage.currentComponent && component_stage.currentComponent.isDragNew){

        // }
    },
    watch: {
        $data: {
            handler: function (val, oldVal) {
                console.log('watch');
                if (this.$parent.wysiwyg_prevent_mixin_isEditorRoot) {
                    component_stage.render(val, this.$vnode.key,false);
                }
            },
            deep: true
        }

    }
};
