import http from '../../api.es.base';
export default {
    //修改广告计划
    // editPlan(params) {
    //     return http.post('/cmsapi/editPlan', params);
    // },
    getProjInfos(params) {
        return http.get('/cmsapi/officedictapi/v1.0.0/projAd/getProjInfos', {params: params});
    },
    getProjDetail(params) {
        return http.get('/cmsapi/officedictapi/v1.0.0/projAd/getProjDetail', {params: params});
    },
};
