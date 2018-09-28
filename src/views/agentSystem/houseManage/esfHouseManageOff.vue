<template>
  <Card>
    <p slot="title">待发布房源</p>
    <houseNumEsf ref="houseNum"></houseNumEsf>
    <Menu mode="horizontal" theme="light" @on-select="skipPage" active-name="agentEsfHouseManageOff">
      <MenuItem name="agentEsfHouseManage"> 已发布
      </MenuItem>
      <MenuItem name="agentEsfHouseManageOff"> 待发布
      </MenuItem>
      <MenuItem name="agentEsfHouseManageWait"> 待认领
      </MenuItem>
      <MenuItem name="agentEsfHouseManageUnder"> 已下架
      </MenuItem>
    </Menu>
    <Form class="margin-top-20" ref="searchData" :model="searchData" inline :label-width="70" :rules="ruleValidate">
      <FormItem label="认领ID" prop="houseId">
        <Input v-model="searchData.houseId" style="width:140px" />
      </FormItem>
      <FormItem label="楼盘名称" prop="projName">
        <Input v-model="searchData.projName" style="width:140px" />
      </FormItem>
      <FormItem label="价格">
        <Row>
          <Col span="10">
          <FormItem prop="startPrice">
            <Input number v-model="searchData.startPrice" style="width:140px" />
          </FormItem>
          </Col>
          <Col span="2" style="text-align: center">至</Col>
          <Col span="10">
          <FormItem prop="endPrice">
            <Input number v-model="searchData.endPrice" style="width:140px" />
          </FormItem>
          </Col>
          <Col span="2">万元</Col>
        </Row>
      </FormItem>
      <FormItem label="居室" prop="room">
        <Input v-model="searchData.room" number style="width:140px" />
      </FormItem>
      <FormItem label="排序" prop="sort">
        <Select v-model="searchData.sort" style="width: 141px">
          <Option value="1">录入时间从早到晚</Option>
          <Option value="2">录入时间从晚到早</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="pageChange(1)" style="margin-left: 8px">搜索</Button>
        <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="multiPublish">批量发布</Button>
      </FormItem>
    </Form>
    <Table @on-selection-change="(sel)=>{multiSelArr=sel}" border :columns="columns" :data="data"></Table>
    <Page :total="total" :current="page" @on-change="pageChange" class="margin-top-10" align="right"></Page>
    <bottomAlert></bottomAlert>
  </Card>
</template>

