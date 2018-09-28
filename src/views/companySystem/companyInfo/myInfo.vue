<template>
    <Card span="100">
        <p slot="title">企业详情</p>
        <div style="line-height:3rem">
            <Row>
                <Col span="3" align="right">
                企业全称</Col>
                <Col offset="4">
                {{data.corpName}}</Col>
            </Row>
            <Row>
                <Col span="3" align="right">
                城市</Col>
                <Col offset="4">
                {{data.cityName}}</Col>
            </Row>
            <Row>
                <Col span="3" align="right">
                公司简称</Col>
                <Col offset="4">
                {{data.corpShortName}}</Col>
            </Row>
            <Row>
                <Col span="3" align="right">
                企业地址</Col>
                <Col offset="4">
                {{data.corpAddress}}</Col>
            </Row>
            <Row>
                <Col span="3" align="right">
                注册用户数</Col>
                <Col offset="4">
                <Row>
                    <Col span="4">
                    {{data.count}}</Col>
                    <Col span="3">
                    <router-link v-if="data.subCorpNum!==0" tag="a" to="brokerList">查看当前经纪人</router-link>
                    </Col>
                </Row>
                </Col>
            </Row>
            <Row>
                <Col span="3" align="right">
                企业安全手机</Col>
                <Col offset="4">
                <Row>
                    <Col span="4">
                    {{data.corpSafePhone}}</Col>
                    <Col span="3">
                    <a @click="updatePhone()">修改</a>
                    </Col>
                </Row>
                </Col>
            </Row>
            <Row>
                <Col span="3" align="right">
                最近登录时间</Col>
                <Col offset="4">
                {{data.lastLoginTime}}</Col>
            </Row>
            <Row>
                <Col span="3" align="right">
                营业执照</Col>
                <Col  span="5" offset="1">
                <img width="228" height="322"
                     v-if="data.businessCardPhoto"
                     :src="$imgurl(data.businessCardPhoto,'agent570x805')" alt="">
                <Alert v-if="data.businessCardAuth===3" type="error" show-icon>认证失败，请重新上传认证</Alert>
                <Alert v-if="data.businessCardAuth===1" type="warning" show-icon>认证中</Alert>
                <Alert v-if="data.businessCardAuth===2&&data.businessCardPhoto" type="success" show-icon>
                    已认证通过
                </Alert>
                <!-- v-else -->
                <uploadimg v-if="data.businessCardAuth===0||data.businessCardAuth===3" :ratio="570/805"
                           @uploadimg="uploadimg"
                           action="/v1.0.0/sys/uploadImage">
                    <Button type="ghost" icon="ios-cloud-upload-outline">选择图片</Button>
                </uploadimg>
                <Button v-if="data.businessCardAuth===0||data.businessCardAuth===3"
                        style="margin-top:20px" type="primary" @click="updateBusinessCardAuthorizationInfo">提交认证
                </Button>
                </Col>
            </Row>
            <!-- <Row>
                <Col span="3" align="right">下级企业数</Col>
                <Col offset="4">
                <Row>
                    <Col span="4">{{data.subCorpNum}}</Col>
                    <Col span="3">
                    <router-link v-if="data.subCorpNum!==0" tag="a" to="subordinateCompany">查看下属企业</router-link>
                    </Col>
                </Row>
                </Col>
            </Row> -->
        </div>
    </Card>
</template>

<script>
    import api from '../../../api/company/index.js';
    import uploadimg from '../../my-components/upLoad';

    export default {
        data() {
            return {
                corpId: this.$route.query.corpId,
                data: {
                    accountStatus: '',
                    belongCorpName: '',
                    cityId: '',
                    cityName: '',
                    corpAddress: '',
                    corpLevel: '',
                    corpLogo: '',
                    corpName: '',
                    corpSafePhone: '',
                    corpShortName: '',
                    count: 14,
                    createTime: '',
                    creator: '',
                    districtName: '',
                    lastLoginTime: '',
                    subCorpNum: 4,
                    upCorpId: 10,
                    upCorpName: '',
                    updateTime: '',
                    updater: '',
                    userName: '',
                    corpId: '',
                    businessCardPhoto: '',
                    businessCardAuth: 0
                },
                searchdata: {
                    corpId: 21
                }
            };
        },
        methods: {
            init() {
                // 初始化公司详情
                api.getCurrentCorp().then(response => {
                    this.data = response.data.data;
                });
            },
            updatePhone() {
                if (this.data.corpSafePhone !== '') {
                    this.$router.push({
                        name: 'updatephone',
                        params: {
                            userId: this.data.cityId,
                            corpSafePhone: this.data.corpSafePhone
                        }
                    });
                } else {
                    this.$Message.error('手机号是空的！');
                }
            },
            uploadimg(data) {
                let {response, file} = data;
                this.data.businessCardPhoto = response.data.key;
                file.name = response.data.key;
            },
            updateBusinessCardAuthorizationInfo() {
                if (!this.data.businessCardPhoto) {
                    this.$Message.error('未上传图片');
                    return;
                }
                let json = {
                    corpId: this.data.corpId,
                    businessCardPhoto: this.data.businessCardPhoto
                };
                api.updateCorpbusinessCardPhoto(json)
                    .then(response => {
                        this.$Message.success('等待认证!');
                        this.init();
                    })
                    .catch(error => {
                        this.$Message.error('认证失败!');
                    });
            },
            checkCompany() {
                this.$router.push({name: 'subordinateCompany'});
            }
            // brokerListCheck() {
            //   this.$router.push({
            //     name: "thisBrokerList",
            //     params: {
            //       corpId: this.data.corpId
            //     }
            //   });
            // }
        },
        components: {
            uploadimg
        },
        created() {
            this.init();
        }
    };
</script>
