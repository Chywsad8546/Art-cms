<template>
    <Row>
        <Col span="100">
            <Card>
                <p slot="title">计划详情</p>
                <Card>
                    <Form inline :label-width="120">
                        <FormItem><p style="font-size: 18px">计划名称: {{plandetail.planName}}</p></FormItem>
                        <FormItem><p style="font-size: 14px">创意数量：{{plandetail.ideaCount}}</p></FormItem>
                        <FormItem><p style="font-size: 14px">展示数量：{{plandetail.zhanShiCount}}</p></FormItem>
                        <FormItem><p style="font-size: 14px">排期数量：{{plandetail.paiQiCount}}</p></FormItem>
                    </Form>
                </Card>

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


                        <FormItem label="选择时间"  prop="timeRange">
                            <DatePicker type="daterange" v-model="searchData.timeRange" split-panels placeholder="Select date" style="width: 200px"></DatePicker>
                          <!--  <DatePicker type="date" format="yyyy-MM-dd" v-model="searchData.startTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
                        </FormItem>
                        <FormItem label="结束时间"  prop="endTime">
                            <DatePicker type="date" format="yyyy-MM-dd" v-model="searchData.endTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>-->
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
                                <Option value="0">未展示</Option>
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

        <Modal v-model="isTrueAddTag" width="1000" @on-ok="addIdeaNews">
            <Form  ref="addNewsChannelModalform" :model="addIdeaNewsModal" inline :label-width="120">
                <FormItem label="站点">
                    <Select v-model="zdmode.station" style="width:100px" @on-change = "adzdClick">
                        <Option v-for="item in zhandianList" :value="item.station" :key="item.station">{{ item.stationName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="页面">
                    <Select v-model="pdmode.pageId" style="width:100px"  @on-change = "adpdClick">
                        <Option v-for="item in adpingdaoList" :value="item.pageId" :key="item.pageId">{{ item.pageName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="位置" prop="bjq">
                    <Select v-model="addIdeaNewsModal.positionId" style="width:100px" @on-change = "getBjqList">
                        <Option v-for="item in adweizhiList" :value="item.positionId" :key="item.positionId">{{ item.positionName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="编辑器" prop="bjq">
                    <Select v-model="addIdeaNewsModal.bjq" style="width:140px">
                        <Option v-for="item in bjqList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>

        <Modal v-model="paiqiListModal" width="1000">
            <Card >
                <p slot="title">
                    <Icon type="navicon-round"></Icon>
                    当前创意排期列表
                </p>
                <Table border :columns="paiqiListColums" :data="paiqiListData"></Table>
            </Card>
            <!--<Button type="primary" icon="plus" @click="addModal">添加编辑器</Button>-->

        </Modal>

        <Modal v-model="showPlan" title="选择日期" scrollable width="850" >
            <planselector :positionId="selectPostionId" :date="selectDate" :existData="blankPageListDataDictus" :showseed="showseed"></planselector>
            <span slot="footer"></span>
        </Modal>
    </Row>
</template>
<script>
    import ideaApi from '../../api/advertisement/ideaList.js';
    import dutil from '../../libs/util.js';
    import fapi from '../../api/advertisement/formtemplateApi.js';

    export default {
        data() {
            return {
                paiqiListData: [],
                paiqiListColums: [
                    {
                        key: 'adName',
                        title: '名称'
                    },
                    {
                        key: 'startime',
                        title: '开始时间'
                    },
                    {
                        key: 'endtime',
                        title: '结束时间'
                    }
                ],
                paiqiListModal: false,
                bjqList: [],
                addIdeaNewsModal: {bjq: ''},
                isTrueAddTag: false,
                pdmode: {pageName: ''},
                zdmode: {stationId: ''},
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
                        key: 'stationName',
                        title: '应用',
                        fixed: 'left'
                    },
                    {
                        key: 'pageName',
                        title: '频道',
                        fixed: 'left'
                    },
                    {
                        key: 'positionName',
                        title: '位置',
                        fixed: 'left'
                    },
                    {
                        key: 'adName',
                        title: '创意名称'
                    },
                    {
                        title: '展示状态',
                        key: 'zhanshiZhuangtai',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.zhanshiZhuangtai === 1) {
                                return h('div', ['展示']);
                            } else if (params.row.zhanshiZhuangtai === 0) {
                                return h('div', ['未展示']);
                            }
                        }
                    },
                    {
                        title: '排期状态',
                        key: 'pushType',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            var optionArray = [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'information',
                                            shape: 'circle'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.paiqiListModal = true;
                                                fapi.getIdeaTimeList({ideaCode: params.row.ideaCode}).then(response => {
                                                    this.paiqiListData = response.data.data;
                                                });
                                            }
                                        }
                                    }
                                )
                            ];
                            if (params.row.paiqiZhuangtai === 0) {
                                optionArray.push('未排期');
                                return h('div', optionArray);
                            } else if (params.row.paiqiZhuangtai === 1) {
                                optionArray.push('已排期')
                                return h('div', optionArray);
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
                                                    name: 'ad_redirect',
                                                    query: {id: params.row.ideaCode}
                                                });
                                            }
                                        }
                                    },
                                    '修改'
                                ),
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
                                                    name: 'ad_redirect',
                                                    query: {id: params.row.ideaCode}
                                                });
                                            }
                                        }
                                    },
                                    '排期'
                                )
                            ]);
                        }
                    }
                ],
                searchData: {
                    page: 1,
                    limit: 10,
                    stationId: '',
                    pageName: '',
                    planId: '',
                    startTime: '',
                    endTime: '',
                    timeRange: ['', '']
                },
                data: [],
                total: 0,
                plandetail: {
                    planid: this.$route.query.planid,
                    ideaCount: this.$route.query.ideaCount,
                    paiQiCount: this.$route.query.paiQiCount,
                    zhanShiCount: this.$route.query.zhanShiCount,
                    planName: ''
                }
            };
        },
        methods: {
            init() {
                this.searchData.planId = this.plandetail.planid;
                fapi.planDetails({id: this.plandetail.planid}).then(response => {
                    this.plandetail.id = response.data.data.id;
                    this.plandetail.planName = response.data.data.planName;
                });
                ideaApi.ideaList(this.searchData).then(response => {
                    this.total = response.data.count;
                    this.data = response.data.data;
                });
            },
            getBjqList() {
                fapi.templateList(this.addIdeaNewsModal).then(response => {
                    this.bjqList = response.data.data;
                });
            },
            handleSearch () {
                this.searchData.page = 1;
                this.searchData.startTime = this.searchData.timeRange[0];
                this.searchData.endTime = this.searchData.timeRange[1];
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
                this.searchData.startTime = this.searchData.timeRange[0];
                this.searchData.endTime = this.searchData.timeRange[1];
                this.searchData.page = 1;
                this.init();
            },
            pdClick() {
               // console.log(this.searchData);
                if (typeof this.searchData.pageName !== 'undefined') {
                    fapi.getPositionInfo(this.searchData).then(response => {
                        this.weizhiList = response.data.data;
                    });
                }
            },
            zdClick() {
                //console.log(this.searchData);
                if (typeof this.searchData.station !== 'undefined') {
                    fapi.getChannelInfo({station:this.searchData.station}).then(response => {
                        this.pingdaoList = response.data.data;
                    });
                }
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
                if (this.addIdeaNewsModal.bjq !== '') {
                    this.$router.push({
                        name: 'ad_redirect',
                        query: {templateid: this.addIdeaNewsModal.bjq, planId: this.plandetail.planid}
                    });
                } else {
                    this.$Message.error('请选择编辑器！');
                }
            }
        },
        created() {
            this.init();
            this.getStationInfo();
        }
    };
</script>

