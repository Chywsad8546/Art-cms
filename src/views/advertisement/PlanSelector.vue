<template>
    <Row>
        <Col span="100">


            <Row  class="margin-top-10 searchable-table-con1">
                <Form  ref="form" :model="formItem" :rules="formRuleValidate"  inline :label-width="120">

                    <FormItem label="启用中的广告计划" prop="planid">
                        <Select v-model="formItem.planid" :key="'selectplanid'" style="width:300px" @on-change="selectchange">
                            <Option v-for="item in plans" :value="item.id" :key="'plan'+item.id">{{ item.planName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="创意" prop="selectideacode" >
                        <Select v-model="formItem.selectideacode" :key="'selectideaid'" style="width:300px" @on-change="getPostionPaiqi" >
                            <Option v-for="item in data" :value="item.ideaCode" :key="'idea'+item.ideaCode">{{ item.adName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="排期日期" >
                        <DatePicker type="daterange" :options="dpoptions" @on-change="getPostionPaiqi"  v-model="selectdate" format="yyyy-MM-dd" :clearable="false" placeholder="上架时间"></DatePicker>
                    </FormItem>
                    <FormItem label="付费状态" >
                        <Select v-model="ispay" :key="'ispayslect'" style="width:290px">
                            <Option :value="1" :key="'ispay1'">付费</Option>
                            <Option :value="0" :key="'ispay0'">免费</Option>
                        </Select>
                    </FormItem>
                    <FormItem>

                        <Button v-show="!searchLoading" type="primary" style="margin-left: 8px" @click="paiqi">完毕</Button>`
                    </FormItem>
                </Form>
                <Alert v-if="existwarning" type="warning" show-icon>选择的日期范围内，有已经存在的广告</Alert>
                <Table border :columns="daycolumns" :data="postionData" :loading="searchLoading" ></Table>
            </Row>
        </Col>

    </Row>
</template>
<script>
    import ideaApi from '@/api/advertisement/ideaList.js';
    import fapi from '@/api/advertisement/formtemplateApi.js';
    import adapi from '@/api/advertisement/ad.js';
    import api from '@/api/advertisement/formtemplateApi.js';
    import moment from 'moment';
    import tdpopreadonly from './tdpopreadonly.vue';
    import Vue from 'vue';
    Vue.component('tdpopreadonly', tdpopreadonly);
    export default {
        props: {
            positionId: '',
            date: '',
            showseed: '',
            // existData: {}
        },
        data() {
            return {
                formItem:{
                    planid:'',
                    selectideacode:''
                },
                existwarning: false,
                // showPayDialog: false,
                plans: [],
                ispay: 1,
                selectdate: [this.date, moment(this.date).add(1, 'd').toDate()],
                dpoptions: {
                    disabledDate (date) {
                        return moment(date).isBefore(moment(0, "HH")) || moment(date).isAfter(moment(0, "HH").add(1,'M'));
                    }
                },
                searchLoading: false,
                data: [],
                total: 0,
                daycolumns: [{
                    key: 'selectPositionName',
                    title: '广告位当前排期情况',
                    width: 100,
                    fixed: 'left'
                }],
                postionData: [],
                formRuleValidate: {
                    planid: [
                        {type:'number',required: true, message: '请填写', trigger: 'change'}
                    ],
                    selectideacode: [
                        {required: true, message: '请填写', trigger: 'change'}
                    ]
                },
            };
        },
        methods: {

            init() {
                adapi.panList({status:1}).then(response => {
                    this.plans = response.data.data;
                });
            },
            selectchange(id) {
                ideaApi.ideaList({planId:id,positionId:this.positionId,page:1,limit:30}).then(response => {
                    this.total = response.data.count;
                    this.data = response.data.data;
                });
            },
            paiqi() {
                this.$refs['form'].validate((commvalid) => {
                    if(commvalid) {
                        let startTime = moment(this.selectdate[0]).format('YYYY-MM-DD');
                        let endTime = moment(this.selectdate[1]).format('YYYY-MM-DD');
                        var that = this;
                        api.addSchedules({
                            positionId: this.positionId,
                            ideaCode: this.formItem.selectideacode,
                            isPay: this.ispay,
                            startTime: startTime,
                            endTime: endTime
                        }).then(response => {
                            if (response.data.data.isRepeat == true) {
                                let reAdSchedulesNow = JSON.stringify(response.data.data.adSchedules);
                                api.forceCover({
                                    positionId: this.positionId,
                                    ideaCode: this.formItem.selectideacode,
                                    isPay: this.ispay,
                                    startTime: startTime,
                                    endTime: endTime,
                                    reAdSchedulesNow: reAdSchedulesNow
                                }).then(response => {
                                    that.$Message.success('排期成功');
                                });
                            } else {
                                this.$Message.success('排期成功');
                                // this.schedulesList();
                            }
                        });
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
                    positionIds: this.positionId,
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
        },
        created() {
            this.init();
        },
        watch: {
            'positionId': function (val) {
                this.formItem.planid = '';
                this.init();
            },
            'showseed': function (val) {
                this.formItem.selectideacode='';
                this.init();
                // this.showPayDialog = false;
            },
            'date': function (val) {
                this.selectdate = [val, moment(val).add(1, 'd').toDate()];
                // this.dpchange(this.selectdate);
            }
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
