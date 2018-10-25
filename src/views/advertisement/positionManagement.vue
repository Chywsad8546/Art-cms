<template>
    <Row>
        <Col span="100">
            <Card>
                <p slot="title">广告位管理</p>
                <a href="#" slot="extra"  @click.prevent="addModeButton" >
                    <Icon type="plus-circled"></Icon>
                    添加广告位
                </a>
                <Row class="margin-top-10 searchable-table-con1">
                    <Form  ref="searchData" :model="searchData" inline :label-width="120">
                        <FormItem label="站点名称" prop="stationName">
                            <Select v-model="searchData.stationName" style="width:140px">
                                <Option value="">全部</Option>
                                <Option v-for="item in searchStationList" :value="item.stationName" :key="item.stationName">{{ item.stationName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="栏目名称" prop="pageName">
                            <Select v-model="searchData.pageName" style="width:140px">
                                <Option value="">全部</Option>
                                <Option v-for="item in searchPageList" :value="item.pageName" :key="item.pageName">{{ item.pageName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="位置id" prop="positionId">
                            <Input v-model.trim="searchData.positionId" style="width:140px"></Input>
                        </FormItem>
                        <FormItem label="位置名称" prop="positionName">
                            <Input v-model.trim="searchData.positionName" style="width:140px"></Input>
                        </FormItem>
                       <!-- <FormItem label="是否删除" prop="isDel">
                            <Select v-model="searchData.isDel" style="width:140px">
                                <Option value="">全部</Option>
                                <Option value="0">否</Option>
                                <Option value="1">是</Option>
                            </Select>
                        </FormItem>-->
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

        <Modal v-model="isTrueAddTag" width="360" @on-ok="addNewsChannel(addNewsChannelModal)">
            <Form  ref="addNewsChannelModalform" :model="addNewsChannelModal" :rules="ruleValidate" inline :label-width="120">
                <FormItem label="站点名称" prop="stationIndex">
                    <Select v-model="addNewsChannelModal.stationIndex" @on-change = "changeStation" style="width:140px">
                        <Option v-for="(item, index) in stationList" :value="index" :key="index">{{ item.stationName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="栏目名称" prop="pageIndex">
                    <Select v-model="addNewsChannelModal.pageIndex" style="width:140px">
                        <Option v-for="(item, index) in pageList" :value="index" :key="index">{{ item.pageName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="位置名称" prop="positionName">
                    <Input v-model.trim="addNewsChannelModal.positionName" style="width:140px"></Input>
                </FormItem>
            </Form>
        </Modal>

        <Modal v-model="modal2" width="360" @on-ok="updateChannel(updateCahnnelValue)">
            <Form  ref="updateCahnnelValuefrom" :model="updateCahnnelValue" :rules="updateruleValidate"  inline :label-width="120">
                <FormItem label="栏目名称" prop="positionName">
                    <Input v-model.trim="updateCahnnelValue.positionName" style="width:140px"></Input>
                </FormItem>
            </Form>
        </Modal>

        <Modal v-model="modal3" width="1000">
            <Button type="primary" @click="addModal">添加模板</Button>
                <Table border :columns="modalColums" :data="modalData"></Table>
        </Modal>
    </Row>
</template>
<script>
    import adapi from '../../api/advertisement/ad.js';
    import api from '../../api/advertisement/formtemplateApi.js';
    export default {
        data() {
            return {
                searchStationList: [],
                searchPageList: [],
                modalColums: [
                    {
                        key: 'id',
                        title: 'id'
                    },
                    {
                        key: 'name',
                        title: '名称'
                    },
                    {
                        key: 'positionName',
                        title: '位置名称'
                    },
                ],
                modalData: [],
                modal3: false,
                stationList: [],
                pageList: [],
                columns: [
                    {
                        key: 'positionId',
                        title: '位置id',
                        width: 100
                    },
                    {
                        key: 'stationName',
                        title: '应用名称'
                    },
                    {
                        key: 'pageName',
                        title: '栏目名称'
                    },
                    {
                        key: 'positionName',
                        title: '位置名称'
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
                                                this.modal3 = true;
                                                api.templateList({positionId: params.row.positionId}).then(response => {
                                                    this.modalData = response.data.data;
                                                });
                                                console.log(this.modalData)
                                            }
                                        }
                                    },
                                    '设置编辑器'
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
                                                this.updateCahnnelValue.positionName = params.row.positionName;
                                                this.updateCahnnelValue.positionId = params.row.positionId;
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
                total: 0,
                modal2: false,
                isTrueAddTag: false,
                modal_loading: false,
                addNewsChannelModal: {
                },
                updateCahnnelValue: {
                },
                ruleValidate: {
                    positionName: [{ required: true, message: '位置名称不能为空', trigger: 'blur' }],
                    stationName: [{ required: true, message: '站点不能为空', trigger: 'blur' }],
                },
                updateruleValidate: {
                    positionName: [{ required: true, message: '位置名称不能为空', trigger: 'blur' }],
                }
            };
        },
        methods: {
            addModal(){
                this.$router.push({
                    name: "formtemplate"
                });
            },
            addModeButton() {
                this.addNewsChannelModal = {
                };
                this.isTrueAddTag = true;
            },
            init() {
                adapi.getAllPage().then(response => {
                    this.searchPageList = response.data.data;
                });
                adapi.getAllStation({isDel: 0}).then(response => {
                    this.stationList = response.data.data;
                    this.searchStationList = response.data.data;
                });
                this.addNewsChannelModal = {
                };
                this.updateCahnnelValue = {};
                adapi.getAllPositions(this.searchData).then(response => {
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
            addNewsChannel(addChannelValue) {
                console.log(this.pageList);
                this.addNewsChannelModal.pageName = this.pageList[this.addNewsChannelModal.pageIndex].pageName;
                this.addNewsChannelModal.station = this.stationList[this.addNewsChannelModal.stationIndex].pageId;
                this.addNewsChannelModal.pageId = this.pageList[this.addNewsChannelModal.pageIndex].pageId;
                this.addNewsChannelModal.stationName = this.stationList[this.addNewsChannelModal.stationIndex].stationName;
                //console.log(this.addNewsChannelModal);
                this.$refs['addNewsChannelModalform'].validate((valid) => {
                    if (valid) {
                        if (typeof addChannelValue.pageId !== 'undefined'){
                            console.log(addChannelValue);
                            adapi.addPosition(addChannelValue).then(response => {
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
                        }else {
                            this.$Message.error('请选择栏目！');
                        }
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });
            },
            delStation() {
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
            },
            updateChannel() {
                this.$refs['updateCahnnelValuefrom'].validate((valid) => {
                    if (valid) {
                        adapi.updatePosition(this.updateCahnnelValue).then(response => {
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
                this.searchData.page = 1;
                this.init();
            },
            handleCancel (name) {
                this.$refs[name].resetFields();
                this.searchData.page = 1;
                this.init();
            },
            pageChange (page) {
                this.searchData.page = page;
                this.init();
            },
            sizeChange (size) {
                this.searchData.limit = size;
                this.init();
            },
            changeStation() {
                if (this.addNewsChannelModal.stationIndex !== undefined) {
                    adapi.getAllPage({isDel: 0, stationName: this.stationList[this.addNewsChannelModal.stationIndex].stationName}).then(response => {
                        this.pageList = response.data.data;
                    });
                } else {
                    this.pageList = [];
                }
            },
        },
        created() {
            this.init();
        }
    };
</script>

