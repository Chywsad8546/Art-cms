<template>
  <Row>
    <Col span="100">
      <Card>
        <p slot="title">广告位管理</p>
        <a href="#" slot="extra" @click.prevent="addModeButton">
          <Icon type="plus-circled"></Icon>添加广告位
        </a>
        <Row class="margin-top-10 searchable-table-con1">
          <Form ref="searchData" :model="searchData" inline :label-width="120">
            <FormItem label="站点名称" prop="station">
              <Select
                v-model="searchData.station"
                clearable
                filterable
                remote
                :remote-method="zdRemoteSearch"
                :loading="zdLoading"
                @on-change="zdClick"
                placeholder="输入站点搜索"
                style="width:140px"
              >
                <Option
                  v-for="item in searchStationList"
                  :value="item.station"
                  :key="item.station"
                >{{ item.stationName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="栏目名称" prop="pageId">
              <Select
                v-model="searchData.pageId"
                clearable
                filterable
                remote
                :remote-method="channelRemoteSearch"
                :loading="zdLoading"
                placeholder="输入栏目搜索"
                style="width:140px"
              >
                <Option
                  v-for="item in searchPageList"
                  :value="item.pageId"
                  :key="item.pageId"
                >{{ item.pageName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="位置名称" prop="positionName">
              <Input v-model.trim="searchData.positionName" style="width:140px"></Input>
            </FormItem>
            <FormItem label="未设置缺省广告" prop="defaultAd">
              <Select v-model="searchData.defaultAd" clearable style="width:140px">
                <Option value>全部</Option>
                <Option value="1">是</Option>
              </Select>
            </FormItem>
            <FormItem label="是否删除" prop="isDel">
              <Select v-model="searchData.isDel" clearable style="width:140px">
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>
            </FormItem>
            <!-- <FormItem label="是否删除" prop="isDel">
                            <Select v-model="searchData.isDel" style="width:140px">
                                <Option value="">全部</Option>
                                <Option value="0">否</Option>
                                <Option value="1">是</Option>
                            </Select>
            </FormItem>-->
            <FormItem>
              <Button type="primary" @click="handleSearch('searchData')">搜索</Button>
              <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
            </FormItem>

            <!--<FormItem>-->
            <!--<Button type="primary" @click="addModeButton">添加</Button>-->
            <!--</FormItem>-->
          </Form>

          <Table border :columns="columns" :data="data"></Table>
          <Page
            :total="total"
            show-total
            show-sizer
            @on-change="pageChange"
            @on-page-size-change="sizeChange"
            style="margin-top:10px; text-align:right"
          ></Page>
        </Row>
      </Card>
    </Col>

    <Modal v-model="isTrueAddTag" :loading="isAddTagLoading" width="360" @on-ok="addNewsChannel()">
      <Form
        ref="addNewsChannelModalform"
        :model="addNewsChannelModal"
        :rules="ruleValidate"
        inline
        :label-width="120"
      >
        <FormItem label="应用名称" prop="station">
          <Select
            v-model="addNewsChannelModal.station"
            :label-in-value="true"
            @on-change="changeStation"
            clearable
            filterable
            remote
            :remote-method="zdRemoteAdd"
            :loading="zdLoading"
            style="width:140px"
            placeholder="输入站点搜索"
          >
            <Option
              v-for="(item, index) in stationList"
              :value="item.station"
              :key="item.station"
            >{{ item.stationName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="栏目名称" prop="pageId">
          <Select
            v-model="addNewsChannelModal.pageId"
            :label-in-value="true"
            @on-change="sitechange"
            filterable
            remote
            :remote-method="channelRemoteAdd"
            :loading="zdLoading"
            placeholder="输入栏目搜索"
            style="width:140px"
          >
            <Option
              v-for="item in pageList"
              :value="item.pageId"
              :key="item.pageId"
            >{{ item.pageName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="位置名称" prop="positionName">
          <Input v-model.trim="addNewsChannelModal.positionName" style="width:140px"></Input>
        </FormItem>
        <FormItem label="版本号" prop="version">
          <Input v-model.trim="addNewsChannelModal.version" style="width:140px"></Input>
        </FormItem>
        <FormItem label="父位置" prop="isFatherPosition">
          <Select v-model="addNewsChannelModal.isFatherPosition" style="width:140px">
            <Option :value="0">否</Option>
            <Option :value="1">是</Option>
          </Select>
        </FormItem>
        <div v-if="addNewsChannelModal.isFatherPosition === 0">
          <FormItem label="是否添加默认缺省页" prop="isAddDefault">
            <Select v-model="addNewsChannelModal.isAddDefault" style="width:140px">
              <Option :value="0">是</Option>
              <Option :value="1">否</Option>
            </Select>
          </FormItem>
          <FormItem label="是否是高级编辑器" prop="isAdvancedEdit">
            <Select v-model="addNewsChannelModal.isAdvancedEdit" style="width:140px">
              <Option :value="0">低级</Option>
              <Option :value="1">高级</Option>
            </Select>
          </FormItem>
          <FormItem label="预览模式" prop="previewType">
            <Select v-model="addNewsChannelModal.previewType" style="width:140px">
              <Option :value="1">WAP预览</Option>
              <Option :value="2">APP预览</Option>
            </Select>
          </FormItem>
        </div>
        <FormItem v-if="addNewsChannelModal.previewType === 1" label="预览URL" prop="previewUrl">
          <Input v-model.trim="addNewsChannelModal.previewUrl" style="width:140px"></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal v-model="modal2" width="360" @on-ok="updateChannel(updateCahnnelValue)">
      <Form
        ref="updateCahnnelValuefrom"
        :model="updateCahnnelValue"
        :rules="updateruleValidate"
        inline
        :label-width="120"
      >
        <FormItem label="广告位名称" prop="positionName">
          <Input v-model.trim="updateCahnnelValue.positionName" style="width:140px"></Input>
        </FormItem>
        <FormItem label="版本号" prop="version">
          <Input v-model.trim="updateCahnnelValue.version" style="width:140px"></Input>
        </FormItem>
        <div v-if="judgefatherFlag">
          <FormItem label="父ID" prop="fatherPositionId">
            <Input
              v-model.trim="updateCahnnelValue.fatherPositionId"
              placeholder="非必填"
              style="width:140px"
            ></Input>
          </FormItem>
          <FormItem label="预览模式" prop="previewType">
            <Select
              v-model="updateCahnnelValue.previewType"
              @on-change="changePreviewType"
              style="width:140px"
            >
              <Option value="1">WAP预览</Option>
              <Option value="2">APP预览</Option>
            </Select>
          </FormItem>
        </div>
        <FormItem v-if="upPreviewUrlIsShow && judgefatherFlag" label="预览URL" prop="previewUrl">
          <Input v-model.trim="updateCahnnelValue.previewUrl" style="width:140px"></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal v-model="modal3" width="1000">
      <Card>
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>已设置的编辑器
        </p>
        <a href="#" slot="extra" @click.prevent="addModal">
          <Icon type="plus"></Icon>添加编辑器
        </a>
        <Table border :columns="modalColums" :data="modalData"></Table>
      </Card>
      <span slot="footer"></span>
    </Modal>

    <Modal v-model="adListListModal" width="1000">
      <Card>
        <p slot="title">
          <Icon type="navicon-round"></Icon>当前位置缺省广告列表
        </p>
        <a href="#" slot="extra" @click.prevent="addquesheng">
          <Icon type="plus-circled"></Icon>重新设置缺省广告
        </a>
        <Table border :columns="adListColums" :data="adListData"></Table>
      </Card>
      <!--<Button type="primary" icon="plus" @click="addModal">添加编辑器</Button>-->
      <span slot="footer"></span>
    </Modal>

    <Modal v-model="showQuesheng" width="1000">
      <Card>
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>选择编辑器设置缺省广告
        </p>
        <Table border :columns="queshengmodalColums" :data="queshengdata"></Table>
      </Card>
    </Modal>
  </Row>
</template>
<script>
import adapi from "../../api/advertisement/ad.js";
import api from "../../api/advertisement/formtemplateApi.js";
export default {
  data() {
    return {
      zdLoading: false,
      upPreviewUrlIsShow: false,
      showQuesheng: false,
      queshengmodalColums: [
        {
          key: "id",
          title: "id"
        },
        {
          key: "name",
          title: "名称"
        },
        {
          title: "编辑器类别",
          key: "isAdvancedEdit",
          align: "center",
          render: (h, params) => {
            if (params.row.isAdvancedEdit === 0) {
              return h("div", {}, ["普通编辑器"]);
            } else if (params.row.isAdvancedEdit === 1) {
              return h(
                "div",
                {
                  style: {}
                },
                ["高级编辑器"]
              );
            }
          }
        },
        {
          title: "编辑器版本", //
          key: "status",
          align: "center",
          render: (h, params) => {
            if (params.row.isNew === 0) {
              return h(
                "div",
                {
                  style: {
                    color: "red"
                  }
                },
                [
                  h(
                    "Poptip",
                    {
                      props: {
                        trigger: "hover",
                        title:
                          "旧系统的编辑器，新系统不能使用，只能查看创意结果"
                      },
                      style: {
                        marginRight: "5px"
                      }
                    },
                    "旧版"
                  )
                ]
              );
            } else if (params.row.isNew === 1) {
              return h(
                "div",
                {
                  style: {
                    color: "green"
                  }
                },
                ["新版"]
              );
            }
          }
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            if (params.row.status === 0) {
              return h(
                "div",
                {
                  style: {
                    color: "red"
                  }
                },
                ["已禁用"]
              );
            } else if (params.row.status === 1) {
              return h(
                "div",
                {
                  style: {
                    color: "green"
                  }
                },
                ["启动"]
              );
            }
          }
        },
        {
          title: "管理",
          key: "action",
          align: "center",
          render: (h, params) => {
            var that = this;

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
                      this.adListListModal = false;
                      this.$router.push({
                        name: "ad_redirect",
                        query: { isquesheng: 1, templateid: params.row.id }
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
      queshengdata: [],
      adListListModal: false,
      selectPostionId: "",
      adListColums: [
        {
          key: "adName",
          title: "广告名称"
        },
        {
          key: "createAt",
          title: "创建时间"
        },
        {
          title: "管理",
          key: "action",
          width: 130,
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
                      this.adListListModal = false;
                      this.$router.push({
                        name: "ad_redirect",
                        query: { id: params.row.ideaCode, isquesheng: 1 }
                      });
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      adListData: [],
      searchStationList: [],
      searchPageList: [],
      modalColums: [
        {
          key: "id",
          title: "id"
        },
        {
          key: "name",
          title: "名称"
        },
        {
          title: "编辑器类别",
          key: "isAdvancedEdit",
          align: "center",
          render: (h, params) => {
            if (params.row.isAdvancedEdit === 0) {
              return h("div", {}, ["普通编辑器"]);
            } else if (params.row.isAdvancedEdit === 1) {
              return h(
                "div",
                {
                  style: {}
                },
                ["高级编辑器"]
              );
            }
          }
        },
        {
          title: "编辑器版本", //
          key: "status",
          align: "center",
          render: (h, params) => {
            if (params.row.isNew === 0) {
              return h(
                "div",
                {
                  style: {
                    color: "red"
                  }
                },
                [
                  h(
                    "Poptip",
                    {
                      props: {
                        trigger: "hover",
                        title:
                          "旧系统的编辑器，新系统不能使用，只能查看创意结果"
                      },
                      style: {
                        marginRight: "5px"
                      }
                    },
                    "旧版"
                  )
                ]
              );
            } else if (params.row.isNew === 1) {
              return h(
                "div",
                {
                  style: {
                    color: "green"
                  }
                },
                ["新版"]
              );
            }
          }
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            if (params.row.status === 0 || params.row.isNew === 0) {
              return h(
                "div",
                {
                  style: {
                    color: "red"
                  }
                },
                ["已禁用"]
              );
            } else if (params.row.status === 1) {
              return h(
                "div",
                {
                  style: {
                    color: "green"
                  }
                },
                ["启动"]
              );
            }
          }
        },
        {
          title: "管理",
          key: "action",
          align: "center",
          render: (h, params) => {
            var that = this;
            if (params.row.isNew === 0) {
              return h("div", [""]);
            }
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
                      let status = 0;
                      let statusPrompt = "";
                      if (params.row.status === 0) {
                        status = 1;
                        statusPrompt = "是否启用";
                      } else if (params.row.status === 1) {
                        status = 0;
                        statusPrompt = "是否禁用";
                      }

                      this.$Modal.confirm({
                        title: statusPrompt,
                        content: "<p>" + statusPrompt + "</p>",
                        onOk: () => {
                          api
                            .deleteTemplate({
                              id: params.row.id,
                              status: status
                            })
                            .then(response => {
                              if (response.data.data > 0) {
                                api
                                  .templateList({
                                    positionId: params.row.positionId
                                  })
                                  .then(response => {
                                    this.modalData = response.data.data;
                                  });
                              } else {
                                this.$Message.error("禁用失败！");
                              }
                            });
                        },
                        onCancel: () => {}
                      });
                    }
                  }
                },
                "更改状态"
              ),
              (function() {
                if (params.row.isNew === 1) {
                  return h(
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
                          if (params.row.isNew === 1) {
                            that.modal3 = false;
                            that.$router.push({
                              name: "formtemplate",
                              query: { advertId: params.row.id }
                            });
                          }
                        }
                      }
                    },
                    "修改"
                  );
                } else {
                  return h();
                }
              })()
            ]);
          }
        }
      ],
      modalData: [],
      modal3: false,
      stationList: [],
      pageList: [],
      columns: [
        {
          key: "positionId",
          title: "位置id",
          width: 100
        },
        {
          key: "stationName",
          title: "应用名称",
          width: 100
        },
        {
          key: "pageName",
          title: "栏目名称",
          width: 200
        },
        {
          key: "positionName",
          title: "位置名称",
          width: 200
        },
        {
          key: "isDel",
          title: "是否删除",
          width: 100,
          render: (h, params) => {
            var i = this;
            var optionArray = [
              h(
                "span",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  }
                },
                params.row.isDel == 1 ? "是" : "否"
              )
            ];
            return h("div", optionArray);
          }
        },
        {
          title: "版本号",
          key: "version",
          width: 100
        },
        {
          title: "是否父ID",
          key: "isFatherPosition",
          width: 100,
          render: (h, params) => {
            var i = this;
            var optionArray = [
              h(
                "span",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  }
                },
                params.row.isFatherPosition == 1 ? "是" : "否"
              )
            ];
            return h("div", optionArray);
          }
        },
        {
          title: "管理",
          key: "action",
          align: "left",
          render: (h, params) => {
            var i = this;
            if (params.row.isDel == 0) {
              if (params.row.isFatherPosition == 0) {
                var optionArray = [
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
                          this.modal3 = true;
                          this.currentPosition = params.row.positionId;
                          api
                            .templateList({ positionId: params.row.positionId })
                            .then(response => {
                              this.modalData = response.data.data;
                            });
                        }
                      }
                    },
                    "设置编辑器"
                  ),
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
                          this.updateCahnnelValue = {};
                          this.updateCahnnelValue.version = params.row.version;
                          this.updateCahnnelValue.positionName =
                            params.row.positionName;
                          this.updateCahnnelValue.positionId =
                            params.row.positionId;
                          this.updateCahnnelValue.previewType =
                            params.row.previewType + "";
                          if (params.row.previewType === 1) {
                            this.upPreviewUrlIsShow = true;
                            this.updateCahnnelValue.previewUrl =
                              params.row.previewUrl;
                          } else if (params.row.previewType === 2) {
                            this.upPreviewUrlIsShow = false;
                            this.updateCahnnelValue.previewUrl = "";
                          }
                          i.judgefatherFlag = true;
                          i.modal2 = true;
                        }
                      }
                    },
                    "修改"
                  )
                ];

                if (
                  params.row.isAddDefault === 0 &&
                  params.row.defaultAd === null
                ) {
                  optionArray.push(
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
                            this.selectPostionId = params.row.positionId;
                            this.addquesheng();
                          }
                        }
                      },
                      "添加缺省广告"
                    )
                  );
                } else if (
                  params.row.isAddDefault === 0 &&
                  params.row.defaultAd !== null
                ) {
                  optionArray.push(
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
                            api
                              .getDefaultAdByPositionId({
                                positionId: params.row.positionId
                              })
                              .then(response => {
                                this.adListListModal = true;
                                this.selectPostionId = params.row.positionId;
                                this.adListData = response.data.data;
                              });
                          }
                        }
                      },
                      "查看缺省广告！"
                    )
                  );
                }
              } else {
                var optionArray = [
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
                          this.updateCahnnelValue = {};
                          this.updateCahnnelValue.version = params.row.version;
                          this.updateCahnnelValue.positionName =
                            params.row.positionName;
                          this.updateCahnnelValue.positionId =
                            params.row.positionId;
                          this.updateCahnnelValue.previewType =
                            params.row.previewType + "";
                          if (params.row.previewType === 1) {
                            this.upPreviewUrlIsShow = true;
                            this.updateCahnnelValue.previewUrl =
                              params.row.previewUrl;
                          } else if (params.row.previewType === 2) {
                            this.upPreviewUrlIsShow = false;
                            this.updateCahnnelValue.previewUrl = "";
                          }
                          i.judgefatherFlag = false;
                          i.modal2 = true;
                        }
                      }
                    },
                    "修改"
                  )
                ];
              }
              optionArray.push(
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
                        this.$Modal.confirm({
                          title: "更改状态",
                          content: "是否删除",
                          onOk: () => {
                            adapi
                              .updatePosition({
                                positionId: params.row.positionId,
                                isDel: 1
                              })
                              .then(response => {
                                this.init();
                                // console.log(response);
                              });
                          },
                          onCancel: () => {}
                        });
                      }
                    }
                  },
                  "删除"
                )
              );
              return h("div", optionArray);
            }
          }
        }
      ],
      currentPosition: 0,
      searchData: {
        station: "",
        defaultAd: "",
        positionName: "",
        pageId: ""
      },
      data: [],
      total: 0,
      modal2: false,
      isTrueAddTag: false,
      modal_loading: false,
      isAddTagLoading: true,
      judgefatherFlag: true,
      addNewsChannelModal: {
        stationIndex: "",
        pageIndex: "",
        positionName: "",
        version: "",
        previewType: "",
        isFatherPosition: 0
      },
      updateCahnnelValue: {
        version: "",
        positionName: "",
        positionId: "",
        previewType: ""
      },
      ruleValidate: {
        positionName: [
          { required: true, message: "位置名称不能为空", trigger: "blur" }
        ],
        station: [
          {
            type: "integer",
            required: true,
            message: "应用不能为空",
            trigger: "change"
          }
        ],
        version: [{ required: true, message: "请填写版本号", trigger: "blur" }],
        pageId: [
          {
            type: "integer",
            required: true,
            message: "请选择栏目",
            trigger: "change"
          }
        ],
        isAddDefault: [
          {
            type: "integer",
            required: true,
            message: "请选择是否添加默认缺省页",
            trigger: "change"
          }
        ],
        isAdvancedEdit: [
          {
            type: "integer",
            required: true,
            message: "请选择是否为高级编辑器",
            trigger: "change"
          }
        ],
        previewType: [
          {
            type: "integer",
            required: true,
            message: "请选择预览模式",
            trigger: "change"
          }
        ]
      },
      updateruleValidate: {
        positionName: [
          { required: true, message: "位置名称不能为空", trigger: "blur" }
        ],
        version: [
          { required: true, message: "版本号不能为空", trigger: "blur" }
        ],
        previewType: [
          { required: true, message: "请选择预览模式", trigger: "change" }
        ],
        previewUrl: [
          { required: true, message: "预览URL不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    changePreviewType(val) {
      if (val === "1") {
        this.upPreviewUrlIsShow = true;
      } else {
        this.upPreviewUrlIsShow = false;
      }
    },
    addquesheng() {
      this.adListListModal = false;
      api.templateList({ positionId: this.selectPostionId }).then(response => {
        this.showQuesheng = true;
        this.queshengdata = response.data.data;
      });
    },
    sitechange(v) {
      if (v !== undefined) {
        this.addNewsChannelModal.pageName = v.label;
      }
    },
    zdClick() {
      if (typeof this.searchData.station !== "undefined") {
        api
          .getChannelInfo({ station: this.searchData.station, pageSize: 1000 })
          .then(response => {
            this.searchPageList = response.data.data;
            this.searchData.pageId = "";
          });
      }
    },
    addModal() {
      this.modal3 = false;
      this.$router.push({
        name: "formtemplate",
        query: { positionId: this.currentPosition }
      });
    },
    addModeButton() {
      this.isTrueAddTag = true;
    },
    init() {
      adapi.getAllStation({ isDel: 0, pageSize: 1000 }).then(response => {
        this.stationList = response.data.data;
        this.searchStationList = response.data.data;
      });

      adapi.getAllPositions(this.searchData).then(response => {
        this.total = response.data.count;
        this.data = response.data.data;
      });
    },
    updateIsPush(id, isDel) {
      api.updateOpenScreen({ id: id, isDel: isDel }).then(response => {
        if (response.data.data > 0) {
          this.$Message.success("更改成功！");
          this.init();
        }
      });
    },
    addNewsChannel() {
      this.$refs["addNewsChannelModalform"].validate(valid => {
        if (valid) {
          console.log("addNewsChannelModal", this.addNewsChannelModal);

          adapi
            .addPosition(this.addNewsChannelModal)
            .then(response => {
              if (response.data.data > 0) {
                this.$Message.success("添加成功");
                this.isTrueAddTag = false;
                // this.isAddTagLoading = true;
                this.isAddTagLoading = false;
                this.$nextTick(() => {
                  this.isAddTagLoading = true;
                });
                this.init();
              } else {
                this.$Message.error("已存在，添加失败");
              }
              // this.$Modal.remove();
            })
            .catch(error => {
              this.$Message.error(error.response.data.msg);
              this.init();
            });
        } else {
          this.isAddTagLoading = false;
          this.$nextTick(() => {
            this.isAddTagLoading = true;
          });
          this.$Message.error("表单验证失败!");
        }
      });
    },
    delStation() {
      adapi
        .updateStation(this.updateCahnnelValue)
        .then(response => {
          if (response.data.data > 0) {
            this.$Message.success("更改成功！");
            this.init();
          } else {
            this.$Message.error("更改失败！");
          }
        })
        .catch(error => {
          this.$Message.error(error.response.data.msg);
          this.init();
        });
    },
    updateChannel() {
      this.$refs["updateCahnnelValuefrom"].validate(valid => {
        if (valid) {
          adapi
            .updatePosition(this.updateCahnnelValue)
            .then(response => {
              if (response.data.data > 0) {
                this.$Message.success("更改成功！");
                this.init();
              } else {
                this.$Message.error("更改失败！");
              }
            })
            .catch(error => {
              this.$Message.error(error.response.data.msg);
              this.init();
            });
        } else {
          this.$Message.error("表单验证失败!");
        }
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
    changeStation(v) {
      if (v !== undefined) {
        this.addNewsChannelModal.stationName = v.label;
      }
      if (this.addNewsChannelModal.station !== undefined) {
        api
          .getChannelInfo({
            isDel: 0,
            station: this.addNewsChannelModal.station
          })
          .then(response => {
            this.pageList = response.data.data;
          });
      } else {
        this.pageList = [];
      }
    },
    // 站点远程搜索
    async zdRemoteSearch(query) {
      if (query !== "") {
        this.zdLoading = true;
        const { data } = await adapi.getAllStation({
          pageSize: 1000,
          stationName: query
        });
        this.zdLoading = false;
        this.searchStationList = data.data;
      } else {
        this.searchStationList = [];
      }
    },
    // 站点添加远程搜索
    async zdRemoteAdd(query) {
      if (query !== "") {
        this.zdLoading = true;
        const { data } = await adapi.getAllStation({
          pageSize: 1000,
          stationName: query
        });
        this.zdLoading = false;
        this.stationList = data.data;
      } else {
        this.stationList = [];
      }
    },
    // 渠道远程搜索
    async channelRemoteSearch(query) {
      if (query !== "") {
        this.zdLoading = true;
        const { data } = await api.getChannelInfo({
          station: this.searchData.station,
          pageSize: 1000,
          pageName: query
        });
        this.zdLoading = false;
        this.searchPageList = data.data;
      } else {
        this.searchPageList = [];
      }
    },
    // 渠道远程搜索
    async channelRemoteAdd(query) {
      if (query !== "") {
        this.zdLoading = true;
        const { data } = await api.getChannelInfo({
          station: this.addNewsChannelModal.station,
          pageSize: 1000,
          pageName: query
        });
        this.zdLoading = false;
        this.pageList = data.data;
      } else {
        this.pageList = [];
      }
    }
  },
  created() {
    this.init();
  }
};
</script>
