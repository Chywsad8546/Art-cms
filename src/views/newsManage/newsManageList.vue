<template>
  <Row>
    <Col span="100">
    <Card>
      <p slot="title">资讯列表管理</p>
      <Row class="margin-top-10 searchable-table-con1">
        <Form ref="searchData" :model="searchData" inline :label-width="120">
          <FormItem label="编号" prop="id">
            <Input v-model.trim="searchData.id" style="width:140px" />
          </FormItem>
          <FormItem label="标题" prop="title">
            <Input v-model.trim="searchData.title" style="width:140px" />
          </FormItem>
          <FormItem label="编辑" prop="creator">
            <Select v-model="searchData.creator" style="width:140px">
              <Option value="">全部</Option>
              <Option v-for="item in allAuthor" v-bind:value="item.id">{{item.userName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="开始时间" prop="starTime">
            <DatePicker type="date" v-model="searchData.starTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="结束时间" prop="endTime">
            <DatePicker type="date" v-model="searchData.endTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="类别筛选" prop="type">
            <Select v-model="searchData.type" style="width:140px">
              <Option value="">全部</Option>
              <Option value="0">图文</Option>
              <Option value="1">图集</Option>
              <Option value="2">横版视频</Option>
              <Option value="3">竖版视频</Option>
            </Select>
          </FormItem>
          <FormItem label="级别筛选" prop="type">
            <Select v-model="searchData.recommendLevel" style="width:140px">
              <Option value="">全部</Option>
              <Option value="1">一级</Option>
              <Option value="2">二级</Option>
              <Option value="3">三级</Option>
            </Select>
          </FormItem>
          <FormItem label="栏目筛选" prop="topic">
            <CheckboxGroup v-model="searchData.topic">
              <Checkbox v-bind:label="item.id" v-for="item in channelDatas"><span>{{item.title}}</span>
              </Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="标签筛选" prop="tags">
            <Select v-model="searchData.tags" style="width:140px">
              <Option value="">全部</Option>
              <Option v-for="item in tagDatas" v-bind:value="item.id">{{item.title}}</Option>
            </Select>
          </FormItem>
          <FormItem label="发布状态" prop="businessCardAuth">
            <Select v-model="searchData.isPublish" style="width:140px">
              <Option value="">全部</Option>
              <Option value="0">待发布</Option>
              <Option value="1">已发布</Option>
              <Option value="2">已撤稿</Option>
              <Option value="3">草稿</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSearch('searchData')">搜索</Button>
            <Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
          </FormItem>
        </Form>

        <Table border :columns="columns" :data="data"></Table>
        <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" style="margin-top:10px; text-align:right"></Page>
      </Row>
    </Card>

    </Col>
    <Modal v-model="sortModal" width="360" @on-ok="updateSort(updateSortValue)">
      <Form ref="updateSortForm" :model="updateSortValue" inline :label-width="120">
        <FormItem label="排序" prop="sort">
          <InputNumber :precision="0" v-model="updateSortValue.sort" :min="0"></InputNumber>
        </FormItem>
      </Form>
    </Modal>

    <Modal v-model="qrcodeModal" width="230">
      <p slot="header" style="color:#f60;text-align:center">
        <span></span>
      </p>
      <Tabs type="card">
        <TabPane label="WEB预览">
          <div style="text-align:center">
            <p class="qrcode" id="qrcode"></p>
          </div>
        </TabPane>
      </Tabs>
      <div slot="footer">
      </div>
    </Modal>

    <!-- 推送Modal -->
    <Modal v-model="pushModal" :loading="pushLoading" @on-ok="pushOk" @on-cancel="pushCancel" width="600">
      <p slot="header">
        <span>定时推送</span>
      </p>
      <Form ref="pushForm" :model="pushForm" :rules="pushFormRules" :label-width="100">
        <FormItem label="推送时间：" prop="pushTime">
          <DatePicker type="datetime" :value="pushForm.pushTime" @on-change="pushTimeChange" formate="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" style="width: 150px"></DatePicker>
        </FormItem>
        <FormItem label="推送类型：" prop="pushType" v-if="pushModal">
          <Select :value="pushChannelIndex" style="width:450px" @on-change="pushTypeChange">
            <Option v-for="(item,index) in pushChannel" :key="index" :value="index">{{item.pushName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="设备码：" prop="equipmentNumber" v-if="pushForm.pushType===4">
          <Input v-model="pushForm.equipmentNumber" style="width:450px"></Input>
          <Alert style="width:450px;margin-top:5px;">多个设备码请使用英文逗号分隔（如：123,456）</Alert>
        </FormItem>
      </Form>
    </Modal>
  </Row>
</template>
<script>
import api from "../../api/system/index.js";
import apiNewsManageme from "../../api/newsManageme/newsManageme.js";
import apiPush from "@/api/advertisement/pushApi";
import apiDictionary from "../../api/dictionary/channelDictionary.js";
import apiTagDictionary from "../../api/dictionary/tagDictionary.js";
import QRCode from "qrcodejs2";
import dutil from "../../libs/util.js";
import moment from "moment";

export default {
  data() {
    const pushTimeValidator = (rule, val, callback) => {
      if (new Date(val).getTime() - Date.now() <= 1000 * 60 * 5) {
        callback(new Error('推送时间至少为当前时间后5分钟'))
      } else {
        callback()
      }
    }
    const equipmentNumberValidator = (rule, val, callback) => {
      if (this.pushForm.pushType === 4 && !val) {
        callback(new Error('设备码不能为空！'))
      } else {
        callback()
      }
    }
    return {
      qrcodeModal: false,
      pushModal: false,
      pushLoading: true,
      pushChannel: [],
      pushChannelIndex: "",
      pushForm: {
        taskType: 1, // 1：新闻 2：通知
        content: {
          title: "",
          newId: "",
          type: "",
          pushTime: ""
        },
        pushSql: undefined,
        equipmentNumber: undefined,
        pushType: "",
        pushTime: ""
      },
      pushFormRules: {
        pushTime: [
          { required: true, message: '请选择推送时间！', trigger: 'change' },
          { validator: pushTimeValidator, trigger: 'change' }
        ],
        pushType: [
          { required: true, message: '请选择推送类型！' }
        ],
        equipmentNumber: [
          { validator: equipmentNumberValidator, trigger: 'blur' }
        ]
      },
      defaultList: [],
      columns: [
        {
          key: "id",
          title: "id",
          fixed: "left"
        },
        {
          key: "title",
          title: "标题",
          width: 300,
          fixed: "left"
        },
        {
          title: "级别",
          fixed: "left",
          render: (h, params) => {
            var type = params.row.recommendLevel;
            if (type == 1) {
              return h("div", ["一级"]);
            } else if (type == 2) {
              return h("div", ["二级"]);
            } else if (type == 3) {
              return h("div", ["三级"]);
            }
          }
        },
        {
          title: "类型",
          fixed: "left",
          render: (h, params) => {
            var type = params.row.type;
            if (type == 0) {
              return h("div", ["图文"]);
            } else if (type == 1) {
              return h("div", ["图集"]);
            } else if (type == 2) {
              return h("div", ["横版视频"]);
            } else if (type == 3) {
              return h("div", ["竖版视频"]);
            }
          },
          width: 90
        },
        {
          title: "栏目",
          fixed: "left",
          render: (h, params) => {
            var topic = params.row.topicName;
            var topicNameResult = " ";
            if (topic != null) {
              for (var i = 0; i < topic.length; i++) {
                if (i != 0) {
                  topicNameResult += ",";
                }
                topicNameResult += topic[i];
              }
            }
            return h("div", topicNameResult);
          }
        },
        {
          title: "状态",
          fixed: "left",
          render: (h, params) => {
            var status = params.row.isPublish;
            if (status == 0) {
              return h("div", ["待发布"]);
            } else if (status == 1) {
              var statusString = "已发布";
              if (params.row.isTop == 1) {
                statusString += ",已置顶";
              }
              return h("div", statusString);
            } else if (status == 2) {
              return h("div", ["已撤稿"]);
            } else if (status == 3) {
              return h("div", ["草稿"]);
            }
          },
          width: 90
        },
        {
          key: "createAt",
          title: "录入时间"
        },
        {
          key: "publishAt",
          title: "发布时间"
        },
        {
          title: "编辑",
          render: (h, params) => {
            return h("div", params.row.sysUser.userName);
          }
        },
        {
          key: "readCount",
          title: "阅读量"
        },
        {
          key: "sort",
          title: "排序"
        },
        {
          title: "管理",
          key: "action",
          align: "center",
          fixed: "right",
          render: (h, params) => {
            var i = this;
            var guanliOpration = [];
            if (this.$hasAuth("button_appPreview")) {
              guanliOpration.push(
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
                        this.previewFun(params.row.id, params.row.type);
                      }
                    }
                  },
                  "预览"
                )
              );
            }
            if (this.$hasAuth("button_newsmodify")) {
              if (params.row.type == 0) {
                guanliOpration.push(
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
                            name: "releaseArticle",
                            query: { newsId: params.row.id }
                          });
                        }
                      }
                    },
                    "修改"
                  )
                );
              } else if (params.row.type == 1) {
                guanliOpration.push(
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
                            name: "imageArticle",
                            query: { newsId: params.row.id }
                          });
                        }
                      }
                    },
                    "修改"
                  )
                );
              } else {
                guanliOpration.push(
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
                            name: "videoArticle",
                            query: { newsId: params.row.id }
                          });
                        }
                      }
                    },
                    "修改"
                  )
                );
              }
            }
            if (params.row.isPublish == 1) {
              if (this.$hasAuth("button_setIsTop")) {
                if (params.row.isTop == 0) {
                  guanliOpration.push(
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
                            apiNewsManageme
                              .setArticleIsTop({ id: params.row.id })
                              .then(response => {
                                if (response.data.code == "success") {
                                  this.$Message.success("添加置顶成功");
                                  this.init();
                                }
                              })
                              .catch(error => {
                                this.$Message.error(error.response.data.msg);
                                //this.$Message.error(error.msg);
                                this.init();
                              });
                          }
                        }
                      },
                      "置顶"
                    )
                  );
                } else if (params.row.isTop == 1) {
                  guanliOpration.push(
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
                            apiNewsManageme
                              .removeArticleIsTop({ id: params.row.id })
                              .then(response => {
                                if (response.data.code == "success") {
                                  this.$Message.success("取消置顶成功");
                                  this.init();
                                }
                              })
                              .catch(error => {
                                this.$Message.error(error.response.data.msg);
                                console.log(error.response.data.msg);
                                this.init();
                              });
                          }
                        }
                      },
                      "取消置顶"
                    )
                  );
                }
              }
              if (this.$hasAuth("button_removeArticle")) {
                guanliOpration.push(
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
                          apiNewsManageme
                            .removePublishArticle({
                              id: params.row.id,
                              isPublish: 2
                            })
                            .then(response => {
                              if (response.data.code == "success") {
                                this.$Message.success("撤稿成功！");
                                this.init();
                              }
                            });
                        }
                      }
                    },
                    "撤稿"
                  )
                );
              }

              if (this.$hasAuth("button_ArticleSetSort")) {
                guanliOpration.push(
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
                          this.updateSortValue.id = params.row.id;
                          this.sortModal = true;
                        }
                      }
                    },
                    "修改排序"
                  )
                );
              }
            }
            if (params.row.isPublish == 2) {
              if (this.$hasAuth("button_pushArticle")) {
                guanliOpration.push(
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
                          apiNewsManageme
                            .removePublishArticle({
                              id: params.row.id,
                              isPublish: 1
                            })
                            .then(response => {
                              if (response.data.code == "success") {
                                this.$Message.success("发布成功！");
                                this.init();
                              }
                            });
                        }
                      }
                    },
                    "发布"
                  )
                );
              }
            }
            if (params.row.isPublish === 1) {
              guanliOpration.push(
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
                      click: () => this.showPushModal(params.row)
                    }
                  },
                  "定时推送"
                )
              );
            }
            return h("div", guanliOpration);
          }
        }
      ],
      searchData: {},
      data: [],
      initTable: [],
      total: 0,
      modal2: false,
      isTrueAddTag: false,
      modal_loading: false,
      channelDatas: [],
      tagDatas: [],
      allAuthor: [],
      updateSortValue: {},
      sortModal: false
    };
  },
  methods: {
    init() {
      apiNewsManageme.getAllAuthor().then(response => {
        this.allAuthor = response.data.data;
      });
      apiTagDictionary
        .getTagDictionaryList({ pageSize: 1000 })
        .then(response => {
          this.tagDatas = response.data.data;
        });
      apiDictionary.getChannelDictionaryList().then(response => {
        this.channelDatas = response.data.data;
      });
      apiNewsManageme.getNewsManagemeList(this.searchData).then(response => {
        //console.log(response.data.data);
        this.total = response.data.count;
        this.data = response.data.data;
        //console.log(response.data.data);
      });
    },
    updateSort(item) {
      apiNewsManageme.setSort(item).then(response => {
        if (response.data.data == "成功") {
          this.$Message.success("修改排序成功");
          this.init();
        }
      });
    },
    handleSearch() {
      this.searchData.pageNum = 1;

      console.log(typeof this.searchData.starTime !== "string");
      if (typeof this.searchData.starTime !== "string") {
        this.searchData.starTime = dutil.dateformat(
          this.searchData.starTime,
          "yyyy-MM-dd"
        );
      }

      console.log(typeof this.searchData.endTime !== "string");
      if (typeof this.searchData.endTime !== "string") {
        this.searchData.endTime = dutil.dateformat(
          this.searchData.endTime,
          "yyyy-MM-dd"
        );
      }

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
    previewFun(id, type) {
      //预览事件
      var url;
      if (type == 0) {
        url = this.$domain.cityDomain + "?id=" + id;
      } else if (type == 1) {
        url = this.$domain.cityDomainimg + "?id=" + id;
      } else if (type == 2) {
        url = this.$domain.hshipinDomainurl + "?id=" + id;
      } else if (type == 3) {
        url = this.$domain.sshipinDomainurl + "?id=" + id;
      }
      apiNewsManageme.listAddPreview({ id: id }).then(response => {
        let pre = response.data.data.pre;
        let sign = response.data.data.sign;
        let timestamp = response.data.data.timestamp;
        this.qrcodeModal = !this.qrcodeModal;
        document.getElementById("qrcode").innerHTML = "";
        //url+='&pre='+pre+'&sign='+sign+'&timestamp='+timestamp;
        url += "&pre=1";
        this.qrcode(url);
      });
    },
    qrcode(url) {
      let qrcode = new QRCode("qrcode", {
        width: 200,
        height: 200, // 高度
        text: url // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      });
    },
    // 推送文章方法
    showPushModal(news) {
      this.pushDict();
      this.pushModal = true;
      this.pushForm.content.type = news.type;
      this.pushForm.content.newId = news.id;
      this.pushForm.content.title = news.title;
      this.pushForm.pushTime = this.pushForm.content.pushTime = moment()
        .add(6, "minutes")
        .format("YYYY-MM-DD HH:mm:ss");
    },
    pushOk() {
      this.$refs.pushForm.validate((valid) => {
        if (!valid) {
          this.changeLoading()
          return false
        }
        let sendForm = JSON.parse(JSON.stringify(this.pushForm));
        sendForm.content = JSON.stringify(sendForm.content);
        apiPush.addPush(sendForm).then(({ data }) => {
          if (data.code === "success") {
            this.$Message.success("添加推送成功");
            this.pushCancel();
          } else {
            this.$Message.error("添加推送失败");
            this.changeLoading()
          }
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    pushCancel() {
      this.pushForm = {
        taskType: 1, // 1：新闻 2：通知
        content: {
          title: "",
          newId: "",
          type: "",
          pushTime: ""
        },
        pushSql: undefined,
        equipmentNumber: undefined,
        pushType: "",
        pushTime: ""
      };
      this.pushChannelIndex = "";
      this.pushModal = false;
    },
    pushTypeChange(index) {
      if (!index && index !== 0) {
        return false;
      }
      this.pushForm.pushType = this.pushChannel[index].pushType;
      this.pushForm.pushSql = this.pushChannel[index].pushSql || undefined;
    },
    pushTimeChange(val) {
      this.pushForm.content.pushTime = this.pushForm.pushTime = val;
    },
    pushDict() {
      apiPush.pushDict().then(({ data }) => {
        if (data.code === "success") {
          this.pushChannel = data.data;
        }
      });
    },
    changeLoading() {
      this.pushLoading = false;
      this.$nextTick(() => {
        this.pushLoading = true;
      });
    }
  },
  created() {
    this.init();
  }
};
</script>
