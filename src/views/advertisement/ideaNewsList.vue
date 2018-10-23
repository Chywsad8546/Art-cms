<template>
    <Row>
        <Col span="100">
            <Card>
                <p slot="title">推送列表管理</p>
                <Row class="margin-top-10 searchable-table-con1">
                    <Form  ref="searchData" :model="searchData" inline :label-width="120">
               <!--         <FormItem label="消息标题" prop="title">
                            <Input v-model.trim="searchData.title" style="width:140px"></Input>
                        </FormItem>
-->

                        <FormItem label="选择站点" prop="station">
                            <Select v-model="searchData.station" style="width:100px" @on-change = "zdClick">
                                <Option v-for="item in zhandianList" :value="item.station" :key="item.station">{{ item.stationName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="选择栏目" prop="pageName">
                            <Select v-model="searchData.pageName" style="width:100px"  @on-change = "pdClick">
                                <Option v-for="item in pingdaoList" :value="item.pageName" :key="item.pageName">{{ item.pageName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="选择位置" prop="positionId">
                            <Select v-model="searchData.positionId" style="width:100px">
                                <Option v-for="item in weizhiList" :value="item.positionId" :key="item.positionId">{{ item.positionName }}</Option>
                            </Select>
                        </FormItem>


                        <FormItem label="开始时间"  prop="startTime">
                            <DatePicker type="date" format="yyyy-MM-dd" v-model="searchData.startTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
                        </FormItem>
                        <FormItem label="结束时间"  prop="endTime">
                            <DatePicker type="date" format="yyyy-MM-dd" v-model="searchData.endTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
                        </FormItem>

                        <!--            <FormItem label="名片认证状态" prop="businessCardAuth">
                                        <Select v-model="searchData.businessCardAuth" style="width:140px">
                                            <Option value="">全部</Option>
                                            <Option value="0">未认证</Option>
                                            <Option value="1">认证中</Option>
                                            <Option value="2">认证通过</Option>
                                            <Option value="3">认证不通过</Option>
                                        </Select>
                                    </FormItem>-->
                        <FormItem label="排期状态" prop="PaiqiZhuangtai">
                            <Select v-model="searchData.PaiqiZhuangtai" style="width:140px">
                                <Option value="0">未排期</Option>
                                <Option value="1">已排期</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="展示状态" prop="ZhanshiZhuangtai">
                            <Select v-model="searchData.ZhanshiZhuangtai" style="width:140px">
                                <Option value="">全部</Option>
                                <Option value="1">展示</Option>
                                <Option value="2">缺省/已展示</Option>
                                <Option value="3">缺省/未展示</Option>
                                <Option value="4">未调用</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSearch('searchData')">搜索</Button>
                            <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
                        </FormItem>

                        <FormItem>
                            <Button type="primary" @click="isTrueAddTag = true">添加</Button>
                        </FormItem>
                    </Form>

                    <Table border :columns="columns" :data="data"></Table>
                    <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" style="margin-top:10px; text-align:right"></Page>
                </Row>
            </Card>
        </Col>

        <Modal v-model="isTrueAddTag" width="360" @on-ok="addIdeaNews">
            <Form  ref="addNewsChannelModalform" :model="addIdeaNewsModal" inline :label-width="120">
                <Select v-model="zdmode.station" style="width:100px" @on-change = "adzdClick">
                    <Option v-for="item in zhandianList" :value="item.station" :key="item.station">{{ item.stationName }}</Option>
                </Select>
                <Select v-model="pdmode.pageName" style="width:100px"  @on-change = "adpdClick">
                    <Option v-for="item in adpingdaoList" :value="item.pageName" :key="item.pageName">{{ item.pageName }}</Option>
                </Select>
                <Select v-model="addIdeaNewsModal.positionId" style="width:100px">
                    <Option v-for="item in adweizhiList" :value="item.positionId" :key="item.positionId">{{ item.positionName }}</Option>
                </Select>
                           <FormItem label="编辑器" prop="bjq">
                                <Select v-model="addIdeaNewsModal.bjq" style="width:140px">
                                    <Option value="35">复杂编辑器</Option>
                                    <Option value="35">简单编辑器1</Option>
                                    <Option value="35">简单编辑器2</Option>
                                </Select>
                            </FormItem>
            </Form>
        </Modal>
    </Row>
</template>
<script>
    import api from '../../api/advertisement/pushApi.js';
    import ideaApi from '../../api/advertisement/ideaList.js';
    import dutil from '../../libs/util.js';
    import fapi from '../../api/advertisement/formtemplateApi.js';
    import apiDictionary from '../../api/dictionary/channelDictionary.js';
    export default {
        data() {
            return {
                addIdeaNewsModal: {},
                isTrueAddTag: false,
                pdmode: {pageName: ''},
                zdmode: {station: ''},
                zhandianList: [],
                pingdaoList: [],
                adpingdaoList: [],
                weizhiList: [],
                adweizhiList: [],
                columns: [
                    {
                        key: 'ideaCode',
                        title: 'ideaCode',
                        width: 100
                    },
                    {
                        key: 'pageName',
                        title: '频道'
                    },
                    {
                        key: 'adName',
                        title: '创意名称'
                    },
                    {
                        key: 'modifyAt',
                        title: '最后更新'
                    },
                    {
                        title: '展示状态',
                        key: 'zhanshiZhuangtai',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.zhanshiZhuangtai === 1) {
                                return h('div', ['展示']);
                            } else if (params.row.zhanshiZhuangtai === 2) {
                                return h('div', ['缺省/已展示']);
                            } else if (params.row.zhanshiZhuangtai === 3) {
                                return h('div', ['缺省/未展示']);
                            } else if (params.row.zhanshiZhuangtai === 4) {
                                return h('div', ['未调用']);
                            }
                        }
                    },
                    {
                        title: '排期状态',
                        key: 'pushType',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.paiqiZhuangtai == 0) {
                                return h('div', ['未排期']);
                            } else if (params.row.paiqiZhuangtai == 1) {
                                return h('div', ['已排期']);
                            }
                        }
                    },
                    {
                        title: '广告商',
                        key: 'adCompany'
                    },
                    {
                        title: '管理',
                        key: 'action',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            var i = this;
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
                                                this.$router.push({
                                                    name: 'ad_addetail',
                                                    query: {id: params.row.ideaCode}
                                                });
                                            }
                                        }
                                    },
                                    '修改'
                                )
                            ]);
                        }
                    }
                ],
                searchData: {
                    page: 1,
                    limit: 10,
                    station: '',
                    pageName: ''
                },
                data: [],
                total: 0
            };
        },
        methods: {
            init() {
                ideaApi.ideaList(this.searchData).then(response => {
                    this.total = response.data.count;
                    this.data = response.data.data;
                });
            },
            handleSearch () {
                console.log(this.pdmode, this.zdmode);
                this.searchData.page = 1;
                if (typeof this.searchData.startTime !== 'string') {
                    this.searchData.startTime = dutil.dateformat(this.searchData.startTime, 'yyyy-MM-dd');
                }
                if (typeof this.searchData.endTime !== 'string') {
                    this.searchData.endTime = dutil.dateformat(this.searchData.endTime, 'yyyy-MM-dd');
                }
                this.init();
            },
            handleCancel (name) {
                this.$refs[name].resetFields();
                this.searchData.page = 1;
                this.init();
            },
            pdClick() {
                fapi.getPositionInfo(this.searchData).then(response => {
                    this.weizhiList = response.data.data;
                });
            },
            zdClick() {
                fapi.getChannelInfo(this.searchData).then(response => {
                    this.pingdaoList = response.data.data;
                });
            },
            adpdClick() {
                fapi.getPositionInfo(this.pdmode).then(response => {
                    this.adweizhiList = response.data.data;
                });
            },
            adzdClick() {
                fapi.getChannelInfo(this.zdmode).then(response => {
                    this.adpingdaoList = response.data.data;
                });
            },
            pageChange (page) {
                this.searchData.page = page;
                this.init();
            },
            sizeChange (size) {
                this.searchData.limit = size;
                this.init();
            },
            getStationInfo() {
                fapi.getStationInfo().then(response => {
                    this.zhandianList = response.data.data;
                });
            },
            addIdeaNews: function () {
                this.$router.push({
                    name: 'ad_addetail',
                    query: {templateid: this.addIdeaNewsModal.bjq}
                });
            }
        },
        created() {
            this.init();
            this.getStationInfo();
        }
    };
</script>

