<template>
	<Card>
		<p slot="title">出租房源详情</p>
		<a slot="extra" @click="modelShow = true" v-show="form.status==1">
			<Icon type="arrow-down-a"></Icon>
			强制下架
		</a>
		<Alert>
			<Row>
				<Col span="4">录入人：{{form.agentName}}</Col>
				<Col span="10">录入时间：{{form.createTime}}</Col>
				<Col span="20"> </Col>
				<Col span="20">当前房源置顶中，剩余时长： 天。置顶关键词：</Col>
			</Row>
		</Alert>
		<Row>
			<Col :span="18">
			<Form ref="form" :model="form" :label-width="120">
				<FormItem label="楼盘名称">
					{{form.projName}}
				</FormItem>
				<FormItem label="户型">
					{{form.room}} 室 {{form.hall}} 厅 {{form.kitchen || '-'}} 厨 {{form.toilet|| '-'}} 卫 {{form.balcony|| '-'}} 阳台
				</FormItem>
				<FormItem label="楼层">
					第{{form.floor}} 层 共{{form.totalFloor}} 层
				</FormItem>
				<FormItem label="租赁方式">
					<RadioGroup v-model="form.rentType">
						<Radio disabled :label="1">整租</Radio>
						<Radio disabled :label="2">合租</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="面积">
					{{form.area}}㎡
				</FormItem>
				<FormItem label="朝向">
					<RadioGroup v-model="form.forward">
						<Radio v-for="item in forwardList" v-if="form.forward ==item.id" :label="item.id" :key="item.id">{{item.value}}</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="租金">
					{{form.rentPrice}}元/月
				</FormItem>
				<FormItem label="付款方式">
					<RadioGroup v-model="form.payMode">
						<Radio v-for="item in payModeList" v-if="form.payMode ==item.id" :label="item.id" :key="item.id">{{item.value}}</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="装修">
					<RadioGroup v-model="form.fitment">
						<Radio v-for="item in fitmentList" v-if="form.fitment ==item.id" :label="item.id" :key="item.id">{{item.value}}</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="配套设施">
					<span v-for="item in form.supportingFacilities" :key="item">{{item}}&emsp;&emsp;</span>

				</FormItem>
				<FormItem label="房源标签">
					<span v-for="item in form.rentTags" :key="item">
						<span v-if="item ==1">采光好&emsp;&emsp;</span>
						<span v-if="item ==2">地铁近&emsp;&emsp;</span>
						<span v-if="item ==3">首次出租&emsp;&emsp;</span>
						<span v-if="item ==4">独立阳台&emsp;&emsp;</span>
						<span v-if="item ==5">独立卫生间&emsp;&emsp;</span>
						<span v-if="item ==6">集中供暖&emsp;&emsp;</span>
						<span v-if="item ==7">可注册办公&emsp;&emsp;</span>
					</span>
				</FormItem>

				<FormItem label="房源标题">
					{{form.houseTitle}}
				</FormItem>
				<FormItem label="房源描述">
					{{form.houseDesc}}
				</FormItem>
				<FormItem label="户型图">
					<Row>
						<div class="housePicList">
							<div class="housePicListItem" v-for="(item,index) in form.houseRentImages" v-if="item.imageType == 4  && item.isDel !=1"
							  :key="index">
								<img class="houseimg" :src="$imgurl(item.imagePath,'agent400x300')">
								<div>
									<span class="fr">
										<a @click="delPic(index)">删除图片</a>
									</span>
								</div>
								<div>
									<strong>{{item.imageTitle}}</strong>
									<br> {{item.imageDesc}}
								</div>
							</div>
						</div>
					</Row>
				</FormItem>
				<FormItem label="室内图">
					<Row>
						<div class="housePicList">
							<div class="housePicListItem" v-for="(item,index) in form.houseRentImages" v-if="item.imageType == 2 && item.isDel !=1" :key="index">
								<img class="houseimg" :src="$imgurl(item.imagePath,'agent500x300')">
								<div>
									<span v-if="item.flag == 1" class="fl">标题图</span>
									<span class="fr">
										<a @click="delPic(index)">删除图片</a>
									</span>
								</div>
								<div>
									<strong>{{item.imageTitle}}</strong>
									<br> {{item.imageDesc}}
								</div>
							</div>
						</div>
					</Row>

				</FormItem>
				<FormItem label="小区图">
					<Row>
						<div class="housePicList">
							<div class="housePicListItem" v-for="(item,index) in form.houseRentImages" v-if="item.imageType == 3  && item.isDel !=1"
							  :key="index">
								<img class="houseimg" :src="$imgurl(item.imagePath,'agent400x300')">
								<div>
									<span v-if="item.flag == 1" class="fl">标题图</span>
									<span class="fr">
										<a @click="delPic(index)">删除图片</a>
									</span>
								</div>
								<div>
									<strong>{{item.imageTitle}}</strong>
									<br> {{item.imageDesc}}
								</div>
							</div>
						</div>
					</Row>

				</FormItem>

			</Form>
			</Col>
		</Row>

		<Modal v-model="modelShow" title="强制下架" :loading="loading" @on-ok="asyncOK">
			<Alert type="warning">提示：
				<template slot="desc">房源强制下架后录入人不可上架，已购买置顶剩余的时间和金额不退，请谨慎操作。
				</template>
			</Alert>
			<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
				<!-- <FormItem label="登录密码" prop="pswd">
					<Input type="password" v-model="formCustom.pswd" />
				</FormItem> -->
				<FormItem label="下架原因" prop="forceOffReason">
					<Input type="text" v-model="formCustom.forceOffReason" />
				</FormItem>
			</Form>
		</Modal>
	</Card>
