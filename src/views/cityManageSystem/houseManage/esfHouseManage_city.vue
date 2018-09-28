<template>
  <Card>
    <p slot="title">我的出售房源</p>
    <Tabs v-model="searchData.houseStatus" @on-click="changeStatus">

      <TabPane label="已发布（经纪人房源库）" name="0">

        <Form class="margin-top-20" ref="searchData" :model="searchData" inline :label-width="75">
          <Row>
            <FormItem label="认领ID" prop="houseId">
              <Input v-model.trim="searchData.houseId" style="width:140px" />
            </FormItem>
            <FormItem label="公司房源ID" prop="corpHouseId">
              <Input v-model.trim="searchData.corpHouseId" style="width:140px" />
            </FormItem>
            <FormItem label="楼盘名称" prop="projName">
              <Input v-model.trim="searchData.projName" style="width:140px" />
            </FormItem>
            </Col>
            <FormItem label="价格">
              <Row>
                <Col span="10">
                <FormItem prop="startPrice">
                  <Input v-model.trim="searchData.startPrice" style="width:140px" />
                </FormItem>
                </Col>
                <Col span="2" style="text-align: center">至</Col>
                <Col span="10">
                <FormItem prop="endPrice">
                  <Input v-model.trim="searchData.endPrice" style="width:140px" />
                </FormItem>
                </Col>
                <Col span="2">万元</Col>
              </Row>
            </FormItem>
            <FormItem label="公司名" prop="ofCompany">
              <Select v-model="searchData.ofCompany" style="width:140px">
                <Option value="">全部</Option>
                <Option value="中原地产">中原地产</Option>
                <Option value="我爱我家">我爱我家</Option>
                <Option value="麦田房产">麦田房产</Option>
              </Select>
            </FormItem>
            <FormItem label="排序" prop="sort">
              <Select v-model="searchData.sort" style="width:140px">
                <Option value="1">录入时间从早到晚</Option>
                <Option value="2">录入时间从晚到早</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="pageChange(1)">搜索</Button>
              <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
            </FormItem>
          </Row>

        </Form>
        <Table border :columns="columns0" :data="data0"></Table>
        <Page :total="total0" :current="page0" show-total @on-change="pageChange" class="margin-top-10" align="right"></Page>
      </TabPane>

      <TabPane label="认领库（经纪公司房源库）" name="1">
        <Form class="margin-top-20" ref="searchData" :model="searchData" inline :label-width="80">
          <Row>
            <FormItem label="公司房源ID" prop="corpHouseId">
              <Input v-model.trim="searchData.corpHouseId" style="width:140px" />
            </FormItem>
            <FormItem label="楼盘名称" prop="projName">
              <Input v-model.trim="searchData.projName" style="width:140px" />
            </FormItem>
            <FormItem label="价格">
              <Row>
                <Col span="10">
                <FormItem prop="startPrice">
                  <Input v-model.trim="searchData.startPrice" style="width:140px" />
                </FormItem>
                </Col>
                <Col span="2" style="text-align: center">至</Col>
                <Col span="10">
                <FormItem prop="endPrice">
                  <Input v-model.trim="searchData.endPrice" style="width:140px" />
                </FormItem>
                </Col>
                <Col span="2">万元</Col>
              </Row>
            </FormItem>
            <FormItem label="公司名" prop="ofCompany">
              <Select v-model="searchData.ofCompany" style="width:140px">
                <Option value="">全部</Option>
                <Option value="中原地产">中原地产</Option>
                <Option value="我爱我家">我爱我家</Option>
                <Option value="麦田房产">麦田房产</Option>
              </Select>
            </FormItem>
            <FormItem label="排序" prop="sort">
              <Select v-model="searchData.sort" style="width: 140px">
                <Option value="1">录入时间从早到晚</Option>
                <Option value="2">录入时间从晚到早</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="pageChange(1)">搜索</Button>
              <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
            </FormItem>
          </Row>

        </Form>
        <Table border :columns="columns1" :data="data1"></Table>
        <Page :total="total1" :current="page1" show-total @on-change="pageChange" class="margin-top-10" align="right"></Page>
      </TabPane>
    </Tabs>
    <Modal v-model="modelShow" title="强制下架" :loading="loading" @on-ok="asyncOK">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem>
          <Alert type="warning">提示：
            <template slot="desc">房源强制下架后录入人不可上架，已购买置顶剩余的时间和金额不退，请谨慎操作。
            </template>
          </Alert>
        </FormItem>
        <!-- <FormItem label="登录密码" prop="pswd">
                    <Input type="password" v-model="formCustom.pswd" />
                </FormItem> -->
        <FormItem label="下架原因" prop="forceOffReason">
          <Input type="text" v-model="formCustom.forceOffReason" />
        </FormItem>
      </Form>
    </Modal>

  </Card>
</template>

