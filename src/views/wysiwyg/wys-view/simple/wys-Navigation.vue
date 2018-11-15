<template>
       <Form  :label-width="60" class="imgWidthCont">
    <Tabs>  
        <TabPane label="内容" >
            <Row class="navdhFont">
                <Col span="12">导航</Col>
                <Col span="12" style="text-align:right;padding-right:10px;"><Icon type="trash-a"></Icon></Col>
            </Row>
            <Row class="navdhName"> 
                <Col span="24">
                    <FormItem  label="名称">
                        <Input ></Input>
                    </FormItem>  
                </Col>
            </Row>
            <Row class="navdhName"> 
                <Col span="24">
                    <a href="#" slot="extra">
                        <Icon type="plus-circled"></Icon>
                        添加链接
                    </a>  
                </Col>
            </Row>

   
        </TabPane>
        <TabPane label="样式" >
               

        </TabPane>
    </Tabs>
    </Form>



       <!-- <Form  class="imgWidthCont">
    <Tabs>
    
        <TabPane label="内容" :label-width="80">
 
                <FormItem label="" prop="title">
                        <div v-for="item,index in share.uploadList">
                            <div class="demo-upload-list">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                    </div>
                            </div>
                            <div>当前图片尺寸: {{item.imgInformation}}</div>
                            <CheckboxGroup v-model="item.single">
                                <Checkbox label="提示按钮"></Checkbox>
                            </CheckboxGroup>
                            <FormItem label="按钮内容" v-if="item.single">
                                <Input v-model="item.buttonText"></Input>
                            </FormItem>
                            <FormItem label="标题">
                                <Input v-model="item.title"></Input>
                            </FormItem>
                            <FormItem label="内容">
                                <Input v-model="item.content"></Input>
                            </FormItem>
                            <FormItem label="链接">
                                <Input v-model="item.httpUrl"></Input>
                            </FormItem>
                        </div>
                        <Upload  ref="upload" class="uploadWidth" action="cmsapi/upload/uploadimgNoDomainExt"   :default-file-list="share.defaultList"  :format="['jpg','jpeg','png','js','css']" :on-success="uploadSuccess"
                                :on-format-error="uploadFormatError"
                                :show-upload-list="false">
                            <Button type="ghost" >添加图片</Button>
                        </Upload>
                </FormItem>
                <Modal title="View Image" v-model="visible">
                    <img :src="imgUrl" v-if="visible" style="width: 100%">
                </Modal>

        </TabPane>  
    </Tabs>
    </Form> -->
</template>

<script>

    export default {
        name: 'wys-img',
        data() {
            return {
                share:{

                },
            };
        },
        methods: {

        },
        created: function () {
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
}
.navdhName {
    margin-top: 20px;
    padding-right: 20px;
}
</style>


<stage-template>
<div id="{{@ brickid}}" class="pictureset-box">
    <div class="specialListUl {{@share.imgSelect}}">
        <ul style="{{@share.backColor != "" ? "background:"+share.backColor : ""}}">
          {{if share.uploadList==0}}
             <li style="padding: {{@share.imgTop}}px {{@share.imgRight}}px {{@share.imgBottom}}px {{@share.imgLeft}}px;  {{@share.imgSelect == "lineAll" ? "width:"+share.imgWidth+"%" : ""}};"><a href="javascript:void(0)" target="_self"  class="link"><img src="http://wap-qn.toutiaofangchan.com/tpzw_image.png"/></a></li>
          {{/if}}
          {{each share.uploadList}}
             <li style="padding: {{@share.imgTop}}px {{@share.imgRight}}px {{@share.imgBottom}}px {{@share.imgLeft}}px;  {{@share.imgSelect == "lineAll" ? "width:"+share.imgWidth+"%" : ""}};"><a href="{{$value.httpUrl}}" target="_self"  class="link"><img src="{{$value.url}}"/></a></li>
          {{/each}} 
        </ul>
    </div>
</div>
</stage-template>
<stage-javascript type="text/javascript">
</stage-javascript>
<stage-css>
    .specialListUl {
        width: 100%;
    }
    .line1 {
        overflow: hidden;
    }
    .line1 li {
        width: 100%;
        font-size: 12px;
        color: #666666;
        line-height: 20px;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        list-style: none;
    }
    .line1 li img{
        width: 100%;
        font-size: 12px;
        color: #666666;
        line-height: 20px;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        list-style: none;
    }
    .line2 {
        overflow: hidden;
    }
    .line2 li {
        width: 50%;
        font-size: 12px;
        color: #666666;
        line-height: 20px;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        list-style: none;
    }
    .line2 li img{
        width: 100%;
        font-size: 12px;
        color: #666666;
        line-height: 20px;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        list-style: none;
    }
    .line3 {
        overflow: hidden;
    }
    .line3 li {
        width: 33.33%;
        font-size: 12px;
        color: #666666;
        line-height: 20px;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        list-style: none;
    }
    .line3 li img{
        width: 100%;
        font-size: 12px;
        color: #666666;
        line-height: 20px;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        list-style: none;
    }
    .lineAll {
        overflow-x: auto;
    }
    .lineAll li {
        width: 100px;
        font-size: 12px;
        color: #666666;
        line-height: 20px;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        list-style: none;
    }
    .specialListUl ul{
        width: 100%;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        box-sizing: border-box;
    }
</stage-css>