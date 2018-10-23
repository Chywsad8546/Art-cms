/**
 * 这个是高级编辑器路由
 */
export default {

    editorRouters: [
        // {
        //     component: wys_img,
        //     id: 'wys_img'
        // },
        {
            id: 'wysHasMiss',
            component: () =>
                import('@/views/advertisement/adSimpleView.vue'),

        }
]
};
