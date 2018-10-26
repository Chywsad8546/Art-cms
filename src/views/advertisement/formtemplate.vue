<template>
<div class="contenter">
    <!-- <Tabs value="name1" v-model="tabName" class="tabColor">
        <TabPane v-if="isAdvancedEdit == 0" label="简单编辑器" name="name1">          -->
            <div v-if="ordinaryEditor" class="editorContent">
                    <Row>
                            <Col span="24">

                                <Row >
                                    <Col span="12">
                                    <Card >
                                        <p slot="title">
                                            <Icon type="ios-film-outline"></Icon>
                                            基本信息
                                        </p>
                                        <a href="#" slot="extra"  @click.prevent="formModal1 = true" >
                                            <Icon type="ios-paper"></Icon>
                                            设置编辑器
                                        </a>
                                        <Form ref="formValidate" :model="formItem" :rules="ruleInline" :label-width="100">
                                            <FormItem label="编辑器名称" prop="name" style="margin-top:20px;">
                                                <Input v-model="formItem.name" placeholder="请输入编辑器名称"></Input>
                                            </FormItem>
                                            <FormItem label="频道位置">
                                                {{positionName}}
                                                <!-- <Row>
                                                    <Col span="7">
                                                    <FormItem prop="station">
                                                        <Select v-model="formItem.stationId" style="width:100px" @on-change = "zdClick">
                                                            <Option v-for="item in zhandianList" :value="item.stationId" :key="item.stationId">{{ item.stationName }}</Option>
                                                        </Select>
                                                    </FormItem>
                                                    </Col>
                                                    <Col span="7">
                                                    <FormItem prop="pageName">
                                                        <Select v-model="formItem.pageName" style="width:100px"  @on-change = "pdClick">
                                                            <Option v-for="item in pingdaoList" :value="item.pageName" :key="item.pageName">{{ item.pageName }}</Option>
                                                        </Select>
                                                    </FormItem>
                                                    </Col>
                                                    <Col span="7">
                                                    <FormItem prop="positionId">
                                                        <Select v-model="formItem.positionId" style="width:100px">
                                                            <Option v-for="item in weizhiList" :value="item.positionId" :key="item.positionId">{{ item.positionName }}</Option>
                                                        </Select>
                                                    </FormItem>
                                                    </Col>
                                                </Row> -->
                                            </FormItem>
                                            <FormItem label="artTemplate" prop="template">
                                                <Poptip trigger='hover' class='iconClass' placement='right' title='artTemplate是什么' content='artTemplate是一个模板引擎,官网 http://aui.github.io/art-template/zh-cn/'><Icon type='help' /></Poptip>
                                                <Input v-model="formItem.template" type="textarea" :rows="6" placeholder="请输入内容"></Input>
                                            </FormItem>
                                            <FormItem >
                                                <Button type="primary" @click="addTemplate('formValidate')">保存</Button>
                                                <Button type="ghost" style="margin-left: 8px">取消</Button>
                                            </FormItem>
                                        </Form>
                                    </Card>

                                    <Modal
                                        v-model="formModal1"
                                        title="新增选框">
                                        <RadioGroup v-model="inputType" style="margin-bottom:20px;" @on-change="tabRadioClick">
                                            <Radio label="input">input</Radio>
                                            <Radio label="select">select</Radio>
                                            <Radio label="upload">upload</Radio>
                                        </RadioGroup>
                                        <Form ref="formAdd" :rules="rulebdInsert" :model="formAdd" :label-width="80">
                                            <FormItem label="name"  prop="name">
                                                <Input type="text"  v-model="formAdd.name" placeholder="请输入name"></Input>                           
                                            </FormItem>                       
                                            <FormItem label="label"  prop="label">
                                                <Input type="text" v-model="formAdd.label" placeholder="请输入label"></Input>                           
                                            </FormItem>
                                            <FormItem label="default"  prop="default">
                                                <Input type="text" v-model="formAdd.default" placeholder="请输入default"></Input>                           
                                            </FormItem>
                                            <FormItem label="正则"  prop="reg" v-if="inputType == 'input'">
                                                <Input type="text" v-model="formAdd.reg" placeholder="请输入正则"></Input>                           
                                            </FormItem>
                                            <FormItem label="是否必填">
                                                <i-switch v-model="formAdd.required" size="large">
                                                    <span slot="open">On</span>
                                                    <span slot="close">Off</span>
                                                </i-switch>
                                            </FormItem>
                                            <FormItem label="提示文字"  prop="message" v-if="inputType == 'input'">
                                                <Input type="text"  v-model="formAdd.message" placeholder="校验提示文字"></Input>                        
                                            </FormItem>
                                            <FormItem label="options" prop="options" v-if="inputType == 'select'">
                                                <Input v-model="formAdd.options" type="textarea" class="optionsHeight" placeholder="每行一个select回车换行"></Input>
                                            </FormItem>
                                            <!-- <FormItem label="文件类型" prop="format" v-if="inputType == 'upload'">
                                                <CheckboxGroup v-model="formAdd.format">
                                                    <Checkbox label="jpg"></Checkbox>
                                                    <Checkbox label="jpeg"></Checkbox>
                                                    <Checkbox label="png"></Checkbox>
                                                </CheckboxGroup>
                                            </FormItem>                        -->
                                        </Form>
                                        <div slot="footer">
                                            <Button type="primary" size="large"  @click="popupOk('formAdd')">新增</Button>
                                        </div>
                                    </Modal>
                                    </Col>
                                    <Col  span="12" >
                                    <!--<Table :columns="columns" :data="confs"></Table>-->
                                    </Col>
                                </Row>
                        <Card shadow>
                            <p slot="title">编辑器预览</p>
                                <Row >
                                    <Col span="12" style="background-color:#eeeeee">
                                    <div style="display: block;width: 375px;min-height:500px;margin: 0px auto;background-color: #ffffff;overflow: hidden">
                                        <img style="display: block;width: 375px;" src="http://wap-qn.bidewu.com/cms/shouji.png"/>
                                        <div ref="stage" >
                                        </div>
                                    </div>
                                    </Col>
                                    <Col  span="12" >

                                    <Form ref="form" :model="editorformItem" :rules="ruleValidate" :label-width="80">
                                        <template v-for="(item,index) in confs">

                                            <FormItem :label="item.label" v-if="item.type=='input'" :required="item.required" :prop="item.name">
                                                <Poptip trigger="hover" class="iconClass" title="变量名" :content="item.name"><Icon type="help" /></Poptip>
                                                <Input class="zswidht" v-model="editorformItem[item.name]" placeholder="请填写内容"></Input>

                                            </FormItem>
                                            <FormItem :label="item.label" v-if="item.type=='select'" :required="item.required" :prop="item.name">
                                                <Poptip trigger="hover" class="iconClass" title="变量名" :content="item.name"><Icon type="help" /></Poptip>
                                                <Select class="zswidht" v-model="editorformItem[item.name]">
                                                    <Option v-for="(option,optionindex) in item.options" :value="option">{{option}}</Option>
                                                </Select>
                                            </FormItem>
                                            <FormItem :label="item.label" v-if="item.type=='upload'" :required="item.required">
                                                <Poptip trigger="hover" class="iconClass" title="变量名" :content="item.name"><Icon type="help" /></Poptip>
                                                <Upload class="zswidht" action="cmsapi/upload/uploadimgNoDomainExt" :data="{'hook':item.name}"  :format="item.format" :on-success="uploadSuccess"
                                                        :on-format-error="uploadFormatError"
                                                        :show-upload-list="false">
                                                    <Button type="ghost" icon="ios-cloud-upload-outline">点我上传</Button>
                                                </Upload>
                                                <div class="ivu-form-item-error-tip" v-if="item.required && editorformItem[item.name]==''">请上传</div>
                                            </FormItem>

                                        </template>


                                        <!--<FormItem>-->
                                            <!--<Button type="primary" >保存</Button>-->
                                        <!--</FormItem>-->
                                    </Form>
                                    </Col>
                                </Row>
                        </Card>
                            </Col>
                        </Row>  
        </div>
          <div v-if="seniorEditor" class="editorContent" style="padding-top:10px; padding-bottom:10px;">
            <!-- </TabPane>
        <TabPane v-if="isAdvancedEdit == 1" label="高级编辑器" name="name2"> -->
            <Form ref="seniorForm" :model="senior" :rules="seniorValidate" :label-width="100">
                <FormItem label="编辑器名称" prop="name" style="margin-top:20px;" class="seniorClass">
                    <Input v-model="senior.name" placeholder="请输入编辑器名称"></Input>
                </FormItem>
                <FormItem label="选择频道位置" class="seniorClass">
                     {{positionName}}
                        <!-- <Row>
                            <Col span="7">
                                <FormItem prop="station">                  
                                    <Select v-model="senior.stationId" style="width:100px" @on-change = "seniorZdClick">
                                        <Option v-for="item in zhandianList" :value="item.stationId" :key="item.stationId">{{ item.stationName }}</Option>
                                    </Select>
                                </FormItem>                                        
                            </Col>
                            <Col span="7">                  
                                <FormItem prop="pageName">
                                    <Select v-model="senior.pageName" style="width:100px"  @on-change = "seniorPdClick">
                                        <Option v-for="item in seniorPdList" :value="item.pageName" :key="item.pageName">{{ item.pageName }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="7">                  
                                <FormItem prop="positionId">
                                    <Select v-model="senior.positionId" style="width:100px">
                                        <Option v-for="item in seniorWzList" :value="item.positionId" :key="item.positionId">{{ item.positionName }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row> -->
                </FormItem> 
                <FormItem label="路由" prop="form" class="seniorClass">
                    <Select v-model="senior.form" placeholder="请选择路由">
                         <Option v-for="item in editorRouterList" :value="item.name" :key="item.name">{{ item.title }}</Option>
                    </Select>
                </FormItem>
                <!-- <FormItem label="template" prop="template" class="seniorClass">
                        <Input v-model="senior.template" type="textarea" :rows="6" placeholder="请输入内容"></Input>
                </FormItem>  -->
                <FormItem>
                    <Button type="primary" @click="subRouteAdd('seniorForm')">保存</Button>
                </FormItem>
            </Form>
        </div>
        <!-- </TabPane>
    </Tabs> -->
    
</div>
</template>

<script>
    import api from '../../api/advertisement/formtemplateApi.js';
    import adSeniorEditorRouter from './advertiseEditor/adSeniorEditorRouter.js';
import { setTimeout } from 'timers';
    export default {
        name: 'ad-formtemplate-view',
        data() {
            return {
                formModal1: false,
                inputType: 'input',
                tabName: 'name1',
                Lid: {},
                zhandianList: [],
                pingdaoList: [],
                seniorWzList: [],
                seniorPdList: [],
                weizhiList: [],
                positionName:"",
                editorRouterList: [],
                seniorEditor: false,
                ordinaryEditor:false,
                formAdd: {
                    name: '',
                    label: '',
                    default: '',
                    reg: '',
                    required: true,
                    message: '请填写',
                    options: '',
                    format: []
                },
                senior: {
                    name: '',
                    form: '',
                    template: '',
                    positionId: 0,
                    stationId: '',
                    pageName: '',
                    isAdvancedEdit: 1
                },
                columns: [
                    {
                        title: '提示名',
                        key: 'label'
                    },
                    {
                        title: '组件类型',
                        key: 'type'
                    }
                ],
                confs: [
                    // {
                    //     'type': 'input', //类型输入框
                    //     'name': 'input1',//字段名，在confs中，这个name不能重复，一定要唯一
                    //     'label':'输入框1',//字段的提示名
                    //     'default': '', //默认值 此字段的默认值是空字符串
                    //     'reg': '', //校验的正则表达式
                    //     'required': true, //是否是必填
                    //     'message': '' //校验不通过的提示文字
                    // },
                    // {
                    //     'type': 'select', //类型下拉框
                    //     'name': 'select1',
                    //     'label':'下拉框1',//字段的提示名
                    //     'default': '默认值', //默认值 此字段的默认值是空字符串
                    //     'reg': '', //校验的正则表达式
                    //     'required': true, //是否是必填
                    //     'message': '', //校验不通过的提示文字
                    //     'options':['选项1','选项2'] // 下拉框的选项值
                    // },
                    // {
                    //     'type': 'upload', //类型上传文件
                    //     'name': 'upload1',
                    //     'label':'上传图片',//字段的提示名
                    //     'default': '默认值', //上传组件 这个没意义，可以不让用户填写
                    //     'reg': '', //校验的正则表达式
                    //     'required': true, //是否是必填
                    //     'message': '', //校验不通过的提示文字
                    //     'format':['jpg','jpeg','png'] // 可以上传的文件类型，如果是[]代表任何文件都可以
                    // }
                ],
                formItem: {
                    name: '',
                    positionId: '',
                    template: '<div style="width: 375px; float: left; height: 500px; overflow: auto;min-height: 500px; " ><p style="color:#cccccc;text-align:center;">{{@ input1}}</p><div><img src="{{@ upload1}}" style="width:100%"/></div></div>',
                    form: '',
                    stationId: '',
                    pageName: '',
                    isAdvancedEdit: 0
                },
                ruleInline: {
                    name: [
                        { required: true, message: '请填写类型', trigger: 'blur' }
                    ],
                    template: [
                        { required: true, message: '请填写模板', trigger: 'blur' }
                    ],
                    station: [
                        { required: true, message: '请选择站点', trigger: 'change' }
                    ],
                    pageName: [
                        { required: true, message: '请选择频道', trigger: 'change' }
                    ],
                    positionId: [
                        {type: 'number', required: true, message: '请选择位置', trigger: 'change' }
                    ]
                },
                rulebdInsert: {
                    name: [
                        { required: true, message: '请填写name', trigger: 'blur' },
                        { type: 'string',pattern:/^[0-9A-Za-z_]+$/, message:'只能输入字母数字和下划线', trigger:'blur'},
                    ],
                    label: [
                        { required: true, message: '请填写label', trigger: 'blur' }
                    ],
                    default: [
                        { required: true, message: '请选择默认名称', trigger: 'change' }
                    ],
                    pageName: [
                        { required: true, message: '请选择位置', trigger: 'change' }
                    ],
                    positionId: [
                        { required: true, message: '请选择位置', trigger: 'change' }
                    ],
                    options: [
                        { required: true, message: '请选择位置', trigger: 'blur' }
                    ],
                    format: [
                        { required: true, type: 'array', min: 1, message: '请选择文件格式', trigger: 'change' }
                    ]
                },
                seniorValidate: {
                    form: [
                        { required: true, message: '请选择路由', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请填写类型', trigger: 'change' }
                    ],
                    template: [
                        { required: true, message: '请填写模板', trigger: 'blur' }
                    ],
                    station: [
                        { required: true, message: '请选择站点', trigger: 'change' }
                    ],
                    pageName: [
                        { required: true, message: '请选择频道', trigger: 'change' }
                    ],
                    positionId: [
                        {type: 'number', required: true, message: '请选择位置', trigger: 'change' }
                    ]
                },
                /**
                 * 编辑器预览相关的几个变量
                 */
                editorformItem: {
                },
                ruleValidate: {
                },
                editorformunwatch:null,
                editortemplateunwatch:null
            };
        },
        methods: {
            tabRadioClick(){
                if(this.inputType == "upload"){
                    this.formAdd.default = "http://wap-qn.toutiaofangchan.com/adideas/luodiyesucai/5b00600178e84b91b5f4fe78a5eed91c/1.png";
                }else{
                    this.formAdd.default = "";
                }
            },
            pdClick() {
                api.getPositionInfo(this.formItem).then(response => {
                    this.weizhiList = response.data.data;
                });
            },
            zdClick() {
                api.getChannelInfo(this.formItem).then(response => {
                    this.pingdaoList = response.data.data;
                });
            },
            seniorPdClick() { // 高级编辑器使用
                api.getPositionInfo(this.senior).then(response => {
                    this.seniorWzList = response.data.data;
                });
            },
            seniorZdClick() { // 高级编辑器使用
                api.getChannelInfo(this.senior).then(response => {
                    this.seniorPdList = response.data.data;
                });
            },
            getStationInfo() {
                api.getStationInfo().then(response => {
                    
                    this.zhandianList = response.data.data;
                    this.zhandianList.forEach(item=>{
                      item.stationId = item.stationId+'';
                    });
                    // console.log(this.zhandianList);
                });
                

            },
            adListAll() {
                api.adListAll({positionId:this.formItem.positionId}).then(response => {
                    if (response.data.data[0].isAdvancedEdit == 1) {
                        this.seniorEditor= true;
                    } else {
                        this.ordinaryEditor=true;
                    }
                    this.positionName = response.data.data[0].pageName+' / '+ response.data.data[0].positionName;
                });
            },
            show() {
                console.log(this.$data);
            },
            moveUp: function(index, item) {
                // 在上一项插入该项
                this.confs.splice(index - 1, 0, item);
                // 删除后一项
                this.confs.splice(index + 1, 1);
                if (index == 0) {
                    this.$Message.error('到顶啦！');
                }
            },
            moveDown: function(index, item) {
                // 在下一项插入该项
                this.confs.splice(index + 2, 0, item);
                // 删除前一项
                this.confs.splice(index, 1);
                if (index == this.confs.length - 1) {
                    this.$Message.error('已经是最后一项啦！');
                }
            },
            confsRemove(index) {
                this.confs.splice(index, 1);
            },
            popupOk (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.confs.length > 0) {
                            this.confs.forEach(item => {
                                if (item.name == this.formAdd.name) {
                                    this.$Message.error('name名称不能重复');
                                    return false;
                                }
                            });
                        }
                        // if(this.formAdd.name == ""){
                        //     this.$Message.error("请输入name");
                        //     return false;
                        // }
                        // if(this.formAdd.label == ""){
                        //     this.$Message.error("请输入label");
                        //     return false;
                        // }
                        if (this.formAdd.reg == true && this.formAdd.message == '') {
                            this.$Message.error('请输入校验不通过提示信息');
                            return false;
                        }
                        let strArr = {
                            'type': this.inputType,
                            'name': this.formAdd.name,
                            'label': this.formAdd.label,
                            'default': this.formAdd.default,
                            'reg': this.formAdd.reg,
                            'required': this.formAdd.required,
                            'message': this.formAdd.message
                        };
                        if (this.inputType == 'select') {
                            strArr.options = this.formAdd.options.split(/[(\r\n)\r\n]+/);
                        }
                        if (this.inputType == 'upload') {
                            strArr.format = this.formAdd.format;
                        }
                        this.confs.push(strArr);
                        this.cleanData();
                        this.formModal1 = !this.formModal1;
                        this.editorTry();
                    } else {
                        this.$Message.error('请填写内容');
                        return false;
                    }
                });
            },
            cleanData() {
                this.inputType = 'input';
                this.formAdd.name = '';
                this.formAdd.label = '';
                this.formAdd.default = '';
                this.formAdd.reg = '';
                this.formAdd.required = true;
                this.formAdd.message = '';
                this.formAdd.options = '';
                this.formAdd.format = [];
            },
            popupCancel() {
            },
            getIdeaTypeData() {
                api.getIdeaTypeData(this.Lid).then(response => {
                    if (response.data.data.isAdvancedEdit == 1) {
                        // setTimeout(() => {
                        //     this.tabName = 'name2';
                        // }, 300);
                        this.senior.name = response.data.data.name;
                        this.senior.form = response.data.data.form;
                        //this.senior.template = response.data.data.template;
                    } else {
                       // this.ordinaryEditor=true;
                        this.formItem.name = response.data.data.name;
                        this.formItem.template = response.data.data.template;
                        this.confs = JSON.parse(response.data.data.form);
                        this.editorTry(true);
                    }
                    this.formItem.positionId = response.data.data.positionId;
                    this.adListAll();
                });
            },
            addTemplate(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.confs.length <= 0) {
                            this.$Message.error('请添加选框');
                            return false;
                        }
                        this.formItem.form = JSON.stringify(this.confs);
                        console.log(this.formItem);
                        api.addTemplate(this.formItem).then(response => {
                            this.$Message.success('添加成功');
                            this.$router.push({
                                name: 'positionManagement'
                            });
                        });
                    }
                });
            },
            subRouteAdd(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        api.addTemplate(this.senior).then(response => {
                            this.$Message.success('添加成功');
                            this.$router.push({
                                name: 'positionManagement'
                            });
                        });
                    }
                });
            },
            uploadSuccess (res, file) {
                if (res.code === 'success') {
                    this.editorformItem[res.data.hook] = this.$imgurl(res.data.url);
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
            editorTry(created) {
                if(this.unwatch){
                    try{
                        this.unwatch();
                    }
                    catch (e){
                        console.error(e);
                    }
                }
                if(this.editortemplateunwatch){
                    try{
                        this.editortemplateunwatch();
                    }
                    catch (e){
                        console.error(e);
                    }
                }

                for (var key in this.ruleValidate) {
                    this.$delete(this.ruleValidate, key);
                }
                for (var key in this.editorformItem) {
                    this.$delete(this.editorformItem, key);
                }

                /**
                 * 初始化 数据和校验 信息
                 */
                for (var i = 0; i < this.confs.length; i++) {
                    let item = this.confs[i];

                    this.$set(this.editorformItem, item.name, item.default);

                    let rule = {required: item.required, message: item.message, trigger: 'blur'};// Pattern
                    /**
                     * 如果需要正则验证，注入正则表达式
                     */
                    if (_.trim(item.reg)) {
                        console.log('reg',item.reg)
                        rule.pattern = new RegExp(_.trim(item.reg));
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
                this.unwatch  = this.$watch('editorformItem', function (newVal, oldVal) {
                    // 做点什么
                    try {
                        var html = template.render(this.formItem.template, newVal);
                        $(this.$refs['stage']).html(html);
                    }
                    catch (e){
                        $(this.$refs['stage']).html(html);
                    }

                }, {
                    deep: true
                });
                this.editortemplateunwatch = this.$watch('formItem.template', function (newVal, oldVal) {
                    // 做点什么
                    try {
                        var html = template.render(newVal, this.editorformItem);
                        $(this.$refs['stage']).html(html);
                    }
                    catch (e){
                        $(this.$refs['stage']).html(html);
                    }

                });
                if(created){
                    try {
                        var html = template.render(this.formItem.template, this.editorformItem);
                        $(this.$refs['stage']).html(html);
                    }
                    catch (e){
                        $(this.$refs['stage']).html(html);
                    }
                }
            }
        },

        created: function () {
            this.getStationInfo();
            this.editorRouterList = adSeniorEditorRouter.editorRouters;
            this.Lid.id = this.$route.query.advertId;

            if (this.Lid.id != undefined) {
                this.getIdeaTypeData();
            }
            else {
                this.formItem.positionId = this.$route.query.positionId;
                this.adListAll();
            }
        }
    };
</script>

<style>
.optionsHeight textarea.ivu-input {
        height: 200px;
}
.tabColor {
    width: 100%;
    overflow: hidden;
    background: #ffffff;
}
.seniorClass {
    width: 50%;
}
.zswidht {
    width: 50%;
}
.iconClass {
    float: left;
    margin-right: 10px;
}
.editorContent {
    width: 100%;
    background: #ffffff;
}
</style>