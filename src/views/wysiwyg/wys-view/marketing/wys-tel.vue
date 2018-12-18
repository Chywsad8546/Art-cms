<template>
    <Form :label-width="60" class="imgWidthCont">
        <Tabs>
            <TabPane label="内容">
                <Row style="margin-top:10px;">
                    <Col span="5" style="height:30px;line-height:30px;"><span>文本</span></Col>
                    <Col span="15"><Input v-model="share.clickTest"></Input></Col>
                </Row>
                <Row style="margin-top:10px;">
                    <Col span="5" style="height:30px;line-height:30px;"><span>电话号码</span></Col>
                    <Col span="15"><Input v-model="share.clickTel"></Input></Col>
                </Row>
            </TabPane>
            <TabPane label="样式">
                <Collapse v-model="foldpanelKey4" style="margin-bottom:10px;">
                    <Panel name="1">
                        样式调整
                        <p slot="content">

                            <RadioGroup v-model="share.styleList">
                                <Radio label="clickStyle1">
                                    <span><img src="http://wap-qn.toutiaofangchan.com/adideas/5d895ba28ede493d9e418a417a03c33c.png" /></span>
                                </Radio>
                                <Radio label="clickStyle2">
                                    <span><img src="http://wap-qn.toutiaofangchan.com/adideas/cbc8841bb9784bc9bf5194bd7eb6952d.png" /></span>
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
                                <Upload ref="upload" class="uploadWidth" :action="$domain.uploadFile"
                                    :format="['jpg','jpeg','png']" :on-success="uploadSuccess" :on-format-error="uploadFormatError"
                                    :show-upload-list="false">
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
                                <ColorPicker v-model="share.backColor" style="margin-left:10px;" size="default"
                                    recommend />
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
                                <ColorPicker v-model="share.clickColor" style="margin-left:10px;" size="default"
                                    recommend />
                                </Col>
                            </Row>
                            <Row style="margin-top:10px;">
                                <Col span="4" style="height:30px;line-height:30px;"><span>文字色</span></Col>
                                <Col span="10"><Input v-model="share.clickFontColor"></Input></Col>
                                <Col span="10">
                                <ColorPicker v-model="share.clickFontColor" style="margin-left:10px;" size="default"
                                    recommend />
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
                clickTest: '拨打电话',
                clickTel: '',
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
            <a href="tel: {{@ share.clickTel }}">
               
       {{if share.styleList=='clickStyle1'}}        
                <div class="btn-i" style="border-radius: <%= share.radius %>px; background-color: <%= share.clickColor %> !important; color: <%= share.clickFontColor %>; height: <%= share.clickHeight %>px;  margin: 0 auto; line-height: <%= share.clickHeight %>px; width: <%= share.clickWidth %>%;">
                <i><img style="width:25px;" src="http://wap-qn.toutiaofangchan.com/adideas/75701d8abb1a46cd801cab24297975f8.png" /></i>
                {{@ share.clickTest }}
                </div>
        {{else}}
                <div class="btn-i" style="border-radius: 50%; background-color: <%= share.clickColor %> !important; color: <%= share.clickFontColor %>;  width: 56px; height:56px; margin: 0 auto;">
                <i><img style="width:40px;margin-top: 13px;" src="http://wap-qn.toutiaofangchan.com/adideas/d1e46ccfebfc4d5883ad3b7f94289b4a.png" /></i>
                </div>
        {{/if}} 
            </a>
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
</stage-javascript>
<stage-css>

</stage-css>