<template>
    <Card span="100">
        <p slot="title">企业详情</p>
        <div style="line-height:2.4rem">
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                企业名称 </Col>
                <Col span="7" offset="0">
                <Input v-model="data.corpName"/>
                </Col>
                <Col span="4" offset="0">
                <router-link :to="{name:'org',query: {corpId: resetPwdData.corpId}}">查看完整组织架构</router-link>
                </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                层级 </Col>
                <Col offset="0">
                {{data.corpLevel}} </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                城市 </Col>
                <Col offset="0">
                {{data.cityName}} </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                公司简称 </Col>
                <Col span="10" offset="0">
                <Input v-model="data.corpShortName"/>
                </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                下级企业数 </Col>
                <Col offset="0">
                {{data.subCorpNum}} </Col>
                <Col offset="0">
                <router-link :to="{name:'org',query: {corpId: resetPwdData.corpId}}">查看完整组织架构</router-link>
                </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                地址 </Col>
                <Col span="10" offset="0">
                <Input v-model="data.corpAddress"/>
                </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                企业logo </Col>
                <Col offset="0">
                <div class="imgPhoto">
                    <p v-if="data.corpLogo!=''">
                        <img :src="$imgurl(data.corpLogo,'agent300x400')" alt="" @click="handleView" class="corpLogo">
                    </p>
                    <p v-else class="defaultLogo"></p>
                </div>
                <div>
                    <Upload action="/v1.0.0/sys/uploadImage" :show-upload-list="false" :on-success="handleSuccess"
                            :format="['jpg','jpeg','png','gif']" :max-size="6144" :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize">
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传企业logo</Button>
                    </Upload>
                </div>
                <Modal title="View Image" v-model="visible">
                    <img :src="$imgurl(data.corpLogo,'agent300x400')" v-if="visible" style="width: 100%">
                </Modal>
                </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                经纪人数 </Col>
                <Col offset="0">
                {{data.count}} </Col>
                <Col span="4" offset="0">
                <a @click="agentList()" v-if="data.count > 0">查看经纪人名单</a>
                </Col>

            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                企业账号 </Col>
                <Col offset="0">
                {{data.userName}} <span :style="{color:statusColor}">({{data.accountStatus}})</span> </Col>
                <Col span="4" offset="0">
                <a v-if="data.userName" @click="isOpenModel(data.accountStatus)">账号状态管理</a>
                <a v-else @click="createCorp=true">创建账号</a>
                </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                企业安全手机 </Col>
                <Col offset="0">
                {{data.corpSafePhone||"未设置安全手机" }} </Col>
                <Col offset="0">
                <a v-if="data.corpSafePhone" @click="modal6=true">修改安全手机</a>
                </Col>
                <Col offset="0">
                <Button v-if="data.userName" type="primary" @click="updatePwd">修改密码</Button>
                </Col>
                <Col offset="0">
                <Button v-if="data.corpSafePhone" type="primary" @click="resetUpdatePwd">重置密码</Button>
                </Col>
                <Modal v-model="modalPwd" title="修改密码" @on-ok="resetPwd()">
                    <Form ref="resetPwdData" :model="resetPwdData" :rules="rulesResetPwd" inline :label-width="100">
                        <FormItem label="新登录密码" prop="pwd">
                            <Input type="password" v-model="resetPwdData.pwd"/>
                        </FormItem>
                    </Form>
                </Modal>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                企业营业执照 </Col>
                <Col offset="0">
                <img width="228" height="322"
                     v-if="data.businessCardPhoto"
                     :src="$imgurl(data.businessCardPhoto,'agent570x805')" alt="">
                <uploadimg v-if="data.businessCardAuth===0||data.businessCardAuth===3" :ratio="570/805"
                           @uploadimg="uploadimg"
                           action="/v1.0.0/sys/uploadImage">
                    <Button type="ghost" icon="ios-cloud-upload-outline">选择图片</Button>
                </uploadimg>
                <Button v-if="data.businessCardAuth===0||data.businessCardAuth===3"
                        style="margin-top:20px" type="primary" @click="updateBusinessCardAuthorizationInfo">提交认证
                </Button>
                </Col>
                <Col offset="0">
                <Button v-if="data.businessCardPhoto&&data.businessCardAuth===1" type="primary"
                        @click="updateBusinessCardAuth(2)">通过审核
                </Button>
                </Col>
                <Col offset="0">
                <Button v-if="data.businessCardPhoto&&data.businessCardAuth===1" type="primary"
                        @click="updateBusinessCardAuth(3)">不通过审核
                </Button>
                </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                最近登录时间 </Col>
                <Col offset="0">
                {{data.lastLoginTime}} </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                账号创建时间 </Col>
                <Col offset="0">
                {{data.createTime}} </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                账号创建人</Col>
                <Col offset="0">
                {{data.creator}}</Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                最近修改时间</Col>
                <Col offset="0">
                {{data.updateTime}}</Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                最近修改人 </Col>
                <Col offset="0">
                {{data.updater}} </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4">
                </Col>
                <Col offset="0">
                <Button type="primary" @click="handleSubmit()" size="large"> 确 定</Button>
                </Col>
            </Row>
        </div>
        <Modal title="账号状态管理" v-model="modal2" class-name="vertical-center-modal" @on-ok="isOpen('resetStatusData')">
            <Form ref="resetStatusData" :model="resetStatusData" inline :label-width="100">
                <FormItem label="登录密码">
                    <Input type="password" v-model="resetStatusData.pwd"/>
                </FormItem>
                <FormItem label="账号状态">
                    <RadioGroup v-model="resetStatusData.status">
                        <Radio label="1">未开通</Radio>
                        <span></span>
                        <Radio label="0">已开通</Radio>
                        <span></span>
                    </RadioGroup>
                </FormItem>
            </Form>
        </Modal>
        <Modal title="修改安全手机" v-model="modal6" class-name="vertical-center-modal"
               @on-ok="modifyCorpTel('modifyTelForm')">
            <Form ref="modifyTelForm" :model="modifyTelData" :rules="rulesTel" :label-width="100" style="width:80%">
                <FormItem label="登录密码" prop="pswd">
                    <Input type="password" v-model="modifyTelData.pswd"/>
                </FormItem>
                <FormItem label="新安全手机号" prop="safePhone">
                    <Input v-model="modifyTelData.safePhone"/>
                </FormItem>
            </Form>
        </Modal>
        <Modal title="创建账号" v-model="createCorp" class-name="vertical-center-modal" @on-ok="setCorp">
            <Form ref="createCorpData" :model="createCorpData" :rules="rulesTel" inline :label-width="100">
                <FormItem label="企业账号">
                    <Input v-model="createCorpData.userName"/>
                </FormItem>
                <FormItem label="安全手机号" prop="corpsafePhone">
                    <Input v-model="createCorpData.corpsafePhone"/>
                </FormItem>
            </Form>
        </Modal>
    </Card>
