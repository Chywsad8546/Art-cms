<template>
  <div class="login">
    <div class="login-header">
      <div class="center">
        <div class="logo">
          <img src="@/images/agentSystem/login/logo.png" alt="有房帝">
          <img src="@/images/agentSystem/login/logo-msg.png" alt="">
        </div>
        <!--    <div class="nav">
          <a href="http://m.toutiaofangchan.com/bj/xinfang">新房</a>
          <a href="http://m.toutiaofangchan.com/bj/xiaoqu">小区</a>
          <a href="http://m.toutiaofangchan.com/bj/esf">二手房</a>
          <a href="http://m.toutiaofangchan.com/bj/zufang">租房</a>
        </div>-->
      </div>
    </div>

    <div class="login-con">
      <div class="center">
        <Card :bordered="false">
          <p slot="title">
            经纪人登录
          </p>
          <Form>
            <FormItem>
              <RadioGroup v-model="loginType" @on-change="loginTypeChange">
                <Radio label="密码登录">密码登录</Radio>
                <Radio label="手机验证码登录">手机验证码登录</Radio>
              </RadioGroup>
            </FormItem>
          </Form>

          <div class="form-con" v-if="!isWx">
            <Form ref="formPswd" :model="formPswd" :rules="formPswdRules" v-if="loginType == '密码登录'">
              <Row>
                <Col>
                <FormItem prop="userName">
                  <Input v-model.trim="formPswd.userName" placeholder="请输入注册手机号">
                  <span slot="prepend">
                    <Icon :size="20" type="person" color="#b2b2b2"></Icon>
                  </span>
                  </Input>
                </FormItem>
                </Col>

                <Col>
                <FormItem prop="pswd" :error="pswdErr?'账号或密码错误':''">
                  <Input v-model="formPswd.pswd" type="password" placeholder="请输入密码">
                  <span slot="prepend">
                    <Icon :size="20" type="locked" color="#b2b2b2"></Icon>
                  </span>
                  </Input>
                </FormItem>
                </Col>

                <Col span="24">
                <FormItem>
                  <Button @click="handleSubmit('formPswd')" type="primary" long>登录</Button>
                </FormItem>
                </Col>
                <Col span="10">
                <Checkbox v-model="single">记住用户名</Checkbox>
                </Col>

                <Col span="8" style="text-align:right;">
                <forget-pswd></forget-pswd>
                </Col>
                <Col span="4" offset="2">
                <!--其它登录方式：-->
                <!--<a @click="isWx = false">微信</a>-->

                <router-link to="/registerAgent">注册</router-link>
                </Col>
              </Row>
            </Form>

            <Form ref="formVerify" :model="formVerify" :rules="formVerifyRules" v-if="loginType == '手机验证码登录'">
              <Row>
                <Col span="24">
                <FormItem prop="userName">
                  <Input v-model.trim="formVerify.userName" placeholder="请输入注册手机号">
                  <span slot="prepend">
                    <Icon :size="20" type="person" color="#b2b2b2"></Icon>
                  </span>
                  </Input>
                </FormItem>
                </Col>
              </Row>
              <!-- <Row>
                <Col span="16">
                <FormItem prop="picYzm" :error="iserr2?'验证码错误':''">
                  <Input v-model.trim="formVerify.picYzm" placeholder="请输入右边验证码">
                  <span slot="prepend">
                    <Icon :size="20" type="locked" color="#b2b2b2"></Icon>
                  </span>
                  </Input>
                </FormItem>
                </Col>
                <Col span="7" offset="1">
                <div id="yzm">
                  <img class="yzming" @click="changeYzm" :src="verifyPicUrl1">
                </div>
                </Col>
              </Row> -->
              <Row>
                <Col span="15">
                <FormItem prop="verifyCode" :error="codeErr?'短信验证码错误':''">
                  <Input type="text" v-model.trim="formVerify.verifyCode" placeholder="请输入手机验证码">
                  <span slot="prepend">
                    <Icon :size="20" type="compose" color="#b2b2b2"></Icon>
                  </span>
                  </Input>
                </FormItem>
                </Col>
                <Col span="9" offset="">
                <FormItem>
                  <Button type="ghost" size="large" v-if="!btnCodeDisabled" @click="sendVerifyCode()">获取验证码</Button>
                  <Button type="ghost" v-else disabled>{{ textVerifycode }}</Button>
                </FormItem>
                </Col>
              </Row>

              <Row>
                <Col span="24">
                <FormItem>
                  <Button @click="handleSubmitVerify('formVerify')" type="primary" long>登录</Button>
                </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                <Checkbox v-model="single">记住用户名</Checkbox>
                </Col>
                <Col span="4" offset="2">
                <!--其它登录方式：-->
                <!--<a @click="isWx = false">微信</a>-->

                <router-link to="/registerAgent">注册</router-link>
                </Col>
              </Row>
            </Form>

          </div>

          <div class="wx" v-if="isWx" style="width:200px; height:200px; background:red;">
            微信
            <img src="" alt="">
            <p>请打开微信扫一扫上面的二维码登录</p>
          </div>
        </Card>
      </div>

    </div>

    <div class="login-footer">
      <p>记不住网址？这里也能登录
        <a class="dk" href="http://duankou.bidewu.com">duankou.bidewu.com</a>
        （端口.比得屋.com）
      </p>
      <p style="margin-top:10px">北京比得屋科技有限责任公司&nbsp;&nbsp;京ICP备17072148号</p>
    </div>

    <div :class="['qrcode-wrapper',{'qrcode-close':!showQr}]">
      <img width="16" src="@/images/agentSystem/login/guanbi@3x.png" alt="" class="close" @click="showQr = false">
      <div class="qrcode-down">
        <div class="title">
          <span class="msg1">扫描下载懂房帝APP</span><br>
          <span class="msg2">手机操作更方便</span>
        </div>
        <div class="img">
          <img width="108" src="@/images/agentSystem/login/qrcode.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/agent/index.js";
