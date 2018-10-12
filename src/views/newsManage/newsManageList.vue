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

        <Modal v-model="isTrueAddTag" width="360" @on-ok="addNewsChannel(addNewsChannelModal)">
            <Form  ref="addNewsChannelModal" :model="addNewsChannelModal" inline :label-width="120">
                <FormItem label="栏目标题" prop="title">
                    <Input v-model.trim="addNewsChannelModal.title" style="width:140px"></Input>
                </FormItem>
                <FormItem label="栏目内容" prop="desc">
                    <Input v-model.trim="addNewsChannelModal.desc" style="width:140px"></Input>
                </FormItem>
                <FormItem label="icon名称" prop="title">
                    <Input v-model.trim="addNewsChannelModal.icon" style="width:140px"></Input>
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

        <Modal v-model="modal2" width="360" @on-ok="updateChannel(updateCahnnelValue)">
            <Form  ref="updateCahnnelValue" :model="updateCahnnelValue" inline :label-width="120">
                <FormItem label="标签标题" prop="title">
                    <input v-model.trim="updateCahnnelValue.id" hidden />
                    <Input v-model.trim="updateCahnnelValue.title" style="width:140px"></Input>
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
    import apiDictionary from '../../api/newsManageme/newsManageme.js';
    export default {
        data() {
            return {
                defaultList:[],
                columns: [
                    {
                        key: 'id',
                        title: 'id',
                        width: 100
                    },
                    {
                        key: 'title',
                        title: '标题'
                    },
                    {
                        title: '标题',
                        render: (h, params) => {
                           var type = params.row.type;
                           if (type == 0){
                               return h('div', [
                                   "图文"
                               ]);
                           } else  if (type == 1){
                               return h('div', [
                                   "图集"
                               ]);
                           }else  if (type == 2){
                               return h('div', [
                                   "横版视频"
                               ]);
                           }else  if (type == 3){
                               return h('div', [
                                   "竖版视频"
                               ]);
                           }
                        }
                    },
                    {
                        title: '栏目',
                        render: (h, params) => {
                            var topic = params.row.topicName;
                            var topicNameResult=" ";
                            if (topic != null){
                                for (var i =0;i<topic.length;i++){
                                    if (i != 0){
                                        topicNameResult +=",";
                                    }
                                    topicNameResult += topic[i];
                                }
                            }
                            return h('div', topicNameResult);
                        }
                    },
                    {
                        title: '状态',
                        render: (h, params) => {
                            var status = params.row.isPublish;
                            if (status == 0){
                                return h('div', [
                                    "待发布"
                                ]);
                            } else  if (status == 1){
                                var statusString = "已发布"
                                if (params.row.isTop == 1){
                                    statusString+=",已置顶"
                                }
                                return h('div', statusString);
                            }else  if (status == 2){
                                return h('div', [
                                    "已撤稿"
                                ]);
                            }else  if (status == 3){
                                return h('div', [
                                    "草稿"
                                ]);
                            }
                        }
                    },
                    {
                        title: '编辑',
                        render: (h, params) => {
                            return h('div', params.row.sysUser.userName);
                        }
                    },
                    {
                        key: 'sort',
                        width: 80,
                        title: '排序'
                    },
                    {
                        key: 'publishAt',
                        title: '发布时间'
                    },
                    {
                        title: '管理',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            var i = this;
                            var guanliOpration=[h(
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
                                                name: 'releaseArticle',
                                                query: {newsId: params.row.id}
                                            });
                                        }
                                    }
                                },
                                '修改'
                            )];
                            if(params.row.isTop == 0){
                                guanliOpration.push(h(
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
                                                apiDictionary.setArticleIsTop({id:params.row.id}).then(response => {
                                                    if (response.data.code == "success"){
                                                        this.$Message.success('添加置顶成功');
                                                        this.init();
                                                    }
                                                }).catch(error =>{
                                                    console.log(error);
                                                    //this.$Message.error(error.msg);
                                                    this.init();
                                                });
                                            }
                                        }
                                    },
                                    '置顶'
                                ));
                            }else if (params.row.isTop == 1){
                                guanliOpration.push(h(
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
                                                apiDictionary.removeArticleIsTop({id:params.row.id}).then(response => {
                                                    if (response.data.code == "success"){
                                                        this.$Message.success('取消置顶成功');
                                                        this.init();
                                                    }
                                                }).catch(error =>{
                                                    console.log(error);
                                                    this.init();
                                                });
                                            }
                                        }
                                    },
                                    '取消置顶'
                                ));
                            }
                             if (params.row.isPublish != 2){
                                      guanliOpration.push(h(
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
                                                      apiDictionary.removePublishArticle({id:params.row.id,isPublish:2}).then(response => {
                                                          if (response.data.code == "success"){
                                                              this.$Message.success('添加置顶成功');
                                                              this.init();
                                                          }
                                                      });
                                                  }
                                              }
                                          },
                                          '撤稿'
                                      ))
                             }
                            return h('div',guanliOpration);
                        }
                    }
                ],
                searchData: {

                },
                data: [],
                initTable: [],
                total: 0,
                modal2: false,
                isTrueAddTag:false,
                modal_loading: false,
                updateCahnnelValue:{
                    title: '',
                },
                addNewsChannelModal:{
                    title: '',
                },
            };
        },
        methods: {
            init(){
                apiDictionary.getNewsManagemeList(this.searchData).then(response => {
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
