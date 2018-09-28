<template>

    <Card span="100">
        <p slot="title">邀请记录列表</p>
        <Table border :columns="columns" :data="data"></Table>
        <Page :total="total" :current="searchData.pageNum" show-total @on-change="pageChange" align="right"
              class="margin-top-10"></Page>
    </Card>
</template>

<script>
    import api from '../../../api/city/index.js';

    export default {
        name: 'customerList',
        data() {
            return {
                data: [],
                total: 0,
                searchData: {
                    code: '',
                    pageNum: 1,
                    pageSize: 10
                },
                columns: [
                    {
                        key: 'userId',
                        title: '用户编号',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'invitationCode',
                        title: '邀请码',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'createTime',
                        title: '邀请时间',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'equipmentNo',
                        title: '设备号',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'phone',
                        title: '手机号',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'isValid',
                        title: '有效性',
                        align: 'center',
                        minWidth: 100,
                        render: (h, params) => {
                            if (params.row.isValid === 0) {
                                return h('div', '待支付');
                            } else if (params.row.isValid === 1) {
                                return h('div', '已支付');
                            } else {
                                return h('div', '');
                            }
                        }
                    },
                ]
            };
        },
        methods: {
            skipPage(name) {
                this.$router.push({
                    name: name
                });
            },
            init() {
                this.pageChange(1);
            },
            pageChange(cuPage) {
                let obj = Object.assign(this.searchData, {code: this.$route.query.code, pageNum: cuPage});
                api.getInviteHistorys(obj).then(response => {
                    this.data = response.data.data.data;
                    this.total = response.data.data.total;
                });
            },
        },
        created() {
            this.init();
        }
    };
</script>
