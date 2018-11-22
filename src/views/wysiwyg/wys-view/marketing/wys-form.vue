<template>
    <Form :label-width="60" class="imgWidthCont">
        <Tabs>
            <TabPane label="内容">
                <Row class="navdhName">
                    <Col span="24">
                    <FormItem>
                        <Select v-model="share.formSelect" @on-change="formSelectClick">
                            <Option v-for="item in share.formList" :value="item._id" :key="item._id">
                                {{item.title}}
                            </Option>
                        </Select>
                    </FormItem>
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
                    <a class="btn" @click="newlyForm">
                        <Icon type="plus-round"></Icon>
                        新建表单
                    </a>
                    </Col>
                </Row>
                <Modal title="URL">
                    <FormItem label="链接地址">
                        <Input v-model="share.url" placeholder="http://"></Input>
                    </FormItem>
                </Modal>
            </TabPane>
            <TabPane label="样式">
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
import api from '../../../../api/wysiwyg/main.js';
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
                formBottonRender: ''
            }
        };
    },
    methods: {
        newlyForm () {
            this.$router.push({
                name: 'newlybuildFormList'
                // query: { newsId: params.row.id }
            });
        },
        formSelectClick (value) {
            this.share.formList.forEach(item => {
                if (item._id === value) {
                    this.share.formRender = JSON.parse(item.form);
                    this.share.formBottonRender = JSON.parse(item.formBotton);
                }
            });
        }
    },
    created: function () {
        api.getDiyFormStructure().then(response => {
            this.share.formList = response.data.data;
        });
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
</style>
<stage-template>
<div  class="form-piece label-style">
    <form id="Form01" action="" method="post" class="form-group-i input-style2"> 
            {{each share.formRender}}
                {{if $value.optionArr.length==1}}
                    {{if $value.type=='textarea'}}
                        <div class="textarea-group">
                            <span class="textarea-addon warn-star" style="color: rgb(128, 128, 128);">{{$value.label}}</span> 
                            <textarea required="{{$value.isMandatory}}" rows="5" cols="50" name="{{$value.name}}" placeholder="" style="width:100%"></textarea> 
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
                <div validate="name" class="input-group-i">
                        <button type="{{@ share.formBottonRender.optionArr[0].name }}" class="btn-i" style="border-radius: 4px; background-color: rgb(248, 89, 89) !important; color: rgb(255, 255, 255); height: 42px; line-height: 42px; width: 100%;">{{@ share.formBottonRender.label }}</button>
                </div>
            {{/if}}
    </form>
</div>
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
                        url: "/cmsapi/diyForm/saveDiyFormData" ,//url
                        data: JSON.stringify(ajaxJson),
                        success: function (result) {
                            if (result.resultCode == 200) {
                                alert("SUCCESS");
                            }
                            ;
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
.form-piece .checkbox-addon, .form-piece .city-addon, .form-piece .date-addon, .form-piece .gender-addon, .form-piece .input-group-i .input-group-addon-i, .form-piece .radio-addon, .form-piece .select-addon, .form-piece .textarea-addon {
    font-size: 12px;
    text-align: center;
    line-height: 1;
    margin-bottom: 10px;
    color: gray;
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
</stage-css>