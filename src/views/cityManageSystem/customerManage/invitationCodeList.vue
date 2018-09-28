<template>

    <Card span="100">
        <p slot="title">邀请码管理</p>
        <Form class="margin-top-20" ref="formData" :model="searchData" inline :label-width="100">
            <FormItem label="三级邀请码" prop="thirdLevelCode">
                <Input v-model.trim="searchData.thirdLevelCode" @keyup.enter.native="handleSearch"/>
            </FormItem>
            <FormItem label="二级邀请码" prop="secondLevelCode">
                <Input v-model.trim="searchData.secondLevelCode" @keyup.enter.native="handleSearch"/>
            </FormItem>
            <FormItem label="一级邀请码" prop="firstLevelCode">
                <Input v-model.trim="searchData.firstLevelCode" @keyup.enter.native="handleSearch"/>
            </FormItem>
            <FormItem label="设备编号" prop="equipmentNo">
                <Input v-model.trim="searchData.equipmentNo" @keyup.enter.native="handleSearch"/>
            </FormItem>
            <FormItem label="受邀人电话" prop="phone">
                <Input v-model.trim="searchData.phone" @keyup.enter.native="handleSearch"/>
            </FormItem>
            <FormItem label="邀请日期" prop="createTime">
                <DatePicker :clearable="true" :value="searchData.createTime" @on-change="changeCreateTime"
                            type="date"
                            placeholder="请选择邀请日期" @keyup.enter.native="handleSearch"></DatePicker>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSearch">搜索</Button>
                <Button type="ghost" @click="handleCancel('formData')" style="margin-left: 8px">清空</Button>
                <Button type="ghost" @click="download" style="margin-left: 8px">下载</Button>
            </FormItem>
        </Form>
        <Table border :columns="columns" :data="data"></Table>
        <Page :total="total" :current="searchData.pageNum" show-total @on-change="pageChange" align="right"
              class="margin-top-10"></Page>
    </Card>
</template>

<script>
    import api from '../../../api/city/index.js';
    import moment from 'moment';

    export default {
        name: 'customerList',
        data() {
            return {
                data: [],
                total: 0,
                searchData: {
                    firstLevelCode: '',
                    secondLevelCode: '',
                    thirdLevelCode: '',
                    equipmentNo: '',
                    phone: '',
                    createTime: undefined,
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
                        key: 'thirdLevelCode',
                        title: '三级邀请码',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'secondLevelCode',
                        title: '二级邀请码',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'firstLevelCode',
                        title: '一级邀请码',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'phone',
                        title: '受邀人电话',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'yourCode',
                        title: '受邀人邀请码',
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
                        key: 'createTime',
                        title: '创建时间',
                        align: 'center',
                        minWidth: 100
                    }
                ]
            };
        },
        methods: {
            changeCreateTime(date) {
                this.searchData.createTime = moment(date).format('YYYY/MM/DD');
            },
            skipPage(name) {
                this.$router.push({
                    name: name
                });
            },
            init() {
                this.pageChange(1);
            },
            pageChange(cuPage) {
                let obj = Object.assign(this.searchData, {pageNum: cuPage});
                api.getSuperInviteHistory(obj).then(response => {
                    this.data = response.data.data.data;
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
            download() {
                window.open(`/v1.0.0/invitation/downSuperInviteHistory`);
            }
        },
        created() {
            this.init();
        }
    };
</script>
