<template>
    <Card span="100">
        <p slot="title">待审核经纪人详情</p>
        <div style="line-height:2.4rem">
            <Row>
                <Col span="3" align="right">
                真实姓名</Col>
                <Col offset="4">
                {{data.agentName}}</Col>
            </Row>
            <Row>
                <Col span="3" align="right">
                信息卡照片 </Col>
                <Col offset="1" span="4" align="right">
                <img width="200" height="300" :src="$imgurl(data.qualificationCardPhoto,'agent400x300')"/></Col>
            </Row>
            <Row>
                <Col span="3" align="right">
                <Button v-if="data.qualificationCardPhoto&&data.qualificationCardAuth===1" type="primary"
                        @click="updateAgentQalificationCardAuth(3)">不通过审核
                </Button>
                <Button v-if="data.qualificationCardPhoto&&data.qualificationCardAuth===1" type="primary"
                        @click="updateAgentQalificationCardAuth(2)">通过审核
                </Button>
                </Col>
            </Row>
        </div>
    </Card>
</template>

<script>
    import api from '../../../api/agent/index';

    export default {
        name: 'qualificationCardAuthDetail',
        data() {
            return {
                searchdata: {
                    agentId: this.$route.query.agentId
                },
                data: ''
            };
        },
        methods: {
            init() {
                api.getAgentBaseInfoByAgentId(this.searchdata).then(response => {
                    this.data = response.data.data;
                });
            },
            updateAgentQalificationCardAuth(auth) {
                api.updateAgentQalificationCardAuth({
                    agentId: this.$route.query.agentId,
                    qualificationCardAuth: auth
                }).then(response => {
                    // this.$Notice.success({
                    //     title: '审核已完成',
                    //     duration: 2
                    // });
                    // this.init();
                    this.$router.push({
                        name: 'qualificationCardAuthWaitList',
                        query: {
                            agentId: this.$route.query.agentId
                        }
                    });
                });
            }
        },
        created() {
            this.init();
        }
    };
</script>
<style scoped>
    img:hover {
        width: 200%;
        height: 200%;
    }
</style>

