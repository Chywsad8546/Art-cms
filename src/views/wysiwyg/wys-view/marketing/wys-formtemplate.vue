<style lang="less">
@import '../../../main.less';
@import '../../../../styles/common.less';
@import '../../../../styles/table.less';
@import '../../../../styles/css.less';
@import '../../../../../node_modules/dragula/dist/dragula.css';
img {
  max-width: 100%;
  height: auto;
  border: none;
  interpolation-mode: bicubic;
  vertical-align: middle;
}
.wysi_active {
  border: 1px solid #71a5f5;
}
.wysi_hrive {
  border: 1px solid #71a5f5;
}
.gu-mirror {
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  opacity: 1;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
  filter: alpha(opacity=100);
}
.gu-hide {
  display: none !important;
}
.gu-unselectable {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}
.gu-transit {
  opacity: 1;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
  filter: alpha(opacity=100);
}
.wys-main {
  width: 1920px;
  height: 100%;
  background: #ffffff;
}
.wys-menu-left {
  width: 260px;
  overflow: hidden;
  float: left;
  background: #ffffff;
  box-sizing: border-box;
  height: 95%;
}
.wys-content {
  float: left;
  box-sizing: border-box;
  min-width: 400px;
  position: relative;
  max-height: 100%;
  height: 100%;
}
.wys-isscrll {
  padding: 0px 360px 0 360px;
  overflow: auto;
  background: #f2f3f4;
  max-height: 100%;
  height: 100%;
}
.wys-contentOver {
  width: 375px;
  height: 100%;
  text-align: center;
  background: #ffffff;
  overflow: hidden;
}
/*滚动条样式*/
.wys-isscrll::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.wys-isscrll::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #cacbcb;
}
.wys-isscrll::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: #edeeef;
}
.wys_title {
  position: absolute;
  top: -40px;
  left: 0;
  width: 160px;
  text-align: center;
  line-height: 40px;
  border-radius: 10px 10px 0 0;
  height: 40px;
  background: #f2f3f4;
  z-index: 10;
}
.workarea-main {
  border-left: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  position: relative;
  height: 100%;
  background-color: #f2f3f4;
  margin: 0 320px 0 260px;
  padding-bottom: 1px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  min-width: 620px;
}
.workarea-stage {
  position: relative;
  top: 10px;
  height: 100%;
  overflow: hidden;
}
.phone-box {
  position: relative;
  width: 100%;
  height: 100%;
  padding-left: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.phone-wrapper {
  position: relative;
  overflow: visible;
  box-sizing: content-box;
  width: 340px;
  margin: 0 auto 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.phone-wrapper .signal-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 320px;
  height: 43px;
  z-index: 10;
  background: #222;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.wys-edit-right {
  position: absolute;
  background-color: #fff;
  box-shadow: 3px 3px 5px hsla(0, 4%, 69%, 0.1);
  display: none;
  box-sizing: border-box;
  bottom: 0;
}
#right {
  display: block;
  width: 320px;
  padding-left: 20px;
  box-sizing: border-box;
  top: 0;
  right: 0;
}
#main {
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 2px;
}
.layout.edit {
  margin: 0 auto;
  min-height: calc(100% - 66px);
  min-width: 1200px;
  box-sizing: border-box;
  height: auto;
}
.phone-wrapper .screen-border {
  position: relative;
  top: 43px;
  width: 375px;
  height: 625px;
  background-color: #fff;
}
.phone-wrapper .workarea {
  overflow-x: hidden;
  overflow-y: overlay;
  box-sizing: border-box;
  width: 330px;
  height: 524px;
  background: transparent;
}
.phone-wrapper .workarea::-webkit-scrollbar {
  display: none;
}
.operate-bar-wrap {
  float: right;
  position: relative;
}
.operate-bar {
  padding: 8px 25px 13px;
  height: 32px;
  box-sizing: content-box;
}
.operate-bar .btn {
  font-size: 14px;
  color: #222;
  padding: 0 8px 0 0;
  position: relative;
  display: -ms-inline-flexbox;
  display: inline-flex;
  cursor: pointer;
  -ms-flex-align: center;
  align-items: center;
  line-height: 20px;
  color: #444;
}
.btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  max-height: 38px;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 9px 16px;
  font-size: 14px;
  line-height: 1.42857143;
  border-radius: 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.wysiwyg_rightScroll {
  box-sizing: border-box;
  height: 85%;
  overflow-y: overlay;
  overflow-x: hidden;
}
.wysiwyg-leftIcon {
  width: 64px;
  height: 90px;
  float: left;
  margin-left: 15px;
  text-align: center;
}
.wysiwyg-contitle {
  font-size: 16px;
  padding-left: 20px;
  margin: 10px 0 10px 0;
}
.wysiw_form_Tab {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #2d8cf0;
  font-size: 16px;
}
.wys-header-left {
  background: #ffffff;
}
</style>

