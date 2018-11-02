<template>
    <Row>
        <Col span="100">
            <Card>
                <p slot="title">编辑器列表管理</p>
    <Form  ref="searchData" :model="searchData" inline :label-width="120">
        <FormItem label="选择应用" prop="station">
            <Select v-model="searchData.station" style="width:100px" @on-change = "zdClick">
                <Option v-for="item in zhandianList" :value="item.station" :key="item.station">{{ item.stationName }}</Option>
            </Select>
        </FormItem>
        <FormItem label="选择栏目" prop="pageId">
            <Select v-model="searchData.pageId" style="width:100px"  @on-change = "pdClick">
                <Option v-for="item in pingdaoList" :value="item.pageId" :key="item.pageId">{{ item.pageName }}</Option>
            </Select>
        </FormItem>
        <FormItem label="选择位置" prop="positionId">
            <Select v-model="searchData.positionId" style="width:100px">
                <Option v-for="item in weizhiList" :value="item.positionId" :key="item.positionId">{{ item.positionName }}</Option>
            </Select>
        </FormItem>
        <!-- <FormItem label="是否删除" prop="isDel">
             <Select v-model="searchData.isDel" style="width:140px">
                 <Option value="">全部</Option>
                 <Option value="0">否</Option>
                 <Option value="1">是</Option>
             </Select>
         </FormItem>-->
        <FormItem>
            <Button type="primary" @click="handleSearch('searchData')">搜索</Button>
            <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
        </FormItem>
    </Form>
    <Table border :columns="columns7" :data="templateListData"></Table>
    <Page :total="total"  @on-change="pageChange" show-total show-sizer></Page>
            </Card>

        </Col>
    </Row>
    <!-- <Page :total="total"  @on-change="pageChange" style="margin-top:10px; text-align:right"></Page> -->
</template>

<script>
    import api from '../../api/advertisement/formtemplateApi.js';
    import adapi from '../../api/advertisement/ad.js';
    export default {
        data () {
            return {
                weizhiList:[],
                zhandianList: [],
                pingdaoList: [],
                searchData: {
                    pageNum: 1
                },
                form: {
                    id: ''
                },
                columns7: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: '模板类型',
                        key: 'name'
                    },
                    {
                        title: '位置名称',
                        key: 'positionName'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
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
                                            if (params.row.isNew === 1) {
                                                this.$router.push({
                                                    name: 'formtemplate',
                                                    query: {advertId: params.row.id}
                                                });
                                            }
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteConfirm(params.row.id);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                total: 0,
                templateListData: []
            };
        },
        methods: {
            handleSearch () {
                this.searchData.page = 1;
                this.init();
            },
            handleCancel (name) {
                this.weizhiList = [];
                this.pingdaoList = [];
                this.$refs[name].resetFields();
                this.searchData.page = 1;
                this.init();
            },
            pdClick() {
                //console.log(this.searchData);
                if (typeof this.searchData.pageId !== 'undefined') {
                    api.getPositionInfo({pageId: this.searchData.pageId}).then(response => {
                        this.weizhiList = response.data.data;
                    });
                }
            },
            zdClick() {
                if (typeof this.searchData.station !== 'undefined') {
                    api.getChannelInfo({station: this.searchData.station}).then(response => {
                        this.pingdaoList = response.data.data;
                    });
                }
            },
            init() {
                adapi.getAllStation({isDel: 0}).then(response => {
                    this.zhandianList = response.data.data;
                });
                this.templateList();
            },
            pageChange(page) {
                this.searchData.pageNum = page;
                this.templateList();
            },
            deleteTemplate(id) {
                this.form.id = id;
                api.deleteTemplate(this.form).then(response => {
                    this.$Message.success('删除成功');
                    this.templateList();
                });
            },
            templateList() {
                api.templateList(this.searchData).then(response => {
                    this.templateListData = response.data.data;
                    this.total = response.data.count;
                });
            },
            deleteConfirm (id) {
                this.$Modal.confirm({
                    title: '',
                    content: '<p>是否确定删除</p>',
                    onOk: () => {
                        this.deleteTemplate(id);
                    },
                    onCancel: () => {
                    }
                });
            }
        },
        created: function () {
            this.init();
        }
    };
</script>

<style>
.optionsHeight textarea.ivu-input {
        height: 200px;
}
</style>
