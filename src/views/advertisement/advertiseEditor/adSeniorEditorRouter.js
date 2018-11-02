/**
 * 这个是高级编辑器路由
 * {
        name: '编辑器标识', // 要唯一，在编辑器路由的定义中不能重复，否则编译报错
        component: () =>
            import('@/views/advertisement/adSimpleView.vue'),

    }
 */

var editorRouters= [
    {
        name: 'default',
        title:'空白编辑器',
        component: () =>
            import('@/views/advertisement/advertiseEditor/adSimpleView.vue'),

    },
    {
        name: 'xinfangTop5Editor',
        title:'新房Top5编辑器',
        component: () =>
            import('@/views/advertisement/advertiseEditor/adSeniorEditor/xinfangTop5Editor.vue'),

    },
    {
        name: 'heatNewNouse',
        title:'热销新房',
        component: () =>
            import('@/views/advertisement/advertiseEditor/adSeniorEditor/heatNewNouse.vue'),
    },
    {
        name: 'newNouseRecommendList',
        title:'新房推荐列表',
        component: () =>
            import('@/views/advertisement/advertiseEditor/adSeniorEditor/newNouseRecommendList.vue'),
    }, 
    {
        name: 'mustseeCommunity',
        title:'必看社区',
        component: () =>
            import('@/views/advertisement/advertiseEditor/adSeniorEditor/mustseeCommunity.vue'),
    },  
];
















module.exports = {
    editorRouters:editorRouters
};

