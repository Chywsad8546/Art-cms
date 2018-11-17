import component_stage from '../wys-conf/component-stage';
export default {
    __wys_mixin_hook: true,
    created: function () {
        console.log('created');
        /*
        判断是不是右侧editor的子组件，如果不是一级子组件，不要触发这些钩子
         */
        if (this.$parent.wysiwyg_prevent_mixin_isEditorRoot) {
            // this.$set(this.share,'brickid',this.$vnode.key);
            this.$watch('share', function (newVal, oldVal) {
                component_stage.render(newVal, this.$vnode.key,false);
            },{
                deep: true
            });
        }
    },
    activated: function () {
        component_stage.render(this.share, this.$vnode.key, true);
        console.log('activated');
    },
};
