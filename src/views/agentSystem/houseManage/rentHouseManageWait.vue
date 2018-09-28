<template>
	<Card>
		<p slot="title">我的出租房源</p>
		<houseNumRent ref="houseNum"></houseNumRent>
		<Menu mode="horizontal" theme="light" @on-select="skipPage" active-name="agentRentHouseManageWait">
			<MenuItem name="agentRentHouseManage"> 已发布
			</MenuItem>
			<MenuItem name="agentRentHouseManageWait"> 待发布
			</MenuItem>
			<MenuItem name="agentRentHouseManageOff"> 已下架
			</MenuItem>
		</Menu>
		<Form class="margin-top-20" ref="searchData" :model="searchData" inline :label-width="100">
			<FormItem label="房源ID" prop="houseId">
				<Input v-model="searchData.houseId" style="width:140px" />
			</FormItem>
			<FormItem label="楼盘名称" prop="projName">
				<Input v-model="searchData.projName" style="width:140px" />
			</FormItem>
			<FormItem label="价格">
				<Row>
					<Col span="10">
					<FormItem prop="startPrice">
						<Input v-model="searchData.startPrice" style="width:140px" />
					</FormItem>
					</Col>
					<Col span="2" style="text-align: center">至</Col>
					<Col span="10">
					<FormItem prop="endPrice">
						<Input v-model="searchData.endPrice" style="width:140px" />
					</FormItem>
					</Col>
					<Col span="2">元/月</Col>
				</Row>
			</FormItem>
			<FormItem label="排序" prop="sort">
				<Select v-model="searchData.sort" style="width: 141px">
					<Option value="1">录入时间从早到晚</Option>
					<Option value="2">录入时间从晚到早</Option>
				</Select>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSearch('searchData')" style="margin-left: 8px">搜索</Button>
				<Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="multiPublish">批量发布</Button>
			</FormItem>
		</Form>
		<Table @on-selection-change="(sel)=>{multiSelArr=sel}" border :columns="columns" :data="data"></Table>
		<Page :total="total" :current="searchData.pageNum" @on-change="pageChange" @on-page-size-change="sizeChange" class="margin-top-10" align="right"></Page>
		<bottomAlert></bottomAlert>
	</Card>
</template>

<script>
import houseApi from '@/api/house/index.js';
import bottomAlert from '@/views/agentSystem/houseManage/components/bottomAlert';
import houseNumRent from '@/views/agentSystem/houseManage/components/houseNumRent';
import moment from "moment"
export default {
	name: 'rentHouseManageWait',
	components: {
		bottomAlert,
		houseNumRent
	},
	data() {
		return {
			columns: [
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					key: 'houseId',
					title: '房源ID',
					align: "center",
					width: 120
				},
				{
					key: 'baseInfo',
					title: '基本信息',
					className: 'baseInforImg',
					minWidth: 500,
					render: (h, params) => {
						let row = params.row;
						let isRecommend;
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
									src: this.$imgurl(row.titlePic, 'agent500x300'),
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
													name: 'agentRentHouseDetail',
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
					key: 'createTime',
					title: '录入时间',
					align: "center",
					width: 200,
					render: (h, params) => {
						let createTime = params.row.createTime;
						return h("span", createTime ? moment(createTime).format("YYYY-MM-DD HH:mm") : '')
					}
				},
				{
					title: '管理',
					key: 'action',
					align: 'center',
					width: 250,
					render: (h, params) => {
						let row = params.row;
						let button_fabu = h(
							'Button', {
								props: {
									type: "ghost",
									size: 'small'
								},
								style: {
									// border: "1px solid #57a3f3",
									// color: "#57a3f3"
								},
								on: {
									click: () => {
										this.changeState(1, params.index);
									}
								}
							},
							'发布'
						)
						let buttons = [
							h(
								'Button', {
									props: {
										type: "ghost",
										size: 'small'
									},
									style: {
										// border: "1px solid #57a3f3",
										// color: "#57a3f3"
									},
									on: {
										click: () => {
											this.delHouse(params.index);
										}
									}
								},
								'删除'
							),
							h(
								"Button", {
									props: {
										type: "ghost",
										size: 'small'
									},
									style: {
										// border: "1px solid #57a3f3",
										// color: "#57a3f3"
									},
									on: {
										click: () => {
											this.$router.push({
												name: "agentRentHouseDetail",
												query: {
													houseId: row.houseId
												}
											});
										}
									}
								},
								"修改"
							)
						];
						if (this.$hasAuth('renhouseadd_button_addrenthouse')) {
							buttons.unshift(button_fabu);
						}
						return h('div', [
							h('ButtonGroup', buttons)
						]);
					}
				}
			],
			searchData: {
				status: 0, // 0-待发布，1-已发布，2-已下架
				houseId: '', //
				projName: '', // 大楼名称
				startPrice: '',
				endPrice: '',
				sort: '1',
				pageNum: 1,
				pageSize: 10
			},
			data: [],
			initTable: [],
			total: 0,
			multiSelArr: []
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
				this.$refs.houseNum.init();
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
		},
		// 修改发布状态
		changeState(type, index) {
			let params = {
				houseId: this.data[index].houseId,
				status: type
			};
			this.$Modal.confirm({
				title: '发布',
				content: '<p>确认发布房源：房源id：' + params.houseId + '</p>',
				loading: true,
				onOk: () => {
					houseApi
						.updateRentHouseStatus(params)
						.then(response => {
							this.$Modal.remove();
							this.$Message.success('发布状态已更新');
							this.init();
						})
						.catch(error => {
							if (error.response.data.code == 20404) {
								this.$Message.error('出租房源发布数量超出限制');
							} else {
								this.$Message.error(error.response.data.msg);
							}
						});
				}
			});
		},
		// 批量发布
		multiPublish() {
			if (this.multiSelArr.length === 0) {
				this.$Message.error('请选择需要发布的房源')
				return false
			}
			this.$Modal.confirm({
				title: '批量发布',
				content: '确定要批量发布所选房源吗？',
				loading: true,
				onOk: async () => {
					let successCount = 0
					for (let i = 0; i < this.multiSelArr.length; i++) {
						const item = this.multiSelArr[i];
						try {
							await houseApi
								.updateRentHouseStatus({
									houseId: item.houseId,
									status: 1
								})
							successCount++
						} catch (e) {
							break;
						}
					}
					this.$Modal.remove();
					this.$Message.info(`批量发布${this.multiSelArr.length}套，成功${successCount}套`)
					this.init();
					this.multiSelArr = []
				}
			});
		},
		// 删除房源
		delHouse(index) {
			let params = {
				houseId: this.data[index].houseId
			};
			this.$Modal.confirm({
				title: '删除房源',
				content: '<p>确认删除该条房源：房源id：' + params.houseId + '</p>',
				loading: true,
				onOk: () => {
					houseApi
						.updateHouseRentIsDelStatus(params)
						.then(response => {
							this.$Modal.remove();
							this.$Message.success('删除房源成功');
							this.init();
						})
						.catch(error => {
							this.$Message.error('删除房源失败');
						});
				}
			});
		},
	},
	created() {
		this.init();
	}
};
</script>

