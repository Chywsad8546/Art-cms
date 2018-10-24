<template>
<div>
    <Form :model="formItem" :label-width="80">
            <FormItem label="广告位置">
                {{positionName}}
            </FormItem>      
            <FormItem label="创意编号">
                <Select  v-model="formItem.ideaCode" style="width:290px">
                    <Option v-for="item in cynumList" :value="item.ideaCode" :key="item.ideaCode">{{ item.ideaCode }}</Option>
                </Select>
                缺省创意编号为{{numCode}}
            </FormItem>
            <FormItem label="付费状态">
                <Select v-model="formItem.isPay" style="width:290px">
                        <Option value="1">付费</Option>
                        <Option value="0">免费</Option>
                </Select>
            </FormItem>
           <Row>
                <Col span="4">                  
                    <FormItem label="上架时间">
                        <DatePicker type="date" placeholder="上架时间" v-model="startTime"></DatePicker>
                     </FormItem>
                </Col>
                <Col span="4">                  
                    <FormItem label="下架时间">
                        <DatePicker type="date" placeholder="下架时间" v-model="endTime"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <FormItem>
                <Button type="primary">预览</Button>
                <Button type="primary" style="margin-left: 8px" @click="submitOriginality">立即提交</Button>`
            </FormItem>
    </Form>
     <Table border :columns="columblankPage" :data="positionListData"></Table>
     <Page :total="total"  @on-change="pageChange" show-total show-sizer style="margin-top:10px;"></Page>


    <Modal v-model="popupModel" width="360">
        <div style="text-align:center">
            <p>该位置未添加缺省创意请先添加创意</p>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" long  @click="routerPush">确定</Button>
        </div>
    </Modal>
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
                    positionId:'',
                    startTime:'',
                    endTime:"",
                    ideaCode:"",
                    isPay:""
                },
                columblankPage: [
                    {
                        title: '开始日期',
                        key: 'startime',
                    },
                    {
                        title: '结束日期',
                        key: 'endtime'
                    },
                    {
                        title: '付费状态',
                        key: 'isPay'
                    },
                    {
                        title: '广告主',
                        key: 'adCompany'
                    },
                    {
                        title: '是否覆盖被下架',
                        key: 'status'
                    }
                ],
                posEdit:{},
                cynumList:[],
                numCode:"",
                positionName:"",
                startTime:"",
                endTime:"",
                positionListData:[],
                total:0,
                popupModel:false
            };
        },
        methods: {
            init(){              
                this.formItem.positionId = this.$route.query.positionId;
                this.getAdPositionInfo();
                this.schedulesList();
            },
            pageChange(page){
                this.formItem.pageNum = page;
                this.schedulesList();
            },
            getAdPositionInfo() {
                api.getAdPositionInfo(this.formItem).then(response => {
                   // this.popupModel = !this.popupModel;
                    if(response.data.data.isAddDefault == 0 && response.data.data.isDefault == null){
                        this.popupModel = !this.popupModel;
                        return false;
                    }
                    this.cynumList = response.data.data.ideas;
                    this.numCode = response.data.data.isDefault;
                    this.positionName = response.data.data.positionName;
                });
            },
            submitOriginality(){
                if(this.formItem.ideaCode == ""){
                    this.$Message.error("请选择创意编号");
                    return false;
                }
                if(this.formItem.isPay == ""){
                    this.$Message.error("请选择付费状态");
                    return false;
                }
                if(this.startTime && this.endTime){               
                    this.formItem.startTime = dutil.dateformat(this.startTime, 'yyyy-MM-dd');
                    this.formItem.endTime = dutil.dateformat(this.endTime, 'yyyy-MM-dd');
                }else{
                    this.$Message.error("请选择开始与结束日期");
                    return false;
                }           
                api.addSchedules(this.formItem).then(response => {
                    if(response.data.data.isRepeat == true){
                            this.$Modal.confirm({
                                title: '',
                                content: response.data.data.msg,
                                onOk: () => {
                                    this.formItem.reAdSchedulesNow = JSON.stringify(response.data.data.adSchedules);
                                    this.forceCover();//覆盖排期
                                }
                            });
                    }else{
                        this.schedulesList();
                    }
                });
            },
            forceCover() {
                api.forceCover (this.formItem).then(response => {
                     this.schedulesList();
                });               
            },
            routerPush(){
                this.$router.push({
                    name: 'positionEdit',
                    query: {positionId: params.row.positionId}
                });
            },
            schedulesList() {
                api.schedulesList (this.formItem).then(response => {
                    let listData = response.data.data;
                    
                    listData.forEach(item=>{
                        if(item.isPay == true){
                            item.isPay = "是"
                        }else{
                            item.isPay = "否"
                        }
                        if(item.status == true){
                            item.status = "是"
                        }else{
                            item.status = "否"
                        }
                    })
                    this.positionListData = listData;
                    this.total = response.data.count;
                }); 
            }
        },
        created(){
            this.init();
        }
    };
</script>
