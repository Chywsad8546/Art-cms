<template>
  <Card>
    <p slot="title">待发布房源</p>
    <houseNumEsf ref="houseNum"></houseNumEsf>
    <Menu mode="horizontal" theme="light" @on-select="skipPage" active-name="agentEsfHouseManageUnder">
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
        <Button type="primary" @click="pageChange(1)">搜索</Button>
        <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
      </FormItem>
    </Form>
    <Table border :columns="columns" :data="data"></Table>
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
  name: "agentEsfHouseManageUnder",
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
          key: "houseId",
          title: "认领ID",
          align: "center",
          width: 100
        },
        {
          key: "baseInfo",
          title: "基本信息",
          className: "baseInforImg",
          minWidth: 600,
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
          width: 135,
          render: (h, params) => {
            let createTime = params.row.createTime;
            return h("span", createTime ? moment(createTime).format("YYYY-MM-DD HH:mm") : '')
          }
        },
        {
          key: "createTime",
          title: "下架原因",
          align: "center",
          width: 160,
          render: (h, params) => {
            let status = params.row.status;
            let msg = ''
            if (status == 3) {
              msg = '客服强制下架'
            } else if (status == 4) {
              msg = '公司房源下架'
            }
            return h("span", msg)
          }
        },
        {
          title: "管理",
          key: "action",
          align: "center",
          width: 90,
          render: (h, params) => {
            //推荐
            let row = params.row;
            return h("div", [
              h(
                "a", {
                  props: {
                    type: "text"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.delHouse(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      searchData: {
        houseStatus: "3",
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
      }
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

