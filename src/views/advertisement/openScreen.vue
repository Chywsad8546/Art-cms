<template>
    <Row>
        <Col span="100">
            <Card>
                <p slot="title">开屏广告列表管理</p>
                <Row class="margin-top-10 searchable-table-con1">
                    <Form  ref="searchData" :model="searchData" inline :label-width="120">
                        <FormItem label="广告标题" prop="titleName">
                            <Input v-model.trim="searchData.titleName" style="width:140px"></Input>
                        </FormItem>

                        <FormItem label="开始时间"  prop="starTime">
                            <DatePicker type="date" v-model="searchData.startTime" format="yyyy-MM-dd" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
                        </FormItem>
                        <FormItem label="结束时间"  prop="endTime">
                            <DatePicker type="date" v-model="searchData.endTime" format="yyyy-MM-dd" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
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
            <Form  ref="addNewsChannelModalform" :model="addNewsChannelModal" :rules="ruleValidate" inline :label-width="120">
                <FormItem label="广告标题" prop="adName">
                    <Input v-model.trim="addNewsChannelModal.adName" style="width:140px"></Input>
                    <input v-model.trim="addNewsChannelModal.positionId" hidden></input>
                </FormItem>

                <FormItem label="开始时间"  prop="startTime">
                    <DatePicker type="date" v-model="addNewsChannelModal.startTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="结束时间"  prop="endTime">
                    <DatePicker type="date" v-model="addNewsChannelModal.endTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
                </FormItem>


                <FormItem label="跳转链接" prop="url">
                    <Input v-model.trim="addNewsChannelModal.url" style="width:140px"></Input>
                </FormItem>

                <FormItem label="持续时间" prop="continued">
                    <InputNumber  v-model.trim="addNewsChannelModal.continued" :min="1"></InputNumber>
                </FormItem>

                <FormItem label="640*1136" prop="imgurl_640">
                    <Upload action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="false"  :default-file-list="defaultList" :on-success="getImgFileName1"  :format="['jpg','jpeg','png','gif']" :max-size="6144" >
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </FormItem>

                <FormItem label="1080*1920" prop="imgurl_1080">
                    <Upload action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="false"  :default-file-list="defaultList" :on-success="getImgFileName2"  :format="['jpg','jpeg','png','gif']" :max-size="6144" >
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </FormItem>

                <FormItem label="1242*2208" prop="imgurl_1242">
                    <Upload action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="false"  :default-file-list="defaultList" :on-success="getImgFileName3"  :format="['jpg','jpeg','png','gif']" :max-size="6144" >
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </FormItem>

                <FormItem label="480*800" prop="imgurl_480">
                    <Upload action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="false"  :default-file-list="defaultList" :on-success="getImgFileName4"  :format="['jpg','jpeg','png','gif']" :max-size="6144" >
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </FormItem>

                <FormItem label="750*1624" prop="imgurl_750">
                    <Upload action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="false"  :default-file-list="defaultList" :on-success="getImgFileName5"  :format="['jpg','jpeg','png','gif']" :max-size="6144" >
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
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
            <Form  ref="updateCahnnelValuefrom" :model="updateCahnnelValue" :rules="updateruleValidate"  inline :label-width="120">
                <FormItem label="广告标题" prop="adName">
                    <Input v-model.trim="updateCahnnelValue.adName" style="width:140px"></Input>
                    <input v-model.trim="updateCahnnelValue.positionId" hidden></input>
                </FormItem>

                <FormItem label="跳转链接" prop="url">
                    <Input v-model.trim="updateCahnnelValue.url" style="width:140px"></Input>
                </FormItem>

                <FormItem label="持续时间" prop="continued">
                    <InputNumber  v-model.trim="updateCahnnelValue.continued" :min="1"></InputNumber>
                </FormItem>

                <FormItem label="640*1136" prop="imgurl_640">
                    <Upload action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="false"  :default-file-list="defaultList" :on-success="getImgFileName1"  :format="['jpg','jpeg','png','gif']" :max-size="6144" >
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </FormItem>

                <FormItem label="1080*1920" prop="imgurl_1080">
                    <Upload action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="false"  :default-file-list="defaultList" :on-success="getImgFileName2"  :format="['jpg','jpeg','png','gif']" :max-size="6144" >
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </FormItem>

                <FormItem label="1242*2208" prop="imgurl_1242">
                    <Upload action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="false"  :default-file-list="defaultList" :on-success="getImgFileName3"  :format="['jpg','jpeg','png','gif']" :max-size="6144" >
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </FormItem>

                <FormItem label="480*800" prop="imgurl_480">
                    <Upload action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="false"  :default-file-list="defaultList" :on-success="getImgFileName4"  :format="['jpg','jpeg','png','gif']" :max-size="6144" >
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </FormItem>

                <FormItem label="750*1624" prop="imgurl_750">
                    <Upload action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="false"  :default-file-list="defaultList" :on-success="getImgFileName5"  :format="['jpg','jpeg','png','gif']" :max-size="6144" >
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </FormItem>
            </Form>
        </Modal>
    </Row>
