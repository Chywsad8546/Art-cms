<template>
    <Card span="100">
        <p slot="title">修改安全手机</p>
        <Steps :current="0">
            <Step title="验证当前手机" content=""></Step>
            <Step title="设置新安全手机" content=""></Step>
            <Step title="修改成功" content=""></Step>
        </Steps>
        <Row class="margin-top-20" v-if="step===1">
            <Alert type="warning">提示：如当前安全手机无法接收短信，请联系客服修改</Alert>
            <Form ref="formData" :model="formData" :label-width="130" :rules="rulesForm" align="left" style="width:500px;margin:20px auto">
                <FormItem label="当前安全手机号" prop="safePhone">
                    <Input v-model="formData.safePhone" disabled/>
                </FormItem>
                <FormItem label="登录密码" prop="pwsd">
                    <Input type="password" v-model="formData.pwsd"/>
                </FormItem>
                <FormItem label="短信验证码" prop="code">
                    <Input v-model="formData.code" style="width:240px;margin-right:10px"/><Button type="primary" @click="getCode(formData.safePhone)">获取短信验证码</Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="next('formData')">下一步</Button>
                </FormItem>
            </Form>
        </Row>
        <Row class="margin-top-20" v-if="step===2">
            <Form ref="formData2" :model="formData2" :label-width="130" :rules="rulesForm" align="left" style="width:500px;margin:20px auto">
                <FormItem label="新安全手机号" prop="safePhone">
                    <Input v-model="formData2.safePhone"  @on-blur="safePhoneCheck(formData2.safePhone)"/>
                </FormItem>
                <FormItem label="短信验证码" prop="code">
                    <Input v-model="formData2.code" style="width:240px;margin-right:10px"/><Button type="primary" @click="getNewCode(formData2.safePhone)">获取短信验证码</Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="changePhone('formData2')">提交修改</Button>
                </FormItem>
            </Form>
        </Row>
        <Row class="margin-top-20 margin-bottom-20"  v-if="step===3">
          <i-Col align="center"> <Icon type="checkmark" size="50" color="#19be6b"></Icon> 修改成功！</i-Col>
        </Row>
    </Card>
</template>

<script>
import api from "../../../api/company/index";
import loginApi from "../../../api/login/index";
import valid from "@/libs/valid.js"

export default {
  name: "modifyTel",
  data() {
    return {
      corpId: this.$route.query.corpId,
      step:1,
      formData: {
        safePhone: "",
        pwsd: "",
        code: ""
      },
      formData2: {
        safePhone: "",
        code: ""
      },
      rulesForm: {
        safePhone: [
          {
            required: true,
            message: "安全手机号不能为空",
            trigger: "blur"
          }
        ],
        pwsd: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    init() {
      // 获取当前安全手机
      api.getCurrentAccountInfoByUserId().then(response => {
        this.formData.safePhone = response.data.data.safePhone
      });
    },
    next(name) {
      // 下一步
      this.$refs[name].validate(valid => {
        if (valid) {
          api.updateAccountSafePhoneFirst(this.formData).then(response => {
            this.step=2
          });
        } else {
          this.$Notice.error({
            title: "验证未通过",
            duration: 2
          });
        }
      });
    },
    changePhone(name) {
      // 提交修改
      this.$refs[name].validate(valid => {
        if (valid) {
          api.updateAccountSafePhoneEnd(this.formData2).then(response => {
            this.step=3
          });
        } else {
          this.$Notice.error({
            title: "验证未通过",
            duration: 2
          });
        }
      });
    },
    getCode(phone){
      loginApi.getCode({telephone:phone}).then(response=>{
          this.$Notice.success({
            title: "发送手机验证码成功",
            duration: 2
          });
      })
    },
    getNewCode(phone){
      loginApi.getNewCode({telephone:phone}).then(response=>{
          this.$Notice.success({
            title: "发送手机验证码成功",
            duration: 2
          });
      })
    },
    safePhoneCheck(phone) {
      //手机号排重
      if(phone!="" && !valid.isPhone(phone)){
          this.$Notice.warning({
            title: "请输入正确格式的手机号码"
          });
      }
      else if(phone!="" && valid.isPhone(phone)){
      api.safePhoneCheck({ safePhone: phone }).then(response => {
          this.$Notice.success({
            title: "安全手机号可以使用"
          });
      })
        .catch(response => {
          this.$Notice.warning({
            title: "安全手机已存在"
          });
        });
      }
    }
  },
  created() {
    this.init();
  }
};
</script>
