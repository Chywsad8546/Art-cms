import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import { routers, otherRouter, appRouter } from './router';
import store from '../store';
import { getCurrentUser } from '@/api/login/index';
import { isdev } from '../../build/router.build.hook'
import agentApi from "@/api/agent/index";
/*
    导航守卫文件，此文件用于导航拦截处理
 */
Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    // console.log('to',to)
    if (to.matched.length === 0) {
        next({ name: "error-404" });
        return;
    }

    // 如果开启多页，为每一页生成不同的标识
    if (to.meta.multipage === true) {
        to.meta.keepaliveid = to.name + "_$kpa_" + (new Date().getTime());
    } else {
        to.meta.keepaliveid = to.name;
    }
    //标签页切换的时候会传回来已经存在的标识
    if (to.params.$kpa) {
        to.meta.keepaliveid = to.params.$kpa;
    }

    iView.LoadingBar.start();
    Util.title(to.meta.title);
    if (to.meta.requireLogin === false) {
        next();
    } else {
        if (!store.state.app.userName && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
            store.commit('setFontPermission', []);
            // store.commit('clearMenus');
            // 前端认为没登录的时候，让服务器端再判断一次
            getCurrentUser().then(function (response) {
                store.commit('setUserName', response.data.data.userName || '未知');
                store.commit('setCityId', response.data.data.cityId || 12);
                let salerShow = '';
                if (response.data.data.salerName && response.data.data.salerPhone) {
                    salerShow = '端口顾问 ' + response.data.data.salerName + ':' + response.data.data.salerPhone
                }
                store.commit('setSalerPhone', salerShow);
                store.commit('setFontPermission', response.data.data.menus || []);
                console.log('updatemenu_fresh')
                store.commit('updateMenulist', true);
                // const curRouterObj = Util.getRouterObjByName([otherRouter, ...appRouter], to.name);
                let requireAuth = true;
                if (to.meta && to.meta.requireAuth === false) {
                    requireAuth = false;
                }
               
                if (requireAuth && !isdev) { // 需要判断权限的路由
                    if (Util.showThisRoute(store.state.app.fontPermission, to.name)) {
                        Util.toDefaultPage([otherRouter, ...appRouter], to, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
                    } else {
                        next({
                            replace: true,
                            name: 'home_index'
                        });
                    }
                } else { // 没有配置权限的路由, 直接通过
                    Util.toDefaultPage([...routers], to, router, next);
                }
            }).catch(function () {
                next({
                    name: 'login'
                });
            });
        } else if (store.state.app.userName && to.name === 'login') { // 判断是否已经登录且前往的是登录页
            Util.title();
            next({
                name: 'home_index'
            });
        } else {
            // const curRouterObj = Util.getRouterObjByName([otherRouter, ...appRouter], to.name);
            let requireAuth = true;
            if (to.meta && to.meta.requireAuth === false) {
                requireAuth = false;
            }
            if (requireAuth && !isdev) { // 需要判断权限的路由
                if (Util.showThisRoute(store.state.app.fontPermission, to.name)) {
                    Util.toDefaultPage([otherRouter, ...appRouter], to, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
                } else {
                    next({
                        // replace: true,
                        name: 'error-403'
                    })
                }
            } else { // 没有配置权限的路由, 直接通过
                Util.toDefaultPage([...routers], to, router, next);
            }
        }
    }
});

router.afterEach((to, from) => {
    Util.openNewPage(router.app, to.name, to.params, to.query, to.meta.keepaliveid);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
