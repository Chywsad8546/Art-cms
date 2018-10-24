<template>
    <Row>
        <Col span="24">
        <Card>
            <p slot="title">编辑创意</p>
            <Row >
                <Col span="12" style="background-color:#eeeeee">
                <Alert type="warning" v-if="!isNewSystem">此创意由旧广告系统录入，不能修改了，用当前系统再录入一个吧:)</Alert>
                    <div style="display: block;width: 375px;min-height:500px;margin: 0px auto;background-color: #8b8b8b;overflow: hidden">
                        <img style="display: block;width: 375px;" src="http://wap-qn.bidewu.com/cms/shouji.png"/>
                    <div ref="stage" >
                    </div>
                    </div>
                </Col>
                <!--<Col span="12" v-if="!isNewSystem">-->
                <!--</Col>-->
                <Col span="12" v-if="isNewSystem" style="min-width: 400px">
                <Card >
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        标的信息
                    </p>
                    <Form ref="commonForm" :model="commonForm" :rules="commonFormRuleValidate" :label-width="80">
                        <FormItem label="甲方公司名称" required prop="adCompany">
                            <Input v-model="commonForm.adCompany" placeholder="请填写内容"></Input>
                        </FormItem>
                        <FormItem label="创意名称" required prop="adName">
                            <Input v-model="commonForm.adName" placeholder="请填写内容"></Input>
                        </FormItem>
                    </Form>
                </Card>
                <Card >
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        广告信息
                    </p>
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
                        </FormItem>
                    </Form>
                </Card>


                </Col>
            </Row>
        </Card>

        </Col>


    </Row>
</template>

<script>
    import _ from 'lodash';
    import editortemplate from '@/api/advertisement/formtemplateApi';
    import ad from '@/api/advertisement/ad';
    export default {

        name: 'ad-detail-view',
        data() {
            return {
                confs: [
                    // {
                    //     'type': 'input', // 类型输入框
                    //     'name': 'input1', // 字段名，在confs中，这个name不能重复，一定要唯一
                    //     'label': '输入框1', // 字段的提示名
                    //     'default': '默认值', // 默认值 此字段的默认值是空字符串
                    //     'reg': '', // 校验的正则表达式
                    //     'required': true, // 是否是必填
                    //     'message': '请填写' // 校验不通过的提示文字
                    // },
                    // {
                    //     'type': 'select', // 类型下拉框
                    //     'name': 'select1',
                    //     'label': '下拉框1', // 字段的提示名
                    //     'default': '默认值', // 默认值 此字段的默认值是空字符串
                    //     'reg': '', // 校验的正则表达式
                    //     'required': true, // 是否是必填
                    //     'message': '', // 校验不通过的提示文字
                    //     'options': ['选项1', '选项2'] // 下拉框的选项值
                    // },
                    // {
                    //     'type': 'upload', // 类型上传文件
                    //     'name': 'upload1',
                    //     'label': '上传图片', // 字段的提示名
                    //     'default': '', // 上传组件 这个没意义，可以不让用户填写
                    //     'reg': '', // 校验的正则表达式
                    //     'required': true, // 是否是必填
                    //     'message': '', // 校验不通过的提示文字
                    //     'format': ['jpg', 'jpeg', 'png'] // 可以上传的文件类型，如果是[]代表任何文件都可以
                    // }
                ],
                formItem: {
                    // input: 'zjl'
                },
                ruleValidate: {
                },
                arttemplate: '',
                positionId: 0,
                typeId: 0,
                adResource: '',
                commonForm: {
                    adCompany: '',
                    adName: ''
                },
                commonFormRuleValidate: {
                    adCompany: [
                        {required: true, message: '请填写', trigger: 'blur'}
                    ],
                    adName: [
                        {required: true, message: '请填写', trigger: 'blur'}
                    ]
                },
                isNewSystem: false

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
                        if (!_.trim(this.formItem[item.name])) {
                            uploadvalid = false;
                        }
                    }
                }

                this.$refs['commonForm'].validate((commvalid) => {
                    this.$refs['form'].validate((valid) => {
                        if (commvalid && valid && uploadvalid) {
                            if (this.$route.query.id) {
                                ad.editIdea({
                                    idcode: this.$route.query.id,
                                    ideaData: JSON.stringify(this.formItem),
                                    typeId: this.typeId,
                                    positionId: this.positionId,
                                    adCompany: this.commonForm.adCompany,
                                    adName: this.commonForm.adName,
                                    adResource: this.adResource
                                }).then(function (res) {
                                    // todo 跳回到列表页
                                    // this.$router.push({});
                                });
                            } else {
                                ad.addIdea({
                                    ideaData: JSON.stringify(this.formItem),
                                    typeId: this.typeId,
                                    positionId: this.positionId,
                                    adCompany: this.commonForm.adCompany,
                                    adName: this.commonForm.adName,
                                    adResource: this.adResource
                                }).then(function (res) {
                                    // todo 跳回到列表页
                                    // this.$router.push({});
                                });
                            }
                        } else {
                            this.$Message.error('补充完善后，才能保存');
                        }
                    });
                });
            },
            uploadSuccess (res, file) {
                if (res.code === 'success') {
                    this.formItem[res.data.hook] = this.$imgurl(res.data.url);
                } else {
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
            init() {
                /**
                 * 初始化 数据和校验 信息
                 */
                for (var i = 0; i < this.confs.length; i++) {
                    let item = this.confs[i];

                    this.$set(this.formItem, item.name, item.default);
    
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

                /**
                 * 挂载watch钩子，当数据有变化的时候，更新预览显示
                 */
                this.$watch('formItem', function (newVal, oldVal) {
                    // 做点什么
                    var html = template.render(this.arttemplate, newVal);
                    this.adResource = html;
                    $(this.$refs['stage']).html(html);
                }, {
                    deep: true
                });
            }
        },
        created: function () {
            var that = this;
            if (this.$route.query.id) {
                ad.getIdea(this.$route.query.id).then(function (res) {
                    if (res.data.data.isNew) {
                        that.typeId = res.data.data.typeId;
                        let ideares = res.data.data;
                        let ideaData = JSON.parse(res.data.data.adData);
                        editortemplate.getTemplate(res.data.data.typeId).then(function (res) {
                            that.confs = JSON.parse(res.data.data.form);
                            that.confs.forEach(function (item) {
                                item.default = ideaData[item.name] || '';
                            });
                            that.commonForm.adCompany = ideares.adCompany;
                            that.commonForm.adName = ideares.adName;
                            that.arttemplate = res.data.data.template;
                            that.positionId = res.data.data.positionId;
                            that.init();
                            that.isNewSystem = true;
                        });
                    }
                    /**
                     * 旧系统录的创意不能编辑了，只能看
                     */
                    else {
                        that.isNewSystem = false;
                        this.adResource = res.data.data.adResource;
                        $(this.$refs['stage']).html(res.data.data.adResource);
                    }
                });
            } else {
                editortemplate.getTemplate(this.$route.query.templateid).then(function (res) {
                    that.typeId = that.$route.query.templateid;
                    that.confs = JSON.parse(res.data.data.form);
                    that.arttemplate = res.data.data.template;
                    that.positionId = res.data.data.positionId;
                    that.init();
                    that.isNewSystem = true;
                });
            }
        }
    };
</script>

<style scoped>

</style>