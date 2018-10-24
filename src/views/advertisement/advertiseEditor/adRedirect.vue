<template>
    <Spin fix>
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
    </Spin>
</template>

<script>
    import _ from 'lodash';
    import editortemplate from '@/api/advertisement/formtemplateApi';
    import ad from '@/api/advertisement/ad';
    export default {
        name: 'ad-redirect',
        methods: {

        },
        created() {
            var that = this;
            if (this.$route.query.id) {
                ad.getIdea(this.$route.query.id).then(function (res) {
                    that.typeId = res.data.data.typeId;
                    editortemplate.getTemplate(res.data.data.typeId).then(function (res) {
                        /**
                             * 跳高级编辑器，新增创意页
                             */
                        if (res.data.data.isAdvancedEdit) {
                            that.$replacePageAndActiveRouter({'name': 'ad_addsenioretail', query: {id: that.$route.query.id}});
                        }
                        /**
                             * 跳简单编辑器，新增创意页
                             */
                        else {
                            that.$replacePageAndActiveRouter({'name': 'ad_addetail', query: {id: that.$route.query.id}});
                        }
                    });
                });
            } else {
                editortemplate.getTemplate(this.$route.query.templateid).then(function (res) {
                    console.log('meta.keepaliveid',that.$route.meta.keepaliveid)
                    /**
                     * 跳高级编辑器，新增创意页
                     */
                    if (res.data.data.isAdvancedEdit) {
                        that.$replacePageAndActiveRouter({'name': 'ad_addsenioretail', query: {templateid: that.$route.query.templateid}});
                    }
                    /**
                     * 跳简单编辑器，新增创意页
                     */
                    else {
                        that.$replacePageAndActiveRouter({'name': 'ad_addetail', query: {templateid: that.$route.query.templateid}});
                    }
                });
            }
        }

    };
</script>

<style scoped>

</style>