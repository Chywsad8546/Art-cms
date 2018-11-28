<template>
  <Form :label-width="60" class="imgWidthCont">
    <Tabs>
      <TabPane label="内容">
        <Row class="navdhName">

          <Col span="24">
          <Checkbox v-model="share.isCheckSingle">隐藏表单</Checkbox>
          </Col>
          <Col span="24" v-if="share.formImgUrl && share.isCheckSingle === true">
          <div class="demo-upload-list">
            <img :src="share.formImgUrl">
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(share.formImgUrl)"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove(2)"></Icon>
            </div>
          </div>
          </Col>
          <Col span="24">
          <Upload v-if="share.isCheckSingle === true" ref="upload" class="uploadWidth" action="cmsapi/upload/uploadimgNoDomainExt"
            :default-file-list="share.defaultList" :format="['jpg','jpeg','png']" :on-success="uploadFormSuccess"
            :on-format-error="uploadFormFormatError" :show-upload-list="false" style="margin-top:10px;">
            <Button style="width:270px;" type="ghost">添加图片</Button>
          </Upload>
          </Col>
        </Row>

        <Row class="navdhName">
          <Col span="24">
          <Select v-model="share.formSelect" @on-change="formSelectClick">
            <Option v-for="item in share.formList" :value="item._id" :key="item._id">
              {{item.title}}
            </Option>
          </Select>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <div v-if="share.url != ''">
            <span style="margin-right:10px;">链接到 {{share.url}}</span>
            <a v-if="share.url != ''" @click="share.navVisible = true">
              编辑
            </a>
          </div>

          <Card style="width:290px;border:0px;">
            <a @click="newlyForm">
              <Icon type="plus-round"></Icon>
              新建表单
            </a>
            <a href="#" slot="extra" @click.prevent="changeLimit">
              <Icon type="ios-loop-strong" :class="loading == true ? 'demo-spin-icon-load' : ''"></Icon>
            </a>
            <br />
            <br />
            <a v-if="share.formRender.length>0" @click="isCheckbox = true">
              <Icon type="plus-round"></Icon>
              新建隐藏表单
            </a>
          </Card>
          </Col>
        </Row>

        <Modal title="隐藏表单设置" ok-text="保存" @on-ok="formAdd('formHideValidate')" :loading="ModalLoading" v-model="isCheckbox">

          <Row style="height:50px; text-align:center;border:1px solid #ececec;" type="flex" justify="center" align="middle">
            <Col span="10">name</Col>
            <Col span="10">value</Col>
            <Col span="4">操作</Col>
          </Row>
          <Row v-for="item,index in share.formHideList" style="height:50px; text-align:center;border:1px solid #ececec;"
            type="flex" justify="center" align="middle">
            <Col span="10"><Input v-model="item.name" disabled style="width:120px;" placeholder="请输入表单名称"></Input></Col>
            <Col span="10">
            <Input v-model="item.value" style="width:120px;" placeholder="请输入表单名称"></Input>
            </Col>
            <Col span="4">
            <Icon @click="delOptionList(item)" style="font-size:20px;" type="ios-trash-outline"></Icon>
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

      </TabPane>
      <TabPane label="样式">

        <Collapse v-model="foldpanelKey1" style="margin-bottom:10px;">
          <Panel name="1">
            边距
            <p slot="content">

              <FormItem label="顶">
                <Slider v-model="share.top" show-input></Slider>
              </FormItem>
              <FormItem label="右">
                <Slider v-model="share.right" show-input></Slider>
              </FormItem>
              <FormItem label="底">
                <Slider v-model="share.bottom" show-input></Slider>
              </FormItem>
              <FormItem label="左">
                <Slider v-model="share.left" show-input></Slider>
              </FormItem>

            </p>
          </Panel>
        </Collapse>
        <Collapse v-model="foldpanelKey2" style="margin-bottom:10px;">
          <Panel name="1">
            文字
            <p slot="content">

              <Row>
                <Col span="12"><Input v-model="share.fontColor"></Input></Col>
                <Col span="12">
                <ColorPicker v-model="share.fontColor" style="margin-left:10px;" size="default" recommend />
                </Col>
              </Row>

            </p>
          </Panel>
        </Collapse>
        <Collapse v-model="foldpanelKey3" style="margin-bottom:10px;">
          <Panel name="1">
            背景
            <p slot="content">
              <Row v-if="share.Imgurl">
                <Col span="24">
                <div class="demo-upload-list">
                  <img :src="share.Imgurl">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(share.Imgurl)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(1)"></Icon>
                  </div>
                </div>
                </Col>
              </Row>
              <Row v-if="share.Imgurl == ''">
                <Col span="24">
                <Upload ref="upload" class="uploadWidth" action="cmsapi/upload/uploadimgNoDomainExt" :format="['jpg','jpeg','png']"
                  :on-success="uploadSuccess" :on-format-error="uploadFormatError" :show-upload-list="false">
                  <Button style="width:270px;" type="ghost">添加图片</Button>
                </Upload>
                </Col>
              </Row>
              <Row v-if="share.Imgurl" style="margin-top:10px;">
                <Col span="24">
                <FormItem label="横向">
                  <Select v-model="share.horizontalDir" @on-change='horizonChange'>
                    <Option value="1">适配</Option>
                    <Option value="2">重复</Option>
                    <Option value="3">居中</Option>
                  </Select>
                </FormItem>
                </Col>
              </Row>
              <Row v-if="share.Imgurl">
                <Col span="24">
                <FormItem label="纵向">
                  <Select v-model="share.verticalDir" @on-change='verticalChange'>
                    <Option value="1">适配</Option>
                    <Option value="2">重复</Option>
                    <Option value="3">居中</Option>
                    <Option value="4">置顶</Option>
                  </Select>
                </FormItem>
                </Col>
              </Row>

              <Row style="margin-top:10px;">
                <Col span="4" style="height:30px;line-height:30px;"><span>背景色</span></Col>
                <Col span="10"><Input v-model="share.backColor"></Input></Col>
                <Col span="10">
                <ColorPicker v-model="share.backColor" style="margin-left:10px;" size="default" recommend />
                </Col>
              </Row>

            </p>
          </Panel>
        </Collapse>
        <Collapse v-model="foldpanelKey4" style="margin-bottom:10px;">
          <Panel name="1">
            按钮颜色
            <p slot="content">
              <Row>
                <Col span="24">
                <FormItem label="宽度">
                  <Slider v-model="share.clickWidth" show-input></Slider>
                </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                <FormItem label="高度">
                  <Slider v-model="share.clickHeight" show-input></Slider>
                </FormItem>
                </Col>
              </Row>
              <Row style="margin-top:10px;">
                <Col span="4" style="height:30px;line-height:30px;"><span>圆角</span></Col>
                <Col span="20"><Input v-model="share.radius"></Input></Col>
              </Row>
              <Row style="margin-top:10px;">
                <Col span="4" style="height:30px;line-height:30px;"><span>按钮色</span></Col>
                <Col span="10"><Input v-model="share.clickColor"></Input></Col>
                <Col span="10">
                <ColorPicker v-model="share.clickColor" style="margin-left:10px;" size="default" recommend />
                </Col>
              </Row>
              <Row style="margin-top:10px;">
                <Col span="4" style="height:30px;line-height:30px;"><span>文字色</span></Col>
                <Col span="10"><Input v-model="share.clickFontColor"></Input></Col>
                <Col span="10">
                <ColorPicker v-model="share.clickFontColor" style="margin-left:10px;" size="default" recommend />
                </Col>
              </Row>
            </p>
          </Panel>
        </Collapse>
      </TabPane>
    </Tabs>
    <Modal title="View Image" v-model="visible">
      <img :src="imgViewUrl" v-if="visible" style="width: 100%">
    </Modal>
  </Form>
</template>

<script>
import api from '../../../../api/wysiwyg/main.js';
import { setTimeout } from 'timers';
export default {
    name: 'wys-img',
    data () {
        return {
            dataList: []
        };
    },
    methods: {
    },
    created: function () {
    },
    mounted () {
    }
};
</script>

<style scoped>
.navdhFont {
  font-size: 20px;
  border-top: 1px solid #cccccc;
  margin-right: 20px;
  padding-top: 10px;
}
.navdhName {
  margin-top: 20px;
  padding-right: 20px;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-upload-list {
  display: inline-block;
  width: 279px;
  text-align: center;
  line-height: 176px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
<stage-template>

</stage-template>
<stage-javascript type="text/javascript">

</stage-javascript>

<stage-css>

</stage-css>