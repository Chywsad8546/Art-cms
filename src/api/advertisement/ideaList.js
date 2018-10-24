import http from '../api.base';
export default {
    //创意广告列表
    ideaList(params) {
        return http.post('/cmsapi/adidealist', params);
    },
}
