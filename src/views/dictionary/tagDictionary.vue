<template>
    <Row>
        <Col span="100">
        <Card>
            <p slot="title">标签列表管理</p>
            <Row class="margin-top-10 searchable-table-con1">
                <Form ref="searchData" :model="searchData" inline :label-width="120">
                    <FormItem label="标签内容" prop="title">
                        <Input v-model.trim="searchData.title" style="width:140px"></Input>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" @click="handleSearch('searchData')">搜索</Button>
                        <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" @click="isTrueAddTag = true">添加</Button>
                    </FormItem>
                </Form>

                <Table border :columns="columns" :data="data"></Table>
                <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange"
                      style="margin-top:10px; text-align:right"></Page>
            </Row>
        </Card>

        </Col>

        <Modal v-model="isTrueAddTag" width="360" @on-ok="addNewsTag(addNewsTagModal)">
            <Form ref="addNewsTagModal" :model="addNewsTagModal" inline :label-width="120">
                <FormItem label="标签类型" prop="title">
                    <Select v-model="addNewsTagModal.type" style="width:140px">
                        <Option value="1">房产类型</Option>
                        <Option value="2">城市</Option>
                        <Option value="3">区县</Option>
                        <Option value="4">房企</Option>
                        <Option value="5">户型</Option>
                        <Option value="6">定向匹配</Option>
                        <Option value="7">内容关键词</Option>
                    </Select>
                </FormItem>
                <FormItem label="城市" v-show="addNewsTagModal.type === '3'">
                    <Select v-model="addNewsTagModal.parentId" style="width:140px">
                        <Option v-for="item in cityData" :value="item.id">{{ item.title }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="标签内容">
                    <Input v-model.trim="addNewsTagModal.title" style="width:140px"></Input>
                </FormItem>
            </Form>
        </Modal>

        <Modal v-model="modal2" width="360" @on-ok="updateTag(updateTagValue)">
            <Form ref="updateTagValue" :model="updateTagValue" inline :label-width="120">
                <FormItem label="标签类型" prop="title">
                    <Select v-model="updateTagValue.type" style="width:140px">
                        <Option value="1">房产类型</Option>
                        <Option value="2">城市</Option>
                        <Option value="3">区县</Option>
                        <Option value="4">房企</Option>
                        <Option value="5">户型</Option>
                        <Option value="6">定向匹配</Option>
                        <Option value="7">内容关键词</Option>
                    </Select>
                </FormItem>
                <FormItem label="城市" v-show="updateTagValue.type === '3'">
                    <Select v-model="updateTagValue.parentId" style="width:140px">
                        <Option v-for="item in cityData" :value="item.id">{{ item.title }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="标签内容" prop="title">
                    <input v-model.trim="updateTagValue.id" hidden/>
                    <input v-model.trim="updateTagValue.title" style="width:140px"></input>
                </FormItem>
            </Form>
        </Modal>
    </Row>
</template>
<script>
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
                        key: 'title',
                        title: '标签内容'
                    },
                    {
                        key: 'createAt',
                        title: '创建日期'
                    },
                    {
                        title: '操作',
                        render: (h, params) => {
                            return h(
                                'a', {
                                    on: {
                                        click: () => {
                                            this.selectTag({
                                                id: params.row.id
                                            });
                                        }
                                    }
                                },
                                '修改'
                            );
                        }
                    }
                ],
                searchData: {
                    title: '',
                    pageNum: 1,
                    pageSize: 10
                },
                data: [],
                cityData: [],
                initTable: [],
                total: 0,
                modal2: false,
                isTrueAddTag: false,
                modal_loading: false,
                updateTagValue: {
                    id: 0,
                    title: '',
                    type: 0,
                    parentId: 0
                },
                addNewsTagModal: {
                    title: '',
                    type: 0,
                    parentId: 0
                }
            };
        },
        methods: {
            init() {
                apiDictionary.getTagDictionaryList(this.searchData).then(response => {
                    this.total = response.data.count;
                    this.data = response.data.data;
                });
                apiDictionary.getTagDictionaryList({type: 2}).then(response => {
                    this.cityData = response.data.data;
                });
            },
            addNewsTag(addTagValue) {
                apiDictionary.addNewsTagApi(addTagValue).then(response => {
                    if (response.data.data > 0) {
                        this.$Message.success('添加成功');
                        this.init();
                    }
                });
            },
            updateTag(updateTagValue) {
                apiDictionary.updateTagById(updateTagValue).then(response => {
                    if (response.data.data > 0) {
                        this.$Message.success('修改成功');
                        this.init();
                    }
                });
            },
            selectTag(updateTagValue) {
                // alert(updateTagValue);
                apiDictionary.getTagDictionaryDetail(updateTagValue).then(response => {
                    this.updateTagValue = response.data.data;
                    this.updateTagValue.type = this.updateTagValue.type.toString();
                    this.updateTagValue.parentId = this.updateTagValue.parentId.toString();
                    this.modal2 = true;
                });
            },
            handleSearch() {
                this.searchData.pageNum = 1;
                this.init();
            },
            handleCancel(name) {
                this.$refs[name].resetFields();
                this.searchData.pageNum = 1;
                this.init();
            },
            pageChange(page) {
                this.searchData.pageNum = page;
                this.init();
            },
            sizeChange(size) {
                this.searchData.pageSize = size;
                this.init();
            }
        },
        created() {
            this.init();
        }
    };
</script>