<template>
    <div style="height:100%">
        <div class="wys-header">
            <div class="wys-header-left"><img src="http://wap-qn.toutiaofangchan.com/adideas/4fa0cb767c5a42e7af2aa85003704eb1.jpg" />
            </div>
            <div class="wys-header-content"></div>
        </div>
        <div id="main" class="layout edit">
            <div class="wys-menu-left">
                <div id="wysiwyg_componentbox">
                    <div class="wysiw_form_Tab">
                        表单
                    </div>
                </div>
            </div>
            <section id="middle" class="workarea-main">
                <Card>
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        新增表单
                    </p>
                    <a href="#" slot="extra" @click.prevent="backFormList">
                        表单列表
                    </a>
                    <div class="workarea-stage">
                        <div class="phone-box">

                            <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
                                <Row>
                                    <Col span="24">
                                    <FormItem label="表单名" prop="title">
                                        <Input v-model="formItem.title" :disabled="isdisabled" placeholder="请输入表单名称"></Input>
                                    </FormItem>
                                    </Col>
                                </Row>
                                <Row style="height:50px; text-align:center;border:1px solid #ececec;" type="flex"
                                    justify="center" align="middle">
                                    <Col span="5">字段名</Col>
                                    <Col span="10">类型</Col>
                                    <Col span="2">是否必填</Col>
                                    <Col span="2">是否唯一</Col>
                                    <Col span="5">操作</Col>
                                </Row>
                                <Row v-for="item,index in formArr" :gutter="16" type="flex" justify="center" align="middle"
                                    style="height:50px; text-align:center">
                                    <Col span="5"><Input v-model="item.label" :disabled="isdisabled" placeholder="字段名称"></Input></Col>
                                    <Col span="10">
                                    <Select v-model="item.type" :disabled="isdisabled" @on-change="formSelectClick(item)"
                                        style="width:100px;">
                                        <Option v-for="items in inputTypeList" :value="items.value" :key="items.value">{{
                                            items.label }}</Option>
                                    </Select>
                                    <Button v-if="item.type == 'checkbox' || item.type == 'select'|| item.type == 'radio'"
                                        @click="formSelectClick(item)" :disabled="isdisabled" style="width:100px;" type="primary">设置多选数据</Button>
                                    <Modal title="选项设置" ok-text="保存" @on-ok="preserOption(item)" v-model="item.isCheckbox">
                                        <Row style="height:50px; text-align:center;border:1px solid #ececec;" type="flex"
                                            justify="center" align="middle">
                                            <Col span="8">序号</Col>
                                            <Col span="8">选项名</Col>
                                            <Col span="8">操作</Col>
                                        </Row>
                                        <Row v-for="optItem,index in optionArr" style="height:50px; text-align:center;border:1px solid #ececec;"
                                            type="flex" justify="center" align="middle">
                                            <Col span="8">{{index+1}}</Col>
                                            <Col span="8"><Input v-model="optItem.name" placeholder="请输入表单名称"></Input></Col>
                                            <Col span="8">
                                            <Icon @click="delOptionList(optItem)" style="font-size:20px;" type="ios-trash-outline"></Icon>
                                            </Col>
                                        </Row>
                                        <Row style="height:50px; margin-top:20px;">
                                            <Col span="24">
                                            <Button style="border:1px solid #60A3F5;color:#60A3F5" @click="addOptionList">
                                                <Icon type="plus-round"></Icon>增加一项
                                            </Button>
                                            </Col>
                                        </Row>
                                    </Modal>
                                    </Col>
                                    <Col span="2">
                                    <Checkbox :disabled="isdisabled" v-model="item.isMandatory"></Checkbox>
                                    </Col>
                                    <Col span="2">
                                    <Checkbox :disabled="isdisabled" v-model="item.isOnly"></Checkbox>
                                    </Col>
                                    <Col span="5">
                                    <Icon type="arrow-down-c" @click="moveDown(index,item)" style="font-size:20px; margin-right:10px;"></Icon>
                                    <Icon type="arrow-up-c" @click="moveUp(index,item)" style="font-size:20px; margin-right:10px;"></Icon>
                                    <Icon @click="deleteList(item)" style="font-size:20px;" type="ios-trash-outline"></Icon>
                                    </Col>
                                </Row>
                                <Row type="flex" :gutter="16" justify="center" align="middle" style="height:50px; text-align:center">
                                    <Col span="5"><Input v-model="bottomName" placeholder="请输入按钮名称"></Input></Col>
                                    <Col span="10">提交按钮</Col>
                                    <Col span="2">
                                    </Col>
                                    <Col span="2">
                                    </Col>
                                    <Col span="5">
                                    </Col>
                                </Row>
                                <Row style="height:50px;">
                                    <Col span="24">
                                    <Button style="border:1px solid #60A3F5;color:#60A3F5" :disabled="isdisabled"
                                        @click="addForm">
                                        <Icon type="plus-round"></Icon>增加一项
                                    </Button>
                                    </Col>
                                </Row>
                                <Row style="height:50px; text-align:right;padding-right:20px;">
                                    <Col span="24">
                                    <Button type="primary" :disabled="isdisabled" @click="addJsonPush">创建完成</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>

                </Card>
            </section>
            <div id="right" class="wys-edit-right">
                <div class="wysiwyg_rightScroll">
                    <div class="form-preview">
                        <div class="device">
                            <div class="screen">
                                <template v-for="(item,index) in formArr">

                                    <div v-if="item.type == 'select'" class="input-group-i">
                                        <span class="input-group-addon-i">
                                            {{item.label}}
                                        </span>
                                        <select class="form-control select-list">
                                        </select>
                                    </div>
                                    <div v-else>
                                        <div v-if="item.type == 'radio' || item.type == 'sex' || item.type == 'checkbox'"
                                            class="input-group-i">
                                            <span class="input-group-addon-i">
                                                {{item.label}}
                                            </span>
                                            <span class="radio-item" v-for="ridItem in item.optionArr">
                                                <input class="disabled" type="radio" disabled="">
                                                {{ridItem.name}}
                                            </span>
                                        </div>
                                        <div v-else class="input-group-i">
                                            <span class="input-group-addon-i">
                                                {{item.label}}
                                            </span>
                                            <div v-if="item.optionArr.length>0">
                                                <input :type="item.optionArr[0].name" class="form-control form-input-i name">
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <div style="text-align:center;width:100%;">
                                    <Button type="primary">{{bottomName}}</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<style>
