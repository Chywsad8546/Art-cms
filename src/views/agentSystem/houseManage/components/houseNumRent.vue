<template>
<Row>
  <Col span="6" align="center">房源总量：{{data.totalRentCount}}</Col>
  <Col span="6" align="center">已发布：{{data.currentRentPublishCount}}</Col>
  <!-- <Col span="6" align="center">置顶：{{data.currentRentTopCount}} / {{data.rentTopConfigCount}}</Col> -->
  <Col span="6"></Col>
</Row>
</template>

<script>
import houseApi from "@/api/house/index.js";
export default {
  name: "houseNumRent",
  data() {
    return {
      data: {}
    }
  },
  methods:{
    init(){
      houseApi.getAgentHouseData().then(response => {
      console.log("人数")
      console.log(response)
        this.data = response.data.data
      })
      .catch(error => {
        console.log(error.response.msg)
      })
    }
  },
  created() {
    this.init()
  }
};
</script>

