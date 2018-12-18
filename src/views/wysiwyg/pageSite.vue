<template>
    <Row>
        <Col span="100">
        <Card>
            <p slot="title">栏目管理</p>
            <a href="#" slot="extra" @click.prevent="addModeButton">
                <Icon type="plus-circled"></Icon>
                添加站点
            </a>

            <Form ref="searchData" :model="searchData" inline :label-width="120">
                <FormItem label="站点名称" prop="name">
                    <Input v-model="searchData.name" placeholder="请输入站点名称" style="width: 150px"></Input>
                </FormItem>

                <FormItem>
                    <Button type="primary" @click="handleSearch('searchData')">搜索</Button>
                    <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
                </FormItem>
            </Form>
            <Row class="margin-top-10 searchable-table-con1">
                <Table border :columns="columns" :data="data"></Table>
                <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange"
                    style="margin-top:10px; text-align:right"></Page>
            </Row>
        </Card>

        </Col>

        <Modal v-model="isTrueAddTag" width="360" @on-ok="addNewsChannel()">
            <Form ref="addNewsChannelModalform" :model="addNewsChannelModal" :rules="ruleValidate" inline :label-width="120">
                <FormItem label="站点名称" prop="name">
                    <Input v-model.trim="addNewsChannelModal.name" style="width:140px"></Input>
                </FormItem>
            </Form>
        </Modal>

        <Modal v-model="modal2" width="360" @on-ok="updateChannel()">
            <Form ref="updateCahnnelValuefrom" :model="updateCahnnelValue" :rules="updateruleValidate" inline
                :label-width="120">
                <FormItem label="站点名称" prop="name">
                    <Input v-model.trim="updateCahnnelValue.name" style="width:140px"></Input>
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
    data () {
        return {
            stationList: [],
            columns: [
                {
                    key: 'id',
                    title: '站点id',
                    width: 100
                },
                {
                    key: 'name',
                    title: '站点名称'
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
                        } else if (params.row.isDel === 0) {
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
                                            this.$router.push({
                                                name: 'wysiwygWebList', query: { siteid: params.row.id }
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
                                            this.updateCahnnelValue.id = params.row.id;
                                            this.updateCahnnelValue.name = params.row.name;
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
                siteName: ''
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
        init () {
            api.getSites(this.searchData).then(response => {
                this.total = response.data.count;
                this.data = response.data.data;
            });
        },
        addNewsChannel () {
            this.$refs['addNewsChannelModalform'].validate((valid) => {
                if (valid) {
                    api.saveSite(this.addNewsChannelModal).then(response => {
                        this.$Message.success('添加成功');
                        this.init();
                    }).catch(error => {
                        this.$Message.error(error.response.data.msg);
                        this.init();
                    });
                } else {
                    this.$Message.error('表单验证失败!');
                }
            });
        },
        updateChannel () {
            this.$refs['updateCahnnelValuefrom'].validate((valid) => {
                if (valid) {
                    api.updateSite(this.updateCahnnelValue).then(response => {
                        this.$Message.success('更改成功！');
                        this.init();
                    }).catch(error => {
                        this.$Message.error(error.response.data.msg);
                        this.init();
                    });
                } else {
                    this.$Message.error('表单验证失败!');
                }
            });
        },
        addModeButton () {
            this.isTrueAddTag = true;
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
    created () {
        this.init();
    }
};
</script>