</template>
<script>
    import api from '../../api/advertisement/openScreen.js';
    import dutil from '../../libs/util.js';
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
                        key: 'adName',
                        title: '广告标题'
                    },
                    {
                        key: 'startTime',
                        title: '起始时间'
                    },
                    {
                        key: 'endTime',
                        title: '结束时间'
                    },
                    {
                        title: '推送装态',
                        key: 'isDel',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.isDel == 0){
                                return h('div', ["发布"]);
                            }else if (params.row.isDel == 1) {
                                return h('div', ["未发布"]);
                            }
                        }
                    },
                    {
                        title: '管理',
                        key: 'action',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            var i = this;
                            var uisDel = 0;
                            if (params.row.isDel == 0){
                                uisDel = 1;
                            } else if (params.row.isDel == 1){
                                uisDel = 0;
                            }
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
                                                this.updateIsPush(params.row.id, uisDel);
                                                this.init();
                                            }
                                        }
                                    },
                                    '更改状态'
                                ),
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
                                                this.updateCahnnelValue.id = params.row.id;
                                                this.updateCahnnelValue.startTime = params.row.startTime;
                                                this.updateCahnnelValue.endTime = params.row.endTime;
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
                addNewsChannelModal: {
                    positionId: 999,
                    adName: '',
                    startTime: '',
                    endTime: '',
                    imgurl_640: '',
                    imgurl_1080: '',
                    imgurl_1242: '',
                    imgurl_480: '',
                    imgurl_750: ''
                },
                updateCahnnelValue: {
                    title: '',
                    type: ''
                },
                ruleValidate: {
                    adName: [{ required: true, message: '标题不能为空！', trigger: 'blur' }],
                    startTime: [{ required: true, type: 'date', message: '请输入开始时间', trigger: 'change' }],
                    endTime: [{ required: true, type: 'date', message: '请输入结束时间', trigger: 'change' }],
                    imgurl_640: [{ required: true, message: '请上传640尺寸图片!', trigger: 'change' }],
                    imgurl_1080: [{ required: true, message: '请上传1080尺寸图片!', trigger: 'change' }],
                    imgurl_1242: [{ required: true, message: '请上传1242尺寸图片!', trigger: 'change' }],
                    imgurl_480: [{ required: true, message: '请上传480尺寸图片!', trigger: 'change' }],
                    imgurl_750: [{ required: true, message: '请上传750尺寸图片!', trigger: 'change' }]
                },
                updateruleValidate: {
                    adName: [{ required: true, message: '标题不能为空！', trigger: 'blur' }],
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
            updateIsPush(id, isDel) {
                api.updateOpenScreen({id: id, isDel: isDel}).then(response => {
                    if (response.data.data > 0) {
                        this.$Message.success('更改成功！');
                        this.init();
                    }
                });
            },
            addNewsChannel(addChannelValue){
                this.$refs['addNewsChannelModalform'].validate((valid) => {
                    if (valid) {
                        addChannelValue.startTime = dutil.dateformat(addChannelValue.startTime,'yyyy-MM-dd hh:mm:ss');
                        addChannelValue.endTime = dutil.dateformat(addChannelValue.endTime,'yyyy-MM-dd hh:mm:ss');
                        api.addOpenScreen(addChannelValue).then(response => {
                            if (response.data.data > 0){
                                this.$Message.success('添加成功');
                                this.init();
                            }else{
                                this.$Message.error("已存在，添加失败");
                            }
                        }).catch(error => {
                            this.$Message.error(error.response.data.msg);
                            this.init();
                        });
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });

            },
            updateChannel(updateCahnnelValue){
                this.$refs['updateCahnnelValuefrom'].validate((valid) => {
                    if (valid) {
                        api.addOpenScreen(updateCahnnelValue).then(response => {
                            if (response.data.data > 0){
                                this.$Message.success('更改成功！');
                                this.init();
                            }else{
                                this.$Message.error("更改失败！");
                            }
                        }).catch(error => {
                            this.$Message.error(error.response.data.msg);
                            this.init();
                        });
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });
            },
            handleSearch () {
                if (typeof this.searchData.startTime != "string"){
                    this.searchData.startTime = dutil.dateformat(this.searchData.startTime, 'yyyy-MM-dd');
                }

                if (typeof this.searchData.endTime != "string"){
                    this.searchData.endTime = dutil.dateformat(this.searchData.endTime, 'yyyy-MM-dd');
                }
                this.searchData.page = 1;
                this.init();
            },
            handleCancel (name) {
                this.$refs[name].resetFields();
                this.searchData.page = 1;
                this.init();
            },
            getImgFileName1(response, file, fileList){
                console.log(response.data);
                this.$Message.success('上传成功');
                this.addNewsChannelModal.imgurl_640 = response.data;
                this.updateCahnnelValue.imgurl_640 = response.data;
            },
            getImgFileName2(response, file, fileList){
                console.log(response.data);
                this.$Message.success('上传成功');
                this.addNewsChannelModal.imgurl_1080 = response.data;
                this.updateCahnnelValue.imgurl_1080 = response.data;
            },
            getImgFileName3(response, file, fileList){
                console.log(response.data);
                this.$Message.success('上传成功');
                this.addNewsChannelModal.imgurl_1242 = response.data;
                this.updateCahnnelValue.imgurl_1242 = response.data;
            },
            getImgFileName4(response, file, fileList){
                console.log(response.data);
                this.$Message.success('上传成功');
                this.addNewsChannelModal.imgurl_480 = response.data;
                this.updateCahnnelValue.imgurl_480 = response.data;
            },
            getImgFileName5(response, file, fileList){
                console.log(response.data);
                this.$Message.success('上传成功');
                this.addNewsChannelModal.imgurl_750 = response.data;
                this.updateCahnnelValue.imgurl_750 = response.data;
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

