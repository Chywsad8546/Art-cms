<template>
  <Row>
    <Col span="100">
    <!--<Button type="primary" v-if="pushForm.mashine" @click="showmodel" >添加任务</Button>-->
    <Select v-model="pageparam.type"  style="width:200px">
      <Option value="1" label="二手房">
      </Option>
      <Option value="2" label="租房">
      </Option>
    </Select>
    <Button type="primary"  @click="typechange" >查询</Button>
    <Button type="primary"  @click="init" >刷新</Button>
    <Card >
      <Table border :columns="columns" :data="data"></Table>
      <Page :total="total" show-total  @on-change="pageChange" :current="pageparam.pageindex" :page-size="20" style="margin-top:10px; text-align:right"></Page>
    </Card>

    </Col>
    <!--<Modal v-model="addModel" :loading="pushLoading" @on-ok="pushOk"  width="600">-->
      <!--<p slot="header">-->
        <!--<span>创建任务</span>-->
      <!--</p>-->
      <!--<Form ref="pushForm" :model="pushForm" :rules="pushFormRules" :label-width="180">-->
        <!--<FormItem label="任务名称：" prop="name">-->
          <!--<Input v-model="pushForm.name" ></Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="镜像：" prop="image">-->
          <!--<Input v-model="pushForm.image" ></Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="cron：" prop="cron" >-->

          <!--<Input v-model="pushForm.cron" ></Input>-->
          <!--&lt;!&ndash;<Select v-model="pushForm.cron" >&ndash;&gt;-->
            <!--&lt;!&ndash;<Option  value="0">安卓</Option>&ndash;&gt;-->
            <!--&lt;!&ndash;<Option  value="1">IOS</Option>&ndash;&gt;-->
          <!--&lt;!&ndash;</Select>&ndash;&gt;-->
        <!--</FormItem>-->
        <!--<FormItem label="cron说明："  >-->
          <!--不填写了cron就不会定时执行-->

        <!--</FormItem>-->
        <!--<FormItem label="机器："  >-->
          <!--{{pushForm.mashinename}}-->
        <!--</FormItem>-->
      <!--</Form>-->
    <!--</Modal>-->
  </Row>
</template>
<script>
import api from "@/api/dalaran/spiderjobs.js";


