import http from '../api.base';
export default {
    //添加模板api
    addTemplate(params) {
        return http.post('/cmsapi/addTemplate', params);
    },
    getTemplate(id) {
        return http.get('/cmsapi/getIdeaTypeData', {
            params: {id:id}
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
}