import Cookies from "js-cookie";
import forgetPswd from "./forgetPswd.vue";
import verifyCode from "../components/verifyCode.vue";
export default {
  components: {
    forgetPswd,
    verifyCode
  },
  data() {
    const validateYzm = async (rule, value, callback) => {
      if (value === "" || value.toString().length !== 4) {
        callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号不能为空"));
      } else {
        let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("手机号格式有误"));
        }
      }
    };
    return {
      showQr: true,
      iserr: false,
      iserr2: false,
      pswdErr: false,
      codeErr: false,
      single: undefined,
      loginType: "密码登录",
      verifyPicUrl1:
        this.$verifyPicUrl("v1.0.0/sys/createGraphicVerificationCode?source=agent_verify_login&v=" +
          Math.random()),
      isWx: false,
      vbtnDisabled: true,
      time: 60,
      btnCodeDisabled: false,
      // 密码登录
      formPswd: {
        userName: "",
        pswd: "",
      },
      // 验证码登录
      formVerify: {
        userName: "",
        verifyCode: "",
        // picYzm: ""
      },
      // 验证规则
      formPswdRules: {
        userName: [
          {
            type: "string",
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          },
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        pswd: [
          {
            type: "string",
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      },
      formVerifyRules: {
        userName: [
          {
            type: "string",
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          },
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        // picYzm: [{ type: "string", validator: validateYzm, trigger: "blur" }],
        // picYzm: [
        //   {
        //     required: true,
        //     message: "图形验证码不能为空",
        //     trigger: "blur"
        //   }
        // ],
        verifyCode: [
          {
            required: true,
            message: "短信验证码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?bf5fee5cecbf696457d42ee95a58b784";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  },
  computed: {
    textVerifycode: function () {
      return this.time >= 0 ? this.time + "s 后重新获取" : "获取验证码";
    }
  },
  methods: {
    // 用户密码登录
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.iserr = false;
          this.pswdErr = false;
          api
            .loginBypswd({
              userName: this.formPswd.userName,
              pswd: this.formPswd.pswd,
            })
            .then(({ data }) => {
              this.$Message.success("登录成功!");
              this.$router.replace({
                name: "home_index"
              });
            })
            .catch(error => {
              this.$Message.error(error.response.data.msg);
              if (error.response.data.msg.indexOf("用户名或密码错误") > -1) {
                this.formPswd.pswd = "";
                this.pswdErr = true;
                this.iserr = true;
              }
            });
        }
      });
    },
    // 倒计时
    countDown() {
      if (this.time > 0) {
        this.time--;
        setTimeout(this.countDown, 1000);
      } else {
        this.btnCodeDisabled = false; // 倒计时结束还原按钮可点
      }
    },
    // 发送验证码
    sendVerifyCode() {
      this.$refs.formVerify.validateField("userName", valid => {
        if (!valid) {
          api
            .getVerifyCode({
              telephone: this.formVerify.userName
            })
            .then(response => {
              if (response.data.code == 0) {
                this.btnCodeDisabled = true; // 成功后设置按钮不可点
                this.time = 60; // 倒计时60s
                this.countDown(); // 开始倒计时
              } else {
                this.$Message.error(response.data.msg);
              }
            })
            .catch(error => {
              this.$Message.error(error.response.data.msg);
            });
        } else {
        }
      });
    },
    // 手机验证码登录
    handleSubmitVerify(name) {
      this.iserr2 = false;
      this.codeErr = false;
      this.$refs[name].validate(valid => {
        if (valid) {
          api
            .loginByVerify({
              userName: this.formVerify.userName,
              verifyCode: this.formVerify.verifyCode,
              // graphicCode: this.formVerify.picYzm
            })
            .then(response => {
              this.$Message.success("登录成功!");
              this.$router.replace({
                name: "home_index"
              });
            })
            .catch(error => {
              this.verifyPicUrl1 =
                this.$verifyPicUrl("v1.0.0/sys/createGraphicVerificationCode?source=agent_verify_login&v=" +
                  new Date().getTime());
              let data = error.response.data;
              // if (data.msg.indexOf("图形验证码校验失败") > -1) {
              //   this.iserr2 = true;
              //   this.formVerify.picYzm = "";
              // }
              if (data.code == 20007) {
                this.$Message.error("用户名或验证码错误!");
                this.formVerify.verifyCode = "";
                this.codeErr = true;
              } else if (data.code === 20006) {
                this.$Message.error("手机号未注册！");
                this.$router.push({
                  name: "registerAgent"
                })
              } else {
                this.$Message.error(data.msg);
              }
            });
        }
      });
    },
    // 切换登陆验证码刷新
    loginTypeChange() {
      this.changeYzm();
    },
    // 刷新验证码
    changeYzm() {
      if (this.loginType == "密码登录") {
      } else {
        this.verifyPicUrl1 =
          this.$verifyPicUrl("v1.0.0/sys/createGraphicVerificationCode?source=agent_verify_login&v=" +
            new Date().getTime());
      }
    }
  }
};
</script>
<style lang="less">
.login {
  background-color: #fff;
  height: 100%;
  overflow: auto;
  .center {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
  }
}
.login-header {
  height: 86px;
  line-height: 86px;
  background-color: #fff;
  .logo {
    width: 680px;
    height: 86px;
    line-height: 86px;
    float: left;
    img {
      vertical-align: middle;
    }
    img:nth-child(2) {
      margin-left: 40px;
    }
  }
  .nav {
    float: right;
    height: 86px;
    padding-top: 10px;
    a {
      margin: 0 16px;
      color: #000;
    }
  }
}

.login-con {
  height: 600px;
  margin: 0 auto;
  background: #98b0d2 url("~@/images/agentSystem/login/bg.jpg") no-repeat center
    center;
  position: relative;
  .ivu-card {
    width: 320px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 62%;
    .ivu-card-head {
      padding: 0;
      p {
        text-align: center;
        height: 50px;
        line-height: 56px;
        font-size: 16px;
      }
    }
    .ivu-card-body {
      width: 320px;
      // height: 370px;
      padding: 0 35px 30px 35px;
      box-sizing: border-box;
      .ivu-form-item {
        text-align: center;
        .ivu-radio-group {
          margin-top: 10px;
        }
        .ivu-input-group-prepend {
          padding: 0;
        }
        .ivu-input-wrapper {
          .ivu-icon {
            border: 0 none;
            width: 40px;
            padding: 0;
          }
          .ivu-input {
            height: 40px;
          }
        }
      }
    }
  }
  .ivu-btn {
    height: 40px;
    line-height: 40px;
    padding: 0 5px;
  }
}

.login-footer {
  padding-top: 30px;
  color: #666;
  height: 100px;
  font-size: 14px;
  text-align: center;
  .dk {
    color: #333;
    font-weight: 700;
  }
}
.yzming {
  // width: 64px;
  height: 40px;
}
.qrcode-wrapper {
  width: 100%;
  height: 180px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 -1px 10px #eee;
  .close {
    position: absolute;
    top: 30px;
    right: 30px;
  }
  .qrcode-down {
    text-align: center;
    .title {
      display: inline-block;
      margin-top: 52px;
      text-align: left;
    }
    .img {
      display: inline-block;
      margin-top: 25px;
      margin-left: 40px;
      width: 120px;
      height: 120px;
      line-height: 120px;
      vertical-align: top;
      border: 1px solid #ddd;
      img {
        margin-top: 6px;
      }
    }
    .msg1 {
      font-size: 24px;
      font-weight: 700;
    }
    .msg2 {
      font-size: 16px;
      margin-top: 20px;
      vertical-align: middle;
    }
  }
}
.qrcode-close {
  bottom: -200px;
  transition: bottom 0.5s ease-out;
  cursor: pointer;
}
</style>
