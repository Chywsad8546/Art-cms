<template>  
    <Row>
        <!-- <Col span="6">房源总量：{{data.currentSellClaimCount}}</Col> -->
        <Col span="6">已发布：{{data.currentSellClaimCount}}</Col>
        <!-- <Col span="6">置顶：{{data.currentSellClaimCount}} / {{data.sellTopConfigCount}}</Col> -->
        <!-- <Col span="6"></Col> -->
    </Row>
</template>
<script>
import houseApi from "@/api/house/index.js";
export default {
  name: "houseNumEsf",
  data() {
    return {
      data: {
        totalSellCount: "",
        currentSellPublishCount: "",
        sellPublishCount: "",
        currentSellTopCount: "",
        sellTopConfigCount: ""
      }
    };
  },
  methods:{
    init(){
      houseApi
      .getAgentHouseData()
      .then(response => {
        this.data = response.data.data;
      })
      .catch(error => {
        console.log(error.response.msg);
      });
    }
  },
  created() {
    this.init()
  }
};
</script>