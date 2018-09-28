<template>
  <Card>
    <Tabs v-model="tabsName" @on-click="init()">
      <TabPane label="出售房源" name="sell">
        <p slot="title">我的预约</p>
        <Table border :columns="columns1" :data="data"></Table>
        <Page :total="total" show-total @on-change="pageChange" class="margin-top-10" align="right"></Page>
      </TabPane>
      <!-- <TabPane label="出租房源" name="rent">
        <p slot="title">我的预约</p>
        <Table border :columns="columns2" :data="data"></Table>
        <Page :total="total" show-total @on-change="pageChange" class="margin-top-10" align="right"></Page>
      </TabPane> -->
    </Tabs>
  </Card>
</template>

<script>
import api from "@/api/agent/index"
import moment from "moment";
export default {
  name: "myReservation",
  data() {
    return {
      columns1: [
        {
          key: "createTime",
          title: "留言时间",
          align: "center",
          width: 140,
          render: (h, params) => {
            let createTime = params.row.createTime;
            return h("span", createTime ? moment(createTime).format("YYYY-MM-DD HH:mm") : '')
          }
        },
        {
          title: "留言房源",
          align: "center",
          children: [
            {
              key: "HouseId",
              title: "房源编号",
              align: "center",
              render: (h, params) => {
                return h("span",
                  params.row.sellHouseId
                )
              },
              width: 90
            },
            {
              key: "projname",
              title: "楼盘名称",
              align: "center",
              width: 150,
              render: (h, params) => {
                return h("a", {
                  props: {
                    type: "text"
                  },
                  on: {
                    click: () => {
                      this.showDetail(params.row.sellHouseId)
                    }
                  }
                }, params.row.projname
                )
              }
            },
            {
              key: "price",
              title: "价格",
              align: "center",
              width: 100,
              render: (h, params) => {
                return h("span",
                  params.row.price + '万元'
                )
              }
            },
            {
              key: "area",
              title: "面积",
              align: "center",
              width: 90,
              render: (h, params) => {
                return h("span",
                  params.row.area + '㎡'
                )
              }
            },
            {
              key: "house",
              title: "居室",
              align: "center",
              width: 90,
              render: (h, params) => {
                return h("span",
                  params.row.room + '室' + params.row.hall + '厅'
                )
              }
            }
          ]
        },
        {
          key: "userPhone",
          title: "用户预留电话",
          align: "center",
          width: 120
        },
        {
          key: "content",
          title: "留言内容",
          align: "center",
          minWidth: 160
        },
        {
          key: "action",
          title: "备注",
          align: "center",
          width: 160,
          render: (h, params) => {
            let mode0 = [
              h("span", "有效"),
              h("Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.chageStatus(params.row.id, 1)
                    }
                  }
                },
                "取消"
              ),
            ];
            let mode1 = [
              h("span", "无效"),
              h("Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.chageStatus(params.row.id, 0)
                    }
                  }
                },
                "有效"
              ),
            ];
            let status;
            params.row.status === 0 ? status = mode0 : status = mode1
            return h("div", status);
          }
        }
      ],
      columns2: [
        {
          key: "createTime",
          title: "留言时间",
          align: "center",
          width: 140,
          render: (h, params) => {
            let createTime = params.row.createTime;
            return h("span", createTime ? moment(createTime).format("YYYY-MM-DD HH:mm") : '')
          }
        },
        {
          title: "留言房源",
          align: "center",
          children: [
            {
              key: "HouseId",
              title: "房源编号",
              align: "center",
              render: (h, params) => {
                return h("span",
                  params.row.rentHouseId
                )
              },
              width: 90
            },
            {
              key: "projname",
              title: "楼盘名称",
              align: "center",
              width: 150,
              render: (h, params) => {
                return h("a", {
                  props: {
                    type: "text"
                  },
                  on: {
                    click: () => {
                      this.showDetail(params.row.rentHouseId)
                    }
                  }
                }, params.row.projname
                )
              }
            },
            {
              key: "price",
              title: "价格",
              align: "center",
              width: 100,
              render: (h, params) => {
                return h("span",
                  params.row.price + '元/月'
                )
              }
            },
            {
              key: "area",
              title: "面积",
              align: "center",
              width: 90,
              render: (h, params) => {
                return h("span",
                  params.row.area + '㎡'
                )
              }
            },
            {
              key: "house",
              title: "居室",
              align: "center",
              width: 90,
              render: (h, params) => {
                return h("span",
                  params.row.room + '室' + params.row.hall + '厅'
                )
              }
            }
          ]
        },
        {
          key: "userPhone",
          title: "用户预留电话",
          align: "center",
          width: 120
        },
        {
          key: "content",
          title: "留言内容",
          align: "center",
          minWidth: 160
        },
        {
          key: "action",
          title: "备注",
          align: "center",
          width: 160,
          render: (h, params) => {
            let mode0 = [
              h("span", "有效"),
              h("Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.chageStatus(params.row.id, 1)
                    }
                  }
                },
                "取消"
              ),
            ];
            let mode1 = [
              h("span", "无效"),
              h("Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.chageStatus(params.row.id, 0)
                    }
                  }
                },
                "有效"
              ),
            ];
            let status;
            params.row.status === 0 ? status = mode0 : status = mode1
            return h("div", status);
          }
        }
      ],
      data: [],
      tabsName: "sell",
      total: 0
    }
  },
  methods: {
    // 查看详情操作
    showDetail(houseId) {
      if (this.tabsName == "sell") {
        this.$router.push({
          name: "agentesfHouseDetail",
          query: {
            houseId,
            houseStatus: 0
          }
        });
      } else {
        this.$router.push({
          name: "agentRentHouseDetail",
          query: {
            houseId
          }
        });
      }
    },
    pageChange(cuPage) {
      if (this.tabsName == "sell") {
        api.AgentHouseSellLeaveMessage({ pageNum: cuPage }).then(response => {
          this.data = response.data.data.data;
          this.total = response.data.data.total;
        })
      } else {
        api.AgentHouseRentLeaveMessage({ pageNum: cuPage }).then(response => {
          this.data = response.data.data.data;
          this.total = response.data.data.total;
        })
      }
    },
    chageStatus(id, status) {
      if (this.tabsName == "sell") {
        api.changeAgentHouseSellLeaveMessageStatus({ id, status }).then((response) => {
          this.init()
        })
      } else {
        api.changeAgentHouseRentLeaveMessageStatus({ id, status }).then((response) => {
          this.init()
        })
      }
    },

    init() {
      if (this.tabsName == "sell") {
        api.AgentHouseSellLeaveMessage().then(response => {
          this.data = response.data.data.data;
          this.total = response.data.data.total;
        })
      } else {
        api.AgentHouseRentLeaveMessage().then(response => {
          this.data = response.data.data.data;
          this.total = response.data.data.total;
        })
      }
    }
  },
  created() {
    this.init()
  }
}
</script>

<style>

</style>
