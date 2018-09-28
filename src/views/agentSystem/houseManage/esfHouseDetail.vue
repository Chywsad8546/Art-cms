<template>
  <Card>
    <p slot="title">我的出售房源</p>
    <Form ref="form" :model="form" :rules="ruleValidate" :label-width="120">
      <FormItem label="楼盘名称">
        <Row>
          <Col span="10">
          <Input v-model="form.projName" disabled placeholder="楼盘名称" />
          </Col>
        </Row>
      </FormItem>
      <FormItem label="户型">
        <Row type="flex" :gutter="10">
          <Col offset="0">
          <FormItem prop="room">
            <Input disabled v-model="form.room" number style="width:50px" /> 室
          </FormItem>
          </Col>
          <Col offset="0">
          <FormItem prop="hall">
            <Input disabled v-model="form.hall" number style="width:50px" /> 厅
          </FormItem>
          </Col>
          <Col offset="0">
          <FormItem prop="toilet">
            <Input disabled v-model="form.toilet" number style="width:50px" /> 卫
          </FormItem>
          </Col>
          <!-- <Col offset="0">
          <FormItem prop="kitchen">
            <Input disabled v-model="form.kitchen" number style="width:50px" /> 厨
          </FormItem>
          </Col>
          <Col offset="0">
          <FormItem prop="toilet">
            <Input disabled v-model="form.toilet" number style="width:50px" /> 卫
          </FormItem>
          </Col>
          <Col offset="0">
          <FormItem prop="balcony">
            <Input disabled v-model="form.balcony" number style="width:50px" /> 阳台
          </FormItem>
          </Col> -->
        </Row>
      </FormItem>
      <FormItem label="楼层">
        <Row type="flex" :gutter="10">
          <Col offset="0">
          <FormItem prop="floor">
            <!-- <Input v-if="form.floor!=0" disabled v-model="form.floor" style="width:50px" /> -->
            <p v-if="form.floor!=0">{{form.floor+'层'}}</p>
            <p v-else>暂无</p>
          </FormItem>
          </Col>
          <Col offset="0">
          <FormItem prop="totalFloor">
            共
            <Input disabled v-model="form.totalFloor" number style="width:50px" /> 层
          </FormItem>
          </Col>
          <!-- <Col offset="0" class="gray999"> 提示：地下室请填写负数
          </Col> -->
        </Row>
      </FormItem>
      <FormItem label="面积">
        <Row type="flex" :gutter="10">
          <Col offset="0">
          <FormItem prop="buildArea">
            建筑面积
            <Input disabled v-model="form.buildArea" number style="width:100px" /> ㎡
          </FormItem>
          </Col>
          <!-- <Col offset="0">
          <FormItem prop="liveArea">
            使用面积
            <Input disabled v-model="form.liveArea" number style="width:100px" /> ㎡
          </FormItem>
          </Col> -->
        </Row>
      </FormItem>
      <FormItem label="朝向" prop="forward">
        <RadioGroup v-model="form.forward">
          <Radio disabled v-for="item in (forwardList||[])" :label="item.id" :key="item.id">{{item.value}}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="售价" prop="price">
        <Row type="flex" :gutter="10">
          <Col offset="0">
          <Input disabled v-model="form.price" number style="width:100px" /> 万元 </Col>
          <Col v-if="form.ofCompany==='我爱我家'">
            <Button type="primary" @click="woaiUpdate">纠错</Button>
          </Col>
          <Col v-if="form.ofCompany==='麦田房产'">
            <Button type="primary" @click="maitianUpdate">纠错</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="装修" prop="fitment">
        <RadioGroup v-model="form.fitment">
          <Radio disabled v-for="item in (fitmentList||[])" :label="item.id" :key="item.id">{{item.value}}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="产权性质" prop="propertyRight">
        <RadioGroup v-model="form.propertyRight">
          <Radio disabled v-for="item in (propertyList||[])" :label="item.id" :key="item.id">{{item.value}}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="房屋类型" prop="houseType">
        <RadioGroup v-model="form.houseType">
          <Radio disabled v-for="item in (houseTypeList||[])" :label="item.id" :key="item.id">{{item.value}}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="房源标签" prop="tags">
        <CheckboxGroup v-model="form.tags" @on-change="checkboxLimit(form.tags,5)">
          <!--<p v-for="item in tagsList">{{item}}</p>-->
          <Checkbox :disabled="IsDisabled" v-for="item in (tagsList||[])" :label="item.id" :key="item.id">{{item.value}}</Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="10">
          <Alert type="warning">
            注意事项：
            <template slot="desc">
              1、请勿填写公司名称、联系方式、风水、独家、真实、最等词汇。
              <br> 2、请勿填写与房源信息无关的文字、链接。
              <br> 3、请勿抄袭或复制其他房源的描述。
              <br> 4、请勿填写违法法律法规的内容。
            </template>
          </Alert>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="房源标题" prop="houseTitle">
        <Row>
          <Col span="8">
          <Input :disabled="IsDisabled" v-model="form.houseTitle" />
          </Col>
        </Row>
      </FormItem>
      <FormItem label="房源描述" prop="houseDesc">
        <Row>
          <Col span="10">
          <Input :disabled="IsDisabled" v-model="form.houseDesc" type="textarea" :autosize="{minRows: 8,maxRows: 10}" />
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="10">
          <Alert type="warning">
            注意事项：
            <template slot="desc">
              1、为达到最佳显示效果，建议上传比例4：3，长宽不小于960像素的图片。
              <br>2、请勿上传含有水印、广告、联系方式或其他含有版权信息的图片。
              <br>3、单张图片需小于5M。
            </template>
          </Alert>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="户型图">
        <Upload ref="upload" v-if="!IsDisabled" :show-upload-list="false" :on-success="upLoadHx" :on-progress="()=>this.hxLoading=true" :format="['jpg','jpeg','png']" :max-size="6144" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple action="/v1.0.0/sys/uploadImage">
          <Button type="ghost" icon="ios-cloud-upload-outline">批量上传</Button>
        </Upload>
        <span v-if="hxLoading">上传中...</span>
        <Row>
          <div class="housePicList">
            <div class="housePicListItem" v-for="(item,index) in hxImgList" v-if="item.isDel !=1" :key="index">
              <img class="houseimg" :src="$imgurl(item.imagePath, 'agent400x300')">
              <div>
                <span class="fr">
                  <a :disabled="IsDisabled" @click="delPic(item,hxImgList)">删除</a>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </FormItem>
      <FormItem label="室内图" required>
        <Upload ref="upload1" v-if="!IsDisabled" :show-upload-list="false" :on-success="upLoadroom" :on-progress="()=>this.snLoading=true" :format="['jpg','jpeg','png']" :max-size="6144" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple action="/v1.0.0/sys/uploadImage">
          <Button type="ghost" icon="ios-cloud-upload-outline">批量上传</Button>
        </Upload>
        <span v-if="snLoading">上传中...</span>
        <Row>
          <Col span="10">
          <Alert type="warning" style="margin-top:10px">图片顺序可拖拽排序且图片顺序跟头条展示顺序一致</Alert>
          </Col>
        </Row>
        <Row>
          <div class="housePicList">
            <div class="housePicListItem" v-for="(item,index) in snImgList" v-if="item.isDel !=1" v-dragging="{ item: item, list: snImgList, group: 'sn', key: index }" :key="index">
              <!--  -->
              <img class="houseimg" :src="$imgurl(item.imagePath,'agent400x300')">
              <div>
                <span v-if="item.flag == 0 || item.flag == '' || item.flag == null" class="fl">
                  <a :disabled="IsDisabled" @click="setTitPic(item)">设为标题图</a>
                </span>
                <span v-if="item.flag == 1" class="fl">标题图</span>
                <span class="fr">
                  <a :disabled="IsDisabled" @click="delPic(item,snImgList)">删除</a>
                </span>
              </div>
            </div>
          </div>
        </Row>

      </FormItem>
      <FormItem label="小区图">
        <Upload ref="upload2" v-if="!IsDisabled" :show-upload-list="false" :on-success="upLoadxq" :on-progress="()=>this.xqLoading=true" :format="['jpg','jpeg','png']" :max-size="6144" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple action="/v1.0.0/sys/uploadImage">
          <Button type="ghost" icon="ios-cloud-upload-outline">批量上传</Button>
        </Upload>
        <span v-if="xqLoading">上传中...</span>
        <Row>
          <div class="housePicList">
            <div class="housePicListItem" v-for="(item,index) in xqImgList" v-if="item.isDel !=1" :key="index">
              <img class="houseimg" :src="$imgurl(item.imagePath,'agent400x300')">
              <div>
                <span class="fr">
                  <a :disabled="IsDisabled" @click="delPic(item,xqImgList)">删除</a>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </FormItem>
      <FormItem>
        <Button v-if="!IsDisabled" type="primary" @click="handleSubmit('form')">保存</Button>
        <Button v-else type="primary" @click="agentClaimHouseSell">认领</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
