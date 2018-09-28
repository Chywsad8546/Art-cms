<template>
  <Card>
    <p slot="title">我的出租房源</p>
    <Row>
      <Col>
      <Form ref="form" :model="form" :rules="ruleValidate" :label-width="120">
        <Row>
          <Col span="10">
          <FormItem label="楼盘名称:" prop="newcode">
            <Select v-model="form.newcode" @on-change="changeNewcode" filterable remote clearable :remote-method="remoteMethod" :loading="ncLoading">
              <Option v-for="(option, index) in ncOptions" :value="option.newcode" :key="index">{{option.projname}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem label="官网房源编号:" prop="sourceHouseId" v-if="isCheckNum">
            <Input v-model="form.sourceHouseId"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem v-if="!codeAddress">
            <Alert type="warning">
              请从列表中选取楼盘！如楼盘不存在，请联系客服创建
            </Alert>
          </FormItem>
          <FormItem v-else label="楼盘地址:">
            <p>{{codeAddress}}</p>
          </FormItem>
          </Col>
        </Row>
        <FormItem label="户型:" required>
          <Row>
            <Col span="1">
            <FormItem prop="room">
              <Input v-model="form.room" number></Input>
            </FormItem>
            </Col>
            <Col span="1" style="text-align: center">室</Col>
            <Col span="1">
            <FormItem prop="hall">
              <Input v-model="form.hall" number></Input>
            </FormItem>
            </Col>
            <Col span="1" style="text-align: center">厅</Col>
            <Col span="1">
            <FormItem prop="kitchen">
              <Input v-model="form.kitchen" number></Input>
            </FormItem>
            </Col>
            <Col span="1" style="text-align: center">厨</Col>
            <Col span="1">
            <FormItem prop="toilet">
              <Input v-model="form.toilet" number></Input>
            </FormItem>
            </Col>
            <Col span="1" style="text-align: center">卫</Col>
            <Col span="1">
            <FormItem prop="balcony">
              <Input v-model="form.balcony" number></Input>
            </FormItem>
            </Col>
            <Col span="2" style="text-align: center">阳台</Col>
          </Row>
        </FormItem>
        <FormItem label="楼层:" required>
          <Row>
            <Col span="1" style="text-align: center">第</Col>
            <Col span="1">
            <FormItem prop="floor">
              <Input v-model="form.floor" number></Input>
            </FormItem>
            </Col>
            <Col span="1" style="text-align: center">层</Col>
            <Col span="1" style="text-align: center">共</Col>
            <Col span="1">
            <FormItem prop="totalFloor">
              <Input v-model="form.totalFloor" number></Input>
            </FormItem>
            </Col>
            <Col span="1" style="text-align: center">层</Col>
            <Col offset="7">提示：地下室请填写负数</Col>
          </Row>
        </FormItem>
        <FormItem label="租赁方式:" prop="rentType">
          <RadioGroup v-model="form.rentType">
            <Radio :label=1>整租</Radio>
            <Radio :label=2>合租</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="面积:" prop="area">
          <Row>
            <Col :span="2">
            <Input v-model="form.area" number></Input>
            </Col>
            <Col :span="2">㎡</Col>
          </Row>
        </FormItem>
        <FormItem label="朝向:" prop="forward">
          <RadioGroup v-model="form.forward">
            <Radio v-for="item in forwardList" :label="item.id" :key="item.id">{{item.value}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="租金:" prop="rentPrice">
          <Row>
            <Col :span="2">
            <Input v-model="form.rentPrice" number></Input>
            </Col>
            <Col :span="2">元/月</Col>
          </Row>
        </FormItem>
        <FormItem label="付款方式:" prop="payMode">
          <RadioGroup v-model="form.payMode">
            <Radio v-for="item in payModeList" :label="item.id" :key="item.id">{{item.value}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="装修:" prop="fitment">
          <RadioGroup v-model="form.fitment">
            <Radio v-for="item in fitmentList" :label="item.id" :key="item.id">{{item.value}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="配套设施:" prop="supportingFacilities">
          <Checkbox :value="checkAll" @click.prevent.native="supportAll">全选</Checkbox>
          <CheckboxGroup v-model="form.supportingFacilities" @on-change="supportChange">
            <!--，，，衣柜，沙发，桌子，椅子，暖气，煤气，网络，智能锁/ -->
            <Checkbox label="床"></Checkbox>
            <Checkbox label="洗衣机"></Checkbox>
            <Checkbox label="空调"></Checkbox>
            <Checkbox label="热水器"></Checkbox>
            <Checkbox label="网络"></Checkbox>
            <Checkbox label="冰箱"></Checkbox>
            <Checkbox label="电视"></Checkbox>
            <Checkbox label="煤气"></Checkbox>
            <Checkbox label="暖气"></Checkbox>
            <Checkbox label="微波炉"></Checkbox>
            <Checkbox label="衣柜"></Checkbox>
            <Checkbox label="沙发"></Checkbox>
            <Checkbox label="桌子"></Checkbox>
            <Checkbox label="椅子"></Checkbox>
            <Checkbox label="智能锁"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="房源标签:" prop="rentTags">
          <CheckboxGroup v-model="form.rentTags" @on-change="checkboxLimit(form.rentTags,5)">
            <Checkbox v-for="item in rentTagsList" :label="item.id" :key="item.id">{{item.value}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="房源标题:" prop="houseTitle">
          <Row>
            <Col span="8">
            <Input v-model="form.houseTitle"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="房源描述:" prop="houseDesc">
          <Row>
            <Col span="10">
            <Input v-model="form.houseDesc" :rows="8" type="textarea" :autosize="{minRows: 8,maxRows: 10}"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row>
            <Col span="10">
            <Alert type="warning">
              注意事项：
              <template slot="desc">
                1、请勿填写公司名称、联系方式、风水、独家、真实、最等词汇。<br>2、请勿填写与房源信息无关的文字、链接。<br>3、请勿抄袭或复制其他房源的描述。<br>4、请勿填写违法法律法规的内容。
              </template>
            </Alert>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="户型图:">
          <Upload ref="upload" :show-upload-list="false" :on-success="upLoadHx" :on-progress="upLoadHxLoading" :format="['jpg','jpeg','png']" :max-size="6144" multiple action="/v1.0.0/sys/uploadImage">
            <Button type="ghost" icon="ios-cloud-upload-outline">批量上传</Button>
          </Upload>
          <span v-if="hxLoading">上传中...</span>
          <Row>
            <div class="housePicList">
              <div class="housePicListItem" v-for="(item,index) in hxImgList" v-if="item.isDel !=1" :key="index">
                <img class="houseimg" :src="$imgurl(item.imagePath,'agent400x300')">
                <div>
                  <span class="fr">
                    <a @click="delPic(item,hxImgList)">删除</a>
                  </span>
                </div>
              </div>
            </div>
          </Row>
        </FormItem>
        <FormItem label="室内图:" required>
          <Upload ref="upload1" :show-upload-list="false" :on-success="upLoadroom" :on-progress="upLoadroomLoading" :format="['jpg','jpeg','png']" :max-size="6144" multiple action="/v1.0.0/sys/uploadImage">
            <Button type="ghost" icon="ios-cloud-upload-outline">批量上传</Button>
          </Upload>
          <span v-if="roomLoading">上传中...</span>
          <Row>
            <Col span="10">
            <Alert type="warning" style="margin-top:10px">图片顺序可拖拽排序且图片顺序跟头条展示顺序一致</Alert>
            </Col>
          </Row>
          <Row>
            <div class="housePicList">
              <div class="housePicListItem" v-for="(item,index) in snImgList" v-dragging="{ item: item, list: snImgList, group: 'sn', key: index }" :key="index" v-if="item.isDel !=1">
                <!-- -->
                <img class="houseimg" :src="$imgurl(item.imagePath,'agent400x300')">
                <div>
                  <span v-if="item.flag == 0 || item.flag == ''||item.flag == null" class="fl">
                    <a @click="setTitPic(item,snImgList)">设为标题图</a>
                  </span>
                  <span v-if="item.flag == 1" class="fl">标题图</span>
                  <span class="fr">
                    <a @click="delPic(item,snImgList)">删除</a>
                  </span>
                </div>
              </div>
            </div>
          </Row>

        </FormItem>
        <FormItem label="小区图:">
          <Upload ref="upload2" :show-upload-list="false" :on-success="upLoadxq" :on-progress="upLoadxqLoading" :format="['jpg','jpeg','png']" :max-size="6144" multiple action="/v1.0.0/sys/uploadImage">
            <Button type="ghost" icon="ios-cloud-upload-outline">批量上传</Button>
          </Upload>
          <span v-if="xqLoading">上传中...</span>
          <Row>
            <div class="housePicList">
              <div class="housePicListItem" v-for="(item,index) in xqImgList" v-if="item.isDel !=1" :key="index">
                <img class="houseimg" :src="$imgurl(item.imagePath,'agent400x300')">
                <div>
                  <span class="fr">
                    <a @click="delPic(item,xqImgList)">删除</a>
                  </span>
                </div>
              </div>
            </div>
          </Row>

        </FormItem>
        <FormItem>
          <Row>
            <Col span="10">
            <Alert type="warning">
              注意事项：
              <template slot="desc">
                1、为达到最佳显示效果，建议上传比例4：3，长宽不小于960像素的图片。
                <br>2、请勿上传含有水印、广告、联系方式或其他含有版权信息的图片。<br>3、单张图片需小于5M。
              </template>
            </Alert>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button v-if="$hasAuth('renhouseadd_button_addrenthouse')" type="primary" @click="handleSubmit('form',1)">录入房源并发布</Button>
          <Button type="primary" @click="handleSubmit('form',2)">录入为待发布房源</Button>
        </FormItem>
      </Form>
      </Col>
    </Row>

  </Card>
</template>

<script>
import api from "@/api/agent/index.js";
import houseApi from "@/api/house/index.js";
import _ from 'lodash';
export default {
  name: "agentRentHouseAdd",
  data() {
    //校验正整数
    const validateNump = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请填写正确数字"));
      } else {
        callback();
      }
    };

    return {
      checkAll: false,
      isCheckNum: false,//官网房源编号
      forwardList: [],
      fitmentList: [],
      payModeList: [],
      rentTagsList: [],
      form: {
        sourceHouseId: "",//官网房源编号
        newcode: "", //*楼盘Idthis.$route.query.
        houseId: this.$route.query.houseId, //
        room: "", //*室
        hall: "", //*厅
        kitchen: "",
        toilet: "",
        balcony: "", //阳台
        floor: "", //*楼层
        totalFloor: "", //总楼层
        area: "", //*
        forward: "", //*
        rentPrice: "", //*
        payMode: "", //付款方式
        fitment: "", //装修
        supportingFacilities: [], //配套设施
        houseTitle: "", //*房源标题
        rentType: "", //*出租类型（1整租）（2合租）
        houseDesc: "", //*房源描述
        status: "", //发布状态(0-待发布，1-已发布，2-已下架)
        // ofCompany:'', //我爱我家
        // round:'', //周边配套
        // traffic:'', //交通状况
        rentTags: [], //房源标签
        isRecommend: 0, //是否推荐(0-否，1-是)
        source: 1, //*****来源(1-经纪人后台录入，2-API导入)
        houseRentImages: []
      },
      codeAddress: '',
      ncOptions: [],
      ncLoading: false,
      hxLoading: false,
      roomLoading: false,
      xqLoading: false,
      ruleValidate: {
        newcode: [{
          type: "number",
          required: true,
          message: "楼盘名称不能为空",
          trigger: "change"
        }],
        room: [{
          type: "number",
          required: true,
          message: " ",
          trigger: "blur"
        },
        {
          validator: validateNump,
          trigger: "blur"
        }
        ],
        hall: [{
          type: "number",
          required: true,
          message: " ",
          trigger: "blur"
        },
        {
          validator: validateNump,
          trigger: "blur"
        }
        ],
        kitchen: [{
          type: "number",
          required: false,
          message: " ",
          trigger: "blur"
        },
        {
          validator: validateNump,
          trigger: "blur"
        }
        ],
        toilet: [{
          type: "number",
          required: false,
          message: " ",
          trigger: "blur"
        },
        {
          validator: validateNump,
          trigger: "blur"
        }
        ],
        balcony: [{
          type: "number",
          required: false,
          message: " ",
          trigger: "blur"
        },
        {
          validator: validateNump,
          trigger: "blur"
        }
        ],
        floor: [{
          type: "number",
          required: true,
          message: " ",
          trigger: "blur"
        }],
        totalFloor: [{
          type: "number",
          required: false,
          message: " ",
          trigger: "blur"
        },
        {
          validator: validateNump,
          trigger: "blur"
        }
        ],
        area: [{
          type: "number",
          required: true,
          message: "请输入正确数字",
          trigger: "blur"
        },
        {
          validator: validateNump,
          trigger: "blur"
        }
        ],
        forward: [{
          type: "number",
          required: true,
          message: "请选择朝向",
          trigger: "change"
        }],
        rentPrice: [{
          type: "number",
          required: true,
          message: "请填写租金",
          trigger: "blur"
        },
        {
          validator: validateNump,
          trigger: "blur"
        }
        ],
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
        fitment: [
          // {required: true, type: 'array', min: 1, message: ' ', trigger: 'change' }
          {
            type: "number",
            required: true,
            message: "请选择装修程度",
            trigger: "change"
          }
        ],
        rentType: [{
          type: "number",
          required: true,
          message: "请选择租赁方式",
          trigger: "change"
        }],
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
      isFlag: false,
      sensitiveTitle: false,
      sensitiveDesc: false,
      snImgList: [],
      xqImgList: [],
      hxImgList: [],
      sortList: []

    };
  },
  methods: {
    //校验方法
    validateDesc(rule, value, callback) {
      houseApi
        .checkSensitiveWord({
          txt: value
        })
        .then(response => {
          this.sensitiveDesc = false;
          callback();
        })
        .catch(error => {
          this.sensitiveDesc = true
          console.log(error.response.data);
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
    changeNewcode(code) {
      console.log(code)
      houseApi.selectAddressDescByNewCode({
        newcode: code
      }).then(res => {
        this.codeAddress = res.data.data
      }).catch(err => {
        this.codeAddress = ''
        console.log(this.codeAddress)
      })
    },
    //校验多选数量
    checkboxLimit(arr, count) {
      if (arr.length > count) {
        this.$Message.error("最多选择" + count + "项")
        arr.pop()
      }
    },
    handleSubmit(name, type) {
      if (!this.isFlag) {
        this.$Message.error({
          content: "请上传室内通图片并设置为标题图",
          duration: 2
        });
        return false;
      } else {
        this.changeRule(1);
        this.$refs[name].validate(valid => {
          this.changeRule(0);
          if (valid) {
            if (type == 1) {
              this.form.status = 1;
            } else if (type == 2) {
              this.form.status = 0;
            }
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
              this.$Modal.confirm({
                content: '确认提交当前房源吗？',
                onOk: () => {
                  this.editDetail();
                }
              });
            }
          } else {
            this.$Message.error({
              content: "房源信息填写有误！*项目必填",
              duration: 2
            });
          }
        });
      }
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    //录入房源
    editDetail() {
      for (let i = 0; i < this.snImgList.length; i++) {
        this.snImgList[i].sort = i + 1;
      }
      console.log("触发改变")
      this.snImgList = [].concat(this.snImgList)
      this.form.houseRentImages = this.fullImagesList
      let params = {};
      params = JSON.parse(JSON.stringify(this.form));
      houseApi
        .saveHouseRent(params)
        .then(response => {
          this.$Message.success("录入房源成功");
          this.$store.commit("removeTag", "agentRentHouseAdd");
          this.$router.push({
            name: "agentRentHouseManage"
          });
        })
        .catch(error => {
          console.log(error.response.data);
          if (error.response.data.code == 20404) {
            this.$Message.error({
              content: "出租房源发布数量超出限制",
              duration: 2
            });
          }
          if (error.response.data.code == 20423) {
            this.$Message.error({
              content: "房源标题或房源描述含有敏感词，请检查！",
              duration: 2
            });
          }
        });
    },
    remoteMethod(query) {
      query = _.trim(query)
      if (query !== "") {
        this.ncLoading = true;
        houseApi
          .listHousingProject({
            projectName: query
          })
          .then(response => {
            this.ncLoading = false;
            this.ncOptions = response.data.data.data;
          });
      } else {
        this.ncOptions = [];
      }
    },
    //户型图片上传
    upLoadHx(res, file, fileList) {
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
    upLoadHxLoading() {
      this.hxLoading = true;
    },
    //室内图片上传
    upLoadroom(res, file, fileList) {
      //录入页默认第一张为标题图
      file.name = res.data.hash;
      file.imageType = 2; //* 图片类型，图片类型(1-标题图，2-室内图，3-室外图，4-户型图)
      file.imagePath = res.data.key; //*
      file.imageTitle = ""; // 标题
      file.imageDesc = ""; // 描述
      file.flag = 0; //* 0不设置标题图，1设置为标题图
      file.isDel = 0; // 0不删除，1删除 删除的时候必传
      this.snImgList.push(file);
      this.roomLoading = false;
    },
    upLoadroomLoading() {
      this.roomLoading = true;
    },
    //小区图片上传
    upLoadxq(res, file, fileList) {
      file.name = res.data.hash;
      file.imageType = 3; //* 图片类型，图片类型(2-室内图，3-室外图，4-户型图)
      file.imagePath = res.data.key; //*
      file.imageTitle = ""; // 标题
      file.imageDesc = ""; // 描述
      file.flag = 0; //* 0不设置标题图，1设置为标题图
      file.isDel = 0; // 0不删除，1删除 删除的时候必传
      this.xqImgList.push(file)
      this.xqLoading = false;
    },
    upLoadxqLoading() {
      this.xqLoading = true;
    },
    //删除原有图片
    delPic(file, list) {
      if (file.flag === 1) {
        this.isFlag = false
      }
      list.splice(list.indexOf(file), 1)
    },
    //设为标题图片
    setTitPic(file) {
      this.snImgList.map(x => {
        if (x.imagePath == file.imagePath) {
          // x.flag = 1;
          file.flag = 1
          this.$set(this.snImgList, this.snImgList.indexOf(file), file)
        } else {
          x.flag = 0;
          this.$set(this.snImgList, this.snImgList.indexOf(x), x)
        }
        return x;
      });
    },
    //获取朝向列表
    getforward() {
      houseApi
        .listHouseTowards()
        .then(response => {
          this.forwardList = response.data.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getfitment() {
      houseApi
        .listHouseFitment()
        .then(response => {
          this.fitmentList = response.data.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getpayMode() {
      houseApi
        .listRentHousePayMode()
        .then(response => {
          this.payModeList = response.data.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取标签
    getrentTagsList() {
      houseApi
        .listRentHouseHouseTags()
        .then(response => {
          this.rentTagsList = response.data.data.data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    //获取经纪人信息
    getAgentBaseInfo() {
      api.getAgentBaseInfo().then(response => {
        if (response.data.data.corpName === '我爱我家') {
          this.isCheckNum = true;
        }
      });
    },
    //改变验证规则
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
    // 配套设施全选
    supportAll() {
      this.checkAll = !this.checkAll;
      if (this.checkAll) {
        this.form.supportingFacilities = ["床", "洗衣机", "空调", "热水器", "网络", "冰箱", "电视", "煤气", "暖气", "微波炉", "衣柜", "沙发", "桌子", "椅子", "智能锁"]
      } else {
        this.form.supportingFacilities = [];
      }
    },
    supportChange(data) {
      if (data.length === 15) {
        this.checkAll = true;
      } else if (data.length > 0) {
        this.checkAll = false;
      } else {
        this.checkAll = false;
      }
    }
  },
  created() {
    this.getAgentBaseInfo();
    this.getforward();
    this.getfitment();
    this.getpayMode();
    this.getrentTagsList();
  },
  mounted() {
    this.$dragging.$on('dragged', ({
      value
    }) => {
      // console.log(value.item)
      console.log(value.list)
      this.sortList = value.list
      // console.log(value.key)
    })
    this.$dragging.$on('dragend', () => {
      this.snImgList = this.sortList
      console.log("排序结束")
      console.log(this.snImgList)
    })
  },
  computed: {
    fullImagesList() {
      return [...this.snImgList, ...this.hxImgList, ...this.xqImgList]
    }
  },
  watch: {
    "snImgList": {
      handler: function (val, oldVal) {
        console.log(this.snImgList)
        if (this.isFlag) {
          return
        } else {
          if (this.snImgList.length > 0) {
            this.snImgList.map(x => {
              if (x.flag === 1) {
                this.isFlag = true
              }
            })
            if (this.isFlag) {
              return
            } else {
              this.snImgList[0].flag = 1,
                this.isFlag = true
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