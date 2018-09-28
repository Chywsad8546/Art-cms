<template>
    <Card span="100">
        <p slot="title">已审核经纪人列表</p>
        <Form ref="searchForm" :model="searchForm" inline :label-width="100">
            <FormItem label="经纪人名称" prop="agentName">
                <Input v-model="searchForm.agentName"/>
            </FormItem>
            <FormItem label="支付时间"  prop="paytime">
                <RadioGroup v-model="searchForm.paytime">
                    <Radio label="0">昨天</Radio>
                    <Radio label="1">本周</Radio>
                    <Radio label="2">上周</Radio>
                    <Radio label="3">本月</Radio>
                    <Radio label="4">上月</Radio>
                </RadioGroup>
                <DatePicker :value="cusTimeValue" v-model="searchForm.customTime" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="支付方式" prop="checkAllGroup">
                <Checkbox  :indeterminate="indeterminate"
                           :value="checkAll" @click.prevent.native="handleCheckAll" label="全选">全选</Checkbox>
                <CheckboxGroup v-model="searchForm.checkAllGroup" @on-change="checkAllGroupChange">
                    <Checkbox label="支付宝"></Checkbox>
                    <Checkbox label="微信"></Checkbox>
                    <Checkbox label="其他"></Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="流水账号" prop="liushuiaccount">
                <Input v-model="searchForm.liushuiaccount"/>
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
                cusTimeValue:['2016-01-01', '2016-02-15'],
                indeterminate: false,
                checkAll: false,
                data: [],
                searchForm: {
                    agentName: '',
                    paytime: '',
                    AuthType: 0,
                    authResult: 0,
                    checkAllGroup:[]
                },

                columns: [
                    {
                        key: 'agentName',
                        title: '经纪人姓名',
                        width: 100
                    },
                    {
                        key: 'storeName',
                        title: '所属门店'
                    },
                    {
                        key: 'corpShortName',
                        title: '支付时间'
                    },
                    {
                        key: 'paytime',
                        title: '支付方式'
                    },
                    {
                        key: 'authType',
                        title: '实付金额'
                    },
                    {
                        key: 'submitTime',
                        title: '支付流水号'
                    },
                    {
                        key: 'result',
                        title: '购买房源ID'
                    },
                    {
                        key: 'verifyUserName',
                        title: '购买关键词'
                    },
                    {
                        key: 'verifyTime',
                        title: '购买时长'
                    },
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
                    this.searchForm.checkAllGroup = ['支付宝', '微信', '其他'];
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
                console.log(this.searchData);
                api.getAgentAuditedList({params: this.searchData}).then(response => {
                    this.data = response.data.data.data;
                });
            },
            handleSearch () {
                this.init();
            },
            handleCancel (name) {
                this.$refs[name].resetFields();
                this.init();
                this.indeterminate=false;
                this.checkAll=false;
            }
        },
        created () {
            this.init();
        }
    }
</script>
