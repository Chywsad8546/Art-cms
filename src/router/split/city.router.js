import Main from '@/views/Main.vue';

export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {
            path: 'cityManageSystem/companyDetailtest',
            title: '企业详情test',
            name: 'companyDetail_city_test',
            meta: {
                keepalive: true,
                multipage: true
            },
            component: () =>
                import('@/views/cityManageSystem/companyManage/companyDetail.vue')
        },
        //城市管理员
        {
            path: 'cityManageSystem/companyDetail',
            title: '企业详情',
            name: 'companyDetail_city',
            meta: {
                keepalive: true,
                multipage: true
            },
            component: () =>
                import('@/views/cityManageSystem/companyManage/companyDetail.vue')
        }, //公司详情
        {
            path: 'cityManageSystem/storeDetail',
            title: '门店详情',
            name: 'storeDetail_city',
            meta: {
                keepalive: true,
                multipage: true
            },
            component: () =>
                import('@/views/cityManageSystem/companyManage/storeDetail.vue')
        }, //门店详情
        {
            path: 'cityManageSystem/org',
            title: '组织架构',
            name: 'org',
            component: () =>
                import('@/views/cityManageSystem/companyManage/org.vue')
        }, //企业组织架构
        {
            path: 'cityManageSystem/modifyTel',
            title: '修改安全手机',
            name: 'modifyTelother',
            component: () =>
                import('@/views/cityManageSystem/inforCenter/modifyTel.vue')
        }, //修改安全手机
        {
            path: 'cityManageSystem/agentDetail',
            title: '经纪人详情',
            name: 'agentDetail',
            component: () =>
                import('@/views/cityManageSystem/personManage/agentDetail.vue')
        }, //经纪人详情
        {
            path: 'cityManageSystem/pendingDetail',
            title: '待审核详情',
            name: 'pendingDetail',
            component: () =>
                import('@/views/cityManageSystem/roleCert/pendingDetail.vue')
        }, //待审核详情
        {
            path: 'cityManageSystem/auditedDetail',
            title: '已审核详情',
            name: 'auditedDetail',
            component: () =>
                import('@/views/cityManageSystem/roleCert/auditedDetail.vue')
        },
        {
            path: 'cityManageSystem/qualificationCardAuthDetail',
            title: '待审核信息卡详情',
            name: 'qualificationCardAuthDetail',
            component: () =>
                import('@/views/cityManageSystem/roleCert/qualificationCardAuthDetail.vue')
        },
        {
            path: 'cityManageSystem/auditedBusiCardList',
            title: '已审核名片',
            name: 'auditedBusiCardList',
            component: () =>
                import('@/views/cityManageSystem/roleCert/auditedBusiCardList.vue')
        },
        {
            path: 'cityManageSystem/auditedIdCardList',
            title: '已审核身份证',
            name: 'auditedIdCardList',
            component: () =>
                import('@/views/cityManageSystem/roleCert/auditedIdCardList.vue')
        },
        {
            path: 'cityManageSystem/qualificationCardAuthDoneList',
            title: '已审核信息卡',
            name: 'qualificationCardAuthDoneList',
            component: () =>
                import('@/views/cityManageSystem/roleCert/qualificationCardAuthDoneList.vue')
        },
        //已审核详情
        // {
        //     path: 'cityManageSystem/rentHouseManageWait_city',
        //     title: '待出租房源',
        //     name: 'rentHouseManageWait_city',
        //     component: () =>
        //         import ('@/views/cityManageSystem/houseManage/rentHouseManageWait_city.vue')
        // },
        {
            path: 'cityManageSystem/rentHouseManageOff_city',
            title: '已强制下架出租房源',
            name: 'rentHouseManageOff_city',
            component: () =>
                import('@/views/cityManageSystem/houseManage/rentHouseManageOff_city.vue')
        },
        {
            path: 'cityManageSystem/rentHouseDetail_city',
            title: '出租房源详情',
            name: 'rentHouseDetail_city',
            component: () =>
                import('@/views/cityManageSystem/houseManage/rentHouseDetail_city.vue')
        },
        {
            path: 'cityManageSystem/sellHouseDetail',
            title: '出售房源详情',
            name: 'sellHouseDetail',
            component: () =>
                import('@/views/cityManageSystem/houseManage/sellHouseDetail.vue')
        },
        {
            path: 'cityManageSystem/esfHouseManageWait_city',
            title: '待出售房源',
            name: 'esfHouseManageWait_city',
            component: () =>
                import('@/views/cityManageSystem/houseManage/esfHouseManageWait_city.vue')
        },
        {
            path: 'cityManageSystem/esfHouseManageOff_city',
            title: '已下架出售房源',
            name: 'esfHouseManageOff_city',
            component: () =>
                import('@/views/cityManageSystem/houseManage/esfHouseManageOff_city.vue')
        },
        // 系统管理：权限管理
        {
            path: 'sysManage/assignPermissions',
            title: '分配权限',
            name: 'assignPermissions',
            meta: {
                requireAuth: false,
                multipage: true
            },
            component: () =>
                import('@/views/systemManage/sysManage/assignPermissions.vue')
        },
        {
            path: 'inviteHistoty',
            title: '邀请记录',
            name: 'inviteHistoty',
            meta: {
                requireAuth: false,
                multipage: true
            },
            component: () =>
                import('@/views/cityManageSystem/customerManage/inviteHistoryList.vue')
        },
        {
            path: 'projExpertList',
            title: '楼盘专家列表',
            name: 'projExpertList',
            meta: {
                requireAuth: false,
                multipage: true
            },
            component: () =>
                import('@/views/cityManageSystem/customerManage/projExpertList.vue')
        }
    ]
};

