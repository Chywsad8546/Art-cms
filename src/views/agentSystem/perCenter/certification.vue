<template>
    <div>
        <Row>
            <Col span="100">
            <Card>
                <p slot="title">我的认证</p>
                <Alert v-if="isAuth" type="warning">提示：您当前未进行认证，如需使用全部功能请先认证。审核期间以及审核通过后，本页的信息均不允许更改</Alert>
                <Card>
                    <Form ref="authForm" :model="authInfoData" :label-width="120" :rules="ruleValidate">
                        <Row>
                            <Col span="6">
                            <FormItem label="身份证认证：">
                                <strong :style="{color:idcolor}">
                                    {{idText}}
                                </strong>
                            </FormItem>
                            </Col>
                            <Col span="6">
                            <FormItem label="名片认证：">
                                <strong :style="{color:bscolor}">
                                    {{bsText}}
                                </strong>
                            </FormItem>
                            </Col>
                            <Col span="6">
                            <FormItem label="信息卡认证：">
                                <strong v-if="authInfoData.qualificationCardAuth===0" style="color:red">
                                    未认证
                                </strong>
                                <strong v-if="authInfoData.qualificationCardAuth===1" style="color:yellow">
                                    认证审核中
                                </strong>
                                <strong v-if="authInfoData.qualificationCardAuth===3" style="color:red">
                                    认证不通过
                                </strong>
                                <strong v-if="authInfoData.qualificationCardAuth===2" style="color:green">
                                    认证通过
                                </strong>
                            </FormItem>
                            </Col>
                            <Col span="6">
                            <FormItem label="开通付费：">
                                <strong :style="{color:ffcolor}">
                                    {{ffText}}
                                </strong>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col align="center">
                            <Alert type="warning">
                                1、请勿上传电子版、带水印、及PS处理过的照片 2、名片上的手机号需与个人登录手机号或对外展示电话一致 3、名片和身份证上的姓名需与真实姓名一致。
                            </Alert>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="真实姓名：" prop="agentName">
                                <Input v-if="authInfoData.idCardNo&&authInfoData.idCardAuth==2" disabled
                                       v-model="authInfoData.agentName"/>
                                <Input v-else v-model="authInfoData.agentName"/>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="身份证号：" prop="idCardNo">
                                <Input v-if="authInfoData.idCardNo&&authInfoData.idCardAuth==2" disabled
                                       v-model="authInfoData.idCardNo"/>
                                <Input v-else v-model="authInfoData.idCardNo"/>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="身份证照片：" prop="idCardPhoto" required>
                                <!-- <img width="350" height="200" v-if="authInfoData.idCardPhoto&&authInfoData.idCardAuth!==0&&authInfoData.idCardAuth!==3" :src="authInfoData.idCardPhoto" alt=""> -->
                                <Alert v-if="authInfoData.idCardPhoto&&authInfoData.idCardAuth!==0&&authInfoData.idCardAuth!==3"
                                       type="success" show-icon>
                                    已认证通过
                                </Alert>
                                <template v-else>
                                    <Alert type="warning">请提交身份证带号码的一面，否则无法审核通过</Alert>
                                    <uploadimg :max-size="6144" @uploadIDimg="idUploadDataImg"
                                               :citeText="authInfoData.idCardAuthInfo"
                                               action="/v1.0.0/sys/uploadIdCardPhoto" type="IDcard" :reset="reset">
                                        <Button type="ghost" icon="ios-cloud-upload-outline">选择身份证</Button>
                                    </uploadimg>
                                </template>
                            </FormItem>
                            <FormItem>
                                <Alert v-if="failtip" type="error" show-icon>认证失败，请核对姓名、身份证号、身份证照片是否清晰正确</Alert>
                                <Alert v-if="successtip" type="success" show-icon>认证成功</Alert>
                                <Button v-if="authInfoData.idCardAuth!==2" type="primary"
                                        @click="updateAgentAuthorizationInfo('authForm')">提交身份认证
                                </Button>
                            </FormItem>
                            </Col>

                            <Col span="12">
                            <FormItem label="范例*">
                                <img src="@/images/idCard.png" alt="身份证范例">
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="名片照片：" prop="bsCard">
                                <img width="350" height="200"
                                     v-if="authInfoData.businessCardPhoto&&authInfoData.businessCardAuth!==0&&authInfoData.businessCardAuth!==3"
                                     :src="$imgurl(authInfoData.businessCardPhoto,'agent400x300')" alt="">
                                <Alert v-if="authInfoData.businessCardAuth==3" type="error" show-icon>
                                    认证失败，请核对姓名、名片,并重新认证
                                </Alert>
                                <Alert v-if="authInfoData.businessCardAuth==1" type="warning" show-icon>名片审核中</Alert>
                                <Alert v-if="authInfoData.businessCardAuth==2&&authInfoData.businessCardPhoto"
                                       type="success" show-icon>已认证通过
                                </Alert>
                                <!-- v-else -->
                                <uploadimg v-if="authInfoData.businessCardAuth==0||authInfoData.businessCardAuth==3"
                                           @uploadimg="bsUploadDataImg" :citeText="authInfoData.businessCardAuthInfo"
                                           type="bsCard" action="/v1.0.0/sys/uploadImage">
                                    <Button type="ghost" icon="ios-cloud-upload-outline">选择名片</Button>
                                </uploadimg>
                                <!-- v-if="authInfoData.businessCardAuth==0||authInfoData.businessCardAuth==3" -->
                                <Button v-if="authInfoData.businessCardAuth==0||authInfoData.businessCardAuth==3"
                                        style="margin-top:20px" type="primary" @click="updateAgentAuthorizationInfo2">
                                    提交名片认证
                                </Button>
                            </FormItem>
                            </Col>

                            <Col span="12">
                            <FormItem label="范例*">
                                <img src="@/images/bsCard.png" alt="名片范例">
                                <Alert style="width:288px" type="warning">备注 : 请尽量将名片占满画面,保证清晰</Alert>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="经纪人信息卡照片：">
                                <Alert v-if="authInfoData.qualificationCardAuth!==2" type="warning" show-icon>
                                    根据住建委最新规定，经纪人必须取得从业人员信息卡才可以从事相关房地产经纪活动请您及时上传经纪人信息卡
                                </Alert>
                                <img width="200" height="300"
                                     v-if="authInfoData.qualificationCardPhoto"
                                     :src="$imgurl(authInfoData.qualificationCardPhoto,'agent400x300')" alt="">
                                <Alert v-if="authInfoData.qualificationCardAuth===3" type="error" show-icon>
                                    认证失败，请重新上传并认证
                                </Alert>
                                <Alert v-if="authInfoData.qualificationCardAuth===1" type="warning" show-icon>审核中
                                </Alert>
                                <Alert v-if="authInfoData.qualificationCardAuth===2&&authInfoData.qualificationCardPhoto"
                                       type="success" show-icon>已认证通过
                                </Alert>
                                <!-- v-else -->
                                <uploadimg v-if="authInfoData.qualificationCardAuth!==2" :ratio="2/3"
                                           @uploadimg="uploadimg" action="/v1.0.0/sys/uploadImage">
                                    <Button type="ghost" icon="ios-cloud-upload-outline">选择图片</Button>
                                </uploadimg>
                                <Button v-if="authInfoData.qualificationCardAuth===0||authInfoData.qualificationCardAuth===3"
                                        style="margin-top:20px" type="primary"
                                        @click="updateAgentQualificationAuthorizationInfo">
                                    提交经纪人信息卡认证
                                </Button>
                            </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import api from "@/api/agent/index.js";
    import uploadimg from "../../my-components/upLoad";

    export default {
        name: "certification",
        data() {
            const checkId = (rule, value, callback) => {
                if (this.$valid.checkID(value)) {
                    callback();
                } else {
                    callback(new Error("身份证号格式不正确"));
                }
            };
            return {
                reset: false,
                authInfoData: {},
                defaultImage: "@/images/bsCard.png",
                ruleValidate: {
                    agentName: [
                        {
                            required: true,
                            message: "真实姓名不能为空",
                            trigger: "blur"
                        }
                    ],
                    idCardNo: [
                        {
                            required: true,
                            message: "身份证号不能为空",
                            trigger: "blur"
                        },
                        {
                            validator: checkId,
                            trigger: "blur"
                        }
                    ]
                },
                failtip: false,
                successtip: false
            };
        },
        components: {
            uploadimg
        },
        methods: {
            getAgentAuthInfo() {
                api
                    .getAgentAuthInfo()
                    .then(response => {
                        this.authInfoData = response.data.data;
                        if (this.authInfoData.idCardAuth === 3) {
                            this.reset = false;
                            this.authInfoData.idCardPhoto = '';
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            idUploadDataImg(val) {
                this.authInfoData.idCardPhoto = val.fileName;
            },
            bsUploadDataImg(val) {
                this.authInfoData.businessCardPhoto = val.url;
            },
            uploadimg(data) {
                let {response, file} = data;
                this.authInfoData.qualificationCardPhoto = response.data.key;
                file.name = response.data.key;
            },
            // 名片认证
            updateAgentAuthorizationInfo2() {
                if (!this.authInfoData.businessCardPhoto) {
                    this.$Message.error("未上传图片");
                    return;
                }
                let json = {
                    agentName: this.authInfoData.agentName,
                    businessCardPhoto: this.authInfoData.businessCardPhoto
                };
                api
                    .updateAgentAuthorizationInfo2(json)
                    .then(response => {
                        console.log(response);
                        this.$Message.success("等待认证!");
                        this.getAgentAuthInfo();
                    })
                    .catch(error => {
                        this.$Message.error("认证失败!");
                    });
            },
            // 身份证认证
            updateAgentAuthorizationInfo(name) {
                this.failtip = false;
                if (!this.authInfoData.idCardPhoto) {
                    this.$Message.error("未上传图片");
                } else {
                    let json = {
                        agentName: this.authInfoData.agentName,
                        idCardNo: this.authInfoData.idCardNo,
                        idCardPhoto: this.authInfoData.idCardPhoto
                    };
                    console.log(json);
                    this.$refs[name].validate(valid => {
                        if (valid) {
                            api
                                .AgentAuthorization(json)
                                .then(response => {
                                    console.log("suc");
                                    console.log(response);
                                    this.successtip = true;
                                    this.getAgentAuthInfo();
                                    this.$Message.success("认证成功!请重新登录");
                                })
                                .catch(error => {
                                    this.reset = true;
                                    this.failtip = true;
                                    this.getAgentAuthInfo();
                                    // console.log("error", error.response);
                                });
                        } else {
                            this.$Message.error('表单验证失败');
                        }
                    });
                }
            },
            // 从业资格证认证
            updateAgentQualificationAuthorizationInfo() {
                if (!this.authInfoData.qualificationCardPhoto) {
                    this.$Message.error('未上传图片');
                    return;
                }
                let json = {
                    agentId: this.authInfoData.agentId,
                    qualificationCardPhoto: this.authInfoData.qualificationCardPhoto
                };
                api
                    .updateAgentQalificationCardPhoto(json)
                    .then(response => {
                        this.$Message.success("等待认证!");
                        this.getAgentAuthInfo();
                    })
                    .catch(error => {
                        this.$Message.error("认证失败!");
                    });
            }
        },
        computed: {
            ffText: function () {
                if (this.authInfoData.paymentAuth == 1) {
                    return "已开通付费";
                } else {
                    return "未开通付费";
                }
            },
            ffcolor: function () {
                if (this.authInfoData.paymentAuth == 1) {
                    return "green";
                } else {
                    return "red";
                }
            },
            isAuth: function () {
                if (this.authInfoData) {
                    if (
                        this.authInfoData.businessCardAuth === 0 ||
                        this.authInfoData.idCardAuth === 0
                    ) {
                        return true;
                    }
                    if (
                        this.authInfoData.businessCardAuth !== 0 &&
                        this.authInfoData.idCardAuth !== 0
                    ) {
                        return false;
                    }
                } else {
                    return true;
                }
            },
            idcolor: function () {
                if (this.authInfoData.idCardAuth == 2) {
                    return "green";
                } else {
                    return "red";
                }
            },
            bscolor: function () {
                if (this.authInfoData.businessCardAuth == 0) {
                    return "red";
                } else if (this.authInfoData.businessCardAuth == 1) {
                    return "yellow";
                } else if (this.authInfoData.businessCardAuth == 3) {
                    return "red";
                } else {
                    return "green";
                }
            },
            idText: function () {
                if (this.authInfoData.idCardAuth === 0) {
                    return "未认证";
                }
                if (this.authInfoData.idCardAuth === 1) {
                    return "认证中";
                }
                if (this.authInfoData.idCardAuth === 2) {
                    return "认证通过";
                }
                if (this.authInfoData.idCardAuth === 3) {
                    return "认证失败";
                }
            },
            bsText: function () {
                if (this.authInfoData.businessCardAuth === 0) {
                    return "未认证";
                }
                if (this.authInfoData.businessCardAuth === 1) {
                    return "认证中";
                }
                if (this.authInfoData.businessCardAuth === 2) {
                    return "认证通过";
                }
                if (this.authInfoData.businessCardAuth === 3) {
                    return "认证失败";
                }
            }
        },
        mounted() {
            this.getAgentAuthInfo();
        }
    };
</script>
