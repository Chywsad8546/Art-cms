<template>
  <Card>
    <p slot="title">待认领房源</p>
    <houseNumEsf></houseNumEsf>
    <Menu mode="horizontal" theme="light" @on-select="skipPage" active-name="agentEsfHouseManageWait">
      <MenuItem name="agentEsfHouseManage"> 已发布
      </MenuItem>
      <MenuItem name="agentEsfHouseManageOff"> 待发布
      </MenuItem>
      <MenuItem name="agentEsfHouseManageWait"> 待认领
      </MenuItem>
      <MenuItem name="agentEsfHouseManageUnder"> 已下架
      </MenuItem>
    </Menu>
    <Form class="margin-top-20" :rules="ruleValidate" ref="searchData" :model="searchData" inline :label-width="70">
      <FormItem label="房源ID" prop="corpHouseId">
        <Input v-model="searchData.corpHouseId" style="width:140px" />
      </FormItem>
      <FormItem :label="agentInfo.companyBrand+'官网ID'" :label-width="100" prop="sourceHouseId">
        <Input v-model="searchData.sourceHouseId" style="width:140px" />
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
          <Col span="2" style="text-align: center">万元</Col>
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
      <FormItem :label-width="20">
        <Alert v-if="agentInfo.companyBrand==='麦田房产'" type="success">找不到想认领的房源?点此
          <a @click="maitian = true">同步官网房源</a>
        </Alert>
        <Alert v-if="agentInfo.companyBrand==='我爱我家'" type="success">找不到想认领的房源?点此
          <a @click="wiwj = true">同步官网房源</a>
        </Alert>
      </FormItem>
    </Form>
    <Table border :columns="columns" :data="data"></Table>
    <Page :total="total" :current="page" @on-change="pageChange" class="margin-top-10" align="right"></Page>
    <bottomAlert></bottomAlert>

    <Modal ref="maitian" v-model="maitian" title="同步官网房源" @on-ok="maitianOk">
      <Input required type="url" name="url" v-model="maitianUrl" placeholder="请输入房源网址" title="请输入正确url" />
      <Alert type="warning" style="margin-top:20px">
        示例:
        <b>http://bj.maitian.cn/esfxq/I
          <em style="color:red">FY00627100</em>
        </b> 或
        <b>FY00627100</b>
      </Alert>
    </Modal>
    <Modal ref="wiwj" v-model="wiwj" title="同步官网房源" @on-ok="wiwjOk">
      <Input required type="url" name="url" v-model="wiwjUrl" placeholder="请输入房源网址或id编号" title="请输入正确url" />
      <Alert type="warning" style="margin-top:20px">
        示例:
        <b>https://m.5i5j.com/bj/ershoufang/
          <em style="color:red">37251303</em>.html</b> 或
        <b>37251303</b>
      </Alert>
    </Modal>
  </Card>
</template>

