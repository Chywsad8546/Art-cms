<template>
    <Row>
        <Col span="100">
        <Card>
            <div slot="title">
                <b style="margin-right:20px">经纪人管理</b>
                <RadioGroup v-model="searchMethod">
                    <Radio label="多条件搜索"></Radio>
                    <Radio label="多手机搜索"></Radio>
                </RadioGroup>
            </div>

            <Form v-if="searchMethod=='多手机搜索'" ref="searchTelData">
                <Row>
                    <Col span="8">
                    <FormItem prop="telsStr">
                        <Input :rows="6" v-model="telsStr" type="textarea" placeholder="输入手机号搜索"></Input>
                    </FormItem>
                    </Col>
                    <Col span="4" offset="1">
                    <FormItem>
                        <Button type="primary" @click="handleSearch()">搜索</Button>
                        <Button type="ghost" @click="handleCancel()" style="margin-left: 8px">清空</Button>
                    </FormItem>
                    </Col>
                </Row>
            </Form>

            <Form v-if="searchMethod=='多条件搜索'" ref="searchData" :model="searchData" inline :label-width="120">
                <FormItem label="经纪人ID" prop="agentId">
                    <Input v-model.trim="searchData.agentId" style="width:140px"></Input>
                </FormItem>
                <FormItem label="所属公司简称" prop="corpShortName">
                    <Input v-model.trim="searchData.corpShortName" style="width:140px"></Input>
                </FormItem>
                <FormItem label="所属门店" prop="storeName">
                    <Input v-model.trim="searchData.storeName" style="width:140px"></Input>
                </FormItem>

                <FormItem label="姓名" prop="agentName">
                    <Input v-model.trim="searchData.agentName" style="width:140px"></Input>
                </FormItem>
                <FormItem label="登录手机号" prop="telephone">
                    <Input v-model.trim="searchData.telephone" style="width:140px"></Input>
                </FormItem>
                <FormItem label="对外展示电话" prop="displayPhone">
                    <Input v-model.trim="searchData.displayPhone" style="width:140px"></Input>
                </FormItem>
                <FormItem label="名片认证状态" prop="businessCardAuth">
                    <Select v-model="searchData.businessCardAuth" style="width:140px">
                        <Option value="">全部</Option>
                        <Option value="0">未认证</Option>
                        <Option value="1">认证中</Option>
                        <Option value="2">认证通过</Option>
                        <Option value="3">认证不通过</Option>
                    </Select>
                </FormItem>
                <FormItem label="身份认证状态" prop="idCardAuth">
                    <Select v-model="searchData.idCardAuth" style="width:140px">
                        <Option value="">全部</Option>
                        <Option value="0">未认证</Option>
                        <!-- <Option value="1">认证中</Option> -->
                        <Option value="2">认证通过</Option>
                        <Option value="3">认证不通过</Option>
                    </Select>
                </FormItem>
                <FormItem label="支付状态" prop="paymentAuth">
                    <Select v-model="searchData.paymentAuth" style="width:140px">
                        <Option value="">全部</Option>
                        <Option value="0">免费</Option>
                        <Option value="1">付费</Option>
                    </Select>
                </FormItem>
                <FormItem label="开始时间" prop="paymentAuth">
                    <DatePicker :value="searchData.startTime" @on-change="changeStartTime" type="date"
                                placeholder="Select date" style="width:140px"></DatePicker>
                </FormItem>
                <FormItem label="截止时间" prop="paymentAuth">
                    <DatePicker :value="searchData.endTime" @on-change="changeEndTime" type="date"
                                placeholder="Select date" style="width:140px"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSearch('searchData')">搜索</Button>
                    <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
                </FormItem>
            </Form>

            <Table border :columns="columns" :data="data"></Table>
            <Page :total="total" :current="searchData.pageNum" show-total @on-change="pageChange" align="right"
                  class="margin-top-10"></Page>
        </Card>
        </Col>
    </Row>
