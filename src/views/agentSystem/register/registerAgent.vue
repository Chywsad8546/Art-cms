<template>
  <Card span="100">
    <p slot="title">注册</p>
    <Row>
      <Col span="12">
      <Form :label-width="120">
        <!-- <FormItem label="微信ID">
                通过微信扫码进来的显示微信id
        </FormItem> -->
        <FormItem label="身份:" :required="true">
          <RadioGroup v-model="perType">
            <Radio label="我是经纪人"></Radio>
            <!--<Radio disabled label="我是业主"></Radio>-->
          </RadioGroup>
          <!-- <Tooltip placement="right">
            <Icon type="help" />
            <div slot="content">
              <p>业主无需审核审核可使用，但发布房源数量
                <br>有限并且不能置顶房源，不提供店铺。
                <br>经纪人在身份验证通过后可使用全部功能。
                <br>业主注册后可申请转为经纪人。</p>
            </div>
          </Tooltip> -->
        </FormItem>
      </Form>

      <Form :label-width="120" v-if="perType =='我是经纪人'" ref="formAgent" :model="formAgent" :rules="rules">

        <FormItem label="城市:" prop="cityId">
          <Row>
            <Col span="6">
            <Select v-model="formAgent.cityId" @on-change="getCompanyList">
              <Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
            </Select>
            </Col>
            <Col span="15" offset="2">
            <Alert banner type="warning">提示：注册成功后城市不可修改。</Alert>
            </Col>
          </Row>
        </FormItem>

        <FormItem label="真实姓名:" prop="agentName" required>
          <Row>
            <Col span="6">
            <Input v-model="formAgent.agentName" />
            </Col>
          </Row>
        </FormItem>

        <FormItem label="密码:" :required="true" prop="pswd">
          <Row>
            <Col span="6">
            <Input type="password" v-model="formAgent.pswd" />
            </Col>
            <Col span="15" offset="2">
            <Alert banner type="warning">提示：6~16位，数字和字母。</Alert>
            </Col>
          </Row>
        </FormItem>

        <FormItem label="确认密码:" :required="true" prop="pswds">
          <Row>
            <Col span="6">
            <Input type="password" v-model="formAgent.pswds" />
            </Col>
          </Row>
        </FormItem>

        <FormItem label="经纪公司:" prop="corpId">
          <Row>
            <Col span="6">
            <Select v-model="formAgent.corpId" @on-change="getStoreList">
              <Option v-for="item in companyList" :value="item.corpId" :key="item.corpId">{{ item.corpName }}</Option>
            </Select>
            </Col>
            <Col span="15" offset="2">
            <Alert banner type="warning">提示：请先选择所在城市。</Alert>
            </Col>
          </Row>

        </FormItem>
        <FormItem v-if="storeList.length>0" label="所属门店:" prop="storeId" >
          <Row>
            <Col span="6">
            <Select v-model="formAgent.storeId" filterable clearable>
              <Option v-for="item in storeList" :value="item.corpId" :key="item.corpId">{{ item.corpName }}</Option>
            </Select>
            </Col>
          </Row>
        </FormItem>

        <FormItem label="注册手机号:" prop="userName">
          <Row>
            <Col span="6">
            <Input v-model="formAgent.userName" />
            </Col>
            <Col span="15" offset="2">
            <Alert banner type="warning">提示：注册成功后登录手机不可修改。</Alert>
            </Col>
          </Row>
        </FormItem>

        <FormItem label="短信验证码:" prop="duanxinCode" :error="isCodeErr?'验证码错误':''">
          <Row>
            <Col span="6">
            <Input v-model="formAgent.duanxinCode" />
            </Col>
            <Col span="15" offset="2">
            <verify-code :phone="formAgent.userName" :type="1" :isShow="valid"></verify-code>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Checkbox v-model="arguementRead">我已看过并同意</Checkbox>
          <a href="http://wap-qn.toutiaofangchan.com/htapp/service.html" target="_blank">《网络服务协议》</a>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submit('formAgent')" :disabled="!arguementRead">确定</Button>
        </FormItem>
      </Form>
      </Col>
    </Row>
    <!--<Form :label-width="120" v-if="perType =='我是业主'" ref="perAgent" :model="perAgent">-->
    <!--<Row>-->
    <!--<Col span="10">-->
    <!--<FormItem label="注册手机号" prop="userName">-->
    <!--<Input v-model="perAgent.userName" />-->
    <!--<Alert banner type="warning">提示：注册成功后登录手机不可修改。</Alert>-->
    <!--</FormItem>-->
    <!--<FormItem label="城市" prop="cityId">-->
    <!--<Input v-model="perAgent.cityId" />-->
    <!--</FormItem>-->
    <!--<FormItem label="真实姓名" prop="agentName">-->
    <!--<Input v-model="perAgent.agentName" />-->
    <!--</FormItem>-->
    <!--<FormItem label="短信验证码" prop="duanxinCode">-->
    <!--<Input v-model="perAgent.duanxinCode" />-->
    <!--<Alert banner type="warning">提示：业主无需设置密码，可直接使用短信验证码登录。</Alert>-->
    <!--</FormItem>-->
    <!--<FormItem>-->
    <!--<Checkbox v-model="arguementRead">我已看过并同意</Checkbox>-->
    <!--<a>《楼盘服务协议》</a>-->
    <!--</FormItem>-->
    <!--<FormItem>-->
    <!--<Button type="primary" @click="submitPer('perAgent')" :disabled="!arguementRead">确定</Button>-->
    <!--</FormItem>-->
    <!--</Col>-->
    <!--</Row>-->
    <!--</Form>-->

  </Card>
