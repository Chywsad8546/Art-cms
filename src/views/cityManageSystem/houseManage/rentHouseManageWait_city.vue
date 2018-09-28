<template>
	<Card>
		<p slot="title">待发布-出租房源管理</p>
		<Menu mode="horizontal" theme="light" @on-select="skipPage" active-name="rentHouseManageWait_city">
			<MenuItem name="rentHouseManage_city"> 已发布
			</MenuItem>
			<MenuItem name="rentHouseManageWait_city"> 待发布
			</MenuItem>
			<MenuItem name="rentHouseManageOff_city"> 已下架
			</MenuItem>
		</Menu>
		<Form class="margin-top-20" ref="searchData" :model="searchData" inline :label-width="100">
			<FormItem label="房源ID" prop="houseId">
				<Input v-model.trim="searchData.houseId" />
			</FormItem>
			<FormItem label="楼盘名称" prop="projName">
				<Input v-model.trim="searchData.projName" />
			</FormItem>
			<FormItem label="区县商圈">
				<Cascader v-model="sqData" :data="sqList" change-on-select @on-change="sqChange">
				</Cascader>
			</FormItem>

			<FormItem label="价格">
				<Row>
					<Col span="8">
					<Input v-model.trim="searchData.startPrice" />
					</Col>
					<Col span="2" style="text-align: center">至</Col>
					<Col span="8">
					<Input v-model.trim="searchData.endPrice" />
					</Col>
					<Col span="3">元/月</Col>
				</Row>
			</FormItem>
			<FormItem label="录入人" prop="agentName">
				<Input v-model.trim="searchData.agentName" />
			</FormItem>
			<FormItem label="录入手机号" prop="phone">
				<Input v-model.trim="searchData.phone" />
			</FormItem>
			<FormItem label="筛选">
				<RadioGroup>
					<Radio label="1">全选</Radio>
					<Radio label="2">置顶房源</Radio>
					<Radio label="3">店铺推荐房源</Radio>
				</RadioGroup>
			</FormItem>
			<!-- <FormItem label="排序">
                    <Select v-model="searchData.sort" style="width: 141px">
                        <Option value="1">录入时间从早到晚</Option>
                        <Option value="2">录入时间从晚到早</Option>
                    </Select>
                </FormItem> -->
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
import api from '../../../api/company/index';
import agentApi from '@/api/agent/index';
import houseApi from '@/api/house/index';
import mixin from "@/mixin/index.js";
export default {
	name: 'RentHouseManageWait_city',
	mixins: [mixin],
	data() {
		return {
			columns: [{
				key: 'houseId',
				title: '房源ID',
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
					let isTop = h(
						'Tag', {
							props: {
								color: 'red'
							}
						},
						'顶'
					);
					return h('div', [
						h('img', {
							attrs: {
								src: this.$imgurl(row.titlePic, "agent500x300"),
								width: 100,
								height: 80
							},
              on: {
                error: this.$imgerr
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
												name: 'rentHouseDetail_city',
												query: {
													houseId: row.houseId
												}
											});
										}
									}
								},
								row.projName // 楼盘名称
							),
							isRecommend,
							h('p', [
								h(
									'span', {
										style: {
											marginRight: '5px'
										}
									},
									row.floor + '层/' + row.totalFloor + '层'
								),
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
									row.room + '室' + row.hall + '厅' + row.toilet + '卫'
								),
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
									row.area + '㎡'
								),
								h(
									'span', {
										style: {
											marginRight: '5px'
										}
									},
									row.rentPrice + '元/月'
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
						minWidth: 80
					},
					{
						key: "lastWeek",
						title: "前7天",
						align: "center",
						minWidth: 80
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
				key: 'agentName',
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
					return h('div', []);
				}
			}
			],
			sqData: [],
			searchData: {
				status: 0, // 0-待发布，1-已发布，2-已下架
				houseId: undefined, //
				projName: undefined, // 大楼名称
				startPrice: undefined,
				endPrice: undefined,
				agentName: undefined,
				phone: undefined,
				districtId: undefined,
				areaId: undefined,
				sort: '2',
				pageNum: 1,
				pageSize: 10
			},
			data: [],
			initTable: [],
			total: 0,
			cityId: undefined,
		};
	},
	methods: {
		skipPage(name) {
			this.$router.push({
				name: name
			});
		},
		init() {
			houseApi.listHouseRent(this.searchData).then(response => {
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
			this.sqData = [];
			this.searchData.districtId = undefined;
			this.searchData.areaId = undefined;
			this.init();
		},
		pageChange(page) {
			this.searchData.pageNum = page;
			this.init();
		},
		sizeChange(size) {
			this.searchData.pageSize = size;
			this.init();
		},
		// 获取城市id
		getCity() {
			api
				.getCurrentAccountInfoByUserId()
				.then(response => {
					this.cityId = response.data.data.cityId;
				})
		},
		sqChange(v) {
			console.log(v);
			this.searchData.districtId = v[0];
			this.searchData.areaId = v[1];
		}
	},
	created() {
		this.getCity();
		this.init();
	}
};
</script>

