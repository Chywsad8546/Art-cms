<template>
    <Row>
        <Col span="24">
        <Card>
            <p slot="title">广告详情</p>
            <Row >
                <Col span="12">

                </Col>
                <Col span="12">
                <Form ref="form" :model="formItem" :rules="ruleValidate" :label-width="80">
                    <template v-for="(item,index) in confs">
                        <FormItem :label="item.label" v-if="item.type=='input'" :required="item.required" :prop="item.name">
                            <Input v-model="formItem[item.name]" placeholder="请填写内容"></Input>
                        </FormItem>
                        <FormItem :label="item.label" v-if="item.type=='select'" :required="item.required" :prop="item.name">
                            <Select v-model="formItem[item.name]">
                                <Option v-for="(option,optionindex) in item.options" :value="option">{{option}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem :label="item.label" v-if="item.type=='upload'" :required="item.required">
                            <Upload action="cmsapi/upload/uploadimgNoDomainExt" :data="{'hook':item.name}"  :format="item.format" :on-success="uploadSuccess"
                                    :on-format-error="uploadFormatError"
                                    :show-upload-list="false">
                                <Button type="ghost" icon="ios-cloud-upload-outline">点我上传</Button>
                            </Upload>
                            <div class="ivu-form-item-error-tip" v-if="item.required && formItem[item.name]==''">请上传</div>
                        </FormItem>

                    </template>


                    <FormItem>
                        <Button type="primary" @click="save">保存</Button>
                        <Button type="ghost" style="margin-left: 8px">Cancel</Button>
                    </FormItem>
                </Form>
                </Col>
            </Row>
        </Card>

        </Col>


    </Row>
</template>

<script>
    import _ from 'lodash';
    export default {

        name: 'ad-detail-view',
        data() {
            return {
                confs: [
                    {
                        'type': 'input', // 类型输入框
                        'name': 'input1', // 字段名，在confs中，这个name不能重复，一定要唯一
                        'label': '输入框1', // 字段的提示名
                        'default': '默认值', // 默认值 此字段的默认值是空字符串
                        'reg': '', // 校验的正则表达式
                        'required': true, // 是否是必填
                        'message': '请填写' // 校验不通过的提示文字
                    },
                    {
                        'type': 'select', // 类型下拉框
                        'name': 'select1',
                        'label': '下拉框1', // 字段的提示名
                        'default': '默认值', // 默认值 此字段的默认值是空字符串
                        'reg': '', // 校验的正则表达式
                        'required': true, // 是否是必填
                        'message': '', // 校验不通过的提示文字
                        'options': ['选项1', '选项2'] // 下拉框的选项值
                    },
                    {
                        'type': 'upload', // 类型上传文件
                        'name': 'upload1',
                        'label': '上传图片', // 字段的提示名
                        'default': '', // 上传组件 这个没意义，可以不让用户填写
                        'reg': '', // 校验的正则表达式
                        'required': true, // 是否是必填
                        'message': '', // 校验不通过的提示文字
                        'format': ['jpg', 'jpeg', 'png'] // 可以上传的文件类型，如果是[]代表任何文件都可以
                    }
                ],
                formItem: {
                    // input: 'zjl'
                },
                ruleValidate: {
                }
            };
        },
        methods: {
            save() {
                /**
                 * 表单验证
                 */
                let uploadvalid = true;
                for (var i = 0; i < this.confs.length; i++) {
                    let item = this.confs[i];
                    if (item.type === 'upload' && item.required && uploadvalid) {
                        if (_.trim(this.formItem[item.name])) {
                            uploadvalid = false;
                        }
                    }
                }
                this.$refs['form'].validate((valid) => {
                    if (valid && uploadvalid) {
                        // todo 提交表单
                    } else {
                        this.$Message.error('补充完善后，才能保存');
                    }
                });
            },
            uploadSuccess (res, file) {
                if (res.code === 'success') {
                    this.formItem[res.data.hook] = this.$imgurl(res.data.url);
                }
                else {
                    this.$Notice.error({
                        title: '上传失败',
                        desc: res.data.url
                    });
                }
            },
            uploadFormatError(file) {
                this.$Notice.error({
                    title: '不能上传此格式的文件',
                    desc: ''
                });
            },
            initWatch(){
                /**
                 * 挂载watch钩子，当数据有变化的时候，更新预览显示
                 */
                this.$watch('formItem', function (newVal, oldVal) {
                    // 做点什么
                    console.log('newVal',newVal)
                },{
                    deep: true
                });
            }
        },
        created: function () {
            for (var i = 0; i < this.confs.length; i++) {
                let item = this.confs[i];
                if (item.type === 'upload') {
                    this.$set(this.formItem, item.name, '');
                } else {
                    this.$set(this.formItem, item.name, item.default);
                }
                let rule = {required: item.required, message: item.message, trigger: 'blur'};// Pattern
                /**
                 * 如果需要正则验证，注入正则表达式
                 */
                if (_.trim(item.reg)) {
                    rule.Pattern = new RegExp(_.trim(item.reg));
                }

                if (item.type === 'input') {
                    rule.trigger = 'blur';
                } else if (item.type === 'select') {
                    rule.trigger = 'change';
                }
                this.$set(this.ruleValidate, item.name, [rule]);
            }
            this.initWatch();
        }
    };
</script>

<style scoped>

</style>