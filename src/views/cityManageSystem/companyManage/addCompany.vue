<template>
	<Card span="100">
		<p slot="title">新建企业</p>
		<Form :label-width="120">
			<Row>
				<Col span="10">
				<FormItem label="城市">
					<Input :value="cityName" disabled/>
				</FormItem>
				<FormItem label="层级">
					<RadioGroup v-model="level">
						<Radio label="公司"></Radio>
						<Radio label="门店"></Radio>
					</RadioGroup>
					<Alert v-show="level==''" type="warning">提示：只有1级的请选择公司。</Alert>
				</FormItem>
				</Col>
			</Row>
		</Form>
		<!--公司-->
		<div v-show="level=='公司'">
			<Form :label-width="120" ref="formValidate1" :model="formValidate1" :rules="ruleValidate1">
				<Row>
					<Col span="10">
					<FormItem label="企业名称" prop="corpName">
						<Input v-model="formValidate1.corpName" />
					</FormItem>
					<FormItem label="公司简称" prop="corpShortName">
						<Input v-model="formValidate1.corpShortName" />
					</FormItem>
					<FormItem label="地址" prop="corpAddress">
						<Input v-model="formValidate1.corpAddress" />
					</FormItem>
					<FormItem label="公司品牌" prop="companyBrand">
						<Select v-model="formValidate1.companyBrand">
							<Option value="我爱我家">我爱我家</Option>
							<Option value="中原地产">中原地产</Option>
							<Option value="麦田房产">麦田房产</Option>
							<!-- <Option value="相寓">相寓</Option> -->
							<Option value="其他">其他</Option>
						</Select>
					</FormItem>
					<FormItem label="企业LOGO" prop="corpLogo">
						<!-- <uploadimg @uploadData="uploadDataImg"></uploadimg> -->
						<div>
							<Upload action="/v1.0.0/sys/uploadImage" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png','gif']" :max-size="6144" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize">
								<Button type="ghost" icon="ios-cloud-upload-outline">上传企业logo</Button>
							</Upload>
							<p><img :src="$imgurl(formValidate1.logoUrl,'agent300x400')" alt="" @click="handleView" class="corpLogo"></p>
						</div>
						<Modal title="View Image" v-model="visible">
							<img :src="$imgurl(formValidate1.logoUrl,'agent300x400')" v-if="visible" style="width: 100%">
						</Modal>
						<div>

						</div>
						<Checkbox v-model="openAccount">开通企业账号</Checkbox>
						<Alert banner type="warning">提示：开通后企业账号不可修改。</Alert>
					</FormItem>
					<FormItem v-if="openAccount!=''" label="企业账号" prop="userName" :required="openAccount==''?false:true">
						<Input v-model="formValidate1.userName" @on-blur="userNameCheck(formValidate1.userName)" />
					</FormItem>

					<FormItem v-if="openAccount!=''" label="企业安全手机" prop="corpSafePhone" :required="openAccount==''?false:true">
						<Input v-model="formValidate1.corpSafePhone" @on-blur="safePhoneCheck(formValidate1.corpSafePhone)" />
					</FormItem>
					<FormItem>
						<Button type="primary" @click="handleSubmit1('formValidate1')" size="large"> 确 定 </Button>
					</FormItem>
					</Col>
				</Row>
			</Form>
		</div>
		<!--门店-->
		<div v-show="level=='门店'">
			<Form :label-width="120" ref="formValidate2" :model="formValidate2" :rules="ruleValidate2">
				<Row>
					<Col span="10">
					<FormItem label="企业名称" prop="corpName">
						<Input v-model="formValidate2.corpName" />
					</FormItem>
					<FormItem label="企业简称" prop="corpShortName">
						<Input v-model="formValidate2.corpShortName" />
					</FormItem>
					<FormItem label="公司品牌" prop="companyBrand">
						<Select v-model="formValidate2.companyBrand">
							<Option value="我爱我家">我爱我家</Option>
							<Option value="中原地产">中原地产</Option>
							<Option value="麦田房产">麦田房产</Option>
							<!-- <Option value="相寓">相寓</Option> -->
							<Option value="其他">其他</Option>
						</Select>
					</FormItem>
					<!--<FormItem label="公司简称" prop="corpShortName">-->
					<!--<Input v-model="formValidate2.corpShortName"/>-->
					<!--</FormItem>-->
					<FormItem label="所属区县" prop="districtId">
						<Select v-model="formValidate2.districtId">
							<Option v-for="item in districtData" :value="item.districtId +''" :key="item.districtId">{{ item.districtName }}</Option>
						</Select>
					</FormItem>
					<FormItem label="所属公司" prop="belongCorpId">
						<Select v-model="formValidate2.belongCorpId" :change="changeCorp(formValidate2.belongCorpId)">
							<Option v-for="item in corpData" :value="item.corpId +''" :key="item.corpId">{{ item.corpName }}</Option>
						</Select>
					</FormItem>
					<FormItem label="上级企业" prop="upCorpId">
						<Select v-model="formValidate2.upCorpId" :disabled="disabled" filterable remote clearable :remote-method="remoteMethod" :loading="ncLoading">
							<Option v-for="item in storeData" :value="item.corpId +''" :key="item.corpId">{{item.corpName}}</Option>
						</Select>
					</FormItem>
					<FormItem label="地址" prop="corpAddress">
						<Input v-model="formValidate2.corpAddress" />
					</FormItem>
					<FormItem>
						<Checkbox v-model="openAccount2">开通企业账号</Checkbox>
						<Alert banner type="warning">提示：开通后企业账号不可修改。</Alert>
					</FormItem>
					<FormItem v-if="openAccount2" label="企业账号" prop="userName" :required="openAccount2?true:false">
						<Input v-model="formValidate2.userName" @on-blur="userNameCheck(formValidate2.userName)" />
					</FormItem>
					<FormItem v-if="openAccount2" label="企业安全手机" prop="corpSafePhone" :required="openAccount2?true:false">
						<Input v-model="formValidate2.corpSafePhone" @on-blur="safePhoneCheck(formValidate2.corpSafePhone)" />
					</FormItem>
					<FormItem>
						<Button type="primary" @click="handleSubmit2('formValidate2')" size="large">确 定</Button>
					</FormItem>
					</Col>
				</Row>
			</Form>
		</div>
	</Card>
