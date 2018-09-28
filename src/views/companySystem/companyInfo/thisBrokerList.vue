<template>
    <Row>
        <Col span="100">
        <Card>
            <p slot="title">经纪人管理列表</p>
            <Row class="margin-top-10 searchable-table-con1">
                <Table border :columns="columns" :data="data"></Table>
                <Page :total="total" show-total  style="margin-top:10px; text-align:right"></Page>
            </Row>
        </Card>
        </Col>
    </Row>
</template>
<script>
    import api from '../../../api/company/index.js';

    export default {
        name: 'thisBrokerList',
        data () {
            return {
                columns: [
                    {
                        key: 'agentName',
                        title: '真实名称'
                    },
                   /* {
                        title: '管理',
                        key: 'action',
                        width: 90,
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
                                                    name: 'brokerDetail',
                                                    params: {agentId: params.row.agentId}
                                                });
                                            }
                                        }
                                    },
                                    '详情'
                                )
                            ]);
                        }
                    }*/
                ],
                searchData: {
                },
                data: [],
                initTable: [],
                total: 0
            };
        },
     /*   mounted: function() {

        },*/
        methods: {
            init () {
                this.searchData=this.$route.params;
                //console.log(this.searchData);

                api.getListCorp(this.searchData).then(response => {
                    this.data = this.conversionData(response.data.data.data);
                    this.total = response.data.data.total;
                   // console.log(this.data);
                })
            },
            //返回的数据转换成json
            conversionData(val){
                var res =[];
                for(let i =0 ;i< val.length;i++){
                    let item ={agentName : val[i]};
                    res.push(item);
                }
                return res;
            },
        },
        created () {
            this.init();
        }
    };
</script>
