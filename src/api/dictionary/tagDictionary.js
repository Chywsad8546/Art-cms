import http from '../api.base';
export default {
    //标签列表接口  /newsTagDictionary/newsTagsList
    getTagDictionaryList(params) {
        return http.post('/newsTagDictionary/newsTagsList',params);
    },
    updateTagById(params){
        return http.post('/newsTagDictionary/updateNEwsTag',params);
    },
    addNewsTagApi(params){
        return http.post('/newsTagDictionary/addNewsTag',params);
    },
}
