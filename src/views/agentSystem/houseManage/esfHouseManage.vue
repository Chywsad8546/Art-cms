<template>
	<Card>
		<p slot="title">我的出售房源</p>
		<houseNumEsf ref="houseNum"></houseNumEsf>
		<Menu mode="horizontal" theme="light" @on-select="skipPage" active-name="agentEsfHouseManage">
			<MenuItem name="agentEsfHouseManage"> 已发布
			</MenuItem>
			<MenuItem name="agentEsfHouseManageOff"> 待发布
			</MenuItem>
			<MenuItem name="agentEsfHouseManageWait"> 待认领
			</MenuItem>
			<MenuItem name="agentEsfHouseManageUnder"> 已下架
			</MenuItem>
		</Menu>
		<Form :rules="ruleValidate" class="margin-top-20" ref="searchData" :model="searchData" inline :label-width="70">
			<FormItem label="认领ID" prop="houseId">
				<Input v-model="searchData.houseId" style="width:140px" />
			</FormItem>
			<FormItem label="楼盘名称" prop="projName">
				<Input v-model="searchData.projName" style="width:140px" />
			</FormItem>
			<FormItem label="价格">
				<Row>
					<Col span="10">
					<FormItem prop="startPrice">
						<Input number v-model="searchData.startPrice" style="width:140px" />
					</FormItem>
					</Col>
					<Col span="2" style="text-align: center"> 至
					</Col>
					<Col span="10">
					<FormItem prop="endPrice">
						<Input number v-model="searchData.endPrice" style="width:140px" />
					</FormItem>
					</Col>
					<Col span="2"> 万元
					</Col>
				</Row>
			</FormItem>
			<FormItem label="居室" prop="room">
				<Input v-model="searchData.room" number style="width:140px" />
			</FormItem>
			<FormItem label="排序" prop="sort">
				<Select v-model="searchData.sort" style="width: 141px">
					<Option value="1">录入时间从早到晚</Option>
					<Option value="2">录入时间从晚到早</Option>
				</Select>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="pageChange(1)" style="margin-left: 8px">搜索</Button>
				<Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="multiUnpublish">批量下架</Button>
			</FormItem>
		</Form>
		<Row v-if="isUpdateTip" class-name="updateTip">
			<div style="float:right">
				<Icon size="20" type="speakerphone" style="vertical-align:bottom;margin-right:10px;color:#666">
				</Icon>
				您有房源即将下架，请尽快更新
			</div>
		</Row>
		<Table @on-selection-change="(sel)=>{multiSelArr=sel}" border :columns="columns" :data="data"></Table>
		<Page :total="total" :current="page" @on-change="pageChange" class="margin-top-10" align="right"></Page>
		<bottomAlert></bottomAlert>
		<Modal ref="tuiyou" v-model="recommendModel" title="房源推荐" @on-ok="ok">
			<Row>
				<RadioGroup v-model="recommendType">
					<Radio label="智能推荐"></Radio>
					<Radio label="定向推荐"></Radio>
				</RadioGroup>
			</Row>
			<Row style="margin-top:20px">
				<Form v-if="recommendType=='定向推荐'" label-position="left" :model="recommendInfo" :label-width="80">
					<FormItem label="地域">
						<RadioGroup v-model="area" type="button">
							<Radio label="不限"></Radio>
							<Radio label="商圈"></Radio>
						</RadioGroup>
						<Row v-if="area==='商圈'" style="margin-top:20px">
							<Col span="7">
							<Cascader :data="sqList" @on-change="changeSq" v-model="sqVal">
							</Cascader>
							</Col>
							<Col offset="2" span="11">
							<Input v-model="changedArea" type="textarea" :rows="4" placeholder="已选商圈"></Input>
							</Col>
						</Row>
						<!-- <Cascader style="width:220px; margin:0 0 20px;" :data="sqList" change-on-select @on-change="changeSq1" v-model="sqVal[1]">
                    </Cascader>
                    <Cascader style="width:220px; margin:0 0 20px;" :data="sqList" change-on-select @on-change="changeSq2" v-model="sqVal[2]">
                    </Cascader> -->
					</FormItem>
					<FormItem label="性别">
						<RadioGroup v-model="recommendInfo.gender" type="button">
							<Radio label="">不限</Radio>
							<Radio label="1">女性</Radio>
							<Radio label="0">男性</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="年龄">
						<RadioGroup v-model="recommendInfo.ageRange" type="button">
							<Radio label="">不限</Radio>
							<Radio label="1"></Radio>
							<Radio label="2">24-30</Radio>
							<Radio label="3">31-40</Radio>
							<Radio label="4">41-50</Radio>
							<Radio label="5">>50</Radio>
						</RadioGroup>
					</FormItem>
				</Form>
			</Row>
		</Modal>
	</Card>
