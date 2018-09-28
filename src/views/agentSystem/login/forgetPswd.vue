<template>
	<div>
		<div>
			<a @click="show=true">忘记密码</a>
		</div>
		<Modal v-model="show" title="忘记密码" ok-text="提交" :loading="loading" @on-ok="ok">
			<Form ref="formVerify" :model="formVerify" :rules="rules">
				<Row>
					<Col span="24">
					<FormItem prop="userName">
						<Input v-model="formVerify.userName" placeholder="请输入登录手机号">
						<span slot="prepend">
							<Icon :size="16" type="person"></Icon>
						</span>
						</Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="12">
					<FormItem prop="verifyCode">
						<Input type="text" v-model="formVerify.verifyCode" placeholder="请输入手机验证码">
						<span slot="prepend">
							<Icon :size="14" type="locked"></Icon>
						</span>
						</Input>
					</FormItem>
					</Col>
					<Col span="8" offset="4">
					<FormItem>
						<Button type="ghost" v-if="!btnCodeDisabled" @click="sendVerifyCode()">发送短信验证码</Button>
						<Button type="ghost" v-else disabled>{{ textVerifycode }}</Button>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="24">
					<FormItem prop="newPswd">
						<Input type="password" v-model="formVerify.newPswd" placeholder="请输入新密码">
						<span slot="prepend">
							<Icon :size="14" type="locked"></Icon>
						</span>
						</Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="24">
					<FormItem prop="newPswd2">
						<Input type="password" v-model="formVerify.newPswd2" placeholder="确认新密码">
						<span slot="prepend">
							<Icon :size="14" type="locked"></Icon>
						</span>
						</Input>
					</FormItem>
					</Col>
				</Row>
			</Form>

		</Modal>
	</div>
</template>
<script>
import api from '@/api/agent/index.js';
export default {
	data() {
		return {
			loading: true,
			show: false,
			time: 60,
			btnCodeDisabled: false,
			formVerify: {
				userName: '',
				verifyCode: '',
				newPswd: '',
				newPswd2: ''
			},
			// 验证规则
			rules: {
				userName: [
					{ required: true, message: '手机号不能为空', trigger: 'blur' },
					{ validator: this.validatePhone, trigger: 'blur' }
				],
				verifyCode: [
					{ required: true, message: '短信验证码不能为空', trigger: 'blur' }
				],
				newPswd: [
					{ required: true, message: '新密码不能为空', trigger: 'blur' },
					{ validator: this.validateNewPswd, trigger: 'blur' }
				],
				newPswd2: [
					{ required: true, message: '确认新密码不能为空', trigger: 'blur' },
					{ validator: this.validateNewPswd2, trigger: 'blur' }
				]
			}
		};
	},
	computed: {
		textVerifycode: function () {
			return this.time >= 0 ? this.time + 's 后重新获取' : '发送短信验证码';
		}
	},
	methods: {
		validatePhone(rule, value, callback) {
			if (value === '') {
				callback(new Error('手机号不能为空'));
			} else {
				let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (reg.test(value)) {
					callback();
				} else {
					callback(new Error('手机号格式有误'));
				}
			}
		},
		validateNewPswd(rule, value, callback) {
			if (value === '') {
				callback(new Error('新密码不能为空'));
			} else {
				if (!/^[a-zA-Z0-9]{6,16}$/.test(value)) {
					callback(new Error('新密码需为6-16位数字和字母的组合'));
				} else {
					callback();
				}
			}
		},
		validateNewPswd2(rule, value, callback) {
			if (value !== this.formVerify.newPswd) {
				callback(new Error('确认密码必须和新密码相同'));
			} else {
				callback()
			}
		},
		changeLoading() {
			this.loading = false;
			this.$nextTick(() => {
				this.loading = true;
			});
		},
		ok() {
			this.forgetPassword('formVerify');
		},
		forgetPassword(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					api
						.forgetPassword(this.formVerify)
						.then(response => {
							this.$Message.success('修改成功');
							this.show = false;
						})
						.catch(error => {
							this.changeLoading();
							this.$Message.error(error.response.data.msg);
						});
				} else {
					this.changeLoading();
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
			if (this.formVerify.userName === '') {

			} else {
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
						console.log(
							'发送验证码code：' + JSON.stringify(response.data.code)
						);
					});
			}
		}
	}
};
</script>
