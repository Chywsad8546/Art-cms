import http from '../api.base';
export default {
    //首页开屏列表页数据
    getOpenScreenList(params) {
        return http.post('/cmsapi/getOpenScreenAll', params);
    },
    //上传
    addOpenScreen(params) {
        return http.post('/cmsapi/addCmsOpenScreen', params);
    },
    //更改是否发布
    updateOpenScreen(params) {
        return http.post('/cmsapi/setCmsDel', params);
    },
}
