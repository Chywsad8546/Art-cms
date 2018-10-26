<template>
    <Row>
        <Col span="100">
            <Card>
                <p slot="title">广告计划</p>
                <a href="#" slot="extra"  @click.prevent="addModeButton" >
                    <Icon type="plus-circled"></Icon>
                    添加计划
                </a>
                <Row class="margin-top-10 searchable-table-con1">
                    <Form  ref="searchData" :model="searchData" inline :label-width="120">
                        <FormItem label="计划ID" prop="id" :label-width="80">
                            <Input v-model.trim="searchData.id" style="width:140px"></Input>
                        </FormItem>
                        <FormItem label="计划名称" prop="planName"  :label-width="80">
                            <Input v-model.trim="searchData.planName" style="width:140px"></Input>
                        </FormItem>
                        <FormItem label="状态" prop="status" :label-width="50">
                            <Select v-model="searchData.status" style="width:100px">
                                <Option value="1">关闭</Option>
                                <Option value="0">启用</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSearch('searchData')">搜索</Button>
                            <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
                        </FormItem>
                    </Form>

                    <Table border :columns="columns" :data="data"></Table>
                    <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" style="margin-top:10px; text-align:right"></Page>
                </Row>
            </Card>

        </Col>

        <Modal v-model="isTrueAddTag" :loading="isAddTagLoading" width="360" @on-ok="addPlanChannel()">
            <Form  ref="addPlanModalform" :model="addPlanModal" :rules="planRuleValidate" inline :label-width="120">
                <FormItem label="计划名称" prop="planName">
                    <Input v-model.trim="addPlanModal.planName" style="width:140px"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="isTrueEdit" :loading="isAddTagLoading" width="360" @on-ok="eidtPlanChannel()">
            <Form  ref="editPlanModalform" :model="editPlanModal" :rules="planEditValidate" inline :label-width="120">
                <FormItem label="计划名称" prop="planName">
                    <Input v-model.trim="editPlanModal.planName" style="width:140px"></Input>
                </FormItem>
            </Form>
        </Modal>
    </Row>
</template>
<script>
    import adapi from '../../api/advertisement/ad.js';
    import api from '../../api/advertisement/formtemplateApi.js';
    export default {
        data() {
            return {
                columns: [
                    {
                        key: 'id',
                        title: '计划id',
                        width: 100
                    },
                    {
                        key: 'planName',
                        title: '计划名字'
                    },
                    {
                        key: 'ideaCount',
                        title: '创意总数'
                    },
                    {
                        key: 'zhanShiCount',
                        title: '展示数'
                    },
                    {
                        title: '排期数',
                        key: 'paiQiCount'
                    },
                    {
                        title: '管理',
                        key: 'action',
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
                                            background: params.row.status == 0 ? 'red':'green',
                                            marginRight: '5px',
                                            borderColor: params.row.status == 0 ? 'red':'green',
                                        },
                                        on: {
                                            click: () => {
                                                let statType = params.row.status == 0 ? 1 : 0;
                                                adapi.editStatus({"id":params.row.id,"status":statType}).then(response=>{
                                                    this.$Message.success('修改状态成功');
                                                    this.init();
                                                })
                                            }
                                        }
                                    },
                                    params.row.status==0?"关闭":"启用"
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
                                                    name: 'planDetail', query: {planid: params.row.id, ideaCount: params.row.ideaCount, paiQiCount: params.row.paiQiCount, zhanShiCount: params.row.zhanShiCount}
                                                });
                                            }
                                        }
                                    },
                                    '详情'
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
                                                this.isTrueEdit = true;
                                                this.editPlanModal.id = params.row.id;
                                                this.editPlanModal.planName = params.row.planName;
                                               // this.editPlan(params.row.id);
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
                },
                data: [],
                total: 0,
                isTrueAddTag: false,
                isTrueEdit:false,
                isAddTagLoading: true,
                addPlanModal: {
                    planName: '',
                },
                editPlanModal: {
                    id:'',
                    planName: '',
                },
                planRuleValidate: {
                    planName: [{ required: true, message: '计划名称不能为空', trigger: 'blur' }],
                },
                planEditValidate: {
                    planName: [{ required: true, message: '计划名称不能为空', trigger: 'blur' }],
                }
            };
        },
        methods: {
            init() {
                adapi.panList(this.searchData).then(response => {
                    this.data = response.data.data;
                    this.total = response.data.count;
                });
            },
            addPlanChannel(){
                this.$refs['addPlanModalform'].validate((valid) => {
                    if (valid) {
                        adapi.addPlan(this.addPlanModal).then(response => {
                            this.$Message.success('添加成功');
                            this.isTrueAddTag = false;
                            this.isAddTagLoading=false;
                            this.$nextTick(()=>{
                                this.isAddTagLoading=true;
                            });
                            this.init();
                        }).catch(error => {
                            this.$Message.error(error.response.data.msg);
                        });
                    }else{
                        this.isAddTagLoading=false;
                        this.$nextTick(()=>{
                            this.isAddTagLoading=true;
                        });
                        this.$Message.error('表单验证失败!');
                    }
                });
            },
            eidtPlanChannel(){
                 this.$refs['editPlanModalform'].validate((valid) => {
                    if (valid) {
                        adapi.editPlan(this.editPlanModal).then(response => {
                            this.$Message.success('添加成功');
                            this.isTrueEdit = false;
                            this.isAddTagLoading=false;
                            this.$nextTick(()=>{
                                this.isAddTagLoading=true;
                            });
                            this.init();
                        }).catch(error => {
                            this.$Message.error(error.response.data.msg);
                        });
                    }else{
                        this.isAddTagLoading=false;
                        this.$nextTick(()=>{
                            this.isAddTagLoading=true;
                        });
                        this.$Message.error('表单验证失败!');
                    }
                });
            },
            handleSearch(){
                this.init();
            },
            handleCancel (name) {
                this.$refs[name].resetFields();
                this.searchData.page = 1;
                this.init();
            },
            pageChange (page) {
                this.searchData.pageNum = page;
                this.init();
            },
            sizeChange (size) {
                this.searchData.pageSize = size;
                this.init();
            },
            addModeButton(){
                this.addPlanModal.planName = "";
                this.isTrueAddTag = true;
            }
        },
        created() {
            this.init();
        }
    };
</script>

