<template>
    <Card span="100">
        <p slot="title">经纪人详情</p>
        <Row>
            <Col span="18">
            <article style="line-height:2.4rem">
                <Row>
                    <Col span="4" align="right">
                    ID</Col>
                    <Col span="2" offset="1">
                    {{data.agentId}}</Col>
                    <Col span="3" offset="1">
                    <Button type="primary" @click="fictitiousLogin()">模拟登录</Button>
                    </Col>
                    <Col span="6">
                    <Alert type="warning" show-icon>模拟登录时请允许浏览器弹出窗口</Alert>
                    </Col>
                </Row>
                <Row>
                    <Col span="3" align="right">
                    姓名</Col>
                    <Col offset="4">
                    <Row>
                        <Col span="3">
                        {{data.agentName}}</Col>
                        <!-- <Col span="3">
                        <Button type="primary" @click="resetPasswd">重置密码</Button>
                        </Col> -->
                    </Row>
                    </Col>
                </Row>

                <Row>
                    <Col span="3" align="right">
                    身份证</Col>
                    <Col offset="4">
                    {{data.idCardAuthInfo}}
                    </Col>
                </Row>
                <Row>
                    <Col span="3" align="right">
                    名片</Col>
                    <Col offset="4">
                    {{data.businessCardAuthInfo}}
                    </Col>
                </Row>

                <Row>
                    <Col span="3" align="right">
                    注册手机号</Col>
                    <Col offset="4">
                    {{data.userName}}
                    </Col>
                </Row>
                <Row>
                    <Col span="3" align="right">
                    对外展示电话</Col>
                    <Col offset="4">
                    <Row>
                        <Col span="4">
                        {{data.displayPhone ||"暂无"}}</Col>
                        <Col span="3">
                        <Button type="primary" @click="modalDisplayPhone = true">修改</Button>
                        </Col>
                    </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span="3" align="right">
                    注册时间</Col>
                    <Col offset="4">
                    {{data.createTime}}</Col>
                </Row>
                <Row>
                    <Col span="3" align="right">
                    最近登录时间</Col>
                    <Col offset="4">
                    {{data.lastLoginTime}}</Col>
                </Row>
                <!-- <Row>
                    <Col span="3" align="right">所属公司</Col>
                    <Col offset="4">
                    <Row>
                        <Col span="4">{{data.corpName || "未知"}}</Col>
                        <Col span="3">
                        <Button type="text" @click="corpName = true" style="color:blue">移除该员工</Button>
                        </Col>
                    </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span="3" align="right">所属门店</Col>
                    <Col offset="4">
                    <Row>
                        <Col span="4">{{data.storeName || "未设置"}}</Col>
                        <Col span="3">
                        <Button type="text" @click="getCorpByCorpId" style="color:blue">调整门店</Button>
                        </Col>
                    </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span="3" align="right">城市</Col>
                    <Col offset="4">{{data.cityName}}</Col>
                </Row>
                <Row>
                    <Col span="3" align="right">服务商圈</Col>
                    <Col offset="4">
                    <Row v-for="({area,district},index) of data.listServiceBusinessCircle" :key="index">
                        <p v-if="district">{{district}}-{{area}}</p>
                    </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span="3" align="right">企业账号</Col>
                    <Col offset="4">{{data.userName}}</Col>
                </Row> -->
            </article>
            </Col>
            <Col span="3">
            <aside>
                <Row class="img-desc">
                    <img v-if="data.headPhoto" style="display:block;width:120px;height:160px"
                         :src="$imgurl(data.headPhoto,'agent300x400')" alt="头像">
                    <img v-else style="display:block;width:120px;height:160px"
                         :src="require('@/images/defaultPhoto.jpg')" alt="头像">
                </Row>
                <Row :gutter="20" style="margin-top:10px">
                    <Col span="12" align="right">
                    <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess"
                            :format="['jpg','jpeg','png','gif']" :max-size="6144" :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize" type="select" action="/v1.0.0/agent/updateAgentPhoto"
                            :data={agentId:data.agentId}>
                        <Button size="small" type="primary">修改头像</Button>
                    </Upload>
                    </Col>
                    <Col span="12" align="left">
                    <Button size="small" type="primary" @click="removeHeadPhoto" v-if="data.headPhoto">删除头像</Button>
                    </Col>
                </Row>
            </aside>
            </Col>
        </Row>

        <Modal v-model="modalDisplayPhone" title="修改展示电话" @on-ok="displayPhoneOk('formCustom')" @on-cancel="Cancel">
            <Form ref="formCustom" :model="formCustom" :label-width="80" :rules="ruleValidate">
                <FormItem label="登录密码" prop="pswd">
                    <Input type="password" v-model="formCustom.pswd"></Input>
                </FormItem>
                <FormItem label="当前手机号">
                    {{data.displayPhone}}
                </FormItem>
                <FormItem label="新电话号" prop="modifyDisPlayPhone" required>
                    <Input type="text" v-model="formCustom.modifyDisPlayPhone"></Input>
                </FormItem>
            </Form>
        </Modal>

        <Modal v-model="corpName" title="移除经纪人" @on-ok="corpRemoveAgentOK" @on-cancel="Cancel">
            <Alert type="warning">提示： 请验证您的登录密码以移除经纪人。 移除后不能撤销，请谨慎操作。
            </Alert>
            <Form ref="formCustom" :model="formCustom" :label-width="80" :rules="ruleValidate">
                <FormItem label="登录密码" prop="pswd">
                    <Input type="password" v-model="formCustom.pswd"></Input>
                </FormItem>
            </Form>
        </Modal>

        <Modal v-model="storeName" title="调整门店" @on-ok="storeNameOK" @on-cancel="Cancel">
            <Form ref="formCustom" :model="formCustom" :label-width="80" :rules="ruleValidate">
                <FormItem label="登录密码" prop="pswd">
                    <Input type="password" v-model="formCustom.pswd"></Input>
                </FormItem>
                <FormItem label="当前门店">
                    {{data.storeName ||"未设置"}}
                </FormItem>
                <FormItem label="新门店">
                    <Select v-model="data.storeNameId">
                        <Option v-for="item in data.storeNameList" :value="item.corpId" :key="item.corpId">{{
                            item.corpName }}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    </Card>
