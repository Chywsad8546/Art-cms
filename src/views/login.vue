<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="wrapper">
    <div class="left">
      <div class="nav">
        <a href="http://m.toutiaofangchan.com/bj/xinfang">新房</a>
        <a href="http://m.toutiaofangchan.com/bj/xiaoqu">小区</a>
        <a href="http://m.toutiaofangchan.com/bj/esf">二手房</a>
        <a href="http://m.toutiaofangchan.com/bj/zufang">租房</a>
      </div>
    </div>

    <div class="right">

      <div class="login" @keydown.enter="handleSubmit">
        <p class="title">
          企业账号登录
        </p>
        <div class="login-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入用户名">
              </Input>
            </FormItem>
            <FormItem prop="pswd">
              <Input type="password" v-model="form.pswd" placeholder="请输入密码">
              </Input>
            </FormItem>
            <Row>
              <Col span=12>
              <FormItem>
                <Radio class="remember" label="remember">
                  记住用户名
                </Radio>
              </FormItem>
              </Col>
              <Col span=12>
              <FormItem>
                <Button @click="handleSubmit" type="primary" long>登录</Button>
              </FormItem>
              </Col>
            </Row>
          </Form>
          <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
        </div>
      </div>

      <div class="logo">
        <img src="@/images/agentSystem/login/logo.png" alt="有房帝">
        <img src="@/images/agentSystem/login/logo-msg.png" alt="">
      </div>
    </div>

  </div>

</template>

<script>
import api from "../api/login/index";
export default {
  data() {
    return {
      form: {
        userName: "",
        pswd: ""
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        pswd: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          api.AccountLogin(this.form).then(response => {
            this.$router.push({
              name: "home_index"
            });
          }).catch(response => {
            this.$Notice.warning({
              title: response.msg || "用户名密码错误"
            });
          })
        }
      });
    }
  }
};
</script>
