import http from '../api.base';
import jsonp from "@/libs/jsonp.js";
/*
 *经纪人、业主
 */
export default {

    // 客服取消认领房源
    customerCancelClaimHouseSell(params) {
        return http.get('v1.0.0/agentHouseSell/customerCancelClaimHouseSell', {
            params: params
        });
    },

    // 房源朝向
    listHouseTowards() {
        return http.post('v1.0.0/houseConfig/listHouseTowards');
    },
    // 装修
    listHouseFitment() {
        return http.post('v1.0.0/houseConfig/listHouseFitment', );
    },
    // 付款方式
    listRentHousePayMode() {
        return http.post('v1.0.0/houseConfig/listRentHousePayMode', );
    },
    // 楼盘模糊查询 
    listHousingProject(params) {
        return http.post('v1.0.0/loupan/listHousingProject', params);
    },
    // 房源图片上传 
    uploadHouseRentImage(params) {
        return http.post('/v1.0.0/rent/uploadHouseRentImage', params);
    },
    // 出租房源列表 
    listHouseRent(params) {
        return http.get('v1.0.0/rent/listHouseRent', {
            params: params
        });
    },
    // 出租房源详情
    getHouseRentInfo(params) {
        return http.get('v1.0.0/rent/getHouseRentInfo', {
            params: params
        });
    },
    // 出租房源录入
    saveHouseRent(params) {
        return http.postJson('v1.0.0/rent/saveHouseRent', params);
    },
    // 出租房源更新
    updateHouseRentInfo(params) {
        return http.postJson('v1.0.0/rent/updateHouseRentInfo', params);
    },
    // 更改出租房源发布状态
    updateRentHouseStatus(params) {
        return http.post('v1.0.0/rent/updateHouseRentPublishStatus', params);
    },
    //出租房源修改店铺推荐状态
    setHouseRentRecommendInfo(params) {
        return http.post('v1.0.0/rent/setHouseRentRecommendInfo', params);
    },
    // 出售房源列表 
    listHouseEsf(params) {
        return http.post('v1.0.0/agentHouseSell/listHouseSellInfos', params);
    },
    // 出售房源详情
    getHouseSellMessage(params) {
        return http.get('v1.0.0/agentHouseSell/getHouseSellMessage ', {
            params: params
        });
    },
    // 更新出售房源
    updateEsfHouse(params) {
        return http.postJson('v1.0.0/agentHouseSell/updateHouseSellInfo', params);
    },
    // 更改出售房源发布状态
    updateHouseSellPublicStatus(params) {
        return http.get('v1.0.0/agentHouseSell/updateHouseSellPublicStatus', {
            params: params
        });
    },
    // 更新出售房源
    getHouseSellMessage(params) {
        return http.get('v1.0.0/agentHouseSell/getHouseSellMessage', {
            params: params
        });
    },
    // 出售房源标签、产权性质、房屋类型
    listSellHouseHouseTags() {
        return http.post('v1.0.0/houseConfig/listSellHouseHouseTags');
    },
    listSellHousePropertyRights() {
        return http.post('v1.0.0/houseConfig/listSellHousePropertyRights');
    },
    listSellHouseHouseType() {
        return http.post('v1.0.0/houseConfig/listSellHouseHouseType');
    },
    // 房源业务指标
    getAgentHouseData() {
        return http.get('v1.0.0/house/getAgentHouseData');
    },

    /**
     * author guoshiwei
     * 认领模块的api
     * 
     */
    // 经济人认领列表
    async getListAgentClaimHouseSell(params) {
        let res = await http.post('/v1.0.0/agentHouseSell/listAgentClaimHouseSell', params)
        return res
    },
    // 经纪人认领
    async agentClaimHouseSell(params) {
        let res = await http.get('/v1.0.0/agentHouseSell/agentClaimHouseSell', { params: params })
        return res
    },
    // 经纪人取消认领
    agentCancelClaimHouseSell(params) {
        return http.get('/v1.0.0/agentHouseSell/agentCancelClaimHouseSell', {
            params: params
        })
    },
    // 认领预览详情
    getHouseSellClaimByHouseId(params) {
        return http.get('/v1.0.0/agentHouseSell/getHouseSellClaimByHouseId', {
            params: params
        })
    },
    // 更新详情
    async updateAgentClaimHouseSellInfo(params) {
        console.log(params)
        return await http.postJson('v1.0.0/agentHouseSell/updateAgentClaimHouseSellInfo', params)
    },

    //出租房源强制下架
    forceOffShelf(params) {
        return http.post('v1.0.0/rent/forceOffShelf', params);
    },
    //经纪人删除所属出租房源
    updateHouseRentIsDelStatus(params) {
        return http.get('v1.0.0/rent/updateHouseRentIsDelStatus', {
            params: params
        });
    },

    // 经纪人删除出售房源
    updateHouseSellIsDelStatus(params) {
        return http.get('v1.0.0/agentHouseSell/updateHouseSellIsDelStatus', {
            params: params
        });
    },
    //出租房源标签
    listRentHouseHouseTags() {
        return http.post('v1.0.0/houseConfig/listRentHouseHouseTags');
    },

    // 敏感词
    checkSensitiveWord(params) {
        return http.post('/v1.0.0/houseConfig/checkSensitiveWord', params);
    },
    /**
     * 出租出售  店铺推荐
     */
    // 出租房源推荐
    setRentRecommend(params) {
        return http.post('/v1.0.0/rent/recommendHouseRent', params);
    },
    //出租房源取消推荐
    setRentUnRecommend(params) {
        return http.post('/v1.0.0/rent/cancelRecommendHouseRent', params);
    },
    // 出租房源  设置定向推荐
    directionalRecommend(params) {
        return http.postJson('/v1.0.0/rent/directionalRecommend', params);
    },
    // 出租房源   消定向推荐
    cancelDirectionalRecommend(params) {
        return http.post('/v1.0.0/rent/cancelDirectionalRecommend', params);
    },
    // 出售房源设置推荐
    setSellIsRecommend(params) {
        return http.get('/v1.0.0/agentStore/updateHouseSellRecommendStatus', { params: params });
    },
    // 出售房源定向推荐
    sellHouseDR(params) {
        return http.postJson('/v1.0.0/houseRecommend/sellHouseDR', params);
    },
    // 取消出售房源定向推荐
    cancelSellHouseDR(params) {
        return http.post('/v1.0.0/houseRecommend/cancelSellHouseDR', params);
    },

    //出售房源推荐列表
    listRecommendHouseSell(params) {
        return http.post('/v1.0.0/agentStore/listRecommendHouseSell', params);
    },
    // 出售待发布列表发布
    agentPublicClaimHouseSell(params) {
        return http.post('/v1.0.0/agentHouseSell/agentPublicClaimHouseSell', params);
    },
    // 导入麦田房源
    getMaitianInfo(params) {
        return http.get('/spider/Maitian', { params: params });
    },
    // 我爱我家纠错
    getWoAiInfo(params) {
        return http.get('/spider/Woai', { params: params });
    },
    // 导入我爱我加房源
    getWiWjInfo(params) {
        return http.get('/spider/wiwj', { params: params });
    },
    selectAddressDescByNewCode(params) {
        return http.get('/v1.0.0/loupan/selectAddressDescByNewCode', { params: params });
    },
    // 新房活动楼盘列表
    getProjActivityList(params) {
        return http.get('/v1.0.0/projactivity/getProjActivityList', { params: params });
    }
}