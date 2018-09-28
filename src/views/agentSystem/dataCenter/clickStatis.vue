<template>
  <div>
    <Card>
      <p slot="title">
        房源点击统计
      </p>
      <Row :gutter="16">
        <Col span="7">
        <Select v-model="form.houseType">
          <Option v-for="item in houseType" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
        <Col span="7">
        <Select v-model="form.timeRange">
          <Option v-for="item in timeRange" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
        <Col span="7">
        <Select v-model="form.houseRange">
          <Option v-for="item in houseRange" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
        <Col span="3">
        <Button type="primary" @click="init">确定</Button>
        </Col>
      </Row>
      <echarts id="lineoption" :option="option"></echarts>
      <Row>
      </Row>
    </Card>
  </div>
</template>

<script>
import api from "@/api/agent/index.js";
import echarts from "@/components/echarts";
export default {
  name: "agentHouseClickStatis",
  data() {
    return {
      form: {
        houseType: 1,
        timeRange: 1,
        houseRange: 1
      },
      houseType: [
        {
          value: 1,
          label: "出租"
        },
        {
          value: 2,
          label: "出售"
        }
      ],
      timeRange: [
        {
          value: 1,
          label: "近一周"
        },
        {
          value: 2,
          label: "近两周"
        },
        {
          value: 3,
          label: "本月"
        },
        {
          value: 4,
          label: "上个月"
        }
      ],
      houseRange: [
        {
          value: 1,
          label: "该经纪人的所有房源"
        },
        {
          value: 2,
          label: "该经纪人的所有房源分楼盘查看"
        },
        {
          value: 3,
          label: "该经纪人房源按房源统计"
        }
      ],
      option: {
        title: {
          text: "",
          left: "center",
          top: "20"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          orient: "horizontal",
          padding: 50,
          itemHeight: "10",
          textStyle: {
            color: "#666",
            fontSize: "12"
          },
          data: []
        },
        grid: {
          top: "90",
          right: "65",
          bottom: "30",
          left: "70"
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: []
      }
    };
  },
  components: {
    echarts
  },
  methods: {
    init() {
      api
        .agentHouseClick(this.form)
        .then(({ data }) => {
          this.option.title.text =
            this.houseType[this.form.houseType - 1].label +
            this.timeRange[this.form.timeRange - 1].label +
            this.houseRange[this.form.houseRange - 1].label;

          let xDate = data.data.date;
          this.option.xAxis.data = xDate;
          if (this.form.houseRange === 1) {
            let obj = {};
            data.data.list.map(x => {
              obj[x.date] = x.clickNum;
            });
            let xData = xDate.map(x => {
              if (obj[x]) {
                return obj[x];
              } else {
                return 0;
              }
            });
            this.option.series = {
              type: "line",
              data: xData
            };
          } else {
            let legend = Object.keys(data.data.map);
            this.option.legend.data = Object.keys(data.data.map);
            this.option.series = legend.map(x => {
              let obj = {};
              data.data["map"][x].map(x => {
                obj[x.date] = x.clickNum;
              });
              let xData = xDate.map(x => {
                if (obj[x]) {
                  return obj[x];
                } else {
                  return 0;
                }
              });
              return {
                type: "line",
                data: xData,
                name: x
              };
            });
          }
        })
        .catch(err => {
          console.log("error", err.response);
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>