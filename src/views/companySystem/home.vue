
<template>
	<div>
		<!-- <Row :gutter="10">
			<Col span="25">
			<Card>
				<p slot="title">快速入口</p>
				<Row class="margin-top-20 homeBox">
					<Col span="6">
					<router-link :to="{name:'myInfo'}">
						<Icon type="ios-gear" size="60"></Icon>
						<p>我的信息</p>
					</router-link>
					</Col>
					<Col span="6">
					<router-link :to="{name:'brokerList'}">
						<Icon type="ios-gear" size="60"></Icon>
						<p>经纪人管理</p>
					</router-link>
					</Col>
					<Col span="6">
					<router-link :to="{name:'companyClickSituation'}">
						<Icon type="ios-gear" size="60"></Icon>
						<p>房源点击情况</p>
					</router-link>
					</Col>
				</Row>
			</Card>
			</Col>
		</Row> -->
		<Row class="margin-top-10">
			<Col span="25">
			<Card>
				<p slot="title">关键数据</p>
				<Row class="margin-top-20 homeBox">
					<Col span="6">
					<p>
						<span class="homeNum">{{data.agentId||0}}</span>
					</p>
					<p>付费经纪人总数</p>
					</Col>
					<Col span="6">
					<p>
						<span v-if="data.totalPublishCount&&data.limitPublishCount" class="homeNum">{{(data.totalPublishCount/data.limitPublishCount*100).toFixed(2)}}</span>
						<span v-else class="homeNum">0</span>
					%</p>
					<p>平均发布率</p>
					</Col>
					<Col span="6">
					<p>
						<span v-if="data.totalRecommendCount&&data.limitRecommendCount" class="homeNum">{{(data.totalRecommendCount/data.limitRecommendCount*100).toFixed(2)}}</span> 
						<span v-else class="homeNum">0</span>
					%</p>
					<p>推优设置率</p>
					</Col>
				</Row>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
import api from "@/api/company/index";
export default {
	name: "agentHome",
	components: {},
	data() {
		return {
			data: {
			},
		};
	},
	computed: {},
	methods: {
		init() {
			api.homePageInfo().then(response => {
				console.log(response.data.data)
				this.data = response.data.data;
			});
		}
	},
	created() {
		this.init();
	},
};
</script>
