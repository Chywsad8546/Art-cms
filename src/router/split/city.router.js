import Main from '@/views/Main.vue';

export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
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
        },
        {
            path: 'cityManageSystem/positionEdit',
            title: '排期详情页',
            name: 'positionEdit',
            component: () =>
                import('@/views/advertisement/positionEdit.vue')
        },
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
                import('@/views/cityManageSystem/blankPage.vue')
        },
        {
                path: 'formtemplate',
                name: 'formtemplate',
                title: '模板添加',
                // meta: {
                //     requireAuth: true
                // },
                component: () =>
                    import('@/views/advertisement/formtemplate.vue')
        },
        {
                path: 'templateList',
                name: 'templateList',
                title: '模板列表',
                // meta: {
                //     requireAuth: true
                // },
                component: () =>
                    import('@/views/advertisement/templateList.vue')
        },
        {
            path: 'guanggapwei',
            name: 'guanggapwei',
            title: '广告位',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/advertisement/blankPage.vue')
        },
        {
            path: 'chuangyibiao',
            name: 'chuangyibiao',
            title: '创意列表',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/blankPage.vue')
        },
        {
            path: 'luodiye',
            name: 'luodiye',
            title: '落地页',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/blankPage.vue')
        },
        {
            path: 'guanggaoyonghuliebiao',
            name: 'guanggaoyonghuliebiao',
            title: '广告用户列表',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/blankPage.vue')
        },
        {
            path: 'apppushlist',
            name: 'apppushlist',
            title: '推送列表',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/advertisement/appPush.vue')
        },
        {
            path: 'manyplotad',
            name: 'manyplotad',
            title: '多楼盘广告配置',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/blankPage.vue')
        },
        {
            path: 'manyplotadlist',
            name: 'manyplotadlist',
            title: '多楼盘广告',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/blankPage.vue')
        },
        {
            path: 'openscreenpage',
            name: 'openscreenpage',
            title: 'APP开屏广告',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/cityManageSystem/blankPage.vue')
        },
        {
            path: 'openscreenpagelist',
            name: 'openscreenpagelist',
            title: 'APP开屏广告列表',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/advertisement/openScreen.vue')
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
    //新闻管理
    {
        path: '/cmsNewsManage',
        icon: 'social-buffer',
        name: 'newsmanage',
        title: '新闻管理',
        component: Main,
        children: [{
                path: 'newsManageList',
                name: 'newsManageList',
                title: '资讯列表',
                // meta: {
                //     requireAuth: true
                // },
                component: () =>
                    import('@/views/newsManage/newsManageList.vue'),
                permissions: [
                    {
                        name: 'button_newsmodify',
                        title: '修改权限'
                    },
                    {
                        name: 'button_setIsTop',
                        title: '置顶权限'
                    },
                    {
                        name: 'button_removeArticle',
                        title: '撤稿权限'
                    },
                    {
                        name: 'button_ArticleSetSort',
                        title: '排序权限'
                    },
                    {
                        name: 'button_pushArticle',
                        title: '发布权限'
                    },
                ]
            },{
            path: 'releaseArticle',
            name: 'releaseArticle',
            title: '发表文章',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/newsManage/contentManage/articleAdd.vue')
        },
        {
            path: 'imageArticle',
            name: 'imageArticle',
            title: '发表图集',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/newsManage/contentManage/imageArticleAdd.vue')
        },
        {
            path: 'videoArticle',
            name: 'videoArticle',
            title: '发表视频',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/newsManage/contentManage/videoArticleAdd.vue')
        },
        // {
        //     path: 'chuangyibiao',
        //     name: 'chuangyibiao',
        //     title: '创意列表',
        //     // meta: {
        //     //     keepalive: true
        //     // },
        //     component: () =>
        //         import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        // },
        // {
        //     path: 'luodiye',
        //     name: 'luodiye',
        //     title: '落地页',
        //     // meta: {
        //     //     keepalive: true
        //     // },
        //     component: () =>
        //         import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        // },
        // {
        //     path: 'guanggaoyonghuliebiao',
        //     name: 'guanggaoyonghuliebiao',
        //     title: '广告用户列表',
        //     // meta: {
        //     //     keepalive: true
        //     // },
        //     component: () =>
        //         import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        // },
        // {
        //     path: 'apppushlist',
        //     name: 'apppushlist',
        //     title: '推送列表',
        //     // meta: {
        //     //     keepalive: true
        //     // },
        //     component: () =>
        //         import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        // },
        // {
        //     path: 'manyplotad',
        //     name: 'manyplotad',
        //     title: '多楼盘广告配置',
        //     // meta: {
        //     //     keepalive: true
        //     // },
        //     component: () =>
        //         import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        // },
        // {
        //     path: 'manyplotadlist',
        //     name: 'manyplotadlist',
        //     title: '多楼盘广告',
        //     // meta: {
        //     //     keepalive: true
        //     // },
        //     component: () =>
        //         import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        // },
        // {
        //     path: 'openscreenpage',
        //     name: 'openscreenpage',
        //     title: 'APP开屏广告',
        //     // meta: {
        //     //     keepalive: true
        //     // },
        //     component: () =>
        //         import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        // },
        // {
        //     path: 'openscreenpagelist',
        //     name: 'openscreenpagelist',
        //     title: 'APP开屏广告列表',
        //     // meta: {
        //     //     keepalive: true
        //     // },
        //     component: () =>
        //         import('@/views/cityManageSystem/personManage/agentTableDown.vue')
        // },
        //     // {
        //     //     path: 'ownerList',
        //     //     name: 'ownerList',
        //     //     title: '业主管理',
        //     //     component: () =>
        //     //         import ('@/views/cityManageSystem/personManage/ownerList.vue')
        //     // },
        ]
    },
    //字典管理
    {
        path: '/dictionary',
        icon: 'social-buffer',
        name: 'dictionary',
        title: '字典管理',
        component: Main,
        children: [{
            path: 'channelDictionary',
            name: 'channelDictionary',
            title: '栏目字典',
            // meta: {
            //     requireAuth: true
            // },
            component: () =>
                import('@/views/dictionary/channelDictionary.vue')
        },{
            path: 'tagDictionary',
            name: 'tagDictionary',
            title: '标签字典',
            // meta: {
            //     requireAuth: true
            // },
            component: () =>
                import('@/views/dictionary/tagDictionary.vue')
        }
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
        },
            {
                path: 'userManage',
                name: 'userManage',
                title: '用户管理',
                // meta: {
                //     requireAuth: true
                // },
                component: () =>
                    import('@/views/systemManage/sysManage/userManage.vue')
            }     
        ]
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
