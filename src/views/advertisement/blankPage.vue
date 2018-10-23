<template>
<div>
    <Form :model="formItem" :label-width="80">
           <Row>
                <!-- <Col span="5">
                    <FormItem label="名称">
                        <Input v-model="formItem.name" placeholder="请输入名称"></Input>
                    </FormItem>
                </Col> -->
                <Col span="4">                  
                    <FormItem label="站点">
                        <Select v-model="formItem.station" style="width:100px" @on-change = "zdClick">
                            <Option v-for="item in zhandianList" :value="item.station" :key="item.station">{{ item.stationName }}</Option>
                        </Select>
                    </FormItem>
                </Col>

                <Col span="4">                  
                    <FormItem label="广告频道">
                        <Select v-model="formItem.pageName" style="width:100px"  @on-change = "pdClick">
                            <Option v-for="item in pingdaoList" :value="item.pageName" :key="item.pageName">{{ item.pageName }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">                  
                    <FormItem label="广告位置">
                        <Select v-model="formItem.positionId" style="width:100px">
                            <Option v-for="item in weizhiList" :value="item.positionId" :key="item.positionId">{{ item.positionName }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>                 
            <Row>
                <Col span="5">
                    <FormItem label="付费状态">
                        <Select v-model="formItem.isPay" style="width:100px">
                                <Option value="1">付费</Option>
                                <Option value="0">免费</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="5">
                    <FormItem label="时间">
                        <DatePicker type="date" v-model="dateTime" format="yyyy-MM-dd"  placeholder="上架时间"></DatePicker>
                     </FormItem>
                </Col>
                <Col span="11">
                    <FormItem>
                        <Button type="primary" @click="queryBlank">查询</Button>
                        <Button type="primary" style="margin-left: 8px">下载排期</Button>
                    </FormItem>
                </Col>
            </Row>
    </Form>
    <Table border :columns="columblankPage" :data="blankPageListData"></Table>
     <Page :total="total"  show-total show-sizer  @on-change="pageChange" ></Page>
</div>
    <!-- <Row>
        <Col span="100">
            <Card>
                <a href="http://cms.toutiaofangchan.com" target="_blank">去旧版</a>
            </Card>
        </Col>
    </Row> -->
</template>
<script>
    import api from '../../api/advertisement/formtemplateApi.js';
    import dutil from '../../libs/util.js';
    export default {
        data() {
            return {
                formItem: {
                    // positionId:'',
                    // payState:'',
                    // name:""
                },
                columblankPage: [
                    {
                        title: '频道',
                        key: 'pageName',
                    },
                    {
                        title: '位置',
                        key: 'positionName'
                    },
                    {
                        title: '创意名称',
                        key: 'adName'
                    },
                    {
                        title: '最后更新时间',
                        key: 'modifyAt'
                    },
                    {
                        title: '上架时间',
                        key: 'startime'
                    },
                    {
                        title: '下架时间',
                        key: 'endtime'
                    },
                    {
                        title: '生成时间',
                        key: 'createAt'
                    },
                    {
                        title: '付费状态',
                        key: 'isPay'
                    },
                    {
                        title: '广告商',
                        key: 'adCompany'
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
                                            this.$router.push({
                                                name: 'positionEdit',
                                                query: {positionId: params.row.positionId}
                                            });
                                        }
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                blankPageListData: [],
                total:0,
                tempList:{},
                zhandianList:[],
                weizhiList:[],
                pingdaoList:[],
                dateTime:""
            };
        },
        methods: {
            init(){
                this.adListAll();
                this.getStationInfo();
            },
            pdClick(){
                api.getPositionInfo(this.formItem).then(response => {
                    this.weizhiList = response.data.data;
                });   
            },
            zdClick(){
                api.getChannelInfo(this.formItem).then(response => {
                    this.pingdaoList = response.data.data;
                });   
            },
            getStationInfo() {
                api.getStationInfo().then(response => {
                    this.zhandianList = response.data.data;
                });               
            },
            pageChange(page){
                this.formItem.pageNum = page;
                this.adListAll();
            },
            adListAll() {
                api.adListAll(this.formItem).then(response => {
                    this.blankPageListData = response.data.data;
                    this.total = response.data.count;
                });
            },
            queryBlank(){
                // let year = this.formItem.time.getFullYear();       //获取当前年份(2位)  
                // let moneth = this.formItem.time.getMonth()+1;       //获取当前年份(2位)  
                // let dqDate = this.formItem.time.getDate();
                this.formItem.time = dutil.dateformat(this.dateTime, 'yyyy-MM-dd');
                this.adListAll();
            }
        },
        created(){
            this.init();
        }
    };
</script>
