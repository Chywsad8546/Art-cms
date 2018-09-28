import Main from '@/views/Main.vue';

export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
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
        title: '人员管理',
        component: Main,
        children: [{
            path: 'agentList',
            name: 'agentList',
            title: '经纪人管理',
            meta: {
                keepalive: true
            },
            component: () =>
                import('@/views/cityManageSystem/personManage/agentList.vue')
        },
        {
            path: 'agentTableDown',
            name: 'agentTableDown',
            title: '操作表下载',
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
    //身份认证
    {
        path: '/cityManageSystem',
        icon: 'social-buffer',
        name: 'roleCert',
        title: '身份认证',
        component: Main,
        children: [{
            path: 'pendingCert',
            name: 'pendingCert',
            title: '名片认证',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/roleCert/pendingCert.vue')
        },
        {
            path: 'auditedCert',
            name: 'auditedCert',
            title: '身份证认证',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/roleCert/auditedCert.vue')
        }, {
            path: 'qualificationCardAuthWaitList',
            name: 'qualificationCardAuthWaitList',
            title: '信息卡认证',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/roleCert/qualificationCardAuthWaitList.vue')
        }
        ]
    },
    //支付管理
    {
        path: '/payManage',
        icon: 'social-buffer',
        name: 'payManage',
        title: '支付管理',
        component: Main,
        children: [{
            path: 'payOpen',
            name: 'payOpen',
            title: '付费开通',
            meta: {
                keepalive: true
            },
            component: () =>
                import('@/views/cityManageSystem/payManage/payOpen.vue')
        },
        {
            path: 'accountClose',
            name: 'accountClose',
            title: '经纪人账户',
            meta: {
                keepalive: true
            },
            component: () =>
                import('@/views/cityManageSystem/payManage/accountClose.vue')
        },
        {
            path: 'recommendPay',
            name: 'recommendPay',
            title: '优推开通',
            meta: {
                keepalive: true
            },
            component: () =>
                import('@/views/cityManageSystem/payManage/recommendPay.vue')
        },
        {
            path: 'salerJoin',
            name: 'salerJoin',
            title: '销售关联',
            meta: {
                keepalive: true
            },
            component: () =>
                import('@/views/cityManageSystem/payManage/salerJoin.vue')
        }]
    },
    //楼盘管理
    {
        path: '/projExpertManage',
        icon: 'social-buffer',
        name: 'projExpertManage',
        title: '楼盘管理',
        component: Main,
        children: [{
            path: 'projList',
            name: 'projList',
            title: '楼盘信息列表',
            meta: {
                keepalive: true
            },
            component: () =>
                import('@/views/cityManageSystem/customerManage/projList.vue')
        },
        {
            path: 'downloadProjExpert',
            name: 'downloadProjExpert',
            title: '楼盘专家下载',
            meta: {
                keepalive: true
            },
            component: () =>
                import('@/views/cityManageSystem/customerManage/downloadProjExpert.vue')
        }
        ]
    },
    //城市管理账户路由地址
    {
        path: '/cityManageSystem',
        icon: 'social-buffer',
        name: 'cityManageSystem',
        title: '企业管理',
        component: Main,
        children: [{
            path: 'companyList',
            name: 'companyList',
            title: '企业列表',
            meta: {
                keepalive: true
            },
            component: () =>
                import('@/views/cityManageSystem/companyManage/companyList.vue')
        },
        {
            path: 'addCompany',
            name: 'addCompany',
            title: '新建企业',
            component: () =>
                import('@/views/cityManageSystem/companyManage/addCompany.vue'),
        }
        ]
    },
    //房源管理
    {
        path: '/cityManageSystem',
        icon: 'social-buffer',
        name: 'HouseManage',
        title: '房源管理',
        component: Main,
        children: [{
            path: 'rentHouseManage_city',
            name: 'rentHouseManage_city',
            title: '出租房源',
            meta: {
                keepalive: true
            },
            component: () =>
                import('@/views/cityManageSystem/houseManage/rentHouseManage_city.vue')
        },
        {
            path: 'esfHouseManage_city',
            name: 'esfHouseManage_city',
            title: '出售房源',
            component: () =>
                import('@/views/cityManageSystem/houseManage/esfHouseManage_city.vue')
        }
        ]
    },
    //客户管理
    {
        path: '/cityManageSystem',
        icon: 'social-buffer',
        name: 'CustomerManage',
        title: '客户管理',
        component: Main,
        children: [{
            path: 'customerList',
            name: 'customerList',
            title: '用户管理',
            meta: {
                keepalive: true
            },
            component: () =>
                import('@/views/cityManageSystem/customerManage/customerList.vue')
        },
        {
            path: 'OperationDownload',
            name: 'OperationDownload',
            title: '操作流水下载',
            component: () =>
                import('@/views/cityManageSystem/customerManage/operationDownload.vue')
        },
        {
            path: 'invitationCodeList',
            name: 'invitationCodeList',
            title: '邀请码管理',
            meta: {
                keepalive: true
            },
            component: () =>
                import('@/views/cityManageSystem/customerManage/invitationCodeList.vue')
        },
        {
            path: 'newHouseCoupon',
            name: 'newHouseCoupon',
            title: '新房优惠',
            component: () =>
                import('@/views/cityManageSystem/houseManage/newHouseCoupon.vue')
        }
        ]
    },
    //统计中心
    {
        path: '/cityManageSystem',
        icon: 'lock-combination',
        title: '统计中心',
        name: 'dataCenter',
        component: Main,
        children: [{
            path: 'clickStatis',
            title: '房源点击统计',
            name: 'clickStatis',
            component: () =>
                import('@/views/cityManageSystem/dataCenter/clickStatis.vue')
        },
        // { path: 'topHouseStatis', title: '置顶购买统计', name: 'topHouseStatis', component: () => import('@/views/cityManageSystem/dataCenter/topHouseStatis.vue') },
        {
            path: 'tradeRecord',
            title: '支付流水记录',
            name: 'tradeRecord',
            component: () =>
                import('@/views/cityManageSystem/dataCenter/tradeRecord.vue')
        },
            // {
            //     path: 'searchStatis',
            //     title: '搜索统计',
            //     name: 'searchStatis',
            //     component: () =>
            //         import ('@/views/cityManageSystem/dataCenter/searchStatis.vue')
            // }
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
            meta: {
                requireAuth: true
            },
            component: () =>
                import('@/views/systemManage/sysManage/authorityManage.vue')
        }]
    },
    {
        path: '/cityManageSystem',
        icon: 'social-buffer',
        name: 'inforCenter',
        title: '账户设置',
        component: Main,
        children: [{
            path: 'Infor',
            name: 'Infor',
            title: '账户资料',
            component: () =>
                import('@/views/cityManageSystem/inforCenter/Infor.vue')
        },
        {
            path: 'modifyPassword',
            name: 'modifyPassword',
            title: '修改密码',
            component: () =>
                import('@/views/cityManageSystem/inforCenter/modifyPassword.vue')
        },
        {
            path: 'modifyTel',
            name: 'modifyTel',
            title: '修改安全手机',
            component: () =>
                import('@/views/cityManageSystem/inforCenter/modifyTel.vue')
        },
        ]
    },
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
                import('@/views/cityManageSystem/home.vue')
        }]
    }
}
