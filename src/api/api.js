
import axios from 'axios';
import iView from 'iview';
// var hostname = window.location.hostname;
const ApiBaseUrl = 'http://api.test.toutiaofangchan.com';

// export function apiBase() {
//     return ApiBaseUrl;
// }

var URL = [];

// 企业列表、企业详情、添加企业、经纪人列表
URL['listCorp'] = ApiBaseUrl + '/v1.0.0/customer/listCorp';// 企业列表
URL['getCorp'] = ApiBaseUrl + '/v1.0.0/customer/getCorp';// 企业详情
URL['addCorp'] = ApiBaseUrl + '/v1.0.0/customer/addCorp';// 新增企业
URL['getCorpAgent'] = ApiBaseUrl + '/v1.0.0/customer/getCorpAgent';
URL['corpStructure'] = ApiBaseUrl + '/v1.0.0/customer/corpStructure';
URL['getCustomerAgentList'] = ApiBaseUrl + '/v1.0.0/customer/getCustomerAgentList';// 经纪人列表
URL['getCustomerAgentDetail'] = ApiBaseUrl + '/v1.0.0/customer/getCustomerAgentDetail';// 经纪人详情
URL['getDistrict'] = ApiBaseUrl + '/v1.0.0/customer/getDistrict';// 区县

// 登录、修改密码、获取密码
URL['userAccountLogin'] = ApiBaseUrl + '/v1.0.0/sys/userAccountLogin';// 登录
URL['updateAgentPassword'] = ApiBaseUrl + '/v1.0.0/agent/updateAgentPassword';// 修改密码
URL['getAgentPassword'] = ApiBaseUrl + '/v1.0.0/agent/getAgentPassword';//

// 请求接口
export function getData (name, data, mathod) {
    var ApiUrl = URL[name];
    if (!ApiUrl) {
        iView.Message.error({
            content: '请求地址错误',
            duration: 3
        });
        return;
    }
    if (mathod === 'get') {
        return axios.get(ApiUrl, {params: data});
    } else if (mathod === 'post') {
        return axios.post(ApiUrl, data);
    } else {
        iView.Message.error({
            content: '请求方式错误',
            duration: 3
        });
        return;
    }
}
