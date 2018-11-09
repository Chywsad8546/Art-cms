<template>
	<Row>
		<!-- <Col span="100">
		<Card>
			<p slot="title">推送列表管理</p>
			<Row class="margin-top-10 searchable-table-con1">
				<Form ref="searchData" :model="searchData" inline :label-width="120">
					<FormItem label="消息标题" prop="title">
						<Input v-model.trim="searchData.title" style="width:140px"></Input>
					</FormItem>

					<FormItem label="推送状态" prop="isPush">
						<Select v-model="searchData.isPush" style="width:140px">
							<Option value="0">未推送</Option>
							<Option value="1">推送成功</Option>
							<Option value="2">推送失败</Option>
						</Select>
					</FormItem>

					<FormItem label="政策类型" prop="pushType">
						<Select v-model="searchData.pushType" style="width:140px">
							<Option value="1">政策知识</Option>
							<Option value="2">热点新闻</Option>
						</Select>
					</FormItem>

					<FormItem label="开始时间" prop="startTime">
						<DatePicker type="date" v-model="searchData.startTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
					</FormItem>
					<FormItem label="结束时间" prop="endTime">
						<DatePicker type="date" v-model="searchData.endTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
					</FormItem>

					<FormItem>
						<Button type="primary" @click="handleSearch('searchData')">搜索</Button>
						<Button type="ghost" @click="handleCancel('searchData')" style="margin-left: 8px">清空</Button>
					</FormItem>

					<FormItem>
						<Button type="primary" @click="addModeButton">添加</Button>
					</FormItem>
				</Form>

				<Table border :columns="columns" :data="data"></Table>
				<Page :total="total" show-total show-sizer @on-change="pageChange" @on-page-size-change="sizeChange" style="margin-top:10px; text-align:right"></Page>
			</Row>
		</Card>

		</Col>

		<Modal v-model="isTrueAddTag" width="360" @on-ok="addNewsChannel(addNewsChannelModal)">
			<Form ref="addNewsChannelModalform" :model="addNewsChannelModal" :rules="ruleValidate" inline :label-width="120">
				<FormItem label="消息标题" prop="title">
					<Input v-model.trim="addNewsChannelModal.title" style="width:140px"></Input>
					<input v-model.trim="addNewsChannelModal.positionId" hidden></input>
				</FormItem>

				<FormItem label="推送时间" prop="pushTime">
					<DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" v-model="addNewsChannelModal.pushTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
				</FormItem>

				<FormItem label="推送类型" prop="type">
					<Select v-model="addNewsChannelModal.pushType" style="width:140px">
						<Option value="1">政策知识</Option>
						<Option value="2">热点新闻</Option>
					</Select>
				</FormItem>

				<FormItem label="跳转链接" prop="desc">
					<Input v-model.trim="addNewsChannelModal.pushLink" style="width:140px"></Input>
				</FormItem>
				<FormItem label="图片" prop="icon">
					<Upload action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="false" :default-file-list="defaultList" :on-success="getImgFileName" :format="['jpg','jpeg','png','gif']" :max-size="6144">
						<Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
					</Upload>
				</FormItem>

				<FormItem label="摘要" prop="desc">
					<Input type="textarea" v-model.trim="addNewsChannelModal.summary"></Input>
				</FormItem>
			</Form>
		</Modal> -->
		<Card>
			<p slot="title">推送列表管理</p>
			<Button type="primary" @click="showPushModal">添加推送</Button>
		</Card>
		<!-- 添加推送Modal -->
		<Modal v-model="pushModal" :loading="pushLoading" @on-ok="pushOk" @on-cancel="pushCancel" width="600">
			<p slot="header">
				<span>APP推送</span>
			</p>
			<Form :label-width="100">
				<FormItem label="消息标题：" prop="title">
					<Input v-model.trim="pushForm.content.title" style="width:450px"></Input>
				</FormItem>

				<FormItem label="推送时间：">
					<DatePicker type="datetime" :value="pushForm.pushTime" @on-change="pushTimeChange" formate="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" style="width: 150px"></DatePicker>
				</FormItem>

				<FormItem label="推送类型：">
					<Select :value="pushForm.pushType" @on-change="pushTypeChange" style="width:450px">
						<Option v-for="(item,index) in pushChannel" :key="index" :value="index">{{item.pushName}}</Option>
					</Select>
				</FormItem>

				<FormItem label="设备号：" v-if="pushForm.pushType===4">
					<Input v-model="pushForm.equipmentNumber" style="width:450px"></Input>
					<Alert style="width:450px;margin-top:5px;">多个设备码请使用英文逗号分隔（如：123,456）</Alert>
				</FormItem>

				<FormItem label="跳转链接" prop="desc">
					<Input v-model.trim="pushForm.content.pushLink" style="width:450px"></Input>
				</FormItem>

				<FormItem label="图片" prop="icon">
					<Upload action="/cmsapi/upload/uploadimgNoDomain" :show-upload-list="false" :on-success="getImgFileName" :format="['jpg','jpeg','png','gif']" :max-size="6144">
						<Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
					</Upload>
				</FormItem>

				<FormItem label="摘要" prop="desc">
					<Input type="textarea" v-model.trim="pushForm.content.summary" style="width:450px"></Input>
				</FormItem>
			</Form>
		</Modal>
	</Row>
