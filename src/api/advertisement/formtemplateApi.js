import http from '../api.base';
export default {
    // 添加模板api
    addTemplate(params) {
        return http.post('/cmsapi/addTemplate', params);
    },
    getTemplate(id) {
        return http.get('/cmsapi/getIdeaTypeData', {
            params: {id: id}
        });
    },
    getStationInfo(params) {
        return http.get('/cmsapi/getStationInfo', {
            params: params
        });
    },
    getChannelInfo(params) {
        return http.get('/cmsapi/getChannelInfo', {
            params: params
        });
    },
    getPositionInfo(params) {
        return http.get('/cmsapi/getPositionInfo', {
            params: params
        });
    },
    templateList(params) {
        return http.get('/cmsapi/templateList', {
            params: params
        });
    },
    deleteTemplate(params) {
        return http.post('/cmsapi/deleteTemplate', params);
    },
    getIdeaTypeData(params) {
        return http.get('/cmsapi/getIdeaTypeData', {
            params: params
        });
    },
    adListAll(params) {
        return http.get('/cmsapi/adListAll', {
            params: params
        });
    },
    /**
     * 获取一批广告位在某个时间段内的排期
     * @param params
     * @returns {AxiosPromise<any>}
     */
    getPaiqiList(params) {
        return http.get('/cmsapi/getSchedulingByPositionId', {
            params: params
        });
    },
    getAdPositionInfo(params) {
        return http.get('/cmsapi/getAdPositionInfo', {
            params: params
        });
    },
    addSchedules(params) {
        return http.post('/cmsapi/addSchedules', params);
    },
    forceCover(params) {
        return http.post('/cmsapi/forceCover', params);
    },
    schedulesList(params) {
        return http.get('/cmsapi/schedulesList', {
            params: params
        });
    },
    exportExl(params) {
        return http.get('/cmsapi/exportExl', {
            params: params
        });
    },
    // 计划详情/cmsapi/planDetails
    planDetails(params) {
        return http.get('/cmsapi/planDetails', {params: params
        });
    },
    //获取创意所有时间列表
    getIdeaTimeList(params) {
        return http.get('/cmsapi/idea/getSchedulesListByIdeaCode', {params: params});
    },
    //根据位置id查找缺省创意/cmsapi/idea/getDefaultAdByPositionId
    getDefaultAdByPositionId(params) {
        return http.get('/cmsapi/idea/getDefaultAdByPositionId', {params: params});
    },
    //删除排期
    deleteSchedulingById(params) {
        return http.post('/cmsapi/deleteSchedulingById', params);
    },

};
