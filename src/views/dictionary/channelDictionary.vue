<template>
    <Row>
        <Col span="100">
            <Card>
                <p slot="title">标签列表管理</p>
                <Row class="margin-top-10 searchable-table-con1">
                    <Form  ref="searchData" :model="searchData" inline :label-width="120">
                        <FormItem label="标签分类" prop="type">
                            <Select v-model="searchData.type" style="width:140px">
                                <Option value="政策市场">政策市场</Option>
                                <Option value="买房助手">买房助手</Option>
                                <Option value="轻松一刻">轻松一刻</Option>
                            </Select>
                        </FormItem>
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

        <Modal v-model="isTrueAddTag" width="360" @on-ok="addNewsChannel(addNewsChannelModal)">
            <Form  ref="addNewsChannelModal" :model="addNewsChannelModal" inline :label-width="120">
                <FormItem label="栏目标题" prop="title">
                    <Input v-model.trim="addNewsChannelModal.title" style="width:140px"></Input>
                </FormItem>
                    <FormItem label="标签分类" prop="type">
                        <Select v-model="addNewsChannelModal.type" style="width:140px">
                            <Option value="政策市场">政策市场</Option>
                            <Option value="买房助手">买房助手</Option>
                            <Option value="轻松一刻">轻松一刻</Option>
                        </Select>
                    </FormItem>

                <FormItem label="栏目内容" prop="desc">
                    <Input v-model.trim="addNewsChannelModal.desc" style="width:140px"></Input>
                </FormItem>
                   <Input type="hidden" v-model.trim="addNewsChannelModal.icon" style="width:140px"></Input>
                <FormItem label="栏目icon" prop="icon">
                    <Upload action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="false"  :default-file-list="defaultList" :on-success="getImgFileName"  :format="['jpg','jpeg','png','gif']" :max-size="6144" >
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传icon</Button>
                    </Upload>
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

        <Modal v-model="modal2" width="360" @on-ok="updateChannel(updateCahnnelValue)">
            <Form  ref="updateCahnnelValue" :model="updateCahnnelValue" inline :label-width="120">
                <FormItem label="标签标题" prop="title">
                    <input v-model.trim="updateCahnnelValue.id" hidden />
                    <Input v-model.trim="updateCahnnelValue.title" style="width:140px"></Input>
                </FormItem>
                <FormItem label="标签分类" prop="type">
                    <Select v-model="updateCahnnelValue.type" style="width:140px">
                        <Option value="政策市场">政策市场</Option>
                        <Option value="买房助手">买房助手</Option>
                        <Option value="轻松一刻">轻松一刻</Option>
                    </Select>
                </FormItem>
                <FormItem label="标签内容" prop="title">
                    <Input v-model.trim="updateCahnnelValue.desc" style="width:140px"></Input>
                </FormItem>
                <FormItem label="栏目icon" prop="icon">
                    <Upload action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="false"  :default-file-list="defaultList" :on-success="getImgFileName"  :format="['jpg','jpeg','png','gif']" :max-size="6144" >
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传icon</Button>
                    </Upload>
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
    import apiDictionary from '../../api/dictionary/channelDictionary.js';
    export default {
        data() {
            return {
                defaultList:[],
                columns: [
                    {
                        key: 'id',
                        title: '标签Id',
                        width: 100
                    },
                    {
                        key: 'type',
                        title: '栏目分类',
                    },
                    {
                        key:'title',
                        title:'栏目标题'
                    },
                    {
                        key: 'desc',
                        title: '栏目内容'
                    },
                    {
                        title: '图标',
                        key: 'action',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: this.$imgurl(params.row.icon,"")
                                    },
                                    style: {
                                        width: '40px',
                                        height: '40px'
                                    }
                                }),
                            ]);
                        }
                    },
                    {
                        key: 'icon',
                        title: 'icon名称'
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
                                                this.updateCahnnelValue.title = params.row.title;
                                                this.updateCahnnelValue.desc = params.row.desc;
                                                this.updateCahnnelValue.id = params.row.id;
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
                    title: '',
                    type:'',
                },
                data: [],
                initTable: [],
                total: 0,
                modal2: false,
                isTrueAddTag:false,
                modal_loading: false,
                updateCahnnelValue:{
                    title: '',
                    type:'',
                },
                addNewsChannelModal:{
                    title: '',
                    type:'',
                },
            };
        },
        methods: {
            init(){
                apiDictionary.getChannelDictionaryList(this.searchData).then(response => {
                    //console.log(response.data.data);
                    this.total=response.data.count;
                    this.data=response.data.data;
                    //console.log(response.data.data);
                });
            },
            addNewsChannel(addChannelValue){
                apiDictionary.addNewsChannelApi(addChannelValue).then(response => {
                    if (response.data.data > 0){
                        this.$Message.success('添加成功');
                        this.init();
                    }
                });
            },
            updateChannel(updateCahnnelValue){
                apiDictionary.updataNewsChannelApi(updateCahnnelValue).then(response => {
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
            getImgFileName(response, file, fileList){
                console.log(response.data);
                this.addNewsChannelModal.icon = response.data;
                this.updateCahnnelValue.icon = response.data;
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
