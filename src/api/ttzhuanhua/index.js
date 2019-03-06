import http from '../api.es.base';
export default {
    getall(params) {
        return http.get('/cmsapi/cmsapi/ttappzhuanhua/getall', {params:params});
    },
    save(params){
        return http.postJson('/cmsapi/cmsapi/ttappzhuanhua/save', params);

    }
}