<template>
<div class="contenter">
    <Tabs value="name1" class="tabColor">
        <TabPane label="简单编辑器" name="name1">         
                    <Row>
                            <Col span="24">
                            <Card>
                                <p slot="title">创建广告位编辑器</p>
                                <Row >
                                    <Col span="12">
                                        <Button type="primary" v-if="vshowFlag" @click="formModal1 = true">新增选框</Button>
                                        <Form ref="formValidate" :model="formItem" :rules="ruleInline" :label-width="100">
                    
                                        <Table :columns="columns" :data="confs"></Table>

                                            <FormItem label="模板类型" prop="name" style="margin-top:20px;">
                                                <Input v-model="formItem.name" placeholder="请输入模板类型"></Input>
                                            </FormItem>

                                            <!-- <FormItem label="City" prop="city">
                                                <Select v-model="formItem.city" placeholder="Select your city">
                                                    <Option value="beijing">New York</Option>
                                                    <Option value="shanghai">London</Option>
                                                    <Option value="shenzhen">Sydney</Option>
                                                </Select>
                                            </FormItem>  -->
                    
                                            <FormItem label="选择频道位置">
                                                    <Row>
                                                        <Col span="7">
                                                            <FormItem prop="station">                  
                                                                <Select v-model="formItem.station" style="width:100px" @on-change = "zdClick">
                                                                    <Option v-for="item in zhandianList" :value="item.station" :key="item.station">{{ item.stationName }}</Option>
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
                                                    </Row>
                                                </FormItem> 

                                                            
                                            <FormItem label="template" prop="template">
                                                <Input v-model="formItem.template" type="textarea" :rows="6" placeholder="请输入内容"></Input>
                                            </FormItem>                       
                                            <FormItem v-if="vshowFlag">
                                                <Button type="primary" @click="addTemplate('formValidate')">保存</Button>
                                                <Button type="ghost" style="margin-left: 8px">取消</Button>
                                            </FormItem>
                                        </Form>
                                    <Modal
                                        v-model="formModal1"
                                        title="新增选框">
                                        <RadioGroup v-model="inputType">
                                            <Radio label="input">input</Radio>
                                            <Radio label="select">select</Radio>
                                            <Radio label="upload">upload</Radio>
                                        </RadioGroup>
                                        <Form ref="formAdd" :rules="rulebdInsert" :model="formAdd" :label-width="60">
                                            <FormItem label="name"  prop="name">
                                                <Input type="text" v-model="formAdd.name" placeholder="请输入name"></Input>                           
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
                                                <Input type="text" v-model="formAdd.message" placeholder="校验提示文字"></Input>                        
                                            </FormItem>
                                            <FormItem label="options" prop="formOptions" v-if="inputType == 'select'">
                                                <Input v-model="formAdd.options" type="textarea" class="optionsHeight" placeholder="每行一个select回车换行"></Input>
                                            </FormItem>
                                            <FormItem label="文件类型" prop="format" v-if="inputType == 'upload'">
                                                <CheckboxGroup v-model="formAdd.format">
                                                    <Checkbox label="jpg"></Checkbox>
                                                    <Checkbox label="jpeg"></Checkbox>
                                                    <Checkbox label="png"></Checkbox>
                                                </CheckboxGroup>
                                            </FormItem>                       
                                        </Form>
                                        <div slot="footer">
                                            <Button type="primary" size="large"  @click="popupOk('formAdd')">保存</Button>
                                        </div>
                                    </Modal>
                                    </Col>
                                    <Col offset="1" span="11" style="background-color: #00a050">
                                        <Card shadow>
                                            <p slot="title">编辑器预览</p>
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
                                            </Form>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card>
                            </Col>
                        </Row>    
            </TabPane>
        <TabPane label="高级编辑器" name="name2">
            <Form ref="seniorForm" :model="senior" :rules="seniorValidate" :label-width="100">
                <FormItem label="模板类型" prop="name" style="margin-top:20px;" class="seniorClass">
                    <Input v-model="senior.name" placeholder="请输入模板类型"></Input>
                </FormItem>
                <FormItem label="选择频道位置" class="seniorClass">
                        <Row>
                            <Col span="7">
                                <FormItem prop="station">                  
                                    <Select v-model="senior.station" style="width:100px" @on-change = "seniorZdClick">
                                        <Option v-for="item in zhandianList" :value="item.station" :key="item.station">{{ item.stationName }}</Option>
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
                        </Row>
                </FormItem> 
                <FormItem label="路由" prop="route" class="seniorClass">
                    <Select v-model="senior.route" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="template" prop="template" class="seniorClass">
                        <Input v-model="senior.template" type="textarea" :rows="6" placeholder="请输入内容"></Input>
                </FormItem> 
                <FormItem v-if="vshowFlag">
                    <Button type="primary" @click="subRouteAdd('seniorForm')">保存</Button>
                </FormItem>
            </Form>
        </TabPane>
    </Tabs>
    
