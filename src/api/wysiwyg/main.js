import http from '../api.base';
export default {
    saveDiyWebpage(params) {
        return http.post('/cmsapi/diyWebpage/saveDiyWebpage', params);
    },
    saveSite(params) {
        return http.post('/cmsapi/site/saveSite', params);
    },
    saveDiyWebpageHistory(params) {
        return http.post(
            '/cmsapi/diyWebpageHistory/saveDiyWebpageHistory',
            params
        );
    },
    getSites(params) {
        return http.get('/cmsapi/site/getSites', {
            params: params
        });
    },
    getDiyWebpages(params) {
        return http.get('/cmsapi/diyWebpage/getDiyWebpages', {
            params: params
        });
    },
    getDiyFormStructure(params) {
        return http.get('/cmsapi/diyForm/getDiyFormStructure', {
            params: params
        });
    },
    getDiyWebpageHistory(params) {
        return http.get('/cmsapi/diyWebpageHistory/getDiyWebpageHistory', {
            params: params
        });
    },
    saveDiyFormStructure(params) {
        return http.postJson('/cmsapi/diyForm/saveDiyFormStructure', params);
    },
    delDiyFormStructure(params) {
        return http.post('/cmsapi/diyForm/delDiyFormStructure', params);
    },
    updateSite(params) {
        return http.post('/cmsapi/site/updateSite', params);
    },
    updateDiyWebpage(params) {
        return http.post('/cmsapi/diyWebpage/updateDiyWebpage', params);
    }
};