</template>

<script>
import houseApi from "@/api/house/index.js";
export default {
  name: "rentHouseDetail_corp",
  data() {
    return {
      forwardList: [],
      fitmentList: [],
      payModeList: [],
      form: {
        //houseRent:{
        newcode: undefined, //*楼盘Idthis.$route.query.
        houseId: this.$route.query.houseId, //
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
        // ofCompany:'', //我爱我家
        // round:'', //周边配套
        // traffic:'', //交通状况
        rentTags: undefined, //房源标签
        isRecommend: 0, //是否推荐(0-否，1-是)
        source: 1, //*****来源(1-经纪人后台录入，2-API导入)
        //},
        houseRentImages: []
      },
      modelShow: false,
      loading: true,
      formCustom: {
        houseId: this.$route.query.houseId,
        // pswd: "",
        forceOffReason: ""
      },
      ruleCustom: {
        // pswd: [
        //   {
        //     required: true,
        //     message: "请输入登陆密码",
        //     trigger: "blur"
        //   }
        // ],
        forceOffReason: [
          {
            required: true,
            message: "请输入下架原因",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //获取详情
    getDetail() {
      houseApi
        .getHouseRentInfo({
          houseId: this.form.houseId
        })
        .then(response => {
          this.form = response.data.data;
        })
        .catch(error => {
          console.log("获取详情失败", error);
        });
    },

    //删除原有图片
    delPic(index) {
      this.form.houseRentImages[index].isDel = 1;
      houseApi
        .updateHouseRentInfo(this.form)
        .then(response => {
          this.$Notice.success({
            title: "删除图片成功",
            duration: 2
          });
          this.getDetail();
        })
        .catch(error => {
          // if(error.response.data.code == 10002){
          this.form.houseRentImages[index].isDel = 0;
          this.$Notice.error({
            title: "删除图片失败",
            duration: 2
          });
          // }
        });
    },
    //获取朝向列表
    // forwardList=[],
    //     fitmentList=[],
    //     payModeList=[],
    getforward() {
      houseApi
        .listHouseTowards()
        .then(response => {
          this.forwardList = response.data.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getfitment() {
      houseApi
        .listHouseFitment()
        .then(response => {
          this.fitmentList = response.data.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getpayMode() {
      houseApi
        .listRentHousePayMode()
        .then(response => {
          this.payModeList = response.data.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //强制下架
    asyncOK() {
      this.$refs["formCustom"].validate(valid => {
        if (valid) {
          houseApi
            .forceOffShelf(this.formCustom)
            .then(response => {
              this.getDetail();
              this.loading = false;
              this.modelShow = false;
              this.$Message.success("强制下架房源成功!");
            })
            .catch(error => {
              if (error.response.data.code == 20018) {
                this.$Message.error("密码错误！");
              } else if (error.response.data.code == 20411) {
                this.$Message.error("出租房源强制下架失败！");
              } else {
                this.$Message.error("出租房源强制下架失败！");
              }
            });
        } else {
          this.loading = false;
        }
      });
      setTimeout(() => {
        this.modal6 = false;
      }, 2000);
    }
  },
  created() {
    this.getforward();
    this.getfitment();
    this.getpayMode();
    if (this.$route.query.houseId) {
      this.getDetail();
    }
  }
};
</script>

<style lang="less" scoped>
.housePicList {
}

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