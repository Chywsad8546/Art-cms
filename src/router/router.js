import Main from '@/views/Main.vue';
/**
 * import拆分4个平台的钩子文件
 */
import {
    loginRouter,
    homeRouter,
    otherRouter as otherRouterProxy,
    appRouter as appRouterProxy,
    aloneRouter as aloneRouterProxy
} from '../../build/router.build.hook'


export const page404 = {
    path: '*',
    name: 'error-404',
    meta: {
        requireAuth:false,
        title: '404-页面不存在'
    },
    component: () =>
        import ('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        requireAuth:false,
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () =>
        import ('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        requireAuth:false,
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () =>
        import ('@/views/error-page/500.vue')
};



// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = otherRouterProxy;
//     {
//     path: '/',
//     name: 'otherRouter',
//     redirect: '/home',
//     component: Main,
//     children: [
//
//
//     ]
// };


// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    ...appRouterProxy
];


/**
 * 取消掉 一级菜单的权限验证meta，因为一级菜单的权限可能无法被管理员勾选
 * @type {VueRouter}
 */
[...appRouter,otherRouter,homeRouter].forEach((item, index) => {
    if(!item.meta){
        item.meta = {}
    }
    item.meta.requireAuth = false;
    item.meta.topRouter = true;
});

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    homeRouter,
    loginRouter,
    otherRouter,
    ...aloneRouterProxy,
    ...appRouter,
    page500,
    page403,
    page404
];

let routerchecks={}
function checkDump(arr,notip, duptip) {

    arr.forEach((item, index) => {
        if(!item.name){
            console.warn(notip+'：',item)
            throw new Error(notip);
        }
        if (routerchecks[item.name]){
            console.warn(duptip,[item,routerchecks[item.name]])
            throw new Error(duptip);
        }
        routerchecks[item.name]=item;
        if (item.children && item.children.length>0){
            checkDump(item.children,'路由name未定义，系统启动失败' ,'路由name或权限重名，系统启动失败，上面2项name冲突:');
        }
        if (item.permissions && item.permissions.length>0){
            checkDump(item.permissions,'权限name未定义，系统启动失败，permission格式要求{name:"xxx",title:"xxx"}','路由name或权限重名，系统启动失败，上面2项name冲突:');
        }
    });
};
checkDump(routers);