export default {
  data() {
    return {
        total:0,
        pushForm:{
            id:"",
            name:"",
            image:"",
            cron:"",
            mashine:"",
            mashinename:""
        },
        pushFormRules: {
            name: [
                { required: true, message: '任务名称', trigger: 'blur' }
            ],
            image: [
                { required: true, message: '镜像', trigger: 'blur' }
            ]
        },
        addModel:false,
        pushLoading:true,
      columns: [
          {
              title: "ID",
              key:"id",
              width: 80,
              fixed: 'left',
          },
          {
              title: "任务名称",
              key:"name",
              fixed: 'left',
              width: 100,
          },
          {
              title: "类型",
              width: 80,
              render:function (h, param) {

                  let name="二手房";
                  if (param.row.type==2){
                      name="租房";
                  }


                  return h("span",name);
              }
          },
          {
              title: "来源",
              width: 80,
              render:function (h, param) {

                  let name="N/A";
                  if (param.row.type==1){
                      name="安居客";
                  }
                  else if (param.row.type==2){
                      name="安居客";
                  }
                  else if (param.row.type==3){
                      name="21世纪";
                  }
                  else if (param.row.type==4){
                      name="Q房";
                  }
                  else if (param.row.type==5){
                      name="优居";
                  }
                  else if (param.row.type==6){
                      name="中环";
                  }
                  else if (param.row.type==7){
                      name="麦田";
                  }
                  else if (param.row.type==8){
                      name="合富-房王网";
                  }
                  else if (param.row.type==9){
                      name="我爱我家";
                  }
                  return h("span",name);
              }
          },

          {
              title: "定时执行",
              width: 100,
              render:(h, params) =>  {
                  let that=this;
                  let enable="";
                  let yanse="";
                  if (params.row.enable==1){
                      enable="已定时";
                      yanse="green";

                  }
                  let coms=[];
                  let startenablebtn=h(
                      'Poptip',
                      {
                          props: {
                              confirm: true,
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px'
                          },
                          on: {
                              "on-ok": () => {
                                  this.enablejob(params.row.id);
                              }
                          }
                      },[h('Button',{
                          props: {
                              type: 'error',
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px'
                          }
                      },'没定时')]
                  );
                  let stopenablebtn=h(
                      'Poptip',
                      {
                          props: {
                              confirm: true,
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px'
                          },
                          on: {
                              "on-ok": () => {
                                  this.disablejob(params.row.id);
                              }
                          }
                      },[h('Button',{
                          props: {
                              type: 'success',
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px'
                          }
                      },'已定时')]
                  );
                  if(params.row.enable==0){
                      coms.push(startenablebtn);
                  }
                  else {
                      coms.push(stopenablebtn);
                  }
                  return h('div', coms);

              }
          },
        {
          title: "运行状态",
            width: 80,
            render:function (h, param) {
                let enable="空闲";
                let yanse="black";
                if (param.row.status==1){
                    enable="等待运行";
                    yanse="blue";

                }
                else if (param.row.status==2){
                    enable="运行中";
                    yanse="green";

                }
                else if (param.row.status==3){
                    enable="停止中";
                    yanse="red";
                }
                else if (param.row.status==4){
                    enable="启动中";
                    yanse="orange";
                }

                return h("span",{
                    style:{
                        color:yanse
                    }
                },enable);
            }
        },
          {
              key: "city_en",
              title: "city_en",
              width: 100,
          },
          {
              key: "city_id",
              title: "city_id",
              width: 100,
          },
          {
              key: "nexttime",
              title: "下一次运行时间",
              width: 150,
          },
          {
              key: "now_mashines",
              title: "运行中的机器数量",
              width: 80,
          },
          {
              width: 150,
              title:"操作",
              render:(h, params) =>  {
                  let stopbutton = h(
                      'Poptip',
                      {
                          props: {
                              confirm: true,
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px'
                          },
                          on: {
                              "on-ok": () => {
                                  this.stopjob(params.row.id);
                              }
                          }
                      },[h('Button',{
                          props: {
                              type: 'error',
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px'
                          }
                      },'手动停止')]
                  );
                  let startbtn=h(
                      'Poptip',
                      {
                          props: {
                              confirm: true,
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px'
                          },
                          on: {
                              "on-ok": () => {
                                  this.startjob(params.row.id);
                              }
                          }
                      },[h('Button',{
                          props: {
                              type: 'success',
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px'
                          }
                      },'手动启动')]
                  );


                  let btns=[]
                  if(params.row.status==0){
                      btns.push(startbtn);
                  }
                  else if(params.row.status==1 || params.row.status==2){
                      btns.push(stopbutton);
                  }

                  return h('div', btns);
              }
          },

          {
              // key:'reason',
              title: "最近一次停止原因",
              width: 200,
              render: (h, param)=> {
                  let yanse='black';
                  if(param.row.reason!='正常停止'){
                      yanse="red";
                  }
                  return h('span',{
                      style: {
                          marginRight: '5px',
                          color:yanse
                      },
                  },param.row.reason)
              }
          },
          {
              key: "starttime",
              title: "最近一次运行时间",
              width: 150,
          },
          {
              key: "endtime",
              title: "最近一次结束时间",
              width: 150,
          },



      ],
      data: [],
        pageparam:{pageindex:1,pagesize:20,type:""}
    };
  },
  methods: {
      disablejob(id){
          api.enablejob({id:id,enable:0}).then(res=>{
              this.init();
          });
      },
      enablejob(id){
          api.enablejob({id:id,enable:1}).then(res=>{
              this.init();
          });
      },
      stopjob(id){
          api.stopjob({id:id}).then(res=>{
            if(res.data=='0'){
                this.$Message.success('已经停止');
            }
            else if(res.data=='1'){
                this.$Message.success('停止中，请稍后');
            }
              this.init();
          }).catch(error=>{

          })
      },
      startjob(id){
          api.startjob({id:id}).then(res=>{
              if(res.data=='0'){
                  this.$Message.success('运行中');
              }
              else if(res.data=='1'){
                  this.$Message.success('启动中，请稍后');
              }
              this.init();
          }).catch(error=>{

          })
      },
      changeModalLoading() {
          this.pushLoading = false;
          this.$nextTick(() => {
              this.pushLoading = true;
          });
      },
      pushOk(){
          this.$refs.pushForm.validate((valid) => {
              if (valid) {
                  if(this.pushForm.id){
                    api.updatejob(this.pushForm).then(res=>{
                        console.log(res)
                        this.addModel = false;
                        this.pushLoading = false;
                        this.tabchange(this.pushForm.mashine);
                    }).catch(error=>{

                    });
                  }
                  else {
                      api.createjob(this.pushForm).then(res => {
                          this.addModel = false;
                          this.pushLoading = false;
                          this.tabchange(this.pushForm.mashine);
                      }).catch(error => {
                          this.$Message.error(error.response.data);
                          this.changeModalLoading();
                      });
                  }
              }
              else{
                  this.changeModalLoading();
              }
          })
      },
      showmodel(){
          this.pushForm.id="";
          this.pushForm.cron="";
          this.pushForm.image="";
          this.pushForm.name="";
          this.addModel=true;
      },
      typechange(){
          this.pageChange(1)
      },
      pageChange(param){
          this.pageparam.pageindex=param;
          api.getjobs(this.pageparam).then(res=>{
              this.data=res.data.data;
              this.total=res.data.count;
          })
      },
    init() {
        api.getjobs(this.pageparam).then(res=>{
            this.data=res.data.data;
            this.total=res.data.count;
        })
    },

  },
  created() {
    this.init();
  }
};
</script>
