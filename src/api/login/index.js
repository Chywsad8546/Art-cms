import http from '../api.base';

export function getCurrentUser () {
    return http.get('/v1.0.0/sys/getUserInfo');
}

export function logout () {
    return http.get('/v1.0.0/sys/logout');
}

export default {
    // 非经纪人登录
    AccountLogin (params) {
        return http.post('/v1.0.0/sys/nonPersonalUserAccountLogin', params);
    },
    // 上传图片
    uploadImage (params) {
        return http.post('/v1.0.0/sys/uploadImage', params);
    },
    // 修改安全手机号-短信接口
    getCode (params) {
        return http.post('/v1.0.0/sys/sendModifySecurityPhoneCode', params);
    },
    // 新安全手机号-短信接口
    getNewCode (params) {
        return http.post('/v1.0.0/sys/sendNewModifySecurityPhone', params);
    },
};
