<template>
<div>
    <Form :model="formItem" :label-width="80">
            <FormItem label="广告位置">
                <Input  style="width:290px" placeholder="请输入名称"></Input>
            </FormItem>      
            <FormItem label="创意编号">
                <!-- <Select  style="width:290px">
                    <Option v-for="item in zhandianList" :value="item.station" :key="item.station">{{ item.stationName }}</Option>
                </Select> -->
            </FormItem>
            <FormItem label="付费状态">
                <!-- <Select style="width:290px">
                    <Option v-for="item in zhandianList" :value="item.station" :key="item.station">{{ item.stationName }}</Option>
                </Select> -->
            </FormItem>
           <Row>
                <Col span="4">                  
                    <FormItem label="上架时间">
                        <DatePicker type="date" placeholder="上架时间" v-model="formItem.dateStart"></DatePicker>
                     </FormItem>
                </Col>
                <Col span="4">                  
                    <FormItem label="下架时间">
                        <DatePicker type="date" placeholder="下架时间" v-model="formItem.dateEnd"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <FormItem>
                <Button type="primary">预览</Button>
                <Button type="primary" style="margin-left: 8px">立即提交</Button>`
            </FormItem>
    </Form>
    <Table border :columns="columblankPage" :data="blankPageListData"></Table>
     <Page :total="total"  @on-change="pageChange" show-sizer></Page>
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
    export default {
        data() {
            return {
                formItem: {
                    positionId:'',
                    payState:'',
                    name:""
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
                                            if(params.row.isNew == 1){
                                                this.$router.push({
                                                    name: 'formtemplate',
                                                    query: {advertId: params.row.id}
                                                });
                                            }
                                        }
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                posEdit:{}
            };
        },
        methods: {
            init(){              
                this.posEdit.positionId = this.$route.query.positionId;
                this.getAdPositionInfo();
            },
            getAdPositionInfo() {
                console.log(this.posEdit);
                api.getAdPositionInfo(this.posEdit).then(response => {
                    this.blankPageListData = response.data.data;
                    this.total = response.data.count;
                });
            }
        },
        created(){
            this.init();
        }
    };
</script>
