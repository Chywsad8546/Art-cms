<template>
    <Row>
        <Col span="100">


            <Row v-if="!showPayDialog" class="margin-top-10 searchable-table-con1">
                <Form  ref="searchData"  inline :label-width="120">

                    <FormItem label="计划名称" >
                        <Select v-model="planid" :key="'selectplanid'" style="width:300px" @on-change="selectchange">
                            <Option v-for="item in plans" :value="item.id" :key="'plan'+item.id">{{ item.planName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="排期日期" >
                        <span :style="{color:'red'}">{{date}}</span>
                    </FormItem>
                </Form>
                <Table border :columns="columns" :data="data"></Table>
                <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" style="margin-top:10px; text-align:right"></Page>
            </Row>
            <Row v-if="showPayDialog" class="margin-top-10 searchable-table-con1">
                <Form  ref="payform"  inline :label-width="120">

                    <FormItem label="付费状态" >
                        <Select v-model="ispay" :key="'ispayslect'" style="width:290px">
                            <Option :value="1" :key="'ispay1'">付费</Option>
                            <Option :value="0" :key="'ispay0'">免费</Option>
                        </Select>
                    </FormItem>
                    <FormItem>

                        <Button type="primary" style="margin-left: 8px" @click="paiqi">确定</Button>`
                        <Button type="ghost" @click="cancel">取消</Button>
                    </FormItem>

                </Form>
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
    export default {
        props: {
            adCompany: String,
            adName: String,
            // "endtime":"2018-10-04 00:00:00+08",
            ideaCode: String,
            // isPay: String,
            positionId: '',
            date: '',
            // "startime":"2018-10-02 00:00:00+08",
            // status: Boolean
            showseed:'',
        },
        data() {
            return {
                showPayDialog:false,
                plans: [],
                planid: '',
                ispay:1,
                selectideacode:'',
                columns: [
                    {
                        key: 'pageName',
                        title: '频道',
                        width: 100
                    },
                    {
                        key: 'adName',
                        title: '创意名称',
                        width: 200
                    },
                    {
                        title: '排期状态',
                        key: 'pushType',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.paiqiZhuangtai === 0) {
                                return h('div', ['未排期']);
                            } else if (params.row.paiqiZhuangtai === 1) {
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
                            var that = this;
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
                                                this.selectideacode=params.row.ideaCode;
                                                this.showPayDialog=true;
                                            }
                                        }
                                    },
                                    '确定排期'
                                )
                            ]);
                        }
                    }
                ],
                searchData: {
                    page: 1,
                    limit: 5,
                    planId: ''
                    // positionId:this.positionId
                },
                data: [],
                total: 0
            };
        },
        methods: {
            init() {
                // this.searchData.planId = this.plandetail.planid;
                adapi.panList({}).then(response => {
                    this.plans = response.data.data;
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
            selectchange(id) {
                this.searchData.planId = id;
                console.log(this.positionId);
                this.searchData.positionId = this.positionId;
                ideaApi.ideaList(this.searchData).then(response => {
                    this.total = response.data.count;
                    this.data = response.data.data;
                });
            },
            cancel(){
                this.showPayDialog=false;
            },
            paiqi() {
                let end = moment(this.date,'YYYY-MM-DD').add(1,'d').format('YYYY-MM-DD');
                console.log({positionId:this.positionId,ideaCode:this.selectideacode,isPay:this.ispay,startTime:this.date,endTime:end})
                api.addSchedules({positionId:this.positionId,ideaCode:this.selectideacode,isPay:this.ispay,startTime:this.date,endTime:end}).then(response => {
                    if (response.data.data.isRepeat == true) {

                    } else {
                        this.$message.success('排期成功');
                        // this.schedulesList();
                    }
                });
            }
        },
        created() {
            this.init();
        },
        watch: {
            'positionId': function (val) {
                this.planid = '';
            },
            'showseed':function (val) {
                this.showPayDialog=false;
            }
        }
    };
</script>

