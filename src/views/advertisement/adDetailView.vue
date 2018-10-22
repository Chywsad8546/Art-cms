<template>
    <Row>
        <Col span="24">
        <Card>
            <p slot="title">广告详情</p>
            <Row >
                <Col span="12">

                </Col>
                <Col span="12">
                <Form ref="form" :model="formItem" :label-width="80">
                    <template v-for="(item,index) in confs">
                        <FormItem :label="item.label" v-if="item.type=='input'" :required="item.required">
                            <Input v-model="formItem[item.name]" placeholder="请填写内容"></Input>
                        </FormItem>
                        <FormItem :label="item.label" v-if="item.type=='select'" :required="item.required">
                            <Select v-model="formItem[item.name]">
                                <Option v-for="(option,optionindex) in item.options" :value="option">{{option}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem :label="item.label" v-if="item.type=='upload'" :required="item.required">
                            <Upload action="" :format="item.format">
                                <Button type="ghost" icon="ios-cloud-upload-outline">点我上传</Button>
                            </Upload>
                        </FormItem>

                    </template>


                    <!--<FormItem>-->
                        <!--<Button type="primary" @click="show">Submit</Button>-->
                        <!--<Button type="ghost" style="margin-left: 8px">Cancel</Button>-->
                    <!--</FormItem>-->
                </Form>
                </Col>
            </Row>
        </Card>

        </Col>


    </Row>
</template>

<script>
    export default {
        name: 'ad-detail-view',
        data() {
            return {
                confs: [
                    {
                        'type': 'input', //类型输入框
                        'name': 'input1',//字段名，在confs中，这个name不能重复，一定要唯一
                        'label':'输入框1',//字段的提示名
                        'default': '默认值', //默认值 此字段的默认值是空字符串
                        'reg': '', //校验的正则表达式
                        'required': true, //是否是必填
                        'message': '' //校验不通过的提示文字
                    },
                    {
                        'type': 'select', //类型下拉框
                        'name': 'select1',
                        'label':'下拉框1',//字段的提示名
                        'default': '默认值', //默认值 此字段的默认值是空字符串
                        'reg': '', //校验的正则表达式
                        'required': true, //是否是必填
                        'message': '', //校验不通过的提示文字
                        'options':['选项1','选项2'] // 下拉框的选项值
                    },
                    {
                        'type': 'upload', //类型上传文件
                        'name': 'upload1',
                        'label':'上传图片',//字段的提示名
                        'default': '默认值', //上传组件 这个没意义，可以不让用户填写
                        'reg': '', //校验的正则表达式
                        'required': true, //是否是必填
                        'message': '', //校验不通过的提示文字
                        'format':['jpg','jpeg','png'] // 可以上传的文件类型，如果是[]代表任何文件都可以
                    }
                ],
                formItem: {
                    // input: 'zjl'
                }
            };
        },
        methods: {
            // show() {
            //     console.log(this.$data);
            // }
        },
        created: function () {
            for (var i = 0; i < this.confs.length; i++) {
                let item = this.confs[i];
                this.$set(this.formItem, item.name, item.default);
            }
        }
    };
</script>

<style scoped>

</style>