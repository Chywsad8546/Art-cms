<template>
  <Row>
    <Col span="100">
    <Card>
      <p slot="title">头条转化列表</p>
      <a href="#" slot="extra" @click.prevent="addModeButton">
        <Icon type="plus-circled"></Icon>
        设置转化跟踪
      </a>
      <Row class="margin-top-10 searchable-table-con1">
        <Form ref="searchData" :model="searchData" inline :label-width="120">
          <FormItem label="转化ID" prop="id">
            <Input v-model.trim="searchData.zhid" style="width:140px" />
          </FormItem>

          <FormItem>
            <Button type="primary" @click="handleSearch()">搜索</Button>
          </FormItem>
        </Form>

        <Table border :columns="columns" :data="data"></Table>
        <Page :total="total" :current="searchData.pageindex" show-total  @on-change="pageChange"  style="margin-top:10px; text-align:right"></Page>
      </Row>
    </Card>

    </Col>
    <Modal v-model="addModel" :loading="pushLoading" @on-ok="pushOk"  width="600">
      <p slot="header">
        <span>设置转化跟踪</span>
      </p>
      <Form ref="pushForm" :model="pushForm" :rules="pushFormRules" :label-width="180">
        <FormItem label="今日头条转化ID：" prop="zhid">
          <Input v-model="pushForm.zhid" ></Input>
        </FormItem>
        <FormItem label="密钥：" prop="key">
          <Input v-model="pushForm.key" ></Input>
        </FormItem>
        <FormItem label="下载平台：" prop="apptype" >
          <Select v-model="pushForm.apptype" >
            <Option  value="0">安卓</Option>
            <Option  value="1">IOS</Option>
          </Select>
        </FormItem>

      </Form>
    </Modal>
  </Row>
</template>
<script>
import api from "@/api/ttzhuanhua/index.js";

import moment from "moment";

export default {
  data() {

    return {
        pushForm:{
            zhid:"",
            key:"",
            apptype:0
        },
        pushFormRules: {
            zhid: [
                { required: true, message: '请填写转化ID', trigger: 'blur' }
            ],
            key: [
                { required: true, message: '请填写密钥', trigger: 'blur' }
            ],
            apptype: [
                { required: true, message: '请选择下载平台', trigger: 'change' }
            ]
        },
        addModel:false,
        pushLoading:true,
      columns: [
          {
              title: "下载平台",
              render: (h, params) => {
                  var type = params.row.apptype;
                  if (type == 0) {
                      return h("div", ["安卓"]);
                  } else if (type == 1) {
                      return h("div", ["IOS"]);
                  }
              }
          },
        {
          key: "zhid",
          title: "今日头条-转化ID"
        },
          {
              key: "key",
              title: "密钥"
          },
          {
              key: "createtime",
              title: "设置时间"
          },

      ],
      searchData: {zhid:"",pageindex:1,pagesize:10},
      data: [],
      total: 0
    };
  },
  methods: {
      changeModalLoading() {
          this.pushLoading = false;
          this.$nextTick(() => {
              this.pushLoading = true;
          });
      },
      pushOk(){
          this.$refs.pushForm.validate((valid) => {
              if (valid) {
                api.save(this.pushForm).then(res=>{
                    this.addModel=false;
                    this.pushLoading=false;
                    this.searchData.pageindex=1;
                    this.init();
                }).catch(res=>{

                });
              }
              else{
                  this.changeModalLoading();
              }
          })
      },
      pushCancel(){},
      addModeButton(){
          this.addModel=true;
      },
    init() {
        api.getall(this.searchData).then(res=>{
            this.data=res.data.data;
            this.total=res.data.totalNum;
        });
    },
    handleSearch(){
        this.searchData.pageindex=1;
      this.init();
    },
    pageChange(page) {
      this.searchData.pageindex = page;
      this.init();
    }

  },
  created() {
    this.init();
  }
};
</script>
