<template>
  <Row>
    <Col span="100">
      <Card>
        <p slot="title">计划详情</p>
        <Card>
          <Form inline :label-width="120">
            <FormItem>
              <p style="font-size: 18px">计划名称: {{plandetail.planName}}</p>
            </FormItem>
            <FormItem>
              <p style="font-size: 14px">创意数量：{{plandetail.ideaCount}}</p>
            </FormItem>
            <FormItem>
              <p style="font-size: 14px">展示数量：{{plandetail.zhanShiCount}}</p>
            </FormItem>
            <FormItem>
              <p style="font-size: 14px">排期数量：{{plandetail.paiQiCount}}</p>
            </FormItem>
          </Form>
        </Card>

        <Row class="margin-top-10 searchable-table-con1">
          <Form ref="searchData" :model="searchData" inline :label-width="120">
            <FormItem label="选择站点" prop="station">
              <Select
                v-model="searchData.station"
                clearable
                filterable
                remote
                :remote-method="zdRemoteSearch"
                :loading="zdLoading"
                placeholder="输入站点搜索"
                style="width:100px"
                @on-change="zdClick"
              >
                <Option
                  v-for="item in zhandianList"
                  :value="item.station"
                  :key="'station'+item.station"
                >{{ item.stationName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="选择栏目" prop="pageId">
              <Select
                v-model="searchData.pageId"
                clearable
                filterable
                remote
                :remote-method="channelRemoteSearch"
                :loading="zdLoading"
                placeholder="输入栏目搜索"
                style="width:100px"
                @on-change="pdClick"
              >
                <Option
                  v-for="item in pingdaoList"
                  :value="item.pageId"
                  :key="'pageid'+item.pageId"
                >{{ item.pageName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="选择位置" prop="positionId">
              <Select
                v-model="searchData.positionId"
                clearable
                filterable
                remote
                :remote-method="positionRemoteSearch"
                :loading="zdLoading"
                placeholder="输入位置搜索"
                style="width:100px"
              >
                <Option
                  v-for="item in weizhiList"
                  :value="item.positionId"
                  :key="'position'+item.positionId"
                >{{ item.positionName }}</Option>
              </Select>
            </FormItem>

            <!--<FormItem label="选择时间"  >-->
            <!--<DatePicker type="month" v-model="timeRange"   split-panels placeholder="Select date" style="width: 200px"></DatePicker>-->
            <!--</FormItem>-->
            <FormItem label="排期状态" prop="PaiqiZhuangtai">
              <Select v-model="searchData.PaiqiZhuangtai" style="width:140px">
                <Option value="0" :key="'PaiqiZhuangtai0'">未排期</Option>
                <Option value="1" :key="'PaiqiZhuangtai1'">已排期</Option>
              </Select>
            </FormItem>
            <FormItem label="展示状态" prop="ZhanshiZhuangtai">
              <Select v-model="searchData.ZhanshiZhuangtai" style="width:140px">
                <Option value>全部</Option>
                <Option value="1">展示</Option>
                <Option value="0">未展示</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSearch('searchData')">搜索</Button>
              <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
            </FormItem>

            <FormItem>
              <Button type="primary" @click="isTrueAddTag = true">添加创意</Button>
            </FormItem>
          </Form>

          <Table border :columns="columns" :data="data"></Table>
          <Page
            :total="total"
            show-total
            @on-change="pageChange"
            @on-page-size-change="sizeChange"
            style="margin-top:10px; text-align:right"
          ></Page>
        </Row>
      </Card>
    </Col>

    <Modal v-model="isTrueAddTag" width="1000" title="选择编辑器">
      <Form ref="addNewsChannelModalform" :model="addIdeaNewsModal" inline :label-width="120">
        <FormItem label="应用">
          <Select
            v-model="zdmode.station"
            clearable
            filterable
            remote
            :remote-method="zdRemoteSearch"
            :loading="zdLoading"
            placeholder="输入站点搜索"
            style="width:100px"
            @on-change="adzdClick"
          >
            <Option
              v-for="item in zhandianList"
              :value="item.station"
              :key="item.station"
            >{{ item.stationName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="栏目">
          <Select
            v-model="pdmode.pageId"
            clearable
            filterable
            remote
            :remote-method="channelRemoteAdd"
            :loading="zdLoading"
            placeholder="输入栏目搜索"
            style="width:100px"
            @on-change="adpdClick"
          >
            <Option
              v-for="item in adpingdaoList"
              :value="item.pageId"
              :key="item.pageId"
            >{{ item.pageName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="广告位" prop="bjq">
          <Select
            v-model="addIdeaNewsModal.positionId"
            clearable
            filterable
            remote
            :remote-method="positionRemoteAdd"
            :loading="zdLoading"
            placeholder="输入位置搜索"
            style="width:100px"
            @on-change="getBjqList"
          >
            <Option
              v-for="item in adweizhiList"
              :value="item.positionId"
              :key="item.positionId"
            >{{ item.positionName }}</Option>
          </Select>
        </FormItem>
      </Form>
      <Table border :columns="bjqColumns" :data="bjqList" :loading="bjqloading"></Table>
      <span slot="footer"></span>
    </Modal>

    <Modal v-model="paiqiListModal" width="1000">
      <Card>
        <p slot="title">
          <Icon type="navicon-round"></Icon>当前创意排期列表
        </p>
        <Table border :columns="paiqiListColums" :data="paiqiListData"></Table>
      </Card>
      <!--<Button type="primary" icon="plus" @click="addModal">添加编辑器</Button>-->
    </Modal>
  </Row>
</template>
<script>
import ideaApi from "../../api/advertisement/ideaList.js";
import moment from "moment";
import fapi from "../../api/advertisement/formtemplateApi.js";
export default {
  data() {
    return {
      zdLoading: false,
      bjqloading: false,
      existwarning: false,
      searchLoading: false,
      dpoptions: {
        disabledDate(date) {
          return (
            moment(date).isBefore(moment(0, "HH")) ||
            moment(date).isAfter(moment(0, "HH").add(1, "M"))
          );
        }
      },
      ispay: 1,
      selectPostionId: "",
      selectPositionName: "",
      selectAdName: "",
      selectideacode: "",
      selectdate: [
        moment(0, "HH").toDate(),
        moment(0, "HH")
          .add(1, "d")
          .toDate()
      ],
      showPostion: false,
      bjqColumns: [
        {
          key: "name",
          title: "编辑器"
        },
        {
          title: "选择",
          key: "action",
          width: 170,
          align: "center",
          render: (h, params) => {
            var i = this;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "ad_redirect",
                        query: {
                          templateid: params.row.id,
                          planId: this.$route.query.planid
                        }
                      });
                    }
                  }
                },
                "选我"
              )
            ]);
          }
        }
      ],
      daycolumns: [
        {
          key: "selectPositionName",
          title: "广告位当前排期情况",
          width: 100,
          fixed: "left"
        }
      ],
      postionData: [],
      paiqiListData: [],
      paiqiListColums: [
        {
          key: "adName",
          title: "名称"
        },
        {
          key: "startime",
          title: "开始时间"
        },
        {
          key: "endtime",
          title: "结束时间"
        }
        // {
        //     title: '管理',
        //     key: 'action',
        //     width: 170,
        //     align: 'center',
        //     render: (h, params) => {
        //         var i = this;
        //         return h('div', [
        //             h(
        //                 'Button',
        //                 {
        //                     props: {
        //                         type: 'primary',
        //                         size: 'small'
        //                     },
        //                     style: {
        //                         marginRight: '5px'
        //                     },
        //                     on: {
        //                         click: () => {
        //                             this.$Modal.confirm({
        //                                 title: '是否删除排期',
        //                                 content: '<p>是否删除排期</p>',
        //                                 onOk: () => {
        //                                     fapi.deleteSchedulingById({schedulingId:params.row.schedulingId}).then(response => {
        //                                         if (response.data.data === '成功') {
        //                                             this.$Message.success('删除成功！');
        //                                             fapi.getIdeaTimeList({ideaCode: params.row.ideaCode}).then(response => {
        //                                                 this.paiqiListData = response.data.data;
        //                                             });
        //                                         }
        //                                     }).catch(error => {
        //                                         this.$Message.error(error.response.data.msg);
        //                                         fapi.getIdeaTimeList({ideaCode: params.row.ideaCode}).then(response => {
        //                                             this.paiqiListData = response.data.data;
        //                                         });
        //                                     });
        //                                 },
        //                                 onCancel: () => {
        //                                 }
        //                             });
        //                         }
        //                     }
        //                 },
        //                 '删除'
        //             )
        //         ]);
        //     }
        // }
      ],
      paiqiListModal: false,
      bjqList: [],
      addIdeaNewsModal: { bjq: "" },
      isTrueAddTag: false,
      pdmode: { pageId: "" },
      zdmode: { station: "" },
      zhandianList: [],
      pingdaoList: [],
      adpingdaoList: [],
      weizhiList: [],
      adweizhiList: [],
      columns: [
        {
          key: "ideaCode",
          title: "ideaCode",
          width: 100
        },
        {
          key: "stationName",
          title: "应用",
          fixed: "left"
        },
        {
          key: "pageName",
          title: "频道",
          fixed: "left"
        },
        {
          key: "positionName",
          title: "位置",
          fixed: "left"
        },
        {
          key: "adName",
          title: "创意名称"
        },
        // {
        //     title: '展示状态',
        //     key: 'zhanshiZhuangtai',
        //     width: 130,
        //     align: 'center',
        //     render: (h, params) => {
        //         if (params.row.zhanshiZhuangtai === 1) {
        //             return h('div', ['展示']);
        //         } else if (params.row.zhanshiZhuangtai === 0) {
        //             return h('div', ['未展示']);
        //         }
        //     }
        // },
        {
          title: "排期状态",
          key: "pushType",
          width: 130,
          align: "center",
          render: (h, params) => {
            var optionArray = [
              h("Button", {
                props: {
                  type: "primary",
                  size: "small",
                  icon: "information",
                  shape: "circle"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.paiqiListModal = true;
                    fapi
                      .getIdeaTimeList({ ideaCode: params.row.ideaCode })
                      .then(response => {
                        this.paiqiListData = response.data.data;
                      });
                  }
                }
              })
            ];
            if (params.row.paiqiZhuangtai === 0) {
              optionArray.push("未排期");
              return h("div", { style: { color: "red" } }, optionArray);
            } else if (params.row.paiqiZhuangtai === 1) {
              optionArray.push("已排期");
              return h("div", { style: { color: "green" } }, optionArray);
            }
          }
        },
        {
          title: "广告商",
          key: "adCompany"
        },
        {
          title: "管理",
          key: "action",
          width: 170,
          align: "center",
          render: (h, params) => {
            var i = this;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "ad_redirect",
                        query: { id: params.row.ideaCode }
                      });
                    }
                  }
                },
                "修改创意"
              )
            ]);
          }
        }
      ],
      searchData: {
        pageId: "",
        page: 1,
        limit: 10,
        stationId: "",
        pageId: "",
        planId: "",
        PaiqiZhuangtai: "",
        ZhanshiZhuangtai: ""
      },
      timeRange: moment().toDate(),
      data: [],
      total: 0,
      plandetail: {
        planid: this.$route.query.planid,
        ideaCount: this.$route.query.ideaCount,
        paiQiCount: this.$route.query.paiQiCount,
        zhanShiCount: this.$route.query.zhanShiCount,
        planName: ""
      }
    };
  },
  methods: {
    init() {
      this.searchData.planId = this.plandetail.planid;
      fapi.planDetails({ id: this.plandetail.planid }).then(response => {
        this.plandetail.id = response.data.data.id;
        this.plandetail.planName = response.data.data.planName;
      });
      this.searchData.page = 1;
      this.handleSearch();
    },
    getBjqList() {
      this.bjqloading = true;
      fapi.templateList(this.addIdeaNewsModal).then(response => {
        this.bjqList = response.data.data;
        this.bjqloading = false;
      });
    },
    handleSearch() {
      ideaApi.ideaList(this.searchData).then(response => {
        this.total = response.data.count;
        this.data = response.data.data;
      });
    },
    handleCancel(name) {
      this.$refs["searchData"].resetFields();
      // this.searchData.page = 1;
      // this.handleSearch();
      this.init();
    },
    pdClick() {
      if (typeof this.searchData.pageId !== "undefined") {
        fapi
          .getPositionInfo({ pageId: this.searchData.pageId, pageSize: 1000 })
          .then(response => {
            this.weizhiList = response.data.data;
            this.searchData.positionId = "";
          });
      }
    },
    zdClick() {
      if (this.searchData.station) {
        fapi
          .getChannelInfo({ station: this.searchData.station, pageSize: 1000 })
          .then(response => {
            this.pingdaoList = response.data.data;
            this.searchData.pageId = "";
            this.searchData.positionId = "";
            this.weizhiList = [];
          });
      }
    },
    adpdClick() {
      if (!this.pdmode.pageId) return;
      fapi.getPositionInfo(this.pdmode).then(response => {
        this.adweizhiList = response.data.data;
        this.addIdeaNewsModal.positionId = "";
      });
    },
    adzdClick() {
      fapi.getChannelInfo(this.zdmode).then(response => {
        this.adpingdaoList = response.data.data;
        this.pdmode.pageId = "";
        this.addIdeaNewsModal.positionId = "";
        this.adweizhiList = [];
      });
    },
    visiblechange(v) {
      if (!v) {
        this.handleSearch();
      }
    },
    pageChange(page) {
      this.searchData.page = page;
      this.handleSearch();
    },
    sizeChange(size) {
      this.searchData.limit = size;
      this.handleSearch();
    },
    getStationInfo() {
      fapi.getStationInfo({ pageSize: 1000 }).then(response => {
        this.zhandianList = response.data.data;
      });
    },
    // 站点远程搜索
    async zdRemoteSearch(query) {
      if (query !== "") {
        this.zdLoading = true;
        const { data } = await fapi.getStationInfo({
          pageSize: 1000,
          stationName: query
        });
        this.zdLoading = false;
        this.zhandianList = data.data;
      } else {
        this.zhandianList = [];
      }
    },
    // 渠道远程搜索
    async channelRemoteSearch(query) {
      if (query !== "") {
        this.zdLoading = true;
        const { data } = await fapi.getChannelInfo({
          station: this.searchData.station,
          pageSize: 1000,
          pageName: query
        });
        this.zdLoading = false;
        this.pingdaoList = data.data;
      } else {
        this.pingdaoList = [];
      }
    },
    // 位置远程搜索
    async positionRemoteSearch(query) {
      if (query !== "" && this.searchData.pageId) {
        this.zdLoading = true;
        const { data } = await fapi.getPositionInfo({
          pageId: this.searchData.pageId,
          pageSize: 1000,
          positionName: query
        });
        this.zdLoading = false;
        this.weizhiList = data.data;
      } else {
        this.weizhiList = [];
      }
    },
    // 渠道创意远程搜索
    async channelRemoteAdd(query) {
      if (query !== "") {
        this.zdLoading = true;
        const { data } = await fapi.getChannelInfo({
          station: this.zdmode.station,
          pageSize: 1000,
          pageName: query
        });
        this.zdLoading = false;
        this.adpingdaoList = data.data;
      } else {
        this.adpingdaoList = [];
      }
    },
    // 位置创意远程搜索
    async positionRemoteAdd(query) {
      if (query !== "" && this.pdmode.pageId) {
        this.zdLoading = true;
        const { data } = await fapi.getPositionInfo({
          pageId: this.pdmode.pageId,
          pageSize: 1000,
          positionName: query
        });
        this.zdLoading = false;
        this.adweizhiList = data.data;
      } else {
        this.adweizhiList = [];
      }
    }
  },
  created() {
    this.init();
    this.getStationInfo();
  }
};
</script>
<style>
.backcontiner {
  width: 100%;
  padding-top: 20px;
  background: #ffffff;

  margin-bottom: 10px;
}
.ivu-table .cell-hold {
  background-color: #187;
  color: #fff;
}
</style>

