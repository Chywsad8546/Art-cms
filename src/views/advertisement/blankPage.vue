<template>
<div>

        <div class="backcontiner">
           <Row>


                <Col span="24">
               <Form ref="formAdd" :model="formItem" :rules="seniorValidate" :label-width="80" inline>
                    <FormItem label="应用">
                        <Select v-model="formItem.station" style="width:100px"clearable  @on-change = "zdClick">
                            <Option v-for="item in zhandianList" :value="item.station" :key="item.station">{{ item.stationName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="广告频道">
                        <Select v-model="formItem.pageId" style="width:100px" clearable   @on-change = "pdClick">
                            <Option v-for="item in pingdaoList" :value="item.pageId" :key="item.pageId">{{ item.pageName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="广告位置">
                        <Select v-model="formItem.positionId" clearable style="width:100px">
                            <Option v-for="item in weizhiList" :value="item.positionId" :key="item.positionId">{{ item.positionName }}</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="付费状态">
                        <Select v-model="formItem.isPay" style="width:100px">
                                <Option value="1">付费</Option>
                                <Option value="0">免费</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="时间" prop="dateTime">
                        <DatePicker type="month" v-model="dateTime" format="yyyy-MM" :clearable="false" placeholder="上架时间"></DatePicker>
                     </FormItem>

                    <FormItem>
                        <Button type="primary" @click="queryBlank">查询</Button>
                        <Button type="primary" style="margin-left: 8px">下载排期</Button>
                    </FormItem>

                </Form>
               </Col>
            </Row>
            </div>

    <Table border :columns="columblankPage" :data="blankPageListData" :loading="searchLoading"></Table>
    <Page :total="total"  show-total show-sizer  @on-change="pageChange" style="margin-top:10px;"></Page>

    <Modal v-model="showPlan" title="选择创意" scrollable width="850" @on-visible-change="visiblechange">
        <planselector :positionId="selectPostionId" :date="selectDate" :existData="blankPageListDataDictus" :showseed="showseed"></planselector>
        <span slot="footer"></span>
    </Modal>
</div>
</template>
<script>
    import api from '../../api/advertisement/formtemplateApi.js';
    import dutil from '../../libs/util.js';
    import moment from 'moment';
    import tdpop from './tdpop.vue';
    import planselector from './PlanSelector.vue';
    import _ from 'lodash';
    import Vue from 'vue';
    Vue.component('tdpop', tdpop);
    export default {
        components: {
            tdpop,
            planselector
        },
        data() {
            return {
                showseed: '',
                showPlan: false,
                formItem: {
                    station: '',
                    pageId: '',
                    positionId: ''
                },
                seniorValidate: {
                    dateTime: [
                        { required: true, message: '请选择时间范围', trigger: 'change' }
                    ]

                },
                columblankPage: [
                    {
                        title: '应用',
                        key: 'stationName',
                        'width': 100,
                        fixed: 'left'
                    },
                    {
                        title: '频道',
                        key: 'pageName',
                        'width': 150,
                        fixed: 'left'
                    },
                    {
                        title: '位置',
                        key: 'positionName',
                        'width': 150,
                        fixed: 'left'
                    }
                ],
                blankPageListData: [],
                total: 0,
                searchLoading: false,
                tempList: {},
                zhandianList: [],
                weizhiList: [],
                pingdaoList: [],
                dateTime: moment(0, "HH").date(1).toDate(),
                startTime: '',
                endTime: '',
                blankPageListDataDictus: {},
                selectPostionId: '',
                selectDate: moment(0, "HH").toDate()

            };
        },
        methods: {
            visiblechange(v){
                if(!v){
                    this.search();
                }
            },
            init() {
                this.queryBlank(true);
                this.getStationInfo();
            },
            pdClick() {
                api.getPositionInfo(this.formItem).then(response => {
                    this.weizhiList = response.data.data;
                });
            },
            zdClick() {
                api.getChannelInfo(this.formItem).then(response => {
                    this.pingdaoList = response.data.data;
                });
            },
            getStationInfo() {
                api.getStationInfo().then(response => {
                    this.zhandianList = response.data.data;
                    this.zhandianList.forEach(item => {
                        item.station = item.station + '';
                    });
                });
            },
            pageChange(page) {
                this.formItem.pageNum = page;
                this.queryBlank();
            },
            joinIds(data) {
                var ids = [];
                for (var i = 0; i < data.length; i++) {
                    ids.push(data[i].positionId);
                }
                return ids.join(',');
            },
            cellclick(ideaCode, adName, positionId, day, isSelect) {
                this.showseed = moment().valueOf();
                this.selectPostionId = positionId;
                this.selectDate = moment(day, 'YYYY-MM-DD').toDate();
                this.showPlan = true;
            },
            search() {
                this.searchLoading = true;
                let days = moment(this.dateTime).daysInMonth();
                let month = moment(this.dateTime).format('M');
                this.columblankPage.splice(3, this.columblankPage.length - 3);

                this.startTime = moment(this.dateTime).format('YYYY-MM-DD');
                this.endTime = moment(this.dateTime).add(1, 'M').format('YYYY-MM-DD');
                var that = this;
                api.adListAll(this.formItem).then(response => {
                    that.blankPageListData.splice(0,that.blankPageListData.length);
                    response.data.data.forEach(function (ite) {
                        that.blankPageListData.push(ite);
                    })

                    that.blankPageListDataDictus = {};
                    that.blankPageListData.forEach(function (row) {
                        that.blankPageListDataDictus[row['positionId']] = row;
                    });
                    that.total = response.data.count;

                    api.getPaiqiList({
                        positionIds: that.joinIds(that.blankPageListData),
                        startTime: that.startTime,
                        endTime: that.endTime
                    })
                        .then(function (res) {
                            for (let index = 0; index < res.data.data.length; index++) {
                                let paiqirow = res.data.data[index];
                                let paiqistart = moment(paiqirow['startime'], 'YYYY-MM-DD');
                                let paiqiend = moment(paiqirow['endtime'], 'YYYY-MM-DD');
                                for (; paiqistart.isBefore(paiqiend); paiqistart = paiqistart.add(1, 'd')) {
                                    let newpaiqirow = _.cloneDeep(paiqirow);
                                    that.blankPageListDataDictus[paiqirow['positionId']][month + '-' + paiqistart.format('D')] = newpaiqirow;
                                    if (!that.blankPageListDataDictus[paiqirow['positionId']].cellClassName) {
                                        that.blankPageListDataDictus[paiqirow['positionId']].cellClassName = {};
                                    }
                                    that.blankPageListDataDictus[paiqirow['positionId']].cellClassName[month + '-' + paiqistart.format('D')] = 'cell-hold';
                                }
                            }
                            for (let i = 0; i < that.blankPageListData.length; i++) {
                                let item = that.blankPageListData[i];

                                let buchongend = moment(that.endTime, 'YYYY-MM-DD');
                                for (let buchongstart = moment(that.startTime, 'YYYY-MM-DD'); buchongstart.isBefore(buchongend); buchongstart = buchongstart.add(1, 'd')) {
                                    let daykey = buchongstart.format('M-D');
                                    let day = buchongstart.format('YYYY-MM-DD');
                                    // paiqirow["day"]=paiqistart.format('YYYY-MM-DD');
                                    if (!item[daykey]) {
                                        item[daykey] = {};
                                    }
                                    item[daykey]['day'] = day;
                                    // item[daykey]['xuanzhong'] = false;
                                    item[daykey]['positionId'] = item.positionId;
                                }
                            }

                            for (let i = 1; i <= days; i++) {
                                that.columblankPage.push({
                                    title: month + '-' + i,
                                    key: month + '-' + i,
                                    'width': 100,
                                    render: (h, params) => {
                                        return h('tdpop', {props:params.row[month + '-' + i] ,
                                        on: {changepaiqi: that.cellclick}});//
                                    }
                                });
                            }
                            that.searchLoading = false;
                        });
                });
            },
            queryBlank(flag) {
                if (flag) {
                    this.search();
                } else {
                    this.$refs['formAdd'].validate((valid) => {
                        if (valid) {
                            this.search();
                        }
                    });
                }
            },
            exportExl() {
                api.exportExl(this.formItem).then(response => {
                    this.templateListData = response.data.data;
                    this.total = response.data.count;
                });
            }
        },
        created() {
            this.init();
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

