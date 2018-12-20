<template>
  <Form :label-width="60" class="imgWidthCont">
      <Row class="navdhName">
        <Col span="24">
          <FormItem label="字号">
                <Select v-model="share.textFontSize" style="width:200px">
                  <Option value="12px">12</Option>
                  <Option value="13px">13</Option>
                  <Option value="14px">14</Option>
                  <Option value="16px">16</Option>
                  <Option value="18px">18</Option>
                  <Option value="24px">24</Option>
                  <Option value="36px">36</Option>
                  <Option value="48px">48</Option>
                  <Option value="64px">64</Option>
              </Select>
          </FormItem>
          <FormItem label="颜色">
            <ColorPicker v-model="share.font_color" />
          </FormItem>
        </Col>
        <Col span="24">
          <Input v-model="share.name" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <div v-if="share.url != ''">
          <span style="margin-right:10px;">链接到 {{share.url}}</span>
          <a v-if="share.url != ''" @click="share.navVisible = !share.navVisible">
            编辑
          </a>
        </div>
        <a v-if="share.url == ''" class="btn" @click="share.navVisible = !share.navVisible">
          <Icon type="plus-round"></Icon>
          添加链接
        </a>
        <wysLink @link-cancelEvent="cancelPopup" @link-okEvent="okPopup" v-bind:createUrl="share.urlData"
          v-bind:isBlock="share.navVisible"></wysLink>
        </Col>
      </Row>
      <Row>
      <Col span="24">
        边距
        </Col>
      </Row>
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
  </Form>

</template>

<script>
import wysLink from '../components/link.vue';
export default {
    name: 'wys-link',
    components: {
        wysLink
    },
    data () {
        return {
            share: {
                name: '默认文本',
                navVisible: false,
                url: '',
                urlData: {},
                top: 10,
                right: 15,
                bottom: 10,
                left: 15,
                textFontSize:'12px',
                font_color:'#000000'
            },
            panelTextKey2:'1'

        };
    },
    methods: {
        removeNavigat (item) {
            let index = this.share.navigatList.indexOf(item);
            this.share.navigatList.splice(index, 1);
        },
        addUrl (item) {
            item.navVisible = true;
        },
        addNaviPush () {
            this.share.navigatList.push({ name: '新导航', url: '', navVisible: false });
        },
        cancelPopup () {
            this.share.navVisible = !this.share.navVisible;
        },
        okPopup (data) {
            this.share.navVisible = !this.share.navVisible;
            this.share.url = data.url;
            this.share.urlData = data;
            if (data.id) {
                this.share.url += data.id;
            }
        }
    },
    created: function () {
        console.log(this.share);
    // console.log('created',this.$options.customOption,this.$options.wysdocs,this.$options) // => 'foo'
    },
    mounted () {
    // console.log(this.$refs.upload.fileList);
    // this.uploadList = this.$refs.upload.fileList;
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
</style>


<stage-template>
<div  class="pictureset-box">
    <section style="padding: {{@share.top}}px {{@share.right}}px {{@share.bottom}}px {{@share.left}}px;font-size:{{@share.textFontSize}}">
        <a href="{{@share.url}}" target="_self" class="link style1">
            <span class="link-text">{{@share.name}}</span> 
        </a>
    </section>
</div>
</stage-template>
<stage-javascript type="text/javascript">

</stage-javascript>
<stage-css>
.style1 {
    color:<%= share.font_color %>;
}
</stage-css>