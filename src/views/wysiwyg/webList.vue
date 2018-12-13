<template>
    <Row>
        <Col span="100">
        <Card>
            <p slot="title">站点列表</p>
            <a href="#" slot="extra" @click.prevent="addModeButton">
                <Icon type="plus-circled"></Icon>
                添加站点
            </a>
            <Form ref="searchData" :model="searchData" inline :label-width="120">
                <FormItem label="站点名称" prop="title">
                    <Input v-model="searchData.title" placeholder="请输入站点名称" style="width: 150px"></Input>
                </FormItem>
                <FormItem label="编辑" prop="title">
                    <Input v-model="searchData.title" placeholder="请输入编辑名称" style="width: 150px"></Input>
                </FormItem>
                <!-- <FormItem label="开始时间">
                    <Row>
                        <Col span="24">
                             <DatePicker type="date" v-model="searchData.beginCreateTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="结束时间">
                    <Row>
                        <Col span="24">
                        <DatePicker type="date" v-model="searchData.endCreateTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
                           
                        </Col>
                    </Row>
                </FormItem>  -->
                <FormItem>
                    <Button type="primary" @click="handleSearch('searchData')">搜索</Button>
                    <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
                </FormItem>
            </Form>
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
                <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange"
                    style="margin-top:10px; text-align:right"></Page>
            </Row>
        </Card>

        </Col>
        <Modal v-model="isTrue" width="1000">
            <Card>
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    专题记录
                </p>
                <Table border :columns="modalColums" :data="modalData"></Table>
            </Card>
            <span slot="footer"></span>
        </Modal>
        <Modal v-model="qrcodeModal" width="400">

            <p slot="header" style="color:#f60;text-align:center">
                <span></span>
            </p>
            <Tabs type="card">
                <TabPane label="WEB预览">
                    <div style="text-align:center">
                        <p class="qrcode" style="width:200px; margin:0 auto;" id="qrcode11"></p>
                    </div>
                    <div style="margin-top:20px;">
                        <span>专题URL</span>
                        <Input v-model="siteUrl" placeholder="" style="width: 300px"></Input>
                    </div>
                </TabPane>
            </Tabs>

            <div slot="footer">
            </div>
        </Modal>
    </Row>
</template>
<script>
import adapi from '../../api/advertisement/ad.js';
import api from '../../api/wysiwyg/main.js';
import fapi from '../../api/advertisement/formtemplateApi.js';
import dutil from '../../libs/util.js';
import QRCode from 'qrcodejs2';
export default {
    data () {
        return {
            stationList: [],
            qrcodeModal: false,
            modalData: [],
            siteUrl: '',
            modalColums: [
                {
                    key: 'id',
                    title: 'id'
                },
                {
                    key: 'title',
                    title: '站点名称'
                }
            ],
            columns: [
                {
                    key: 'id',
                    title: '站点id',
                    width: 100
                },
                {
                    key: 'title',
                    title: '站点名称'
                },
                {
                    key: 'createTime',
                    title: '建立时间'
                },
                {
                    key: 'creater',
                    title: '编辑'
                },
                {
                    key: 'status',
                    title: '发布状态',
                    width: 100,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: params.row.status === 1 ? 'success' : 'ghost',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                }
                            }, params.row.status === 0 ? '未上线' : '已上线')
                        ]);
                    }
                },
                {
                    title: '管理',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
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
                                                name: 'wysiwygmain', query: { siteid: params.row.siteId, id: params.row.id }
                                            });
                                        }
                                    }
                                },
                                '编辑'
                            ),
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            api.delDiyWebpage({
                                                id: params.row.id
                                            }).then(response => {
                                                this.$Message.success('删除成功！');
                                                this.init();
                                            });
                                        }
                                    }
                                },
                                '删除'
                            ),
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'text',
                                        icon: 'eye'
                                    },
                                    on: {
                                        click: () => {
                                            this.previewClick(params.row.id);
                                        }
                                    }
                                },
                                '预览'
                            )
                        ]);
                    }
                }
            ],
            searchData: {
                siteId: this.$route.query.siteid,
            },
            data: [],
            total: 0,
            modal2: false,
            isTrue: false,
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
            api.getDiyWebpages(this.searchData).then(response => {
                this.total = response.data.count;
                this.data = response.data.data;
            });
        },
        previewClick (id) {
            this.qrcodeModal = true;
            var url = 'http://cms.dev.bidewu.com/cmsapi/cmsapi/diyWebpage/diyWebpageHtml?id=' + id;
            this.siteUrl = url;
            document.getElementById('qrcode11').innerHTML = '';
            this.qrcode(url);
        },
        qrcode (url) {
            let qrcode = new QRCode('qrcode11', {
                width: 200,
                height: 200, // 高度
                text: url // 二维码内容
            });
        },
        updateIsPush (id, isDel) {
            api.updateOpenScreen({ id: id, isDel: isDel }).then(response => {
                if (response.data.data > 0) {
                    this.$Message.success('更改成功！');
                    this.init();
                }
            });
        },
        addModeButton () {
            let routeData = this.$router.resolve({ path: '/wysiwyg', query: { siteid: this.$route.query.siteid } });
            window.open(routeData.href, '_blank');

            // this.$router.push({
            //     name: 'wysiwygmain', query: { siteid: this.$route.query.siteid }
            // });
        },
        addNewsChannel () {
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
        delStation () {
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
        updateChannel () {
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
            this.searchData.pageNum = 1;
            this.init();
        },
        handleCancel (name) {
            // console.log(this.$refs[name]);
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
        console.log(this.searchData);
        this.init();
    }
};
</script>

