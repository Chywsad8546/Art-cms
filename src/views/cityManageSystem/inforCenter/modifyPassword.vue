<template>
    <Card>
        <p slot="title"> 修改密码 </p>
        <Form ref="modifyForm" :model="form" :rules="rules" align="center" :label-width="120" style="width:500px">
            <FormItem prop="pswd" label="旧密码">
                <Input type="password" v-model="form.pswd"/>
            </FormItem>
            <FormItem prop="newPswd" label="新密码">
                <Input type="password" v-model="form.newPswd"/> 提示：6~16位，需同时包括数字、大写字母和小写字母。
            </FormItem>
            <FormItem prop="newPswdSecound" label="新密码">
                <Input type="password" v-model="form.newPswdSecound"/>
            </FormItem>
            <FormItem>
                <Button @click="handleSubmit('modifyForm')" type="primary">确定</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import api from "@/api/agent/index.js";
import {logout} from '@/api/login/index';
export default {
  name: "modifyPassword",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        let reg = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,16}$/;
        if (!reg.test(value)) {
          callback(new Error("密码设置不符合要求，请重新输入"));
        } else {
          if (this.form.newPswdSecound !== "") {
            this.$refs.modifyForm.validateField("newPswdSecound");
          }
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("新密码不能为空"));
      } else if (value !== this.form.newPswd) {
        callback(new Error("新密码输入与上一次输入不符"));
      } else {
        callback();
      }
    };
    return {
      form: {
        pswd: "",
        newPswd: "",
        newPswdSecound: ""
      },
      rules: {
        pswd: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        newPswd: [{ validator: validatePass, trigger: "blur" }],
        newPswdSecound: [{ validator: validatePassCheck, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {alert("0")
          api.updateAgentPassword(this.form)
            .then(response => {alert("1")
              this.$Message.success("修改密码成功,请重新登录！");
              // 退出登录
                    var that = this;
                    logout().then(function () {
                        that.$store.commit('logout', that);
                        that.$store.commit('clearOpenedSubmenu');
                        that.$router.push({
                            name: 'login'
                        });
                    }).catch(function () {
                        that.$store.commit('logout', that);
                        that.$store.commit('clearOpenedSubmenu');
                        that.$router.push({
                            name: 'login'
                        });
                    });
            })
            .catch(error => {
              this.$Message.error(error.response.data.msg);
            });
        }
      });
    }
  }
};
</script>
