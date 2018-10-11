<template>
    <Row>
        <Col span="100">
            <Card>
                <p slot="title">标签列表管理</p>
                <Row class="margin-top-10 searchable-table-con1">
                    <Form  ref="searchData" :model="searchData" inline :label-width="120">
                        <FormItem label="标签内容" prop="title">
                            <Input v-model.trim="searchData.title" style="width:140px"></Input>
                        </FormItem>

            <!--            <FormItem label="名片认证状态" prop="businessCardAuth">
                            <Select v-model="searchData.businessCardAuth" style="width:140px">
                                <Option value="">全部</Option>
                                <Option value="0">未认证</Option>
                                <Option value="1">认证中</Option>
                                <Option value="2">认证通过</Option>
                                <Option value="3">认证不通过</Option>
                            </Select>
                        </FormItem>-->
                        <FormItem>
                            <Button type="primary" @click="handleSearch('searchData')">搜索</Button>
                            <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
                        </FormItem>

                        <FormItem>
                            <Button type="primary" @click="isTrueAddTag = true">添加</Button>
                        </FormItem>
                    </Form>

                    <Table border :columns="columns" :data="data"></Table>
                    <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" style="margin-top:10px; text-align:right"></Page>
                </Row>
            </Card>

        </Col>

        <Modal v-model="isTrueAddTag" width="360" @on-ok="addNewsTag(addNewsTagModal)">
            <Form  ref="addNewsTagModal" :model="addNewsTagModal" inline :label-width="120">
                <FormItem label="标签内容" prop="title">
                    <Input v-model.trim="addNewsTagModal.title" style="width:140px"></Input>
                </FormItem>
                <!--            <FormItem label="名片认证状态" prop="businessCardAuth">
                                <Select v-model="searchData.businessCardAuth" style="width:140px">
                                    <Option value="">全部</Option>
                                    <Option value="0">未认证</Option>
                                    <Option value="1">认证中</Option>
                                    <Option value="2">认证通过</Option>
                                    <Option value="3">认证不通过</Option>
                                </Select>
                            </FormItem>-->
            </Form>
        </Modal>

        <Modal v-model="modal2" width="360" @on-ok="updateTag(updateTagValue)">
            <Form  ref="updateTagValue" :model="updateTagValue" inline :label-width="120">
                <FormItem label="标签内容" prop="title">
                    <input v-model.trim="updateTagValue.id" hidden />
                    <Input v-model.trim="updateTagValue.title" style="width:140px"></Input>
                </FormItem>
                <!--            <FormItem label="名片认证状态" prop="businessCardAuth">
                                <Select v-model="searchData.businessCardAuth" style="width:140px">
                                    <Option value="">全部</Option>
                                    <Option value="0">未认证</Option>
                                    <Option value="1">认证中</Option>
                                    <Option value="2">认证通过</Option>
                                    <Option value="3">认证不通过</Option>
                                </Select>
                            </FormItem>-->
            </Form>
        </Modal>
    </Row>
</template>
<script>
    import api from '../../api/system/index.js';
    import apiDictionary from '../../api/dictionary/tagDictionary.js';
    export default {
        data() {
            return {
                columns: [
                    {
                        key: 'id',
                        title: '标签Id',
                        width: 100
                    },
                    {
                        key:'title',
                        title:'标签内容'
                    },
                    {
                        key: 'createAt',
                        title: '创建日期'
                    },
                    {
                        key:'modifyAt',
                        title:'验证日期'
                    },
                    /*{
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
                                                this.updateTagValue.title = params.row.title;
                                                this.updateTagValue.id = params.row.id;
                                              i.modal2 = true;
                                            }
                                        }
                                    },
                                    '修改'
                                )
                            ]);
                        }
                    }*/
                ],
                searchData: {
                    title: '',
                },
                data: [],
                initTable: [],
                total: 0,
                modal2: false,
                isTrueAddTag:false,
                modal_loading: false,
                updateTagValue:{
                    title: '',
                },
                addNewsTagModal:{
                    title: '',
                },
            };
        },
        methods: {
            init(){
                apiDictionary.getTagDictionaryList(this.searchData).then(response => {
                    //console.log(response.data.data);
                    this.total=response.data.count;
                    this.data=response.data.data;
                    //console.log(response.data.data);
                });
            },
            addNewsTag(addTagValue){
                apiDictionary.addNewsTagApi(addTagValue).then(response => {
                    if (response.data.data > 0){
                        this.$Message.success('添加成功');
                        this.init();
                    }
                });
            },
            updateTag(updateTagValue){
                apiDictionary.updateTagById(updateTagValue).then(response => {
                    if (response.data.data > 0){
                        this.$Message.success('修改成功');
                        this.init();
                    }
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
