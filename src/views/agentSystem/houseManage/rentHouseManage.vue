<template>
  <Card>
    <p slot="title">我的出租房源</p>
    <houseNumRent ref="houseNum"></houseNumRent>
    <Row v-if="selfInfo.idCardAuth =='未认证'" style="margin-top:20px;">
      <Alert type="warning">
        您的账号身份还完成认证！为了保证您能使用完整功能，快去认证身份吧！
        <a>
          <router-link :to="{name:'certification'}">身份认证>></router-link>
        </a>
      </Alert>
    </Row>
    <Menu mode="horizontal" theme="light" @on-select="skipPage" active-name="agentRentHouseManage">
      <MenuItem name="agentRentHouseManage"> 已发布
      </MenuItem>
      <MenuItem name="agentRentHouseManageWait"> 待发布
      </MenuItem>
      <MenuItem name="agentRentHouseManageOff"> 已下架
      </MenuItem>
    </Menu>
    <Form class="margin-top-20" ref="searchData" :model="searchData" inline :label-width="100">
      <FormItem label="房源ID" prop="houseId">
        <Input v-model="searchData.houseId" style="width:140px" />
      </FormItem>
      <FormItem label="楼盘名称" prop="projName">
        <Input v-model="searchData.projName" style="width:140px" />
      </FormItem>
      <FormItem label="价格">
        <Row>
          <Col span="10">
          <FormItem prop="startPrice">
            <Input v-model="searchData.startPrice" style="width:140px" />
          </FormItem>
          </Col>
          <Col span="2" style="text-align: center">至</Col>
          <Col span="10">
          <FormItem prop="endPrice">
            <Input v-model="searchData.endPrice" style="width:140px" />
          </FormItem>
          </Col>
          <Col span="2">元/月</Col>
        </Row>
      </FormItem>
      <FormItem label="排序" prop="sort">
        <Select v-model="searchData.sort" style="width: 141px">
          <Option value="1">录入时间从早到晚</Option>
          <Option value="2">录入时间从晚到早</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSearch('searchData')">搜索</Button>
        <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="multiUnpublish">批量下架</Button>
      </FormItem>

    </Form>
    <Table @on-selection-change="(sel)=>{multiSelArr=sel}" border :columns="columns" :data="data"></Table>
    <Page :total="total" :current="searchData.pageNum" @on-change="pageChange" class="margin-top-10" align="right"></Page>
    <bottomAlert></bottomAlert>
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
            <!-- <Cascader style="width:220px; margin:0 0 20px;" :data="sqList" change-on-select @on-change="changeSq1" v-model="sqVal[1]">
        </Cascader>
        <Cascader style="width:220px; margin:0 0 20px;" :data="sqList" change-on-select @on-change="changeSq2" v-model="sqVal[2]">
        </Cascader> -->
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
                <23 </Radio>
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
</template>

<script>
import api from "@/api/agent/index.js";
import houseApi from "@/api/house/index.js";
import bottomAlert from "@/views/agentSystem/houseManage/components/bottomAlert";
import houseNumRent from "@/views/agentSystem/houseManage/components/houseNumRent";
import moment from "moment"
import mixin from "@/mixin/index.js";
import {
  compact
} from "lodash";

