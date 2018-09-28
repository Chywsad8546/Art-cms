<template>
  <!--需要唯一的 id 来初始化图表-->
  <Row class="echarts" :id="id">
  </Row>
</template>
<script>
// 引入 ECharts 主模块
import * as echarts from 'echarts';
export default {
  name: "echarts",
  props: ["id", "option"],
  data() {
    return {
      myChart: ""
    };
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById(this.id));
    this.myChart.setOption(this.option,true);
  },
  watch: {
    option: {
      handler: function(val, oldVal) {
        this.myChart.setOption(val,true);
      },
      deep: true
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.echarts {
  width: 100%;
  height: 400px;
}
</style>