<script>
import api from "@/api/house/index.js";
import Agentapi from "@/api/agent/index.js";
import bottomAlert from "@/views/agentSystem/houseManage/components/bottomAlert";
import houseNumEsf from "@/views/agentSystem/houseManage/components/houseNumEsf";
import agentHomeVue from "../agentHome.vue";
import moment from "moment"
import {
  startsWith
} from "lodash";
import {
  locale
} from "moment";
var request = require("request");
var crypto = require("crypto");
const key = "Phrw3a0bfu";
export default {
  name: "agentEsfHouseManageWait",
  components: {
    bottomAlert,
    houseNumEsf
  },
  data() {
    const validateNump = (rule, value, callback) => {
      if (value) {
        if (Number.isInteger(value) && value >= 0) {
          callback();
        } else {
          callback(new Error("请填写正确数字或为空"));
        }
      } else {
        callback();
      }
    };
    return {
      maitian: false,
      wiwj: false,
      maitianUrl: "",
      wiwjUrl: "",
      columns: [{
        key: "corpHouseId",
        title: "房源ID",
        align: "center",
        width: 100
      },
      {
        key: "baseInfo",
        title: "基本信息",
        className: "baseInforImg",
        minWidth: 400,
        render: (h, params) => {
          let row = params.row;
          let isLimit;
          if (row.claimLimitStatus === 1) {
            isLimit = h(
              "Tag", {
                props: {
                  color: "red"
                }
              },
              "认领上限"
            );
          } else {
            isLimit = "";
          }
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
              isLimit,
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
        width: 160,
        render: (h, params) => {
          let createTime = params.row.updateTime;
          return h("span", createTime ? moment(createTime).format("YYYY-MM-DD HH:mm") : '')
        }
      },
      {
        key: "noClaimCount",
        title: "认领次数",
        align: "center",
        width: 90
      },
      {
        title: "管理",
        key: "action",
        align: "center",
        width: 160,
        render: (h, params) => {
          //推荐
          let row = params.row;
          let woai = "";
          if (this.agentInfo.companyBrand === "我爱我家") {
            woai = h(
              "a", {
                props: {
                  type: "text"
                },
                on: {
                  click: () => {
                    this.woaiUpdate(params.index);
                  }
                }
              },
              "纠错"
            );
          }
          if (this.agentInfo.companyBrand === "麦田房产") {
            woai = h(
              "a", {
                props: {
                  type: "text"
                },
                on: {
                  click: () => {
                    this.maitianUpdate(params.index);
                  }
                }
              },
              "纠错"
            );
          }
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
                    // 认领
                    this.$Modal.confirm({
                      title: '认领',
                      content: '确认要认领编号为' + row.corpHouseId + '的房源吗',
                      onOk: () => {
                        this.agentClaimHouseSell(params.index);
                      }
                    });
                  }
                }
              },
              "认领"
            ),
            woai
            // h(
            //   "a", {
            //     props: {
            //       type: "text"
            //     },
            //     on: {
            //       click: () => {
            //         this.showDetail(params.index);
            //       }
            //     }
            //   },
            //   "预览"
            // )
          ]);
        }
      }
      ],
      searchData: {
        houseStatus: "1",
        corpHouseId: "", //
        sourceHouseId: "",
        projName: "", //大楼名称
        startPrice: "",
        endPrice: "",
        sort: "2",
        room: ""
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
        }]
      },
      agentInfo: {}
    };
  },
  components: {
    bottomAlert,
    houseNumEsf
  },
  methods: {
    async maitianOk() {
      if (this.maitianId) {
        try {
          let res = await api.getMaitianInfo({
            id: this.maitianId
          });
          this.$Modal.remove();
          this.maitianUrl = "";
          this.$Message.success({
            content: "添加房源至认领库，请搜索房源进行认领",
            duration: 5,
            closable: true
          });
          this.init();
        } catch (error) {
          console.log(error);
          this.$Modal.remove();
          this.maitianUrl = "";
          this.$Message.error({
            content: "未对应成功相应楼盘 我们在努力改进中",
            duration: 5,
            closable: true
          });
          this.init();
        }
      } else {
        this.maitianUrl = "";
        this.$Message.error("地址或ID格式不对");
      }
    },
    async wiwjOk() {
      if (this.wiwjId) {
        try {
          let res = await api.getWiWjInfo({
            id: this.wiwjId
          });
          this.$Modal.remove();
          this.wiwjUrl = "";
          this.$Message.success({
            content: "添加房源至认领库，请搜索房源进行认领",
            duration: 5,
            closable: true
          });
          this.init();
        } catch (error) {
          console.log(error);
          this.$Modal.remove();
          this.wiwjUrl = "";
          this.$Message.error({
            content: "未对应成功相应楼盘 我们在努力改进中",
            duration: 5,
            closable: true
          });
          this.init();
        }
      } else {
        this.wiwjUrl = "";
        this.$Message.error("地址或ID格式不对");
      }
    },
    woaiUpdate(index) {
      let sourceHouseId = this.data[index].sourceHouseId;
      this.$Modal.confirm({
        title: "纠错房源",
        content: "<p>确认纠错该条房源：房源id：" + sourceHouseId + "</p>",
        loading: true,
        onOk: async () => {
          try {
            let res = await api.getWoAiInfo({
              id: sourceHouseId
            });
            console.log(res);
            this.$Modal.remove();
            this.$Message.success("纠错房源成功");
            this.init();
          } catch (error) {
            console.log(error);
            this.$Modal.remove();
            this.$Message.error("操作失败");
            this.init();
          }
        }
      });
    },
    maitianUpdate(index) {
      let sourceHouseId = this.data[index].sourceHouseId;
      this.$Modal.confirm({
        title: "纠错房源",
        content: "<p>确认纠错该条房源：房源id：" + sourceHouseId + "</p>",
        loading: true,
        onOk: async () => {
          try {
            let res = await api.getMaitianInfo({
              id: sourceHouseId
            });
            console.log(res);
            this.$Modal.remove();
            this.$Message.success("纠错房源成功");
            this.init();
          } catch (error) {
            console.log(error);
            this.$Modal.remove();
            this.$Message.error("操作失败");
            this.init();
          }
        }
      });
    },
    skipPage(name) {
      this.$router.push({
        name: name
      });
    },
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
    // 认领操作
    async agentClaimHouseSell(index) {
      let houseID = this.data[index].corpHouseId;
      try {
        let {
          data
        } = await api.agentClaimHouseSell({
          houseID
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
              "认领成功"
            );
          },
          duration: 3
        });
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
    // 查看详情操作
    showDetail(index) {
      console.log(this.data[index]);
      let houseId = this.data[index].corpHouseId;
      this.$router.push({
        name: "agentesfHouseDetail",
        query: {
          houseId,
          houseStatus: this.searchData.houseStatus
        }
      });
    },
    getAgentBaseInfo() {
      Agentapi.getAgentBaseInfo()
        .then(response => {
          console.log("个人信息");
          console.log(response.data.data);
          this.agentInfo = response.data.data;
          this.columns.unshift({
            key: "sourceHouseId",
            title: this.agentInfo.companyBrand + "官网ID",
            width: 130
          })
          //          if (this.agentInfo.companyBrand === '我爱我家') {
          //            this.columns.unshift({
          //              key: "sourceHouseId",
          //              title: "我爱我家官网ID",
          //              width: 130
          //            })
          //          }
        })
        .catch(err => {
          console.log(err.response.data.msg);
        });
    }
  },
  created() {
    this.init();
    this.getAgentBaseInfo();
  },
  computed: {
    maitianId() {
      if (this.maitianUrl) {
        if (startsWith(this.maitianUrl, "FY")) {
          return this.maitianUrl;
        } else {
          if (this.maitianUrl.match(/FY[0-9]*/)) {
            return this.maitianUrl.match(/FY[0-9]*/)[0];
          } else {
            return "";
          }
        }
      } else {
        return "";
      }
    },
    wiwjId() {
      if (this.wiwjUrl) {
        if (!isNaN(this.wiwjUrl)) {
          return this.wiwjUrl;
        } else {
          if (this.wiwjUrl.split('/').length) {
            console.log(this.wiwjUrl.split('/'))
            let msg = this.wiwjUrl.split('/')[this.wiwjUrl.split('/').length - 1]
            console.log(msg.match(/[0-9]*/)[0])
            return msg.match(/[0-9]*/)[0];
          } else {
            return "";
          }
        }
      } else {
        return "";
      }
    },
  }
};
</script>