</template>

<script>
    import api from '../../../api/company/index.js';
    import agentApi from '../../../api/agent/index.js';

    export default {
        data() {
            const validateNewPhone = (rule, value, callback) => {
                var reg = /^((1[3-8][0-9])+\d{8})$/;
                if (value === '') {
                    callback(new Error('请填写新的手机号'));
                } else if (!reg.test(value)) {
                    callback(new Error('手机格式不正确'));
                } else {
                    callback();
                }
            };
            return {
                modalDisplayPhone: false,
                corpName: false,
                storeName: false,
                ruleValidate: {
                    pswd: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }],
                    modifyDisPlayPhone: [{
                        validator: validateNewPhone,
                        trigger: 'blur'
                    }]
                },
                data: {
                    agentId: this.$route.query.agentId || '23',
                    agentName: 'zxxss', // 经纪人真实姓名
                    businessCardAuth: '未认证', // 名片认证状态
                    businessCardPhoto: '', // 名片图片
                    cityName: '北京', // 城市
                    corpName: '未知', // 公司名称
                    createTime: '1970-01-01 00:00:00', // 创建时间
                    displayPhone: '156*****222', // 展示电话号码
                    headPhoto: '', // 头像
                    idCardAuth: '未认证', // 身份证认证状态
                    idCardNo: '62***************1X', // 身份证号码
                    idCardPhoto: '', // 身份张图pain
                    lastLoginTime: '1970-01-01 00:00:00', // 最后登陆时间
                    listServiceBusinessCircle: [],
                    storeName: '未知', // 门店名称,
                    storeNameId: '',
                    telephone: '156*****222',
                    storeNameList: [],
                    corpId: 0
                },
                formCustom: {
                    pswd: '',
                    modifyDisPlayPhone: ''
                }
            };
        },
        methods: {
            init() {
                api
                    .getAgentBaseInfoByAgentId({
                        agentId: this.$route.query.agentId
                    })
                    .then(({data}) => {
                        this.data = Object.assign(this.data, data.data);
                    });
            },
            // 模拟登录
            fictitiousLogin() {
                const userToken = this.data.userToken;
                const userName = this.data.userName;
                let jumpSrc;
                if (location.href.indexOf('corp.toutiaofangchan.com') >= 0) {
                    jumpSrc = 'http://agent.toutiaofangchan.com/v1.0.0/sys/fictitiousLogin?userName=' + userName + '&userToken=' + userToken
                } else if (location.href.indexOf('corp.sim.toutiaofangchan.com') >= 0) {
                    jumpSrc = 'http://agent.sim.toutiaofangchan.com/v1.0.0/sys/fictitiousLogin?userName=' + userName + '&userToken=' + userToken
                } else {
                    jumpSrc = 'http://jingjiren.test.toutiaofangchan.com/v1.0.0/sys/fictitiousLogin?userName=' + userName + '&userToken=' + userToken
                }
                window.open(jumpSrc);
            },
            resetPasswd() {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定要重置密码么?</p>',
                    onOk: () => {
                        api.updateAgentAccountPwsd({
                            userId: this.data.userId
                        }).then(({
                                     data
                                 }) => {
                            this.$Message.success('重置成功');
                        }).catch(err => {
                            this.$Message.error(err.response.data.msg);
                        });
                    },
                    onCancel: () => {
                    }
                });
            },
            handleSuccess(response, file) {
                console.log('shangchuan');
                console.log(response);
                this.data.headPhoto = this.$imgurl(response.data.key, 'agent300x400');
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '文件格式错误',
                    desc: '请上传jpg/jpeg/png/gif格式的文件'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '图片大小超标',
                    desc: '请上传2M以内的图片.'
                });
            },
            removeHeadPhoto() {
                agentApi
                    .updateAgentCurrentPhoto({
                        agentId: this.data.agentId
                    })
                    .then(({
                               data
                           }) => {
                        this.data.headPhoto = '';
                    });
            },
            // 修改展示电话  确认
            displayPhoneOk(name) {
                let params = Object.assign({}, this.formCustom, {
                    disPlayPhone: this.data.displayPhone,
                    agentId: this.data.agentId
                });
                api
                    .corpPcModifyDisplayPhone(params)
                    .then(res => {
                        this.init();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 移除
            corpRemoveAgentOK() {
                this.$Modal.confirm({
                    title: '删除',
                    content: '<p>是否确定删除,删除后不可恢复</p>',
                    onOk: () => {
                        api
                            .removeAgentAccountBelongCorp({
                                pswd: this.formCustom.pswd,
                                agentId: this.data.agentId
                            })
                            .then(res => {
                                console.log('移除');
                                this.$router.push({
                                    name: 'brokerList'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    },
                    onCancel: () => {
                        console.log('已取消');
                    }
                });
            },

            // 获取门店列表
            getCorpByCorpId() {
                api
                    .getCorpByCorpId({
                        corpId: this.data.corpId
                    })
                    .then(({
                               data
                           }) => {
                        this.data.storeNameList = data.data.data;
                        this.storeName = true;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 调整门店 确认方法
            storeNameOK() {
                api
                    .updateAgentStore({
                        agentId: this.data.agentId,
                        newStoreId: this.data.storeNameId
                    })
                    .then(({
                               data
                           }) => {
                        this.init();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            Cancel() {
            }
        },
        mounted() {
            this.init();
        }
    };
</script>

<style>
    .img-desc {
        position: relative;
        display: block;
    }

    .img-desc a {
        filter: alpha(opacity=55);
        opacity: 0.5;
        position: absolute;
        top: -15px;
        right: 0;
        display: block;
        width: 30px;
        height: 30px;
        font-size: 18px;
        text-align: center;
        color: #fff;
        border-radius: 15px;
        background: red;
    }
</style>
