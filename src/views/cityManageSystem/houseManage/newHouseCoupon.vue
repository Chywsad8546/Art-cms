<template>
  <Card>
    <p slot="title">楼盘活动</p>
    <Form class="margin-top-20" ref="searchData" :model="searchData" inline :label-width="100">
      <FormItem label="楼盘名称" prop="buildingName">
        <Input v-model.trim="searchData.buildingName" />
      </FormItem>
      <FormItem label="楼盘ID" prop="buildingId">
        <Input v-model.trim="searchData.buildingId" />
      </FormItem>
      <FormItem label="客户电话" prop="userPhone">
        <Input v-model.trim="searchData.userPhone" />
      </FormItem>
      <FormItem>
        <Button type="success" @click="download">下载</Button>
        <Button type="primary" @click="handleSearch('searchData')" style="margin-left: 8px">搜索</Button>
        <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
      </FormItem>
    </Form>
    <Table border :columns="columns" :data="data"></Table>
    <Page :total="total" :current="searchData.pageNum" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" class="margin-top-10" align="right"></Page>
  </Card>
</template>

<script>
import houseApi from '@/api/house/index.js'
export default {
  name: 'newHouseCoupon',
  data() {
    return {
      columns: [
        {
          key: 'activityBuildingId',
          title: '楼盘ID',
          align: "center"
        },
        {
          key: 'activityBuildingName',
          title: '楼盘名称',
          align: "center"
        },
        {
          key: 'createTime',
          title: '提交时间',
          align: "center"
        },
        {
          key: 'userPhone',
          title: '客户电话',
          align: "center"
        },
        {
          key: 'userNickname',
          title: '客户姓名',
          align: "center"
        }
      ],
      searchData: {
        buildingName: undefined,
        buildingId: undefined,
        userPhone: undefined,
        pageNum: 1,
        pageSize: 10
      },
      data: [],
      total: 0
    };
  },
  methods: {
    init() {
      houseApi.getProjActivityList(this.searchData).then(response => {
        this.total = response.data.data.total;
        this.data = response.data.data.data;
      });
    },
    handleSearch() {
      this.searchData.pageNum = 1;
      this.init();
    },
    handleCancel(name) {
      this.$refs[name].resetFields();
      this.searchData.pageNum = 1;
      this.init();
    },
    pageChange(page) {
      this.searchData.pageNum = page;
      this.init();
    },
    sizeChange(size) {
      this.searchData.pageSize = size;
      this.init();
    },
    download() {
      window.open(`/v1.0.0/projactivity/downProjActivityList`)
    }
  },
  created() {
    this.init();
  }
};
</script>

