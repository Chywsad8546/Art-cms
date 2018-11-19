<template>
  <Form :label-width='60'>
    <Tabs>
      <TabPane label="内容">
        <Row>
          <Col span="12" style="line-height: 38px">标题内容</Col>
          <textarea style="width: 280px; height: 100px" v-model="share.titleText"></textarea>
        </Row>
          </TabPane>
      <TabPane label="样式">
        <Collapse simple>
            <Panel name="1">
             样式调整
                <div slot="content">
                  <RadioGroup v-model="share.titleType" vertical>
                    <Radio label="title-type_1" style="height: 40px">
                        <img src="//p1.pstatp.com/origin/588900062c27ff4bc647" alt="样式1">
                    </Radio>
                    <Radio label="title-type_2" style="height: 40px">选我</Radio>
                    <Radio label="title-type_3" style="height: 40px">选我</Radio>
                    <Radio label="title-type_4" style="height: 40px">选我</Radio>
                    <Radio label="title-type_5" style="height: 40px">选我</Radio>
                    <Radio label="title-type_6" style="height: 40px">选我</Radio>
                    <Radio label="title-type_7" style="height: 40px">选我</Radio>
                    <Radio label="title-type_8" style="height: 40px">选我</Radio>
                    <Radio label="title-type_9" style="height: 40px">选我</Radio>
                    <Radio label="title-type_10" style="height: 40px">选我</Radio>
                    <Radio label="title-type_11" style="height: 40px">选我</Radio>
                    <Radio label="title-type_12" style="height: 40px">选我</Radio>
                    <Radio label="title-type_13" style="height: 40px">选我</Radio>
                  </RadioGroup>
                    <FormItem label="装饰颜色">
                      <Col span="17">
                        <Input :placeholder="share.titleColor" v-model="share.titleColor"></Input>
                      </Col>
                      <Col>
                        <ColorPicker v-model="share.titleColor"  format="rgb" />
                      </Col>
                    </FormItem>
                     <FormItem label="字体颜色">
                      <Col span="17">
                        <Input :placeholder="share.fontColor" v-model="share.fontColor"></Input>
                      </Col>
                      <Col>
                        <ColorPicker v-model="share.fontColor"  format="rgb" />
                      </Col>
                    </FormItem>
                </div>
             </Panel>
             <Panel name="2">
                 边距
                 <div slot="content">
                     <FormItem label="顶">
                        <Slider show-input v-model="share.titlePaddingTop"></Slider>
                     </FormItem>
                     <FormItem label="右">
                        <Slider show-input v-model="share.titlePaddingRight"></Slider>
                     </FormItem>
                     <FormItem label="低">
                        <Slider show-input v-model="share.titlePaddingBottom"></Slider>
                     </FormItem>
                     <FormItem label="左">
                        <Slider show-input v-model="share.titlePaddingLeft"></Slider>
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
                titleText:'标题内容...',
                titleColor: 'rgb(248,89,89)',
                fontColor: 'rgb(248,89,89)',
                titleType:'title-type',
                titlePaddingTop: 3,
                titlePaddingBottom: 3,
                titlePaddingRight: 0,
                titlePaddingLeft: 0
            }
        }
    }
}
</script>
<style>

</style>
<stage-template>
  <div id="{{@ brickid}}">
    <section style="padding:{{@share.titlePaddingTop}}% {{@share.titlePaddingRight}}% {{@share.titlePaddingBottom}}% {{@share.titlePaddingLeft}}%" >
      <div class="wys-main">
        <div class="wsy-title-before" ></div>
        <h2 class="wsy-title-text" style="color: {{@share.fontColor}}"> {{@share.titleText}} </h2>
        <div class="wsy-title-after" ></div>
      </div>
    </section>
  </div>
</stage-template>

<stage-javascript type="text/javascript">

</stage-javascript>
<stage-css>
.wys-content{
    
}
.wys-main{
    width:100%;
    text-align: center;
}
.wsy-title-before {
  display:inline-block;
  width:30%;
  height:3px;
  background:-webkit-linear-gradient(left,rgba(0,0,0,0), rgb(248,89,89));
  
}
.wsy-title-text {
  display:inline-block;
  vertical-align:middle;
}
.wsy-title-after {
  display:inline-block;
  width:30%;
  height:3px;
  background:-webkit-linear-gradient(left, rgb(248,89,89),rgba(0,0,0,0));
}
</stage-css>