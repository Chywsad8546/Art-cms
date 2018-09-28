<template>
  <span>
      <Button type="ghost"  v-if="!btnCodeDisabled" :disabled="isShow"  @click="sendVerifyCode()" >发送短信验证码</Button>
      <Button type="ghost"  v-else disabled>{{ textVerifycode }}</Button>
  </span>
</template>
<script>
import api from "@/api/agent/index.js";
export default {
  name: "verifyCode",
  props: {
    phone: {
      type: String
    },
    type: {
      default: 1
    },
    isShow: {
      default: false
    }
  },
  data() {
    return {
      time: 60,
      btnCodeDisabled: false
    };
  },
  computed: {
    textVerifycode: function() {
      return this.time >= 0 ? this.time + "s 后重新获取" : "发送短信验证码";
    }
  },
  methods: {
    // 倒计时
    countDown() {
      if (this.time > 0) {
        this.time--;
        setTimeout(this.countDown, 1000);
      } else {
        this.btnCodeDisabled = false; // 倒计时结束还原按钮可点
      }
    },
    // 经纪人、业主登录验证码请求/忘记密码 type0
    getVerifyCodeLogin() {
      api
        .getVerifyCode({
          telephone: this.phone
        })
        .then(response => {
          this.btnCodeDisabled = true; // 成功后设置按钮不可点
          this.time = 60; // 倒计时60s
          this.countDown(); // 开始倒计时
        });
    },
    // 注册时发送验证码请求 type1
    getVerifyCodeLogin1() {
      api
        .getVerifyCodeReg({
          telephone: this.phone
        })
        .then(response => {
          this.btnCodeDisabled = true; // 成功后设置按钮不可点
          this.time = 60; // 倒计时60s
          this.countDown(); // 开始倒计时
        })
        .catch(error => {
          if (error.response.data.code == 20008) {
            this.$Notice.error({
              title: "短信验证码发送过于频繁或已超出限制"
            });
          } else if (error.response.data.code == 20009) {
            this.$Notice.error({
              title: "短信验证码发送失败"
            });
          } else if (error.response.data.code == 20010) {
            this.$Notice.error({
              title: "短信平台异常"
            });
          }
        });
    },
    // 修改展示手机号 type2
    getVerifyCodeLogin2() {
      api
        .sendModifyPhoneCode({
          telephone: this.phone
        })
        .then(response => {
          this.btnCodeDisabled = true; // 成功后设置按钮不可点
          this.time = 60; // 倒计时60s
          this.countDown(); // 开始倒计时
        })
        .catch(error => {
          if (error.response.data.code == 20008) {
            this.$Notice.error({
              title: "短信验证码发送过于频繁或已超出限制"
            });
          } else if (error.response.data.code == 20009) {
            this.$Notice.error({
              title: "短信验证码发送失败"
            });
          } else if (error.response.data.code == 20010) {
            this.$Notice.error({
              title: "短信平台异常"
            });
          }
        });
    },
    // 发送验证码
    sendVerifyCode() {
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.phone == "" || !reg.test(this.phone)) {
        this.$Notice.error({
          title: "请正确输入手机号",
          duration: 2
        });
        return false;
      }
      if (this.type == 0) {
        this.getVerifyCodeLogin();
      } else if (this.type == 1) {
        this.getVerifyCodeLogin1();
      } else if (this.type == 2) {
        this.getVerifyCodeLogin2();
      }
    }
  },
  created(){
  }
};
</script>
