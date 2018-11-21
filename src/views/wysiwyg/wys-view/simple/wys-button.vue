<template>
  <Form :label-width='60'>
    <Tabs>
      <TabPane label="内容">
        <Row>
          <Col span="20">
          <FormItem label="文本">
            <Input v-model="share.buttontext" placeholder="按钮文本 "></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Row>
            <div href="" class="btn" @click="share.navVisible = true" style="">
              <Icon type="plus-round"></Icon>
              添加链接
            </div>
            </Col>
          </Row>
          <Modal title="URL" v-model="share.navVisible">
            <FormItem label="链接地址" v-if="share.navVisible">
              <Input v-model="share.url" placeholder="http://"></Input>
            </FormItem>
          </Modal>

          <p><strong>提示</strong></p>
          <p>1. 建议图片宽度在320至640之间;</p>
          <p>2. 图片大小不能超过1M; 支持jpg,jpeg,png,gif等格式;</p>
          <p>3. 作为按钮的图片宽高比不能低于3:1并且不能高于10:1</p>

        </Row>
      </TabPane>
      <TabPane label="样式">
        <Collapse simple style="overflow: -webkit-paged-y">
          <Panel name="1">
            样式调整
            <div slot="content" class="my-style">
              <RadioGroup v-model="share.buttonType" vertical>
                <Radio label="buttonType_1" style="height: 100px ">
                  <img src="http://wap-qn.toutiaofangchan.com/adideas/5b878a776f614fa0bf9835930d6c8b93.png">
                </Radio>
                <Radio label="buttonType_2" style="height: 100px ">
                  <img src="http://wap-qn.toutiaofangchan.com/adideas/cd2dbe33240248a78c1c5725843cd044.png">
                </Radio>
                <Radio label="buttonType_3" style="height: 100px ">
                  <img src="http://wap-qn.toutiaofangchan.com/adideas/ce226b4491cd401691d6837d624ad311.png">
                </Radio>
                <Radio label="buttonType_4" style="height: 100px ">
                  <img src="http://wap-qn.toutiaofangchan.com/adideas/b1e0b9cea36c44678932018550542bab.png">
                </Radio>
                <Radio label="buttonType_5" style="height: 100px ">
                  <img src="http://wap-qn.toutiaofangchan.com/adideas/70b4b07d65fb43fa9aaeca68d961b9d0.png">
                </Radio>
                <Radio label="buttonType_6" style="height: 100px ">
                  <img src="http://wap-qn.toutiaofangchan.com/adideas/f2ea77681b544f4f9d11ff969e59de0c.png">
                </Radio>
              </RadioGroup>
            </div>
          </Panel>
          <Panel name="2">
            基本
            <div slot="content" v-if="share.buttonType === 'buttonType_1' || share.buttonType === 'buttonType_2'">
              <FormItem label="宽度" slot="content">
                <Slider show-input v-model="share.buttonWidth"></Slider>
              </FormItem>
              <FormItem label="高度" slot="content">
                <Slider show-input v-model="share.buttonHeight"> </Slider>
              </FormItem>
            </div>
            <FormItem label="字体大小" slot="content">
              <Slider show-input v-model="share.fontSize"></Slider>
            </FormItem>
            <FormItem label="按钮颜色" slot="content" v-if="share.buttonType === 'buttonType_1' || share.buttonType === 'buttonType_2'">
              <Col span="17">
              <Input :placeholder="share.buttonColor" v-model="share.buttonColor">
              </Input>
              </Col>
              <Col span="1">
              <ColorPicker v-model="share.buttonColor" format="rgb" />
              </Col>
            </FormItem>
            <FormItem label="字体颜色" slot="content">
              <Col span="17">
              <Input :placeholder="share.fontColor" v-model="share.fontColor">
              </Input>
              </Col>
              <Col span="1">
              <ColorPicker v-model="share.fontColor" format="rgb" />
              </Col>
            </FormItem>
            <FormItem label="圆角" slot="content" v-if="share.buttonType === 'buttonType_1' || share.buttonType === 'buttonType_2'">
              <Slider show-input v-model="share.buttonRadius"> </Slider>
            </FormItem>
          </Panel>
          <Panel name="3">
            展示效果
            <FormItem label="展示效果" slot="content">
              <Select v-model="share.position">
                <Option value="default">默认位置</Option>
                <Option value="top">顶部悬浮</Option>
                <Option value="bottom"> 底部悬浮</Option>
              </Select>
            </FormItem>
          </Panel>
          <Panel name="4">
            背景
            <div slot="content">
              <FormItem label="背景色">
                <Col span="17">
                <Input :placeholder="share.backgroundColor" v-model="share.backgroundColor"></Input>
                </Col>
                <Col span="1">
                <ColorPicker v-model="share.backgroundColor" alpha />
                </Col>
              </FormItem>
              <FormItem>
                <div class="demo-upload-list" v-for="item in share.uploadList">
                  <img :src="item.url">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                  </div>
                </div>
              </FormItem>
              <FormItem v-if="share.uploadList.length>0">
                当前图片尺寸: {{share.imgInformation}}
              </FormItem>
              <FormItem v-if="share.uploadList.length == 0" label="背景图">
                <Row>
                  <Upload ref="upload" class="uploadWidth" action="cmsapi/upload/uploadimgNoDomainExt"
                    :default-file-list="share.defaultList" :format="['jpg','jpeg','png']" :on-success="uploadSuccess"
                    :on-format-error="uploadFormatError" :show-upload-list="false">
                    <Button type="ghost">添加图片</Button>
                  </Upload>
                </Row>
              </FormItem>
              <FormItem label="横向">
                <Select v-model="share.horizontalDir">
                  <Option value="adapt_hor">适配</Option>
                  <Option value="repeat_hor">重复</Option>
                  <Option value="center_hor">居中</Option>
                </Select>
              </FormItem>
              <FormItem label="纵向" v-model="share.verticalDir">
                <Select v-model="share.verticalDir">
                  <Option value="adapt_ver">适配</Option>
                  <Option value="repeat_ver">重复</Option>
                  <Option value="center_ver">居中</Option>
                  <Option value="top_ver">置顶</Option>
                </Select>
              </FormItem>
              <!-- <FormItem label="遮罩色" >
                <Col span="17">
                  <Input :placeholder="share.maskColor" v-model="share.maskColor"></Input>
                </Col>
                <Col span="1">
                  <ColorPicker v-model="share.maskColor" alpha  />
                </Col>
              </FormItem> -->
              <Modal title="View Image" v-model="visible">
                <img :src="imgUrl" v-if="visible" style="width: 100%">
              </Modal>
            </div>
          </Panel>
          <Panel name="5">
            边距
            <div slot="content">
              <FormItem label="顶">
                <Slider show-input v-model="share.buttonPaddingTop" :tip-format="format"> </Slider>
              </FormItem>
              <FormItem label="右">
                <Slider show-input v-model="share.buttonPaddingRight" :tip-format="format"> </Slider>
              </FormItem>
              <FormItem label="底">
                <Slider show-input v-model="share.buttonPaddingBottom" :tip-format="format"> </Slider>
              </FormItem>
              <FormItem label="左">
                <Slider show-input v-model="share.buttonPaddingLeft" :tip-format="format"> </Slider>
              </FormItem>
            </div>
          </Panel>
          <Panel name="6" v-if="share.buttonType === 'buttonType_1' || share.buttonType === 'buttonType_2'">
            边框
            <div slot="content">
              <FormItem label="边框类型">
                <Select v-model="share.borderType">
                  <Option value="none">无</Option>
                  <Option value="solid">实线</Option>
                  <Option value="dashed">虚线</Option>
                  <Option value="double">双实线</Option>
                  <Option value="dotted">点线</Option>
                </Select>
              </FormItem>
              <div slot="content" v-if="share.borderType !== 'none'">
                <FormItem label="宽度">
                  <Slider show-input v-model="share.borderSize"> </Slider>
                </FormItem>
                <FormItem label="边框颜色">
                  <Col span="17">
                  <Input :placeholder="share.borderColor" v-model="share.borderColor"></Input>
                  </Col>
                  <Col span="1">
                  <ColorPicker v-model="share.borderColor" format="rgb" />
                  </Col>
                </FormItem>
              </div>
            </div>
          </Panel>
        </Collapse>
      </TabPane>
    </Tabs>
  </Form>
