<template>
  <div>
    <Card>
      <p slot="title">账户转移</p>
      <Form inline :label-width="100">
        <FormItem label="旧手机号：">
          <Input v-model.trim="transfer.oldphone" placeholder="旧手机号" style="width:140px"></Input>
        </FormItem>
        <FormItem label="新手机号：">
          <Input v-model.trim="transfer.newphone" placeholder="新手机号" style="width:140px"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="transferAgentAccount">转移</Button>
        </FormItem>
      </Form>
    </Card>
    
    <Card>
      <p slot="title">账户关闭</p>
      <Row :gutter="20" style="margin-top:20px">
        <Col span="12">
        <Input :rows="10" v-model="value" type="textarea" placeholder="Enter something..."></Input>
        </Col>

        <Col span="12">
        <p>本次提交个数:{{valueNum}}</p>
        <p>成功关闭个数:{{successNum}}</p>
        <p v-if="value1===''">未成功:{{value1||0}}</p>
        <div v-else>未成功:
          <Input v-model="value1" type="textarea" :rows="7" placeholder="Enter something..."></Input>
        </div>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12" align="right">
        <Button type="primary" style="margin-top:20px" @click="accountClose">关闭</Button>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import api from "@/api/city/index.js";
import {
  compact,
  union
} from "lodash";
export default {
  name: "accountClose",
  data() {
    return {
      transfer: {
        oldphone: '',
        newphone: ''
      },
      value: "",
      errList: [],
      valueNum: 0,
      successNum: 0,
    };
  },
  methods: {
    transferAgentAccount() {
      this.$Modal.confirm({
        title: '账户转移',
        content: '所有业务将转移到新手机，确认转移吗？',
        onOk: () => {
          api
            .transferAgentAccount(this.transfer)
            .then(res => {
              this.$Modal.remove();
              this.$Message.success("转移成功");
              this.init();
            })
            .catch(err => {
              this.$Modal.remove();
              this.$Message.error("转移失败 " + err.response.data.msg);
            });
        }
      })
    },
    close(tel) {
      api
        .closeAgentAccount({
          userName: tel,
        })
        .then(response => {
          this.successNum++
        })
        .catch(err => {
          console.log(err.response);
          this.errList.push(tel + "\t" + err.response.data.msg);
          // this.errList.push(tel);
        });
    },
    accountClose() {
      this.errList = [];
      this.valueNum = this.userList.length
      this.successNum = 0
      union(this.userList).map(async x => {
        await this.close(x);
      });
      this.value = ''
    }
  },
  computed: {
    userList: function () {
      let list = this.value.split("\n");
      return compact(list);
    },
    value1() {
      return this.errList.join("\n");
    }
  },
  created() { }
};
</script>