</template>

<script>
import api from '../../../api/company/index';
import valid from '@/libs/valid.js';
// import uploadimg from "../../my-components/upLoad";

export default {
	// components: { uploadimg },
	name: 'addCompany',
	data() {
		return {
			ncLoading: false,
			imgData: [], // 企业logo
			districtData: [], // 区县
			corpData: [], // 公司
			storeData: [], // 门店
			cityName: '',
			cityIdCurr: {
				// 当前城市
				cityId: ''
			},
			corpId: '',
			inputNotice: false,

			defaultList: [],
			data: '',
			imgName: '',
			visible: false,

			disabled: true,
			level: '',
			openAccount: '', // 是否开通企业账号-企业
			openAccount2: '', // 是否开通企业账号-门店
			formValidate1: {
				// 创建企业提交数据
				corpName: '',
				corpShortName: '',
				corpAddress: '',
				corpSafePhone: '',
				corpLogo: '',
				userName: '',
				logoUrl: '', // 图片链接，接口不接收
				companyBrand: ''
			},
			formValidate2: {
				// 创建门店提交数据
				corpName: '',
				corpAddress: '',
				corpSafePhone: '',
				userName: '',
				districtId: '',
				belongCorpId: '',
				upCorpId: '',
				companyBrand: ''
			},
			ruleValidate1: {
				// 企业验证
				corpName: [
					{
						required: true,
						message: '公司名称不能为空',
						trigger: 'blur'
					}
				],
				corpShortName: [
					{
						required: true,
						message: '公司简称不能为空',
						trigger: 'blur'
					}
				],
				corpAddress: [
					{
						required: true,
						message: '地址不能为空',
						trigger: 'blur'
					}
				],
				corpLogo: [
					{
						required: true,
						message: '企业Logo不能为空',
						trigger: 'blur'
					}
				],
				userName: [
					{
						validator: (rule, value, callback) => {
							if (this.openAccount !== '') {
								if (!/^\w+$/.test(value)) {
									callback(new Error('企业账号的格式不正确，只能是字母或数字'));
									return;
								}

							}
							callback();
						},
						message: '企业账号的格式不正确，只能是字母或数字',
						trigger: 'blur'
					}
				],
				corpSafePhone: [
					{
						validator: (rule, value, callback) => {
							if (this.openAccount !== '') {
								if (value === '' || !valid.isPhone(value)) {
									callback(new Error('安全手机号格式不正确'));
									return;
								}
							}
							callback();
						},
						message: '安全手机号格式不正确',
						trigger: 'blur'
					}
				],
				companyBrand: [
					{
						required: true,
						message: '公司品牌不能为空',
						trigger: 'blur'
					}
				]
			},
			ruleValidate2: {
				// 门店验证
				corpName: [
					{
						required: true,
						message: '公司名称不能为空',
						trigger: 'blur'
					}
				],
				corpShortName: [
					{
						required: true,
						message: '公司简称不能为空',
						trigger: 'blur'
					}
				],
				corpAddress: [
					{
						required: true,
						message: '地址不能为空',
						trigger: 'blur'
					}
				],
				userName: [
					{
						validator: (rule, value, callback) => {
							if (this.openAccount2 !== '') {
								if (!/^\w+$/.test(value)) {
									callback(new Error('企业账号的格式不正确，只能是字母或数字'));
									return;
								}
							}
							callback();
						},
						message: '企业账号的格式不正确，只能是字母或数字',
						trigger: 'blur'
					}
				],
				corpSafePhone: [
					{
						validator: (rule, value, callback) => {
							if (this.openAccount2 !== '') {
								if (value == '' || !valid.isPhone(value)) {
									callback(new Error('安全手机号格式不正确'));
									return;
								}

							}
							callback();
						},
						message: '安全手机号不能为空',
						trigger: 'blur'
					}
				],
				districtId: [
					{
						required: true,
						message: '所属区县不能为空',
						trigger: 'blur'
					}
				],
				belongCorpId: [
					{
						required: true,
						message: '所属公司不能为空',
						trigger: 'blur'
					}
				],
				upCorpId: [
					{
						required: true,
						message: '上级企业不能为空',
						trigger: 'blur'
					}
				],
				companyBrand: [
					{
						required: true,
						message: '公司品牌不能为空',
						trigger: 'blur'
					}
				]
			}
		};
	},
	watch: {
		openAccount: function (newvalue, oldvalue) {
			if (newvalue == '') {
				this.formValidate1.userName = '';
				this.formValidate1.corpSafePhone = '';
			}
		},
		openAccount2(newvalue, oldvalue) {
			if (!newvalue) {
				this.formValidate2.userName = '';
				this.formValidate2.corpSafePhone = '';
			}
		}
	},
	created() {
		this.getCity();
	},
	methods: {
		getCity() {
			api.getCurrentAccountInfoByUserId().then(response => {
				this.cityIdCurr.cityId = response.data.data.cityId;
				this.cityName = response.data.data.cityName;
				this.getDistrict(this.cityIdCurr.cityId);
				this.getCorpChoice(this.cityIdCurr.cityId);
			});
		},
		uploadDataImg(val) {
			// 企业logo
			this.formValidate1.corpLogo = val.url;
		},
		getDistrict(val) {
			// 获取本城市区县列表
			api.getDistrict({ cityId: val }).then(response => {
				this.districtData = response.data.data.data;
			});
		},
		getCorpChoice(val) {
			// 获取本城市公司列表
			api.getCorpChoice({ cityId: val }).then(response => {
				this.corpData = response.data.data.data;
			});
		},
		remoteMethod(query) {
			query = _.trim(query)
			if (query !== "") {
				this.ncLoading = true;
				api
					.getCorpNameByCorpId({
						corpId: this.formValidate2.belongCorpId,
						corpName: query
					})
					.then(response => {
						this.ncLoading = false;
						this.storeData = response.data.data.data;
					});
			} else {
				this.storeData = [];
			}
		},
		getCorpByCorpId(val) {
			api.getCorpByCorpId({ corpId: val }).then(response => {
				this.storeData = response.data.data.data;
				let that = this;
				this.corpData.forEach((item, index) => {
					if (item.corpId + '' == val) {
						that.storeData.unshift(item);
					}
				});
				// if (this.storeData.length > 0) {
				//     this.ruleValidate2.upCorpId[0].required = true;
				// } else {
				//     this.ruleValidate2.upCorpId[0].required = false;
				// }
			});
		},
		changeCorp(val) {
			if (this.corpId != val && val != '') {
				// this.getCorpByCorpId(val);
				this.disabled = false;
				this.corpId = val;
			} else if (val === '') {
				this.disabled = true;
			}
		},
		handleSubmit1(name) {
			// 创建企业
			if (this.openAccount == '') {
				this.ruleValidate1.userName[0].required = false;
				this.ruleValidate1.corpSafePhone[0].required = false;
			} else {
				this.ruleValidate1.userName[0].required = true;
				this.ruleValidate1.corpSafePhone[0].required = true;
			}
			this.$refs[name].validate(valid => {
				if (valid) {
					api
						.addCorp(this.formValidate1)
						.then(response => {
							this.$Notice.success({
								title: response.data.msg || '添加成功',
								duration: 2
							});
							this.$store.commit('removeTag', 'addCompany');
							this.$store.commit('removeTag', 'companyList');
							this.$router.push({ name: 'companyList' });
						})
						.catch(response => {
							this.$Notice.success({
								title: response.data.msg || '添加失败',
								duration: 2
							});
						});
				} else {
					this.$Notice.error({
						title: '验证未通过',
						duration: 2
					});
				}
			});
		},
		handleSubmit2(name) {
			// 创建门店
			if (this.openAccount2 == '') {
				this.ruleValidate2.userName[0].required = false;
				this.ruleValidate2.corpSafePhone[0].required = false;
			} else {
				this.ruleValidate2.userName[0].required = true;
				this.ruleValidate2.corpSafePhone[0].required = true;
			}
			this.$refs[name].validate(valid => {
				if (valid) {
					api.addStore(this.formValidate2).then(response => {
						this.$Notice.success({
							title: response.data.msg || '添加成功',
							duration: 2
						});
						this.$store.commit('removeTag', 'addCompany');
						this.$store.commit('removeTag', 'companyList');
						this.$router.push({ name: 'companyList' });
					});
				} else {
					this.$Notice.error({
						title: '验证未通过',
						duration: 2
					});
				}
			});
		},
		// 上传企业logo
		handleSuccess(response, file) {
			file.url = this.$imgurl(response.data.key, "agent300x400");
			//   file.name = response.data.key
			//   this.uploadList = file;
			this.formValidate1.corpLogo = response.data.key;
			this.formValidate1.logoUrl = file.url;
			//   this.init()
		},
		handleFormatError(file) {
			this.$Notice.warning({
				title: '文件格式错误',
				desc: '请上传jpg/jpeg/png/gif格式的文件'
			});
		},
		handleMaxSize(file) {
			this.$Notice.warning({
				title: '图片大小超标',
				desc: '请上传2M以内的图片.'
			});
		},
		handleView(name) {
			this.imgName = name;
			this.visible = true;
		},
		userNameCheck(name) {
			var nameRule = /^[0-9a-zA-Z_]{1,}$/;
			if (name != '' && !name.match(nameRule)) {
				this.$Notice.warning({
					title: '帐户名必须由英文字母、阿拉伯数字和下划线组成'
				});
			} else if (name != '') {
				// 用户名排重
				api
					.userNameCheck({ userName: name })
					.then(response => {
						this.$Notice.success({
							title: '用户名可以使用'
						});
					})
					.catch(response => {
						this.$Notice.warning({
							title: '用户名已存在'
						});
					});
			}
		},
		safePhoneCheck(phone) {
			// 手机号排重
			if (phone != '' && !valid.isPhone(phone)) {
				this.$Notice.warning({
					title: '请输入正确格式的手机号码'
				});
			} else if (phone != '' && valid.isPhone(phone)) {
				api
					.safePhoneCheck({ safePhone: phone })
					.then(response => {
						this.$Notice.success({
							title: '安全手机号可以使用'
						});
					})
					.catch(response => {
						this.$Notice.warning({
							title: '安全手机已存在'
						});
					});
			}
		}
	}
};
</script>
