<template>
    <Card span="100">
        <p slot="title">待审核列表</p>
        <Menu mode="horizontal" theme="light" @on-select="skipPage" active-name="qualificationCardAuthWaitList">
            <MenuItem name="qualificationCardAuthWaitList"> 待审核
            </MenuItem>
            <MenuItem name="qualificationCardAuthDoneList"> 已审核
            </MenuItem>
        </Menu>

        <Form class="margin-top-20" ref="formData" :model="searchData" inline :label-width="100">
            <FormItem label="经纪人名称" prop="agentName">
                <Input v-model="searchData.name"/>
            </FormItem>
            <FormItem label="登录手机号" prop="telephone">
                <Input v-model="searchData.phone"/>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSearch('formData')">搜索</Button>
                <Button type="ghost" @click="handleCancel('formData')" style="margin-left: 8px">清空</Button>
            </FormItem>
        </Form>
        <Table border :columns="columns" :data="data"></Table>
        <Row type="flex" justify="end" style="margin-top:20px">
            <Page :total="total" :current="searchData.pageNum" @on-change="changePage"></Page>
        </Row>
    </Card>
</template>

<script>
    import api from '../../../api/company/index.js';

    export default {
        name: 'qualificationCardAuthWaitList',
        data() {
            return {
                data: [],
                initTable: [],
                total: 0,
                searchData: {
                    name: '',
                    phone: '',
                    auth: 1,
                    pageNum: 1
                },
                columns: [{
                    key: 'agentName',
                    title: '姓名',
                    align: "center",
                    width: 100
                },
                {
                    key: 'storeName',
                    title: '所属门店',
                    align: "center",
                    width: 100
                },
                {
                    key: 'corpShortName',
                    title: '公司简称',
                    align: "center",
                    width: 100
                },
                {
                    key: 'telephone',
                    title: '登录手机号',
                    align: "center",
                    width: 120
                },
                {
                    key: 'qualificationCardVerifyTime',
                    title: '提交认证时间',
                    align: "center",
                    minWidth: 160
                },
                {
                    key: 'action',
                    title: '操作',
                    align: "center",
                    minWidth: 140,
                    render: (h, params) => {
                        let buttons = [];
                        let btn = h(
                            'a', {
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'qualificationCardAuthDetail',
                                            query: {
                                                agentId: params.row.agentId
                                            }
                                        });
                                    }
                                }
                            },
                            '经纪人审核详情'
                        );
                        buttons.push(btn);
                        return h('div', buttons);
                    }
                }
                ]
            };
        },
        methods: {
            init() {
                // if(this.searchData.agentName||this.searchData.telephone) {
                api.getAgentQalificationCardAuthList(this.searchData).then(response => {
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
            skipPage(name) {
                this.$router.push({
                    name: name
                });
            },
            changePage(page) {
                this.searchData.pageNum = page;
                this.init();
            }
        },
        created() {
            this.init();
        }
    };
</script>