</div>
</template>

<script>
    import api from '../../api/advertisement/formtemplateApi.js';
    import adSeniorEditorRouter from './adSeniorEditorRouter.js';
    export default {     
        name: 'ad-formtemplate-view',
        data() {
            return {
                formModal1: false,
                inputType: 'input',
                zdmode:{
                    station:""
                },
                Lid:{},
                pdmode:{pageName:""},
                wzmode:{positionId:""},
                zhandianList:[],
                pingdaoList:[],
                seniorWzList:[],
                seniorPdList:[],
                weizhiList:[],
                formAdd: {
                    name: '',
                    label: '',
                    default:'',
                    reg:'',
                    required:true,
                    message:'',
                    options:'',
                    format:[]
                },
                senior: {
                    route:""
                },
                columns:[
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
                    name:"",
                    positionId:"",
                    template:"",
                    form:"",
                    station:"",
                    pageName:""
                },
                ruleInline: {
                    name: [
                        { required: true, message: '请填写类型', trigger: 'blur' }
                    ],
                    template:[
                        { required: true, message: '请填写模板', trigger: 'blur' }
                    ],
                    station: [
                        { type:"number", required: true, message: '请选择站点', trigger: 'change' }
                    ],
                    pageName:[
                        { required: true, message: '请选择频道', trigger: 'change' }
                    ],
                    positionId: [
                        {type:"number", required: true, message: '请选择位置', trigger: 'change' }
                    ]
                },
                rulebdInsert: {
                    name: [
                        { required: true, message: '请填写name', trigger: 'blur' }
                    ],
                    label:[
                        { required: true, message: '请填写label', trigger: 'blur' }
                    ],
                    default: [
                        { required: true, message: '请选择默认名称', trigger: 'change' }
                    ],
                    pageName:[
                        { required: true, message: '请选择位置', trigger: 'change' }
                    ],
                    positionId: [
                        { required: true, message: '请选择位置', trigger: 'change' }
                    ],
                    formOptions:[
                        { required: true, message: '请选择位置', trigger: 'change' }
                    ],
                    format: [
                        { required: true, type: 'array', min: 1, message: '请选择文件格式', trigger: 'change' }
                    ],
                },
                seniorValidate: {
                    route:[
                        { required: true, message: '请选择路由', trigger: 'change' }
                    ],
                },
                vshowFlag: true
            };
        },
        methods: {
            pdClick(){
                api.getPositionInfo(this.formItem).then(response => {
                    this.weizhiList = response.data.data;
                });   
            },
            zdClick(){
                api.getChannelInfo(this.formItem).then(response => {
                    this.pingdaoList = response.data.data;
                });   
            },
            seniorPdClick(){//高级编辑器使用
                api.getPositionInfo(this.senior).then(response => {
                    this.seniorWzList = response.data.data;
                });   
            },
            seniorZdClick(){//高级编辑器使用
                api.getChannelInfo(this.senior).then(response => {
                    this.seniorPdList = response.data.data;
                });   
            },
            getStationInfo() {
                api.getStationInfo().then(response => {
                    this.zhandianList = response.data.data;
                });               
            },
            show() {
                console.log(this.$data);
            },
            moveUp:function(index,item) { 
                //在上一项插入该项 
                this.confs.splice(index-1,0,item);
                //删除后一项 
                this.confs.splice(index+1,1); 
                if(index == 0) { 
                    this.$Message.error("到顶啦！");
                } 
            }, 
            moveDown:function(index,item) { 
                //在下一项插入该项 
                this.confs.splice(index+2,0,item); 
                // 删除前一项 
                this.confs.splice(index,1); 
                if(index == this.confs.length-1) {
                    this.$Message.error("已经是最后一项啦！");
                } 
            }, 
            confsRemove(index){
                    this.confs.splice(index,1);
            },     
            popupOk (name) {
                  this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.confs.length > 0){
                            this.confs.forEach(item => {
                                if(item.name == this.formAdd.name){
                                    this.$Message.error("name名称不能重复");
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
                        if(this.formAdd.reg == true && this.formAdd.message == ""){
                            this.$Message.error("请输入校验不通过提示信息");
                            return false;
                        }
                        let strArr = {
                            'type':this.inputType,
                            'name':this.formAdd.name,
                            'label':this.formAdd.label,
                            'default':this.formAdd.default,
                            'reg':this.formAdd.reg,
                            'required':this.formAdd.required,
                            'message':this.formAdd.message
                        };               
                        if(this.inputType == "select"){
                            strArr.options = this.formAdd.options.split(/[(\r\n)\r\n]+/);                  
                        }
                        if(this.inputType == "upload"){
                            strArr.format = this.formAdd.format;
                        }
                        this.confs.push(strArr);
                        this.cleanData();
                        this.formModal1 = !this.formModal1;  
                    } else {
                        this.$Message.error('请填写内容');
                        return false;
                    }
                }) 
     
            },
            cleanData(){
                this.inputType = "input";
                this.formAdd.name = "";
                this.formAdd.label = "";
                this.formAdd.default = "";
                this.formAdd.reg = "";
                this.formAdd.required = true;
                this.formAdd.message = "";
                this.formAdd.options = "";
                this.formAdd.format = [];
            },
            popupCancel() {
            },
            getIdeaTypeData(){
                this.vshowFlag = !this.vshowFlag;
                api.getIdeaTypeData(this.Lid).then(response => {
                    this.formItem.name = response.data.data.name;
                    this.formItem.template = response.data.data.template;
                    this.confs = JSON.parse(response.data.data.form);
                     //   console.log(JSON.parse(response.data.data.form));
                });
            },
            addTemplate(name) {
                console.log(this.formItem);
                this.$refs[name].validate((valid) => {
                    if (valid) {
                            if(this.confs.length <= 0){
                                this.$Message.error("请添加选框"); 
                                return false;
                            }
                            this.formItem.form = JSON.stringify(this.confs);
                            api.addTemplate(this.formItem).then(response => {
                                this.$Message.success("添加成功"); 
                                this.$router.push({
                                    name: "templateList"
                                });
                            });
                    }
                })

                // if(this.formItem.name == ""){
                //     this.$Message.error("请填写类型"); 
                //     return false;                    
                // }
                // if(this.formItem.template == ""){
                //     this.$Message.error("请填写模板"); 
                //     return false;                    
                // }
                // if(this.formItem.positionId == ""){
                //     this.$Message.error("请选择位置"); 
                //     return false;                    
                // }

            }
        },
        subRouteAdd(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {

                    }
                })
        },
        created: function () {
            this.getStationInfo();
            console.log(adSeniorEditorRouter);
            this.Lid.id = this.$route.query.advertId;
            if(this.Lid.id != undefined){
                this.getIdeaTypeData();
            }else{
                let tableJson = {
                            title: 'Action',
                            key: 'action',
                            width: 240,
                            align: 'center',
                            render: (h, params) => {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.moveUp(params.index,params.row)
                                            }
                                        }
                                    }, '上移'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.moveDown(params.index,params.row)
                                            }
                                        }
                                    }, '下移'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.confsRemove(params.index)
                                            }
                                        }
                                    }, 'Delete')
                                ]);
                            }
                        }
                this.columns.push(tableJson);
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
</style>