</template>

<script>
import api from "@/api/house/index.js";
import houseNumEsf from "@/views/agentSystem/houseManage/components/houseNumEsf";
import bottomAlert from "@/views/agentSystem/houseManage/components/bottomAlert";
import moment from "moment"
import mixin from "@/mixin/index.js";

import { compact } from "lodash";

export default {
	name: "esfHouseManage",
	mixins: [mixin],

	data() {
		const validateNump = (rule, value, callback) => {
			if (value) {
				if (Number.isInteger(value) && value >= 0) {
					callback()
				} else {
					callback(new Error("请填写正确数字或为空"))
				}
			} else {
				callback();
			}

		};
		return {
			multiSelArr: [],
			// 下架提示
			isUpdateTip: false,
			columns: [
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					key: "houseId",
					title: "认领ID",
					align: "center",
					width: 120,
					render: (h, params) => {
						let tipContent = (params.row.leftDays - 1 <= 0 ? "该房源官网已下架,系统将在今天下架该房源" : "该房源官网已下架," + (params.row.leftDays - 1) + "天后系统将下架该房源")
						let corpHouseStatus = params.row.corpHouseStatus;
						let houseId = [params.row.houseId]
						let iconTip = h(
							"Tooltip", {
								props: {
									content: tipContent,
									transfer: true,
									placement: "top-start"
								},
								style: {
									verticalAlign: "bottom",
									marginRight: "10px",
									height: "20px",
									color: "#f00"
								}
							}, [
								h("Icon", {
									props: {
										type: "android-alert",
										size: 20
									}
								})
							]
						)
						if (corpHouseStatus === 1) {
							houseId.unshift(iconTip)
						}

						return h("div", houseId)
					}
				},
				{
					key: "baseInfo",
					title: "基本信息",
					minWidth: 350,
					className: "baseInforImg",
					render: (h, params) => {
						let row = params.row;
						let isRecommend;
						if (row.isRecommend == 1 || row.isRecommend == 2) {
							isRecommend = h(
								"Tag", {
									props: {
										color: "red"
									}
								},
								"荐"
							);
						}


						let isTop = h(
							"Tag", {
								props: {
									color: "red"
								}
							},
							"顶"
						);
						let floor
						console.log(row.floor)
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
						return h("div", [
							h("img", {
								attrs: {
									src: this.$imgurl(row.titlePic, "agent500x300"),
									width: 100,
									height: 80
								},
								on: {
									error: this.$imgerr
								}
							}),
							h("p", [
								h(
									"a", {
										props: {
											type: "text"
											// size: 'small'
										},
										style: {
											marginRight: "5px"
										},
										on: {
											click: () => {
												this.showDetail(params.index);
											}
										}
									},
									row.projName //楼盘名称
								),
								isRecommend,
								h("p", [
									floor,
									h(
										"span", {
											style: {
												marginRight: "5px"
											}
										},
										row.forwardDesc
									),
									h(
										"span", {
											style: {
												marginRight: "5px"
											}
										},
										row.room + "室" + row.hall + "厅"
									),
									h(
										"span", {
											style: {
												marginRight: "5px"
											}
										},
										row.buildArea + "㎡"
									),
									h(
										"span", {
											style: {
												marginRight: "5px"
											}
										},
										row.price + "万元"
									)
								]),
								h("p", row.houseTitle)
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
					key: "createTime",
					title: "录入时间",
					align: "center",
					minWidth: 80,
					render: (h, params) => {
						let createTime = params.row.createTime;
						return h("span", createTime ? moment(createTime).format("YYYY-MM-DD HH:mm") : '')
					}
				},
				{
					key: "sendTime",
					title: "更新时间",
					align: "center",
					minWidth: 80,
					render: (h, params) => {
						let sendTime = params.row.sendTime;
						return h("span", sendTime ? moment(sendTime).format("YYYY-MM-DD HH:mm") : '')
					}
				},
				{
					title: "管理",
					key: "action",
					align: "center",
					width: 160,
					render: (h, params) => {
						//推荐
						let row = params.row;
						let hrecommend = "";
						if (row.isRecommend == 1 || row.isRecommend == 2) {
							hrecommend = h(
								"Button", {
									props: {
										type: "ghost",
										size: 'small'
									},
									style: {
										marginBottom: "10px",
										width: "79px"
									},
									on: {
										click: () => {
											if (row.isRecommend == 1) {
												this.changeRecommend(0, params.index);
											} else if (row.isRecommend == 2) {
												this.cancelSellHouseDR(params.index)
											}
										}
									}
								},
								"取消推荐"
							);
						} else {
							hrecommend = h(
								"Button", {
									props: {
										type: "ghost",
										size: 'small'
									},
									style: {
										border: "1px solid #57a3f3",
										color: "#57a3f3",
										marginBottom: "10px",
										width: "79px"
									},
									on: {
										click: () => {
											this.recommendModel = true;
											this.currentIndex = params.index;
										}
									}
								},
								"智能推荐"
							);
						}
						return h("div", [
							hrecommend,
							h("br"),
							h(
								"ButtonGroup", [
									h(
										"Button", {
											props: {
												type: "ghost",
												size: 'small'
											},
											style: {},
											on: {
												click: () => {
													this.showDetail(params.index);
												}
											}
										},
										"修改"
									),
									h(
										"Button", {
											props: {
												type: "ghost",
												size: 'small'
											},
											style: {},
											on: {
												click: () => {
													// 取消认领
													this.$Modal.confirm({
														title: '下架',
														content: '确认要下架编号为' + row.houseId + '的房源吗',
														onOk: () => {
															this.agentCancelClaimHouseSell(params.index);
														}
													});
												}
											}
										},
										"下架"
									)
								]
							),
							// h(
							//   "a", {
							//     props: {
							//       type: "text"
							//     },
							//     on: {
							//       click: () => {
							//         this.delHouse(params.index);
							//       }
							//     }
							//   },
							//   "删除"
							// )
						]);
					}
				}
			],
			//  搜索部分数据
			searchData: {
				houseStatus: "0",
				houseId: "", //
				projName: "", //大楼名称
				startPrice: "",
				endPrice: "",
				sort: "2",
				room: ''
			},

			data: [],
			total: 0,
			page: 1,
			currentIndex: "",
			recommendModel: false,
			recommendType: "智能推荐",
			recommendInfo: {
				sellHouseId: "",
				gender: "",
				ageRange: "",
				districtArea: [],
				cityId: 12
			},
			area: "不限",
			sqdata: "",
			sqVal: [],
			changedArea: "",
			ruleValidate: {
				room: [{
					validator: validateNump,
					trigger: "blur"
				}],
				startPrice: [{
					validator: validateNump,
					trigger: "blur"
				}],
				endPrice: [{
					validator: validateNump,
					trigger: "blur"
				}],
			}
		};
	},
	components: {
		bottomAlert,
		houseNumEsf
	},
	methods: {
		multiUnpublish() {
			if (this.multiSelArr.length === 0) {
				this.$Message.error('请选择需要下架的房源')
				return false
			}
			this.$Modal.confirm({
				title: '批量下架',
				content: '确定要批量下架所选房源吗？',
				loading: true,
				onOk: async () => {
					let successCount = 0
					for (let i = 0; i < this.multiSelArr.length; i++) {
						const item = this.multiSelArr[i];
						try {
							await api.agentCancelClaimHouseSell({ houseID: item.houseId })
							successCount++
						} catch (e) {
						}
					}
					this.$Modal.remove();
					this.$Message.info(`批量下架${this.multiSelArr.length}套，成功${successCount}套`)
					this.pageChange(this.page);
					this.$refs.houseNum.init();
					this.multiSelArr = []
				}
			});
		},
		// 下架提示
		showUpdateTip(arr = []) {
			if (arr.length == 0) {
				return false
			}
			this.isUpdateTip = arr.some((item) => {
				return item.corpHouseStatus && item.corpHouseStatus === 1
			})
		},
		skipPage(name) {
			this.$router.push({
				name: name
			});
		},
		ok() {
			if (this.recommendType == "智能推荐") {
				this.changeRecommend(1, this.currentIndex);
			} else {
				this.recommendInfo.sellHouseId = this.data[this.currentIndex].houseId;
				this.changedAreaList.map(x => {
					if (x.district) {
						this.recommendInfo.districtArea.push(x);
					}
				});
				console.log(this.recommendInfo);
				api
					.sellHouseDR(this.recommendInfo)
					.then(response => {
						console.log(response);
						this.$Modal.remove();
						this.$Message.success({
							content: "设置推荐成功",
							duration: 2
						});
						this.pageChange(this.page);
					})
					.catch(error => {
						console.log(error.response);
						this.$Modal.remove();
						this.$Message.error({
							content: error.response.data.msg,
							duration: 2
						});
					});
			}
			this.recommendInfo = {
				sellHouseId: "",
				area: "不限",
				gender: "",
				ageRange: "",
				districtArea: []
			};
			this.changedArea = "";
			this.recommendType = "智能推荐"
		},
		changeSq(value, selectedData) {
			console.log(value);
			console.log(selectedData);
			if (selectedData) {
				this.changedArea +=
					selectedData[0].label +
					"/" +
					selectedData[selectedData.length - 1].label +
					"\n";
			}
			this.sqVal = [];
		},
		changeRecommend(type, index) {
			console.log("智能推荐或取消")
			let params = {
				houseId: this.data[index].houseId,
				isRecommend: type
			};
			let txt = "";
			if (type == 1) {
				txt = "设置为推荐房源：";
			} else {
				txt = "取消推荐房源：";
			}
			this.$Modal.confirm({
				title: "推荐状态修改",
				content: txt + "<p>房源id：" + params.houseId + "</p>",
				loading: true,
				onOk: () => {
					console.log(params);
					api
						.setSellIsRecommend(params)
						.then(response => {
							console.log(response);
							this.$Modal.remove();
							this.$Message.success({
								content: "修改推荐状态成功",
							});
							this.init();
						})
						.catch(error => {
							console.log(error.response);
							this.$Modal.remove();
							if (error.response.data.code === 20419) {
								this.$Message.error({
									content: "已达推荐房源数量上限，不可推荐！",
									duration: 2
								});
							} else {
								this.$Message.error({
									content: error.response.data.msg,
									duration: 2
								});
							}
						});
				}
			});
		},
		// 取消出售房源定向推荐
		cancelSellHouseDR(index) {
			console.log("取消定向推荐")
			let params = {
				houseId: this.data[index].houseId
			};
			this.$Modal.confirm({
				title: "取消推荐房源",
				content: "取消推荐房源：<p>房源id：" + params.houseId + "</p>",
				loading: true,
				onOk: () => {
					api
						.cancelSellHouseDR(params)
						.then(response => {
							this.$Modal.remove();
							this.$Message.success({
								content: "取消推荐成功",
								duration: 2
							});
							this.init();
						})
						.catch(error => {
							console.log("报错");
							console.log(error);
							this.$Modal.remove();
							this.$Message.error({
								content: error.response.data.msg,
								duration: 2
							});
						});
				}
			});
		},
		async init() {
			let {
				data
			} = await api.getListAgentClaimHouseSell(this.searchData);
			this.data = data.data.data;
			this.showUpdateTip(this.data);
			this.total = data.data.total;
		},
		// 翻页
		async pageChange(cuPage) {
			let obj = Object.assign(this.searchData, {
				pageNum: cuPage
			});
			let {
				data
			} = await api.getListAgentClaimHouseSell(obj);
			this.data = data.data.data;
			this.showUpdateTip(this.data);
			this.total = data.data.total;
			this.page = cuPage;
		},
		// 清空搜索
		handleCancel(name) {
			this.$refs[name].resetFields();
			this.searchData.pageNum = 1;
			this.init();
		},
		// 下表操作
		async agentCancelClaimHouseSell(index) {
			let houseID = this.data[index].houseId;
			try {
				let {
					data
				} = await api.agentCancelClaimHouseSell({
					houseID
				});
				this.$Message.success("下架成功");
				this.pageChange(this.page);
				this.$refs.houseNum.init();
			} catch (error) {
				this.$Message.error(error.response.data.msg)
				console.log("error")
				console.log(error.response)
			}
		},
		// 批量下架
		async agentCancelClaimHouseSell(index) {
			let houseID = this.data[index].houseId;
			try {
				let {
					data
				} = await api.agentCancelClaimHouseSell({
					houseID
				});
				this.$Message.success("删除成功");
				this.pageChange(this.page);
				this.$refs.houseNum.init();
			} catch (error) {
				this.$Message.error(error.response.data.msg)
				console.log("error")
				console.log(error.response)
			}
		},
		// 查看详情操作
		showDetail(index) {
			let houseId = this.data[index].houseId;
			this.$router.push({
				name: "agentesfHouseDetail",
				query: {
					houseId,
					houseStatus: this.searchData.houseStatus
				}
			});
		},
		delHouse(index) {
			let params = {
				houseId: this.data[index].houseId,
				houseStatus: "2"
			};
			this.$Modal.confirm({
				title: "删除房源",
				content: "<p>确认删除该条房源：房源id：" + params.houseId + "</p>",
				loading: true,
				onOk: () => {
					api
						.updateHouseSellIsDelStatus(params)
						.then(response => {
							this.$Modal.remove();
							this.$Message.success("删除房源成功");
							this.init();
						})
						.catch(error => {
							console.log(error.response);
							this.$Message.error("删除房源失败");
						});
				}
			});
		},
	},
	async created() {
		await this.init();
	},
	computed: {
		changedAreaList: function () {
			let list = this.changedArea.split("\n");
			return list.map(x => {
				let areArr = x.split("/");
				return {
					district: areArr[0],
					area: areArr[1]
				};
			});
		}
	}
};
</script>
<style>
.updateTip {
  margin-bottom: 10px;
  font-size: 12px;
  color: #169bd5;
}
</style>
