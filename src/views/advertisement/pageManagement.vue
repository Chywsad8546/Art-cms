<template>
    <Row>
        <Col span="100">
            <Card>
                <p slot="title">栏目管理</p>
                <a href="#" slot="extra"  @click.prevent="addModeButton" >
                    <Icon type="plus-circled"></Icon>
                    添加栏目
                </a>
                <Row class="margin-top-10 searchable-table-con1">
                    <Form  ref="searchData" :model="searchData" inline :label-width="120">
                        <FormItem label="应用" prop="station">
                        <Select v-model="searchData.station" @on-change = "zdClick" style="width:140px">
                            <Option value="">全部</Option>
                            <Option v-for="item in zhandianList" :value="item.station" :key="item.station">{{ item.stationName }}</Option>
                        </Select>
                        </FormItem>
                        <FormItem label="栏目名称" prop="pageId">
                            <Select v-model="searchData.pageId" style="width:140px">
                                <Option v-for="item in seratchPageList" :value="item.pageId" :key="item.pageId">{{ item.pageName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="是否删除" prop="isDel">
                            <Select v-model="searchData.isDel" style="width:140px">
                                <Option value="">全部</Option>
                                <Option value="0">否</Option>
                                <Option value="1">是</Option>
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

        <Modal v-model="isTrueAddTag" width="360" @on-ok="addNewsChannel()">
            <Form  ref="addNewsChannelModalform" :model="addNewsChannelModal" :rules="ruleValidate" inline :label-width="120">
                <FormItem label="站点名称" prop="stationId">
                    <Select v-model="addNewsChannelModal.stationId" :label-in-value="true" @on-change="sitechange" style="width:140px">
                        <Option v-for="(item,index) in stationList" :value="item.station" :key="item.station">{{ item.stationName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="栏目名称" prop="pageName">
                    <Input v-model.trim="addNewsChannelModal.pageName" style="width:140px"></Input>
                </FormItem>
            </Form>
        </Modal>

        <Modal v-model="modal2" width="360" @on-ok="updateChannel()">
            <Form  ref="updateCahnnelValuefrom" :model="updateCahnnelValue" :rules="updateruleValidate"  inline :label-width="120">
                <FormItem label="栏目名称" prop="pageName">
                    <Input v-model.trim="updateCahnnelValue.pageName" style="width:140px"></Input>
                </FormItem>
            </Form>
        </Modal>
    </Row>
</template>
<script>
    import adapi from '../../api/advertisement/ad.js';
    import api from '../../api/advertisement/openScreen.js';
    import fapi from '../../api/advertisement/formtemplateApi.js';
    import dutil from '../../libs/util.js';
    export default {
        data() {
            return {
                stationList: [],
                columns: [
                    {
                        key: 'pageId',
                        title: '栏目id',
                        width: 100
                    },
                    {
                        key: 'pageName',
                        title: '栏目'
                    },
                    {
                        title: '是否删除',
                        key: 'isDel',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.isDel === 0) {
                                return h('div', ['否']);
                            } else if (params.row.isDel === 1) {
                                return h('div', ['是']);
                            }
                        }
                    },
                    {
                        title: '管理',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            var i = this;
                            var isDelTip = '';
                            if (params.row.isDel === 1) {
                                isDelTip = '启用';
                            }else if (params.row.isDel === 0){
                                isDelTip = '删除';
                            }
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
                                                this.updateCahnnelValue.pageId = params.row.pageId;
                                                if (params.row.isDel === 1) {
                                                    this.updateCahnnelValue.isDel = 0;
                                                } else {
                                                    this.updateCahnnelValue.isDel = 1;
                                                }
                                                this.delStation();
                                                this.init();
                                            }
                                        }
                                    },
                                    isDelTip
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
                                                this.updateCahnnelValue.pageId = params.row.pageId;
                                                this.updateCahnnelValue.pageName = params.row.pageName;
                                                i.modal2 = true;
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
                    stationName: '',
                    pageName: '',
                    isDel: '',
                    pageId: ''
                },
                data: [],
                total: 0,
                modal2: false,
                isTrueAddTag: false,
                modal_loading: false,
                addNewsChannelModal: {
                    stationId: '',
                    stationName: '',
                    pageName: ''
                },
                updateCahnnelValue: {
                },
                ruleValidate: {
                    pageName: [{ required: true, message: '栏目名称不能为空', trigger: 'blur' }],
                    stationId: [{ type: 'integer', required: true, message: '站点不能为空', trigger: 'change' }]
                },
                updateruleValidate: {
                    pageName: [{ required: true, message: '栏目名称不能为空', trigger: 'blur' }]
                },
                zhandianList: [],
                seratchPageList: []
            };
        },
        methods: {
            sitechange(v) {
                if (v !== undefined) {
                    this.addNewsChannelModal.stationName = v.label;
                }
            },
            zdClick() {
                console.log(this.searchData);
                if (typeof this.searchData.station !== 'undefined') {
                    fapi.getChannelInfo({station: this.searchData.station, pageSize: 1000}).then(response => {
                        this.seratchPageList = response.data.data;
                        this.searchData.pageId = '';
                    });
                }
            },
            addModeButton() {
                this.isTrueAddTag = true;
            },
            init() {
                this.addNewsChannelModal = {
                    stationId: '',
                    stationName: '',
                    pageName: ''
                };
                fapi.getStationInfo({isDel: 0, pageSize: 1000}).then(response => {
                    this.stationList = response.data.data;
                    this.zhandianList = response.data.data;
                });
                fapi.getChannelInfo(this.searchData).then(response => {
                    this.total = response.data.count;
                    this.data = response.data.data;
                });
            },
            updateIsPush(id, isDel) {
                api.updateOpenScreen({id: id, isDel: isDel}).then(response => {
                    if (response.data.data > 0) {
                        this.$Message.success('更改成功！');
                        this.init();
                    }
                });
            },
            addNewsChannel() {
                this.$refs['addNewsChannelModalform'].validate((valid) => {
                    if (valid) {
                        adapi.addPage(this.addNewsChannelModal).then(response => {
                            if (response.data.data > 0) {
                                this.$Message.success('添加成功');
                                this.init();
                            } else {
                                this.$Message.error('已存在，添加失败');
                            }
                        }).catch(error => {
                            this.$Message.error(error.response.data.msg);
                            this.init();
                        });
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });
            },
            delStation() {
                var tip = '';
                if (this.updateCahnnelValue.isDel === 0) {
                    tip = '是否启用';
                } else {
                    tip = '是否删除';
                }
                var delDate = this.updateCahnnelValue;
                this.$Modal.confirm({
                    title: '更改状态',
                    content: tip,
                    onOk: () => {
                        console.log(delDate);
                        adapi.updateStation(delDate).then(response => {
                            if (response.data.data > 0) {
                                this.$Message.success('更改成功！');
                                this.init();
                            } else {
                                this.$Message.error('更改失败！');
                            }
                        }).catch(error => {
                            this.$Message.error(error.response.data.msg);
                            this.init();
                        });
                    },
                    onCancel: () => {
                    }
                });
            },
            updateChannel() {
                this.$refs['updateCahnnelValuefrom'].validate((valid) => {
                    if (valid) {
                        adapi.updateStation(this.updateCahnnelValue).then(response => {
                            if (response.data.data > 0) {
                                this.$Message.success('更改成功！');
                                this.init();
                            } else {
                                this.$Message.error('更改失败！');
                            }
                        }).catch(error => {
                            this.$Message.error(error.response.data.msg);
                            this.init();
                        });
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });
            },
            handleSearch () {
                this.searchData.pagepageNum = 1;
                this.init();
            },
            handleCancel (name) {
                console.log(this)
                this.seratchPageList = [];
                //console.log(this.$refs[name]);
                this.$refs[name].resetFields();
                this.searchData.pageNum = 1;
                this.init();
            },
            pageChange (page) {
                this.searchData.pageNum = page;
                this.init();
            },
            sizeChange (size) {
                this.searchData.pageSize = size;
                this.init();
            }
        },
        created() {
            this.init();
        }
    };
</script>

