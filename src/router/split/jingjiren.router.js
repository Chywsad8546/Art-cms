import Main from '@/views/Main.vue';

export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        //经纪人
        {
            path: 'agentSystem/rentHouseManageWait',
            title: '待发布出租房源',
            name: 'agentRentHouseManageWait',
            component: () =>
                import('@/views/agentSystem/houseManage/rentHouseManageWait.vue'),
        },
        {
            path: 'agentSystem/rentHouseManageOff',
            title: '已下架出租房源',
            name: 'agentRentHouseManageOff',
            component: () =>
                import('@/views/agentSystem/houseManage/rentHouseManageOff.vue')
        },
        {
            path: 'agentSystem/rentHouseDetail',
            title: '出租房源信息',
            name: 'agentRentHouseDetail',
            component: () =>
                import('@/views/agentSystem/houseManage/rentHouseDetail.vue')
        },
        {
            path: 'agentSystem/esfHouseManageOff',
            title: '待发布出售房源',
            name: 'agentEsfHouseManageOff',
            component: () =>
                import('@/views/agentSystem/houseManage/esfHouseManageOff.vue')
        },
        {
            path: 'agentSystem/esfHouseManageUnder',
            title: '已下架出售房源',
            name: 'agentEsfHouseManageUnder',
            component: () =>
                import('@/views/agentSystem/houseManage/esfHouseManageUnder.vue')
        },
        {
            path: 'agentSystem/esfHouseDetail',
            title: '出售房源信息',
            name: 'agentesfHouseDetail',
            component: () =>
                import('@/views/agentSystem/houseManage/esfHouseDetail.vue')
        },
    ]
}

export const appRouter = [ //经纪人账户路由地址
    {
        path: '/agentSystem',
        icon: 'social-buffer',
        name: 'agentHouseManage',
        title: '房源管理',
        component: Main,
        children: [
            {
                path: 'agentEsfHouseManageWait',
                name: 'agentEsfHouseManageWait',
                title: '认领出售',
                component: () =>
                    import('@/views/agentSystem/houseManage/esfHouseManageWait.vue'),
                permissions: [
                    {
                        name: 'button_esfHouseManageWait',
                        title: '快速入口-认领出售'
                    }

                ]
            },
            {
                path: 'agentRentHouseAdd',
                name: 'agentRentHouseAdd',
                title: '录入出租',
                component: () =>
                    import('@/views/agentSystem/houseManage/rentHouseAdd.vue'),
                permissions: [
                    {
                        name: 'renhouseadd_button_addrenthouse',
                        title: '录入房源并发布-按钮'
                    }

                ]
            },
            {
                path: 'agentEsfHouseManage',
                name: 'agentEsfHouseManage',
                title: '管理出售',
                component: () =>
                    import('@/views/agentSystem/houseManage/esfHouseManage.vue')
            },
            {
                path: 'agentRentHouseManage',
                name: 'agentRentHouseManage',
                title: '管理出租',
                component: () =>
                    import('@/views/agentSystem/houseManage/rentHouseManage.vue'),
            },
        ]
    },
    {
        path: '/agentSystem',
        icon: 'social-buffer',
        name: 'perCenter',
        title: '个人中心',
        component: Main,
        children: [{
            path: 'basicInfo',
            name: 'basicInfo',
            title: '我的资料',
            component: () =>
                import('@/views/agentSystem/perCenter/basicInfo.vue')
        },
        {
            path: 'pswdEdit',
            name: 'pswdEdit',
            title: '修改密码',
            component: () =>
                import('@/views/agentSystem/perCenter/pswdEdit.vue')
        },
        {
            path: 'certification',
            name: 'certification',
            title: '我的认证',
            component: () =>
                import('@/views/agentSystem/perCenter/certification.vue')
        },
        {
            path: 'myReservation',
            name: 'myReservation',
            title: '我的预约',
            component: () =>
                import('@/views/agentSystem/perCenter/myReservation.vue')
        }
        ]
    },
    {
        path: '/agentSystem',
        icon: 'social-buffer',
        name: 'stores',
        title: '店铺设置',
        component: Main,
        children: [{
            path: 'agentStoresRecommend',
            name: 'agentStoresRecommend',
            title: '推荐房源',
            component: () =>
                import('@/views/agentSystem/stores/agentStoresRecommend.vue')
        }
        ]
    },
    {
        path: '/agentSystem',
        icon: 'social-buffer',
        name: 'dataCenter',
        title: '统计中心',
        component: Main,
        children: [{
            path: 'clickStatis',
            name: 'clickStatis',
            title: '房源点击统计',
            component: () =>
                import('@/views/agentSystem/dataCenter/clickStatis.vue')
        }]
    },
]
// app.vue的页面，完全没有
export const aloneRouter = [
    // 经纪人、业主注册页
    {
        path: '/registerAgent',
        name: 'registerAgent',
        meta: {
            requireLogin: false,
            title: '经纪人、业主注册页'
        },
        component: () =>
            import('@/views/agentSystem/register/registerAgent.vue')
    }
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
            title: '懂房帝登录页，懂房帝经纪人登录平台—懂房帝比得屋'
        },
        component: () =>
            import('@/views/agentSystem/login/loginAgent.vue')
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
            meta: {
                requireAuth: false
            },
            component: () =>
                import('@/views/agentSystem/agentHome.vue')
        }]
    }
}