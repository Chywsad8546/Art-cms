<template>
	<div>
		<Row v-if="selfInfo.idCardAuth === 0">
			<Alert type="warning" show-icon>您的账号身份还未完成认证！为了保证您能使用完整功能，快去认证身份吧！
				<a>
					<router-link :to="{name:'certification'}">身份认证>></router-link>
				</a>
			</Alert>
		</Row>
		<Row :gutter="10">
			<Col span="10">
			<Card style="height:240px">
				<p slot="title">快速入口</p>
				<Row class="margin-top-20 homeBox">
					<!-- 认领出售 出售管理 录入出租 出租管理 -->
					<Col span="6" v-if="$hasAuth('button_esfHouseManageWait')">
					<router-link :to="{name:'agentEsfHouseManageWait'}">
						<img src="@/images/agentSystem/agentHome/icon_renlingchushou@3x.png" alt="">
						<p class="gray666">认领出售</p>
					</router-link>
					</Col>
					<Col span="6" v-if="$hasAuth('agentEsfHouseManage')">
					<router-link :to="{name:'agentEsfHouseManage'}">
						<img src="@/images/agentSystem/agentHome/icon_guanlichushou@3x.png" alt="">
						<p class="gray666">管理出售</p>
					</router-link>
					</Col>
					<Col span="6">
					<router-link :to="{name:'agentRentHouseAdd'}">
						<img src="@/images/agentSystem/agentHome/icon_luruchuzu@3x.png" alt="">
						<p class="gray666">录入出租</p>
					</router-link>
					</Col>
					<Col span="6">
					<router-link :to="{name:'agentRentHouseManage'}">
						<img src="@/images/agentSystem/agentHome/icon_guanlichuzu@3x.png" alt="">
						<p class="gray666">管理出租</p>
					</router-link>
					</Col>
				</Row>
			</Card>
			</Col>
			<Col span="14">
			<Card v-if="selfInfo" style="height:240px">
				<p slot="title">
					我的信息
				</p>
				<Row>
					<Col span="18">
					<Row style="line-height:30px">
						<Col span="8">认证状态：</Col>
						<Col span="4" style="font-size:24px">
						<Tooltip :content="'身份认证:'+idText" placement="top">
							<svg class="icon" aria-hidden="true">
								<use :xlink:href="'#'+idicon"></use>
							</svg>
						</Tooltip>
						</Col>

						<Col span="4" style="font-size:24px">
						<Tooltip :content="'名片认证:'+bsText" placement="top">
							<svg class="icon" aria-hidden="true">
								<use :xlink:href="'#'+bsicon"></use>
							</svg>
						</Tooltip>
						</Col>

						<Col span="4" style="font-size:24px">
						<Tooltip :content="'开通付费:'+ffText" placement="top">
							<svg class="icon" aria-hidden="true">
								<use :xlink:href="'#'+fficon"></use>
							</svg>
						</Tooltip>
						</Col>

						<Col span="4" style="font-size:24px">
						<Tooltip :content="'信息卡认证:'+xxkText" placement="top">
							<svg class="icon" aria-hidden="true">
								<use :xlink:href="'#'+xxkicon"></use>
							</svg>
						</Tooltip>
						</Col>
					</Row>
					<Row style="line-height:30px">
						<Col span="8">姓名：</Col>
						<Col span="16">{{selfInfo.agentName}}</Col>
					</Row>
					<Row style="line-height:30px">
						<Col span="8">对外展示电话：</Col>
						<Col span="16">{{selfInfo.displayPhone}}</Col>
					</Row>
					<Row style="line-height:30px">
						<Col span="8">经纪公司：</Col>
						<Col span="16">{{selfInfo.corpName}}</Col>
					</Row>
					<Row style="line-height:30px">
						<Col span="8">所属门店：</Col>
						<Col span="16">{{selfInfo.storeName}}</Col>
					</Row>
					</Col>
					<Col span="6">
					<router-link :to="{name:'basicInfo'}">
						<img v-if="selfInfo.headPhoto" :src="$imgurl(selfInfo.headPhoto,'agent300x400')" height="144" width="108" alt="">
						<p v-else class="defaultImg" style="width:108px; height:144px; display:inline-block; background:cover;"></p>
					</router-link>
					</Col>
				</Row>
			</Card>
			</Col>
		</Row>
		<Row class="margin-top-10">
			<Col span="24">
			<Card>
				<p slot="title">关键数据</p>

				<div class="openInfo">
					<div> 开通版本：
						<b>{{selfInfo.paymentAuthInfo||"暂未开通"}}</b>
					</div>

					<div v-if="selfInfo.roleKey!==502">
						<p>到期时间：
							<b v-if="selfInfo.endTime">{{format(selfInfo.endTime)}}</b>
							<b v-else>暂无</b>
						</p>
					</div>
				</div>

				<div class="line"></div>
				<div class="showWrap">
					<div class="showBox">
						<p class="showTitle">{{hd.totalPublishCount||0}}</p>
						<i class="showLine"></i>
						<p class="showMsg">发布条数</p>
					</div>

					<div class="showBox">
						<p class="showTitle">{{hd.currentRentPublishCount||0}}</p>
						<i class="showLine"></i>
						<p class="showMsg">出租</p>
					</div>

					<div class="showBox">
						<p class="showTitle">{{hd.currentSellClaimCount||0}}</p>
						<i class="showLine"></i>
						<p class="showMsg">出售</p>
					</div>

					<div class="showBox">
						<p class="showTitle">{{hd.remainPublishCount||0}}</p>
						<i class="showLine"></i>
						<p class="showMsg">剩余</p>
					</div>

					<div class="showBox" style="margin-right:0px;">
						<p class="showTitle">{{hd.totalRecommendCount||0}}</p>
						<i class="showLine"></i>
						<p class="showMsg">推优数</p>
					</div>
				</div>

			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
