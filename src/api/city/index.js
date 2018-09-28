import http from '../api.base';

export default {
    updateAgentDisplayPhoneByStaff(params) {
        return http.post('/v1.0.0/customer/updateAgentDisplayPhoneByStaff', params);
    },
    updateAgentStoreByStaff(params) {
        return http.post('/v1.0.0/customer/updateAgentStoreByStaff', params);
    },
    // 账户转移
    transferAgentAccount(params) {
        return http.post('/v1.0.0/agentAuth/transferAgentAccount', params);
    },
    // 关闭账户
    closeAgentAccount(params) {
        return http.post('/v1.0.0/agentAuth/closeAgentAccount', params);
    },
    getPayList(params) {
        return http.get('/v1.0.0/paycenter/getCustomerBuyList', { params: params });
    },
    updateStatusByOrderNo(params) {
        return http.post('/v1.0.0/paycenter/updateStatusByOrderNo', params);
    },
    // 获取邀请码
    getSuperInviteHistory(params) {
        return http.get('/v1.0.0/invitation/getSuperInviteHistory', {params: params});
    },
    // 获取邀请记录
    getInviteHistorys(params) {
        return http.get('/v1.0.0/invitation/getInviteHistorys', { params: params });
    },
    // 获取楼盘信息
    getProjList(params) {
        return http.get('/v1.0.0/projExpert/getProjList', { params: params });
    },
    // 获取楼盘专家
    getProjExpertList(params) {
        return http.get('/v1.0.0/projExpert/getProjExpertList', { params: params });
    },
    // 根据手机查询专家信息
    selectUserByPhone(params) {
        return http.get('/v1.0.0/projExpert/selectUserByPhone', { params: params });
    },
    // 添加楼盘专家
    AddProjExpert(params) {
        return http.post('/v1.0.0/projExpert/addProjExpert', params);
    },
    // 解绑
    cancelDeploy(params) {
        return http.post('/v1.0.0/projExpert/cancelDeploy', params);
    }
};
