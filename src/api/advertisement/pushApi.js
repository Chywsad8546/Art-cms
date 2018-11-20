import http from '../api.base';
export default {
    //推送消息异步列表
    getappPushListAll(params) {
        return http.post('/cmsapi/appPushList', params);
    },
    //推送消息发布
    addAppPush(params) {
        return http.post('/cmsapi/appPushAdd', params);
    },
    //推送消息更改
    updateAppPush(params) {
        return http.post('/cmsapi/setDel', params);
    },
    // 获取推送类型
    pushDict(params) {
        return http.get('/cmsapi/pushDict', { params });
    },
    // 添加推送
    addPush(params) {
        return http.post('/cmsapi/addPush', params);
    },
    // 取消推送
    cancelPush(params) {
        return http.post('/cmsapi/cancelPush', params);
    },
    // 推送任务列表
    pushList(params) {
        return http.get('/cmsapi/pushList', { params });
    }
}
