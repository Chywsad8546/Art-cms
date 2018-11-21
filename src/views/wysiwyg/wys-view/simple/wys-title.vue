<template>
  <Form :label-width='60'>
    <Tabs>
      <TabPane label="内容">
        <Row>
          <Col span="12"
               style="line-height: 38px">标题内容</Col>
          <Input style="width: 280px; height: 40px"
                 v-model="share.titleText"></Input>
        </Row>
        <Row>
          <div class="addLink"
               @click="addLink">
            <Icon type="plus-round"></Icon>
            添加链接
          </div>
        </Row>
        <Modal title="URL"
               v-model="share.navVisible">
          <FormItem label="链接地址"
                    v-if="share.navVisible">
            <Input v-model="share.url"
                   placeholder="http://"></Input>
          </FormItem>
        </Modal>
      </TabPane>
      <TabPane label="样式">
        <Collapse simple>
          <Panel name="1">
            样式调整
            <div slot="content">
              <RadioGroup v-model="share.titleType"
                          vertical>
                <Radio label="title-type_1"
                       style="height: 40px">
                  <img src="http://wap-qn.toutiaofangchan.com/adideas/8363e591e67343938c60972d75fb65a5.png"
                       alt="样式1">
                </Radio>
                <Radio label="title-type_2"
                       style="height: 40px">
                  <img src="http://wap-qn.toutiaofangchan.com/adideas/58fe98e8b8ad41b0963bb61f400606ec.png"
                       alt="样式1">
                </Radio>
                <Radio label="title-type_3"
                       style="height: 40px">
                  <img src="http://wap-qn.toutiaofangchan.com/adideas/1e148826a99b480b8b781cddea2bd47b.png"
                       alt="样式1">
                </Radio>
                <Radio label="title-type_4"
                       style="height: 40px">
                  <img src="http://wap-qn.toutiaofangchan.com/adideas/9083fd8440584d56aed52d82138694c0.png"
                       alt="样式1">
                </Radio>
                <Radio label="待定_5"
                       style="height: 40px"></Radio>
                <Radio label="待定_6"
                       style="height: 40px"></Radio>
                <Radio label="待定_7"
                       style="height: 40px"></Radio>
                <Radio label="待定_8"
                       style="height: 40px"></Radio>
                <Radio label="待定_9"
                       style="height: 40px"></Radio>
                <Radio label="待定_10"
                       style="height: 40px"></Radio>
                <Radio label="待定_11"
                       style="height: 40px"></Radio>
                <Radio label="待定_12"
                       style="height: 40px"></Radio>
                <Radio label="待定_13"
                       style="height: 40px"></Radio>
              </RadioGroup>
              <FormItem label="装饰颜色">
                <Col span="17">
                <Input :placeholder="share.titleColor"
                       v-model="share.titleColor"></Input>
                </Col>
                <Col>
                <ColorPicker v-model="share.titleColor"
                             format="rgb" />
                </Col>
              </FormItem>
              <FormItem label="字体颜色">
                <Col span="17">
                <Input :placeholder="share.fontColor"
                       v-model="share.fontColor"></Input>
                </Col>
                <Col>
                <ColorPicker v-model="share.fontColor"
                             format="rgb" />
                </Col>
              </FormItem>
            </div>
          </Panel>
          <Panel name="2">
            边距
            <div slot="content">
              <FormItem label="顶">
                <Slider show-input
                        v-model="share.titlePaddingTop"></Slider>
              </FormItem>
              <FormItem label="右">
                <Slider show-input
                        v-model="share.titlePaddingRight"></Slider>
              </FormItem>
              <FormItem label="低">
                <Slider show-input
                        v-model="share.titlePaddingBottom"></Slider>
              </FormItem>
              <FormItem label="左">
                <Slider show-input
                        v-model="share.titlePaddingLeft"></Slider>
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
                titleText: '标题内容...',
                titleColor: 'rgb(248,89,89)',
                fontColor: 'rgb(248,89,89)',
                titleType: 'title-type_1',
                titlePaddingTop: 3,
                titlePaddingBottom: 3,
                titlePaddingRight: 0,
                titlePaddingLeft: 0,
                navVisible: false,
                url: ''
            }
        };
    },
    methods: {
        addLink: function() {
            console.log(this);
            this.share.navVisible = !this.share.navVisible;
        }
    }
};
</script>
<style>
.addLink {
  font-size: 12px;
  color: #2d8cf0;
  cursor: pointer;
}
</style>
<stage-template>
  <div id="{{@ brickid}}">
    <section style="padding:{{@share.titlePaddingTop}}% {{@share.titlePaddingRight}}% {{@share.titlePaddingBottom}}% {{@share.titlePaddingLeft}}%" >
      <a href="<%= share.url %>">
        <div class="wys-main">
          <div class="wsy-title-before {{@share.titleType}}"  ></div>
          <h2 class="wsy-title-text" style="color: {{@share.fontColor}}"> {{@share.titleText}} </h2>
          <div class="wsy-title-after {{@share.titleType}}"  ></div>
        </div>
      </a> 
    </section>
  </div>
</stage-template>

<stage-javascript type="text/javascript">

</stage-javascript>
<stage-css>
.wys-content{
    
}
.wys-main{
    display:flex;
    width:100%;
    text-align: center;
    justify-content:center;
    align-items:center;
}
.wsy-title-before {
  display:inline-block;
  width:30%;
  height:2px;
  margin:0 10px;
  background:-webkit-linear-gradient(left,rgba(0,0,0,0), <%= share.titleColor %>);
  
}
.wsy-title-text {
  display:inline-block;
  vertical-align:top;
  font-size:14px;
}
.wsy-title-after {
  display:inline-block;
  width:30%;
  height:2px;
  margin:0 10px;
  background:-webkit-linear-gradient(left,<%= share.titleColor %>,rgba(0,0,0,0));
}
.title-type_2 {
  border-top: 2px dotted <%= share.titleColor %> !important;
  height: 0px !important;
}

.title-type_3 {
   position:relative;
   border-top: 2px solid <%= share.titleColor %> !important;
   height: 0px !important;
}

.title-type_3:nth-of-type(1)::after {
  position:absolute;
  display:block;
  content:'';
  width:4px;
  height:4px;
  top:-3px;
  right:0;
  border-radius:50%;
  background:<%= share.titleColor %>;
}
.title-type_3:nth-of-type(2)::after {
  position:absolute;
  display:block;
  content:'';
  width:4px;
  height:4px;
  top:-3px;
  left:0;
  border-radius:50%;
  background:<%= share.titleColor %>;
}
.title-type_4 {
   position:relative;
   border-top: 2px solid <%= share.titleColor %> !important;
   height: 0px !important;
}
.title-type_4:nth-of-type(1)::after{
  position:absolute;
  display:block;
  content:'';
  width:1px;
  height:16px;
  top:-8px;
  right:0;
  transform: rotate(30deg);
  transform-origin: 1px 50%;
  background:<%= share.titleColor %>;
}
.title-type_4:nth-of-type(2)::after{
 position:absolute;
  display:block;
  content:'';
  width:1px;
  height:16px;
  top:-8px;
  left:-1px;
  transform: rotate(30deg);
  transform-origin: 1px 50%;
  background:<%= share.titleColor %>;
}
</stage-css>