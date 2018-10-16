import http from '../api.base';
export default {
    //首页开屏列表页数据
    getOpenScreenList(params) {
        return http.post('/cmsapi/getOpenScreenAll', params);
    }
}
