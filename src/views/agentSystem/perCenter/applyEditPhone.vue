<template>
    <span>
        <a @click="open">申请修改</a>
        <Modal v-model="show" :loading="loading" title="修改展示电话" ok-text="提交" ok-cancel="取消" @on-ok="ok('form')" @on-cancel="cancel">
            <Form ref="form" :model="form" :label-width="120" :rules="ruleValidate">
                <FormItem label="登录密码" prop="pswd">
                    <Input v-model="form.pswd" type="password" placeholder="请输入登录密码">
                    </Input>
                </FormItem>
                <FormItem label="登录手机号">
                    {{tel}}
                </FormItem>
                <FormItem label="短信验证码" prop="code">
                    <Row>
                        <Col span="10">
                        <Input type="text" v-model="form.code" placeholder="请输入手机验证码">
                        <span slot="prepend">
                            <Icon :size="14" type="locked"></Icon>
                        </span>
                        </Input>
                        </Col>
                        <Col span="8">
                        <verify-code :phone="this.tel" :type="2"></verify-code>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="新电话" prop="displayPhone" required>
                    <Input v-model="form.displayPhone" placeholder="请输入新手机号" />
                </FormItem>
            </Form>


        </Modal>
    </span>
</template>
<script>
import api from "@/api/agent/index.js";
import verifyCode from "../components/verifyCode.vue";
export default {
  components: {
    verifyCode
  },
  props: {
    tel: {
      type: String
    }
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("手机号不能为空"));
      } else {
        // if (!this.$valid.isPhone(value)) {
        //   // 对第二个密码框单独验证
        //   callback(new Error("手机格式不正确"));
        // }
        callback();
      }
    };

    return {
      show: false,
      loading: true,
      form: {
        pswd: "",
        displayPhone: "",
        telephone: "",
        code: ""
      },
      ruleValidate: {
        pswd: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        displayPhone: [
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "短信验证码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    open() {
      this.show = true;
      this.loading = true;
    },
    ok(name) {
      this.form.telephone = this.tel;
      this.$refs[name].validate(valid => {
        if (valid) {
          api
            .updateAgentDisplayPhone(this.form)
            .then(response => {
              if (response.data.code == 0) {
                this.$Message.success("展示电话修改成功！");
                this.loading = false;
                this.sendMsg();
                this.show = false;
              }
            })
            .catch(error => {
              this.loading = false;
              this.$Message.error(error.response.data.msg);
            });
        } else {
          this.show = true;
          this.loading = false;
        }
      });
    },
    cancel() {},
    sendMsg() {
      this.$emit("changeEvent", this.form);
    }
  }
};
</script>