import houseApi from "@/api/house/index.js";
import {
  remove
} from "lodash";
import {
  compact
} from "lodash";
export default {
  name: "esfHouseDetail",
  data() {
    return {
      newCodeName: this.$route.query.projName, // 楼盘名称
      forwardList: [],
      fitmentList: [],
      tagsList: [],
      propertyList: [],
      houseTypeList: [],
      form: {
        // houseRent:{
        newcode: undefined, //* 楼盘Idthis.$route.query.
        houseId: this.$route.query.houseId, //
        projName: undefined,
        room: "", //* 室
        hall: "", //* 厅
        kitchen: "",
        toilet: "",
        balcony: "", // 阳台
        floor: "", //* 楼层
        totalFloor: "", // 总楼层
        area: "", //*
        forward: undefined, //*
        rentPrice: "", //*
        payMode: undefined, // 付款方式
        fitment: undefined, // 装修
        supportingFacilities: undefined, // 配套设施
        houseTitle: "", //* 房源标题
        rentType: undefined, //* 出租类型（1整租）（2合租）
        houseDesc: "", //* 房源描述
        status: "", // 发布状态(0-待发布，1-已发布，2-已下架)
        tags: [], // 房源标签
        isRecommend: 0, // 是否推荐(0-否，1-是)
        source: 1, //* ****来源(1-经纪人后台录入，2-API导入)
        houseSellImages: []
      },
      ruleValidate: {
        houseTitle: [{
          required: true,
          type: "string",
          max: 30,
          message: "房源标题必填、不能超过30个字",
          trigger: "blur"
        },
        {
          validator: this.validatetitle,
          trigger: "blur"
        }
        ],
        houseDesc: [{
          required: true,
          type: "string",
          max: 1000,
          message: "房源描述必填、不能超过1000个字符",
          trigger: "blur"
        },
        {
          validator: this.validateDesc,
          trigger: "blur"
        }
        ]
      },
      // 图片上传
      imgName: "",
      visible: false,
      uploadList: [],
      hxLoading: false,
      snLoading: false,
      xqLoading: false,

      //提交判断是否有敏感词
      sensitiveTitle: false,
      sensitiveDesc: false,
      // 判断是否有标题图
      isFlag: false,
      snImgList: [],
      xqImgList: [],
      hxImgList: [],
      sortList: []
    };
  },
  methods: {
    // 房源纠错
    woaiUpdate() {
      let sourceHouseId = this.form.sourceHouseId;
      this.$Modal.confirm({
        title: "纠错房源",
        content: "确认纠错该条房源：房源id：" + sourceHouseId + "</p>",
        loading: true,
        onOk: async () => {
          try {
            let res = await houseApi.getWoAiInfo({
              id: sourceHouseId
            });
            console.log(res);
            this.$Modal.remove();
            this.$Message.success("纠错房源成功");
            this.getDetail();
          } catch (error) {
            console.log(error);
            this.$Modal.remove();
            this.$Message.error("操作失败");
          }
        }
      });
    },
    maitianUpdate() {
      let sourceHouseId = this.form.sourceHouseId;
      this.$Modal.confirm({
        title: "纠错房源",
        content: "确认纠错该条房源：房源id：" + sourceHouseId + "</p>",
        loading: true,
        onOk: async () => {
          try {
            let res = await houseApi.getMaitianInfo({
              id: sourceHouseId
            });
            console.log(res);
            this.$Modal.remove();
            this.$Message.success("纠错房源成功");
            this.getDetail();
          } catch (error) {
            console.log(error);
            this.$Modal.remove();
            this.$Message.error("操作失败");
          }
        }
      });
    },
    //校验方法
    validateDesc(rule, value, callback) {
      houseApi
        .checkSensitiveWord({
          txt: value
        })
        .then(response => {
          this.sensitiveDesc = false
          callback();
        })
        .catch(error => {
          this.sensitiveDesc = true
          let errStr = "";
          if (Array.isArray(error.response.data.data)) {
            errStr = error.response.data.data.join(",");
            callback(new Error("房源描述包含敏感词:[" + errStr + "]"));
          } else {
            callback(new Error(error.response.data.msg));
          }
        });
    },
    validatetitle(rule, value, callback) {
      houseApi
        .checkSensitiveWord({
          txt: value
        })
        .then(response => {
          this.sensitiveTitle = false;
          callback();
        })
        .catch(error => {
          this.sensitiveTitle = true;
          console.log(error.response.data);
          let errStr = "";
          if (Array.isArray(error.response.data.data)) {
            errStr = error.response.data.data.join(",");
            callback(new Error("房源标题包含敏感词:[" + errStr + "]"));
          } else {
            callback(new Error(error.response.data.msg));
          }
        });
    },
    //校验多选数量
    checkboxLimit(arr, count) {
      if (this.form.tags.length > count) {
        this.$Message.error("最多选择" + count + "项");
        this.form.tags.pop();
      }
      console.log(this.form.tags);
    },
    changeRule(type) {
      let houseTitle0 = [{
        required: true,
        type: "string",
        max: 30,
        message: "房源标题必填、不能超过30个字",
        trigger: "blur"
      },
      {
        validator: this.validatetitle,
        trigger: "blur"
      }];
      let houseTitle1 = [{
        required: true,
        type: "string",
        max: 30,
        message: "房源标题必填、不能超过30个字",
        trigger: "blur"
      }];
      let houseDesc0 = [{
        required: true,
        type: "string",
        max: 1000,
        message: "房源描述必填、不能超过1000个字符",
        trigger: "blur"
      },
      {
        validator: this.validateDesc,
        trigger: "blur"
      }];
      let houseDesc1 = [{
        required: true,
        type: "string",
        max: 1000,
        message: "房源描述必填、不能超过1000个字符",
        trigger: "blur"
      }];
      if (type === 0) {
        this.ruleValidate.houseTitle = houseTitle0
        this.ruleValidate.houseDesc = houseDesc0
      } else if (type === 1) {
        this.ruleValidate.houseTitle = houseTitle1
        this.ruleValidate.houseDesc = houseDesc1
      }
    },
    handleSubmit(name) {
      this.changeRule(1);
      this.$refs[name].validate(valid => {
        this.changeRule(0);
        console.log(this.ruleValidate.houseDesc);

        if (valid) {
          if (this.isFlag) {
            if (this.sensitiveTitle || this.sensitiveDesc) {
              this.$Modal.confirm({
                content: '您发布的房源标题或详情中有敏感词存在，修改请取消，确认将会变为“*”号',
                okText: '取消',
                cancelText: '确认',
                onCancel: () => {
                  this.editDetail();
                }
              });
            } else {
              this.editDetail();
            }
          } else {
            this.$Notice.error({
              title: "请上传室内通图片并设置为标题图",
              duration: 2
            });
          }
        } else {
          this.$Notice.error({
            title: "房源信息填写有误！",
            duration: 2
          });
        }
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不对",
        desc: file.name + "文件格式不对,请选择 jpg或 png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件过大",
        desc: file.name + " 太大, 不能超过20M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "最多上传5张"
        });
      }
      return check;
    },
    // 录入房源
    editDetail() {
      // console.log(this.form.houseSellImages)
      for (let i = 0; i < this.snImgList.length; i++) {
        this.snImgList[i].sort = i + 1;
      }
      console.log("触发改变");
      this.snImgList = [].concat(this.snImgList);
      console.log(this.snImgList);
      console.log(this.fullImagesList);
      houseApi
        .updateAgentClaimHouseSellInfo({
          houseId: this.$route.query.houseId,
          houseTitle: this.form.houseTitle,
          houseDesc: this.form.houseDesc,
          tags: this.form.tags,
          houseSellImageDOList: this.fullImagesList
        })
        .then(response => {
          this.$Notice.success({
            title: "更新房源成功",
            duration: 2
          });
          if (this.IsDisabled) {
            this.$router.push({
              name: "agentEsfHouseManageWait"
            });
          } else {
            this.$router.push({
              name: "agentEsfHouseManage"
            });
          }
        })
        .catch(error => {
          console.log(error.response);
          if (error.response.data.code == 20423) {
            this.$Message.error({
              content: "房源标题或房源描述含有敏感词，请检查！",
              duration: 2
            });
          } else {
            this.$Notice.error({
              title: "更新房源失败",
              duration: 2
            });
          }
        });
    },
    // 房源图片上传
    upLoadHx(res, file) {
      file.name = res.data.hash;
      file.imageType = 4; //* 图片类型，图片类型(1-标题图，2-室内图，3-室外图，4-户型图)
      file.imagePath = res.data.key; //*
      file.imageTitle = ""; // 标题
      file.imageDesc = ""; // 描述
      file.flag = 0; //* 0不设置标题图，1设置为标题图
      file.isDel = 0; // 0不删除，1删除 删除的时候必传
      file.isNewAdd = 1; // 前台删除校验
      this.hxImgList.push(file);
      this.hxLoading = false;
    },
    // 房源图片上传
    upLoadroom(res, file, fileList) {
      file.name = res.data.hash;
      file.imageType = 2; //* 图片类型，图片类型(1-标题图，2-室内图，3-室外图，4-户型图)
      file.imagePath = res.data.key; //*
      file.imageTitle = ""; // 标题
      file.imageDesc = ""; // 描述
      file.flag = 0; //* 0不设置标题图，1设置为标题图
      file.isDel = 0; // 0不删除，1删除 删除的时候必传
      this.snImgList.push(file);
      this.snLoading = false;
    },
    // 房源图片上传
    upLoadxq(res, file, fileList) {
      file.name = res.data.hash;
      file.imageType = 3; //* 图片类型，图片类型(2-室内图，3-室外图，4-户型图)
      file.imagePath = res.data.key; //*
      file.imageTitle = ""; // 标题
      file.imageDesc = ""; // 描述
      file.flag = 0; //* 0不设置标题图，1设置为标题图
      file.isDel = 0; // 0不删除，1删除 删除的时候必传
      this.xqImgList.push(file);
      this.xqLoading = false;
      console.log(this.fullImagesList.length);
    },
    // 删除原有图片
    delPic(file, list) {
      if (file.flag === 1) {
        this.isFlag = false;
      }
      // list.splice(list.indexOf(file),1)
      // this.fullImagesList.splice(this.fullImagesList.indexOf(file),1)
      file.isDel = 1;
      // this.fullImagesList.concat([file])
      this.$set(list, list.indexOf(file), file);
      // list.map(x => {
      //   console.log(x.imagePath == file.imagePath)
      //   if (x.imagePath == file.imagePath) {
      //     x.isDel = 1;
      //   }
      //   return x;
      // });
    },
    // 设为标题图片
    setTitPic(file) {
      this.snImgList.map(x => {
        if (x.imagePath == file.imagePath) {
          // x.flag = 1;
          file.flag = 1;
          this.$set(this.snImgList, this.snImgList.indexOf(file), file);
        } else {
          x.flag = 0;
          this.$set(this.snImgList, this.snImgList.indexOf(x), x);
        }
        return x;
      });
    },

    // 获取朝向列表
    getforward() {
      houseApi
        .listHouseTowards()
        .then(({
          data
        }) => {
          this.forwardList = data.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getfitment() {
      houseApi
        .listHouseFitment()
        .then(({
          data
        }) => {
          this.fitmentList = data.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getHouseTags() {
      houseApi
        .listSellHouseHouseTags()
        .then(({
          data
        }) => {
          this.tagsList = data.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getPropertyRights() {
      houseApi
        .listSellHousePropertyRights()
        .then(({
          data
        }) => {
          this.propertyList = data.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getHouseType() {
      houseApi
        .listSellHouseHouseType()
        .then(({
          data
        }) => {
          this.houseTypeList = data.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取详情
    getDetail() {
      houseApi
        .getHouseSellClaimByHouseId({
          houseId: this.$route.query.houseId,
          houseStatus: this.$route.query.houseStatus
        })
        .then(({
          data
        }) => {
          this.form = Object.assign(this.form, data.data);
          console.log(this.form);
          if (!this.form.tags) {
            this.form.tags = [];
          }
          if (!Array.isArray(this.form.houseSellImages)) {
            this.form.houseSellImages = [];
          }
          this.fullImagesList = this.form.houseSellImages;
        })
        .catch(error => {
          console.log("获取详情失败", error);
        });
    },
    //认领
    async agentClaimHouseSell() {
      let houseID = this.$route.query.houseId;
      try {
        let {
          data
        } = await houseApi.agentClaimHouseSell({
          houseID
        });
        this.$Message.success("认领成功");
        this.$router.push({
          name: "agentEsfHouseManage"
        });
      } catch (e) {
        this.$Message.error(e.response.data.msg);
      }
    }
  },
  created() {
    this.getDetail();
    this.getforward();
    this.getfitment();
    this.getHouseTags();
    this.getPropertyRights();
    this.getHouseType();
  },
  mounted() {
    this.$dragging.$on("dragged", ({
      value
    }) => {
      // console.log(value.item)
      console.log(value.list);
      this.sortList = value.list;
      // console.log(value.key)
    });
    this.$dragging.$on("dragend", () => {
      this.snImgList = this.sortList;
      console.log("排序结束");
      console.log(this.snImgList);
    });
  },
  computed: {
    IsDisabled: function () {
      if (this.$route.query.houseStatus == 0) {
        return false;
      } else {
        return true;
      }
    },
    fullImagesList: {
      // getter
      get: function () {
        console.log("改变");
        return [...this.snImgList, ...this.hxImgList, ...this.xqImgList];
      },
      // setter
      set: function (newValue) {
        console.log("分数组");
        this.xqImgList = [];
        this.snImgList = [];
        this.hxImgList = [];
        newValue.map(x => {
          if (x.imageType === 2 && x.isDel !== 1) {
            this.snImgList.push(x);
          }
          if (x.imageType === 3 && x.isDel !== 1) {
            this.xqImgList.push(x);
          }
          if (x.imageType === 4 && x.isDel !== 1) {
            this.hxImgList.push(x);
          }
          this.snImgList.sort(function (a, b) {
            return a.sort > b.sort ? 1 : -1;
          });
        });
      }
    }
  },
  watch: {
    snImgList: {
      handler: function (val, oldVal) {
        if (this.isFlag) {
          return;
        } else {
          if (this.snImgList) {
            this.snImgList.map(x => {
              if (x.flag === 1 && x.isDel !== 1) {
                this.isFlag = true;
              }
            });
            if (this.isFlag) {
              return;
            } else {
              for (let i = 0; i < this.snImgList.length; i++) {
                if (this.snImgList[i].isDel !== 1) {
                  this.snImgList[i].flag = 1;
                  this.isFlag = true;
                  break;
                }
              }
            }
          }
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
.housePicListItem {
  float: left;
  width: 180px;
  margin: 20px 20px 20px 0;
}

.housePicListItem .houseimg {
  display: block;
  width: 100%;
  height: 135px;
}

.fl {
  float: left;
}

.fr {
  float: right;
}
</style>