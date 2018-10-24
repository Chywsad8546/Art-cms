import http from '../api.base';
export default {
    // //添加模板api
    // addTemplate(params) {
    //     return http.post('/cmsapi/addTemplate', params);
    // },
    adListAll(params) {
        return http.get('/cmsapi/adListAll', {
            params: params
        });
    },
}
