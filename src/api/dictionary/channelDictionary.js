import http from '../api.base';
export default {
    getChannelDictionaryList(params) {
        return http.post('cmsapi/newsChannelDictionary/newsChaneelList',params);
    },
    addNewsChannelApi(params){
        return http.post('cmsapi/newsChannelDictionary/addNewsChannel',params);
    },
    updataNewsChannelApi(params){
        return http.post('cmsapi/newsChannelDictionary/updataNewsChannel',params);
    },
}
