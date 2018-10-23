import http from '../api.base';
export default {
    //添加模板api
    addTemplate(params) {
        return http.post('/cmsapi/addTemplate', params);
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
    }
}
