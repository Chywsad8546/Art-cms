<template>
  <Form :label-width="60" class="imgWidthCont">
    <Tabs>
      <TabPane label="内容">
        <Row class="navdhName">
          <Col span="24">
          <FormItem label="名称">
            <Input v-model="share.name"></Input>
          </FormItem>
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
        <!-- <Modal title="URL" v-model="share.navVisible">
                    <FormItem label="链接地址" v-if="share.navVisible">
                        <Input v-model="share.url" placeholder="http://"></Input>
                    </FormItem>
                </Modal> -->
      </TabPane>
      <TabPane label="样式">
        <!-- <RadioGroup v-model="share.navVertical" vertical>
                <Radio label="navitem0" style="height:50px;">
                    <img src="http://wap-qn.toutiaofangchan.com/adideas/52b561fe138a4bb4a3161e8c3a78ec01.png"/>
                </Radio>
                <Radio label="navitem1" style="height:50px;">
                    <img src="http://wap-qn.toutiaofangchan.com/adideas/255342d0548b41e3b77173072bcd5604.png"/>
                </Radio> 
                <Radio label="navitem2" style="height:50px;">
                    <img src="http://wap-qn.toutiaofangchan.com/adideas/c134232654ef427584d8622af6e9e519.png"/>
                </Radio> 
                 <Radio label="navitem3" style="height:50px;">
                    <img src="http://wap-qn.toutiaofangchan.com/adideas/534d8cb8bbfa448cb0ca3a7de65f73f6.png"/>
                </Radio> 
            </RadioGroup> -->
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
      </TabPane>
    </Tabs>

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
                name: '链接文字',
                navVisible: false,
                url: '',
                urlData: {},
                top: 10,
                right: 15,
                bottom: 10,
                left: 15
            }
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
    <section style="padding: {{@share.top}}px {{@share.right}}px {{@share.bottom}}px {{@share.left}}px;">
        <a href="{{@share.url}}" target="_self" class="link style1">
            <span class="link-text">{{@share.name}}</span> 
        </a>
    </section>
</div>
</stage-template>
<stage-javascript type="text/javascript">

</stage-javascript>
<stage-css>
    .link {
        display: block;
        cursor: pointer;
        font-size: 16px;
        line-height: 22px;
        color:#5790C9;
        word-wrap: break-word;
        word-break: break-all;
    }
    .link i {
        display: none;
        font-size: 14px;
    }
    .link.style1 i:first-child {
        display: inline;
    }

</stage-css>