<script>
import api from "@/api/house/index.js";
import bottomAlert from "@/views/agentSystem/houseManage/components/bottomAlert";
import houseNumEsf from "@/views/agentSystem/houseManage/components/houseNumEsf";
import moment from "moment"
export default {
  name: "agentEsfHouseManageOff",
  components: {
    bottomAlert,
    houseNumEsf
  },
  data() {
    const validateNump = (rule, value, callback) => {
      if (value) {
        if (Number.isInteger(value) && value >= 0) {
          callback()
        } else {
          callback(new Error("请填写正确数字或为空"))
        }
      } else {
        callback();
      }

    };
    return {
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          key: "houseId",
          title: "认领ID",
          align: "center",
          minWidth: 100
        },
        {
          key: "baseInfo",
          title: "基本信息",
          className: "baseInforImg",
          minWidth: 450,
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
                      }
                    }
                  },
                  row.projName //楼盘名称
                ),
                // isRecommend,
                h("p", [
                  floor,
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
          key: "createTime",
          title: "录入时间",
          align: "center",
          minWidth: 135,
          render: (h, params) => {
            let createTime = params.row.createTime;
            return h("span", createTime ? moment(createTime).format("YYYY-MM-DD HH:mm") : '')
          }
        },
        {
          title: "管理",
          key: "action",
          align: "center",
          minWidth: 135,
          render: (h, params) => {
            //推荐
            let row = params.row;
            return h("ButtonGroup", [
              h(
                "Button", {
                  props: {
                    type: "ghost",
                    size: 'small'
                  },
                  style: {
                    // border: "1px solid #57a3f3",
                    // color: "#57a3f3"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '发布',
                        content: '确认要发布编号为' + row.houseId + '的房源吗',
                        onOk: () => {
                          this.agentClaimHouseSell(params.index);
                        }
                      });
                    }
                  }
                },
                "发布"
              ),
              h(
                "Button", {
                  props: {
                    type: "ghost",
                    size: 'small'
                  },
                  style: {
                    // border: "1px solid #57a3f3",
                    // color: "#57a3f3"
                  },
                  on: {
                    click: () => {
                      this.delHouse(params.index);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button", {
                  props: {
                    type: "ghost",
                    size: 'small'
                  },
                  style: {
                    // border: "1px solid #57a3f3",
                    // color: "#57a3f3"
                  },
                  on: {
                    click: () => {
                      this.showDetail(params.index);
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      searchData: {
        houseStatus: "2",
        houseId: "", //
        projName: "", //大楼名称
        startPrice: "",
        endPrice: "",
        sort: "2",
        room: ''
      },
      data: [],
      total: 0,
      page: 1,
      ruleValidate: {
        room: [{
          validator: validateNump,
          trigger: "blur"
        }],
        startPrice: [{
          validator: validateNump,
          trigger: "blur"
        }],
        endPrice: [{
          validator: validateNump,
          trigger: "blur"
        }],
      },
      multiSelArr: []
    };
  },
  components: {
    bottomAlert,
    houseNumEsf
  },
  methods: {
    async init() {
      let {
        data
      } = await api.getListAgentClaimHouseSell(this.searchData);
      console.log(data);
      this.data = data.data.data;
      this.total = data.data.total;
    },
    // 翻页
    async pageChange(cuPage) {
      let obj = Object.assign(this.searchData, {
        pageNum: cuPage
      });
      let {
        data
      } = await api.getListAgentClaimHouseSell(obj);
      this.data = data.data.data;
      this.page = cuPage;
      this.total = data.data.total;
    },
    // 清空搜索
    handleCancel(name) {
      this.$refs[name].resetFields();
      this.searchData.pageNum = 1;
      this.init();
    },
    // 发布操作
    async agentClaimHouseSell(index) {
      let houseId = this.data[index].houseId;
      let corpHouseId = this.data[index].corpHouseId;
      try {
        let {
          data
        } = await api.agentPublicClaimHouseSell({
          houseId,
          corpHouseId
        });
        this.$Message.success({
          render: h => {
            return h(
              "p", {
                style: {
                  height: "30px",
                  lineHeight: "30px",
                  fontSize: "16px"
                }
              },
              "发布成功"
            );
          },
          duration: 3
        });
        this.$refs.houseNum.init();
      } catch (e) {
        this.$Message.error({
          render: h => {
            return h(
              "p", {
                style: {
                  height: "30px",
                  lineHeight: "30px",
                  fontSize: "16px"
                }
              },
              e.response.data.msg
            );
          },
          duration: 3
        });
      }
      this.pageChange(this.page);
    },
    // 批量发布
    multiPublish() {
      if (this.multiSelArr.length === 0) {
        this.$Message.error('请选择需要发布的房源')
        return false
      }
      this.$Modal.confirm({
        title: '批量发布',
        content: '确定要批量发布所选房源吗？',
        loading: true,
        onOk: async () => {
          let successCount = 0
          for (let i = 0; i < this.multiSelArr.length; i++) {
            const item = this.multiSelArr[i];
            try {
              await api.agentPublicClaimHouseSell({
                houseId: item.houseId,
                corpHouseId: item.corpHouseId
              })
              successCount++
            } catch (e) {
              break;
            }
          }
          this.$Modal.remove();
          this.$Message.info(`批量发布${this.multiSelArr.length}套，成功${successCount}套`)
          this.pageChange(this.page);
          this.$refs.houseNum.init();
          this.multiSelArr = []
        }
      });
    },
    // 查看详情操作
    showDetail(index) {
      console.log(this.data[index]);
      let houseId = this.data[index].houseId;
      this.$router.push({
        name: "agentesfHouseDetail",
        query: {
          houseId,
          houseStatus: "0"
        }
      });
    },
    skipPage(name) {
      this.$router.push({
        name: name
      });
    },
    delHouse(index) {
      let params = {
        houseId: this.data[index].houseId,
        houseStatus: "0"
      };
      this.$Modal.confirm({
        title: "删除房源",
        content: "<p>确认删除该条房源：房源ID：" + params.houseId + "</p>",
        loading: true,
        onOk: () => {
          api
            .updateHouseSellIsDelStatus(params)
            .then(response => {
              this.$Modal.remove();
              this.$Message.success("删除房源成功");
              this.$refs.houseNum.init();
              this.init();
            })
            .catch(error => {
              console.log(error.response);
              this.$Message.error("删除房源失败");
            });
        }
      });
    },

  },
  created() {
    this.init();
  }
};
</script>

