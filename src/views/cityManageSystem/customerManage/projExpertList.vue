<template>

    <Card span="100">
        <p slot="title">{{$route.query.projName}}</p>
        <Form class="margin-top-20" ref="formData" :model="searchData" inline :label-width="100">
            <FormItem label="经纪人编号" prop="agentId">
                <Input v-model.trim="searchData.agentId"/>
            </FormItem>
            <FormItem label="展示电话" prop="agentPhone">
                <Input v-model.trim="searchData.agentPhone"/>
            </FormItem>
            <Modal v-model="addShow" title="添加专家" @on-ok="AddEnter" @on-cancel="AddCancel" width="600" okText="添加"
                   closable>
                <Form ref="formAdd" :model="form" :label-width="120">
                    <Row type="flex" align="middle" class="row">
                        <Select v-model="searchPhone" placeholder="请输入至少3位经纪人手机号查询" @on-change="setForm"
                                @clearSingleSelect="resetForm" filterable remote clearable :remote-method="remoteMethod"
                                :loading="projLoading" class="row" style="padding:0">
                            <Option v-for="(option, index) in projOptions" :value="index" :key="index">
                                {{option.agentId}}/{{option.agentName}}/{{option.agentPhone}}
                            </Option>
                        </Select>
                    </Row>
                    <template>
                        <Row type="flex" align="middle" class="row">
                            <Col span="8">
                            楼盘ID
                            </Col>
                            <Col span="16">
                            <Input v-model="form.newcode" disabled></Input>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle" class="row">
                            <Col span="8">
                            楼盘名称
                            </Col>
                            <Col span="16">
                            <Input v-model="form.projName" disabled></Input>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle" class="row">
                            <Col span="8">
                            经纪人ID
                            </Col>
                            <Col span="16">
                            <Input v-model="form.agentId" disabled></Input>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle" class="row">
                            <Col span="8">
                            经纪人姓名
                            </Col>
                            <Col span="16">
                            <Input v-model="form.agentName" disabled></Input>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle" class="row">
                            <Col span="8">
                            经纪人电话
                            </Col>
                            <Col span="16">
                            <Input v-model="form.agentPhone" disabled></Input>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle" class="row">
                            <Col span="8">
                            用户ID
                            </Col>
                            <Col span="16">
                            <Input v-model="form.userId" disabled></Input>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle" class="row">
                            <Col span="8">
                            开始时间
                            </Col>
                            <Col span="16">
                            <DatePicker :value="form.startTime" :options="timeOption" @on-change="changeSrartTime"
                                        format="yyyy/MM/dd HH:mm:ss" type="datetime" placeholder="选择开始时间"></DatePicker>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle" class="row">
                            <Col span="8">
                            到期时间
                            </Col>
                            <Col span="16">
                            <DatePicker :value="form.endTime" :options="timeOption" @on-change="changeEndTime"
                                        format="yyyy/MM/dd HH:mm:ss" type="datetime" placeholder="选择到期时间"></DatePicker>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle" class="row">
                            <Col span="8">
                            公司名称
                            </Col>
                            <Col span="16">
                            <Input v-model="form.ofCompany" disabled></Input>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle" class="row">
                            <Col span="8">
                            公司ID
                            </Col>
                            <Col span="16">
                            <Input v-model="form.corpId" disabled></Input>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle" class="row">
                            <Col span="8">
                            已绑定楼盘数
                            </Col>
                            <Col span="16">
                            <a href="javascript:" @click="toDetails(form.agentId)">{{projExpertCount}}</a>
                            </Col>
                        </Row>
                    </template>
                </Form>
            </Modal>
            <FormItem>
                <Button type="success" @click="AddExpert">添加</Button>
                <Button type="primary" @click="handleSearch('formData')" style="margin-left: 8px">搜索</Button>
                <Button type="ghost" @click="handleCancel('formData')" style="margin-left: 8px">清空</Button>
            </FormItem>
        </Form>
        <Table border :columns="columns" :data="data"></Table>
        <Page :total="total" :current="searchData.pageNum" show-total @on-change="pageChange" align="right"
              class="margin-top-10"></Page>
    </Card>
</template>

