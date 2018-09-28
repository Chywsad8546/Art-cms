<template>
  <Card>
    <p slot="title">修改密码</p>
    <Form ref="form" :model="form" :rules="ruleCustom" :label-width="120" style="width:500px;">
      <FormItem label="登录密码：" prop="pswd">
        <Input type="password" v-model="form.pswd"></Input>
      </FormItem>
      <FormItem label="新密码：" prop="newPswd" required>
        <Input type="password" v-model="form.newPswd"></Input>
        提示：6~16位，数字和字母。
      </FormItem>
      <FormItem label="确认新密码：" prop="newPswdSecound" required>
        <Input type="password" v-model="form.newPswdSecound"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('form')">提交</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import api from '@/api/agent/index.js';
import {logout} from '@/api/login/index';
export default {
    data () {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('密码不能为空'));
            } else {
                if (!/^\w{6,17}/.test(value)) {
                    callback(new Error('密码设置不符合要求，请重新输入'));
                } else {
                    if (this.form.newPswdSecound !== '') {
                        this.$refs.form.validateField('newPswdSecound');
                    }
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('确认密码不能为空'));
            } else if (value !== this.form.newPswd) {
                callback(new Error('确认密码输入与上一次输入不符'));
            } else {
                callback();
            }
        };
        return {
            form: {
                pswd: '',
                newPswd: '',
                newPswdSecound: ''
            },
            ruleCustom: {
                pswd: [
                    { required: true, message: '登录密码不能为空', trigger: 'blur' }
                ],
                newPswd: [{ validator: validatePass, trigger: 'blur' }],
                newPswdSecound: [{ validator: validatePassCheck, trigger: 'blur' }]
            }
        };
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    api
                        .updateAgentPassword(this.form)
                        .then(response => {
                            this.$Message.success('修改密码成功,请重新登录！');
                            // 退出登录
                            var that = this;
                            logout()
                                .then(function () {
                                    that.$store.commit('logout', that);
                                    that.$store.commit('clearOpenedSubmenu');
                                    that.$router.push({
                                        name: 'login'
                                    });
                                })
                                .catch(function () {
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