import api from "@/api/agent/index.js";
import houseApi from "@/api/house/index.js";
import moment from "moment";
export default {
	name: "agentHome",
	components: {},
	data() {
		return {
			selfInfo: "",
			hd: {
				currentRentTopCount: "",
				rentTopConfigCount: "",
				currentSellTopCount: "",
				sellTopConfigCount: "",
				currentSellPublishCount: "",
				sellPublishCount: "",
				currentRentPublishCount: "",
				rentPublishCount: "",
				totalRecommendCount: ""
			},
			pageVersion: ""
		};
	},
	computed: {
		fficon: function () {
			if (this.selfInfo.paymentAuth == 1) {
				return "icon-kaitongfufei";
			} else {
				return "icon-weifufei";
			}
		},
		idicon: function () {
			if (this.selfInfo.idCardAuth == 2) {
				return "icon-shenfenrenzheng";
			} else {
				return "icon-shenfen";
			}
		},
		bsicon: function () {
			if (this.selfInfo.businessCardAuth == 0) {
				return "icon-mingpian";
			} else if (this.selfInfo.businessCardAuth == 1) {
				return "icon-mingpianrenzhengzhon";
			} else if (this.selfInfo.businessCardAuth == 3) {
				return "icon-mingpian";
			} else {
				return "icon-mingpianrenzheng";
			}
		},
		xxkicon: function () {
			if (this.selfInfo.qualificationCardAuth == 3) {
				return "icon-renzheng1-copy";
			} else {
				return "icon-renzheng1";
			}
		},
		ffText: function () {
			if (this.selfInfo.paymentAuth === 1) {
				return "已开通";
			} else {
				return "未开通";
			}
		},
		idText: function () {
			if (this.selfInfo.idCardAuth === 2) {
				return "认证通过";
			} else {
				return "未通过";
			}
		},
		bsText: function () {
			if (this.selfInfo.businessCardAuth === 0) {
				return "未认证";
			} else if (this.selfInfo.businessCardAuth === 1) {
				return "认证中";
			} else if (this.selfInfo.businessCardAuth === 2) {
				return "认证通过";
			} else if (this.selfInfo.businessCardAuth === 3) {
				return "认证失败";
			}
		},
		xxkText: function () {
			if (this.selfInfo.qualificationCardAuth === 0) {
				return "未认证";
			} else if (this.selfInfo.qualificationCardAuth === 1) {
				return "认证中";
			} else if (this.selfInfo.qualificationCardAuth === 2) {
				return "认证失败";
			} else if (this.selfInfo.qualificationCardAuth === 3) {
				return "认证通过";
			}
		}
	},
	created() {
		this.init();
	},
	methods: {
		format(date) {
			if (date) {
				return moment(date).format("YYYY-MM-DD")
			}
		},
		init() {
			api.getAgentBaseInfo().then(response => {
				this.selfInfo = response.data.data;
				console.log(this.selfInfo)
			});
			houseApi
				.getAgentHouseData()
				.then(response => {
					this.hd = response.data.data;
				})
				.catch(error => {
					console.log(error.response.msg);
				});
		},

	},
	mounted() {
		// setInterval(() => {
		// 	if (this.pageVersion) {
		// 		if (this.pageVersion !== window.pageVersion) {
		// 			console.log("轮训11")
		// 			this.$Notice.warning({
		// 				title: '更新提示',
		// 				desc: '系统发布新版本,请刷新页面获取最新版本'
		// 			});
		// 		} else {
		// 			console.log("轮训")
		// 			var s = document.scripts
		// 			var OldversionScript = s[s.length - 1]
		// 			var parent = OldversionScript.parentNode
		// 			parent.removeChild(OldversionScript);
		// 			var versionScript = document.createElement("script");
		// 			versionScript.src = '/dist/version.js?v=' + new Date().getTime();
		// 			parent.appendChild(versionScript);
		// 			console.log(versionScript.src)
		// 		}
		// 	} else {
		// 		console.log("轮训")
		// 		this.pageVersion = window.pageVersion
		// 	}

		// }, 5 * 60 * 1000);
	}
};
</script>

<style>
.gray666 {
  color: #666;
}

.openInfo {
  width: 956px;
  margin: 30px auto;
}
.openInfo > div {
  display: inline-block;
  width: 470px;
}

.line {
  border-bottom: 1px solid #e1e1e1;
  margin: 30px auto;
  width: 956px;
}

.showWrap {
  width: 956px;
  margin: 0 auto 40px;
}
.showBox {
  display: inline-block;
  margin-right: 50px;
  width: 148px;
  height: 160px;
  box-sizing: border-box;
  border: 1px solid #e1e1e1;
  text-align: center;
}

.showTitle {
  height: 48px;
  font-size: 48px;
  font-weight: 700;
  color: #333;
  margin-top: 45px;
}

.showLine {
  display: block;
  height: 0px;
  line-height: 0px;
  width: 15px;
  border-bottom: 1px solid #ccc;
  margin: 20px auto 15px;
}

.showMsg {
  height: 14px;
  font-size: 14px;
  color: #666;
}
</style>