export const appRouter = [
    //人员管理
    {
        path: '/cityManageSystem',
        icon: 'social-buffer',
        name: 'personManage',
        title: '广告管理',
        component: Main,
        children: [{
            path: 'yihaoyuan',
            name: 'yihaoyuan',
            title: '北京壹号院',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/personManage/agentList.vue')
        },
        {
            path: 'guanggapwei',
            name: 'guanggapwei',
            title: '广告位',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        },
        {
            path: 'chuangyibiao',
            name: 'chuangyibiao',
            title: '创意列表',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        },
        {
            path: 'luodiye',
            name: 'luodiye',
            title: '落地页',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        },
        {
            path: 'guanggaoyonghuliebiao',
            name: 'guanggaoyonghuliebiao',
            title: '广告用户列表',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        },
        {
            path: 'apppushlist',
            name: 'apppushlist',
            title: '推送列表',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        },
        {
            path: 'manyplotad',
            name: 'manyplotad',
            title: '多楼盘广告配置',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        },
        {
            path: 'manyplotadlist',
            name: 'manyplotadlist',
            title: '多楼盘广告',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        },
        {
            path: 'openscreenpage',
            name: 'openscreenpage',
            title: 'APP开屏广告',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        },
        {
            path: 'openscreenpagelist',
            name: 'openscreenpagelist',
            title: 'APP开屏广告列表',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        },
            // {
            //     path: 'ownerList',
            //     name: 'ownerList',
            //     title: '业主管理',
            //     component: () =>
            //         import ('@/views/cityManageSystem/personManage/ownerList.vue')
            // },
        ]
    },
    //系统管理
    {
        path: '/systemManage',
        icon: 'social-buffer',
        name: 'sysManage',
        title: '系统管理',
        component: Main,
        children: [{
            path: 'authorityManage',
            name: 'authorityManage',
            title: '权限管理',
            // meta: {
            //     requireAuth: true
            // },
            component: () =>
                import('@/views/systemManage/sysManage/authorityManage.vue')
        }]
    }
    // {
    //     path: '/cityManageSystem',    5
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
                import('@/views/cityManageSystem/home.vue')
        }]
    }
}
