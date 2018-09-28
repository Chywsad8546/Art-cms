<template>
  <div>
    <Card>
      <p slot="title">我的店铺</p>
      <p class="recommendHead">
        <h3>当前推荐房源</h3>
      </p>
      <Tabs v-model="tabsName" @on-click="init()">
        <TabPane label="出售房源" name="sell">
          <!-- 出售房源-已推荐 -->
          <Row>
            <Table :loading="loading" border :no-data-text="noDataText" :columns="columns1" :data="data1"></Table>
          </Row>
          <!-- 出售房源推荐列表 -->
          <Row>
            <p class="recommendHead">
              <h3>添加推荐房源</h3>
            </p>
            <Form class="margin-top-20" ref="searchData" :model="searchData" inline :label-width="70">
              <FormItem label="房源ID" prop="houseId">
                <Input v-model="searchData.houseId" />
              </FormItem>
              <FormItem label="楼盘名称" prop="projName">
                <Input v-model="searchData.projName" />
              </FormItem>
              <FormItem>
                <Button type="primary" @click="pageChange(1)">搜索</Button>
                <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
              </FormItem>
            </Form>
            <Table :loading="loading" border :columns="columns2" :data="data2"></Table>
            <Page :total="total" show-total @on-change="pageChange" class="margin-top-10" align="right"></Page>
          </Row>
        </TabPane>

        <TabPane label="出租房源" name="rent">
          <!-- 出租房源-已推荐 -->
          <Row>
            <Table :loading="loading" border :no-data-text="noDataText" :columns="columns1" :data="data1"></Table>
          </Row>
          <!-- 出租房源列表 -->
          <Row>
            <p class="recommendHead">
              <h3>添加推荐房源</h3>
            </p>
            <Form class="margin-top-20" ref="searchData" :model="searchData" inline :label-width="70">
              <FormItem label="房源ID" prop="houseId">
                <Input v-model="searchData.houseId" />
              </FormItem>
              <FormItem label="楼盘名称" prop="projName">
                <Input v-model="searchData.projName" />
              </FormItem>
              <FormItem>
                <Button type="primary" @click="pageChange(1)">搜索</Button>
                <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
              </FormItem>
            </Form>
            <Table :loading="loading" border :columns="columns2" :data="data2"></Table>
            <Page :total="total" show-total @on-change="pageChange" class="margin-top-10" align="right"></Page>
          </Row>
        </TabPane>
      </Tabs>

      <!-- 定向推荐选择模态框 -->
      <Modal ref="tuiyou" v-model="recommendModel" title="房源推荐" @on-ok="ok">
        <Row>
          <RadioGroup v-model="recommendType">
            <Radio label="智能推荐"></Radio>
            <Radio label="定向推荐"></Radio>
          </RadioGroup>
        </Row>
        <Row style="margin-top:20px">
          <Form v-if="recommendType=='定向推荐'" label-position="left" :model="recommendInfo" :label-width="80">
            <FormItem label="地域">
              <RadioGroup v-model="area" type="button">
                <Radio label="不限"></Radio>
                <Radio label="商圈"></Radio>
              </RadioGroup>
              <Row v-if="area==='商圈'" style="margin-top:20px">
                <Col span="7">
                <Cascader :data="sqList" @on-change="changeSq" v-model="sqVal">
                </Cascader>
                </Col>
                <Col offset="2" span="11">
                <Input v-model="changedArea" type="textarea" :rows="4" placeholder="已选商圈"></Input>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="性别">
              <RadioGroup v-model="recommendInfo.gender" type="button">
                <Radio label="">不限</Radio>
                <Radio label="1">女性</Radio>
                <Radio label="0">男性</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="年龄">
              <RadioGroup v-model="recommendInfo.ageRange" type="button">
                <Radio label="">不限</Radio>
                <Radio label="1">
                  <23</Radio>
                    <Radio label="2">24-30</Radio>
                    <Radio label="3">31-40</Radio>
                    <Radio label="4">41-50</Radio>
                    <Radio label="5">>50</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </Row>
      </Modal>
    </Card>
  </div>
</template>


<script>
import api from "@/api/agent/index.js";
import houseApi from "@/api/house/index.js";
import mixin from "@/mixin/index.js";