</template>
<script>
    import api from '../../../api/company/index.js';
    import moment from "moment";
    import {compact} from "lodash";

    export default {
        name: 'agentList',
        data() {
            return {
                columns: [{
                    key: 'agentId',
                    title: 'ID',
                    width: 70,
                    align: 'center'
                },
                {
                    key: 'agentName',
                    title: '真实姓名',
                    width: 90,
                    align: 'center'
                },
                {
                    key: 'corpShortName',
                    title: '公司',
                    width: 90,
                    align: 'center'
                },
                {
                    key: 'storeName',
                    title: '门店',
                    minWidth: 160,
                    align: 'center'
                },
                {
                    key: 'roleKey',
                    title: '所属角色',
                    width: 90,
                    align: 'center',
                    render: (h, params) => {
                        const key = params.row.roleKey;
                        let roleMsg = '';
                        if (key === 506) {
                            roleMsg = '普通版';
                        } else if (key === 508) {
                            roleMsg = '出租版';
                        } else if (key === 502) {
                            roleMsg = '免费版';
                        }
                        return h('span', roleMsg);
                    }
                },
                {
                    key: 'businessCardAuthStr',
                    title: '名片认证',
                    width: 90,
                    align: 'center'
                },
                {
                    key: 'idCardAuthStr',
                    title: '身份认证',
                    width: 90,
                    align: 'center'
                },
                {
                    key: 'telephone',
                    title: '手机号',
                    width: 120,
                    align: 'center'
                },
                {
                    key: 'isPerOpen',
                    title: '预开通',
                    width: 90,
                    align: 'center',
                    render: (h, params) => {
                        return h("span",
                            params.row.isPerOpen === 0 ? "否" : "是"
                        )
                    }
                },
                {
                    key: 'preOpenVersion',
                    title: '预开通版本',
                    width: 100,
                    align: 'center'
                },
                {
                    key: 'preOpenEndTime',
                    title: '预开通到期时间',
                    width: 130,
                    align: 'center',
                    render: (h, params) => {
                        let preOpenEndTime = params.row.preOpenEndTime;
                        return h('span', preOpenEndTime ? moment(preOpenEndTime).format('YYYY-MM-DD') : '');
                    }
                },
                {
                    key: 'startTime',
                    title: '开始时间',
                    align: 'center',
                    minWidth: 120,
                    render: (h, params) => {
                        let startTime = params.row.startTime;
                        return h('span', startTime ? moment(startTime).format('YYYY-MM-DD') : '');
                    }
                },
                {
                    key: 'endTime',
                    title: '截止时间',
                    align: 'center',
                    minWidth: 120,
                    render: (h, params) => {
                        let endTime = params.row.endTime;
                        return h("span", endTime ? moment(endTime).format("YYYY-MM-DD") : '')
                    }
                },
                {
                    key: 'limitCount',
                    title: '推优标签',
                    width: 90,
                    align: 'center'
                },
                {
                    title: '管理',
                    key: 'action',
                    width: 90,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: 'agentDetail',
                                                query: {
                                                    agentId: params.row.agentId,
                                                    userId: params.row.userId
                                                }
                                            });
                                        }
                                    }
                                },
                                '详情'
                            )
                        ]);
                    }
                }
                ],
                // 多条件搜索相关数据
                searchData: {
                    // roleKey:'',
                    agentId: '',
                    corpShortName: '',
                    storeName: '',
                    agentName: '',
                    displayPhone: '',
                    telephone: '',
                    idCardAuth: '',
                    paymentAuth: '',
                    businessCardAuth: '',
                    startTime: '',
                    endTime: '',
                    pageNum: 1,
                    pageSize: 10
                },
                //多手机搜索相关数据
                searchTelData: {
                    telephones: [],
                    pageNum: 1,
                    pageSize: 10
                },
                searchMethod: '多条件搜索',
                telsStr: '',
                data: [],
                initTable: [],
                total: 0
            };
        },
        watch: {
            searchMethod(cur, old) {
                this.init();
            },
            telsStr(cur, old) {
                this.searchTelData.telephones = compact(cur.split('\n'))
            }
        },
        computed: {},
        methods: {
            init() {
                if (this.searchMethod === '多条件搜索') {
                    api.getAgentList(this.searchData).then(response => {
                        this.data = this.initTable = response.data.data.data;
                        this.total = response.data.data.total;
                    });
                } else {
                    api.getAgentByTelephones(this.searchTelData).then(response => {
                        this.data = response.data.data.data;
                        this.total = response.data.data.total;
                    });
                }
            },
            handleSearch() {
                this.searchData.pageNum = 1;
                this.searchTelData.pageNum = 1;
                this.init();
            },
            handleCancel(name) {
                if (this.searchMethod === '多条件搜索') {
                    this.$refs[name].resetFields();
                    this.searchData.pageNum = 1;
                } else {
                    this.telsStr = '';
                    this.searchTelData.telephones = [];
                    this.searchTelData.pageNum = 1;
                }
                this.init();
            },
            pageChange(page) {
                this.searchData.pageNum = page;
                this.searchTelData.pageNum = page;
                this.init();
            },
            sizeChange(size) {
                this.searchData.pageSize = size;
                this.init();
            },
            changeStartTime(date) {
                this.searchData.startTime = date
            },
            changeEndTime(date) {
                this.searchData.endTime = date
            },
        },
        // created() {
        //     this.searchData.corpShortName = this.$route.query.corpShortName || ''
        //     this.searchData.storeName = this.$route.query.storeName || ''
        //     this.init();
        // },
        mounted() {
            this.searchData.corpShortName = this.$route.query.corpShortName || ''
            this.searchData.storeName = this.$route.query.storeName || ''
            this.init();
        }
    };
</script>
