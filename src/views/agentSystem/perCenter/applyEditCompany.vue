<template>
  <span>
    <a @click="show=true">申请修改</a>
    <Modal v-model="show" :loading="loading" title="修改经纪公司或门店" ok-text="提交" ok-cancel="取消" @on-ok="ok('form')" @on-cancel="cancel">
      <Form ref="form" :model="form" :label-width="120" :rules="ruleValidate">
        <FormItem label="登录密码" prop="pswd">
          <Input v-model="form.pswd" type="password" placeholder="请输入登录密码">
          </Input>
        </FormItem>
        <FormItem label="经纪公司">
          <Input v-model="corpName" disabled />
          <!-- <Select v-model="form.newCorpId" @on-change="getStoreList">
            <Option v-for="item in companyList" :value="item.corpId+''" :key="item.corpId">{{ item.corpName }}</Option>
          </Select> -->
        </FormItem>
        <FormItem label="门店" prop="newStoreId">
          <Select v-model="form.newStoreId">
            <Option v-for="item in storeList" :value="item.corpId+''" :key="item.corpId">{{ item.corpName }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </span>
</template>
<script>
import api from "@/api/agent/index.js";
export default {
  props: ["cityId", "corpId", "corpName"],
  data() {
    const validateStoreId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择门店"));
      }
      callback();
    };
    return {
      show: false,
      loading: true,
      form: {
        pswd: "",
        newCorpId: "",
        newStoreId: ""
      },
      companyList: [],
      storeList: [],
      ruleValidate: {
        pswd: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        newStoreId: [
          {
            required: true,
            message: "请选择门店",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    //初始化公司列表
    // this.getCompanyList();
    //初始化门店列表
    this.$nextTick(function() {
      this.getStoreList();
    });
  },
  methods: {
    ok(name) {
      this.form.newCorpId = this.corpId;
      this.$refs[name].validate(valid => {
        if (valid) {
          api
            .updateAgentCoryAndStore(this.form)
            .then(response => {
              this.$Message.success("修改公司门店成功,待审核通过后即可查看！");
              this.loading = false;
              this.sendMsg();
              this.show = false;
            })
            .catch(error => {
              this.loading = false;
              this.$Message.error(error.response.data.msg);
            });
        } else {
          this.show = true
          this.loading = false;
        }
      });
    },
    cancel() {},
    sendMsg() {
      this.$emit("changeEvent", this.form);
    },
    //获取经纪公司
    // getCompanyList() {
    //   api
    //     .getCorpChoice({
    //       cityId: this.cityId
    //     })
    //     .then(response => {
    //       this.companyList = response.data.data.data;
    //     })
    //     .catch(error => {
    //       console.log(error.response.data.msg);
    //     });
    // },
    //获取门店
    getStoreList() {
      api
        .getCorpByCorpId({
          corpId: this.corpId
        })
        .then(response => {
          this.storeList = response.data.data.data;
        })
        .catch(error => {
          console.log(error.response.data.msg);
        });
    }
  }
};
</script>