<template>
	<Card span="100">
		<Steps :current="current" size="small">
			<Step title="1：验证当前手机"></Step>
			<Step title="2：设置新安全手机"></Step>
			<Step title="3：修改成功"></Step>
		</Steps>
		<div v-if="current === 0">
			<Alert type="warning">提示：如当前安全手机无法接收短信，请联系客服修改</Alert>
			<Form ref="formData1" :model="formData1" :label-width="120" :rules="rulesForm1" style="width:400px;margin:20px auto" align="center">
				<FormItem label="当前安全手机号" prop="safePhone">
					<Input v-model="formData1.safePhone" disabled/>
				</FormItem>
				<FormItem label="登录密码" prop="pwsd">
					<Input type="password" v-model="formData1.pwsd" />
				</FormItem>
				<FormItem label="短信验证码" prop="code">
					<Row>
						<Col span="11">
						<Input v-model="formData1.code" />
						</Col>
						<Col span="11" offset="2">
						<Button :disabled="b1disable" @click="messageCode" type="primary">
							<span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
							<span v-if="!sendMsgDisabled">获取短信验证码</span>
						</Button>
						</Col>
					</Row>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="next('formData1')">下一步</Button>
				</FormItem>
			</Form>
		</div>

		<div v-else-if="current === 1">
			<Alert type="warning">提示：如当前安全手机无法接收短信，请联系修改</Alert>
			<Form ref="formData2" :model="formData2" :label-width="120" :rules="rulesForm2" style="width:400px;margin:20px auto" align="center">
				<FormItem label="新安全手机号" prop="safePhone">
					<Input type="tel" v-model="formData2.safePhone" />
				</FormItem>
				<FormItem label="短信验证码" prop="code">
					<Row>
						<Col span="11">
						<Input v-model="formData2.code" />
						</Col>
						<Col span="11" offset="2">
						<Button :disabled="newB1disable" @click="newMessageCode(formData2.safePhone)" type="primary">
							<span v-if="newSendMsgDisabled">{{newTime+'秒后获取'}}</span>
							<span v-if="!newSendMsgDisabled">获取短信验证码</span>
						</Button>
						</Col>
					</Row>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="next2('formData2')">下一步</Button>
				</FormItem>
			</Form>
		</div>

		<div v-else-if="current === 2">
			<Row>
				<Col align="center">
				<Icon size="120" color="green" type="ios-checkmark"></Icon>
				</Col>
			</Row>
			<Row>
				<Col align="center">
				<Button type="primary" @click="done()">完成</Button>
				</Col>
			</Row>
		</div>
	</Card>
</template>

<script>
import api from "../../../api/company/index.js";

export default {
	data() {
		return {
			b1disable: false,
			sendMsgDisabled: false,
			newB1disable: false,
			newSendMsgDisabled: false,
			time: 60,
			newTime: 60,
			current: 0,
			formData1: {
				safePhone: "",
				pwsd: "",
				code: ""
				/*  userId:''*/
			},
			formData2: {
				safePhone: "",
				code: ""
			},
			rulesForm1: {
				safePhone: [{
					required: false,
					message: "安全手机号不能为空",
					trigger: "blur"
				}],
				pwsd: [{
					required: true,
					message: "密码不能为空",
					trigger: "blur"
				}],
				code: [{
					required: true,
					message: "验证码不能为空",
					trigger: "blur"
				}]
			},
			rulesForm2: {
				safePhone: [{
					required: true,
					message: "安全手机号不能为空",
					trigger: "blur"
				}],
				code: [{
					required: true,
					message: "验证码不能为空",
					trigger: "blur"
				}]
			}
		};
	},
	methods: {
		//当前获取手机验证码
		messageCode() {
			api
				.sendModifySecurityPhoneCode()
				.then(response => {
					this.$Message.success("发送短信成功!");
					//获取验证码Button60秒不可点击倒计时
					let me = this;
					let interval = window.setInterval(function () {
						me.sendMsgDisabled = true;
						me.b1disable = true;
						if (me.time-- <= 0) {
							me.time = 60;
							me.sendMsgDisabled = false;
							me.b1disable = false;
							window.clearInterval(interval);
						}
					}, 1000);
				})
				.catch(error => {
					this.$Message.error(error.response.data.msg);
				});
		},
		//新手机验证码
		newMessageCode(phone) {
			api.sendNewPhoneCode({ telephone: this.formData2.safePhone }).then(response => {
				this.$Message.success("发送短信成功!");
				//获取验证码Button60秒不可点击倒计时
				let me = this;
				let interval = window.setInterval(function () {
					me.newB1disable = true;
					me.newSendMsgDisabled = true;
					if (me.newTime-- <= 0) {
						me.newTime = 60;
						me.newSendMsgDisabled = false;
						me.newB1disable = false;
						window.clearInterval(interval);
					}
				}, 1000);
			});
		},
		init() {
			api.getCurrentCorp().then(response => {
				this.formData1.safePhone = response.data.data.corpSafePhone;
				/*   this.formData1.userId=response.data.data.userId;*/ 
			});
		},
		//表单验证提交
		next(name) {
			// 下一步
			this.$refs[name].validate(valid => {
				//成功
				if (valid) {
					//设置需要的参数
					var next1Value = {
						code: this.formData1.code,
						pwsd: this.formData1.pwsd
					};
					//console.log(next1Value);

					api.updateAccountSafePhoneFirst(next1Value).then(response => {
						if (response.data.code === 0) {
							this.$Message.success("验证成功!");
							this.current = 1;
						}
					}).catch(e => {
						this.$Message.error(e.response.data.msg);
					});
				} else {
					this.$Message.error("请检查填写项目格式是否正确");
				}
			});
		},
		next2(name) {
			// 下一步
			this.$refs[name].validate(valid => {
				if (valid) {
					api.updateAccountSafePhoneEnd(this.formData2).then(response => {
						if (response.data.code === 0) {
							this.$Message.success("修改手机号成功!");
							this.current = 2;
						}
					}).catch(e => {
						this.$Message.error(e.response.data.msg);
					});
				} else {
					this.$Message.error("请检查填写项目格式是否正确");
				}
			});
		},
		done() {
			this.$router.push({
				name: "myInfo"
			});
		}
	},
	created() {
		this.init();
	}
};
</script>