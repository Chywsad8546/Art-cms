<template>
<div>
  <Card v-if="form">
    <p slot="title">基本资料</p>
    <Row>
      <Col :span="18">
      <Form :model="form" :label-width="120">
        <FormItem label="真实姓名：">
          {{form.agentName}}
          <!-- <Input v-model="form.agentName" style="width:220px;" :disabled="true" placeholder="" /> -->
        </FormItem>
        <FormItem label="所属城市：">
          {{form.cityName}}
        </FormItem>
        <FormItem label="所属公司：" v-if="form.corpId">
          {{form.corpName}}{{form.storeName ? '-'+form.storeName :'' }}
          <applyEditCompany :cityId="form.cityId" :corpId="form.corpId" :corpName="form.corpName" @changeEvent="changeCorp"></applyEditCompany>
        </FormItem>
        <FormItem label="登录手机号：">
          {{form.userName}}
        </FormItem>
        <FormItem label="对外展示电话：">
          {{form.displayPhone}}
          <applyEditPhone :tel="form.userName" @changeEvent="changeDpPhone"></applyEditPhone>
          <Row>
            <Col span="18">
            <Alert banner type="warning">提示：展示电话是在外号展示用的，请确保电话畅通，便于购房者联系。</Alert>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="服务商圈：">
          <Cascader style="width:220px; margin:0 0 20px;" :data="sqList" change-on-select @on-change="changeSq" v-model="sqVal[0]">
          </Cascader>
          <Cascader style="width:220px; margin:0 0 20px;" :data="sqList" change-on-select @on-change="changeSq1" v-model="sqVal[1]">
          </Cascader>
          <Cascader style="width:220px; margin:0 0 20px;" :data="sqList" change-on-select @on-change="changeSq2" v-model="sqVal[2]">
          </Cascader>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="sqEdit">商圈提交</Button>
        </FormItem>
      </Form>
      </Col>
      <Col :span="6">
      <div class="txpic">
        <template>
            <img v-if="form.headPhoto" :src="$imgurl(form.headPhoto,'agent300x400')" alt="">
            <p v-else class="defaultImg" style="width:90px; height:120px; display:inline-block; background:cover;"></p>
</template>

          <div>
            <Row>
              <Button type="primary" @click="delHeadP" v-if="form.headPhoto">删除头像</Button>
              <Upload v-else :action="'/v1.0.0/agent/updateAgentPhoto?agentId=' + form.agentId"   :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="6144" :before-upload="handleBeforeUpload">
                <Button type="primary" icon="ios-cloud-upload-outline">上传头像</Button>
              </Upload>
              <!-- <uploadimg v-else :ratio="3/4" :action="'/v1.0.0/agent/updateAgentPhoto?agentId=' + form.agentId" @uploadimg="uploadimg" type="userAvator">
                <Button type="primary" icon="ios-cloud-upload-outline">上传头像</Button>
              </uploadimg> -->
            </Row>
          </div>
        </div>
        <Alert type="warning" style="margin-top:10px">
          提示：
<template slot="desc">
 1、请上传正面免冠照。
