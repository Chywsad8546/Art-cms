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
                formRender: []
            }
        };
    },
    methods: {
        newlyForm () {
            this.$router.push({
                name: 'newlybuildForm'
                // query: { newsId: params.row.id }
            });
        },
        formSelectClick (value) {
            console.log(this.share.formList);
            this.share.formList.forEach(item => {
                if (item._id === value) {
                    this.share.formRender = JSON.parse(item.form);
                    this.share.formBottonRender = JSON.parse(item.formBotton);
                    console.log(JSON.parse(item.form));
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
<div  class="form-piece">
        {{each share.formRender}}
             {{if $value.optionArr.length==1}}

                <div validate="name" class="input-group-i">
                    <span id="label" class="input-group-addon-i warn-star"">{{$value.label}}</span> 
                    <div class="m-input-text">
                         <input type="{{$value.optionArr[0].name}}" name="{{$value.name}}" class="input-style form-input-i" />
                    </div>
                </div>
             {{else}}


                2222
             {{/if}}
        {{/each}}
        <div validate="name" class="input-group-i">
                <button type="{{@ share.formBottonRender }}" class="btn-i" style="border-radius: 4px; background-color: rgb(248, 89, 89) !important; color: rgb(255, 255, 255); height: 42px; line-height: 42px; width: 100%;">立即提交</button>
        </div>

        
</div>
</stage-template>
<stage-javascript type="text/javascript">

</stage-javascript>
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
</stage-css>