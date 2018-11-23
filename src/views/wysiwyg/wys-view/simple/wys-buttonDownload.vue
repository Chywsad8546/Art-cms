<template>
  <Form :label-width="60" class="imgWidthCont">
    <Tabs>
      <TabPane label="内容">
        <Row>
          <Col span="20">
          <FormItem label="文本">
            <Input v-model="share.clickTest" placeholder="按钮内容 "></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Row>
            <Col span="24" style="line-height: 38px">Android链接</Col>
          </Row>
          <Modal title="URL" v-model="share.navVisible">
            <FormItem label="链接地址" v-if="share.navVisible">
              <Input v-model="share.url" placeholder="http://"></Input>
            </FormItem>
          </Modal>
        </Row>
        <Row>
          <textarea style="width: 280px; height: 100px" v-model="share.androidUrl"></textarea>
        </Row>
        <Row>
          <Col span="12" style="line-height: 38px">IOS链接</Col>
          <textarea style="width: 280px; height: 100px" v-model="share.iosUrl"></textarea>
        </Row>
      </TabPane>
      <TabPane label="样式">
        <Collapse v-model="foldpanelKey4" style="margin-bottom:10px;">
          <Panel name="1">
            样式调整
            <p slot="content">

              <RadioGroup v-model="share.styleList">
                <Radio label="clickStyle1">
                  <span><img src="http://wap-qn.toutiaofangchan.com/adideas/5b878a776f614fa0bf9835930d6c8b93.png" /></span>
                </Radio>
                <Radio label="clickStyle2">
                  <span><img src="http://wap-qn.toutiaofangchan.com/adideas/ce226b4491cd401691d6837d624ad311.png" /></span>
                </Radio>
              </RadioGroup>

            </p>
          </Panel>
        </Collapse>
        <Collapse v-model="foldpanelKey5" style="margin-bottom:10px;">
          <Panel name="1">
            展示效果
            <p slot="content">
              <Row style="margin-top:10px;">
                <Col span="24">
                <FormItem label="展示效果">
                  <Select v-model="share.effectType">
                    <Option value="1">默认效果</Option>
                    <Option value="2">顶部悬浮</Option>
                    <Option value="3">底部悬浮</Option>
                  </Select>
                </FormItem>
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
                    <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
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
        <Collapse v-model="foldpanelKey2" style="margin-bottom:10px;">
          <Panel name="1">
            基本
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
            share: {
                name: '链接文字',
                formSelect: '',
                navVisible: false,
                url: '',
                top: 10,
                right: 15,
                bottom: 10,
                left: 15,
                formList: [],
                formRender: [],
                formBottonRender: '',
                backColor: '',
                clickColor: '#F85959',
                fontColor: 'gray',
                Imgurl: '',
                horizontalDir: '1',
                verticalDir: '1',
                clickWidth: 100,
                clickHeight: 40,
                radius: 5,
                effectType: '1',
                clickTest: '下载',
                clickTel: '',
                iosUrl: '',
                androidUrl: '',
                styleList: 'clickStyle1',
                clickFontColor: '#FFFFFF',
                backImgStyle: 'background-size: 100% 100%; background-position: initial; background-repeat: no-repeat;'
            },
            loading: false,
            foldpanelKey1: '1',
            foldpanelKey2: '1',
            foldpanelKey3: '1',
            foldpanelKey4: '1',
            foldpanelKey5: '1',
            imgViewUrl: '',
            visible: false
        };
    },
    methods: {
        newlyForm () {
            this.$router.push({
                name: 'newlybuildForm'
                // query: { newsId: params.row.id }
            });
        },
        handleRemove () {
            this.share.Imgurl = '';
        },
        handleView (imgUrl) {
            this.imgViewUrl = imgUrl;
            this.visible = true;
        },
        horizonChange (value) {
            if (value == '1') {
                this.share.backImgStyle = 'background-size: 100% 100%; background-position: initial; background-repeat: no-repeat;';
            }
            if (value == '2') {
                this.share.backImgStyle = 'background-size: auto 100%; background-position: initial; background-repeat: repeat-x;';
            }
            if (value == '3') {
                this.share.backImgStyle = 'background-size: auto 100%; background-position-x: 50%; background-position-y: initial; background-repeat: no-repeat; ';
            }
        },
        verticalChange (value) {
            if (value == '1') {
                this.share.backImgStyle = 'background-size: 100% 100%; background-position: initial; background-repeat: no-repeat;';
            }
            if (value == '2') {
                this.share.backImgStyle = 'background-size: auto; background-position-x: 50%; background-position-y: initial; background-repeat: repeat-y; ';
            }
            if (value == '3') {
                this.share.backImgStyle = 'background-size: auto; background-position: 50% 50%; background-repeat: no-repeat;';
            }
            if (value == '4') {
                this.share.backImgStyle = 'background-size: auto; background-position: 50% 0%; background-repeat: no-repeat;';
            }
        },
        formSelectClick (value) {
            this.share.formList.forEach(item => {
                if (item._id === value) {
                    this.share.formRender = JSON.parse(item.form);
                    this.share.formBottonRender = JSON.parse(item.formBotton);
                }
            });
        },
        getDiyFormStructure () {
            api.getDiyFormStructure().then(response => {
                this.share.formList = response.data.data;
                this.loading = false;
            });
        },
        changeLimit () {
            this.loading = true;
            var _self = this;
            setTimeout(function () {
                _self.init();
            }, 500);
        },
        uploadSuccess (res, file) {
            if (res.code === 'success') {
                this.share.Imgurl = res.data.url;
            } else {
                this.$Notice.error({
                    title: '上传失败',
                    desc: res.data.url
                });
            }
        },
        uploadFormatError (file) {
            this.$Notice.error({
                title: '不能上传此格式的文件',
                desc: ''
            });
        },
        init () {
            this.getDiyFormStructure();
        }
    },
    created: function () {
        this.init();
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
  height: 176px;
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
<div style="padding: {{@share.top}}px {{@share.right}}px {{@share.bottom}}px {{@share.left}}px; background:<%= share.backColor %>;<%= share.backImgStyle %> background-image: url(<%= share.Imgurl %>);">
    <div validate="name" class="input-group-i" style="text-align:center;font-size:14px;">           
       {{if share.styleList=='clickStyle1'}}        
                <div class="btn-i" style="border-radius: <%= share.radius %>px; background-color: <%= share.clickColor %> !important; color: <%= share.clickFontColor %>; height: <%= share.clickHeight %>px;  margin: 0 auto; line-height: <%= share.clickHeight %>px; width: <%= share.clickWidth %>%;">
                {{@ share.clickTest }}
                </div>
        {{else}}
                <div class="btn-i" style="border-radius: 50%; background-color: <%= share.clickColor %> !important; color: <%= share.clickFontColor %>;  width: 56px; line-height:56px; height:56px; margin: 0 auto;">
                  {{@ share.clickTest }}
                </div>
        {{/if}} 
    </div>
</div>
</stage-template>
<stage-javascript type="text/javascript">
if(<%= share.effectType %> == 1){
 $t.attr("style","position: relative; width:100%; bottom:auto; top:auto;z-index:30;");
}
if(<%= share.effectType %> == 2){
    if($("#main").length >= 1){
       $t.attr("style","position: absolute; width:100%; bottom:auto; top:0;z-index:30;");
    }else{
        $t.attr("style","position: fixed; width:100%; bottom:auto; top:0;z-index:30;");
        
    }
}
if(<%= share.effectType %> == 3){
    if($("#main").length >= 1){
        $t.attr("style","position: absolute; width:100%; bottom:0; top:auto; z-index:30;");
      
    }else{
         $t.attr("style","position: fixed; width:100%; bottom:0; top:auto; z-index:30;");
    }
}

 const ua = window.navigator.userAgent.toLowerCase()
 $t.on("click",function(){
    if(ua.indexOf("iphone") !== -1){
     window.open("{{@share.iosUrl}}")
    } else {
      window.open("{{@share.androidUrl}}")
    }
 })
</stage-javascript>
<stage-css>
.form-piece .checkbox-addon, .form-piece .city-addon, .form-piece .date-addon, .form-piece .gender-addon, .form-piece .input-group-i .input-group-addon-i, .form-piece .radio-addon, .form-piece .select-addon, .form-piece .textarea-addon {
    font-size: 12px;
    text-align: center;
    line-height: 1;
    margin-bottom: 10px;
    color: <%= share.fontColor %>;
    display: inline-block;
}
.form-piece .checkbox-group, .form-piece .city-group, .form-piece .date-group, .form-piece .gender-group, .form-piece .input-group-i, .form-piece .radio-group, .form-piece .select-group, .form-piece .selectMulti-group, .form-piece .textarea-group {
    padding: 5px 18px;
    position: relative;
    border-collapse: separate;
}
.form-piece div, .form-piece span, div.form-piece, span.form-piece {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-text-size-adjust: none;
}
.form-piece .input-style {
    height: 40px;
    width: 100%;
    color: #555;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    padding: 6px 12px;
    display: block;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
}
.form-piece.label-style .checkbox-box, .form-piece.label-style .radio-box {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}
.form-piece.label-style .checkbox-box label, .form-piece.label-style .radio-box label {
    margin-right: 0!important;
    height: 32px;
    line-height: 30px;
    display: inline-block;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
}
.form-piece.label-style .gender-box .radio-item {
    width: calc(49% - 4px);
}
.form-piece.label-style .checkbox-box input[type=checkbox]:checked~span, .form-piece.label-style .checkbox-box input[type=radio]:checked~span, .form-piece.label-style .radio-box input[type=checkbox]:checked~span, .form-piece.label-style .radio-box input[type=radio]:checked~span {
    border-color: #ff5454;
    color: #ff5454;
}
.form-piece.label-style .checkbox-box input[type=checkbox]~span, .form-piece.label-style .checkbox-box input[type=radio]~span, .form-piece.label-style .radio-box input[type=checkbox]~span, .form-piece.label-style .radio-box input[type=radio]~span {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    display: block;
    padding: 0 9px;
    line-height: 30px;
    height: 32px;
    max-width: none;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    box-sizing: border-box;
    text-overflow: ellipsis;
}
.form-piece.label-style .checkbox-box input[type=checkbox], .form-piece.label-style .checkbox-box input[type=radio], .form-piece.label-style .radio-box input[type=checkbox], .form-piece.label-style .radio-box input[type=radio] {
    visibility: hidden;
    position: absolute;
}
.form-piece div, .form-piece span, div.form-piece, span.form-piece {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-text-size-adjust: none;
}
.form-piece div, .form-piece span, div.form-piece, span.form-piece {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-text-size-adjust: none;
}
.form-piece .input-style {
    height: 40px;
    width: 100%;
    color: #555;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    padding: 6px 12px;
    display: block;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
}
.form-piece .error {
    font-size: 12px;
    color: red;
}
.formlEmpty {
    height: 100px;
    line-height:100px;
    text-align: center;
}
</stage-css>