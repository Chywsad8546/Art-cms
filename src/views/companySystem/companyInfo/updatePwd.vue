<template>
	<Card>
		<p slot="title"> 修改密码 </p>
		<Form ref="modifyForm" :model="form" :rules="rules" align="center" :label-width="120" style="width:500px">
			<FormItem prop="pswd" label="旧密码">
				<Input type="password" v-model="form.pswd" />
			</FormItem>
			<FormItem prop="newPswd" label="新密码" required>
				<Input type="password" v-model="form.newPswd" />
			</FormItem>
			<FormItem prop="newPswdSecound" label="重新输入新密码" required>
				<Input type="password" v-model="form.newPswdSecound" />
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('modifyForm')">确定</Button>
				<Button type="ghost" @click="handleReset('modifyForm')" style="margin-left: 8px">重置</Button>
			</FormItem>
		</Form>
	</Card>
</template>

<script>
import api from '../../../api/company/index.js';
export default {
	name: 'modifyPassword',
	data() {
		// 自定义重新输入密码input的验证规则
		const validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (value === this.form.pswd) {
					callback(new Error('新密码不能跟旧密码相同'));
				}

				let reg = /^\w{6,17}$/;
				if (!reg.test(value)) {
					callback(new Error('请输入6-20个字符'));
				}
				if (this.form.newPswdSecound !== '') {
					// 对第二个密码框单独验证
					this.$refs.modifyForm.validateField('newPswdSecound');
				}
				callback();
			}
		};
		const validatePassCheck = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.form.newPswd) {
				callback(new Error('两次密码输入不一致'));
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
			rules: {
				pswd: [
					{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}
				],
				newPswd: [
					{
						validator: validatePass,
						trigger: 'blur'
					}
				],
				newPswdSecound: [
					{
						validator: validatePassCheck,
						trigger: 'blur'
					}
				]
			}
		};
	},
	methods: {
		handleSubmit(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					api.updateCompanyPwd(this.form).then(({ data }) => {
						this.$Message.success(data.data);
						this.$router.push('myInfo');
					});
				} else {
					this.$Message.error('Fail!');
				}
			});
		},
		handleReset(name) {
			this.$refs[name].resetFields();
		}
	}
};
</script>