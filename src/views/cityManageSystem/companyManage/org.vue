<template>
    <Card span="100">
        <p slot="title">组织架构</p>
        <Tree :data="data"></Tree>
    </Card>
</template>

<script>
    import api from '../../../api/company/index';

    export default {
        data () {
            return {
                corpId: this.$route.query.corpId,
                data: []
            };
        },

        methods: {
            init () {
                api.corpStructure({corpId: this.corpId}).then(response => {
                    if (response.data.code == 0) {
                        this.data = response.data.data.data;
                        console.log(this.data);
                    } else {
                        this.$Notice.info({
                            title: response.data.msg || '出错提示'
                        });
                    }
                });
            }
        },
        created () {
            this.init();
        }
    };
</script>
