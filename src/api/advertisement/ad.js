import http from '../api.base';
export default {
    // 获取广告详情
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
}