export default {
  name: "agentStoresRecommend",
  components: {},
  mixins: [mixin],

  data() {
    return {
      // 智能推荐
      currenHouseId: "",
      recommendModel: false,
      recommendType: "智能推荐",
      recommendInfo: {
        sellHouseId: "",
        rentHouseId: "",
        gender: "",
        ageRange: "",
        districtArea: []
      },
      area: "不限",
      // sqList: [],
      sqVal: [],
      changedArea: "",

      loading: false,
      noDataText: "对不起，您当前没有任何推荐房源，快去推荐吧！",
      publishStatus: ["已发布", "未发布"],
      searchData: {
        houseId: "",
        projName: ""
      },
      total: 0,
      page: 1,
      tabsName: "sell",
      //当前推荐房源列表
      columns1: [
        {
          title: "房源ID",
          key: "houseId",
          width: 100,
          align: "center"
        },
        {
          title: "基本信息",
          key: "baseInfo",
          minWidth: 450,
          className: "baseInforImg",
          render: (h, params) => {
            let row = params.row;
            return h("div", [
              h("img", {
                attrs: {
                  src: this.$imgurl(row.titlePic, "agent500x300"),
                  width: 100,
                  height: 80
                },
                on: {
                  error: this.$imgerr
                }
              }),
              h("p", [
                h(
                  "a",
                  {
                    props: {
                      type: "text"
                      // size: 'small'
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.showDetail(row.houseId);
                      }
                    }
                  },
                  row.projName //楼盘名称
                ),
                // isRecommend,
                h("p", [
                  h(
                    "span",
                    {
                      style: {
                        marginRight: "5px"
                      }
                    },
                    row.floor + "/" + row.totalFloor + "层"
                  ),
                  h(
                    "span",
                    {
                      style: {
                        marginRight: "5px"
                      }
                    },
                    row.room + "室" + row.hall + "厅"
                  ),
                  h(
                    "span",
                    {
                      style: {
                        marginRight: "5px"
                      }
                    },
                    (row.buildArea || row.area) + "㎡"
                  ),
                  h(
                    "span",
                    {
                      style: {
                        marginRight: "5px"
                      }
                    },
                    row.price ? (row.price + "万元") : (row.rentPrice + "/月")
                  )
                ]),
                h("p", row.houseTitle)
              ])
            ]);
          }
        },
        {
          title: "推荐时间",
          key: "createTime",
          width: 160,
          align: "center",
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            let row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.tabsName === "sell"
                        ? this.cancelSellRecommend(row.houseId, row.isRecommend)
                        : this.cancelRentRecommend(row.houseId, row.isRecommend);
                    }
                  }
                },
                "取消推荐"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.showDetail(row.houseId);
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      data1: [],

      //添加推荐房源列表
      columns2: [
        {
          title: "房源ID",
          key: "houseId",
          width: 100,
          align: "center",
        },
        {
          title: "基本信息",
          key: "baseInfo",
          minWidth: 450,
          className: "baseInforImg",
          render: (h, params) => {
            let row = params.row;
            return h("div", [
              h("img", {
                attrs: {
                  src: this.$imgurl(row.titlePic, "agent500x300"),
                  width: 100,
                  height: 80
                },
                on: {
                  error: this.$imgerr
                }
              }),
              h("p", [
                h(
                  "a",
                  {
                    props: {
                      type: "text"
                      // size: 'small'
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.showDetail(row.houseId);
                      }
                    }
                  },
                  row.projName //楼盘名称
                ),
                // isRecommend,
                h("p", [
                  h(
                    "span",
                    {
                      style: {
                        marginRight: "5px"
                      }
                    },
                    row.floor + "/" + row.totalFloor + "层"
                  ),
                  h(
                    "span",
                    {
                      style: {
                        marginRight: "5px"
                      }
                    },
                    row.room + "室" + row.hall + "厅" + row.toilet + "卫"
                  ),
                  h(
                    "span",
                    {
                      style: {
                        marginRight: "5px"
                      }
                    },
                    (row.buildArea || row.area) + "㎡"
                  ),
                  h(
                    "span",
                    {
                      style: {
                        marginRight: "5px"
                      }
                    },
                    row.price ? (row.price + "万元") : (row.rentPrice + "/月")
                  )
                ]),
                h("p", row.houseTitle)
              ])
            ]);
          }
        },
        // {
        //   title: "发布状态",
        //   key: "recommendTime",
        //   width: 160,
        //   align: "center",
        //   render: (h, params) => {
        //     return h("p", this.publishStatus[params.row.status])
        //   }
        // },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            let row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.recommendModel = true;
                      this.currenHouseId = row.houseId;
                    }
                  }
                },
                "智能推荐"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.showDetail(row.houseId);
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      data2: []
    };
  },
  methods: {
    // Modal确定
    ok() {
      if (this.tabsName === "sell") {
        this.setSellRencommend(this.currenHouseId);
      } else {
        this.setRentRecommend(this.currenHouseId);
      }
    },
    // 选择商圈
    changeSq(value, selectedData) {
      if (selectedData) {
        this.changedArea +=
          selectedData[0].label +
          "/" +
          selectedData[selectedData.length - 1].label +
          "\n";
      }
      this.sqVal = [];
    },
    // 设置出租房源推荐
    async setRentRecommend(houseId) {
      this.$Modal.confirm({
        title: "设置为推荐房源",
        content: "设置为推荐房源：<p>房源ID：" + houseId + "</p>",
        loading: true,
        onOk: () => {
          if (this.recommendType === "智能推荐") {
            houseApi
              .setRentRecommend({ houseId })
              .then(response => {
                this.$Modal.remove();
                this.$Message.success({
                  content: "设置推荐成功",
                  duration: 2
                });
                this.init();
              })
              .catch(error => {
                this.$Modal.remove();
                if (error.response.data.code === 20419) {
                  this.$Message.error({
                    content: "已达推荐房源数量上限，不可推荐！",
                    duration: 2
                  });
                } else {
                  this.$Message.error({
                    content: error.response.data.msg,
                    duration: 2
                  });
                }
              });
          } else if (this.recommendType === "定向推荐") {
            this.recommendInfo.rentHouseId = houseId;
            this.changedAreaList.map(item => {
              if (item.district) {
                this.recommendInfo.districtArea.push(item);
              }
            });
            houseApi
              .directionalRecommend(this.recommendInfo)
              .then(response => {
                this.$Modal.remove();
                this.$Message.success({
                  content: "设置推荐成功",
                  duration: 2
                });
                this.init();
              })
              .catch(error => {
                console.log(error.response);
                this.$Modal.remove();
                this.$Message.error({
                  content: error.response.data.msg,
                  duration: 2
                });
              });
          }
        }

      });
    },
    // 取消出租房源推荐
    async cancelRentRecommend(houseId, type) {
      this.$Modal.confirm({
        title: "取消推荐房源",
        content: "取消推荐房源：<p>房源ID：" + houseId + "</p>",
        loading: true,
        onOk: () => {
          // 取消智能推荐
          if (type === 1) {
            houseApi
              .setRentUnRecommend({ houseId })
              .then(response => {
                this.$Modal.remove();
                this.$Message.success({
                  content: "取消推荐成功",
                  duration: 2
                });
                this.init();
              })
              .catch(error => {
                this.$Modal.remove();
                this.$Message.error({
                  content: error.response.data.msg,
                  duration: 2
                });
              });
            // 取消定向推荐    
          } else if (type === 2) {
            houseApi
              .cancelDirectionalRecommend({ houseId })
              .then(response => {
                this.$Modal.remove();
                this.$Message.success({
                  content: "取消推荐成功",
                  duration: 2
                });
                this.init();
              })
              .catch(error => {
                console.log("报错");
                console.log(error);
                this.$Modal.remove();
                this.$Message.error({
                  content: error.response.data.msg,
                  duration: 2
                });
              });
          }

        }
      });
    },
    // 设置出售房源推荐
    async setSellRencommend(houseId) {
      this.$Modal.confirm({
        title: "设置为推荐房源",
        content: "设置为推荐房源：<p>房源ID：" + houseId + "</p>",
        loading: true,
        onOk: () => {
          if (this.recommendType === "智能推荐") {
            houseApi
              .setSellIsRecommend({ houseId: houseId, isRecommend: 1 })
              .then(response => {
                this.$Modal.remove();
                this.$Message.success({
                  content: "设置推荐成功",
                  duration: 2
                });
                this.init();
              })
              .catch(error => {
                this.$Modal.remove();
                if (error.response.data.code === 20419) {
                  this.$Message.error({
                    content: "已达推荐房源数量上限，不可推荐！",
                    duration: 2
                  });
                } else {
                  this.$Message.error({
                    content: error.response.data.msg,
                    duration: 2
                  });
                }
              });
          } else if (this.recommendType === "定向推荐") {
            this.recommendInfo.sellHouseId = houseId;
            this.changedAreaList.map(item => {
              if (item.district) {
                this.recommendInfo.districtArea.push(item);
              }
            });
            houseApi
              .sellHouseDR(this.recommendInfo)
              .then(response => {
                this.$Modal.remove();
                this.$Message.success({
                  content: "设置推荐成功",
                  duration: 2
                });
                this.init();
              })
              .catch(error => {
                console.log(error.response);
                this.$Modal.remove();
                this.$Message.error({
                  content: error.response.data.msg,
                  duration: 2
                });
              });
          }
        }

      });
    },
    // 取消出售房源推荐
    async cancelSellRecommend(houseId, type) {
      this.$Modal.confirm({
        title: "取消推荐房源",
        content: "取消推荐房源：<p>房源ID：" + houseId + "</p>",
        loading: true,
        onOk: () => {
          // 取消智能推荐
          if (type === 1) {
            houseApi
              .setSellIsRecommend({ houseId: houseId, isRecommend: 0 })
              .then(response => {
                this.$Modal.remove();
                this.$Message.success({
                  content: "取消推荐成功",
                  duration: 2
                });
                this.init();
              })
              .catch(error => {
                this.$Modal.remove();
                this.$Message.error({
                  content: error.response.data.msg,
                  duration: 2
                });
              });
            // 取消定向推荐    
          } else if (type === 2) {
            houseApi
              .cancelSellHouseDR({ houseId: houseId })
              .then(response => {
                this.$Modal.remove();
                this.$Message.success({
                  content: "取消推荐成功",
                  duration: 2
                });
                this.init();
              })
              .catch(error => {
                console.log("报错");
                console.log(error);
                this.$Modal.remove();
                this.$Message.error({
                  content: error.response.data.msg,
                  duration: 2
                });
              });
          }

        }
      });
    },
    // 获取出售房源列表
    async listRecommendHouseSell() {
      let data1 = (await houseApi.listRecommendHouseSell({ isRecommend: 1 })).data;
      let data2 = (await houseApi.listRecommendHouseSell({ isRecommend: 0 })).data;
      this.data1 = data1.data.data;
      this.data2 = data2.data.data;
      this.total = data2.data.total;
    },
    // 获取出租房源列表
    async listHouseRent() {
      let data1 = (await houseApi.listHouseRent({ recommend: 1 })).data;
      let data2 = (await houseApi.listHouseRent({ recommend: 0 })).data;
      this.data1 = data1.data.data;
      this.data2 = data2.data.data;
      this.total = data2.data.total;
    },
    // 查看详情操作
    showDetail(houseId) {
      if (this.tabsName === "sell") {
        this.$router.push({
          name: "agentesfHouseDetail",
          query: {
            houseId: houseId,
            houseStatus: 0
          }
        });
      } else if (this.tabsName === "rent") {
        this.$router.push({
          name: "agentRentHouseDetail",
          query: {
            houseId: houseId,
            houseStatus: 0
          }
        });
      }
    },
    // 未推荐翻页
    async pageChange(cuPage) {
      let obj1 = Object.assign({}, this.searchData, {
        pageNum: cuPage,
        isRecommend: 0
      });
      let obj2 = Object.assign({}, this.searchData, {
        pageNum: cuPage,
        recommend: 0
      });
      if (this.tabsName === "sell") {
        let { data } = await houseApi.listRecommendHouseSell(obj1);
        this.data2 = data.data.data;
        this.total = data.data.total;
      } else if (this.tabsName === "rent") {
        let { data } = await houseApi.listHouseRent(obj2);
        this.data2 = data.data.data;
        this.total = data.data.total;
      };
      this.page = cuPage;
    },
    // 清空搜索
    handleCancel(name) {
      this.$refs[name].resetFields();
      this.searchData.pageNum = 1;
      this.init();
    },
    //  页面渲染与初始化
    async init() {
      this.loading = true;
      this.recommendInfo = {
        sellHouseId: "",
        rentHouseId: "",
        gender: "",
        ageRange: "",
        districtArea: []
      };
      this.searchData = {
        houseId: "",
        projName: ""
      };
      this.currenHouseId = "";
      this.recommendType = "智能推荐";
      this.area = "不限";
      this.sqVal = [];
      this.changedArea = "";
      if (this.tabsName === "sell") {
        await this.listRecommendHouseSell();
      } else if (this.tabsName === "rent") {
        await this.listHouseRent();
      }
      this.loading = false;
    }
  },
  computed: {
    changedAreaList: function () {
      let list = this.changedArea.split("\n");
      return list.map(item => {
        let areArr = item.split("/");
        return {
          district: areArr[0],
          area: areArr[1]
        };
      });
    }
  },
  created() {
    this.init();
  }
};
</script>
<style>
.recommendHead {
  margin: 5px;
}
</style>