<script>
    import api from '@/api/city/index.js';
    import companyApi from '@/api/company/index.js';
    import moment from 'moment';

    export default {
        name: 'projExpertList',
        data() {
            return {
                data: [],
                total: 0,
                addShow: false,
                searchData: {
                    newcode: this.$route.query.newcode,
                    pageNum: 1,
                    pageSize: 10
                },
                searchPhone: '',
                projLoading: false,
                projOptions: [],
                projExpertCount: 0,
                form: {
                    newcode: '',
                    projName: '',
                    agentId: '',
                    agentName: '',
                    agentPhone: '',
                    userId: '',
                    startTime: '',
                    endTime: '',
                    ofCompany: '',
                    corpId: ''
                },
                columns: [
                    {
                        key: 'agentId',
                        title: '经纪人编号',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'agentName',
                        title: '经纪人姓名',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'ofCompany',
                        title: '公司',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'agentPhone',
                        title: '展示电话',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'startTime',
                        title: '配置时间',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'endTime',
                        title: '到期时间',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        minWidth: 135,
                        render: (h, params) => {
                            let row = params.row;
                            let btn = h('ButtonGroup', [
                                h(
                                    'Button', {
                                        props: {
                                            type: 'ghost',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.deploy(row.id);
                                            }
                                        }
                                    },
                                    '解绑'
                                )
                            ]);
                            return btn;
                        }
                    }
                ]
            };
        },
        computed: {
            timeOption() {
                return {
                    disabledDate(date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                }
            }
        },
        methods: {
            skipPage(name) {
                this.$router.push({
                    name: name
                });
            },
            init() {
                this.pageChange(1);
            },
            pageChange(cuPage) {
                if (+this.searchData.agentId > (Math.pow(2, 31) - 1)) {
                    this.$Notice.warning({
                        title: '经纪人Id不存在，请重新填写'
                    });
                    return false;
                }
                let obj = Object.assign(this.searchData, {pageNum: cuPage});
                api.getProjExpertList(obj).then(response => {
                    this.data = response.data.data.data;
                    this.total = response.data.data.total;
                });
            },
            handleSearch() {
                this.searchData.pageNum = 1;
                this.init();
            },
            handleCancel(name) {
                this.$refs[name].resetFields();
                this.searchData.pageNum = 1;
                this.searchData.newcode = this.$route.query.newcode;
                this.init();
            },
            deploy(id) {
                api.cancelDeploy({id: id}).then(response => {
                    this.init();
                }).catch(response => {
                    this.$Notice.warning({
                        title: response.msg || '解绑失败'
                    });
                });
            },
            // 打开添加专家面板
            AddExpert() {
                this.addShow = true;
            },
            // 确认添加专家
            AddEnter() {
                const obj = {
                    newcode: '楼盘ID',
                    projName: '楼盘名称',
                    agentId: '经纪人ID',
                    agentName: '经纪人名称',
                    agentPhone: '经纪人电话',
                    userId: '用户ID',
                    startTime: '配置时间',
                    endTime: '到期时间',
                    ofCompany: '公司名称',
                    corpId: '公司ID'
                };
                for (const i in this.form) {
                    if (!this.form[i]) {
                        this.$Notice.warning({
                            desc: `${obj[i]}不能为空`
                        });
                        return false;
                    }
                }
                api.AddProjExpert(this.form).then(res => {
                    if (res.data.data === '添加成功') {
                        this.$Notice.success({
                            desc: res.data.data
                        });
                    } else {
                        this.$Notice.warning({
                            desc: res.data.data
                        });
                    }
                    this.resetForm();
                    this.init();
                }).catch(err => {
                    this.$Notice.warning({
                        desc: err.response.data
                    });
                });
            },
            // 取消添加专家
            AddCancel() {
                this.addShow = false;
                this.resetForm();
            },
            // 专家手机模糊搜索
            remoteMethod(query) {
                query = query.replace(/(^\s*)|(\s*$)/g, '');
                if (query !== '' && String(query).length >= 3) {
                    this.projLoading = true;
                    api
                        .selectUserByPhone({
                            agentPhone: query
                        })
                        .then(response => {
                            this.projLoading = false;
                            this.projOptions = response.data.data.data;
                        });
                } else {
                    this.projOptions = [];
                }
            },
            // 选择搜索项
            setForm(val) {
                if (val === '') {
                    return false;
                }
                this.form.newcode = this.$route.query.newcode;
                this.form.projName = this.$route.query.projName;
                this.form.startTime = moment().hours(0).minutes(0).seconds(0).format('YYYY/MM/DD HH:mm:ss');
                this.form.endTime = moment().add(1, 'M').hours(23).minutes(59).seconds(59).format('YYYY/MM/DD HH:mm:ss');
                let obj = this.projOptions[val];
                if (obj !== undefined) {
                    this.form.agentId = obj.agentId;
                    this.form.userId = obj.userId;
                    this.form.agentName = obj.agentName;
                    this.form.agentPhone = obj.agentPhone;
                    this.form.corpId = obj.corpId;
                    this.form.ofCompany = obj.ofCompany;
                    this.projExpertCount = obj.projExpertCount;
                }
            },
            // 重置添加专家表单
            resetForm() {
                this.form = {
                    newcode: '',
                    projName: '',
                    agentId: '',
                    agentName: '',
                    agentPhone: '',
                    userId: '',
                    startTime: '',
                    endTime: '',
                    ofCompany: '',
                    corpId: ''
                };
                this.projOptions = [];
                this.projExpertCount = 0;
                this.searchPhone = '';
            },
            // 楼盘数跳转
            toDetails(agentId) {
                this.$router.push({
                    name: 'downloadProjExpert',
                    query: {agentId}
                });
            },
            // 配置时间设置
            changeSrartTime(val) {
                this.form.startTime = moment(val).hours(0).minutes(0).seconds(0).format('YYYY/MM/DD HH:mm:ss');
                this.form.endTime = moment(val).add(1, 'M').hours(23).minutes(59).seconds(59).format('YYYY/MM/DD HH:mm:ss');
            },
            changeEndTime(val) {
                this.form.endTime = moment(val).hours(23).minutes(59).seconds(59).format('YYYY/MM/DD HH:mm:ss');
            }
        },
        created() {
            this.init();
        }
    };
</script>
<style>
    .row {
        padding: 5px 20px;
    }
</style>
