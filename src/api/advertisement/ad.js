import http from '../api.base';
export default {
    // 获取广告详情
    getappPushListAll(params) {
        return http.post('/cmsapi/appPushList', params);
    },
    // 推送消息发布
    addAppPush(params) {
        return http.post('/cmsapi/appPushAdd', params);
    },
    // 推送消息更改
    updateAppPush(params) {
        return http.post('/cmsapi/setDel', params);
    },
    /**
     * 获取创意详情
     * @param id
     * @returns {AxiosPromise<any>}
     */
    getIdea(id) {
        return http.get('/cmsapi/idea/getIdeaDetails', {
            params: {ideaCode: id}
        });
    },
    /**
     * 添加创意
     * @param params
     * @returns {Promise<*>}
     */
    addIdea(params) {
        return http.post('/cmsapi/idea/addIdea', params);
    },
    editIdea(params) {
        return http.post('/cmsapi/idea/editIdea', params);
    }

};
