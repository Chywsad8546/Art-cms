<template>

    <Card span="100">
        <p slot="title">楼盘专家下载</p>
        <Form class="margin-top-20" ref="formData" :model="searchData" inline :label-width="100">
            <FormItem label="经纪人编号" prop="agentId">
                <Input v-model.trim="searchData.agentId"/>
            </FormItem>
            <FormItem label="展示电话" prop="agentPhone">
                <Input v-model.trim="searchData.agentPhone"/>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSearch('formData')">搜索</Button>
                <Button type="ghost" @click="handleCancel('formData')" style="margin-left: 8px">清空</Button>
                <Button type="success" @click="projExpertDown" style="margin-left: 8px">下载</Button>
            </FormItem>
        </Form>
        <Table border :columns="columns" :data="data"></Table>
        <Page :total="total" :current="searchData.pageNum" show-total @on-change="pageChange" align="right" class="margin-top-10"></Page>
    </Card>
</template>

<script>
    import api from '../../../api/city/index.js';

    export default {
    name: 'projExpertList',
    data() {
        return {
            data: [],
            total: 0,
            searchData: {
                newcode: this.$route.query.newcode,
                pageNum: 1,
                pageSize: 10
            },
            columns: [
                {
                    key: 'agentId',
                    title: '经纪人编号',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'agentName',
                    title: '经纪人姓名',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'ofCompany',
                    title: '公司',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'agentPhone',
                    title: '展示电话',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'startTime',
                    title: '配置时间',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'endTime',
                    title: '到期时间',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'projName',
                    title: '配置楼盘',
                    align: 'center',
                    minWidth: 100
                }
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
            if (+this.searchData.agentId > (Math.pow(2, 31) - 1)) {
                this.$Notice.warning({
                    title: "经纪人Id不存在，请重新填写"
                });
                return false
            }
            let obj = Object.assign(this.searchData, { pageNum: cuPage });
            api.getProjExpertList(obj).then(response => {
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
            this.searchData.newcode = this.$route.query.newcode;
            this.init();
        },
        deploy(id) {
            api.cancelDeploy({ id: id }).then(response => {
                this.init()
            }).catch(response => {
                this.$Notice.warning({
                    title: response.msg || "解绑失败"
                });
            })
        },
        projExpertDown() {
            window.open(`/v1.0.0/projExpert/projExpertDown`);
        }
    },
    created() {
        this.searchData.agentId = this.$route.query.agentId || '';
        this.init();
    }
};
</script>