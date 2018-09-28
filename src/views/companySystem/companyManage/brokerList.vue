<template>
    <Row>
        <Card>
            <p slot="title">经纪人管理列表</p>
            <Form ref="searchData" :model="searchData" inline :label-width="100">
                <FormItem label="注册电话" prop="telephone">
                    <Input v-model="searchData.telephone" />
                </FormItem>
                <FormItem label="姓名" prop="agentName">
                    <Input v-model="searchData.agentName" />
                </FormItem>
                <FormItem label="经纪人ID" prop="agentId">
                    <Input v-model="searchData.agentId" />
                </FormItem>
                <FormItem label="所属门店" prop="storeName">
                    <Select v-model="searchData.storeName" clearable style="width: 141px">
                        <Option v-for="item in storeList" :value="item.corpName" :key="item.corpId">{{ item.corpName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="对外展示电话" prop="displayPhone">
                    <Input v-model="searchData.displayPhone" />
                </FormItem>
                <FormItem label="身份认证状态" prop="idCardAuth">
                    <Select v-model="searchData.idCardAuth" style="width: 141px">
                        <Option value="">全部</Option>
                        <Option value="0">未认证</Option>
                        <Option value="2">认证通过</Option>
                        <Option value="3">认证不通过</Option>
                    </Select>
                </FormItem>
                <FormItem label="名片认证状态" prop="businessCardAuth">
                    <Select v-model="searchData.businessCardAuth" style="width: 141px">
                        <Option value="">全部</Option>
                        <Option value="0">未认证</Option>
                        <Option value="1">认证中</Option>
                        <Option value="2">认证通过</Option>
                        <Option value="3">认证不通过</Option>
                    </Select>
                </FormItem>
                <!-- <FormItem label="支付认证状态" prop="paymentAuth">
                    <Select v-model="searchData.paymentAuth" style="width: 141px">
                        <Option value="">全部</Option>
                        <Option value="0">未认证</Option>
                        <Option value="1">认证通过</Option>
                    </Select>
                </FormItem> -->
                <FormItem>
                    <Button type="primary" @click="handleSearch('searchData')">搜索</Button>
                    <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
                </FormItem>
            </Form>
            <Row class="margin-top-10 searchable-table-con1">
                <Table border :columns="columns" :data="data"></Table>
                <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" style="margin-top:10px; text-align:right"></Page>
            </Row>
        </Card>
    </Row>
</template>

<script>
import api from "../../../api/company/index.js";

export default {
    name: "brokerList",
    data() {
        return {
            columns: [{
                key: "agentId",
                title: "ID",
                align: "center",
                width: 100
            },
            {
                key: "agentName",
                title: "姓名",
                align: "center",
            },
            {
                key: "districtName",
                title: "区域",
                align: "center",
            },
            {
                key: "storeName",
                title: "所属门店",
                align: "center",
            },
            // {
            // 	key: "businessCardAuthStr",
            // 	title: "名片认证状态",
            // 	align: "center",
            // },
            // {
            // 	key: "idCardAuthStr",
            // 	title: "身份证认证",
            // 	align: "center",
            // },
            // {
            // 	key: "paymentAuthStr",
            // 	title: "支付认证",
            // 	align: "center",
            // },
            {
                key: "telephone",
                title: "注册电话",
                align: "center",
            },
            {
                key: "displayPhone",
                title: "展示电话",
                align: "center",
            },
            {
                key: "paymentVersionStr",
                title: "付费版本",
                align: "center",
            },
            {
                title: "管理",
                key: "action",
                width: 90,
                align: "center",
                render: (h, params) => {
                    return h("div", [
                        h(
                            "Button", {
                                props: {
                                    type: "primary",
                                    size: "small"
                                },
                                style: {
                                    marginRight: "5px"
                                },
                                on: {
                                    click: () => {
                                        this.Detail(params.index);
                                    }
                                }
                            },
                            "详情"
                        )
                    ]);
                }
            }
            ],
            searchData: {
                agentId: "",
                agentName: "",
                storeName: "",
                businessCardAuth: "",
                idCardAuth: "",
                paymentAuth: "",
                telephone: "",
                displayPhone: "",
                pageNum: 1,
                pageSize: 10
            },
            data: [],
            initTable: [],
            total: 0,
            storeList: []
        };
    },
    methods: {
        init () {
            api.getCorpAgent(this.searchData).then(response => {
                console.log(response.data);
                this.data = this.initTable = response.data.data.data;
                this.total = response.data.data.total;
            });
        },
        Detail(index) {
            this.$router.push({
                name: "brokerDetail",
                query: {
                    agentId: this.data[index].agentId
                }
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
        },
        treeToData(val) {
            var that = this;
            val.forEach(function (item, index) {
                var obj = {};
                obj.corpId = item.corpId;
                obj.corpName = item.corpName;
                this.storeList.push(obj);
                if (item.children) {
                    that.treeToData(item.children);
                }
            });
        }
    },
    created() {
        let that = this;
        api.getCurrentCorp().then(function (corp) {
            api
                .getCorpByCorpId({
                    corpId: corp.data.data.corpId
                })
                .then(response => {
                    that.storeList = response.data.data.data;
                })
                .catch(error => {
                    console.log(error.response.data.msg);
                });
        });
        this.init();
    }
};
</script>
