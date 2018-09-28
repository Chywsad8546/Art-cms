import Main from '@/views/Main.vue';

export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        // 企业PC：经纪人详情
        {
            path: 'companySystem/brokerDetail',
            title: '经纪人详情',
            name: 'brokerDetail',
            component: () =>
                import('@/views/companySystem/companyManage/brokerDetail.vue')
        },
        {
            path: 'companyManage/companyDetail',
            title: '企业详情',
            name: 'companyDetail_m',
            component: () =>
                import('@/views/cityManageSystem/companyManage/companyDetail.vue')
        },
        /* { path: 'companyInfo/updatePhone-1', title: '修改安全手机-1', name: 'updatephone_1', component: () => import('@/views/cityManageSystem/companyInfo/updatePhone-1') },
         { path: 'companyInfo/updatePhone-2', title: '修改安全手机-2', name: 'updatephone_2', component: () => import('@/views/cityManageSystem/companyInfo/updatePhone-2') },
         { path: 'companyInfo/updatePhone-3', title: '修改安全手机-3', name: 'updatephone_3', component: () => import('@/views/cityManageSystem/companyInfo/updatePhone-3') },*/
        {
            path: 'companyInfo/updatePhone',
            title: '修改安全手机',
            name: 'updatephone',
            component: () =>
                import('@/views/companySystem/companyInfo/updatePhone.vue')
        },
        // {
        //     path: 'companySystem/rentHouseManageOff_corp',
        //     title: '已强制下架出租房源',
        //     name: 'rentHouseManageOff_corp',
        //     component: () =>
        //         import('@/views/companySystem/houseManage/rentHouseManageOff_corp.vue')
        // },
        // {
        //     path: 'companySystem/rentHouseDetail_corp',
        //     title: '出租房源详情',
        //     name: 'rentHouseDetail_corp',
        //     component: () =>
        //         import('@/views/companySystem/houseManage/rentHouseDetail_corp.vue')
        // },
        // {
        //     path: 'companySystem/sellHouseDetail',
        //     title: '出售房源详情',
        //     name: 'sellHouseDetail',
        //     component: () =>
        //         import('@/views/companySystem/houseManage/sellHouseDetail.vue')
        // },
    ]
}

export const appRouter = [
    //企业账户路由地址
    {
        path: '/companySystem',
        icon: 'social-buffer',
        name: 'companyManage',
        title: '人员管理',
        component: Main,
        children: [{
            path: 'brokerList',
            name: 'brokerList',
            title: '经纪人管理',
            component: () =>
                import('@/views/companySystem/companyManage/brokerList.vue')
        },
        {
            path: 'agentTableDown',
            name: 'agentTableDown',
            title: '操作表下载',
            component: () =>
                import('@/views/companySystem/companyManage/agentTableDown.vue')
        },
        ]
    },
    //房源管理
    // {
    //     path: '/companySystem',
    //     icon: 'social-buffer',
    //     name: 'HouseManage',
    //     title: '房源管理',
    //     component: Main,
    //     children: [{
    //         path: 'rentHouseManage_corp',
    //         name: 'rentHouseManage_corp',
    //         title: '出租房源',
    //         meta: {
    //             keepalive: true
    //         },
    //         component: () =>
    //             import('@/views/companySystem/houseManage/rentHouseManage_corp.vue')
    //     },
    //     {
    //         path: 'esfHouseManage_corp',
    //         name: 'esfHouseManage_corp',
    //         title: '出售房源',
    //         component: () =>
    //             import('@/views/companySystem/houseManage/esfHouseManage_corp.vue')
    //     },
    //     ]
    // },
    {
        path: '/companySystem',
        icon: 'lock-combination',
        title: '企业信息',
        name: 'companyInfo',
        component: Main,
        children: [{
            path: 'myInfo',
            title: '我的信息',
            name: 'myInfo',
            component: () =>
                import('@/views/companySystem/companyInfo/myInfo.vue')
        },
        // { path: 'topHouseStatis', title: '置顶购买统计', name: 'topHouseStatis', component: () => import('@/views/cityManageSystem/dataCenter/topHouseStatis.vue') },
        {
            path: 'updatePwd',
            title: '修改密码',
            name: 'updatePwd',
            component: () =>
                import('@/views/companySystem/companyInfo/updatePwd.vue')
        },
        {
            path: 'subordinateCompany',
            title: '下属企业',
            name: 'subordinateCompany',
            component: () =>
                import('@/views/companySystem/companyInfo/subordinateCompany.vue')
        }
        ]
    },
    // {
    //     path: '/companySystem',
    //     icon: 'lock-combination',
    //     title: '企业统计',
    //     name: 'companyStatistics',
    //     component: Main,
    //     children: [
    //         // { path: 'topHouseStatis', title: '置顶购买统计', name: 'topHouseStatis', component: () => import('@/views/cityManageSystem/dataCenter/topHouseStatis.vue') },

    //         /* {
    //             path: 'companyHouseGrounding',
    //             title: '房源上架统计',
    //             name: 'companyHouseGrounding',
    //             component: () =>
    //                 import('@/views/companySystem/companyStatistics/companyHouseGrounding.vue')
    //         }, */
    //         /*  {
    //              path: 'companyBuyTop',
    //              title: '购买置顶支付流水',
    //              name: 'companyBuyTop',
    //              component: () =>
    //                  import ('@/views/companySystem/companyStatistics/companyBuyTop.vue')
    //          }, */
    //         {
    //             path: 'companyClickSituation',
    //             title: '房源点击情况',
    //             name: 'companyClickSituation',
    //             component: () =>
    //                 import('@/views/companySystem/companyStatistics/companyClickStituation.vue')
    //         }
    //     ]
    // },

    // {
    //     path: '/cityManageSystem',
    //     icon: 'lock-combination',
    //     title: '店铺设置',
    //     name: 'shopSetting',
    //     component: Main,
    //     children: [
    //         { path: 'recommendHouse', title: '房源推荐', name: 'recommendHouse', component: () => import('@/views/cityManageSystem/shopSetting/recommendHouse.vue') },
    //     ]
    // },
];

export const aloneRouter = [

];

export default {
    otherRouter,
    appRouter,
    aloneRouter,
    loginRouter: {
        path: '/login',
        name: 'login',
        meta: {
            requireAuth: false,
            title: 'Login - 登录'
        },
        component: () => import('@/views/login.vue')
    },
    homeRouter: {
        path: '/',
        icon: 'key',
        name: 'home_default',
        redirect: '/home',
        title: '首页',
        component: Main,
        children: [{
            path: 'home',
            title: "首页",
            name: 'home_index',
            meta: { requireAuth: false },
            component: () =>
                import('@/views/companySystem/home.vue')
        }]
    }
}