<template>
  <Card>
    <p slot="title">经纪人表格下载</p>
    <Form ref="downData" :model="downData" inline :label-width="120">
      <FormItem label="起止时间" prop="timeRange">
        <DatePicker :clearable="true" :value="downData.startTime" @on-change="downStart" type="date" placeholder="开始时间"></DatePicker>
        <DatePicker :clearable="true" :value="downData.endTime" @on-change="downEnd" type="date" placeholder="结束时间"></DatePicker>
      </FormItem>
      <FormItem>
        <Button type="success" @click="actionDown">操作表下载</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
import Qs from 'qs';
import moment from "moment";
export default {
  name: "agentTableDown",
  data() {
    return {
      //下载相关数据
      downData: {
        // paymentVersion: '',
        startTime: moment().subtract(1, 'days').format("YYYY-MM-DD"),
        endTime: moment().subtract(1, 'days').format("YYYY-MM-DD")
      },
    }
  },
  methods: {
    downStart(date) {
      this.downData.startTime = date
    },
    downEnd(date) {
      this.downData.endTime = date
    },
    // statusDown() {
    //   window.open(`/v1.0.0/uploadExcel/corpDownloadAgentInfo?${Qs.stringify(this.downData)}`)
    // },
    actionDown() {
      window.open(`/v1.0.0/uploadExcel/corpDownloadAgentCurrentData?${Qs.stringify(this.downData)}`)
    }
  }
}
</script>

<style>

</style>
