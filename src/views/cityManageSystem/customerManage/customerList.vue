<template>

    <Card span="100">
        <p slot="title">下单用户列表</p>
        <Form class="margin-top-20" ref="formData" :model="searchData" inline :label-width="100">
            <FormItem label="登录手机号" prop="telephone">
                <Input v-model="searchData.phone"/>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSearch('formData')">搜索</Button>
                <Button type="ghost" @click="handleCancel('formData')" style="margin-left: 8px">清空</Button>
            </FormItem>
        </Form>
        <Table border :columns="columns" :data="data"></Table>
        <Page :total="total" :current="searchData.pageNum" show-total @on-change="pageChange" align="right"
              class="margin-top-10"></Page>
    </Card>
</template>

<script>
    import api from '../../../api/city/index.js';

    export default {
        name: 'customerList',
        data () {
            return {
                data: [],
                total: 0,
                searchData: {
                    phone: '',
                    pageNum: 1,
                    pageSize: 10
                },
                columns: [
                    {
                        key: 'phone',
                        title: '客户电话',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'productDetails',
                        title: '商品详情',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'balance',
                        title: '余额',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'createTime',
                        title: '发起购买时间',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'status',
                        title: '状态',
                        align: 'center',
                        minWidth: 100,
                        render: (h, params) => {
                            if (params.row.status === 0) {
                                return h('div', '待支付');
                            } else if (params.row.status === 1) {
                                return h('div', '已完成');
                            } else {
                                return h('div', '未知');
                            }
                        }
                    },
                    {
                        key: 'useStatus',
                        title: '使用状态',
                        align: 'center',
                        minWidth: 100,
                        render: (h, params) => {
                            if (params.row.useStatus === '0') {
                                return h('div', '未使用');
                            } else if (params.row.useStatus === '1') {
                                return h('div', '已使用');
                            } else {
                                return h('div', '');
                            }
                        }
                    },
                    {
                        key: 'useTime',
                        title: '使用时间',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'operate',
                        title: '操作',
                        align: 'center',
                        minWidth: 100,
                        render: (h, params) => {
                            if (params.row.useStatus === '0') {
                                return h('div',
                                    [
                                        h('Button', {
                                            props: {
                                                type: 'primary',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                click: () => {
                                                    this.$Modal.success({
                                                        content: params.row.validateCode
                                                    });
                                                }
                                            }
                                        }, '查看验证码'),
                                        h('Button', {
                                            props: {
                                                type: 'primary',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                click: () => {
                                                    api.updateStatusByOrderNo({orderNo: params.row.orderNo}).then(response => {
                                                        this.init();
                                                    });
                                                }
                                            }
                                        }, '验证')]);
                            } else {
                                return h('div', '');
                            }
                        }
                    }
                ]
            };
        },
        methods: {
            skipPage (name) {
                this.$router.push({
                    name: name
                });
            },
            init () {
                this.pageChange(1);
            },
            pageChange (cuPage) {
                let obj = Object.assign(this.searchData, {pageNum: cuPage});
                api.getPayList(obj).then(response => {
                    this.data = response.data.data.data;
                    this.total = response.data.data.total;
                });
            },
            handleSearch () {
                this.searchData.pageNum = 1;
                this.init();
            },
            handleCancel (name) {
                this.$refs[name].resetFields();
                this.searchData.pageNum = 1;
                this.init();
            }
        },
        created () {
            this.init();
        }
    };
</script>
