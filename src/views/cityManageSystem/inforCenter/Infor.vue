
<template>
 <Card span="100">
    <p slot="title">账户资料 </p>
    <div style="line-height:2.4rem">
        <Row>
            <Col span="3" align="right">登录账号</Col>
            <Col offset="4">{{data.userName}}</Col>
        </Row>
        <Row>
            <Col span="3" align="right">城市</Col>
            <Col offset="4">{{data.cityName}}</Col>
        </Row>
        <Row>
            <Col span="3" align="right">安全手机号</Col>
            <Col offset="4">{{data.safePhone}}</Col>
        </Row>
        <Row>
            <Col span="3" align="right">最后登录时间</Col>
            <Col offset="4">{{data.lastLoginTime}}</Col>
        </Row>
    </div>
</Card>
</template>

<script>
import api from "../../../api/company/index";

export default {
  name: "infor",
  data() {
    return {
      data: ""
    };
  },
  methods: {
    init() {
      api.getCurrentAccountInfoByUserId().then(response => {
        this.data = response.data.data;
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
