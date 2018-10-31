<template>
    <Row>
        <Col span="100">
            <Card>
                <p slot="title">用户列表管理</p>
                <Row class="margin-top-10 searchable-table-con1">
                    <Button type="primary" @click="isTrueAddTag = true">添加</Button>
                    <Table border :columns="columns" :data="data"></Table>
                    <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" style="margin-top:10px; text-align:right"></Page>
                </Row>
            </Card>

        </Col>

        <Modal v-model="isTrueAddTag" width="360" @on-ok="addNewsChannel(addNewsChannelModal)">
            <Form  ref="addNewsChannelModal" :model="addNewsChannelModal" inline :label-width="120">
                <FormItem label="用户名称" prop="userName">
                    <Input v-model.trim="addNewsChannelModal.userName" style="width:140px"></Input>
                </FormItem>
                <FormItem label="用户密码" prop="userPwd">
                    <Input v-model.trim="addNewsChannelModal.userPwd" style="width:140px"></Input>
                </FormItem>
                <FormItem label="选择角色" prop="userRoleCode">
                    <Select v-model="addNewsChannelModal.userRoleCode" style="width:140px">
                        <Option value="admin">超级角色</Option>
                        <Option value="bjjl">编辑经理</Option>
                        <Option value="ptbj">普通编辑</Option>
                    </Select>
                </FormItem>

                <FormItem label="是否有效" prop="status">
                    <Select v-model="addNewsChannelModal.status" style="width:140px">
                        <Option value="0">是</Option>
                        <Option value="1">否</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>

        <Modal v-model="modal2" width="360" @on-ok="updateChannel(updateCahnnelValue)">
            <Form  ref="updateCahnnelValue" :model="updateCahnnelValue" inline :label-width="120">
                <FormItem label="用户名称" prop="userName">
                    <input v-model.trim="updateCahnnelValue.id" hidden />
                    <Input v-model.trim="updateCahnnelValue.userName" style="width:140px"></Input>
                </FormItem>
                <FormItem label="用户密码" prop="userPwd">
                    <Input v-model.trim="updateCahnnelValue.userPwd" style="width:140px"></Input>
                </FormItem>

                <FormItem label="选择角色" prop="userRoleCode">
                    <Select v-model="updateCahnnelValue.userRoleCode" style="width:140px">
                        <Option value="admin">超级角色</Option>
                        <Option value="bjjl">编辑经理</Option>
                        <Option value="ptbj">普通编辑</Option>
                    </Select>
                </FormItem>

                <FormItem label="是否有效" prop="status">
                    <Select v-model="updateCahnnelValue.status" style="width:140px">
                        <Option :value="0">是</Option>
                        <Option :value="1">否</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    </Row>
</template>
<script>
    import api from '../../../api/system/index.js';
    import apiDictionary from '../../../api/dictionary/channelDictionary.js';
    export default {
        data() {
            return {
                defaultList:[],
                columns: [
                    {
                        key: 'id',
                        title: 'id ',
                        width: 100
                    },
                    {
                        key: 'userName',
                        title: '用户名',
                    },
                    {
                        key:'userPwd',
                        title:'密码'
                    },
                    {
                        key: 'userRoleCode',
                        title: '角色code'
                    },
                    {
                        title: '是否有效',
                        key: 'status',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.status == 0){
                                return h('div', ["是"]);
                            }else {
                                return h('div', ["否"]);
                            }
                        }
                    },
                    {
                        title: '管理',
                        key: 'action',
                        width: 130,
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
                                                this.updateCahnnelValue.id = params.row.id;
                                                this.updateCahnnelValue.userName = params.row.userName;
                                                this.updateCahnnelValue.userPwd = params.row.userPwd;
                                                this.updateCahnnelValue.userRoleCode = params.row.userRoleCode;
                                                this.updateCahnnelValue.status = params.row.status;
                                                //弹窗弹出
                                                i.modal2 = true;
                                                console.log(this.updateCahnnelValue)
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
                    page: 1,
                    limit:10,
                },
                data: [],
                initTable: [],
                total: 0,
                modal2: false,
                isTrueAddTag:false,
                modal_loading: false,
                updateCahnnelValue:{
                },
                addNewsChannelModal:{
                },
            };
        },
        methods: {
            init(){
                api.getUserList(this.searchData).then(response => {
                    this.total=response.data.count;
                    this.data=response.data.data;
                });
            },
            addNewsChannel(addChannelValue){
                api.addUser(addChannelValue).then(response => {
                    if (response.data.data > 0){
                        this.$Message.success('添加成功');
                        this.init();
                    }
                });
            },
            updateChannel(updateCahnnelValue){
                api.addUser(updateCahnnelValue).then(response => {
                    if (response.data.data > 0){
                        this.$Message.success('修改成功');
                        this.init();
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
                console.log('pageChange')
                this.searchData.page = page;
                this.init();
            },
            sizeChange (size) {
                this.searchData.limit = size;
                this.init();
            }
        },
        created(){
            this.init();
        }
    };
</script>
