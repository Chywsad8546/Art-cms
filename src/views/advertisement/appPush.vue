<template>
  <Card>
    <p slot="title">推送列表管理</p>
    <Form ref="searchData" :model="searchData" inline :label-width="80">
      <FormItem label="推送时间" prop="pushTime">
        <DatePicker type="datetime" :value="searchData.pushTime" @on-change="(val)=>{searchData.pushTime=val}" formate="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" style="width: 140px"></DatePicker>
      </FormItem>
      <FormItem label="推送状态" prop="status">
        <Select v-model="searchData.status" style="width:140px">
          <Option value="">全部</Option>
          <Option :value="0">推送中</Option>
          <Option :value="1">已推送</Option>
          <Option :value="2">已撤销</Option>
        </Select>
      </FormItem>
      <FormItem label="任务类型" prop="taskType">
        <Select v-model="searchData.taskType" style="width:140px">
          <Option value="">全部</Option>
          <Option :value="1">新闻</Option>
          <Option :value="2">通知</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSearch">搜索</Button>
        <Button type="ghost" @click="handleCancel" style="margin-left: 8px">清空</Button>
        <Button type="success" @click="showPushModal" style="margin-left: 8px">添加推送</Button>
      </FormItem>
    </Form>
    <Table border :columns="columns" :data="data"></Table>
    <Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" style="margin-top:10px; text-align:right"></Page>
    <!-- 添加推送Modal -->
    <Modal v-model="pushModal" :loading="pushLoading" @on-ok="pushOk" @on-cancel="pushCancel" width="600">
      <p slot="header">
        <span>APP推送</span>
      </p>
      <Form ref="pushForm" :model="pushForm" :rules="pushFormRules" :label-width="100">
        <FormItem label="消息标题：" prop="title">
          <Input v-model.trim="pushForm.title" style="width:450px"></Input>
        </FormItem>

        <FormItem label="推送时间：" prop="pushTime">
          <DatePicker type="datetime" :value="pushForm.pushTime" @on-change="pushTimeChange" formate="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" style="width: 200px"></DatePicker>
        </FormItem>

        <FormItem label="推送类型：" prop="pushType" v-if="pushModal">
          <Select :value="pushChannelIndex" @on-change="pushTypeChange" style="width:450px">
            <Option v-for="(item,index) in pushChannel" :key="index" :value="index">{{item.pushName}}</Option>
          </Select>
        </FormItem>

        <FormItem label="设备号：" prop="equipmentNumber" v-if="pushForm.pushType===4">
          <Input v-model.trim="pushForm.equipmentNumber" style="width:450px"></Input>
          <Alert style="width:450px;margin-top:5px;">多个设备码请使用英文逗号分隔（如：123,456）</Alert>
        </FormItem>

        <FormItem label="跳转链接" prop="pushLink">
          <Input v-model.trim="pushForm.pushLink" style="width:450px"></Input>
        </FormItem>

        <FormItem label="图片" prop="imgurl">
          <Upload ref="pushUpload" action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="true" :on-success="getImgFileName" :format="['jpg','jpeg','png','gif']" :max-size="6144">
            <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
        </FormItem>

        <FormItem label="摘要" prop="summary">
          <Input type="textarea" v-model.trim="pushForm.summary" style="width:450px"></Input>
        </FormItem>
      </Form>
    </Modal>
  </Card>