</template>
<script>
import apiPush from "@/api/advertisement/pushApi.js";
import moment from "moment";
export default {
  data() {
    return {
      pushModal: false,
      pushLoading: true,
      pushChannel: [],
      pushForm: {
        taskType: 2, // 1：新闻 2：通知
        content: {
          title: "",
          pushLink: "",
          imgurl: "",
					summary: "",
					pushTime: ""
        },
        pushSql: undefined,
        equipmentNumber: undefined,
        pushType: "",
        pushTime: ""
      },
      ruleValidate: {
        title: [{ required: true, message: "标题不能为空！", trigger: "blur" }],
        pushTime: [
          {
            required: true,
            type: "date",
            message: "请输入推送时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // addModeButton() {
    //   this.addNewsChannelModal = { positionId: 900 };
    //   this.isTrueAddTag = true;
    // },
    // init() {
    //   this.updateCahnnelValue = {};
    //   this.addNewsChannelModal = { positionId: 900 };
    //   apiPush.getappPushListAll(this.searchData).then(response => {
    //     //console.log(response.data.data);
    //     this.total = response.data.count;
    //     this.data = response.data.data;
    //     //console.log(response.data.data);
    //   });
    // },
    // addNewsChannel(addChannelValue) {
    //   this.$refs["addNewsChannelModalform"].validate(valid => {
    //     if (valid) {
    //       addChannelValue.pushTime = dutil.dateformat(
    //         addChannelValue.pushTime,
    //         "yyyy-MM-dd hh:mm:ss"
    //       );
    //       apiPush.addAppPush(addChannelValue).then(response => {
    //         if (response.data.data > 0) {
    //           this.$Message.success("添加成功");
    //           this.init();
    //         }
    //       });
    //     } else {
    //       this.$Message.error("Fail!");
    //     }
    //   });
    // },
    // updateChannel(updateCahnnelValue) {
    //   updateCahnnelValue.pushTime = dutil.dateformat(
    //     updateCahnnelValue.pushTime,
    //     "yyyy-MM-dd hh:mm:ss"
    //   );
    //   console.log(updateCahnnelValue);
    //   apiPush.updateAppPush(updateCahnnelValue).then(response => {
    //     if (response.data.data > 0) {
    //       this.$Message.success("修改成功");
    //       this.init();
    //     }
    //   });
    // },
    // handleSearch() {
    //   this.searchData.page = 1;
    //   this.init();
    // },
    // handleCancel(name) {
    //   this.$refs[name].resetFields();
    //   this.searchData.page = 1;
    //   this.init();
    // },
    // getImgFileName(response, file, fileList) {
    //   console.log(response.data);
    //   this.$Message.success("上传成功");
    //   this.addNewsChannelModal.imgurl = response.data;
    //   this.updateCahnnelValue.imgurl = response.data;
    // },
    // pageChange(page) {
    //   this.searchData.page = page;
    //   this.init();
    // },
    // sizeChange(size) {
    //   this.searchData.limit = size;
    //   this.init();
    // },
    // updateIsDel(id, isDel) {
    //   apiPush.updateAppPush({ id: id, isDel: isDel }).then(response => {
    //     if (response.data.data > 0) {
    //       this.$Message.success("修改成功");
    //       this.init();
    //     }
    //   });
    // }

    // 推送文章方法
    getImgFileName(response, file, fileList) {
      console.log(response.data);
      this.$Message.success("上传成功");
      this.pushForm.content.imgurl = response.data;
    },
    showPushModal() {
      this.pushDict();
      this.pushModal = true;
      this.pushForm.content.pushTime = this.pushForm.pushTime = moment()
        .add(6, "minutes")
        .format("YYYY-MM-DD HH:mm:ss");
    },
    pushOk() {
      let sendForm = JSON.parse(JSON.stringify(this.pushForm));
      let { pushTime, equipmentNumber, pushType, content } = sendForm;
      if (
        !pushTime ||
        new Date(pushTime).getTime() - Date.now() <= 1000 * 60 * 5
      ) {
        this.pushForm.pushTime = moment(Date.now())
          .add(6, "minutes")
          .format("YYYY-MM-DD HH:mm:ss");
        this.$Message.warning("推送时间至少为当前时间后5分钟");
        this.changeLoading();
        return false;
      }
      if (!pushType) {
        this.$Message.warning("请选择推送类型");
        this.changeLoading();
        return false;
      }
      if (pushType === 4 && !equipmentNumber) {
        this.$Message.warning("设备号不能为空");
        this.changeLoading();
        return false;
      }
      sendForm.content = JSON.stringify(content);
      apiPush.addPush(sendForm).then(({ data }) => {
        if (data.code === "success") {
          this.$Message.success("添加推送成功");
          this.pushForm = {
            taskType: 2, // 1：新闻 2：通知
            content: {
              title: "",
              pushLink: "",
              imgurl: "",
              summary: ""
            },
            pushSql: undefined,
            equipmentNumber: undefined,
            pushType: "",
            pushTime: ""
          };
          this.pushCancel();
        }
      });
    },
    pushCancel() {
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
  created() {}
};
</script>

