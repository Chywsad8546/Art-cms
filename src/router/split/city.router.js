import Main from '@/views/Main.vue';

export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {
            path: 'formtemplate',
            name: 'formtemplate',
            title: '编辑器维护',
            // meta: {
            //     requireAuth: true
            // },
            component: () =>
                import('@/views/advertisement/formtemplate.vue')
        },
        {
            path: 'ad/redirect',
            title: '广告中间页',
            name: 'ad_redirect',
            component: () =>
                import('@/views/advertisement/advertiseEditor/adRedirect.vue')
        },
        {
            path: 'ad/addetail',
            title: '广告详情',
            name: 'ad_addetail',
            component: () =>
                import('@/views/advertisement/advertiseEditor/adSimpleView.vue')
        },
        {
            path: 'ad/positionEdit',
            title: '广告详情',
            name: 'positionEdit',
            component: () =>
                import('@/views/advertisement/positionEdit.vue')
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
            path: 'planDetail',
            name: 'planDetail',
            title: '计划详情',
            // meta: {
            //     requireAuth: true
            // },
            component: () =>
                import('@/views/advertisement/planDetail.vue')
        },

    ]
};

export const appRouter = [
    //专题建站
    {
        path: '/specialtopic',
        icon: 'social-buffer',
        name: 'specialtopic',
        title: '专题建站',
        component: Main,
        children: [

            {
                path: 'wysiwygmaindemo',
                name: 'wysiwygmaindemo',
                title: 'demo',
                // meta: {
                //     keepalive: true
                // },
                component: () =>
                    import('@/views/wysiwyg/main.vue')
            },
            {
                path: 'luodiye',
                name: 'luodiye',
                title: '源码专题页',
                // meta: {
                //     keepalive: true
                // },
                component: () =>
                    import('@/views/error-page/blankPage.vue')
            },
        ]
    },

    //消息推送
    {
        path: '/pushmessage',
        icon: 'social-buffer',
        name: 'pushmessage',
        title: '消息推送',
        component: Main,
        children: [

            {
                path: 'apppushlist',
                name: 'apppushlist',
                title: '推送列表',
                // meta: {
                //     keepalive: true
                // },
                component: () =>
                    import('@/views/advertisement/appPush.vue')
            }
        ]
    },
    //位置广告
    {
        path: '/cityManageSystem',
        icon: 'social-buffer',
        name: 'personManage',
        title: '位置广告',
        component: Main,
        children: [
            {
                path: 'stationManagement',
                name: 'stationManagement',
                title: '应用管理',
                // meta: {
                //     keepalive: true
                // },
                component: () =>
                    import('@/views/advertisement/stationManagement.vue')
            },
            {
                path: 'pageManagement',
                name: 'pageManagement',
                title: '栏目管理',
                // meta: {
                //     keepalive: true
                // },
                component: () =>
                    import('@/views/advertisement/pageManagement.vue')
            },
            {
                path: 'positionManagement',
                name: 'positionManagement',
                title: '广告位管理',
                component: () =>
                    import('@/views/advertisement/positionManagement.vue')
            },
            {
                path: 'positionPlan',
                name: 'positionPlan',
                title: '广告计划',
                component: () =>
                    import('@/views/advertisement/positionPlan.vue')
            },

        {
                path: 'templateList',
                name: 'templateList',
                title: '编辑器管理',
                // meta: {
                //     requireAuth: true
                // },
                component: () =>
                    import('@/views/advertisement/templateList.vue')
        },
        {
            path: 'guanggapwei',
            name: 'guanggapwei',
            title: '广告位排期管理',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/advertisement/blankPage.vue')
        },
        {
            path: 'ideaList',
            name: 'ideaList',
            title: '创意管理',
            // meta: {
            //     keepalive: true
            // },
            component: () =>
                import('@/views/advertisement/ideaNewsList.vue')
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
                meta: {
                    keepalive: true
                },
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
                    {
                        name: 'button_appPreview',
                        title: '预览权限'
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
            {
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

    //遗留功能
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
            },
            {
                path: 'manyplotadlist',
                name: 'manyplotadlist',
                title: '多楼盘广告',
                // meta: {
                //     keepalive: true
                // },
                component: () =>
                    import('@/views/error-page/blankPage.vue')
            },
            // {
            //     path: 'openscreenpage',
            //     name: 'openscreenpage',
            //     title: 'APP开屏广告',
            //     // meta: {
            //     //     keepalive: true
            //     // },
            //     component: () =>
            //         import('@/views/error-page/blankPage.vue')
            // },
        ]
    },
    {
        path: '/nouse',
        icon: 'social-buffer',
        name: 'nouse',
        title: '遗留功能',
        component: Main,
        children: [

            {
                path: 'yihaoyuan',
                name: 'yihaoyuan',
                title: '北京壹号院',
                // meta: {
                //     keepalive: true
                // },
                component: () =>
                    import('@/views/error-page/blankPage.vue')
            },
            {
                path: 'guanggaoyonghuliebiao',
                name: 'guanggaoyonghuliebiao',
                title: '广告用户列表',
                // meta: {
                //     keepalive: true
                // },
                component: () =>
                    import('@/views/error-page/blankPage.vue')
            },
            {
                path: 'manyplotad',
                name: 'manyplotad',
                title: '多楼盘广告配置',
                // meta: {
                //     keepalive: true
                // },
                component: () =>
                    import('@/views/error-page/blankPage.vue')
            },
        ]
    },
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
    {
        path: '/wysiwyg',
        name: 'wysiwygmain',
        meta: {
            requireAuth:false,
            title: '编辑器主页面'
        },
        component: () =>
            import ('@/views/wysiwyg/main.vue')
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
                import('@/views/home.vue')
        }]
    }
}
