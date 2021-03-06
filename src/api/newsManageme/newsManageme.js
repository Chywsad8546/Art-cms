import http from '../api.base';

export default {
    getNewsManagemeList(params) {
        return http.postJson('/cmsapi/news/select', params);
    },
    //文章置顶
    setArticleIsTop(params) {
        return http.post('/cmsapi/article/articleIsTop', params);
    },
    //取消置顶
    removeArticleIsTop(params) {
        return http.post('/cmsapi/article/cancelArticleIsTop', params);
    },
    //撤稿
    removePublishArticle(params) {
        return http.post('/cmsapi/article/publishArticle', params);
    },
    //获取所有编辑姓名
    getAllAuthor() {
        return http.get('/cmsapi/news/creator');
    },
    //排序
    setSort(params) {
        return http.post('/cmsapi/article/articleSort', params);
    },
    //列表页预览api/cmsapi/article/listAddPreview
    listAddPreview(params) {
        return http.post('/cmsapi/article/listAddPreview', params);
    },
};
