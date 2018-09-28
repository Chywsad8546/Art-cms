<template>
  <Card>
    <p slot="title">付费开通</p>
    <Row :gutter="20">
      <RadioGroup v-model="authType">
        <Col span="3">
        <Radio label="1">
          出租版
        </Radio>
        </Col>
        <Col offset="6" span="3">
        <Radio label="2">
          普通版
        </Radio>
        </Col>
      </RadioGroup>
    </Row>
    <Row style="margin-top:20px">
      <Col span="6"> 推优个数:
      <InputNumber style="margin-left:20px" :min="0" v-model="recommendCount"></InputNumber>
      </Col>
    </Row>
    <Row :gutter="20" style="margin-top:20px">
      <Col span="4">
      <DatePicker :clearable="false" :value="startTime" @on-change="changeStart" type="date" placeholder="付费开始时间"></DatePicker>
      </Col>
      <Col span="4">
      <DatePicker :clearable="false" type="date" :value="endTime" @on-change="changeEnd" placeholder="付费结束时间"></DatePicker>
      </Col>
      <Col span="3">
      <p style="height:32px;line-height:32px;">开通时长：{{openTime}}天</p>
      </Col>
    </Row>
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
      authType: "2",
      errList: [],
      valueNum: 0,
      successNum: 0,
      recommendCount: 0,
      startTime: moment().format("YYYY-MM-DD"),
      endTime: moment().add(1, 'months').format("YYYY-MM-DD"),
    };
  },
  methods: {
    changeStart(date) {
      this.startTime = date
    },
    changeEnd(date) {
      this.endTime = date
    },
    open(tel) {
      console.log(this.startTime, this.endTime)
      api
        .openPaymentAuth({
          telephone: tel,
          recommendCount: this.recommendCount,
          authType: this.authType,
          startTime: this.startTime,
          endTime: this.endTime
        })
        .then(response => {
          this.successNum++
        })
        .catch(err => {
          console.log(err.response);
          this.errList.push(tel + "\t" + err.response.data.msg);
          // this.errList.push(tel);
        });
    },
    payOpen() {
      this.errList = [];
      this.valueNum = this.userList.length
      this.successNum = 0
      union(this.userList).map(async x => {
        await this.open(x);
      });
      this.value = ''
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
      let startTime = moment(this.startTime)
      let endTime = moment(this.endTime)
      return endTime.diff(startTime, "days")
    }
  },
  created() { }
};
</script>
