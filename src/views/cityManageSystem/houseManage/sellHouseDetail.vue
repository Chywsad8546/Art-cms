<template>
	<Card>
		<p slot="title">我的出售房源</p>
		<Alert>
			<Row>
				<Col v-if="form.agentName" span="3">录入人：{{form.agentName}}</Col>
				<Col v-if="form.userName" span="4">注册电话：{{form.userName}}</Col>
				<Col v-if="form.displayPhone" span="4">展示电话：{{form.displayPhone}}</Col>
				<Col v-if="form.corpHouseUrl" span="3"><a target="_blank" :href="form.corpHouseUrl">官网地址</a></Col>
			</Row>
		</Alert>
		<Form ref="form" :model="form" :label-width="120">
			<FormItem label="楼盘名称">
				<p>{{form.projName}}</p>
			</FormItem>
			<FormItem label="户型" required>
				<Row type="flex" :gutter="10">
					<Col offset="0">
					<FormItem prop="room">
						<p>{{form.room}}室</p>
					</FormItem>
					</Col>
					<Col offset="0">
					<FormItem prop="hall">
						<p>{{form.hall}}厅</p>
					</FormItem>
					</Col>
					<!-- <Col offset="0">
				<FormItem prop="kitchen">
					<p>{{form.kitchen}}厨</p>
				</FormItem>
				</Col>
				<Col offset="0">
				<FormItem prop="toilet">
					<p>{{form.toilet}}卫</p>
				</FormItem>
				</Col>
				<Col offset="0">
				<FormItem prop="balcony">
					<p>{{form.balcony}}阳台</p>
				</FormItem>
				</Col> -->
				</Row>
			</FormItem>
			<FormItem label="楼层" required>
				<Row type="flex" :gutter="10">
					<Col offset="0">
					<FormItem prop="floor">
						<p>{{form.floor!='0'?form.floor:'暂无'}}</p>
					</FormItem>
					</Col>
					<Col offset="0">
					<FormItem prop="totalFloor">
						<p>共{{form.totalFloor}}层</p>
					</FormItem>
					</Col>
					<!-- <Col offset="0" class="gray999"> 提示：地下室为负数
				</Col> -->
				</Row>
			</FormItem>
			<FormItem label="面积" required>
				<Row type="flex" :gutter="10">
					<Col offset="0">
					<FormItem prop="buildArea">
						<p>建筑面积: {{form.buildArea}}㎡</p>
					</FormItem>
					</Col>
					<!-- <Col offset="0">
				<FormItem prop="liveArea">
					<p>使用面积: {{form.liveArea}}㎡</p>
				</FormItem>
				</Col> -->
				</Row>
			</FormItem>
			<FormItem label="朝向" prop="forward">
				<RadioGroup v-model="form.forward">
					<Radio disabled v-for="item in forwardList" :label="item.id" :key="item.id">{{item.value}}</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem label="售价" prop="price">
				<Row type="flex" :gutter="10">
					<Col offset="0">
					<p>{{form.price}}万元 </p>
					</Col>
				</Row>
			</FormItem>
			<FormItem label="装修" prop="fitment">
				<RadioGroup v-model="form.fitment">
					<Radio disabled v-for="item in fitmentList" :label="item.id" :key="item.id">{{item.value}}</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem label="产权性质" prop="propertyRight">
				<RadioGroup v-model="form.propertyRight">
					<Radio disabled v-for="item in propertyList" :label="item.id" :key="item.id">{{item.value}}</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem label="房屋类型" prop="houseType">
				<RadioGroup v-model="form.houseType">
					<Radio disabled v-for="item in houseTypeList" :label="item.id" :key="item.id">{{item.value}}</Radio>
				</RadioGroup>
			</FormItem>

			<FormItem label="房源标签" prop="tags">
				<!--<CheckboxGroup v-model="form.tags">
					<Checkbox disabled v-for="item in tagsList" :label="item.id" :key="item.id">{{item.value}}</Checkbox>
				</CheckboxGroup>-->
				<span v-for="itemT in form.tags">
					<span v-for="itemL in tagsList" v-if="itemL.id==itemT">
						{{itemL.value}},
					</span>
				</span>
			</FormItem>

			<FormItem label="房源标题" prop="houseTitle">
				<p>{{form.houseTitle}}</p>
			</FormItem>
			<FormItem label="房源描述" prop="houseDesc">
				<p>{{form.houseDesc}}</p>
			</FormItem>

			<FormItem label="户型图">
				<Upload ref="upload" :show-upload-list="false" :on-progress="()=>this.hxLoading=true" :format="['jpg','jpeg','png']" :max-size="6144" multiple action="/v1.0.0/sys/uploadImage">
				</Upload>
				<span v-if="hxLoading">上传中...</span>
				<Row>
					<div class="housePicList">
						<div class="housePicListItem" v-for="(item,index) in form.houseSellImages" v-if="item.imageType == 4  && item.isDel !=1" :key="index">
							<img class="houseimg" :src="$imgurl(item.imagePath,'agent400x300')">
							<div>
								<span class="fr">
								</span>
							</div>
						</div>
					</div>
				</Row>
			</FormItem>
			<FormItem label="室内图">
				<Upload ref="upload1" :show-upload-list="false" :on-progress="()=>this.snLoading=true" :format="['jpg','jpeg','png']" :max-size="6144" multiple action="/v1.0.0/sys/uploadImage">
				</Upload>
				<span v-if="snLoading">上传中...</span>
				<Row>
					<div class="housePicList">
						<div class="housePicListItem" v-for="(item,index) in form.houseSellImages" v-if="item.imageType == 2 && item.isDel !=1" :key="index">
							<img class="houseimg" :src="$imgurl(item.imagePath,'agent400x300')">
							<div>
								<span v-if="item.flag == 0 || item.flag == '' || item.flag == null" class="fl">
								</span>
								<span v-if="item.flag == 1" class="fl">标题图</span>
								<span class="fr">
								</span>
							</div>
							<!-- <div>
							<Input :disabled="IsDisabled" v-model="item.imageTitle" size="small" placeholder="房源标题"></Input>
						</div>
						<div>
							<Input :disabled="IsDisabled" v-model="item.imageDesc" size="small" placeholder="房源描述"></Input>
						</div> -->
						</div>
					</div>
				</Row>

			</FormItem>
			<FormItem label="小区图">
				<Upload ref="upload2" :show-upload-list="false" :on-progress="()=>this.xqLoading=true" :format="['jpg','jpeg','png']" :max-size="6144" multiple action="/v1.0.0/sys/uploadImage">
				</Upload>
				<span v-if="xqLoading">上传中...</span>
				<Row>
					<div class="housePicList">
						<div class="housePicListItem" v-for="(item,index) in form.houseSellImages" v-if="item.imageType == 3  && item.isDel !=1" :key="index">
							<img class="houseimg" :src="$imgurl(item.imagePath,'agent400x300')">
							<div>
								<span v-if="item.flag == 0 || item.flag == '' || item.flag == null" class="fl">
								</span>
								<span v-if="item.flag == 1" class="fl">标题图</span>
								<span class="fr">
								</span>
							</div>
						</div>
					</div>
				</Row>
			</FormItem>
		</Form>
	</Card>