export default {
  name: "rentHouseManage",
  components: {
    bottomAlert,
    houseNumRent
  },
  mixins: [mixin],
  data() {
    return {
      houseNum: 0,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          key: "houseId",
          title: "房源ID",
          align: "center",
          minWidth: 90
        },
        {
          key: "baseInfo",
          title: "基本信息",
          minWidth: 350,
          className: "baseInforImg",
          render: (h, params) => {
            let row = params.row;
            let isRecommend;
            if (row.isRecommend == 1 || row.isRecommend == 2) {
              isRecommend = h(
                "Tag", {
                  props: {
                    color: "red"
                  }
                },
                "荐"
              );
            }


            let isTop = h(
              "Tag", {
                props: {
                  color: "red"
                }
              },
              "顶"
            );
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
                        this.$router.push({
                          name: "agentRentHouseDetail",
                          query: {
                            houseId: row.houseId
                          }
                        });
                      }
                    }
                  },
                  row.projName // 楼盘名称
                ),
                isRecommend,
                h("p", [
                  h(
                    "span", {
                      style: {
                        marginRight: "5px"
                      }
                    },
                    row.floor + "层/" + row.totalFloor + "层"
                  ),
                  h(
                    "span", {
                      style: {
                        marginRight: "5px"
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
                    row.room + "室" + row.hall + "厅" + row.toilet + "卫"
                  ),
                  h(
                    "span", {
                      style: {
                        marginRight: "5px"
                      }
                    },
                    row.area + "㎡"
                  ),
                  h(
                    "span", {
                      style: {
                        marginRight: "5px"
                      }
                    },
                    row.rentPrice + "元/月"
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
              minWidth: 60
            },
            {
              key: "lastWeek",
              title: "前7天",
              align: "center",
              minWidth: 60
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
          key: "createTime",
          title: "录入时间",
          align: "center",
          minWidth: 80,
          render: (h, params) => {
            let createTime = params.row.createTime;
            return h("span", createTime ? moment(createTime).format("YYYY-MM-DD HH:mm") : '')
          }
        },
        {
          title: "管理",
          key: "action",
          align: "center",
          minWidth: 160,
          render: (h, params) => {
            // 推荐
            let row = params.row;
            let hrecommend = "";
            if (row.isRecommend == 1 || row.isRecommend == 2) {
              hrecommend = h(
                "Button", {
                  props: {
                    type: "ghost",
                    size: 'small'
                  },
                  style: {
                    marginBottom: "10px"
                  },
                  on: {
                    click: () => {
                      if (row.isRecommend == 1) {
                        this.setRentUnRecommend(params.index);

                      } else if (row.isRecommend == 2) {
                        this.cancelDirectionalRecommend(params.index)

                      }
                    }
                  }
                },
                "取消推荐"
              );
            } else {
              hrecommend = h(
                "Button", {
                  props: {
                    type: "ghost",
                    size: 'small'
                  },
                  style: {
                    border: "1px solid #57a3f3",
                    color: "#57a3f3",
                    marginBottom: "10px"
                  },
                  on: {
                    click: () => {
                      this.recommendModel = true;
                      this.currentIndex = params.index;
                    }
                  }
                },
                "智能推荐"
              );
            }
            return h("div", [
              h("ButtonGroup", [
                hrecommend,
                h(
                  "Button", {
                    props: {
                      type: "ghost",
                      size: "small"
                    },
                    style: {
                      border: "1px solid #57a3f3",
                      color: "#57a3f3"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "agentRentHouseDetail",
                          query: {
                            houseId: row.houseId
                          }
                        });
                      }
                    }
                  },
                  "修改"
                )
              ]),
              h("ButtonGroup", [
                h(
                  "Button", {
                    props: {
                      type: "ghost",
                      size: "small"
                    },
                    style: {
                      marginBottom: "10px",
                    },
                    on: {
                      click: () => {
                        this.changeState(2, params.index);
                      }
                    }
                  },
                  "取消发布"
                ),
                h(
                  "Button", {
                    props: {
                      type: "ghost",
                      size: "small"
                    },
                    style: {
                    },
                    on: {
                      click: () => {
                        this.delHouse(params.index);
                      }
                    }
                  },
                  "删除"
                )
              ])
            ]);
          }
        }
      ],
      selfInfo: "",
      searchData: {
        status: 1, // 0-待发布，1-已发布，2-已下架
        houseId: "", //
        projName: "", // 大楼名称
        startPrice: "",
        endPrice: "",
        sort: "2",
        pageNum: 1,
        pageSize: 10
      },
      data: [],
      changeStatus: false,
      changeStatusData: {
        // 取消发布传参数
        houseId: "",
        status: 0
      },
      initTable: [],
      total: 0,
      currentIndex: "",
      recommendModel: false,
      recommendType: "智能推荐",
      recommendInfo: {
        rentHouseId: "",
        gender: "",
        ageRange: "",
        districtArea: []
      },
      area: "不限",
      // sqList: [],
      sqdata: "",
      sqVal: [],
      changedArea: "",
      multiSelArr: []
    };
  },
  methods: {
    ok() {
      if (this.recommendType == "智能推荐") {
        this.setRentRecommend(this.currentIndex);
        // this.changeRecommend(1, this.currentIndex);
      } else {
        this.recommendInfo.rentHouseId = this.data[this.currentIndex].houseId;
        this.changedAreaList.map(x => {
          if (x.district) {
            this.recommendInfo.districtArea.push(x);
          }
        });
        console.log(this.recommendInfo);

        houseApi
          .directionalRecommend(this.recommendInfo)
          .then(response => {
            console.log(response);
            this.$Modal.remove();
            this.$Message.success({
              content: "设置推荐成功",
              duration: 2
            });
            this.pageChange(this.pageNum);
          })
          .catch(error => {
            console.log(error.response);
            this.$Modal.remove();
            this.$Message.success({
              content: error.response.data.msg,
              duration: 2
            });
          });
      }
      this.recommendInfo = {
        rentHouseId: "",
        area: "不限",
        gender: "",
        ageRange: "",
        districtArea: []
      };
      this.changedArea = "";
      this.recommendType = '智能推荐'
    },
    changeSq(value, selectedData) {
      console.log(value);
      console.log(selectedData);
      if (selectedData) {
        this.changedArea +=
          selectedData[0].label +
          "/" +
          selectedData[selectedData.length - 1].label +
          "\n";
      }
      this.sqVal = [];
    },
    skipPage(name) {
      this.$router.push({
        name: name
      });
    },
    init() {
      houseApi.listHouseRent(this.searchData).then(response => {
        this.data = this.initTable = response.data.data.data;
        this.total = response.data.data.total;
        this.$refs.houseNum.init();
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
    // 修改发布状态
    changeState(type, index) {
      let params = {
        houseId: this.data[index].houseId,
        status: type
      };
      this.$Modal.confirm({
        title: "发布",
        content: "<p>取消发布房源：房源id：" + params.houseId + "</p>",
        loading: true,
        onOk: () => {
          houseApi
            .updateRentHouseStatus(params)
            .then(response => {
              this.$Modal.remove();
              this.$Message.success({
                content: "发布状态已更新",
                duration: 2
              });
              this.init();
            })
            .catch(error => {
              this.$Modal.remove();
              this.$Message.success({
                content: "发布状态失败",
                duration: 2
              });
            });
        }
      });
    },
    // 批量下架
    multiUnpublish() {
      if (this.multiSelArr.length === 0) {
        this.$Message.error('请选择需要下架的房源')
        return false
      }
      this.$Modal.confirm({
        title: '批量下架',
        content: '确定要批量下架所选房源吗？',
        loading: true,
        onOk: async () => {
          let successCount = 0
          for (let i = 0; i < this.multiSelArr.length; i++) {
            const item = this.multiSelArr[i];
            try {
              await houseApi.updateRentHouseStatus({
                houseId: item.houseId,
                status: 2
              })
              successCount++
            } catch (e) {
            }
          }
          this.$Modal.remove();
          this.$Message.info(`批量下架${this.multiSelArr.length}套，成功${successCount}套`)
          this.init()
          this.multiSelArr = []
        }
      });
    },
    // 删除房源
    delHouse(index) {
      let params = {
        houseId: this.data[index].houseId
      };
      this.$Modal.confirm({
        title: "删除房源",
        content: "<p>确认删除该条房源：房源id：" + params.houseId + "</p>",
        loading: true,
        onOk: () => {
          houseApi
            .updateHouseRentIsDelStatus(params)
            .then(response => {
              this.$Modal.remove();
              this.$Message.success({
                content: "删除房源成功",
                duration: 2
              });
              this.init();
            })
            .catch(error => {
              console.log(error.response);
              this.$Modal.remove();

              this.$Message.success({
                content: "删除房源失败",
                duration: 2
              });
            });
        }
      });
    },
    setRentRecommend(index) {
      let params = {
        houseId: this.data[index].houseId
      };
      this.$Modal.confirm({
        title: "设置为推荐房源",
        content: "设置为推荐房源：<p>房源id：" + params.houseId + "</p>",
        loading: true,
        onOk: () => {
          houseApi
            .setRentRecommend(params)
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
        }
      });
    },
    //取消推荐
    setRentUnRecommend(index) {
      console.log("取消推荐")
      let params = {
        houseId: this.data[index].houseId
      };
      this.$Modal.confirm({
        title: "取消推荐房源",
        content: "取消推荐房源：<p>房源id：" + params.houseId + "</p>",
        loading: true,
        onOk: () => {
          houseApi
            .setRentUnRecommend(params)
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
      });
    },
    //取消定向
    cancelDirectionalRecommend(index) {
      console.log("取消定向推荐")
      let params = {
        houseId: this.data[index].houseId
      };
      this.$Modal.confirm({
        title: "取消推荐房源",
        content: "取消推荐房源：<p>房源id：" + params.houseId + "</p>",
        loading: true,
        onOk: () => {
          houseApi
            .cancelDirectionalRecommend(params)
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
      });
    }
  },
  computed: {
    changedAreaList: function () {
      let list = this.changedArea.split("\n");
      return list.map(x => {
        let areArr = x.split("/");
        return {
          district: areArr[0],
          area: areArr[1]
        };
      });
    }
  },
  created() {
    this.init();
    api.getAgentBaseInfo().then(response => {
      this.selfInfo = response.data.data;
    });
  }
};
</script>