<script>
import houseApi from "@/api/house/index.js";
import moment from "moment"
export default {
  name: "esfHouseManage",
  data() {
    return {
      columns0: [{
        key: "corpHouseId",
        title: "公司房源ID",
        align: "center",
        width: 100
      },
      {
        key: "houseId",
        title: "认领ID",
        align: "center",
        width: 100
      },
      {
        key: "sourceHouseId",
        title: "官网房源ID",
        align: "center",
        width: 100,
        render: (h, params) => {
          let row = params.row;
          return h("span",row.sourceHouseId)
        }
      },
      {
        key: "baseInfo",
        title: "基本信息",
        minWidth: 450,
        className: "baseInforImg",
        render: (h, params) => {
          let row = params.row;
          let floor
          if (row.floor == '0') {
            floor = h(
              "span", {
                style: {
                  marginRight: "5px"
                }
              },
              "暂无/" + row.totalFloor + "层"
            )
          } else {
            floor = h(
              "span", {
                style: {
                  marginRight: "5px"
                }
              },
              row.floor + "层/" + row.totalFloor + "层"
            )
          }
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
                "a", {
                  props: {
                    type: "text"
                    // size: 'small'
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showDetail(params.index);
                      // this.$router.push({
                      //   name: "agentesfHouseDetail",
                      //   query: {
                      //     houseId: row.houseId,
                      //     projName: row.projName
                      //   }
                      // });
                    }
                  }
                },
                row.projName // 楼盘名称
              ),
              h("p", [
                floor,
                h(
                  "span", {
                    style: {
                      marginRight: "5px"
                    }
                  },
                  row.room + "室" + row.hall + "厅"
                ),
                h(
                  "span", {
                    style: {
                      marginRight: "5px"
                    }
                  },
                  row.buildArea + "㎡"
                ),
                h(
                  "span", {
                    style: {
                      marginRight: "5px"
                    }
                  },
                  row.price + "万元"
                )
              ]),
              h("p", row.houseTitle)
            ])
          ]);
        }
      },
      {
        title: "点击量",
        align: "center",
        children: [
          {
            key: "yesterday",
            title: "昨日",
            align: "center",
            minWidth: 80
          },
          {
            key: "lastWeek",
            title: "前7天",
            align: "center",
            minWidth: 80
          },
          {
            key: "thisMonth",
            title: "本月",
            align: "center",
            minWidth: 80
          }
        ]
      },
      {
        key: "agentName",
        title: "经纪人",
        align: "center",
        width: 100
      },
      {
        key: "ofCompany",
        title: "公司名",
        align: "center",
        width: 100
      },
      {
        key: "createTime",
        title: "录入时间",
        align: "center",
        width: 160,
        render: (h, params) => {
          let createTime = params.row.updateTime;
          return h("span", createTime ? moment(createTime).format("YYYY-MM-DD HH:mm") : '')
        }
      },
      {
        title: "管理",
        key: "action",
        align: "center",
        width: 160,
        render: (h, params) => {
          // 推荐
          let row = params.row;
          return h("div", [
            h(
              "a", {
                props: {
                  type: "text"
                  // size: 'small'
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    // 取消认领
                    this.agentCancelClaimHouseSell(row.houseId);
                  }
                }
              },
              "强制下架"
            ),
            h(
              "a", {
                props: {
                  type: "text"
                },
                on: {
                  click: () => {
                    this.showDetail(params.index);
                  }
                }
              },
              "预览"
            )
          ]);
        }
      }
      ],
      columns1: [{
        key: "corpHouseId",
        title: "公司房源ID",
        align: "center",
        width: 100
      },
      {
        key: "sourceHouseId",
        title: "官网房源ID",
        align: "center",
        width: 100,
        render: (h, params) => {
          let row = params.row;
          return h("span", row.sourceHouseId)
        }
      },
      {
        key: "baseInfo",
        title: "基本信息",
        minWidth: 450,
        className: "baseInforImg",
        render: (h, params) => {
          let row = params.row;
          let floor
          if (row.floor == '0') {
            floor = h(
              "span", {
                style: {
                  marginRight: "5px"
                }
              },
              "暂无/" + row.totalFloor + "层"
            )
          } else {
            floor = h(
              "span", {
                style: {
                  marginRight: "5px"
                }
              },
              row.floor + "层/" + row.totalFloor + "层"
            )
          }
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
                "a", {
                  props: {
                    type: "text"
                    // size: 'small'
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showDetail(params.index);
                      // this.$router.push({
                      //   name: "agentesfHouseDetail",
                      //   query: {
                      //     houseId: row.houseId,
                      //     projName: row.projName,
                      //   }
                      // });
                    }
                  }
                },
                row.projName // 楼盘名称
              ),
              h("p", [
                floor,
                h(
                  "span", {
                    style: {
                      marginRight: "5px"
                    }
                  },
                  row.room + "室" + row.hall + "厅"
                ),
                h(
                  'span', {
                    style: {
                      marginRight: '5px'
                    }
                  },
                  row.forwardDesc
                ),
                h(
                  "span", {
                    style: {
                      marginRight: "5px"
                    }
                  },
                  row.buildArea + "㎡"
                ),
                h(
                  "span", {
                    style: {
                      marginRight: "5px"
                    }
                  },
                  row.price + "万元"
                )
              ]),
              h("p", row.houseTitle)
            ])
          ]);
        }
      },
      {
        key: "ofCompany",
        title: "公司名",
        align: "center",
        width: 160
      },
      {
        key: "createTime",
        title: "录入时间",
        align: "center",
        width: 160,
        render: (h, params) => {
          let createTime = params.row.updateTime;
          return h("span", createTime ? moment(createTime).format("YYYY-MM-DD HH:mm") : '')
        }
      }
      ],

      //  搜索部分数据
      searchData: {
        houseStatus: 0, // 0-待发布，1-已发布，2-已下架
        corpHouseId: "", // 房源id
        houseId: "",
        ofCompany: "",
        projName: "", // 大楼名称
        startPrice: "",
        endPrice: "",
        sort: "2"
      },
      // 强制下架数据
      modelShow: false,
      loading: false,
      formCustom: {
        houseID: "",
        // pswd: "",
        forceOffReason: ""
      },
      ruleCustom: {
        // pswd: [{ required: true, message: "请输入登陆密码", trigger: "blur" }],
        forceOffReason: [{
          required: true,
          message: "请输入下架原因",
          trigger: "blur"
        }]
      },

      data0: [],
      data1: [],
      total0: 0,
      total1: 0,
      page0: 1,
      page1: 1
    };
  },
  methods: {
    init() {
      houseApi.getListAgentClaimHouseSell(this.searchData).then(({
        data
      }) => {
        this.data0 = data.data.data;
        this.total0 = data.data.total;
      });
    },
    // 切换认领和未认领操作
    changeStatus(name) {
      this.searchData.corpHouseId = "";
      this.searchData.projName = ""; // 大楼名称
      this.searchData.startPrice = "";
      this.searchData.endPrice = "";
      this.searchData.sort = "2";
      this.searchData.houseId = ""
      if (name !== 0) {
        this.pageChange(this.page1);
      } else {
        this.pageChange(this.page0);
      }
    },
    // 清空搜索选项
    handleCancel(name) {
      this.$refs[name].resetFields();
      this.searchData.corpHouseId = "";
      this.searchData.projName = ""; // 大楼名称
      this.searchData.startPrice = "";
      this.searchData.endPrice = "";
      this.searchData.sort = "2";
      this.searchData.houseId = ""
      this.pageChange(1);
    },
    // 翻页
    pageChange(cuPage) {
      let obj = Object.assign(this.searchData, {
        pageNum: cuPage
      });
      houseApi.getListAgentClaimHouseSell(obj).then(({
        data
      }) => {
        if (this.searchData.houseStatus == 0) {
          this.data0 = data.data.data;
          this.total0 = data.data.total;
          this.page0 = cuPage;
        } else {
          this.data1 = data.data.data;
          this.page1 = cuPage;
          this.total1 = data.data.total;
        }
      });
    },
    //取消认领操作
    // agentCancelClaimHouseSell(index) {
    //   let houseID = index;
    //   this.formCustom.forceOffReason = "";
    //   this.modelShow = true;
    //   houseApi
    //     .customerCancelClaimHouseSell({
    //       houseID, forceOffReason: "测试"
    //     })
    //     .then(({
    //       data
    //     }) => {
    //       this.$Message.success("强制下架成功");
    //       this.pageChange(this.page0);
    //     });
    // },
    //
    agentCancelClaimHouseSell(houseId) {
      this.formCustom.houseID = houseId;
      // this.formCustom.pswd = "";
      this.formCustom.forceOffReason = "";
      this.modelShow = true;
    },
    asyncOK() {
      this.$refs["formCustom"].validate(valid => {
        this.loading = true;
        if (valid) {
          houseApi
            .customerCancelClaimHouseSell(this.formCustom)
            .then(({
              data
            }) => {
              this.$Message.success("强制下架成功");
              this.pageChange(this.page0);
            });
        } else {
          this.loading = true;
        }
      });
    },

    // 查看详情操作
    showDetail(index) {
      let houseId;
      if (this.searchData.houseStatus == 0) {
        houseId = this.data0[index].houseId;
      } else {
        houseId = this.data1[index].corpHouseId;
      }
      this.$router.push({
        name: "sellHouseDetail",
        query: {
          houseId,
          houseStatus: this.searchData.houseStatus
        }
      });
    }
  },
  created() {
    this.init();
  }
};
</script>