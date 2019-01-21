<template>
  <Form :label-width="60" class="imgWidthCont">
    <Tabs>
      <TabPane label="内容">
        <Row class="navdhName">
          <Col span="24">
            <FormItem label="标题">
              <Input v-model="share.title" placeholder="请输入标题" style="width: 200px" />
            </FormItem>
            <FormItem label="来源">
              <Input v-model="share.source" placeholder="请输入标题" style="width: 200px" />
            </FormItem>
            <FormItem label="标签文字">
              <Input v-model="share.label" placeholder="请输入标签" style="width: 200px" />
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
        <Row>
          <Col span="24">
            <div v-for="item,index in share.uploadList">
                <div class="demo-upload-list">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </div>
            </div>
            <Modal title="View Image" v-model="visible">
                <img :src="imgUrl" v-if="visible" style="width: 100%">
            </Modal>
          </Col>
          <Col span="24">
            <Upload v-if="share.tempVertical === 'temp1' ? share.uploadList.length<=0: share.uploadList.length<=3"
              ref="upload" class="uploadWidth" :action="$domain.uploadFile" :default-file-list="share.defaultList"
              :format="['jpg','jpeg','png','js','css']" :on-success="uploadSuccess" :on-format-error="uploadFormatError"
              :show-upload-list="false">
              <Button type="ghost">添加图片</Button>
            </Upload>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="样式">
        <RadioGroup v-model="share.tempVertical" vertical>
            <Radio label="temp1">
                <span>样式1</span>
            </Radio>
            <Radio label="temp2">
                <span>样式2</span>
            </Radio>
        </RadioGroup>
        <FormItem label="字号">
            <Select v-model="share.textFontSize" style="width:200px">
                <Option value="0.12rem">12</Option>
                <Option value="0.26rem">14</Option>
                <Option value="0.28rem">16</Option>
                <Option value="0.3rem">18</Option>
                <Option value="0.32rem">20</Option>
                <Option value="0.34rem">22</Option>
                <Option value="0.36rem">24</Option>
                <Option value="0.38rem">26</Option>
                <Option value="0.40rem">28</Option>
                <Option value="0.42rem">30</Option>
                <Option value="0.44rem">32</Option>
                <Option value="0.46rem">34</Option>
                <Option value="0.48rem">36</Option>
                <Option value="0.5rem">38</Option>
                <Option value="0.52rem">40</Option>
                <Option value="0.54rem">42</Option>
            </Select>
        </FormItem>
        <Row>
          <Col span="24">
          边距
          </Col>
        </Row>
        <FormItem label="右">
          <Slider v-model="share.right" show-input></Slider>
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
                title:'默认标题',
                source:'文章描述',
                navVisible: false,
                url: '',
                urlData: {},
                top: 10,
                right: 15,
                bottom: 10,
                left: 15,
                label:'热',
                defaultList:[],
                textFontSize:'0.5rem',
                tempVertical:'temp1',
                uploadList:[]
            },
            visible:false,
            panelTextKey2:'1'
        };
    },
    methods: {
        handleRemove (file) {
            let index = this.share.uploadList.indexOf(file);
            this.share.uploadList.splice(index, 1);
        },
        handleView (imgUrl) {
            this.imgUrl = imgUrl;
            this.visible = true;
        },
        uploadSuccess (res, file) {
            if (res.code === 'success') {
                // 创建对象
                var img = new Image();
                this.share.uploadList.push({
                    name: file.name,
                    url: res.data.url,
                });
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
<div  class="pictureset-box">
   <a href="{{@share.url == '' ? 'javascript:void(0)' : share.url}}" target="_self" style="padding: {{@share.top}}px {{@share.right}}px {{@share.bottom}}px {{@share.left}}px; display: block;">
        {{if share.tempVertical=='temp1'}}
            <div class="atricleLeft" style="width:{{@share.uploadList.length <= 0 ? '100%' : '68%'}}">
                <div class="title" style="font-size:{{@share.textFontSize}}"><span>{{@share.title}}</span></div>
                <div class="desc">
                    <span class="label-desc">{{@share.source}}</span> 
                    {{if share.label}}
                    <span class="label-text" style="color: rgb(248, 89, 89); border-color: rgb(248, 89, 89);">{{@share.label}}</span>
                    {{/if}}
                </div>
            </div>
            {{each share.uploadList}}
            <div class="right-content" style="background-image: url({{$value.url}});">
            </div>
            {{/each}}
            {{else}}
            <div class="atricleLeft" style="width:100%;">
                <div class="title" style="font-size:{{@share.textFontSize}}"><span>{{@share.title}}</span></div>
                <div class="imgs">
                    <ul class="clearfix">
                    {{each share.uploadList}}
                        <li class="list-img-holder" style="background-image: url({{$value.url}});"></li>
                    {{/each}}      
                    </ul>
                </div>
                <div class="desc">
                    <span class="label-desc">{{@share.source}}</span> 
                    <span class="label-text" style="color: rgb(248, 89, 89); border-color: rgb(248, 89, 89);">热</span>
                </div>
            </div>
        {{/if}}
    </a>
</div>
</stage-template>
<stage-javascript type="text/javascript">

</stage-javascript>
<stage-css>

.pictureset-box .atricleLeft .title {
    color: #222;
    line-height: 25px;
    font-weight: 400;
    word-wrap:break-word;
    margin-bottom:0.1rem;
    text-align: justify;
}
.pictureset-box .atricleLeft .desc .label-desc {
    float: left;
    position: relative;
    top: 1px;
    font-size: 12px;
    color: #999;
    line-height: 14px;
}
.pictureset-box .imgs {
    margin: 8px 0;
}
.pictureset-box .imgs .clearfix {
    display: block;
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 0;
    text-align: center;
}
.pictureset-box .imgs .clearfix .list-img-holder {
    padding: 0 1px;
    display: inline-block;
    overflow: hidden;
    width: 32%;
    height: 66px;
    box-sizing: border-box;
    background-position: 50%;
    background-size: cover;
    margin: 0 1px;
}
.pictureset-box .right-content {
    overflow: hidden;
    width: 28%;
    height: 67px;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    background-position: 50%;
    background-size: cover;
}
.pictureset-box .atricleLeft .desc .label-text {
    color: #f85959;
    border: 1px solid #f85959;
    margin-left: 5px;
    display: block;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    border-radius: 3px;
    height: 14px;
    padding: 0 2px;
    float: left;
}
.pictureset-box {
    overflow: hidden;
}
.style1 {
    color:#000000;
}
.atricleLeft {
    display: inline-block;
    width: 68%;
    box-sizing: border-box;
    vertical-align: middle;
}
.atricleRight {
  float:right;
}
</stage-css>