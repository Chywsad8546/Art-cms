<template>
	<Card>
		<p slot="title">我的出售房源</p>
		<Menu mode="horizontal" theme="light" @on-select="skipPage" active-name="esfHouseManageOff_city">
			<MenuItem name="esfHouseManage_city"> 已发布
			</MenuItem>
			<MenuItem name="esfHouseManageWait_city"> 待发布
			</MenuItem>
			<MenuItem name="esfHouseManageOff_city"> 已下架
			</MenuItem>
		</Menu>
		<Form class="margin-top-20" ref="searchData" :model="searchData" inline :label-width="100">
			<FormItem label="房源ID">
				<Input v-model.trim="searchData.corpHouseId" />
			</FormItem>
			<FormItem label="楼盘名称">
				<Input v-model.trim="searchData.newcode" />
			</FormItem>
			<FormItem label="价格">
				<Row>
					<Col span="10">
					<Input v-model.trim="searchData.startPrice" />
					</Col>
					<Col span="2" align="center">至</Col>
					<Col span="10">
					<Input v-model.trim="searchData.endPrice" />
					</Col>
					<Col span="2">万元</Col>
				</Row>
			</FormItem>
			<FormItem label="排序">
				<Select v-model="searchData.sort" style="width: 141px">
					<Option value="1">录入时间从早到晚</Option>
					<Option value="2">录入时间从晚到早</Option>
				</Select>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSearch('searchData')">搜索</Button>
				<Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
			</FormItem>
		</Form>
		<Table border :columns="columns" :data="data"></Table>
		<Page :total="total" :current="searchData.pageNum" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" class="margin-top-10" align="right"></Page>
	</Card>
</template>

<script>
import houseApi from '@/api/house/index.js';
export default {
	name: 'esfHouseManageOff_city',
	data() {
		return {
			columns: [{
				key: 'corpHouseId',
				title: '房源ID',
				align: "center",
				width: 100
			},
			{
				key: 'houseId',
				title: '认领ID',
				align: "center",
				width: 100
			},
			{
				key: 'baseInfo',
				title: '基本信息',
				minWidth: 450,
				className: 'baseInforImg',
				render: (h, params) => {
					let row = params.row;
					let isRecommend = '';
					if (row.isRecommend == 1 || row.isRecommend == 2) {
						isRecommend = h(
							'Tag', {
								props: {
									color: 'red'
								}
							},
							'荐'
						);
					}

					// let isTop = h(
					//   "Tag",
					//   {
					//     props: {
					//       color: "red"
					//     }
					//   },
					//   "顶"
					// );
					let floor
					if (row.floor == '0') {
						floor = h(
							"span", {
								style: {
									marginRight: "5px"
								}
							},
							"暂无/" + row.totalFloor + "层"
						)
					} else {
						floor = h(
							"span", {
								style: {
									marginRight: "5px"
								}
							},
							row.floor + "层/" + row.totalFloor + "层"
						)
					}
					return h('div', [
						h('img', {
							attrs: {
								src: row.imagePath,
								width: 100,
								height: 80
							}
						}),
						h('p', [
							h(
								'a', {
									props: {
										type: 'text'
										// size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.$router.push({
												name: 'agentRentHouseDetail',
												query: {
													houseId: row.houseId
												}
											});
										}
									}
								},
								row.newcode // 楼盘名称
							),
							isRecommend,
							h('p', [
								floor,
								h(
									'span', {
										style: {
											marginRight: '5px'
										}
									},
									row.forwardDesc
								),
								h(
									'span', {
										style: {
											marginRight: '5px'
										}
									},
									row.room + '室' + row.hall + '厅'
								),
								h(
									'span', {
										style: {
											marginRight: '5px'
										}
									},
									row.buildArea + '㎡'
								),
								h(
									'span', {
										style: {
											marginRight: '5px'
										}
									},
									row.price + '万元'
								)
							]),
							h('p', row.houseTitle)
						])
					]);
				}
			},
			{
				title: "点击量",
				align: "center",
				children: [
					{
						key: "yesterday",
						title: "昨日",
						align: "center",
						minWidth: 60
					},
					{
						key: "lastWeek",
						title: "前7天",
						align: "center",
						minWidth: 60
					},
					{
						key: "thisMonth",
						title: "本月",
						align: "center",
						minWidth: 80
					}
				]
			},
			{
				key: 'userId',
				title: '录入人',
				width: 100
			},
			{
				key: 'createTime',
				title: '录入时间',
				width: 120
			},
			{
				title: '管理',
				key: 'action',
				align: 'center',
				width: 180,
				render: (h, params) => {
					return h(
						'a', {
							props: {
								type: 'text'
							},
							on: {
								click: () => {
									// this.remove(params.index)
								}
							}
						},
						'预览'
					);
				}
			}
			],
			searchData: {
				status: 2, // 0-待发布，1-已发布，2-已下架
				corpHouseId: '', //
				newcode: '', // 大楼名称
				startPrice: '',
				endPrice: '',
				mark: '1',
				pageNum: 1,
				pageSize: 10
			},
			data: [],
			initTable: [],
			total: 0
		};
	},
	methods: {
		skipPage(name) {
			this.$router.push({
				name: name
			});
		},
		init() {
			houseApi.listHouseEsf(this.searchData).then(response => {
				// this.data = this.initTable = response.data.data.data;
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
		pageChange(page) {
			this.searchData.pageNum = page;
			this.init();
		},
		sizeChange(size) {
			this.searchData.pageSize = size;
			this.init();
		}
	},
	created() {
		this.init();
	}
};
</script>

