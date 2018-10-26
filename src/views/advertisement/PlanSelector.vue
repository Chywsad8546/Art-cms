<template>
    <Row>
        <Col span="100">


            <Row class="margin-top-10 searchable-table-con1">
                <Form  ref="searchData"  inline :label-width="120">

                    <FormItem label="计划名称" >
                        <Select v-model="planid"  style="width:300px" @on-change="selectchange">
                            <Option v-for="item in plans" :value="item.id" :key="item.id">{{ item.planName }}</Option>
                        </Select>
                    </FormItem>

                </Form>
                <Table border :columns="columns" :data="data"></Table>
                <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" style="margin-top:10px; text-align:right"></Page>
            </Row>
        </Col>

    </Row>
</template>
<script>
    import ideaApi from '../../api/advertisement/ideaList.js';
    import fapi from '../../api/advertisement/formtemplateApi.js';
    import adapi from '../../api/advertisement/ad.js';
    export default {
        data() {
            return {
                plans: [],
                planid: '',
                columns: [
                    {
                        key: 'pageName',
                        title: '频道',
                        width: 100
                    },
                    {
                        key: 'adName',
                        title: '创意名称',
                        width: 200
                    },
                    {
                        title: '排期状态',
                        key: 'pushType',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.paiqiZhuangtai === 0) {
                                return h('div', ['未排期']);
                            } else if (params.row.paiqiZhuangtai === 1) {
                                return h('div', ['已排期']);
                            }
                        }
                    },
                    {
                        title: '广告商',
                        key: 'adCompany'
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
                                                this.$router.push({
                                                    name: 'ad_redirect',
                                                    query: {id: params.row.ideaCode}
                                                });
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
                    limit: 5,
                    planId: ''
                },
                data: [],
                total: 0
            };
        },
        methods: {
            init() {
                // this.searchData.planId = this.plandetail.planid;
                adapi.panList({}).then(response => {
                    this.plans = response.data.data;
                });

            },
            pageChange (page) {
                this.searchData.page = page;
                this.init();
            },
            sizeChange (size) {
                this.searchData.limit = size;
                this.init();
            },
            selectchange(id){
                this.searchData.planId = id;
                console.log(id)
                //positionId:
                ideaApi.ideaList(this.searchData).then(response => {
                    this.total = response.data.count;
                    this.data = response.data.data;
                });
            }
        },
        created() {
            this.init();
        }
    };
</script>

