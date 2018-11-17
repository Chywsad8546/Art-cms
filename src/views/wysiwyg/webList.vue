<template>
    <Row>
        <Col span="100">
            <Card>
                <p slot="title">网站列表</p>
                <a href="#" slot="extra"  @click.prevent="addModeButton" >
                    <Icon type="plus-circled"></Icon>
                    添加网站
                </a>
                <Row class="margin-top-10 searchable-table-con1">
                    <!-- <Form  ref="searchData" :model="searchData" inline :label-width="120">
                        <FormItem label="栏目名称" prop="pageId">
                            <Select v-model="searchData.pageId" style="width:140px">
                                <Option v-for="item in seratchPageList" :value="item.pageId" :key="item.pageId">{{ item.pageName }}</Option>
                            </Select>
                        </FormItem>


                        <FormItem>
                            <Button type="primary" @click="handleSearch('searchData')">搜索</Button>
                            <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
                        </FormItem>


                    </Form> -->

                    <Table border :columns="columns" :data="data"></Table>
                    <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" style="margin-top:10px; text-align:right"></Page>
                </Row>
            </Card>

        </Col>

        <Modal v-model="isTrueAddTag" width="360" @on-ok="addNewsChannel()">
            <Form  ref="addNewsChannelModalform" :model="addNewsChannelModal" :rules="ruleValidate" inline :label-width="120">
                <FormItem label="站点名称" prop="name">
                    <Input v-model.trim="addNewsChannelModal.name" style="width:140px"></Input>
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
    import api from '../../api/wysiwyg/main.js';
    import fapi from '../../api/advertisement/formtemplateApi.js';
    import dutil from '../../libs/util.js';
    export default {
        data() {
            return {
                stationList: [],
                columns: [
                    {
                        key: 'id',
                        title: '站点id',
                        width: 100
                    },
                    {
                        key: 'title',
                        title: '网站名称'
                    },
                    {
                        title: '管理',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            var i = this;
                            var isDelTip = '';
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
                                                    name: 'wysiwygmain', query: {siteid: params.row.siteId,id: params.row.id}
                                                });
                                            }
                                        }
                                    },
                                    '修改'
                                ),
                                //  h('Button', {
                                //     props: {
                                //         type: 'error',
                                //         size: 'small'
                                //     },
                                //     on: {
                                //         click: () => {
                                //           //  this.remove(params.index)
                                //         }
                                //     }
                                // }, 'Delete')
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
                    name: ''
                },
                updateCahnnelValue: {
                },
                ruleValidate: {
                    name: [{ required: true, message: '站点名称不能为空', trigger: 'blur' }]
                },
                updateruleValidate: {
                    name: [{ required: true, message: '站点名称不能为空', trigger: 'blur' }]
                },
                zhandianList: [],
                seratchPageList: []
            };
        },
        methods: {
            init() {
                api.getDiyWebpages(this.searchData).then(response => {
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
            addModeButton(){
                this.$router.push({
                    name: 'wysiwygmain', query: {siteid: this.$route.query.siteid}
                });                
            },
            addNewsChannel() {
                this.$refs['addNewsChannelModalform'].validate((valid) => {
                    if (valid) {
                        api.saveSite(this.addNewsChannelModal).then(response => {
                            if (response.data.code == 'success') {
                                this.$Message.success('添加成功');
                               // this.init();
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

