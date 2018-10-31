<template>
<div>

        <div class="backcontiner">
           <Row>


                <Col span="24">
               <Form ref="formItem" :model="formItem" :rules="seniorValidate" :label-width="80" inline>
                    <FormItem label="应用" prop="station">
                        <Select v-model="formItem.station" style="width:100px"  @on-change = "zdClick">
                            <Option v-for="item in zhandianList" :value="item.station" :key="item.station">{{ item.stationName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="广告频道" prop="pageId">
                        <Select v-model="formItem.pageId" style="width:100px"   @on-change = "pdClick">
                            <Option v-for="item in pingdaoList" :value="item.pageId" :key="item.pageId">{{ item.pageName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="广告位置" prop="positionId">
                        <Select v-model="formItem.positionId" style="width:100px">
                            <Option v-for="item in weizhiList" :value="item.positionId" :key="item.positionId">{{ item.positionName }}</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="付费状态" prop="isPay">
                        <Select v-model="formItem.isPay" style="width:100px">
                                <Option value="1">付费</Option>
                                <Option value="0">免费</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="是否删除" prop="isDel">
                        <Select v-model="formItem.isDel" style="width:100px">
                                <Option value="1">是</Option>
                                <Option value="0">否</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="时间" prop="dateTime">
                        <DatePicker type="month" v-model="dateTime" format="yyyy-MM" :clearable="false" placeholder="上架时间"></DatePicker>
                     </FormItem>

                    <FormItem>
                        <Button type="primary" @click="queryBlank">查询</Button>
                        <Button type="primary" style="margin-left: 8px">下载排期</Button>
                        <Button type="ghost" @click="handleCancel('formItem')" style="margin-left: 8px">清空</Button>
                    </FormItem>

                </Form>
               </Col>
            </Row>
            </div>

    <Table border :columns="columblankPage" :data="blankPageListData" :loading="searchLoading"></Table>
    <Page :total="total"  show-total  @on-change="pageChange" style="margin-top:10px;"></Page>

    <Modal v-model="showPlan" title="选择创意" scrollable width="850" @on-visible-change="visiblechange">
        <planselector :positionId="selectPostionId" :date="selectDate"  :showseed="showseed" @closeme="showPlan=false"></planselector>
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
                    positionId: '',
                    isPay: ''
                },
                seniorValidate: {

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
                dateTime: moment().date(1).toDate(),
                startTime: '',
                endTime: '',
                blankPageListDataDictus: {},
                selectPostionId: '',
                selectDate: moment(0, 'HH').toDate()

            };
        },
        methods: {
            handleCancel(name) {
                this.$refs[name].resetFields();
                this.weizhiList = [];
                this.pingdaoList = [];
                this.init();
            },
            visiblechange(v) {
                if (!v) {
                    this.search();
                }
            },
            init() {
                this.queryBlank(true);
                this.getStationInfo();
            },
            pdClick() {
                if (typeof this.formItem.pageId !== 'undefined') {
                    api.getPositionInfo({pageId: this.formItem.pageId, pageSize: 1000}).then(response => {
                        this.weizhiList = response.data.data;
                        this.formItem.positionId = '';
                    });
                }
            },
            zdClick() {
                if (typeof this.formItem.station !== 'undefined') {
                    api.getChannelInfo({station: this.formItem.station, pageSize: 1000}).then(response => {
                        this.pingdaoList = response.data.data;
                        this.formItem.pageId = '';
                        this.formItem.positionId = '';
                        this.weizhiList = [];
                    });
                }
            },
            getStationInfo() {
                api.getStationInfo({pageSize: 1000}).then(response => {
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
                if(isSelect) {
                    this.showPlan = true;
                }
                else {
                    this.visiblechange(false);
                }
            },
            search() {
                this.searchLoading = true;
                this.columblankPage.splice(3, this.columblankPage.length - 3);

                this.startTime = moment(this.dateTime).format('YYYY-MM-DD');
                this.endTime = moment(this.dateTime).add(1,'M').format('YYYY-MM-DD');
                var that = this;
                api.adListAll(this.formItem).then(response => {
                    that.blankPageListData.splice(0, that.blankPageListData.length);
                    response.data.data.forEach(function (ite) {
                        that.blankPageListData.push(ite);
                    });

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
                                    that.blankPageListDataDictus[paiqirow['positionId']][paiqistart.format('M-D')] = newpaiqirow;
                                    if (!that.blankPageListDataDictus[paiqirow['positionId']].cellClassName) {
                                        that.blankPageListDataDictus[paiqirow['positionId']].cellClassName = {};
                                    }
                                    that.blankPageListDataDictus[paiqirow['positionId']].cellClassName[paiqistart.format('M-D')] = 'cell-hold';
                                }
                            }
                            for (let i = 0; i < that.blankPageListData.length; i++) {
                                let item = that.blankPageListData[i];

                                let buchongend = moment(that.endTime, 'YYYY-MM-DD');
                                for (let buchongstart = moment(that.startTime, 'YYYY-MM-DD'); buchongstart.isBefore(buchongend); buchongstart = buchongstart.add(1, 'd')) {
                                    let daykey = buchongstart.format('M-D');
                                    let day = buchongstart.format('YYYY-MM-DD');
                                    if (!item[daykey]) {
                                        item[daykey] = {};
                                    }
                                    item[daykey]['day'] = day;
                                    item[daykey]['positionId'] = item.positionId;
                                }
                            }
                            let titleStart = moment(that.startTime);
                            let titleEnd = moment(that.endTime);
                            for (; titleStart.isBefore(titleEnd) ; titleStart=titleStart.add(1,'d')) {
                                let daykey=titleStart.format('M-D');
                                that.columblankPage.push({
                                    title: daykey,
                                    key: daykey,
                                    'width': 100,
                                    render: (h, params) => {
                                        return h('tdpop', {props: params.row[daykey],
                                            on: {changepaiqi: that.cellclick}});//
                                    }
                                });
                            }
                            that.searchLoading = false;
                        });
                });
            },
            queryBlank(flag) {
                // if (flag) {
                this.search();
                // } else {
                //     this.$refs['formAdd'].validate((valid) => {
                //         if (valid) {
                //             this.search();
                //         }
                //     });
                // }
            },
            exportExl() {
                api.exportExl(this.formItem).then(response => {
                    this.templateListData = response.data.data;
                    this.total = response.data.count;
                });
            }
        },
        created() {

        },
        activated(){
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