</template>
<script>
import apiPush from "@/api/advertisement/pushApi.js";
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
      searchData: {
        pageNum: 1,
        pageSize: 10,
        pushTime: '',
        taskType: '',
        status: ''
      },
      total: 1,
      data: [],
      columns: [
        {
          title: '推送ID',
          key: 'id',
          width: 90,
          align: 'center'
        },
        {
          title: '标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '推送时间',
          key: 'pushTime',
          width: 160,
          align: 'center'
        },
        {
          title: '推送类型',
          width: 100,
          align: 'center',
          render(h, params) {
            const { row: { taskType } } = params
            return h(
              "span",
              taskType === 1 ? '新闻' : '通知'
            )
          }
        },
        {
          title: '推送状态',
          width: 100,
          align: 'center',
          render(h, params) {
            const { row: { status } } = params
            let pushStatus = ''
            switch (status) {
              case 0:
                pushStatus = '推送中'
                break;
              case 1:
                pushStatus = '已推送'
                break;
              case 2:
                pushStatus = '已撤销'
                break;
              default:
                break;
            }
            return h(
              "span",
              pushStatus
            )
          }
        },
        {
          title: '管理',
          width: 100,
          align: 'center',
          render: (h, params) => {
            const { row: { status } } = params
            let button = ''
            if (status === 0) {
              button = h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.cancelTask(params.row.id)
                    }
                  }
                },
                "撤销")
            } else {
              button = h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    disabled: true
                  }
                },
                status === 1 ? "已推送" : "已撤销")
            }
            return button
          }
        }
      ],
      // 推送相关
      pushModal: false,
      pushLoading: true,
      pushChannel: [],
      pushChannelIndex: "",
      pushForm: {
        taskType: 2, // 1：新闻 2：通知
        title: "",
        pushLink: "",
        imgurl: "",
        summary: "",
        pushSql: undefined,
        equipmentNumber: undefined,
        pushType: "",
        pushTime: ""
      },
      pushFormRules: {
        title: [
          { required: true, message: '请填写标题！', trigger: 'blur' }
        ],
        pushTime: [
          { required: true, message: '请选择推送时间！', trigger: 'change' },
          // { validator: pushTimeValidator, trigger: 'change' }
        ],
        pushLink: [
          { required: true, message: '请填写跳转链接！', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '请填写摘要！', trigger: 'blur' }
        ],
        imgurl: [
          { required: true, message: '请上传图片！', trigger: 'blur' }
        ],
        pushType: [
          { required: true, message: '请选择推送类型！' }
        ],
        equipmentNumber: [
          { validator: equipmentNumberValidator, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    init() {
      apiPush.pushList(this.searchData).then(({ data }) => {
        if (data.code === 'success') {
          this.total = data.count
          this.data = data.data.map(item => {
            let content = JSON.parse(item.content || '{}')
            return {
              ...content,
              ...item
            }
          })
          console.log(this.data)
        }
      })
    },
    handleSearch() {
      this.pageChange(1)
    },
    handleCancel() {
      this.$refs.searchData.resetFields();
      this.pageChange(1)
    },
    pageChange(pageNum) {
      this.searchData.pageNum = pageNum
      this.init()
    },
    sizeChange(pageSize) {
      this.searchData.pageSize = pageSize
      this.init()
    },
    cancelTask(id) {
      apiPush.cancelPush({ id }).then(({ data }) => {
        if (data.code === 'success') {
          this.$Message.success('取消推送任务成功')
          this.init()
        } else {
          this.$Message.error('取消推送任务失败')
        }
      }).catch((error) => {
        this.$Message.error('取消推送任务失败')
      })
    },
    // 推送文章方法
    getImgFileName(response, file, fileList) {
      console.log(response.data);
      this.$Message.success("上传成功");
      this.pushForm.imgurl = response.data;
    },
    showPushModal() {
      this.pushDict();
      this.pushModal = true;
      this.pushForm.pushTime = moment()
        .add(6, "minutes")
        .format("YYYY-MM-DD HH:mm:ss");
    },
    pushOk() {
      this.$refs.pushForm.validate((valid) => {
        if (!valid) {
          this.changeLoading()
          return false
        }
        let { taskType, title, pushLink, imgurl, summary, pushSql, equipmentNumber, pushType, pushTime } = this.pushForm;
        let sendForm = {
          taskType: 2, // 1：新闻 2：通知
          content: {
            title,
            pushLink,
            imgurl,
            summary,
            pushTime
          },
          pushSql,
          equipmentNumber,
          pushType,
          pushTime
        }
        sendForm.content = JSON.stringify(sendForm.content)
        apiPush.addPush(sendForm).then(({ data }) => {
          if (data.code === "success") {
            this.$Message.success("添加推送成功");
            this.pushCancel();
            this.init();
          }
        });
      })
    },
    pushCancel() {
      this.pushForm = {
        taskType: 2, // 1：新闻 2：通知
        title: "",
        pushLink: "",
        imgurl: "",
        summary: "",
        pushSql: undefined,
        equipmentNumber: undefined,
        pushType: "",
        pushTime: ""
      };
      this.pushChannelIndex = "";
      this.$refs.pushUpload.clearFiles()
      this.pushModal = false
    },
    pushTypeChange(index) {
      if (!index && index !== 0) {
        return false;
      }
      this.pushForm.pushType = this.pushChannel[index].pushType;
      this.pushForm.pushSql = this.pushChannel[index].pushSql || undefined;
    },
    pushTimeChange(val) {
      this.pushForm.pushTime = val;
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
    this.init()
  }
};
</script>

