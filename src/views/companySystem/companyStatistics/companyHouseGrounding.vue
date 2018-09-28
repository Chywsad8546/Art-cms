<template>
    <Card span="100">
        <p slot="title">已审核经纪人列表</p>
        <Form ref="searchForm" :model="searchForm" inline :label-width="100">
            <FormItem label="时间" prop="time">
                <RadioGroup v-model="searchForm.time">
                    <Radio label="0">昨天</Radio>
                    <Radio label="1">本周</Radio>
                    <Radio label="2">上周</Radio>
                    <Radio label="3">本月</Radio>
                    <Radio label="4">上月</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem  label="自定义时间段" prop="customTime">
                <DatePicker :value="cusTimeValue" v-model="searchForm.customTime" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="查看内容" prop="checkAllGroup">
                <Checkbox  :indeterminate="indeterminate"
                           :value="checkAll" @click.prevent.native="handleCheckAll" label="全选">全选</Checkbox>
                <CheckboxGroup v-model="searchForm.checkAllGroup" @on-change="checkAllGroupChange">
                    <Checkbox label="发布房源数"></Checkbox>
                    <Checkbox label="取消发布房源数"></Checkbox>
                    <Checkbox label="前台展示房源数"></Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSearch('searchForm')">搜索</Button>
                <Button type="ghost" @click="handleCancel('searchForm')" style="margin-left: 8px">清空</Button>
            </FormItem>
        </Form>
        <Table border :columns="columns" :data="data"></Table>
    </Card>
</template>

<script>
    import api from '../../../api/company/index.js';

    export default {
        name: '',
        data () {
            return {
                indeterminate: false,
                checkAll: false,
                data: [],
                cusTimeValue:['2016-01-01', '2016-02-15'],
                searchForm: {
                    time:"",
                    customTime:"",
                    checkAllGroup:[]
                },
                columns: [
                    {
                        key: 'agentName',
                        title: '姓名',
                        width: 100
                    },
                    {
                        key: 'storeName',
                        title: '所属门店'
                    },
                    {
                        key: 'corpShortName',
                        title: '公司简称'
                    },
                    {
                        key: 'telephone',
                        title: '登录手机号'
                    },
                    {
                        key: 'authType',
                        title: '认证类型'
                    },
                    {
                        key: 'submitTime',
                        title: '提交认证时间'
                    },
                    {
                        key: 'result',
                        title: '审核结果'
                    },
                    {
                        key: 'verifyUserName',
                        title: '审核员'
                    },
                    {
                        key: 'verifyTime',
                        title: '审核时间'
                    },
                    {
                        key: 'action',
                        title: '操作',
                        width: 100,
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
                                                if (params.row.authType === '名片认证') {
                                                    this.$router.push({
                                                        name: 'pendingDetail',
                                                        query: {agentId: params.row.agentId}
                                                    });
                                                } else if (params.row.authType === '身份认证') {
                                                    this.$router.push({
                                                        name: 'auditedDetail',
                                                        query: {agentId: params.row.agentId}
                                                    });
                                                }
                                            }
                                        }
                                    },
                                    '审核'
                                )
                            ]);
                        }
                    }
                ]
            };
        },
        methods: {
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.searchForm.checkAllGroup = ['发布房源数', '取消发布房源数', '前台展示房源数'];
                } else {
                    this.searchForm.checkAllGroup= [];
                }
            },
              checkAllGroupChange (data) {
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            },
            init () {
              /*  console.log(this.searchData);
                api.getAgentAuditedList({params: this.searchData}).then(response => {
                    this.data = response.data.data.data;
                });*/
            },
            handleSearch () {
                this.init();
            },
            handleCancel (name) {
                this.$refs[name].resetFields();
                indeterminate=false;
            },

        },
        created () {
            this.init();
        }
    }
</script>
