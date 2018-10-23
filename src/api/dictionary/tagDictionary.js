import http from '../api.base';

export default {
    // 标签列表接口  /newsTagDictionary/newsTagsList
    getTagDictionaryList(params) {
        return http.post('cmsapi/newsTagDictionary/newsTagsList', params);
    },
    updateTagById(params) {
        return http.post('cmsapi/newsTagDictionary/updateNEwsTag', params);
    },
    addNewsTagApi(params) {
        return http.post('cmsapi/newsTagDictionary/addNewsTag', params);
    },
    getTagDictionaryDetail(params) {
        return http.post('cmsapi/newsTagDictionary/newsTagsDetail', params);
    }
};
