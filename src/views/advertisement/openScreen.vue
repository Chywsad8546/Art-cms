<template>
    <Row>
        <Col span="100">
            <Card>
                <p slot="title">推送列表管理</p>
                <Row class="margin-top-10 searchable-table-con1">
                    <Form  ref="searchData" :model="searchData" inline :label-width="120">
                        <FormItem label="消息标题" prop="title">
                            <Input v-model.trim="searchData.title" style="width:140px"></Input>
                        </FormItem>

                        <FormItem label="推送状态" prop="isPush">
                            <Select v-model="searchData.isPush" style="width:140px">
                                <Option value="0">未推送</Option>
                                <Option value="1">推送成功</Option>
                                <Option value="2">推送失败</Option>
                            </Select>
                        </FormItem>

                        <FormItem label="政策类型" prop="pushType">
                            <Select v-model="searchData.pushType" style="width:140px">
                                <Option value="1">政策知识</Option>
                                <Option value="2">热点新闻</Option>
                            </Select>
                        </FormItem>

                        <FormItem label="开始时间"  prop="starTime">
                            <DatePicker type="date" v-model="searchData.startTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
                        </FormItem>
                        <FormItem label="结束时间"  prop="endTime">
                            <DatePicker type="date" v-model="searchData.endTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
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
                <FormItem label="消息标题" prop="title">
                    <Input v-model.trim="addNewsChannelModal.title" style="width:140px"></Input>
                    <input v-model.trim="addNewsChannelModal.positionId" hidden></input>
                </FormItem>

                <FormItem label="推送时间"  prop="starTime">
                    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" v-model="addNewsChannelModal.pushTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
                </FormItem>

                <FormItem label="推送类型" prop="type">
                    <Select v-model="addNewsChannelModal.pushType" style="width:140px">
                        <Option value="1">政策知识</Option>
                        <Option value="2">热点新闻</Option>
                    </Select>
                </FormItem>

                <FormItem label="跳转链接" prop="desc">
                    <Input v-model.trim="addNewsChannelModal.pushLink" style="width:140px"></Input>
                </FormItem>
                <FormItem label="图片" prop="icon">
                    <Upload action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="false"  :default-file-list="defaultList" :on-success="getImgFileName"  :format="['jpg','jpeg','png','gif']" :max-size="6144" >
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </FormItem>

                <FormItem label="摘要" prop="desc">
                    <Input type="textarea" v-model.trim="addNewsChannelModal.summary"></Input>
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
                <FormItem label="消息标题" prop="title">
                    <Input v-model.trim="updateCahnnelValue.title" style="width:140px"></Input>
                    <input v-model.trim="updateCahnnelValue.positionId" hidden></input>
                </FormItem>

                <FormItem label="推送时间"  prop="pushTime">
                    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" v-model="updateCahnnelValue.pushTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
                </FormItem>

                <FormItem label="推送类型" prop="pushType">
                    <Select v-model="updateCahnnelValue.pushType" style="width:140px">
                        <Option :value=1>政策知识</Option>
                        <Option :value=2>热点新闻</Option>
                    </Select>
                </FormItem>

                <FormItem label="跳转链接" prop="desc">
                    <Input v-model.trim="updateCahnnelValue.pushLink" style="width:140px"></Input>
                </FormItem>
                <FormItem label="图片" prop="icon">
                    <Upload action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="false"  :default-file-list="defaultList" :on-success="getImgFileName"  :format="['jpg','jpeg','png','gif']" :max-size="6144" >
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </FormItem>

                <FormItem label="摘要" prop="desc">
                    <Input type="textarea" v-model.trim="updateCahnnelValue.summary"></Input>
                </FormItem>
            </Form>
        </Modal>
    </Row>
</template>
<script>
    import api from '../../api/advertisement/openScreen.js';
    import dutil from '../../libs/util.js';
    import apiDictionary from '../../api/dictionary/channelDictionary.js';
    export default {
        data() {
            return {
                defaultList: [],
                columns: [
                    {
                        key: 'id',
                        title: '标签Id',
                        width: 100
                    },
                    {
                        key: 'title',
                        title: '标题'
                    },
                    {
                        key: 'pushTime',
                        title: '推送日期'
                    },
                    {
                        key: 'createTime',
                        title: '创建日期'
                    },
                    {
                        title: '推送装态',
                        key: 'isPush',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.isPush == 0){
                                return h('div', ["未推送"]);
                            }else if (params.row.isPush == 1) {
                                return h('div', ["成功"]);
                            }else if (params.row.isPush == 2){
                                return h('div', ["失败"]);
                            }
                        }
                    },
                    {
                        title: '推送类型',
                        key: 'pushType',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.pushType == 1) {
                                return h('div', ["政策知识"]);
                            }else if (params.row.pushType == 2){
                                return h('div', ["热点新闻"]);
                            }
                        }
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
                                        src: this.$imgurl(params.row.imgurl,"")
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
                                                this.updateCahnnelValue.pushTime = params.row.pushTime;
                                                this.updateCahnnelValue.pushType = params.row.pushType;
                                                this.updateCahnnelValue.imgurl = params.row.imgurl;
                                                this.updateCahnnelValue.pushLink = params.row.pushLink;
                                                this.updateCahnnelValue.summary = params.row.summary;
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
                },
                data: [],
                initTable: [],
                total: 0,
                modal2: false,
                isTrueAddTag: false,
                modal_loading: false,
                updateCahnnelValue: {
                    title: '',
                    type: ''
                },
                addNewsChannelModal: {
                    title: '',
                    type: '',
                    positionId:900
                }
            };
        },
        methods: {
            init(){
                api.getOpenScreenList(this.searchData).then(response => {
                    //console.log(response.data.data);
                    this.total=response.data.count;
                    this.data=response.data.data;
                    //console.log(response.data.data);
                });
            },
            addNewsChannel(addChannelValue){
                addChannelValue.pushTime = dutil.dateformat(addChannelValue.pushTime,'yyyy-MM-dd hh:mm:ss');
                api.addAppPush(addChannelValue).then(response => {
                    if (response.data.data > 0){
                        this.$Message.success('添加成功');
                        this.init();
                    }
                });
            },
            updateChannel(updateCahnnelValue){
                updateCahnnelValue.pushTime = dutil.dateformat(updateCahnnelValue.pushTime,'yyyy-MM-dd hh:mm:ss');
                console.log(updateCahnnelValue)
                api.updateAppPush(updateCahnnelValue).then(response => {
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
            getImgFileName(response, file, fileList){
                console.log(response.data);
                this.$Message.success('上传成功');
                this.addNewsChannelModal.imgurl = response.data;
                this.updateCahnnelValue.imgurl = response.data;
            },
            pageChange (page) {
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

