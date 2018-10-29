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
    },
    setDefault(params) {
        return http.post('/cmsapi/idea/setDefault', params);
    },

    // 获取所有站点
    getAllStation(params) {
        return http.get('/cmsapi/getStationInfo', {params: params});
    },
    // 添加站点
    addStation(params) {
        return http.post('/cmsapi/addStation', params);
    },
    // 修改站点/cmsapi/updateStation
    updateStation(params) {
        return http.post('/cmsapi/updateStation', params);
    },
    // 获取所有频道
    getAllPage(params) {
        return http.get('/cmsapi/getChannelInfo', {params: params});
    },
    // 添加栏目
    addPage(params) {
        return http.post('/cmsapi/addPage', params);
    },
    // 获取所有位置/cmsapi/getAllPosition
    getAllPositions(params) {
        return http.post('/cmsapi/getAllPosition', params);
    },
    // 添加位置
    addPosition(params) {
        return http.post('/cmsapi/addPosition', params);
    },
    // 修改位置/cmsapi/updatePosition
    updatePosition(params) {
        return http.post('/cmsapi/updatePosition', params);
    },
    //添加广告计划
    addPlan(params) {
        return http.post('/cmsapi/addPlan', params);
    },
    //修改广告计划
    editPlan(params) {
        return http.post('/cmsapi/editPlan', params);
    },
    panList(params) {
        return http.get('/cmsapi/panList', {params: params});
    },
    editStatus(params) {
        return http.post('/cmsapi/editStatus', params);
    },
    addPreView(params) {
        return http.post('/cmsapi/idea/addPreView', params);
    },
    getAllPosition(params) {
        return http.post('/cmsapi/getAllPosition', params);
    },
};
