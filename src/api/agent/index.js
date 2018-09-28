import http from '../api.base';
/*
*经纪人、业主
*/
export default {
    // 获取图形验证码
    getYzm(params) {
        return http.get('/v1.0.0/sys/createGraphicVerificationCode', { params: params });
    },
    // 校验图形验证码
    checkPicYzm(params) {
        return http.get('/v1.0.0/sys/checkGraphicVerificationCode', { params: params });
    },
    // 账号密码登录
    loginBypswd(params) {
        return http.post('/v1.0.0/sys/userAccountLogin', params);
    },
    // 验证码登录
    loginByVerify(params) {
        return http.post('/v1.0.0/sys/userVerifyCodeLogin', params);
    },
    // 获取验证码
    getVerifyCode(params) {
        return http.post('/v1.0.0/sys/sendLoginVerifyCode', params);
    },
    // 找回密码提交
    forgetPassword(params) {
        return http.post('/v1.0.0/sys/forgetPassword', params);
    },
    // 注册获取验证码
    getVerifyCodeReg(params) {
        return http.post('/v1.0.0/sys/sendRegisterVerifyCode', params);
    },
    // 经纪人注册提交
    subRegisterAgent(params) {
        return http.post('/v1.0.0/agent/saveAgentInfo', params);
    },
    // 获取经纪人基本资料
    getAgentBaseInfo() {
        return http.get('/v1.0.0/agent/getAgentBaseInfo');
    },
    // 修改经纪公司或门店
    updateAgentCoryAndStore(params) {
        return http.post('/v1.0.0/agent/updateAgentCoryAndStore', params);
    },
    // 修改登录密码
    updateAgentPassword(params) {
        console.log(params);
        return http.post('/v1.0.0/agent/updateAgentPassword', params);
    },
    // 修改对外展示电话
    updateAgentDisplayPhone(params) {
        return http.post('/v1.0.0/agent/updateAgentDisplayPhone', params);
    },
    // 经纪人删除头像
    updateAgentCurrentPhoto(params) {
        return http.get('/v1.0.0/agent/updateAgentCurrentPhoto', { params: params });
    },
    // 修改经纪人头像
    updateAgentPhoto(params) {
        return http.post('/v1.0.0/agent/updateAgentPhoto', params);
    },
    // 获取某个城市经纪公司-门店
    getCorpChoice(params) {
        return http.get('/v1.0.0/customer/getCorpChoice', { params: params });
    },
    // 获取门店
    getCorpByCorpId(params) {
        return http.get('/v1.0.0/customer/getCorpByCorpId', { params: params });
    },
    // 获取城市列表
    listCityInfo() {
        return http.get('/v1.0.0/city/listCityInfo');
    },
    // 获取服务商圈
    ListServiceBusinessCircle(params) {
        return http.get('/v1.0.0/city/ListServiceBusinessCircle', { params: params });
    },
    // 修改服务商圈
    updateAgentServiceBusinessCircle(params) {
        return http.postJson('/v1.0.0/agent/updateAgentServiceBusinessCircle', params);
    },
    // 校验手机号是否注册
    checkAgentPhone(params) {
        return http.get('/v1.0.0/agent/checkAgentPhone', { params: params });
    },

    // 获取用户认证情况
    getAgentAuthInfo() {
        return http.get('/v1.0.0/agent/getAgentAuthInfo');
    },
    // 身份证图片上传接口
    uploadAgentAuthorizationInfo(params) {
        return http.post('/v1.0.0/sys/uploadIdCardPhoto', params);
    },
    // 身份证认证接口
    AgentAuthorization(params) {
        return http.post('/v1.0.0/agent/updateAgentAuthorizationInfo', params)
    },
    // 名片认证接口
    updateAgentAuthorizationInfo2(params) {
        return http.post('/v1.0.0/agent/updateAgentAuthorizationInfo2', params);
    },
    // 修改展示手机号
    sendModifyPhoneCode(params) {
        return http.post('/v1.0.0/sys/sendModifyPhoneCode', params);
    },
    /**
     * 统计中心
     * author:guoshiwei
     *
     */

    // 经纪人账号认领房源点击统计
    agentHouseClick(params) {
        console.log('参数');
        console.log(params);
        return http.get('/v1.0.0/houseClick/agentHouseClick', { params: params });
    },
    // 出售房源留言预约
    AgentHouseSellLeaveMessage(params) {
        return http.get('/v1.0.0/agentHouseSell/selectAgentHouseSellLeaveMessage', { params: params });
    },
    // 出售留言预约状态改变
    changeAgentHouseSellLeaveMessageStatus(params) {
        return http.post('/v1.0.0/agentHouseSell/changeAgentHouseSellLeaveMessageStatus', params);
    },
    // 出租房源留言预约
    AgentHouseRentLeaveMessage(params) {
        return http.get('/v1.0.0/rent/selectAgentHouseRentLeaveMessage', { params: params });
    },
    // 出租留言预约状态改变
    changeAgentHouseRentLeaveMessageStatus(params) {
        return http.post('/v1.0.0/rent/changeAgentHouseRentLeaveMessageStatus', params);
    },
    updateAgentQalificationCardPhoto (params) {
        return http.post('/v1.0.0/agent/updateAgentQalificationCardPhoto', params);
    },
    updateAgentQalificationCardAuth (params) {
        return http.post('/v1.0.0/agent/updateAgentQalificationCardAuth', params);
    },
    getAgentBaseInfoByAgentId(params) {
        return http.get('/v1.0.0/agent/getAgentBaseInfoByAgentId', { params: params });
    }
};
