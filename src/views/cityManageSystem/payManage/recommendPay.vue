<template>
  <Card>
    <p slot="title">付费开通</p>
    <Form :model="recommendData" :label-width="80">
      <FormItem label="开通数量:">
        <Row>
          <Col span="3">
          <InputNumber :max="15" :min="1" v-model="recommendData.limitCount"></InputNumber>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="开通时间:">
        <Row :gutter="20">
          <Col span="4">
          <DatePicker :clearable="false" @on-change="changeStart" :value="recommendData.startTime" type="date" placeholder="付费开始时间"></DatePicker>
          </Col>
          <Col span="4">
          <DatePicker :clearable="false" @on-change="changeEnd" type="date" :value="recommendData.endTime" placeholder="付费结束时间"></DatePicker>
          </Col>
          <Col span="3">
          <p style="height:32px;line-height:32px;">开通时长：{{openTime}}天</p>
          </Col>
        </Row>
      </FormItem>
    </Form>

    <Row :gutter="20" style="margin-top:20px">
      <Col span="12">
      <Input :rows="10" v-model="value" type="textarea" placeholder="Enter something..."></Input>
      </Col>
      <Col span="12">
      <p>本次提交个数:{{valueNum}}</p>
      <p>成功开通个数:{{successNum}}</p>
      <p v-if="value1===''">未成功:{{value1||0}}</p>
      <div v-else>未成功:
        <Input v-model="value1" type="textarea" :rows="7" placeholder="Enter something..."></Input>
      </div>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="12" align="right">
      <Button type="primary" style="margin-top:20px" @click="payOpen">开通</Button>
      </Col>
    </Row>
  </Card>
</template>

<script>
import api from "../../../api/company/index.js";
import moment from "moment";
import {
  compact,
  union
} from "lodash";
export default {
  name: "payOpen",
  data() {
    return {
      value: "",
      errList: [],
      successNum: 0,
      valueNum: 0,
      recommendData: {
        telephone: "",
        limitCount: 1,
        startTime: moment().format("YYYY-MM-DD"),
        endTime: moment()
          .add(1, "months")
          .format("YYYY-MM-DD"),
      }
    };
  },
  methods: {
    changeStart(date) {
      this.recommendData.startTime = date
    },
    changeEnd(date) {
      this.recommendData.endTime = date
    },
    open(tel) {
      let obj = Object.assign({}, this.recommendData, { telephone: tel })
      console.log(obj.telephone);
      api
        .configRecommend(obj)
        .then(response => {
          console.log(response.data)
          this.successNum++;
        })
        .catch(err => {
          console.log(err.response);
          // this.errList.push(tel);
          this.errList.push(tel + "\t" + err.response.data.msg);
        });
    },
    payOpen() {
      this.errList = [];
      this.valueNum = this.userList.length;
      this.successNum = 0
      let list = union(this.userList)
      console.log(list)
      list.map(x => {
        this.open(x);
      });
      this.value = "";
    }
  },
  computed: {
    userList: function () {
      let list = this.value.split("\n");
      return compact(list);
    },
    value1() {
      return this.errList.join("\n");
    },
    openTime() {
      let startTime = moment(this.recommendData.startTime)
      let endTime = moment(this.recommendData.endTime)
      return endTime.diff(startTime, "days")
    }
  },
  created() { }
};
</script>
