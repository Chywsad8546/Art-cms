<template>
    <Card span="100">
        <p slot="title">已审核列表</p>
        <Menu mode="horizontal" theme="light" @on-select="skipPage" active-name="qualificationCardAuthDoneList">
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
            <FormItem label="认证结果" prop="authResult">
                <Select v-model="searchData.auth" style="width:140px">
                    <Option value="99">全部</Option>
                    <Option value="2">认证通过</Option>
                    <Option value="3">认证不通过</Option>
                </Select>
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
        name: 'qualificationCardAuthDoneList',
        data() {
            return {
                data: [],
                initTable: [],
                total: 0,
                searchData: {
                    name: '',
                    phone: '',
                    auth: 99,
                    pageNum: 1
                },
                columns: [{
                    key: 'agentName',
                    title: '姓名',
                    align: "center"
                },
                {
                    key: 'storeName',
                    title: '所属门店',
                    align: "center"
                },
                {
                    key: 'corpShortName',
                    title: '公司简称',
                    align: "center"
                },
                {
                    key: 'telephone',
                    title: '登录手机号',
                    align: "center"
                },
                {
                    key: 'qualificationCardVerifyUserName',
                    title: '审核人',
                    align: "center"
                },
                {
                    key: 'qualificationCardVerifyTime',
                    title: '审核时间',
                    align: "center"
                },
                {
                    key: 'qualificationCardAuth',
                    title: '审核结果',
                    align: "center",
                    render: (h, params) => {
                        if (params.row.qualificationCardAuth === 2) {
                            return h('div', '审核通过');
                        } else if (params.row.qualificationCardAuth === 3) {
                            return h('div', '审核不通过');
                        }
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
