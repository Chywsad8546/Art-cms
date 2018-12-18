import component_stage from '../wys-conf/component-stage';
export default {
    __wys_mixin_hook: true,
    data: function() {
        return {
            share: {}
        };
    },
    created: function() {},
    activated: function() {
        console.log('activated start ', this.$vnode.key);
        console.log(
            'component_stage.stageComponentsDict',
            component_stage.stageComponentsDict
        );
        // if (this.wys_isdefault_dont_getdata) {
        //     return;
        // }
        var dbdata = component_stage.stageComponentsDict[this.$vnode.key];
        for (var key in dbdata.data) {
            try {
                this.$set(this.share, key, dbdata.data[key]);
            } catch (e) {
                console.error(e);
            }
        }
        /*
        判断是不是右侧editor的子组件，如果不是一级子组件，不要触发这些钩子
         */
        if (this.$parent.wysiwyg_prevent_mixin_isEditorRoot) {
            // this.$set(this.share,'brickid',this.$vnode.key);
            this.$watch(
                'share',
                function(newVal, oldVal) {
                    component_stage.render(newVal, this.$vnode.key, false);
                },
                {
                    deep: true
                }
            );
        }
        // console.log('activated render', this.share, this.$vnode.key, true);
        component_stage.render(this.share, this.$vnode.key, true);
        console.log('activated');
    }
};
