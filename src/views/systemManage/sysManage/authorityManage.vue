<template>
    <Row>
        <Col span="100">
        <Card>
            <p slot="title">权限角色管理列表</p>
            <Row class="margin-top-10 searchable-table-con1">
                <Table border :columns="columns" :data="data"></Table>
                <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" style="margin-top:10px; text-align:right"></Page>
            </Row>
        </Card>
        </Col>
    </Row>
</template>
<script>
    import api from '../../../api/system/index.js';
    export default {
        data() {
            return {
                columns: [
                    {
                        key: 'roleId',
                        title: '角色Id',
                        width: 100
                    },
                    {
                        key:'createTime',
                        title:'创建日期'
                    },
                    {
                        key: 'roleKey',
                        title: '角色编码'
                    },
                    {
                        key:'roleDesc',
                        title:'角色描述'
                    },
                    {
                        key:'roleValue',
                        title:'角色名称'
                    },{
                        key:'updateTime',
                        title:'更新时间'
                    },
                    {
                        title: '管理',
                        key: 'action',
                        width: 130,
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
                                                    name: 'assignPermissions',
                                                    query: {roleKey: params.row.roleKey,roleName:params.row.roleValue}
                                                });
                                            }
                                        }
                                    },
                                    '分配权限'
                                )
                            ]);
                        }
                    }
                ],
                searchData: {
                    agentId: '',
                    agentName: '',
                },
                data: [],
                initTable: [],
                total: 6
            };
        },
        methods: {
            init(){
                api.getAuthorityList().then(response => {
                //console.log(response.data.data.data);
                this.total=response.data.data.total;
                this.data=response.data.data.data;
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
        created(){
            this.init();
        }
    };
</script>