</template>

<script>
import houseApi from "@/api/house/index.js";

export default {
	name: "esfHouseDetail",
	data() {
		return {
			newCodeName: this.$route.query.projName, //楼盘名称
			forwardList: [],
			fitmentList: [],
			tagsList: [],
			propertyList: [],
			houseTypeList: [],
			form: {
				//houseRent:{
				newcode: undefined, //*楼盘Idthis.$route.query.
				houseId: this.$route.query.houseId, //
				projName: undefined,
				room: "", //*室
				hall: "", //*厅
				kitchen: "",
				toilet: "",
				balcony: "", //阳台
				floor: "", //*楼层
				totalFloor: "", //总楼层
				area: "", //*
				forward: undefined, //*
				rentPrice: "", //*
				payMode: undefined, //付款方式
				fitment: undefined, //装修
				supportingFacilities: undefined, //配套设施
				houseTitle: "", //*房源标题
				rentType: undefined, //*出租类型（1整租）（2合租）
				houseDesc: "", //*房源描述
				status: "", //发布状态(0-待发布，1-已发布，2-已下架)
				tags: [], //房源标签
				isRecommend: 0, //是否推荐(0-否，1-是)
				source: 1, //*****来源(1-经纪人后台录入，2-API导入)
				houseSellImages: []
			},
			// 图片上传
			imgName: "",
			visible: false,
			uploadList: [],
			hxLoading: false,
			snLoading: false,
			xqLoading: false,

			//判断是否有标题图
			isFlag: false
		};
	},
	methods: {
		handleSubmit(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					console.log("提交");
					if (this.isFlag) {
						console.log("有标题图");
						this.editDetail();
					} else {
						console.log("没有标题图");
						this.$Notice.error({
							title: "请上传图片并设置标题图",
							duration: 2
						});
					}
				} else {
					this.$Notice.error({
						title: "房源信息填写有误！",
						duration: 2
					});
				}
			});
		},
		//获取朝向列表
		getforward() {
			houseApi
				.listHouseTowards()
				.then(({
					data
				}) => {
					this.forwardList = data.data.data;
				})
				.catch(error => {
					console.log(error);
				});
		},
		getfitment() {
			houseApi
				.listHouseFitment()
				.then(({
					data
				}) => {
					this.fitmentList = data.data.data;
				})
				.catch(error => {
					console.log(error);
				});
		},
		getHouseTags() {
			houseApi
				.listSellHouseHouseTags()
				.then(({
					data
				}) => {
					this.tagsList = data.data.data;
					console.log(this.tagsList);
				})
				.catch(error => {
					console.log(error);
				});
		},
		getPropertyRights() {
			houseApi
				.listSellHousePropertyRights()
				.then(({
					data
				}) => {
					this.propertyList = data.data.data;
				})
				.catch(error => {
					console.log(error);
				});
		},
		getHouseType() {
			houseApi
				.listSellHouseHouseType()
				.then(({
					data
				}) => {
					this.houseTypeList = data.data.data;
				})
				.catch(error => {
					console.log(error);
				});
		},
		//获取详情
		getDetail() {
			houseApi
				.getHouseSellClaimByHouseId({
					houseId: this.$route.query.houseId,
					houseStatus: this.$route.query.houseStatus
				})
				.then(({
					data
				}) => {
					this.form = Object.assign(this.form, data.data);
					if (!Array.isArray(this.form.houseSellImages)) {
						this.form.houseSellImages = [];
					}
					//console.log(this.form);
				})
				.catch(error => {
					console.log("获取详情失败", error);
				});
		}
	},
	created() {
		this.getDetail();
		this.getforward();
		this.getfitment();
		this.getHouseTags();
		this.getPropertyRights();
		this.getHouseType();
	},
	computed: {
		IsDisabled: function () {
			if (this.$route.query.houseStatus == 0) {
				return false;
			} else {
				return true;
			}
		}
	},
	watch: {
		"form.houseSellImages": {
			handler: function (val, oldVal) {
				console.log("触发");
				this.isFlag = false;
				if (this.form.houseSellImages.length > 0) {
					console.log("有图片");
					this.form.houseSellImages.map(x => {
						if (x.isDel !== 1) {
							if (x.imageType !== 1 && x.flag === 1) {
								this.isFlag = true;
							}
						}
					});
					if (this.isFlag === false) {
						this.form.houseSellImages.forEach(x => {
							if (x.isDel !== 1 && x.imageType !== 1) {
								x.flag = 1;
								this.isFlag = true;
								return;
							}
						});
					}
				} else {
					console.log("没有图片列表");
					this.isFlag = false;
				}
			},
			deep: true
		}
	}
};
</script>

<style lang="less" scoped>
.housePicListItem {
  float: left;
  width: 180px;
  margin: 20px 20px 20px 0;
}

.housePicListItem .houseimg {
  display: block;
  width: 100%;
  height: 135px;
}

.fl {
  float: left;
}

.fr {
  float: right;
}
</style>