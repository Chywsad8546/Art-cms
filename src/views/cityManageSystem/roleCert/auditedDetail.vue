<style scoped>
.red {
  color: #ed3f14;
}
.green {
  color: #19be6b;
}
</style>
<template>
    <Card span="100">
        <p v-if="this.$route.query.auditType=='1'" slot="title">名片审核详情</p>
        <p v-else slot="title">身份证审核详情</p>
        <div style="line-height:2.4rem">
            <Row>
                <Col span="2" align="right">状态</Col>
                <Col offset="3" :class="[tipcolor]">{{data.authResult}}</Col>
            </Row>
            <Row>
                <Col span="2" align="right">真实姓名</Col>
                <Col offset="3">{{data.agentName}}</Col>
            </Row>
            <Row v-show="this.$route.query.auditType==='2'">
                <Col span="2" align="right">身份证号 </Col>
                <Col offset="3">{{data.cardNo}}</Col>
            </Row>
            <Row v-show="this.$route.query.auditType=='2'">
                <Col span="2" align="right">身份证照片 </Col>
                <Col offset="3"><img :src="data.cardPhoto" /></Col>
            </Row>
            <Row v-show="this.$route.query.auditType=='1'">
                <Col span="2" align="right"> 名片照片 </Col>
                <Col offset="3"><img style="width: 300px;height: 200px" :src="$imgurl(data.cardPhoto,'agent400x300')" /></Col>
            </Row>
            <Row>
                <Col span="2" align="right">登录手机号 </Col>
                <Col offset="3">{{data.telephone}} </Col>
            </Row>
            <Row>
                <Col span="2" align="right">对外展示电话 </Col>
                <Col offset="3">{{data.displayPhone}}</Col>
            </Row>
            <Row>
                <Col span="2" align="right">所属公司 </Col>
                <Col offset="3">{{data.corpName}}</Col>
            </Row>
            <Row>
                <Col span="2" align="right">所属门店 </Col>
                <Col offset="3">{{data.storeName}}</Col>
            </Row>
            <Row>
                <Col span="2" align="right">城市 </Col>
                <Col offset="3">{{data.cityName}} </Col>
            </Row>
            <Row>
                <Col span="2" align="right">服务商圈 </Col>
                <Col offset="3">
                <p v-for="item in data.serviceBusinessCircles" :key="item.id">{{item.area}} - {{item.district}}</p>
                </Col>
            </Row>
            <Row>
                <Col span="2" align="right">注册时间 </Col>
                <Col offset="3">{{data.createTime}}</Col>
            </Row>

            <Card style="width:350px;position:absolute;right:50px;top:80px">
                <p slot="title">审核</p>
                <Form ref="formPass" :model="isPass" :rules="isPassRules" :label-width="100">
                    <FormItem label="是否通过" prop="verifyResult">
                        <RadioGroup v-model="isPass.verifyResult">
                            <Radio label="2">通过</Radio>
                            <Radio label="3">不通过</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="不通过原因" prop="message" :required="isPass.verifyResult==='3' ? true : false">
                        <Input v-model="isPass.message" placeholder="请输入不通过的原因" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formPass')">提交</Button>
                    </FormItem>
                </Form>
            </Card>

        </div>
    </Card>
</template>

<script>
import api from '../../../api/company/index';

export default {
    name: 'pendingDetail',
    data() {
        return {
            searchdata: {
                agentId: this.$route.query.agentId,
                auditType: this.$route.query.auditType
            },
            data: '',
            isPass: {
                agentId: this.$route.query.agentId,
                verifyType: this.$route.query.auditType,
                verifyResult: null,
                message: '',
                force: 1
            },
            isPassRules: {
                verifyResult: [
                    {
                        required: true,
                        message: '请选择是否通过',
                        trigger: 'blur'
                    }
                ],
                message: [
                    {
                        message: '请填写不通过的原因',
                        trigger: 'blur'
                    }
                ]
            },
            tipcolor: 'red'
        };
    },
    methods: {
        init () {
            api.getAgentAuditDetail(this.searchdata).then(response => {
                response.data.data.cardPhoto = this.$imgurl(response.data.data.cardPhoto, 'agent400x300');
                if (response.data.data.authResult === 2) {
                    response.data.data.authResult = '审核通过';
                    this.tipcolor = 'green';
                } else if (response.data.data.authResult === 3) {
                    this.tipcolor = 'red';
                    response.data.data.authResult = '审核未通过';
                } else if (response.data.data.authResult === 1) {
                    this.tipcolor = 'yellow';
                    response.data.data.authResult = '待审核';
                } else {
                    this.tipcolor = 'red';
                    response.data.data.authResult = '未认证';
                }
                this.data = response.data.data;
            });
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    api.verifyAgent(this.isPass).then(response => {
                        this.init();
                        if (this.searchdata.auditType === '1') {
                            this.$router.push({name: 'pendingCert'});
                        } else {
                            this.$router.push({name: 'auditedCert'});
                        }
                    });
                } else {
                    this.$Notice.error({
                        title: '验证未通过',
                        duration: 2
                    });
                }
            });
        }
    },
    created() {
        this.init();
    }
};
</script>
