import http from '../api.base';

export default {
    // 获取经纪人列表 //命名语义歧义，建议删除
    getListCorp (params) {
        return http.get('/v1.0.0/customer/getCustomerAgentList', { params: params });
    },
    // 获取经纪人列表
    getAgentList (params) {
        return http.post('/v1.0.0/agent/getCustomerAgentList', params);
    },
    // 经纪人列表多手机号查询
    getAgentByTelephones (params) {
        return http.postJson('/v1.0.0/stuff/getAgentByTelephones', params);
    },
    // 获取经纪人详情
    getAgentBaseInfoByAgentId (params) {
        return http.get('/v1.0.0/agent/getAgentBaseInfoByAgentId', { params: params });
    },
    // 获取经纪人信息
    getAgentBaseInfo (params) {
        return http.get('/v1.0.0/agent/getAgentBaseInfo', { params: params });
    },
    // 企业重置经纪人密码
    updateAgentAccountPwsd (params) {
        return http.get('/v1.0.0/customer/updateAgentAccountPwsd', { params: params });
    },
    // 企业修改经纪人电话
    corpPcModifyDisplayPhone (params) {
        return http.post('/v1.0.0/agent/corpPcModifyDisplayPhone', params);
    },
    // 企业移除经济人
    removeAgentAccountBelongCorp (params) {
        return http.post('/v1.0.0/agent/removeAgentAccountBelongCorp', params);
    },
    // 企业修改经济人门店
    updateAgentStore (params) {
        return http.postJson('/v1.0.0/agent/updateAgentStore', params);
    },
    // 添加公司
    addCorp (params) {
        return http.postJson('/v1.0.0/customer/addCorp', params);
    },
    // 添加门店
    addStore (params) {
        return http.postJson('/v1.0.0/customer/addStore', params);
    },
    // 公司列表
    listCorp (params) {
        return http.get('/v1.0.0/customer/listCorp', { params: params });
    },
    // 公司详情
    getCorp (params) {
        return http.get('/v1.0.0/customer/getCorp', { params: params });
    },
    // 当前登陆公司详情
    getCurrentCorp () {
        return http.get('/v1.0.0/customer/getCurrentCorp');
    },
    // 修改公司信息  // 修改门店信息
    updateCorp (params) {
        return http.postJson('/v1.0.0/customer/updateCorp', params);
    },
    // 企业组织架构
    corpStructure (params) {
        return http.get('/v1.0.0/customer/corpStructure', { params: params });
    },
    // 经纪人名单
    getCorpAgent (params) {
        return http.post('/v1.0.0/agent/getCorpAgent', params);
    },
    // 更新所属公司
    updateBelongCorp (params) {
        return http.postJson('/v1.0.0/customer/updateBelongCorp', params);
    },
    // 更新上级企业
    updateUpCorp (params) {
        return http.postJson('/v1.0.0/customer/updateUpCorp', params);
    },
    // 获取某城市下的企业列表
    getCorpChoice (params) {
        return http.get('/v1.0.0/customer/getCorpChoice', { params: params });
    },
    // 获取企业下的门店信息列表
    getCustomerAgentList () {
        return http.get('/v1.0.0/customer/getSubCorp');
    },
    // 获取某企业下的门店列表
    getCorpByCorpId (params) {
        return http.get('/v1.0.0/customer/getCorpByCorpId', { params: params });
    },
    // 某企业下的门店列表远程搜索
    getCorpNameByCorpId (params) {
        return http.get('/v1.0.0/customer/getCorpNameByCorpId', { params: params });
    },
    // 传城市id获取区县
    getDistrict (params) {
        return http.get('/v1.0.0/customer/getDistrict', { params: params });
    },

    // 账号状态
    manCorpAccount (params) {
        return http.postJson('/v1.0.0/customer/manCorpAccount', params);
    },
    // 修改企业密码
    updateCompanyPwd (params) {
        return http.post('/v1.0.0/agent/updateAgentPassword', params);
    },

    // 修改安全手机-获取原手机号
    getCurrentSafePhone (params) {
        return http.get('/v1.0.0/customer/getCurrentSafePhone', { params: params });
    },
    // 修改安全手机-下一步
    updateAccountSafePhoneFirst (params) {
        return http.post('/v1.0.0/customer/updateAccountSafePhoneFirst', params);
    },
    // 修改安全手机-完成
    updateAccountSafePhoneEnd (params) {
        return http.post('/v1.0.0/customer/updateAccountSafePhoneEnd', params);
    },
    // 获取账户资料(城市管理员、全国管理员)
    getCurrentAccountInfoByUserId () {
        return http.get('/v1.0.0/customer/getCurrentAccountInfoByUserId');
    },
    // 已审核列表
    getAgentAuditedList (params) {
        return http.get('/v1.0.0/agentAuth/getAgentAuditedList', { params: params });
    },
    // 未审核列表
    getAgentAuditList (params) {
        return http.get('/v1.0.0/agentAuth/getAgentAuditList', { params: params });
    },
    // 审核详情页
    getAgentAuditDetail (params) {
        return http.get('/v1.0.0/agentAuth/getAgentAuditDetail', { params: params });
    },
    // 提交审核接口
    verifyAgent (params) {
        return http.postJson('/v1.0.0/agentAuth/verifyAgent', params);
    },
    // 城市客服开通企业账号
    openCorpAccount (params) {
        return http.postJson('/v1.0.0/customer/openCorpAccount', params);
    },
    // 城市客服重置企业密码
    resetPwd (params) {
        return http.postJson('/v1.0.0/customer/resetPwd', params);
    },
    // 城市客服重置经纪人密码
    updateAgentPwd (params) {
        return http.get('/v1.0.0/city/updateCityAccountPwsd', { params: params });
    },
    sendModeifyPhoneCode (params) {
        return http.postJson('/v1.0.0/sys/sendModeifyPhoneCode', params);
    },
    sendModifySecurityPhoneCode () {
        return http.get('/v1.0.0/sys/sendModifySecurityPhoneCode');
    },
    userNameCheck (params) { // 用户名排重
        return http.post('/v1.0.0/customer/userNameCheck', params);
    },
    safePhoneCheck (params) { // 手机号排重
        return http.get('/v1.0.0/customer/safePhoneCheck', { params: params });
    },
    modifyCorpTel (params) { // 门店详情修改安全手机号
        return http.post('/v1.0.0/customer/corpPcModifyDisplayPhoneByUserId', params);
    },
    homePageInfo () {
        return http.get('/v1.0.0/house/getCorpHouseData');
    },

    // 发送新手机验证码
    sendNewPhoneCode (params) {
        return http.post('/v1.0.0/sys/sendModifyPhoneCode', params);
    },
    // 开通付费
    openPaymentAuth (params) {
        return http.postJson('/v1.0.0/agentAuth/openPaymentAuth', params);
    },
    // 推优开通
    configRecommend (params) {
        return http.postJson('/v1.0.0/agentAuth/configRecommend', params);
    },
    // 企业房源点击
    corpHouseClick (params) {
        return http.get('/v1.0.0/houseClick/corpHouseClick', { params: params });
    },
    // 经纪人状态表下载
    uploadAgentStatusData (params) {
        return http.get('/v1.0.0/uploadExcel/uploadAgentStatusData', { params: params });
    },
    // 经纪人操作表下载
    uploadAgentCurrentData (params) {
        return http.get('/v1.0.0/uploadExcel/uploadAgentCurrentData', { params: params });
    },
    // 获取销售信息
    getSalerList () {
        return http.get('/v1.0.0/saler/getSalerList');
    },
    // 获取销售信息
    joinSalertoAgent (params) {
        return http.postJson('/v1.0.0/saler/joinSalertoAgent', params);
    },
    // 修改登录城市
    updateLoginCityChange (params) {
        return http.get('/v1.0.0/sys/changeCity', { params: params });
    },
    updateCorpbusinessCardPhoto (params) {
        return http.post('/v1.0.0/customer/updateCorpbusinessCardPhoto', params);
    },
    updateCorpbusinessCardAuth (params) {
        return http.post('/v1.0.0/customer/updateCorpbusinessCardAuth', params);
    },
    getAgentQalificationCardAuthList(params) {
        return http.get('/v1.0.0/agent/getAgentQalificationCardAuthList', { params: params });
    }
};