</template>

<script>
import api from "@/api/agent/index.js";
import verifyCode from "../components/verifyCode.vue";
export default {
  name: "registerAgent",
  components: {
    verifyCode
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        if (!this.$valid.isPassword(value)) {
          callback(new Error("密码设置不符合要求，请重新输入"));
        } else {
          if (this.formAgent.pswds !== "") {
            // 对第二个密码框单独验证
            this.$refs.formAgent.validateField("pswds");
          }
        }
        callback();
      }
    };

    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请重复输入你的密码"));
      } else if (value !== this.formAgent.pswd) {
        callback(new Error("密码输入和第一次不符"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (value === "" || !this.$valid.isPhone(value)) {
        this.valid = true;
        callback(new Error("请输入正确的手机号格式"));
      } else {
        api
          .checkAgentPhone({
            userName: value
          })
          .then(response => {
            this.valid = false;
            callback();
          })
          .catch(error => {
            this.valid = true;
            console.log(this.valid);
            callback(new Error(error.response.data.msg));
          });
      }
    };
    const validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("真实姓名不能为空"));
      } else if (!this.$valid.isName(value)) {
        callback(new Error("请检查真实姓名是否为2-4个汉字"));
      } else {
        callback();
      }
    };
    return {
      modal1: false,
      perType: "我是经纪人", // 身份类型
      arguementRead: false,
      cityList: undefined,
      companyList: undefined,
      storeList: [],
      isCodeErr: false,
      formAgent: {
        userName: "",
        cityId: "",
        pswd: "",
        pswds: "",
        corpId: "",
        storeId: "",
        agentName: "",
        duanxinCode: ""
      },
      perAgent: {
        userName: "",
        cityId: "",
        agentName: "",
        duanxinCode: ""
      },
      rules: {
        userName: [{
          required: true,
          message: "注册手机号不能为空",
          trigger: "blur"
        },
        {
          validator: validatePhone,
          trigger: "blur"
        }
        ],
        cityId: [{
          type: "number",
          required: true,
          message: "注册城市不能为空",
          trigger: "change"
        }],
        pswd: [{
          validator: validatePass,
          trigger: "blur"
        }],
        pswds: [{
          validator: validatePassCheck,
          trigger: "blur"
        }],
        corpId: [{
          type: "number",
          required: true,
          message: "经纪公司不能为空",
          trigger: "change"
        }],
        // storeId: [
        //   {
        //     type:'number',
        //     trigger: "blur"
        //   }
        // ],
        agentName: [{
          validator: validateName,
          trigger: "blur"
        }],
        duanxinCode: [{
          required: true,
          message: "短信验证码不能为空",
          trigger: "blur"
        }]
      },
      valid: true
    };
  },
  methods: {
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          api
            .subRegisterAgent(this.formAgent)
            .then(response => {
              this.$Modal.success({
                content: response.data.msg || "注册成功，系统将在5秒后自动进入下级页面"
              });
              setTimeout(() => {
                this.$Modal.remove();
                this.$router.push({
                  name: "login"
                });
              }, 5000);
            })
            .catch(error => {
              if (error.response.data.msg.indexOf("短信验证码不正确") > -1) {
                this.isCodeErr = true;
              }
              this.$Message.error({
                content: error.response.data.msg || "注册失败",
                duration: 2
              });
            });
        } else {
          this.$Message.error({
            content: "请正确输入注册信息",
            duration: 2
          });
        }
      });
    },
    // 获取城市列表
    getCityList() {
      api
        .listCityInfo()
        .then(({
          data
        }) => {
          this.cityList = data.data.data;
        })
        .catch(error => {
          console.log(error.response.data.msg);
        });
    },
    // 获取经纪公司
    getCompanyList() {
      api
        .getCorpChoice({
          cityId: this.formAgent.cityId
        })
        .then(response => {
          this.companyList = response.data.data.data;
        })
        .catch(error => {
          console.log(error.response.data.msg);
        });
    },
    // 获取门店
    getStoreList() {
      api
        .getCorpByCorpId({
          corpId: this.formAgent.corpId
        })
        .then(response => {
          this.storeList = response.data.data.data;
        })
        .catch(error => {
          console.log(error.response.data.msg);
        });
    },
    ok() {
      this.arguementRead = true
      this.modal1 = false
    }
  },
  created() {
    this.getCityList();
  }
};
</script>

<style scoped>
body {
  overflow: auto;
}
.ivu-card {
  height: 100%;
  overflow: auto;
}
</style>