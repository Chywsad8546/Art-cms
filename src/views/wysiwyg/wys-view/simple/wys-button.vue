<template>
  <Form :label-width='60'>
    <Tabs>
      <TabPane label="内容">
        <Row>
          <Col span="20">
          <FormItem label="文本">
            <Input v-model="share.buttontext" placeholder="按钮内容 "></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Row>
            <Col span="12"
                 style="line-height: 38px">Android链接</Col>
            <Col span="12">
            <a href=""
               class="btn">
              <Icon type="plus-round"></Icon>
              添加CDN链接
            </a>
            </Col>
          </Row>
        </Row>
        <Row>
          <textarea style="width: 280px; height: 100px" v-model="share.url"></textarea>
        </Row>
        <Row>
          <Col span="12"
               style="line-height: 38px">IOS链接</Col>
          <textarea style="width: 280px; height: 100px" v-model="share.url"></textarea>
        </Row>
      </TabPane>
      <TabPane label="样式">
        <Collapse simple>
          <Panel name="1">
            样式调整
            <div slot="content" class="my-style">
              <RadioGroup v-model="share.buttonType" vertical>
                <Radio label="buttonType_1" style="height: 100px " @click="test" on-change="test">
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
              <FormItem label="宽度" slot="content" >
                <Slider show-input v-model="share.buttonWidth" ></Slider>
              </FormItem>
              <FormItem label="高度" slot="content" >
                <Slider show-input v-model="share.buttonHeight"> </Slider>
              </FormItem>
            </div>
            <FormItem label="字体大小" slot="content">
              <Slider show-input v-model="share.fontSize" ></Slider>
            </FormItem>
            <FormItem label="按钮颜色" slot="content" v-if="share.buttonType === 'buttonType_1' || share.buttonType === 'buttonType_2'">
              <Col span="17">
                <Input :placeholder="share.buttonColor" v-model="share.buttonColor">
                </Input>
              </Col>
              <Col span="1">
                <ColorPicker v-model="share.buttonColor"   format="rgb"/>
              </Col>
            </FormItem>
            <FormItem label="字体颜色" slot="content">
              <Col span="17">
                <Input :placeholder="share.fontColor" v-model="share.fontColor">
                </Input>
              </Col>
              <Col span="1">
                <ColorPicker v-model="share.fontColor"  format="rgb" />
              </Col>
            </FormItem>
            <FormItem label="圆角" slot="content" v-if="share.buttonType === 'buttonType_1' || share.buttonType === 'buttonType_2'">
               <Slider show-input v-model="share.buttonRadius" > </Slider>
            </FormItem>
          </Panel>
          <Panel name="3">
            展示效果
            <FormItem label="展示效果" slot="content">
              <Select v-model="share.position">
                <Option value="button_default" >默认位置</Option>
                <Option value="button_top">顶部悬浮</Option>
                <Option value="button_bottom"> 底部悬浮</Option>
              </Select>
            </FormItem>
          </Panel>
          <Panel name="4">
            背景
            <FormItem label="背景色" slot="content">
              <Col span="17">
                <Input :placeholder="share.backgroundColor" v-model="share.backgroundColor">
                </Input>
              </Col>
              <Col span="1">
                <ColorPicker v-model="share.backgroundColor" format="rgb" />
              </Col>
            </FormItem>
            <FormItem label="背景图" slot="content">
              <Button long>添加图片</Button>
            </FormItem>
          </Panel>
          <Panel name="5">
            边距
            <div slot="content">
              <FormItem label="顶">
                <Slider show-input v-model="share.buttonPaddingTop"  :tip-format="format"> </Slider>
              </FormItem>
              <FormItem label="右">
                 <Slider show-input v-model="share.buttonPaddingRight"  :tip-format="format"> </Slider>
              </FormItem>
              <FormItem label="底">
               <Slider show-input v-model="share.buttonPaddingBottom"  :tip-format="format"> </Slider>
              </FormItem>
              <FormItem label="左">
               <Slider show-input v-model="share.buttonPaddingLeft"  :tip-format="format"> </Slider>
              </FormItem>
            </div>
          </Panel>
          <Panel name="6"  v-if="share.buttonType === 'buttonType_1' || share.buttonType === 'buttonType_2'">
              边框
              <div slot="content">
                <FormItem label="边框类型">
              <Select v-model="share.borderType">
                <Option value="none">无</Option>
                <Option value="solid">实线</Option>
                <Option value="dashed">虚线</Option>
                <Option value="double">双实现</Option>
                <Option value="dotted">点线</Option>
              </Select>
            </FormItem>
             <FormItem label="宽度">
                 <Slider show-input v-model="share.borderSize"> </Slider>
              </FormItem>
               <FormItem label="背景色" slot="content">
              <Col span="17">
                <Input :placeholder="share.borderColor" v-model="share.borderColor">
                </Input>
              </Col>
              <Col span="1">
                <ColorPicker v-model="share.borderColor" format="rgb" />
              </Col>
            </FormItem>
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
                buttonPaddingTop: 10,
                buttonPaddingBottom: 10,
                buttonPaddingRight: 0,
                buttonPaddingLeft: 0,
                buttonType: 'buttonType_1',
                buttontext: '按钮标题',
                buttonWidth: 90,
                buttonHeight: 60,
                borderSize:2,
                borderColor:'rgb(232,89,91)',
                borderType:'none',
                buttonBorderColor: 'rgb(232,89,91)',
                buttonColor: 'rgb(232,89,91)',
                fontColor: 'rgb(255,255,255)',
                fontSize: 17,
                backgroundColor: 'rgb(255,255,255)',
                buttonBackgroundImg: '',
                buttonRadius: 0,
                position: 'button-default',
                url:''
            }

        };
    },
    methods: {
        format (val) {
            return 'Progress:' + val + '%';
        },
        test () {
            alert('hello');
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
</style>
<stage-template>
<div id="{{@ brickid}}" class="button-box">
  <section class="{{@share.position}} wys-container"  style="padding:{{@share.buttonPaddingTop}}% {{@share.buttonPaddingRight}}% {{@share.buttonPaddingBottom}}% {{@share.buttonPaddingLeft}}%;background:{{@share.backgroundColor}}" >
    <a herf="http://"+{{share.url }} class="wys-link">
      <div class="wys-button {{@share.buttonType}}" style="height:{{@share.buttonHeight}}px; width: {{@share.buttonWidth}}%;background:{{@share.buttonColor}}; line-height:{{@share.buttonHeight}}px; border-radius: {{@share.buttonRadius}}px;color:{{@share.fontColor}};font-size:{{@share.fontSize}}px; border: {{@share.borderSize}}px; border-style: {{@share.borderType}}; border-color: {{@share.borderColor}}">
          {{@share.buttontext}}
      </div>
    </a>
  </section>
</div>
</stage-template>   
<stage-javascript type="text/javascript>
</stage-javascipt>
<stage-css>
    .wys-main {
  
  }
  .wys-container {
    box-sizing: border-content;
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
    border: 2px solid rgb(232,89,91) !important;
    border-radius:8px !important;
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