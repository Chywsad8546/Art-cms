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

                        </FormItem>

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
                            <Button type="primary" @click="isTrueAddTag = true">添加创意</Button>
                        </FormItem>
                    </Form>

                    <Table border :columns="columns" :data="data"></Table>
                    <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" style="margin-top:10px; text-align:right"></Page>
                </Row>
            </Card>
        </Col>

        <Modal v-model="isTrueAddTag" width="1000" title="选择编辑器" >
            <Form  ref="addNewsChannelModalform" :model="addIdeaNewsModal" inline :label-width="120">
                <FormItem label="应用">
                    <Select v-model="zdmode.station" style="width:100px" @on-change = "adzdClick">
                        <Option v-for="item in zhandianList" :value="item.station" :key="item.station">{{ item.stationName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="栏目">
                    <Select v-model="pdmode.pageId" style="width:100px"  @on-change = "adpdClick">
                        <Option v-for="item in adpingdaoList" :value="item.pageId" :key="item.pageId">{{ item.pageName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="广告位" prop="bjq">
                    <Select v-model="addIdeaNewsModal.positionId" style="width:100px" @on-change = "getBjqList">
                        <Option v-for="item in adweizhiList" :value="item.positionId" :key="item.positionId">{{ item.positionName }}</Option>
                    </Select>
                </FormItem>
            </Form>
            <Table border :columns="bjqColumns" :data="bjqList" :loading="bjqloading"  ></Table>
            <span slot="footer"></span>
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

        <Modal v-model="showPostion" title="选择日期" scrollable width="850" @on-visible-change="visiblechange" >
            <Form  ref="searchData"  inline :label-width="120">

                <FormItem label="创意:" >
                    {{selectAdName}}
                </FormItem>

                <FormItem label="排期日期" >
                    <DatePicker type="daterange" :options="dpoptions" @on-change="dpchange"  v-model="selectdate" format="yyyy-MM-dd" :clearable="false" placeholder=""></DatePicker>
                </FormItem>
                <FormItem label="付费状态" >
                    <Select v-model="ispay" :key="'ispayslect'" style="width:290px">
                        <Option :value="1" :key="'ispay1'">付费</Option>
                        <Option :value="0" :key="'ispay0'">免费</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button v-show="!searchLoading" type="primary" @click="paiqi">确定</Button>
                </FormItem>
            </Form>
            <Alert v-if="existwarning" type="warning" show-icon>选择的日期范围内，有已经存在的广告</Alert>
            <Table border :columns="daycolumns" :data="postionData" :loading="searchLoading" ></Table>
            <span slot="footer"></span>
        </Modal>
    </Row>
</template>
<script>
    import ideaApi from '../../api/advertisement/ideaList.js';
    import dutil from '../../libs/util.js';
    import moment from 'moment';
    import fapi from '../../api/advertisement/formtemplateApi.js';
    import tdpopreadonly from './tdpopreadonly.vue';
    import Vue from 'vue';
    Vue.component('tdpopreadonly', tdpopreadonly);
    export default {
        components: {
            tdpopreadonly,
        },
        data() {
            return {
                bjqloading:false,
                existwarning:false,
                searchLoading: false,
                dpoptions: {
                    disabledDate (date) {
                        return moment(date).isBefore(moment(0, "HH")) || moment(date).isAfter(moment(0, "HH").add(1,'M'));
                    }
                },
                ispay:1,
                selectPostionId: '',
                selectPositionName: '',
                selectAdName:'',
                selectideacode:'',
                selectdate: [moment(0, "HH").toDate(), moment(0, "HH").add(1, 'd').toDate()],
                showPostion: false,
                bjqColumns:[
                    {
                        key: 'name',
                        title: '编辑器'
                    },
                    {
                        title: '选择',
                        key: 'action',
                        width: 170,
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
                                                    query: {templateid: params.row.id, planId: this.$route.query.planid}
                                                });
                                            }
                                        }
                                    },
                                    '选我'
                                )
                            ]);
                        }
                    }

                ],
                daycolumns: [{
                    key: 'selectPositionName',
                    title: '广告位当前排期情况',
                    width: 100,
                    fixed: 'left'
                }],
                postionData: [],
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
                                optionArray.push('已排期');
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
                        width: 170,
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
                                    '修改创意'
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
                                                this.showPostion = true;
                                                this.selectPostionId = params.row.positionId;
                                                this.selectPositionName = params.row.positionName;
                                                this.selectAdName = params.row.adName;
                                                this.selectideacode = params.row.ideaCode;
                                                this.getPostionPaiqi();
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
            paiqi() {
                let startTime = moment(this.selectdate[0]).format('YYYY-MM-DD');
                let endTime = moment(this.selectdate[1]).format('YYYY-MM-DD');
                var that = this;
                fapi.addSchedules({positionId: this.selectPostionId, ideaCode: this.selectideacode, isPay: this.ispay, startTime: startTime, endTime: endTime}).then(response => {
                    if (response.data.data.isRepeat == true) {
                        let reAdSchedulesNow = JSON.stringify(response.data.data.adSchedules);
                        fapi.forceCover({positionId: this.selectPostionId,
                            ideaCode: this.selectideacode,
                            isPay: this.ispay,
                            startTime: startTime,
                            endTime: endTime,
                            reAdSchedulesNow: reAdSchedulesNow
                        }).then(response => {
                            that.showPostion = false;
                            that.$Message.success('排期成功');
                        });
                    } else {
                        that.showPostion = false;
                        this.$Message.success('排期成功');
                        // this.schedulesList();
                    }
                });
            },
            getPostionPaiqi() {
                this.existwarning=false;
                this.searchLoading = true;
                var that = this;
                let columnStart = moment(this.selectdate[0]);
                let columnEnd = moment(this.selectdate[1]);
                let data = {cellClassName: {},selectPositionName:this.selectPositionName};
                that.daycolumns.splice(1,that.daycolumns.length-1);
                for (; columnStart.isBefore(columnEnd); columnStart=columnStart.add(1,'d')) {

                    let daykey = columnStart.format('M-D');
                    that.daycolumns.push({
                        title:columnStart.format('M-D'),
                        key: columnStart.format('M-D'),
                        'width': 100,
                        render: (h, params) => {
                            return h('tdpopreadonly', {props: params.row[daykey]});//
                        }
                    });
                }

                fapi.getPaiqiList({
                    positionIds: this.selectPostionId,
                    startTime: moment(this.selectdate[0]).format('YYYY-MM-DD'),
                    endTime: moment(this.selectdate[1]).format('YYYY-MM-DD')
                })
                    .then(function (res) {

                        for (let index = 0; index < res.data.data.length; index++) {
                            that.existwarning=true;
                            let paiqirow = res.data.data[index];
                            let paiqistart = moment(paiqirow['startime'], 'YYYY-MM-DD');
                            let paiqiend = moment(paiqirow['endtime'], 'YYYY-MM-DD');
                            for (; paiqistart.isBefore(paiqiend); paiqistart = paiqistart.add(1, 'd')) {
                                let newpaiqirow = _.cloneDeep(paiqirow);
                                data[paiqistart.format('M-D')] = newpaiqirow;

                                data.cellClassName[paiqistart.format('M-D')] = 'cell-hold';
                            }
                        }
                        let buchongend= moment(that.selectdate[1]);
                        for (let buchongstart = moment(that.selectdate[0]); buchongstart.isBefore(buchongend); buchongstart = buchongstart.add(1, 'd')) {
                            let daykey = buchongstart.format('M-D');
                            let day = buchongstart.format('YYYY-MM-DD');
                            if (!data[daykey]) {
                                data[daykey] = {};
                            }
                            data[daykey]['day'] = day;
                            // item[daykey]['xuanzhong'] = false;
                            data[daykey]['positionId'] = that.selectPostionId;
                        }
                        that.postionData = [data];
                        that.searchLoading = false;
                        // console.log(data)
                    });
            },
            dpchange(v) {
                this.getPostionPaiqi();
            },
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
                this.bjqloading=true;
                fapi.templateList(this.addIdeaNewsModal).then(response => {
                    this.bjqList = response.data.data;
                    this.bjqloading=false;
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
                if (typeof this.searchData.pageName !== 'undefined') {
                    fapi.getPositionInfo(this.searchData).then(response => {
                        this.weizhiList = response.data.data;
                    });
                }
            },
            zdClick() {
                if (typeof this.searchData.station !== 'undefined') {
                    fapi.getChannelInfo({station: this.searchData.station}).then(response => {
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
            visiblechange(v){
                if(!v){
                    this.init();
                }
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
            }
        },
        created() {
            this.init();
            this.getStationInfo();
        }
    };
</script>
<style>
    .backcontiner {
        width: 100%;
        padding-top: 20px;
        background: #ffffff;

        margin-bottom: 10px;
    }
    .ivu-table .cell-hold {
        background-color: #187;
        color: #fff;
    }
</style>