</template>
<script>
export default {
    data () {
        return {
            share: {
                // 内容链接部分
                androidUrl: '',
                iosUrl: '',
                // 控制padding
                buttonPaddingTop: 10,
                buttonPaddingBottom: 10,
                buttonPaddingRight: 0,
                buttonPaddingLeft: 0,
                // 标题样式
                buttonType: 'buttonType_1',
                // 按钮标题
                buttontext: '按钮标题',
                // 按钮大小
                buttonWidth: 90,
                buttonHeight: 60,
                // border相关
                borderSize: 2,
                borderColor: 'rgb(232,89,91)',
                borderType: 'solid',
                buttonBorderColor: 'rgb(232,89,91)',
                buttonColor: 'rgb(232,89,91)',
                fontColor: 'rgb(255,255,255)',
                fontSize: 17,
                backgroundColor: 'rgb(255,255,255,0)',
                buttonBackgroundImg: '',
                buttonRadius: 8,
                position: 'default',
                url: '',
                colortext: 'green',
                // 背景图片部分
                image: 'http://wap-qn.toutiaofangchan.com/tpzw_image.png',
                defaultList: [],
                uploadList: [],
                imgInformation: '',
                pic: '',
                horizontalDir: 'adapt_hor',
                verticalDir: 'adapt_ver',
                maskColor: 'rgba(0,0,0,0)',
                navVisible: false
            },
            imgUrl: '',
            visible: false
        };
    },
    methods: {
        format (val) {
            return 'Progress:' + val + '%';
        },
        uploadSuccess (res, file) {
            if (res.code === 'success') {
                console.log(res);
                console.log(file);
                this.share.uploadList.push({ name: file.name, url: res.data.url });
                this.share.pic = res.data.url;
                console.log(this.share.uploadList);
                // 创建对象
                var img = new Image();

                // 改变图片的src
                img.src = res.data.url;
                var that = this;
                // 加载完成执行
                img.onload = function () {
                    that.share.imgInformation = img.width + 'px*' + img.height + 'px';
                };
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
        handleView (imgUrl) {
            this.imgUrl = imgUrl;
            this.visible = true;
        },
        handleRemove (file) {
            let index = this.share.uploadList.indexOf(file);
            this.share.uploadList.splice(index, 1);
            this.share.pic = '';
        }
    }
};
</script>
<style scoped>
.my-style {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  width: 100%;
  height: 100%;
}
.style-button {
  flex: 0 0 123px;
  width: 300px;
  height: 40px;
  margin-bottom: 10px;
}
.btn {
  font-size: 12px;
  color: #2d8cf0;
  cursor: pointer;
}
</style>
<stage-template>
<div id="{{@ brickid}}" class="button-box">
  <section class="{{@share.position}} wys-contant {{@share.horizontalDir}}  {{@share.verticalDir}}"  style="padding:{{@share.buttonPaddingTop}}% {{@share.buttonPaddingRight}}% {{@share.buttonPaddingBottom}}% {{@share.buttonPaddingLeft}}%;background:{{@share.backgroundColor}}" >
    <div class="wys-link">
      <div class="wys-button {{@share.buttonType}}" style="height:{{@share.buttonHeight}}px; width: {{@share.buttonWidth}}%;background:{{@share.buttonColor}}; line-height:{{@share.buttonHeight}}px; border-radius: {{@share.buttonRadius}}px;color:{{@share.fontColor}};font-size:{{@share.fontSize}}px; border: {{@share.borderSize}}px; border-style: {{@share.borderType}}; border-color: {{@share.borderColor}}">
          <span>{{@share.buttontext}}</span>
      </div>
    </div>
  </section>
</div>
</stage-template>   
<stage-javascript type="text/javascript">
  $($t.find(".wys-contant").find(".wys-link")).on("click",function(){
    window.open("{{@share.url}}")
  })

  if("{{@share.position}}" == "top") {
    $t.removeAttr("botton_bottom")
    $t.attr("class","botton_top")
  } 
  if ("{{@share.position}}" == "bottom") {
    $t.removeAttr("botton_top")
    $t.attr("class","botton_bottom")
  }
</stage-javascript>
<stage-css>
  .wys-contant {
    box-sizing: border-content;
    background-image: url(<%= share.pic %>) !important;
  }
  .adapt_hor, adapt_ver {
    background-size: 100% auto !important;
    background-position:center center !important;
    background-repeat:no-repeat !important;
  }
  .repeat_hor {
    background-size: 100% auto !important;
    background-repeat: repeat-x !important;
  }
  .center_hor {
    background-size: 100% auto !important;
    background-position:center center !important;
    background-repeat:no-repeat !important;
  }
  .repeat_ver {
    background-repeat: repeat-y !important;
  }
  .center_ver {
    background-position:center center !important;
    background-repeat:no-repeat !important;
  }
  .top_ver {
    background-position:top center !important;
    background-repeat:no-repeat !important;
  }
  .text {
    color: <%= share.colortext %>
  }
  .button-bottom {
    bottom: 0;
  }
  .wys-link {
    display: block;
    text-align: center;
  }
  .wys-button{
    display:inline-block;
    vertical-align:middle;
  }
  .buttonType_1 {
    width: 93%;
    height: 20%;
    color:#fff;
    font-size:16px;
    
  }
  .buttonType_2 {
    width: 93% ;
    height: 20%;
    color:  rgb(232,89,91) !important;
    background: rgb(255,255,255) !important;
    border: <%= share.borderSize%> <%= share.borderType%> <%= share.borderColor%> !important;
    border-radius:<%= borderRadius%> !important;
    box-sizing: border-content !important;

  }
  .buttonType_3 {
    width: 90px !important;
    height:90px !important;
    line-height:90px !important;
    border-radius: 50% !important;
    color: #fff !important;
    background:  rgb(232,89,91) !important; 
  }
  .buttonType_4 {
    box-sizing: border-conent;
    width: 90px !important;
    height:90px !important;
    line-height:90px !important;
    border-radius: 50% !important;
    border: 2px solid rgb(289,89,91) !important;
    color:  rgb(232,89,91) !important;
    background: #fff !important;

  }
  .buttonType_5 {
    width: 90px !important;
    height:90px !important;
    color: #fff !important;
     line-height:90px !important;
    background: url(http://wap-qn.toutiaofangchan.com/adideas/1c54707463834ef588d05f8722f2ff21.png) no-repeat !important;
    background-size: 100% !important;
  }
  .buttonType_6 {
    width: 90px !important;
    height:90px !important;
    color: #fff !important;
    line-height:90px !important;
   background:url(http://wap-qn.toutiaofangchan.com/adideas/940b7f42be3546c4b37437f7aabaf776.png) no-repeat !important;
   color: #fff !important;
   background-size:100% !important;
  }
</stage-css>