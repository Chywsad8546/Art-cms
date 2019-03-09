<template>
  <Row>
    <Col span="100">

    <Table border :columns="columns" :data="data"></Table>
    </Col>

  </Row>
</template>
<script>
import api from "@/api/dalaran/jobs.js";


export default {
  data() {
    return {

      columns: [
          {
              title: "开始时间",
              key:"kaishi",
              width: 150,
          },
          {
              title: "结束时间",
              key:"shijian",
              width: 150,
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

                return h("span",{
                    style:{
                        color:yanse
                    }
                },enable);
            }
        },

          {
              width: 230,
              title:"操作",
              render:(h, params) =>  {

                  return h('a',{
                              props: {
                                  type: 'primary',
                                  size: 'small'
                              },
                      attrs:{
                                  target:"_blank",
                          href:"http://dalaranlog.oss-cn-beijing.aliyuncs.com/"+params.row.id+".log"
                      },
                              style: {
                                  marginRight: '5px'
                              }
                          },'下载日志')
              }
          },



      ],
      data: [],
    };
  },
  methods: {

    init() {
        api.getlogs({id:this.$route.query.id}).then(res=>{
            this.data=res.data;
        });
    }

  },
  created() {
    this.init();
  }
};
</script>
