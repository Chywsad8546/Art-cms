import http from '../api.base';
import httpAi from '../api.es.base';
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
    },
    tagsList(params) {
        return http.get('/cmsapi/newsTagDictionary/tagsList', {
            params: params
        });
    },
    getNewsDetail(params) {
        return http.get('/cmsapi/article/getNewsDetail', {
            params: params
        });
    },
    editArticle(params) {
        return http.post('/cmsapi/article/editArticle', params);
    },
    addPreview(params) {
        return http.post('/cmsapi/article/addPreview', params);
    },
    getCityId(params) {
        return httpAi.get('/agentv2/rest/getCityIdByName', {
            params: params
        });
    },
    getDistrictId(params) {
        return httpAi.get('/agentv2/rest/getDistrictId', {
            params: params
        });
    }
}
