import http from '../api.es.base';
export default {
    // getlogs(params) {
    //     return http.get('/ajkspider/logs',{params: params});
    // },
    // getMashines() {
    //     return http.get('/dalaran/mashines');
    // },
    getjobs(params) {
        return http.get('/ajkspider/jobs', {params: params});
    },
    enablejob(params) {
        return http.post('/ajkspider/enable', params);
    },
    // createjob(params) {
    //     return http.get('/dalaran/createjob', {params: params});
    // },
    startjob(params) {
        return http.post('/ajkspider/start', params);
    },
    stopjob(params) {
        return http.post('/ajkspider/stop', params);
    },
    // updatejob(params) {
    //     return http.get('/dalaran/update', {params: params});
    // },
    // addIdea(params) {
    //     return http.post('/cmsapi/idea/addIdea', params);
    // },
    // editIdea(params) {
    //     return http.post('/cmsapi/idea/editIdea', params);
    // },
    // setDefault(params) {
    //     return http.post('/cmsapi/idea/setDefault', params);
    // },
    //
    // // 获取所有应用

    // // 添加应用
    // addStation(params) {
    //     return http.post('/cmsapi/addStation', params);
    // },
    // // 修改应用/cmsapi/updateStation
    // updateStation(params) {
    //     return http.post('/cmsapi/updateStation', params);
    // },
    // // 获取所有频道
    // getAllPage(params) {
    //     return http.get('/cmsapi/getChannelInfo', {params: params});
    // },
    // // 添加栏目
    // addPage(params) {
    //     return http.post('/cmsapi/addPage', params);
    // },
    // // 获取所有位置/cmsapi/getAllPosition
    // getAllPositions(params) {
    //     return http.post('/cmsapi/getAllPosition', params);
    // },
    // // 添加位置
    // addPosition(params) {
    //     return http.post('/cmsapi/addPosition', params);
    // },
    // // 修改位置/cmsapi/updatePosition
    // updatePosition(params) {
    //     return http.post('/cmsapi/updatePosition', params);
    // },
    // //添加广告计划
    // addPlan(params) {
    //     return http.post('/cmsapi/addPlan', params);
    // },
    // //修改广告计划
    // editPlan(params) {
    //     return http.post('/cmsapi/editPlan', params);
    // },
    // panList(params) {
    //     return http.get('/cmsapi/panList', {params: params});
    // },
    // editStatus(params) {
    //     return http.post('/cmsapi/editStatus', params);
    // },
    // addPreView(params) {
    //     return http.post('/cmsapi/idea/addPreView', params);
    // },
    // getAllPosition(params) {
    //     return http.post('/cmsapi/getAllPosition', params);
    // },
};
