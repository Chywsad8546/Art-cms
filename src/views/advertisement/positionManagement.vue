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
                        <FormItem label="站点名称" prop="station">
                            <Select v-model="searchData.station"  @on-change = "zdClick" style="width:140px">
                                <Option value="">全部</Option>
                                <Option v-for="item in searchStationList" :value="item.station" :key="item.station">{{ item.stationName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="栏目名称" prop="pageId">
                            <Select v-model="searchData.pageId" style="width:140px">
                                <Option value="">全部</Option>
                                <Option v-for="item in searchPageList" :value="item.pageId" :key="item.pageId">{{ item.pageName }}</Option>
                            </Select>
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

        <Modal v-model="isTrueAddTag" :loading="isAddTagLoading" width="360" @on-ok="addNewsChannel()">
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
                <FormItem label="版本号" prop="version">
                    <Input v-model.trim="addNewsChannelModal.version" style="width:140px"></Input>
                </FormItem>
                <FormItem label="是否添加默认缺省页" prop="isAddDefault">
                    <Select v-model="addNewsChannelModal.isAddDefault" style="width:140px">
                        <Option value="0">是</Option>
                        <Option value="1">否</Option>
                    </Select>
                </FormItem>
                <FormItem label="是否是高级编辑器" prop="isAdvancedEdit">
                    <Select v-model="addNewsChannelModal.isAdvancedEdit" style="width:140px">
                        <Option value="0">低级</Option>
                        <Option value="1">高级</Option>
                    </Select>
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
                    {
                        key: 'version',
                        title: '版本号'
                    }
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
                        title: '版本号',
                        key: 'version'
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
                                                this.currentPosition = params.row.positionId;
                                                api.templateList({positionId: params.row.positionId}).then(response => {
                                                    this.modalData = response.data.data;
                                                });
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
                currentPosition: 0,
                searchData: {
                },
                data: [],
                total: 0,
                modal2: false,
                isTrueAddTag: false,
                modal_loading: false,
                isAddTagLoading: true,
                addNewsChannelModal: {
                    stationIndex: '',
                    pageIndex: '',
                    positionName: '',
                    version: ''
                },
                updateCahnnelValue: {
                },
                ruleValidate: {
                    positionName: [{ required: true, message: '位置名称不能为空', trigger: 'blur' }],
                    stationIndex: [{ type: 'integer', required: true, message: '站点不能为空', trigger: 'change' }],
                    version: [{ required: true, message: '请填写版本号', trigger: 'blur' }],
                    pageIndex: [{ type: 'integer', required: true, message: '请选择栏目', trigger: 'change' }]
                },
                updateruleValidate: {
                    positionName: [{ required: true, message: '位置名称不能为空', trigger: 'blur' }]
                }
            };
        },
        methods: {
            zdClick() {
                //console.log(this.searchData);
                if (typeof this.searchData.station !== 'undefined') {
                    api.getChannelInfo(this.searchData).then(response => {
                        this.searchPageList = response.data.data;
                    });
                }
            },
            addModal() {
                this.$router.push({
                    name: 'formtemplate', query: {positionId: this.currentPosition}
                });
            },
            addModeButton() {
                this.isTrueAddTag = true;
            },
            init() {
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
                // this.addNewsChannelModal.pageName = this.pageList[this.addNewsChannelModal.pageIndex].pageName;
                // this.addNewsChannelModal.station = this.stationList[this.addNewsChannelModal.stationIndex].station;
                // this.addNewsChannelModal.pageId = this.pageList[this.addNewsChannelModal.pageIndex].pageId;
                // this.addNewsChannelModal.stationName = this.stationList[this.addNewsChannelModal.stationIndex].stationName;
                //console.log(this.addNewsChannelModal);
                this.$refs['addNewsChannelModalform'].validate((valid) => {
                    if (valid) {
                        console.log('addNewsChannelModal', this.addNewsChannelModal);

                        adapi.addPosition(this.addNewsChannelModal).then(response => {
                            if (response.data.data > 0) {
                                this.$Message.success('添加成功');
                                this.isTrueAddTag = false;
                                // this.isAddTagLoading = true;
                                this.isAddTagLoading=false;
                                this.$nextTick(()=>{
                                    this.isAddTagLoading=true;
                                });
                                this.init();
                            } else {
                                this.$Message.error('已存在，添加失败');
                            }
                            // this.$Modal.remove();
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
                    api.getChannelInfo({isDel: 0, station: this.stationList[this.addNewsChannelModal.stationIndex].station}).then(response => {
                        this.pageList = response.data.data;
                    });
                } else {
                    this.pageList = [];
                }
            }
        },
        created() {
            this.init();
        }
    };
</script>