</template>

<script>
    import api from "../../../api/company/index.js";
    import uploadimg from '../../my-components/upLoad';

    export default {
        name: "companyDetail_city",
        data() {
            const validatePhone = (rule, value, callback) => {
                console.log(value);
                if (value === "" || !this.$valid.isPhone(value)) {
                    console.log("err");
                    callback(new Error("请输入正确的手机号格式"));
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("密码不能为空"));
                } else {
                    if (!this.$valid.isPassword(value)) {
                        callback(new Error("密码设置不符合要求，请重新输入"));
                    }
                    callback();
                }
            };
            return {
                modalPwd: false,
                resetPwdData: {
                    corpId: this.$route.query.corpId,
                    pwd: "", // 新密码,
                    type: "" // 1重置 2修改
                },
                data: "",
                formData: {
                    corpName: "",
                    corpLevel: "",
                    corpShortName: "",
                    corpAddress: "",
                    corpId: this.$route.query.corpId,
                    corpLogo: ""
                },
                agentListData: [],
                resetStatusData: {
                    corpId: this.$route.query.corpId,
                    status: "",
                    pwd: ""
                },
                modifyTelData: {
                    //修改安全手机
                    userId: "",
                    pswd: "",
                    safePhone: ""
                },
                createCorpData: {
                    corpId: this.$route.query.corpId,
                    userName: "",
                    corpsafePhone: ""
                },
                modal1: false,
                modal2: false,
                modal6: false, //修改安全手机
                visible: false,
                createCorp: false,
                rulesTel: {
                    pswd: [
                        {
                            required: true,
                            message: "登录密码不能为空",
                            trigger: "blur"
                        }
                    ],
                    safePhone: [
                        {
                            validator: validatePhone,
                            trigger: "blur"
                        }
                    ],
                    corpsafePhone: [
                        {
                            validator: validatePhone,
                            trigger: "blur"
                        }
                    ]
                },
                rulesResetPwd: {
                    pwd: [
                        {
                            validator: validatePass,
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                // 初始化公司详情
                api.getCorp(this.resetPwdData).then(response => {
                    this.data = response.data.data;
                });
            },
            updatePwd() {
                this.resetPwdData.type = 2;
                this.modalPwd = true;
            },
            resetUpdatePwd() {
                this.resetPwdData.type = 1;
                this.resetPwd()
            },
            resetPwd() {
                api
                    .resetPwd(this.resetPwdData)
                    .then(response => {
                        this.$Message.success({
                            content: "重置密码成功",
                            duration: 2
                        });
                        this.$refs.resetPwdData.resetFields();
                    })
                    .catch(e => {
                        this.$Message.error({
                            content: e.response.data.msg,
                            duration: 2
                        });
                        this.$refs.resetPwdData.resetFields();
                    });
            },
            //  经济人跳转
            agentList() {
                // 经纪人名单
                this.$router.push({
                    name: "agentList",
                    query: {
                        corpShortName: this.data.corpShortName
                    }
                });
            },
            isOpenModel(val) {
                // 账号状态弹框
                console.log(val);
                if (val === "已激活") {
                    this.resetStatusData.status = 0;
                } else if (val === "未激活") {
                    this.resetStatusData.status = 1;
                }
                this.resetStatusData.pwd = "";
                console.log(this.resetStatusData.status);
                this.modal2 = true;
            },
            isOpen(name) {
                // 修改账号状态
                this.$refs[name].validate(valid => {
                    if (valid) {
                        console.log(this.resetStatusData);
                        api.manCorpAccount(this.resetStatusData).then(response => {
                            this.$Notice.success({
                                title: response.data.msg || "修改成功"
                            });
                            this.init();
                        });
                    } else {
                        this.$Notice.error({
                            title: "验证未通过",
                            duration: 2
                        });
                    }
                });
            },
            modifyCorpTel(name) {
                //修改企业安全手机
                this.$refs[name].validate(valid => {
                    if (valid) {
                        api.modifyCorpTel(this.modifyTelData).then(response => {
                            this.init();
                        });
                    } else {
                        this.$Notice.error({
                            title: "验证未通过",
                            duration: 2
                        });
                    }
                });
            },
            // 创建账户
            setCorp() {
                api
                    .openCorpAccount(this.createCorpData)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleSubmit() {
                this.formData.corpName = this.data.corpName;
                this.formData.corpShortName = this.data.corpShortName;
                this.formData.corpAddress = this.data.corpAddress;
                if (this.data.corpLevel === "公司") {
                    this.formData.corpLevel = 1;
                } else {
                    this.formData.corpLevel = 2;
                }
                api.updateCorp(this.formData).then(response => {
                    this.$Notice.success({
                        title: response.data.msg || "修改成功"
                    });
                    this.$closePageAndActiveRouter({
                        name: "companyList"
                    });
                });
            },
            //上传企业logo
            handleSuccess(response, file) {
                //   file.url = "http://ozptwu1ea.bkt.clouddn.com/" + response.data.key
                //   file.name = response.data.key
                //   this.uploadList = file;
                console.log("response.data");
                console.log(response.data);
                this.data.corpLogo = response.data.key; //上传成功后显示图片赋值
                this.formData.corpLogo = response.data.key; //提交参数赋值
                //   this.init()
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: "文件格式错误",
                    desc: "请上传jpg/jpeg/png/gif格式的文件"
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: "图片大小超标",
                    desc: "请上传2M以内的图片."
                });
            },
            handleView() {
                this.visible = true;
            },
            updateBusinessCardAuth(businessCardPhotoAuth) {
                api.updateCorpbusinessCardAuth({
                    corpId: this.data.corpId,
                    businessCardPhotoAuth: businessCardPhotoAuth
                }).then(response => {
                    this.$Notice.success({
                        title: response.data.msg || "操作成功"
                    });
                    this.init();
                });
            },
            updateBusinessCardAuthorizationInfo() {
                if (!this.data.businessCardPhoto) {
                    this.$Message.error('未上传图片');
                    return;
                }
                let json = {
                    corpId: this.data.corpId,
                    businessCardPhoto: this.data.businessCardPhoto
                };
                api.updateCorpbusinessCardPhoto(json)
                    .then(response => {
                        this.$Message.success('等待认证!');
                        this.init();
                    })
                    .catch(error => {
                        this.$Message.error('认证失败!');
                    });
            }
        },
        components: {
            uploadimg
        },
        computed: {
            statusColor: function () {
                if (this.data.accountStatus === "已激活") {
                    return "green";
                } else {
                    return "red";
                }
            }
        }
    };
</script>
