import axios from 'axios';
import Vue from 'vue';
import Qs from 'qs';
import { router } from '@/router/index';
import config from '../../build/config.js';
import _ from 'lodash';
axios.defaults.baseURL = '/';
if(config.errortip){
    let search = window.location.search || '';
    if(search!=='') {
        try {
            axios.defaults.baseURL = 'http://' + _.trim(search, '?/') + '/'
        } catch (e) {
        }
    }
}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 30000;
axios.defaults.withCredentials = true;
/**
 * 统一 ajax 错误拦截器
 * 处理范围：
 *  1，未登录
 *  2，无权限
 *  3，服务器内部错误
 *  4，4xx 错误
 */
function initInterceptors (store) {
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        config["params"]= config["params"] || {}
        config["params"]["_cache"]=Math.random(new Date().getTime())
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
        // 拦截器代码不要改动，现在的架构能满足所有情况。
        if (response.data.code === "success") {
            return response;
        }
        let title = '';
        let message = '-';
        if (response.data.code === 20001 || response.data.code === 20020) {
            store.commit('setUserName', false);
            store.commit('setFontPermission', []);
            router.push({
                name: 'login'
            });
            title = '未登录';
        } else if (response.data.code === 20002) {
            title = '未开放此功能';
        } else if (response.data.code === 20003) {
            title = '你没有系统角色';
        } else if (response.data.code === 20004) {
            title = '没有权限';
            message = response.data.msg;
        } else if (response.data.code === 10001) {
            title = '请求错误';
            message = response.data.data;
        } else if (response.data.code === 10002) {
            title = '请求错误';
            message = response.data.data;
        } else if (response.data.code === 100003) {
            title = '请求地址错误';
            message = response.data.data;
        } else if (response.data.code === 100004) {
            title = '服务器异常';
            message = response.data.data;
        }
        if (title !== '' && config.errortip) {
            Vue.prototype.$Notice.error({
                title: title,
                desc: message
            });
        }
        let error = new Error(title);
        error = enhanceError(error, response.config, '', response.request, response);
        // throw error;
        return Promise.reject(error);
    }, function (error) {
        let message = '';
        if (error.response) {
            message = error.response.data;
        } else {
            // Something happened in setting up the request that triggered an Error
            message = error.message;
        }
        if(config.errortip) {
            Vue.prototype.$Notice.error({
                title: '网络异常',
                desc: message
            });
        }
        // Do something with response error

        return Promise.reject(error);
    });
}

/**
 * 错误工厂函数
 * tip:不向外暴露
 * @param error
 * @param config
 * @param code
 * @param request
 * @param response
 * @returns {*}
 */
function enhanceError (error, config, code, request, response) {
    error.config = config;
    if (code) {
        error.code = code;
    }
    error.request = request;
    error.response = response;
    return error;
}

/**
 * ajax get 请求
 * @param url
 * @param config
 * @returns {AxiosPromise<any>}
 */
async function get (url, config) {
    let response = await axios.get(url, config || {});
    return response
}

/**
 * ajax post 请求-application/x-www-form-urlencoded
 * @param url
 * @param data
 * @param config
 */
 async function post (url, data, config) {
    let response =await axios.post(url, Qs.stringify(data || {}), config || {});
    return response
}

/**
 * ajax post 请求-application/json
 * @param url
 * @param data
 * @param config
 */
async function postJson (url, data, config) {
    config = config || {};
    config['Content-Type'] = 'application/json;charset=UTF-8';
    let response =  await axios.post(url, data || {}, config);
    return response
}

export default {
    get: get,
    post: post,
    postJson: postJson,
    interceptors: initInterceptors
};