.form-preview .device {
  width: 240px;
  height: 440px;
  background-image: url(http://wap-qn.toutiaofangchan.com/adideas/fbb1e06f20cf4c6388ac409de1fe8adf.png);
  background-size: cover;
  margin: 10px;
}
.form-preview .screen {
  width: 320px;
  height: 445px;
  padding-top: 20px;
  margin: 0;
  transform: translate(-40px, -8px) scale(0.7);
  background-color: #fff;
  overflow: auto;
}
.form-preview .screen .input-group-i {
  padding: 5px 18px;
  position: relative;
  border-collapse: separate;
}
.form-control {
  display: block;
  width: 100%;
  height: 35px;
  padding: 9px 16px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #222;
  background-color: #fff;
  background-image: none;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  -webkit-transition: border-color ease-in-out 0.15s,
    box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.form-preview .screen .form-preview-radio .radio-item {
  margin-right: 10px;
}
</style>

<script>
import api from '../../../../api/wysiwyg/main.js';
export default {
    data () {
        return {
            bottomName: '立即提交',
            isCheckbox: false,
            formNum: 1,
            isdisabled: false,
            formItem: {

            },
            formbottonArr: {},
            formArr: [
                {
                    name: 'formName_0',
                    label: '姓名',
                    type: 'name',
                    optionArr: [{
                        name: 'text'
                    }],
                    isMandatory: true,
                    isOnly: true,
                    isCheckbox: false
                },
                {
                    name: 'formName_1',
                    label: '电话',
                    type: 'tel',
                    optionArr: [{
                        name: 'text'
                    }],
                    isMandatory: true,
                    isOnly: true,
                    isCheckbox: false
                }
            ],
            subFormArr: [],
            inputTypeList: [
                {
                    value: 'name',
                    type: 'text',
                    label: '姓名'
                },
                {
                    value: 'tel',
                    type: 'number',
                    label: '电话'
                },
                {
                    value: 'email',
                    type: 'email',
                    label: '邮箱'
                },
                {
                    value: 'sex',
                    type: ['男', '女'],
                    label: '性别'
                },
                {
                    value: 'date',
                    type: 'date',
                    label: '日期'
                },
                {
                    value: 'text',
                    type: 'text',
                    label: '文本'
                },
                {
                    value: 'textarea',
                    type: 'textarea',
                    label: '多文本'
                },
                {
                    value: 'select',
                    type: [],
                    label: '下拉'
                },
                {
                    value: 'radio',
                    type: [],
                    label: '单选'
                },
                {
                    value: 'checkbox',
                    type: [],
                    label: '多选'
                }
            ],
            optionArr: [
                {
                    name: '选项1'
                },
                {
                    name: '选项2'
                }
            ],
            ruleValidate: {
                title: [
                    { required: true, message: '请输入表单名称', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        addForm () {
            this.formArr.push({ name: this.create_name(), label: '', type: 'text', optionArr: [{ name: 'text' }], isMandatory: false, isOnly: false, isCheckbox: false });
        },
        addOptionList () {
            this.optionArr.push({ name: '新增选项' });
        },
        preserOption (item) {
            item.optionArr = this.optionArr;
        },
        deleteList (item) {
            let index = this.formArr.indexOf(item);
            this.formArr.splice(index, 1);
        },
        delOptionList (item) {
            let index = this.optionArr.indexOf(item);
            this.optionArr.splice(index, 1);
        },
        backFormList () {
            this.$router.push({
                name: 'newlybuildFormList'
            });
        },
        formSelectClick (item) {
            item.optionArr = [];
            if (item.type == 'checkbox' || item.type == 'radio' || item.type == 'select') {
                item.isCheckbox = true;
            }
            if (item.type === 'name' || item.type === 'text') {
                item.optionArr.push({ name: 'text' });
            }
            if (item.type === 'tel') {
                item.optionArr.push({ name: 'number' });
            }
            if (item.type === 'email') {
                item.optionArr.push({ name: 'email' });
            }
            if (item.type === 'date') {
                item.optionArr.push({ name: 'date' });
            }
            if (item.type === 'textarea') {
                item.optionArr.push({ name: 'textarea' });
            }
            if (item.type === 'sex') {
                item.optionArr.push({ name: '男' }, { name: '女' });
            }
        },
        moveUp: function (index, item) {
            // 在上一项插入该项
            this.formArr.splice(index - 1, 0, (this.formArr[index]));
            // 删除后一项
            this.formArr.splice(index + 1, 1);
            if (index == 0) {
                alert('到顶啦！');
            }
        },
        moveDown: function (index, item) {
            // 在下一项插入该项
            this.formArr.splice(index + 2, 0, (this.formArr[index]));
            // 删除前一项
            this.formArr.splice(index, 1);
            if (index == this.formArr.length - 1) {
                alert('已经是最后一项啦！');
            }
        },
        addJsonPush () {
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    this.subFormArr = JSON.stringify(this.formArr);
                    this.formbottonArr = JSON.stringify({
                        name: this.create_name(),
                        label: this.bottomName,
                        type: 'botton',
                        optionArr: [{
                            name: 'submit'
                        }],
                        isMandatory: true,
                        isOnly: true,
                        isCheckbox: false
                    });
                    api.saveDiyFormStructure({
                        title: this.formItem.title,
                        form: this.subFormArr,
                        formBotton: this.formbottonArr
                    }).then(response => {
                        this.$Message.success('添加成功');
                        this.$router.push({
                            name: 'newlybuildFormList'
                        });
                    });
                } else {
                    this.$Message.error('Fail!');
                }
            });
        },
        create_name () {
            this.formNum = this.formNum + 1;
            return 'formName_' + this.formNum; // 生成变量名
        }
    },
    mounted () {
    },
    created () {
        if (this.$route.query.id) {
            this.formArr = [];
            this.isdisabled = true;
            api.getDiyFormStructure({
                id: this.$route.query.id
            }).then(response => {
                this.formItem.title = response.data.data.data[0].title;
                this.formArr = JSON.parse(response.data.data.data[0].form);
                console.log(response.data.data.data[0].form);
            });
        }
    }
};
</script>
