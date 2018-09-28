<template>

	<Card span="100">
		<p slot="title">楼盘信息列表</p>
		<Form class="margin-top-20" ref="formData" :model="searchData" inline :label-width="100">
			<FormItem label="楼盘编号" prop="newcode">
				<Input v-model.trim="searchData.newcode"/>
			</FormItem>
			<FormItem label="楼盘名称" prop="projName">
				<Input v-model.trim="searchData.projName"/>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSearch('formData')">搜索</Button>
				<Button type="ghost" @click="handleCancel('formData')" style="margin-left: 8px">清空</Button>
			</FormItem>
		</Form>
		<Table border :columns="columns" :data="data"></Table>
		<Page :total="total" :current="searchData.pageNum" show-total @on-change="pageChange" align="right" class="margin-top-10"></Page>
	</Card>
</template>

<script>
    import api from '../../../api/city/index.js';

    export default {
	name: 'projList',
	data() {
		return {
			data: [],
			total: 0,
			searchData: {
				newcode: '',
				pageNum: 1,
				pageSize: 10
			},
			columns: [
				{
					key: 'newcode',
					title: '楼盘编号',
					align: 'center',
					minWidth: 100
				},
				{
					key: 'districtName',
					title: '区县',
					align: 'center',
					minWidth: 100
				},
				{
					key: 'areaName',
					title: '商圈',
					align: 'center',
					minWidth: 100
				},
				{
					key: 'projName',
					title: '楼盘名称',
					align: 'center',
					minWidth: 100
				},
				{
					key: 'agentCount',
					title: '已配置',
					align: 'center',
					minWidth: 100,
					render: (h, params) => {
						let row = params.row;
						return h(
							"a", {
								on: {
									click: () => {
										this.deploy(row.newcode, row.projName);
									}
								}
							},
							row.agentCount
						)
					}
				},
				{
					key: 'houseCount',
					title: '房源数',
					align: 'center',
					minWidth: 100
				},
				{
					title: "操作",
					key: "action",
					align: "center",
					minWidth: 135,
					render: (h, params) => {
						let row = params.row;
						let btn = h("ButtonGroup", [
							h(
								"Button", {
									props: {
										type: "ghost",
										size: 'small'
									},
									on: {
										click: () => {
											this.deploy(row.newcode, row.projName);
										}
									}
								},
								"配置"
							)
						]);
						return btn
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
			api.getProjList(obj).then(response => {
				this.data = response.data.data.data;
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
		},
		deploy(newcode, projName, agentId) {
			this.$router.push(
				{
					name: "projExpertList",
					query: {
						newcode: newcode,
						projName: projName
					}
				}
			)
		}
	},
	created() {
		this.init();
	}
};
</script>
