<template>
    <Row>
        <Col span="100">
        <Card>
            <p slot="title">企业管理</p>
            <Form ref="searchData" :model="searchData" inline :label-width="120">
                <FormItem label="企业名称" prop="corpName">
                    <Input v-model.trim="searchData.corpName" style="width:140px"/>
                </FormItem>
                <FormItem label="公司名称或简称" prop="corpShortName">
                    <Input v-model.trim="searchData.corpShortName" style="width:140px"/>
                </FormItem>
                <FormItem label="企业账号" prop="userName">
                    <Input v-model.trim="searchData.userName" style="width:140px"/>
                </FormItem>
                <FormItem label="安全手机号" prop="corpSafePhone">
                    <Input v-model.trim="searchData.corpSafePhone" style="width:140px"/>
                </FormItem>
                <FormItem label="认证状态" prop="businessCardAuth">
                    <Select v-model="searchData.businessCardAuth" style="width:140px">
                        <Option value="-1">全部</Option>
                        <Option value="0">未认证</Option>
                        <Option value="1">认证中</Option>
                        <Option value="2">认证通过</Option>
                        <Option value="3">认证不通过</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSearch('searchData')">搜索</Button>
                    <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
                </FormItem>
            </Form>
            <Table border :columns="columns" :data="data"></Table>
            <Page :total="total" :current="searchData.pageNum" show-total show-sizer @on-change="pageChange"
                  @on-page-size-change="sizeChange" align="right" class="margin-top-10"></Page>
        </Card>
        </Col>
    </Row>
</template>
<script>
    import api from '../../../api/company/index.js';

    export default {
        name: 'companyList',
        data() {
            return {
                columns: [
                    {
                        key: 'corpId',
                        title: 'ID',
                        align: "center",
                        width: 100
                    },
                    {
                        key: 'corpName',
                        title: '企业名称',
                        align: "center",
                        minWidth: 130
                    },
                    {
                        key: 'corpShortName',
                        title: '所属公司简称',
                        align: "center",
                        width: 110
                    },
                    {
                        key: 'corpLevel',
                        title: '企业层级',
                        align: "center",
                        minWidth: 130
                    },
                    {
                        key: 'userName',
                        title: '企业账号',
                        align: "center",
                        minWidth: 120
                    },
                    {
                        key: 'status',
                        title: '账号状态',
                        align: "center",
                        width: 100
                    },
                    {
                        key: 'safePhone',
                        title: '安全手机',
                        align: "center",
                        width: 120
                    },
                    {
                        key: 'upCorpId',
                        title: '上级企业ID',
                        align: "center",
                        width: 100
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                if (params.row.corpLevel === '公司') {
                                                    this.$router.push({
                                                        name: 'companyDetail_city',
                                                        query: {corpId: params.row.corpId}
                                                    });
                                                } else if (params.row.corpLevel === '门店') {
                                                    this.$router.push({
                                                        name: 'storeDetail_city',
                                                        query: {corpId: params.row.corpId}
                                                    });
                                                }
                                            }
                                        }
                                    },
                                    '详情'
                                ),
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: 'org',
                                                    query: {corpId: params.row.corpId}
                                                });
                                            }
                                        }
                                    },
                                    '完整组织结构'
                                )
                            ]);
                        }
                    }
                ],
                searchData: {
                    corpName: '',
                    corpShortName: '',
                    userName: '',
                    safePhone: '',
                    businessCardAuth: -1,
                    pageNum: 1,
                    pageSize: 10
                },
                data: [],
                initTable: [],
                total: 0
            };
        },
        methods: {
            init() {
                api.listCorp(this.searchData).then(response => {
                    this.data = this.initTable = response.data.data.data;
                    this.total = response.data.data.total;
                });
            },
            handleSearch() {
                this.searchData.pageNum = 1;
                this.init();
            },
            handleCancel(name) {
                this.$refs[name].resetFields();
                this.searchData.pageNum = 1;
                this.init();
            },
            pageChange(page) {
                this.searchData.pageNum = page;
                this.init();
            },
            sizeChange(size) {
                this.searchData.pageSize = size;
                this.init();
            }
        },
        created() {
            // this.init();
        },
        activated() {
            this.init();
            // console.log('企业 activated');
        },
        deactivated() {
        }
    };
</script>
