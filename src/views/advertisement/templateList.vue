<template>
<div>
    <Table border :columns="columns7" :data="templateListData"></Table>
    <Page :total="total"  @on-change="pageChange" ></Page>
</div>
    <!-- <Page :total="total"  @on-change="pageChange" style="margin-top:10px; text-align:right"></Page> -->
</template>

<script>
    import api from '../../api/advertisement/formtemplateApi.js';
    export default {
        data () {
            return {
                form: {
                    id:""
                },
                columns7: [
                    {
                        title: 'id',
                        key: 'id',
                    },
                    {
                        title: '模板类型',
                        key: 'name'
                    },
                    {
                        title: '位置名称',
                        key: 'positionName'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteTemplate(params.row.id);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                total:0,
                tempList:{
                    pageNum:1
                },
                templateListData: []
            }
        },
        methods: {
            pageChange(page){
                this.tempList.pageNum = page;
                this.templateList();
            },
            deleteTemplate(id){
                this.form.id = id;
                api.deleteTemplate(this.form).then(response => {
                    this.$Message.success("删除成功"); 
                    this.templateList();
                });  
            },
            templateList(){
                api.templateList(this.tempList).then(response => {
                    this.templateListData = response.data.data;
                    this.total = response.data.count;
                });                   
            }
        },
        created: function () {
            this.templateList();
        }
    }
</script>

<style>
.optionsHeight textarea.ivu-input {
        height: 200px;
}
</style>