<template>
  <Card>
    <p slot="title">关联销售</p>
        <Row :gutter="20">
            <Col span="12">
          <Select style="width:200px" v-model="saler">
              <Option v-for="item in salerList" :key="item.salerId" :value="item.salerId+'|'+item.salerPhone">{{ item.salerName }}({{ item.salerPhone }})</Option>
          </Select>
            </Col>
      </Row>
      <Row :gutter="20" style="margin-top:20px">
          <Col span="12">
          <Input :rows="10" v-model="userList" type="textarea" placeholder=""></Input>
          </Col>

          <Col span="12">
          <p>本次修改个数:{{valueNum}}</p>
          <p>成功关联个数:{{successNum}}</p>
          <p v-if="errormsg===''">未成功:{{errormsg||0}}</p>
          <div v-else>未成功:
              <Input v-model="errormsg" type="textarea" :rows="7" placeholder=""></Input>
          </div>
          </Col>
      </Row>
      <Row :gutter="20">
          <Col span="12" align="right">
                <Button type="primary" style="margin-top:20px" @click="salerJoin">关联</Button>
          </Col>
      </Row>
  </Card>
</template>

<script>
import api from '../../../api/company/index.js';
import {
    compact,
    union
} from "lodash";
export default {
    name: 'salerJoin',
    data () {
        return {
            valueNum: 0,
            successNum: 0,
            agentphonelist: '',
            saler: '',
            salerList: [],
            errList: [],
            userList: '',
            salerid : 0,
            salerphone:''
        };
    },
    methods: {
        getSalerList () {
            api.getSalerList().then(response => {
                this.salerList = response.data.data.data;
            });
        },
        joinsaler(tel) {
            api.joinSalertoAgent({
                    telephone: tel,
                    salerid: this.salerid,
                    salerphone: this.salerphone,
                })
                .then(response => {
                    this.successNum++
                })
                .catch(err => {
                    this.errList.push(tel + "\t" + err.response.data.msg);
                });
        },
        confirm () {
            this.$Modal.confirm({
                title: '确认',
                content: '<p>没有选择销售人员，联系方式将被置空，是否确认</p>',
                onOk: () => {
                    this.saler = '0|';
                    this.salerJoin();
                }
            });
        },
        salerJoin () {
            if (this.saler.split('|').length === 2)
            {
                this.salerid = this.saler.split('|')[0];
                this.salerphone = this.saler.split('|')[1];
                this.errList = [];
                this.valueNum = this.userArray.length;
                this.successNum = 0;
                union(this.userArray).map(async x=> {
                    await this.joinsaler(x);
                });
            }
            else{
                this.confirm();
            }
        }
    },
    computed: {
        userArray: function () {
            let list = this.userList.split('\n');
            return compact(list);
        },
        errormsg(){
            return this.errList.join("\n");
        }

    },
    created () {
        this.getSalerList();
    }
};
</script>
