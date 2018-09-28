<template>
    <Card span="100">
        <p slot="title">经纪人详情</p>
        <div style="line-height:2.4rem">
            <Row>
                <Col span="4" align="right">
                ID</Col>
                <Col span="2" offset="1">
                {{data.agentId}}</Col>
                <Col span="3" offset="1">
                <Button type="primary" @click="fictitiousLogin()">模拟登录</Button>
                </Col>
                <Col span="6">
                <Alert type="warning" show-icon>模拟登录时请允许浏览器弹出窗口</Alert>
                </Col>
            </Row>
            <Row>
                <Col span="4" align="right">
                真实姓名</Col>
                <Col span="2" offset="1">
                {{data.agentName}}</Col>
                <Col span="3" offset="1">
                <Button type="primary" @click="modalPwd = true ">重置密码</Button>
                </Col>
            </Row>
            <Row>
                <Col span="4" align="right">
                身份认证</Col>
                <Col offset="5">
                名片:{{data.businessCardAuthInfo}} 身份证：{{data.idCardAuthInfo}} 支付: {{data.paymentAuthInfo}}</Col>
            </Row>
            <Row>
                <Col span="4" align="right">
                登录手机号</Col>
                <Col span="2" offset="1">
                {{data.userName}}</Col>
            </Row>
            <Row>
                <Col span="4" align="right">
                对外展示电话</Col>
                <Col span="2" offset="1">
                {{data.displayPhone}}</Col>
                <Col span="3" offset="1">
                <Button type="primary" @click="resetDisplayPhone = true ">修改</Button>
                </Col>
            </Row>
            <Row>
                <Col span="4" align="right">
                所属公司</Col>
                <Col offset="5">
                {{data.corpName}}</Col>
            </Row>
            <Row>
                <Col span="4" align="right">
                所属门店</Col>
                <Col span="2" offset="1">
                {{data.storeName}}</Col>
                <Col span="3" offset="1">
                <Button type="primary" @click="resetstoreName">修改</Button>
                </Col>
            </Row>
            <Row>
                <Col span="4" align="right">
                城市</Col>
                <Col offset="5">
                {{data.cityName}}</Col>
            </Row>
            <Row>
                <Col span="4" align="right">
                服务商圈</Col>
                <Col offset="5">
                <p v-for="item in data.listServiceBusinessCircle">
                    {{item.area}}-{{item.district}}
                </p>
                </Col>
            </Row>
            <Row>
                <Col span="4" align="right">
                注册时间</Col>
                <Col offset="5">
                {{data.createTime}}</Col>
            </Row>
            <Row>
                <Col span="4" align="right">
                最近登录时间</Col>
                <Col offset="5">
                {{data.lastLoginTime}}</Col>
            </Row>
            <Row>
                <Col span="4" align="right">
                身份证号</Col>
                <Col offset="5">
                {{data.idCardNo}}</Col>
            </Row>
            <Row>
                <Col span="4" align="right">
                身份证照片</Col>
                <Col offset="5">
                <img v-if="data.idCardPhoto" width="222" height="135" :src="data.idCardPhoto"/>
                <span v-else>暂无</span>
                </Col>
            </Row>
            <Row>
                <Col span="3" align="right">
                名片照片</Col>
                <Col offset="5">
                <img width="222" height="135" v-if="data.businessCardPhoto"
                     :src="$imgurl(data.businessCardPhoto,'agent400x300')"/>
                <span v-else>暂无</span>
                </Col>
            </Row>
        </div>
        <div class="agentPhoto">
            <div class="imgPhoto">
                <p v-if="data.headPhoto!=''"><img :src="$imgurl(data.headPhoto,'agent300x400')" alt=""
                                                  @click="handleView"></p>
                <p v-else class="defaultImg"></p>
            </div>
            <!-- <Upload
                      :action="'/v1.0.0/agent/updateAgentPhoto?agentId=' + searchdata.agentId"
                      :show-upload-list="false"
                      :on-success="handleSuccess"
                      :format="['jpg','jpeg','png','gif']"
                      :max-size="6144"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                  >
                  <Button type="ghost" icon="ios-cloud-upload-outline">上传头像</Button>
                  </Upload> -->

            <uploadimg :preview="false" :ratio="3/4"
                       :action="'/v1.0.0/agent/updateAgentPhoto?agentId=' + searchdata.agentId" @uploadimg="uploadimg"
                       type="userAvator">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传头像</Button>
            </uploadimg>
            <Modal title="View Image" v-model="visible">
                <img :src="$imgurl(data.headPhoto,'agent300x400') " v-if="visible" style="width: 100%">
            </Modal>
        </div>

        <Modal v-model="modalPwd" title="重置密码" @on-ok="updatePassWord()">
            <p>确定要重置 {{data.agentName}} 的密码？</p>
        </Modal>

        <Modal v-model="resetDisplayPhone" title="重置对外展示手机号" @on-ok="updateDisplayPhone()"
               @on-cancel="cancelUpdateDisplayPhone()">
            <Input v-model="newDisplayPhone" placeholder="输入新手机号" clearable></Input>
        </Modal>

        <Modal v-model="resetStore" title="修改经纪人所属门店" @on-ok="updateStore" @on-cancel="cancelUpdateStore">
            <Select v-model="newStore" filterable clearable>
                <Option v-for="item in storeList" :value="item.corpId" :key="item.corpId">{{ item.corpName }}</Option>
            </Select>
        </Modal>
    </Card>
