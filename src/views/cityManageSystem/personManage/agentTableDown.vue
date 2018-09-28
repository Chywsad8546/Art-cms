<template>
  <Card>
    <p slot="title">经纪人表格下载</p>
    <Form ref="downData" :model="downData" :label-width="120">
      <FormItem label="公司名称" prop="corpName">
        <Input v-model.trim="downData.corpName" style="width:140px"></Input>
      </FormItem>
      <FormItem label="付费版本" prop="paymentVersion">
        <Select v-model="downData.paymentVersion" style="width:140px">
          <Option value="">全部</Option>
          <Option value="502">免费版</Option>
          <Option value="508">租赁版</Option>
          <Option value="506">付费版</Option>
        </Select>
      </FormItem>
      <FormItem label="起止时间" prop="timeRange">
        <DatePicker :clearable="true" :value="downData.startTime" @on-change="downStart" type="date" placeholder="开始时间"></DatePicker>
        <DatePicker :clearable="true" :value="downData.endTime" @on-change="downEnd" type="date" placeholder="结束时间"></DatePicker>
      </FormItem>
      <FormItem>
        <Button type="success" @click="statusDown">状态表下载</Button>
        <Button type="success" @click="actionDown" style="margin-left: 8px">操作表下载</Button>
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
        corpName: '',
        paymentVersion: '',
        startTime: moment().subtract(1, 'days').format("YYYY-MM-DD"),
        endTime: ''
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
    statusDown() {
      // api.uploadAgentStatusData(this.downData)
      window.open(`/v1.0.0/uploadExcel/uploadAgentStatusData?${Qs.stringify(this.downData)}`)
    },
    actionDown() {
      // api.uploadAgentCurrentData(this.downData)
      window.open(`/v1.0.0/uploadExcel/uploadAgentCurrentData?${Qs.stringify(this.downData)}`)
    }
  }
}
</script>

<style>

</style>