<br> 2、头像将用于你的店铺展示，可裁剪成3：4的比例。
<br> 3、若头像不符合规范，管理员会重置你的头像。
</template>
        </Alert>
        </Col>
      </Row>
    </Card>
    <Spin v-else fix>
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<script>
import api from "@/api/agent/index.js";
import uploadimg from "../../my-components/upLoad";
import applyEditCompany from "./applyEditCompany.vue";
import applyEditPhone from "./applyEditPhone.vue";
import mixin from "@/mixin/index.js";
import {
  compact
} from "lodash";
export default {
  name: "basicInfo",
  mixins: [mixin],
  components: {
    applyEditCompany,
    applyEditPhone,
    uploadimg
  },
  data() {
    return {
      form: "",
      sqVal: [],
      sqForm: [],
      //头像进度条
      imgFile: {
        showProgress: false,
        percentage: 0
      }
    };
  },
  methods: {
    // 获取经纪人基本信息
    getAgentInfo() {
      api
        .getAgentBaseInfo()
        .then(response => {
          console.log(response.data.data);
          this.form = response.data.data;
          let fl = this.form.listServiceBusinessCircle;
          if (fl.length < 3) {
            for (let i = 3; i > 0; i--) {
              if (fl.length < 3) {
                fl.push({
                  district: "",
                  area: ""
                });
              }
            }
          }
          this.getSq();
        })
        .catch(error => {
          this.$Notice.error({
            title: "获取基本信息失败",
            duration: 2
          });
        });
    },
    changeCorp(v) {
      this.getAgentInfo();
    },
    changeDpPhone(v) {
      this.getAgentInfo();
    },
    handleBeforeUpload(file) {
      console.log(file);
      (this.imgFile.showProgress = true), (this.imgFile.percentage = 0);
    },
    // handleProgress(event, file, fileList) {
    //   console.log(file);
    //   (this.imgFile.showProgress = true), (this.imgFile.percentage = 99);
    // },
    handleSuccess(res, file) {
      console.log(file);
      this.imgFile.percentage = 100;
      this.imgFile.showProgress = false;
      this.getAgentInfo();
    },
    // uploadimg() {
    //   this.imgFile.showProgress = false
    //   this.getAgentInfo();
    // },
    // 删除头像
    delHeadP() {
      api
        .updateAgentCurrentPhoto({
          agentId: this.form.agentId
        })
        .then(response => {
          this.getAgentInfo();
          this.$Notice.success({
            title: "删除头像成功",
            duration: 2
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取服务商圈
    getSq() {
         let self = this;
          let dd = self.form.listServiceBusinessCircle;
          console.log("ss");
          console.log(dd);
          let arr = [];
          for (let i = 0; i < dd.length; i++) {
            let id = "";
            let id1 = "";
            let index = 0;
            for (let j = 0; j < self.sqList.length; j++) {
              if (dd[i].district == self.sqList[j].label) {
                id = self.sqList[j].value;
                index = j;
                arr.push([id]);
                break;
              }
            }
            for (let k = 0; k < self.sqList[index].children.length; k++) {
              if (dd[i].area == self.sqList[index].children[k].label) {
                id1 = self.sqList[index].children[k].value;
                arr[i].push(id1);
                break;
              }
            }
          }
          this.sqVal = arr;
    },
    // 修改服务商圈
    sqEdit() {
      let list = [];
      this.form.listServiceBusinessCircle.map(x => {
        if (x.area && x.district) {
          list.push(x);
        }
      });
      console.log(list);
      api
        .updateAgentServiceBusinessCircle({
          listAreaAndDistrictDO: list
        })
        .then(response => {
          this.$Message.success({
            content: "修改商圈成功",
            duration: 2
          });
          this.getAgentInfo();
        })
        .catch(error => {
          this.$Message.error({
            content: error.response.data.msg,
            duration: 2
          });
          this.getAgentInfo();
        });
    },
    // 修改商圈
    changeSq(i, v) {
      console.log(i);
      let df = this.form.listServiceBusinessCircle[0];
      if (i.length == 0 || v.length == 0) {
        df.district = "";
        df.area = "";
      } else if (v.length == 2) {
        df.district = v[0].label;
        df.area = v[1].label;
      } else {
        df.district = v[0].label;
      }
    },
    changeSq1(i, v) {
      let df = this.form.listServiceBusinessCircle[1];
      if (i.length == 0 || v.length == 0) {
        df.district = "";
        df.area = "";
      } else if (v.length == 2) {
        df.district = v[0].label;
        df.area = v[1].label;
      } else {
        df.district = v[0].label;
      }
    },
    changeSq2(i, v) {
      let df = this.form.listServiceBusinessCircle[2];
      if (i.length == 0 || v.length == 0) {
        df.district = "";
        df.area = "";
      } else if (v.length == 2) {
        df.district = v[0].label;
        df.area = v[1].label;
      } else {
        df.district = v[0].label;
      }
    }
  },
  created() {
    this.getAgentInfo();
  }
};
</script>

<style>
.txpic {
  text-align: center;
}

.txpic img {
  width: 90px;
  height: 120px;
}
</style>