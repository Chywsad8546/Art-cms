<style scoped>
    .jiacu {
        color: red;
    }
</style>

<template>
    <Card span="100">
        <p slot="title">门店详情</p>
        <div style="line-height:2.4rem">
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                <strong>企业名称:</strong> </Col>
                <Col offset="0">
                <Input v-model="data.corpName" style="width:200px"/>
                </Col>
                <Col offset="0">
                <router-link :to="{name:'org',query: {corpId: resetPwdData.corpId}}">查看完整组织架构</router-link>
                </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                <strong>层级</strong> </Col>
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
                所属区县 </Col>
                <Col offset="0">
                {{data.districtName}} </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                所属公司 </Col>
                <Col offset="0">
                {{data.belongCorpName}} </Col>
                <Col offset="0">
                <router-link :to="{name:'companyDetail_city',query: {corpId: data.upCorpId}}">查看企业详情</router-link>
                <!--<span class="gray999">|</span> <a @click="changeBelongCorpModel()">调整所属公司</a>-->
                </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                上级企业 </Col>
                <Col offset="0">
                {{data.upCorpName}} </Col>
                <Col offset="0">
                <router-link :to="{name:'companyDetail_city',query: {corpId: resetPwdData.corpId}}">查看企业详情</router-link>
                <span class="gray999">|</span> <a @click="changeUpCorpModel()">调整所属上级企业</a>
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
                <Col offset="0">
                <Input v-model="data.corpAddress" style="width:200px"/>
                </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                企业logo </Col>
                <Col offset="0">
                <div class="imgPhoto">
                    <p v-if="data.corpLogo!=''"><img :src="$imgurl(data.corpLogo,'agent400x300')" alt=""
                                                     @click="handleView"></p>
                    <p v-else class="defaultLogo"></p>
                </div>
                </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                经纪人数 </Col>
                <Col offset="0">
                {{data.count}} </Col>
                <Col offset="0">
                <a @click="agentList()" v-if="data.count > 0">查看经纪人名单</a> </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                企业账号 </Col>
                <Col offset="0">
                {{data.userName}}<span :style="{color:statusColor}">({{data.accountStatus}})</span> </Col>
                <Col offset="0">
                <a v-if="data.userName" @click="isOpenModel(data.accountStatus)">账号状态管理</a>
                <a v-else @click="createCorp=true">创建账号</a>
                </Col>

            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                企业安全手机 </Col>
                <Col offset="0">
                {{data.corpSafePhone||"未设置安全手机"}} </Col>
                <Col offset="0">
                <a v-if="data.corpSafePhone" @click="modal6=true">修改安全手机</a>
                </Col>
                <Col offset="0">
                <Button v-if="data.userName" @click="updatePwd" type="primary">修改密码</Button>
                </Col>
                <Col offset="0">
                <Button v-if="data.corpSafePhone" @click="resetUpdatePwd" type="primary">重置密码</Button>
                </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                企业营业执照 </Col>
                <Col offset="0">
                <img width="350" height="200"
                     v-if="data.businessCardPhoto"
                     :src="$imgurl(data.businessCardPhoto,'agent400x300')" alt="">
                <uploadimg v-if="data.businessCardAuth===0||data.businessCardAuth===3"
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
                账号创建人 </Col>
                <Col offset="0">
                {{data.creatorName}} </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                最近修改时间 </Col>
                <Col offset="0">
                {{data.updateTime}} </Col>
            </Row>
            <Row type="flex" :gutter="30">
                <Col span="4" align="right">
                最近修改人 </Col>
                <Col offset="0">
                {{data.updaterName}} </Col>
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
                <FormItem label="账号状态" prop="status">
                    <RadioGroup v-model="resetStatusData.status">
                        <Radio label="1">未开通</Radio>
                        <Radio label="0">已开通</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        </Modal>
        <Modal title="调整上级企业" v-model="modal4" class-name="vertical-center-modal" @on-ok="changeUpCorp('UpCorpForm')">
            <Form ref="UpCorpForm" :model="UpCorpData" :rules="rulesUpCorp" :label-width="100" style="width:80%">
                <FormItem label="登录密码" prop="pwd">
                    <Input type="password" v-model="UpCorpData.pwd"/>
                </FormItem>
                <FormItem label="上级企业" prop="upCorpId">
                    <Select v-model="UpCorpData.upCorpId" placeholder="选择上级企业">
                        <Option v-for="item in getStoreData" :value="item.corpId" :key="item.Id">{{item.corpName}}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="modal5" title="重置密码" @on-ok="updatePassWord()">
            <Form ref="resetPwdData" :model="resetPwdData" :rules="rulesResetPwd" inline :label-width="100">
                <FormItem label="新登录密码" prop="pwd">
                    <Input type="password" v-model="resetPwdData.pwd"/>
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
        name: "storeDetail_city",
        data() {
            const validatePhone = (rule, value, callback) => {
                if (value === "" || !this.$valid.isPhone(value)) {
                    this.valid = true;
                    callback(new Error("请输入正确的手机号格式"));
                }
                callback()
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
                resetPwdData: {
                    corpId: this.$route.query.corpId,
                    psw: '',
                    type: "" // 1重置 2修改
                },
                data: "",
                formData: {
                    // 提交修改接口数据
                    corpName: "",
                    corpLevel: "",
                    belongCorpId: "",
                    upCorpId: "",
                    corpShortName: "",
                    corpAddress: "",
                    corpId: this.$route.query.corpId
                },
                agentListData: [],
                resetStatusData: {
                    // 账号状态管理参数
                    corpId: this.$route.query.corpId,
                    status: "",
                    pwd: ""
                },
                getCorpData: [],
                getStoreData: [],
                UpCorpData: {
                    // 调整上级企业参数
                    corpId: this.$route.query.corpId,
                    upCorpId: "",
                    pwd: ""
                },
                modifyTelData: {
                    //修改安全手机
                    listUserId: "",
                    pswd: "",
                    safePhone: ""
                },
                createCorpData: {
                    corpId: this.$route.query.corpId,
                    userName: '',
                    corpsafePhone: ''
                },
                createCorp: false, //创建企业账号
                modal1: false, //经纪人列表弹框
                modal2: false, //账号状态管理弹框
                modal3: false, //调整所属公司弹框
                modal4: false, //调整上级企业弹框
                modal5: false, //重置密码弹框
                modal6: false, //修改安全手机
                visible: false,
                rulesUpCorp: {
                    pwd: [{
                        required: true,
                        message: "登录密码不能为空",
                        trigger: "blur"
                    }],
                    upCorpId: [{
                        required: true,
                        message: "上级企业不能为空",
                        trigger: "change"
                    }]
                },
                rulesTel: {
                    pswd: [{
                        required: true,
                        message: "登录密码不能为空",
                        trigger: "blur"
                    }],
                    safePhone: [{
                        required: true,
                        message: "安全手机号不能为空",
                        trigger: "blur"
                    }, {
                        validator: validatePhone,
                        trigger: "blur"
                    }],
                    corpsafePhone: [{
                        required: true,
                        message: "安全手机号不能为空",
                        trigger: "blur"
                    }, {
                        validator: validatePhone,
                        trigger: "blur"
                    }]
                },
                rulesResetPwd: {
                    pwd: [{
                        validator: validatePass,
                        trigger: "blur"
                    }]
                }
            };
        },
        methods: {
            init() {
                // 初始化公司详情
                api.getCorp(this.resetPwdData).then(response => {
                    this.data = response.data.data;
                    console.log(this.data)
                    this.modifyTelData.listUserId = response.data.data.userId;
                });
            },
            agentList() {
                // 经纪人名单
                this.$router.push({
                    name: 'agentList',
                    query: {
                        storeName: this.data.corpShortName
                    }
                });
            },
            isOpenModel(val) {
                // 账号状态弹框
                if (val === "已激活") {
                    this.resetStatusData.status = 1;
                } else if (val === "未激活") {
                    this.resetStatusData.status = 0;
                }
                this.modal2 = true;
            },
            isOpen(name) {
                // 修改账号状态
                this.$refs[name].validate(valid => {
                    if (valid) {
                        console.log(this.resetStatusData)
                        api.manCorpAccount(this.resetStatusData).then(response => {
                            this.$Message.success({
                                content: "设置成功",
                                duration: 2
                            });
                            this.init();
                        }).catch(error => {
                            this.$Message.error({
                                content: error.response.data.msg,
                                duration: 2
                            });
                        });
                    } else {
                        this.$Notice.error({
                            title: "验证未通过",
                            duration: 2
                        });
                    }
                });
            },
            changeBelongCorpModel() {
                this.$refs.UpBelongCorpForm.resetFields();
                this.modal3 = true;
                // 调取公司列表
                api
                    .getCorpChoice({
                        cityId: this.data.cityId
                    })
                    .then(response => {
                        console.log(response.data.data.data);
                        this.getCorpData = response.data.data.data;
                    });
            },
            changeUpCorpModel() {
                this.$refs.UpCorpForm.resetFields();
                this.modal4 = true;
                // 调取门店列表
                api.getCorpByCorpId(this.resetPwdData).then(response => {
                    console.log(response.data.data.data);
                    this.getStoreData = response.data.data.data;
                });
            },
            changeUpCorp(name) {
                // 调整上级企业
                this.$refs[name].validate(valid => {
                    if (valid) {
                        api
                            .updateUpCorp(this.UpCorpData)
                            .then(response => {
                                this.$Notice.success({
                                    title: response.data.msg || "修改成功"
                                });
                                this.init();
                            })
                            .catch(error => {
                                this.$Notice.success({
                                    title: response.data.msg || "修改失败"
                                });
                            });
                    } else {
                        this.$Notice.error({
                            title: "验证未通过",
                            duration: 2
                        });
                    }
                });
            },
            updatePwd() {
                this.resetPwdData.type = 2
                this.modal5 = true
            },
            resetUpdatePwd() {
                this.resetPwdData.type = 1
                this.updatePassWord()
            },
            updatePassWord() {
                //重置密码
                api.resetPwd(this.resetPwdData).then(response => {
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
                    });
            },
            modifyCorpTel(name) {
                //修改企业安全手机
                this.$refs[name].validate(valid => {
                    if (valid) {
                        api.modifyCorpTel(this.modifyTelData).then(response => {
                            this.$Notice.success({
                                title: "安全手机号修改成功！",
                                duration: 2
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
            handleSubmit() {
                this.formData.corpName = this.data.corpName;
                this.formData.corpShortName = this.data.corpShortName;
                this.formData.corpAddress = this.data.corpAddress;
                this.formData.belongCorpId = this.data.belongCorpId;
                this.formData.upCorpId = this.data.upCorpId;
                if (this.data.corpLevel === "公司") {
                    this.formData.corpLevel = 1;
                } else {
                    this.formData.corpLevel = 2;
                }
                api.updateCorp(this.formData).then(response => {
                    this.$Notice.success({
                        title: response.data.msg || "修改成功"
                    });
                    this.$store.commit("removeTag", "storeDetail");
                    this.$router.push({
                        name: "companyList"
                    });
                });
            },
            setCorp() {
                api.openCorpAccount(this.createCorpData).then(response => {
                    this.$Message.success({
                        content: "创建账号成功",
                        duration: 2
                    })
                    this.init()
                }).catch(error => {
                    this.$Message.success({
                        content: error.response.data.msg,
                        duration: 2
                    })
                })
            },
            handleView() {
                //logo放大
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
        created() {
            this.init();
        },
        computed: {
            statusColor: function () {
                if (this.data.accountStatus === "已激活") {
                    return "green";
                } else {
                    return "red";
                }
            },
        }
    };
</script>
