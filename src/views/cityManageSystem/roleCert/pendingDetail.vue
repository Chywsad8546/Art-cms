<template>
<Card span="100">
    <p slot="title">待审核经纪人详情</p>
    <div style="line-height:2.4rem">
        <Row>
            <Col span="3" align="right">真实姓名</Col>
            <Col offset="4">{{data.agentName}}</Col>
        </Row>
        <Row v-if="this.$route.query.auditType==='2'">
            <Col span="3" align="right">身份证号 </Col>
            <Col offset="4">{{data.cardNo}}</Col>
        </Row>
        <Row v-if="this.$route.query.auditType==='2'">
            <Col span="3" align="right">身份证照片</Col>
            <Col offset="4"><img :src="data.cardPhoto" /></Col>
        </Row>
        <Row v-if="this.$route.query.auditType==='1'">
            <Col span="3" align="right"> 名片照片 </Col>
            <Col offset="1" span="4" align="right"><img width="100%" :src="$imgurl(data.cardPhoto,'agent400x300')" /></Col>
        </Row>
        <Row>
            <Col span="3" align="right">登录手机号</Col>
            <Col offset="4">{{data.telephone}}</Col>
        </Row>
        <Row>
            <Col span="3" align="right">对外展示电话</Col>
            <Col offset="4">{{data.displayPhone}}</Col>
        </Row>
        <Row>
            <Col span="3" align="right">所属公司</Col>
            <Col offset="4">{{data.corpName}}</Col>
        </Row>
        <Row>
            <Col span="3" align="right">所属门店</Col>
            <Col offset="4">{{data.storeName}}</Col>
        </Row>
        <Row>
            <Col span="3" align="right">城市</Col>
            <Col offset="4">{{data.cityName}}</Col>
        </Row>
        <Row>
            <Col span="3" align="right">服务商圈</Col>
            <Col offset="4">
              <p v-for="item in data.serviceBusinessCircles" :key="item">{{item.area}} - {{item.district}}</p>
            </Col>
        </Row>
        <Row>
            <Col span="3" align="right">注册时间</Col>
            <Col offset="4">{{data.createTime}}</Col>
        </Row>
        <Card style="width:350px;position:absolute;right:50px;top:80px" >
                <p slot="title">审核</p>
                <Form ref="formPass" :model="isPass" :rules="isPassRules" :label-width="100">
                    <FormItem label="是否通过" prop="verifyResult">
                        <RadioGroup v-model="isPass.verifyResult">
                            <Radio label="2">通过</Radio>
                            <Radio label="3">不通过</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="不通过原因" prop="message" :required="isPass.verifyResult==='2' ? true : false" >
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
    data () {
        return {
            searchdata: {
                agentId: this.$route.query.agentId,
                auditType: this.$route.query.auditType
            },
            data: '',
            isPass: {
                agentId: this.$route.query.agentId,
                verifyType: this.$route.query.auditType,
                verifyResult: '',
                message: '',
                force:0
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
            }
        };
    },
    methods: {
        init () {
            api.getAgentAuditDetail(this.searchdata).then(response => {
                this.data = response.data.data;
            });
        },
        handleSubmit (name) {
            if (this.isPass.verifyResult === '3') {
                this.isPassRules.message[0].required = true;
            } else {
                this.isPassRules.message[0].required = false;
            }
            this.$refs[name].validate(valid => {
                if (valid) {
                    api.verifyAgent(this.isPass).then(response => {
                        this.$Notice.success({
                            title: '审核已完成',
                            duration: 2
                        });
                        this.$store.commit('removeTag', 'pendingDetail');
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
    created () {
        this.init();
    }
};
</script>
<style scoped>
img:hover {
  width: 200%;
  height: 200%;
}
</style>

