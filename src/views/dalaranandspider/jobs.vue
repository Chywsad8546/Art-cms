<template>
  <Row>
    <Col span="100">
    <Button type="primary" v-if="pushForm.mashine" @click="showmodel" >添加任务</Button>
    <Menu mode="horizontal" theme="light" @on-select="tabchange">
      <MenuItem v-for="tab in mashines" :name="tab.id" >
        <Icon type="ios-paper"></Icon>
        {{tab.name}}
      </MenuItem>

    </Menu>
    <Card >
      <Table border :columns="columns" :data="data"></Table>
    </Card>

    </Col>
    <Modal v-model="addModel" :loading="pushLoading" @on-ok="pushOk"  width="600">
      <p slot="header">
        <span>创建任务</span>
      </p>
      <Form ref="pushForm" :model="pushForm" :rules="pushFormRules" :label-width="180">
        <FormItem label="任务名称：" prop="name">
          <Input v-model="pushForm.name" ></Input>
        </FormItem>
        <FormItem label="镜像：" prop="image">
          <Input v-model="pushForm.image" ></Input>
        </FormItem>
        <FormItem label="cron：" prop="cron" >

          <Input v-model="pushForm.cron" ></Input>
          <!--<Select v-model="pushForm.cron" >-->
            <!--<Option  value="0">安卓</Option>-->
            <!--<Option  value="1">IOS</Option>-->
          <!--</Select>-->
        </FormItem>
        <FormItem label="cron说明："  >
          不填写了cron就不会定时执行

        </FormItem>
        <FormItem label="机器："  >
          {{pushForm.mashinename}}
        </FormItem>
      </Form>
    </Modal>
  </Row>
</template>
<script>
import api from "@/api/dalaran/jobs.js";


export default {
  data() {
    return {
        mashines:[],
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
              title: "任务名称",
              key:"name",
              fixed: 'left',
              width: 200,
          },
          {
              title: "ID",
              key:"id",
              width: 50,
          },

        {
          title: "状态",
            width: 80,
            render:function (h, param) {
                let enable="未运行过";
                let yanse="black";
                if (param.row.status==1){
                    enable="成功";
                    yanse="green";

                }
                else if (param.row.status==2){
                    enable="失败";
                    yanse="red";

                }
                else if (param.row.status==3){
                    enable="运行中";
                    yanse="blue";
                }
                else if (param.row.status==4){
                    enable="停止中";
                    yanse="orange";
                }
                else if (param.row.status==100){
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
              key: "image",
              title: "镜像",
              width: 200,
          },
          {
              key: "cron",
              title: "cron",
              width: 100,
          },
          {
              key: "nexttime",
              title: "下一次运行时间",
              width: 150,
          },
          {
              width: 230,
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
                              type: 'primary',
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px'
                          }
                      },'停止')]
                  );
                  return h('div', [stopbutton
                      ,
                      h(
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
                                  type: 'primary',
                                  size: 'small'
                              },
                              style: {
                                  marginRight: '5px'
                              }
                          },'立即启动')]
                      ),

                      h(
                          'Button',
                          {
                              props: {
                                  type: 'primary',
                                  size: 'small'
                              },
                              style: {
                                  marginRight: '5px'
                              },
                              on: {
                                  click: () => {
                                      this.pushForm.id=params.row.id;
                                      this.data.forEach(ele=>{
                                          if(ele.id==params.row.id){
                                              this.pushForm.cron=params.row.cron;
                                              this.pushForm.image=params.row.image;
                                              this.pushForm.name=params.row.name;
                                              this.addModel=true;
                                          }
                                      })

                                  }
                              }
                          },
                          '修改'
                      )
                  ]);
              }
          },
          {
              key: "begintime",
              title: "最近一次运行时间",
              width: 150,
          },
          {
              key: "lastime",
              title: "最近一次结束时间",
              width: 150,
          },
          {

              title: "原因",
              width: 200,
              render: (h, param)=> {
                  return h('Button',{
                      attrs: {
                          title:param.row.reason
                      },
                      on:{
                          click:()=>{
                              this.$router.push({
                                  name: 'dalaranlog', query: {id: param.row.id }
                              });
                          }
                      }
                  },'详细')
              }
          },


      ],
      data: [],
    };
  },
  methods: {
      stopjob(id){
          api.stopjob({id:id}).then(res=>{
            if(res.data=='0'){
                this.$Message.success('已经停止');
            }
            else if(res.data=='1'){
                this.$Message.success('停止中，请稍后');
            }
              this.tabchange(this.pushForm.mashine);
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
              this.tabchange(this.pushForm.mashine);
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
    init() {
        api.getMashines().then(res=>{
            this.mashines=res.data.data;
        });
    },
      tabchange(param){
          api.getjobs({mashine:param}).then(res=>{
              this.data=res.data.data;
              this.pushForm.mashine=param;
              this.mashines.forEach(ele=>{
                  if(ele.id==this.pushForm.mashine){
                      this.pushForm.mashinename=ele.name;
                  }

              })

          })

    },

  },
  created() {
    this.init();
  }
};
</script>
