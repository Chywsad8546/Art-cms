<template>
    <Row>
        <Col span="100">


            <Row class="margin-top-10 searchable-table-con1">
                <Form  ref="searchData"  inline :label-width="120">

                    <FormItem label="计划名称" >
                        <Select v-model="planid"  style="width:300px">
                            <Option v-for="item in plans" :value="item.id" :key="item.id">{{ item.planName }}</Option>
                        </Select>
                    </FormItem>

                </Form>

                <Table border :columns="columns" :data="data"></Table>
                <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" style="margin-top:10px; text-align:right"></Page>
            </Row>
        </Col>

    </Row>
</template>
<script>
    import adapi from '../../api/advertisement/ad.js';
    import api from '../../api/advertisement/formtemplateApi.js';
    export default {
        data() {
            return {
                plans:[],
                planid:'',
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
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: 'planDetail', query: {planid: params.row.id}
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
                    this.plans = response.data.data;
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

