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
}
