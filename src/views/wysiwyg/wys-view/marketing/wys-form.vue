<template>
    <Form :label-width="60" class="imgWidthCont">
        <Tabs>
            <TabPane label="内容">
                <Row class="navdhName">

                    <Col span="24">
                    <Checkbox v-model="share.isCheckSingle">隐藏表单</Checkbox>
                    </Col>
                    <Col span="24" v-if="share.formImgUrl && share.isCheckSingle === true">
                    <div class="demo-upload-list">
                        <img :src="share.formImgUrl">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(share.formImgUrl)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(2)"></Icon>
                        </div>
                    </div>
                    </Col>
                    <Col span="24">
                    <Upload v-if="share.isCheckSingle === true" ref="upload" class="uploadWidth" :action="$domain.uploadFile"
                        :default-file-list="share.defaultList" :format="['jpg','jpeg','png']" :on-success="uploadFormSuccess"
                        :on-format-error="uploadFormFormatError" :show-upload-list="false" style="margin-top:10px;">
                        <Button style="width:270px;" type="ghost">添加图片</Button>
                    </Upload>
                    </Col>
                </Row>

                <Row class="navdhName">
                    <Col span="24">
                    <Select v-model="share.formSelect" @on-change="formSelectClick">
                        <Option v-for="item in share.formList" :value="item._id" :key="item._id">
                            {{item.title}}
                        </Option>
                    </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <div v-if="share.url != ''">
                        <span style="margin-right:10px;">链接到 {{share.url}}</span>
                        <a v-if="share.url != ''" @click="share.navVisible = true">
                            编辑
                        </a>
                    </div>

                    <Card style="width:290px;border:0px;">
                        <a @click="newlyForm">
                            <Icon type="plus-round"></Icon>
                            新建表单
                        </a>
                        <a href="#" slot="extra" @click.prevent="changeLimit">
                            <Icon type="ios-loop-strong" :class="loading == true ? 'demo-spin-icon-load' : ''"></Icon>
                        </a>
                        <br />
                        <br />
                        <a v-if="share.formRender.length>0" @click="isCheckbox = true">
                            <Icon type="plus-round"></Icon>
                            新建隐藏表单
                        </a>
                    </Card>
                    </Col>
                </Row>

                <Modal title="隐藏表单设置" ok-text="保存" @on-ok="formAdd('formHideValidate')" :loading="ModalLoading" v-model="isCheckbox">

                    <Row style="height:50px; text-align:center;border:1px solid #ececec;" type="flex" justify="center"
                        align="middle">
                        <Col span="10">name</Col>
                        <Col span="10">value</Col>
                        <Col span="4">操作</Col>
                    </Row>
                    <Row v-for="item,index in share.formHideList" style="height:50px; text-align:center;border:1px solid #ececec;"
                        type="flex" justify="center" align="middle">
                        <Col span="10"><Input v-model="item.name" disabled style="width:120px;" placeholder="请输入表单名称"></Input></Col>
                        <Col span="10">
                        <Input v-model="item.value" style="width:120px;" placeholder="请输入表单名称"></Input>
                        </Col>
                        <Col span="4">
                        <Icon @click="delOptionList(item)" style="font-size:20px;" type="ios-trash-outline"></Icon>
                        </Col>
                    </Row>
                    <Row style="height:50px; margin-top:20px;">
                        <Col span="24">
                        <Button style="border:1px solid #60A3F5;color:#60A3F5" @click="addOptionList">
                            <Icon type="plus-round"></Icon>增加一项
                        </Button>
                        </Col>
                    </Row>

                </Modal>

            </TabPane>
            <TabPane label="样式">

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
                <Collapse v-model="foldpanelKey2" style="margin-bottom:10px;">
                    <Panel name="1">
                        文字
                        <p slot="content">

                            <Row>
                                <Col span="12"><Input v-model="share.fontColor"></Input></Col>
                                <Col span="12">
                                <ColorPicker v-model="share.fontColor" style="margin-left:10px;" size="default"
                                    recommend />
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
                                        <Icon type="ios-trash-outline" @click.native="handleRemove(1)"></Icon>
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
                <Collapse v-model="foldpanelKey4" style="margin-bottom:10px;">
                    <Panel name="1">
                        按钮颜色
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
                top: 30,
                right: 15,
                bottom: 30,
                left: 15,
                formList: [],
                formRender: [],
                formBottonRender: '',
                backColor: '#FFFFFF',
                clickColor: '#F85959',
                fontColor: 'gray',
                Imgurl: '',
                horizontalDir: '1',
                verticalDir: '1',
                clickWidth: 100,
                clickHeight: 40,
                radius: 5,
                clickFontColor: '#FFFFFF',
                backImgStyle: 'background-size: 100% 100%; background-position: initial; background-repeat: no-repeat;',
                isCheckSingle: false,
                formImgUrl: '',
                formHideList: []
            },
            loading: false,
            foldpanelKey1: '1',
            foldpanelKey2: '1',
            foldpanelKey3: '1',
            foldpanelKey4: '1',
            imgViewUrl: '',
            visible: false,
            isCheckbox: false,
            formNum: 0,
            ModalLoading: true
        };
    },
    methods: {
        newlyForm () {
            let routeData = this.$router.resolve({ path: '/marketingMain/newlybuildForm' });
            window.open(routeData.href, '_blank');
        },
        handleRemove (type) {
            if (type === 1) {
                this.share.Imgurl = '';
            } else {
                this.share.formImgUrl = '';
            }
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
                this.share.formList = response.data.data.data;
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
        uploadFormSuccess (res, file) {
            if (res.code === 'success') {
                this.share.formImgUrl = res.data.url;
            } else {
                this.$Notice.error({
                    title: '上传失败',
                    desc: res.data.url
                });
            }
        },
        uploadFormFormatError (file) {
            this.$Notice.error({
                title: '不能上传此格式的文件',
                desc: ''
            });
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
        delOptionList (item) {
            let index = this.share.formHideList.indexOf(item);
            this.share.formHideList.splice(index, 1);
        },
        addOptionList () {
            this.share.formHideList.push({
                name: this.create_name(),
                value: ''
            });
        },
        formAdd () {
            this.ModalLoading = false;
            this.isCheckbox = false;
        },
        create_name () {
            if (this.formNum < this.share.formRender.length) {
                this.formNum = this.share.formRender.length;
            }
            this.formNum = this.formNum + 1;
            return 'formName_' + this.formNum; // 生成变量名
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

{{if share.formRender.length==0}}
<div class="formlEmpty">
<img  src="{{@share.formImgUrl == '' ? 'http://wap-qn.toutiaofangchan.com/adideas/ea1d511c21b3422596d73093ddff3d6c.png' : share.formImgUrl}} "/>
</div>
{{else}}

<div class="formlEmpty"  style="display:{{@share.isCheckSingle == true ? 'block' : 'none'}}">
    <img id="{{@share.formImgUrl == '' ? '' : 'imgRelationForm'}}" src="{{@share.formImgUrl == '' ? 'http://wap-qn.toutiaofangchan.com/adideas/ea1d511c21b3422596d73093ddff3d6c.png' : share.formImgUrl}} "/>
</div>
<div class="pop-form">
</div>
<div class="formContent" style="display:{{@share.isCheckSingle == true ? 'none' : 'block'}}">
<div  style="padding: {{@share.top}}px {{@share.right}}px {{@share.bottom}}px {{@share.left}}px; background:<%= share.backColor %>;
  <%= share.backImgStyle %> background-image: url(<%= share.Imgurl %>); 
">
<img style="display:{{@share.isCheckSingle == true ? 'block' : 'none'}}" src="http://wap-qn.toutiaofangchan.com/adideas/luodiyesucai/195f723db6c745328c1eb29f307303de/pop-form-close.png" class="close-pop" alt="关闭">
<div  class="form-piece label-style">
    <form id="Form01" action="" method="post" class="form-group-i input-style2"> 
            {{each share.formRender}}
                {{if $value.optionArr.length==1}}
                    {{if $value.type=='textarea'}}
                        <div class="textarea-group">
                            <span class="textarea-addon warn-star" style="color: rgb(128, 128, 128);">{{$value.label}}</span> 
                            <textarea required="{{$value.isMandatory}}" rows="5" cols="50" name="{{$value.name}}" placeholder="" style="width:100%;border: 1px solid #ccc;"></textarea> 
                        </div>
                    {{else}}
                    <div validate="name" class="input-group-i">
                        <span class="input-group-addon-i warn-star"">{{$value.label}}</span> 
                        <div class="m-input-text">
                            <input type="{{$value.optionArr[0].name}}" name="{{$value.name}}"   class="input-style form-input-i" />
                        </div>
                    </div>
                    {{/if}} 
                {{else}}
                <div class="gender-group">
                    {{if $value.type=='checkbox'}}
                        <div class="checkbox-addon warn-star" style="color: rgb(128, 128, 128);">{{$value.label}}
                        <span>（可多选）</span></div>
                    {{else}}
                        <span class="gender-addon" style="color: rgb(128, 128, 128);">{{$value.label}}</span>
                    {{/if}} 
                    {{if $value.type=='select'}}
                        <div class="selectMulti-wrapper">
                            <div class="select-wrapper select-list1">
                                <select class="input-style" name="{{$value.name}}">
                                    <option value="null">--请选择--</option>
                                      <%for( j = 0; j < $value.optionArr.length; j++) {%>
                                            <option value="<%=$value.optionArr[j].name%>"><%=$value.optionArr[j].name%></option>
                                      <%}%>
                                </select>
                            </div>
                        </div>
                    {{else}}
                        <div class="radio-box gender-box">
                        <%for( j = 0; j < $value.optionArr.length; j++) {%>
                            {{if j==1}}
                                <label class="radio-item">
                                    <input type="{{$value.type == 'sex' ? 'radio' : $value.type}}" value="<%=$value.optionArr[j].name%>" checked="checked" name="{{$value.name}}" class="radio-style">
                                    <span><%=$value.optionArr[j].name%></span>
                                </label> 
                            {{else}}
                                <label class="radio-item">
                                    <input type="{{$value.type == 'sex' ? 'radio' : $value.type}}" value="<%=$value.optionArr[j].name%>"  name="{{$value.name}}" class="radio-style">
                                    <span><%=$value.optionArr[j].name%></span>
                                </label> 
                            {{/if}} 
                        <%}%>
                        </div>
                    {{/if}} 
                    </div>
                {{/if}}
            {{/each}}
            {{if share.formBottonRender}}
                <div validate="name" class="input-group-i" style="text-align:center">
                        <button type="{{@ share.formBottonRender.optionArr[0].name }}" class="btn-i" style="border-radius: <%= share.radius %>px; background-color: <%= share.clickColor %> !important; color: <%= share.clickFontColor %>; height: <%= share.clickHeight %>px; line-height: <%= share.clickHeight %>px; width: <%= share.clickWidth %>%;">{{@ share.formBottonRender.label }}</button>
                </div>
            {{/if}}

            <% for(j=0 ; j<share.formHideList.length ; j++){%>
                  <input type="hidden" name="<%=share.formHideList[j].name%>" value="<%=share.formHideList[j].value%>">
            <%}%>


    </form>
</div>
</div>
</div>
{{/if}} 
</stage-template>
<stage-javascript type="text/javascript">

$().ready(function() {
    setTimeout(function(){
        $.validator.setDefaults({
            submitHandler: function() {
                var ajaxJson = $t.find("#Form01").serializeJson();
                $.ajax({
                    //几个参数需要注意一下
                        type: "POST",//方法类型
                        contentType: "application/json",
                        dataType: "json",//预期服务器返回的数据类型
                        url: "/cmsapi/cmsapi/diyForm/saveDiyFormData" ,//url
                        data: JSON.stringify(ajaxJson),
                        success: function (result) {
                           if(result.code == "success"){
                             info("提交成功");
                           }
                        },
                        error : function() {
                            alert("异常！");
                        }
                    });
            }
        });
            $($t.find("#Form01")).validate({
                rules: {

                    <%for( j = 0; j < share.formRender.length; j++) {%>
                        <%= share.formRender[j].name%>: {
                            required: <%= share.formRender[j].isMandatory %>,
                        },

                    <%}%>
                },
                messages: {
                    <%for( j = 0; j < share.formRender.length; j++) {%>
                        <%= share.formRender[j].name%>: {
                            required: "请输入"+"<%= share.formRender[j].label %>",
                        },
                    <%}%>
                }
            });

            $t.find("#imgRelationForm").on("click",function(){
                $t.find(".pop-form").show();
                $t.find(".formContent").show();
                var contentHeight = $t.find(".formContent").height();
                $t.find(".formContent").attr("style","height:"+contentHeight+"px;width:100%; background: <%= share.backColor %>; margin-top:-"+contentHeight/2+"px; position: fixed; top:50%;z-index:60;");
            })

             $t.find(".close-pop").on("click",function(){
                $t.find(".pop-form").hide();
                $t.find(".formContent").hide();
             })

    },300)
});
$.fn.serializeJson=function(){ 
                var serializeObj={}; 
                var array=this.serializeArray(); 
                // var str=this.serialize(); 
                $(array).each(function(){ // 遍历数组的每个元素 
                        if(serializeObj[this.name]){ // 判断对象中是否已经存在 name，如果存在name 
                            if($.isArray(serializeObj[this.name])){ 
                                    serializeObj[this.name].push(this.value); // 追加一个值 hobby : ['音乐','体育'] 
                            }else{ 
                                    // 将元素变为 数组 ，hobby : ['音乐','体育'] 
                                    serializeObj[this.name]=[serializeObj[this.name],this.value]; 
                            } 
                        }else{ 
                                serializeObj[this.name]=this.value; // 如果元素name不存在，添加一个属性 name:value 
                        } 
                }); 
                return serializeObj; 
            }; 
</stage-javascript>
<stage-javascript-import>http://wap-qn.toutiaofangchan.com/adideas/b82a096a385a4cf88633395c97f7f80b.js</stage-javascript-import>

<stage-css>
.close-pop {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
}
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
    text-align: center;
}
.pop-form {
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 50;
    background-color: rgba(0,0,0,.7);
}
</stage-css>