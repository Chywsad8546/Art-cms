import http from '../api.base';
export default {
    //上传图片接口
    uploadImg (params) {
        return http.post('/cmsapi/sys/uploadImg', params);
    },
    addArticle(params) {
        return http.post('/cmsapi/article/addArticle', params);
    },
    uploadVideo (params) {
        return http.get('/cmsapi/sys/getVideoInfo', {
            params: params
        });
    },
    newsChaneelList(params) {
        return http.post('/cmsapi/newsChannelDictionary/newsChaneelList', params);
    },
    newsTagsList(params) {
        return http.post('/cmsapi/newsTagDictionary/newsTagsList', params);
    }
}