<template>
	<Card span="100">
		<p slot="title">已机审经纪人列表</p>
		<Menu mode="horizontal" theme="light" @on-select="skipPage" active-name="auditedCert">
			<MenuItem name="auditedCert"> 已机审
			</MenuItem>
			<MenuItem name="auditedIdCardList"> 已审核
			</MenuItem>
		</Menu>

		<Form class="margin-top-20" ref="formData" :model="searchData" inline :label-width="100">
			<FormItem label="经纪人名称" prop="agentName">
				<Input v-model="searchData.agentName" />
			</FormItem>
			<FormItem label="登录手机号" prop="telephone">
				<Input v-model="searchData.telephone" />
			</FormItem>
			<FormItem label="认证结果" prop="authResult">
				<RadioGroup v-model="searchData.authResult">
					<Radio label="">全部</Radio>
					<Radio label="1">通过</Radio>
					<Radio label="2">不通过</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSearch('formData')">搜索</Button>
				<Button type="ghost" @click="handleCancel('formData')" style="margin-left: 8px">清空</Button>
			</FormItem>
		</Form>
		<Table border :columns="columns" :data="data"></Table>
		<Row type="flex" justify="end" style="margin-top:20px">
			<Page :total="total" :current="searchData.pageNum" @on-change="changePage"></Page>
		</Row>
	</Card>
</template>

<script>
import api from '../../../api/company/index.js';

export default {
    name: 'auditedCert',
    data () {
        return {
            data: [],
            initTable: [],
            total: 0,
			searchData: {
                isPerson: 0,
				agentName: '',
				telephone: '',
				AuthType: 2,
				authResult: '',
				pageNum: 1
			},

			columns: [{
				key: 'agentName',
				title: '姓名',
				align: "center",
				width: 100
			},
			{
				key: 'storeName',
				title: '所属门店',
				align: "center",
				width: 100
			},
			{
				key: 'corpShortName',
				title: '公司简称',
				align: "center",
				width: 100
			},
			{
				key: 'telephone',
				title: '登录手机号',
				align: "center",
				width: 120
			},
			{
				key: 'authType',
				title: '认证类型',
				align: "center",
				width: 100
			},
			{
				key: 'submitTime',
				title: '提交认证时间',
				align: "center",
				minWidth: 160
			},
			{
				key: 'result',
				title: '审核结果',
				align: "center",
				width: 100
			},
			{
				key: 'verifyUserName',
				title: '审核员',
				align: "center",
				width: 100
			},
			{
				key: 'verifyTime',
				title: '审核时间',
				align: "center",
				minWidth: 160
			},
			{
				key: 'action',
				title: '操作',
				align: "center",
				minWidth: 140,
				render: (h, params) => {
					let buttons = [];
					let btn = h(
						'a', {
							on: {
								click: () => {
									if (params.row.authType === '名片认证') {
										this.$router.push({
											name: 'auditedDetail',
											query: {
												agentId: params.row.agentId,
												auditType: '1'
											}
										});
									} else if (params.row.authType === '身份证认证') {
										this.$router.push({
											name: 'auditedDetail',
											query: {
												agentId: params.row.agentId,
												auditType: '2'
											}
										});
									}
								}
							}
						},
						'经纪人审核详情'
					);
					buttons.push(btn);
					return h('div', buttons);
				}
			}
			]
		};
	},
	methods: {
		init() {
			// if(this.searchData.agentName||this.searchData.telephone) {
			api.getAgentAuditedList(this.searchData).then(response => {
				this.data = this.initTable = response.data.data.data;

				this.total = response.data.data.total;
			});
			// } else {
			//     this.data=[];
			// }
		},
		handleSearch() {
			this.searchData.pageNum = 1;
			this.init();
		},
		handleCancel(name) {
			this.$refs[name].resetFields();
			this.searchData.pageNum = 1;
			this.init();
		},
        skipPage(name) {
            this.$router.push({
                name: name
            });
        },
		changePage(page) {
			this.searchData.pageNum = page
			this.init()
		}

	},
	created() {
		this.init();
	}
};
</script>
