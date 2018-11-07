import http from '../../api.base';
export default {
    //修改广告计划
    // editPlan(params) {
    //     return http.post('/cmsapi/editPlan', params);
    // },
    getProjInfos(params) {
        return http.get('/cmsapi/ad/getProjInfos', {params: params});
    },
    getProjDetail(params) {
        return http.get('/cmsapi/ad/getProjDetail', {params: params});
    },
};
