<template>
  
</template>
<script>
    import api from '../../../api/company/index.js';
    import moment from "moment";
    import {compact} from "lodash";

    export default {
        name: 'agentList',
        data() {
            return {
                columns: [{
                    key: 'agentId',
                    title: 'ID',
                    width: 70,
                    align: 'center'
                },
                {
                    key: 'agentName',
                    title: '真实姓名',
                    width: 90,
                    align: 'center'
                },
                {
                    key: 'corpShortName',
                    title: '公司',
                    width: 90,
                    align: 'center'
                },
                {
                    key: 'storeName',
                    title: '门店',
                    minWidth: 160,
                    align: 'center'
                },
                {
                    key: 'roleKey',
                    title: '所属角色',
                    width: 90,
                    align: 'center',
                    render: (h, params) => {
                        const key = params.row.roleKey;
                        let roleMsg = '';
                        if (key === 506) {
                            roleMsg = '普通版';
                        } else if (key === 508) {
                            roleMsg = '出租版';
                        } else if (key === 502) {
                            roleMsg = '免费版';
                        }
                        return h('span', roleMsg);
                    }
                },
                {
                    key: 'businessCardAuthStr',
                    title: '名片认证',
                    width: 90,
                    align: 'center'
                },
                {
                    key: 'idCardAuthStr',
                    title: '身份认证',
                    width: 90,
                    align: 'center'
                },
                {
                    key: 'telephone',
                    title: '手机号',
                    width: 120,
                    align: 'center'
                },
                {
                    key: 'isPerOpen',
                    title: '预开通',
                    width: 90,
                    align: 'center',
                    render: (h, params) => {
                        return h("span",
                            params.row.isPerOpen === 0 ? "否" : "是"
                        )
                    }
                },
                {
                    key: 'preOpenVersion',
                    title: '预开通版本',
                    width: 100,
                    align: 'center'
                },
                {
                    key: 'preOpenEndTime',
                    title: '预开通到期时间',
                    width: 130,
                    align: 'center',
                    render: (h, params) => {
                        let preOpenEndTime = params.row.preOpenEndTime;
                        return h('span', preOpenEndTime ? moment(preOpenEndTime).format('YYYY-MM-DD') : '');
                    }
                },
                {
                    key: 'startTime',
                    title: '开始时间',
                    align: 'center',
                    minWidth: 120,
                    render: (h, params) => {
                        let startTime = params.row.startTime;
                        return h('span', startTime ? moment(startTime).format('YYYY-MM-DD') : '');
                    }
                },
                {
                    key: 'endTime',
                    title: '截止时间',
                    align: 'center',
                    minWidth: 120,
                    render: (h, params) => {
                        let endTime = params.row.endTime;
                        return h("span", endTime ? moment(endTime).format("YYYY-MM-DD") : '')
                    }
                },
                {
                    key: 'limitCount',
                    title: '推优标签',
                    width: 90,
                    align: 'center'
                },
                {
                    title: '管理',
                    key: 'action',
                    width: 90,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Button', {
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
                                                name: 'agentDetail',
                                                query: {
                                                    agentId: params.row.agentId,
                                                    userId: params.row.userId
                                                }
                                            });
                                        }
                                    }
                                },
                                '详情'
                            )
                        ]);
                    }
                }
                ],
                // 多条件搜索相关数据
                searchData: {
                    // roleKey:'',
                    agentId: '',
                    corpShortName: '',
                    storeName: '',
                    agentName: '',
                    displayPhone: '',
                    telephone: '',
                    idCardAuth: '',
                    paymentAuth: '',
                    businessCardAuth: '',
                    startTime: '',
                    endTime: '',
                    pageNum: 1,
                    pageSize: 10
                },
                //多手机搜索相关数据
                searchTelData: {
                    telephones: [],
                    pageNum: 1,
                    pageSize: 10
                },
                searchMethod: '多条件搜索',
                telsStr: '',
                data: [],
                initTable: [],
                total: 0
            };
        },
        watch: {
            searchMethod(cur, old) {
                this.init();
            },
            telsStr(cur, old) {
                this.searchTelData.telephones = compact(cur.split('\n'))
            }
        },
        computed: {},
        methods: {
            init() {
                if (this.searchMethod === '多条件搜索') {
                    api.getAgentList(this.searchData).then(response => {
                        this.data = this.initTable = response.data.data.data;
                        this.total = response.data.data.total;
                    });
                } else {
                    api.getAgentByTelephones(this.searchTelData).then(response => {
                        this.data = response.data.data.data;
                        this.total = response.data.data.total;
                    });
                }
            },
            handleSearch() {
                this.searchData.pageNum = 1;
                this.searchTelData.pageNum = 1;
                this.init();
            },
            handleCancel(name) {
                if (this.searchMethod === '多条件搜索') {
                    this.$refs[name].resetFields();
                    this.searchData.pageNum = 1;
                } else {
                    this.telsStr = '';
                    this.searchTelData.telephones = [];
                    this.searchTelData.pageNum = 1;
                }
                this.init();
            },
            pageChange(page) {
                this.searchData.pageNum = page;
                this.searchTelData.pageNum = page;
                this.init();
            },
            sizeChange(size) {
                this.searchData.pageSize = size;
                this.init();
            },
            changeStartTime(date) {
                this.searchData.startTime = date
            },
            changeEndTime(date) {
                this.searchData.endTime = date
            },
        },
        // created() {
        //     this.searchData.corpShortName = this.$route.query.corpShortName || ''
        //     this.searchData.storeName = this.$route.query.storeName || ''
        //     this.init();
        // },
        mounted() {
            this.searchData.corpShortName = this.$route.query.corpShortName || ''
            this.searchData.storeName = this.$route.query.storeName || ''
            this.init();
        }
    };
</script>
