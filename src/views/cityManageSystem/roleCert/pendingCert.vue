<template>

	<Card span="100">
		<p slot="title">待审核经纪人列表</p>
		<Menu mode="horizontal" theme="light" @on-select="skipPage" active-name="pendingCert">
			<MenuItem name="pendingCert">  待审核
			</MenuItem>
			<MenuItem name="auditedBusiCardList"> 已审核
			</MenuItem>
		</Menu>

		<Form class="margin-top-20" ref="formData" :model="searchData" inline :label-width="100">
			<FormItem label="经纪人名称" prop="agentName">
				<Input v-model="searchData.agentName" />
			</FormItem>
			<FormItem label="登录手机号" prop="telephone">
				<Input v-model="searchData.telephone" />
			</FormItem>
			<!--<FormItem label="认证类型" prop="AuthType">-->
			<!--<RadioGroup v-model="searchData.AuthType">-->
			<!--<Radio label="">全部</Radio>-->
			<!--<Radio label="1">名片认证</Radio>-->
			<!--<Radio label="2">身份认证</Radio>-->
			<!--</RadioGroup>-->
			<!--</FormItem>-->
			<FormItem>
				<Button type="primary" @click="handleSearch('formData')">搜索</Button>
				<Button type="ghost" @click="handleCancel('formData')" style="margin-left: 8px">清空</Button>
			</FormItem>
		</Form>
		<Table border :columns="columns" :data="data"></Table>
		<!--<Page :total="total" show-total @on-change="pageChange" class="margin-top-10"-->
		<!--align="right"></Page>-->
	</Card>
</template>

<script>
import api from '../../../api/company/index.js';

export default {
	name: 'pendingCert',
	data() {
		return {
			data: [],
			initTable: [],
			total: 0,
			searchData: {
				agentName: '',
				telephone: '',
				AuthType: 1,
				pageNum: 1
			},

			columns: [
				{
					key: 'agentId',
					title: '经纪人ID',
					align:"center",
					minWidth: 100
				},
				{
					key: 'agentName',
					title: '姓名',
					align:"center",
					minWidth: 100
				},
				{
					key: 'corpShortName',
					title: '公司简称',
					align:"center",
					minWidth: 100
				},
				{
					key: 'telephone',
					title: '登录手机号',
					align:"center",
					minWidth: 120
				},
				{
					key: 'authType',
					title: '认证类型',
					align:"center",
					minWidth: 100
				},
				{
					key: 'submitTime',
					title: '提交认证时间',
					align:"center",
					minWidth: 160
				},
				{
					key: 'action',
					title: '操作',
					align:"center",
					minWidth: 100,
					render: (h, params) => {
						let buttons = [];
						let btn = h(
							'Button',
							{
								props: {
									type: "primary"
								},
								on: {
									click: () => {
										if (params.row.authType === '名片认证') {
											this.$router.push({
												name: 'auditedDetail',
												query: { agentId: params.row.agentId, auditType: '1' }
											});
										} else if (params.row.authType === '身份证认证') {
											this.$router.push({
												name: 'auditedDetail',
												query: { agentId: params.row.agentId, auditType: '2' }
											});
										}
									}
								}
							},
							'审核'
						);
						if (params.row.authType === '身份证认证') {
							if (params.row.idCardNo && params.row.idCardNo.length > 16) {
								buttons.push(btn);
							} else {
								buttons.push(h(
									'p',
									{
									},
									'无身份证'
								));
							}
						} else {
							buttons.push(btn);
						}
						return h('div', buttons);
					}
				}
			]
		};
	},
	methods: {
        skipPage(name) {
            this.$router.push({
                name: name
            });
        },
		init() {
			this.pageChange(1);
		},
		pageChange(cuPage) {
			let obj = Object.assign(this.searchData, { pageNum: cuPage });
			api.getAgentAuditList(obj).then(response => {
				this.data = this.initTable = response.data.data.data;
				this.total = response.data.data.total;
			});
		},
		handleSearch() {
			this.searchData.pageNum = 1;
			this.init();
		},
		handleCancel(name) {
			this.$refs[name].resetFields();
			this.searchData.pageNum = 1;
			this.init();
		}
	},
	created() {
		this.init();
	}
};
</script>
