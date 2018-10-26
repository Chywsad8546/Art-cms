<template>
    <Row>
        <Col span="100">
            <Card>
                <p slot="title">站点列表管理</p>
                <a href="#" slot="extra"  @click.prevent="addModeButton" >
                    <Icon type="plus-circled"></Icon>
                    添加站点
                </a>
                <Row class="margin-top-10 searchable-table-con1">
                    <Form  ref="searchData" :model="searchData" inline :label-width="120">
                        <FormItem label="站点名称" prop="station">
                            <Select v-model="searchData.station" style="width:140px">
                                <Option value="">全部</Option>
                                <Option v-for="item in searchStationList" :value="item.station" :key="item.station">{{ item.stationName }}</Option>
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

                        <!--<FormItem>-->
                            <!--<Button type="primary" @click="addModeButton">添加</Button>-->
                        <!--</FormItem>-->
                    </Form>
                    <Table border :columns="columns" :data="data"></Table>
                    <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" style="margin-top:10px; text-align:right"></Page>
                </Row>
            </Card>

        </Col>

        <Modal v-model="isTrueAddTag" :loading="isAddTagLoading" width="360" @on-ok="addNewsChannel()">
            <Form  ref="addNewsChannelModalform" :model="addNewsChannelModal" :rules="ruleValidate" inline :label-width="120">
                <FormItem label="站点名称" prop="stationName">
                    <Input v-model.trim="addNewsChannelModal.stationName" style="width:140px"></Input>
                </FormItem>
            </Form>
        </Modal>

        <Modal v-model="modal2"  width="360" @on-ok="updateChannel()">
            <Form  ref="updateCahnnelValuefrom" :model="updateCahnnelValue" :rules="updateruleValidate"  inline :label-width="120">
                <FormItem label="站点名称" prop="stationName">
                    <Input v-model.trim="updateCahnnelValue.stationName" style="width:140px"></Input>
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
                searchStationList: [],
                defaultList: [],
                columns: [
                    {
                        key: 'station',
                        title: '站点id',
                        width: 100
                    },
                    {
                        key: 'stationName',
                        title: '站点'
                    },
                    {
                        title: '是否删除',
                        key: 'isDel',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.isDel === 0) {
                                return h('div',{
                                    style: {
                                        color: 'green'
                                    }
                                }, ['否']);
                            } else if (params.row.isDel === 1) {
                                return h('div',{
                                    style: {
                                        color: 'red'
                                    }
                                }, ['是']);
                            }
                        }
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
                                            marginRight: '15px'
                                        },
                                        on: {
                                            click: () => {
                                                this.updateCahnnelValue = {};
                                                this.updateCahnnelValue.pageId = params.row.station;
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
                                    '是否删除'
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
                                                this.updateCahnnelValue = {};
                                                this.updateCahnnelValue.stationNameUp = params.row.stationName;
                                                this.updateCahnnelValue.stationName = params.row.stationName;
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
                },
                data: [],
                initTable: [],
                total: 0,
                modal2: false,
                isTrueAddTag: false,
                modal_loading: false,
                isAddTagLoading:true,
                addNewsChannelModal: {
                },
                updateCahnnelValue: {
                },
                ruleValidate: {
                    stationName: [{ required: true, message: '站点名称不能为空', trigger: 'blur' }],
                },
                updateruleValidate: {
                    stationName: [{ required: true, message: '站点名称不能为空', trigger: 'blur' }],
                }
            };
        },
        methods: {
            addModeButton() {
                this.isTrueAddTag=true;
                this.isAddTagLoading=true;
            },
            init() {
                this.addNewsChannelModal = {
                };
                this.updateCahnnelValue = {};
                fapi.getStationInfo(this.searchData).then(response => {
                    this.total = response.data.count;
                    this.data = response.data.data;
                });
                fapi.getStationInfo({pageSize: 1000}).then(response => {
                    this.searchStationList = response.data.data;
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
                        adapi.addStation(this.addNewsChannelModal).then(response => {
                            if (response.data.data > 0) {
                                this.$Message.success('添加成功');
                                this.init();
                                this.isTrueAddTag = false;
                            } else {
                                this.$Message.error('已存在，添加失败');
                            }
                        }).catch(error => {
                            this.$Message.error(error.response.data.msg);
                            this.init();
                        });
                    } else {
                        this.isAddTagLoading=false;
                        this.$nextTick(()=>{
                           this.isAddTagLoading=true;
                        });
                        this.$Message.error('表单验证失败!');
                    }
                });
            },
            delStation() {
                var delDate = this.updateCahnnelValue;
                this.$Modal.confirm({
                    title: '更改删除状态',
                    content: '<p>是否更改删除状态</p>',
                    onOk: () => {
                        console.log(delDate)
                        adapi.updateStation(delDate).then(response => {
                            if (response.data.data > 0) {
                                this.$Message.success('删除成功！');
                                this.init();
                            } else {
                                this.$Message.error('删除失败！');
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
                        adapi.updateStationName(this.updateCahnnelValue).then(response => {
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
                this.searchData.pageNum = 1;
                this.init();
            },
            handleCancel (name) {
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