</template>

<script>
    import api from "../../../api/company/index";
    import agentApi from "../../../api/agent/index";
    import cityApi from "../../../api/city/index";
    import uploadimg from "../../my-components/upLoad";

    export default {
        data() {
            return {
                searchdata: {
                    agentId: this.$route.query.agentId
                },
                pwdData: {
                    //重置密码传参
                    userId: this.$route.query.userId
                },
                modalPwd: false, //重置密码弹框
                data: "",
                visible: false,
                resetDisplayPhone: false,
                newDisplayPhone: "",
                resetStore: false,
                newStore: "",
                storeList: []
            };
        },
        components: {
            uploadimg
        },
        methods: {
            // 模拟登录
            fictitiousLogin() {
                const userToken = this.data.userToken;
                const userName = this.data.userName;
                let jumpSrc;
                if (location.href.indexOf('city.toutiaofangchan.com') >= 0) {
                    jumpSrc = 'http://agent.toutiaofangchan.com/v1.0.0/sys/fictitiousLogin?userName=' + userName + '&userToken=' + userToken
                } else if (location.href.indexOf('city.sim.toutiaofangchan.com') >= 0) {
                    jumpSrc = 'http://agent.sim.toutiaofangchan.com/v1.0.0/sys/fictitiousLogin?userName=' + userName + '&userToken=' + userToken
                } else {
                    jumpSrc = 'http://jingjiren.test.toutiaofangchan.com/v1.0.0/sys/fictitiousLogin?userName=' + userName + '&userToken=' + userToken
                }
                window.open(jumpSrc);
            },
            init() {
                api.getAgentBaseInfoByAgentId(this.searchdata).then(response => {
                    this.data = response.data.data;
                });
            },
            updateDisplayPhone() {
                cityApi
                    .updateAgentDisplayPhoneByStaff({
                        agentId: this.data.agentId,
                        displayPhone: this.newDisplayPhone
                    })
                    .then(res => {
                        console.log(res);
                        this.$Modal.remove();
                        this.$Message.success("修改成功");
                        this.init();
                    })
                    .catch(err => {
                        this.$Modal.remove();
                        this.$Message.error("修改失败");
                        console.log(err);
                    });
            },
            cancelUpdateDisplayPhone() {
                this.newDisplayPhone = "";
            },
            resetstoreName() {
                agentApi
                    .getCorpByCorpId({
                        corpId: this.data.corpId
                    })
                    .then(response => {
                        this.storeList = response.data.data.data;
                        this.resetStore = true;
                    })
                    .catch(error => {
                        this.$Message.error("获取门店列表失败");
                        console.log(error.response.data.msg);
                    });
            },
            updateStore() {
                cityApi
                    .updateAgentStoreByStaff({
                        agentId: this.data.agentId,
                        newStoreId: this.newStore,
                        belongCorpId: this.data.corpId
                    })
                    .then(res => {
                        console.log(res);
                        this.$Modal.remove();
                        this.$Message.success("修改成功");
                        this.init();
                    })
                    .catch(err => {
                        this.$Modal.remove();
                        this.$Message.error("修改失败");
                        console.log(err);
                    });
            },
            cancelUpdateStore() {
                this.newStore = '';
            },
            uploadimg(data) {
                let {response, file} = data;
                this.data.headPhoto = response.data.key;
                this.imgName = response.data.key;
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '文件格式错误',
                    desc: '请上传jpg/jpeg/png/gif格式的文件'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '图片大小超标',
                    desc: '请上传2M以内的图片.'
                });
            },
            handleView(name) {
                this.visible = true;
            },
            updatePassWord() {
                // 重置密码
                api
                    .updateAgentPwd(this.pwdData)
                    .then(response => {
                        this.$Notice.success({
                            title: '重置密码成功'
                        });
                    })
                    .catch(err => {
                        console.log(err.response);
                    });
            }
        },
        created() {
            this.init();
        }
    };
</script>
