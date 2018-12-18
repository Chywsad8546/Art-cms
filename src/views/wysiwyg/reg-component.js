import wys_default from './wys-view/wys-default';
import wys_imgAtlas from './wys-view/simple/wys-imgAtlas.vue';
import wysHasMiss from './wys-view/simple/wys-wrong';
import groupdrawing from './wys-view/simple/groupdrawing.vue';
import wys_pic from './wys-view/simple/wys-pic.vue';
import wys_navigation from './wys-view/simple/wys-navigation.vue';
import splitcharacter from './wys-view/simple/wys-splitcharacter.vue';
import wys_link from './wys-view/simple/wys-link.vue';
import wys_placeholder from './wys-view/simple/wys-placeholder.vue';
import wys_button from './wys-view/simple/wys-button.vue';
import wys_tab from './wys-view/simple/wys-tab.vue';
import wys_title from './wys-view/simple/wys-title.vue';
import wys_video from './wys-view/simple/wys-video.vue';
import wys_form from './wys-view/marketing/wys-form.vue';
import wys_buttondownload from './wys-view/simple/wys-buttondownload.vue';
import wys_tel from './wys-view/marketing/wys-tel.vue';
import wys_text from './wys-view/simple/wys-text.vue';
import wys_article from './wys-view/simple/wys-article.vue';
import wys_secondList from './wys-view/marketing/wys-secondList.vue';
import wys_rentList from './wys-view/marketing/wys-rentList.vue';
import wys_newList from './wys-view/marketing/wys-newList.vue';
import wys_plotList from './wys-view/marketing/wys-plotList.vue';



export default {
    stageComponents: [
        {
            icon:
                'http://wap-qn.bidewu.com/00081291-a6c4-11e8-94d8-00cfe03e854e.jpg',
            component: wys_default,
            hide: true,
            id: 'wys_default'
        },
        {
            icon:
                'http://wap-qn.bidewu.com/003a814f-a6d1-11e8-8d43-00cfe03e854e.jpg',
            component: wysHasMiss,
            hide: true,
            id: 'wysHasMiss'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/f201497cc5804d7eae6162cb898b62d4.png',
            title: '布局',
            accepts: ['wys_link', 'wys_splitcharacter', 'wys_pic'],
            component: wys_placeholder,
            id: 'wys_placeholder'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/f201497cc5804d7eae6162cb898b62d4.png',
            title: '图集',
            component: wys_imgAtlas,
            id: 'wys_imgAtlas'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/40722bf51e2947f3b64c8754f4d898cb.png',
            title: '组图',
            component: groupdrawing,
            id: 'groupdrawing'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/6e710a9d302d462bb257868c307507d2.png',
            title: '图片',
            component: wys_pic,
            id: 'wys_pic'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/d0e3b2864a554906a150e0951694e284.png',
            title: '导航',
            component: wys_navigation,
            id: 'wys_navigation'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/5d7a196160ee4e19ab8ad68b28c47215.png',
            title: '分隔符',
            component: splitcharacter,
            id: 'wys_splitcharacter'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/0533226876f34c27b71feb7fb72e09dd.png',
            title: '链接',
            component: wys_link,
            id: 'wys_link'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/bfffb025a38b4be5963457fc85a007f6.png',
            title: '按钮',
            component: wys_button,
            id: 'wys_button'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/fe3142c7596d47789df1c2b84d3d88d6.png',
            title: 'Tab',
            accepts: ['wys_link', 'wys_splitcharacter', 'wys_pic'],
            component: wys_tab,
            id: 'wys_tab'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/fe3142c7596d47789df1c2b84d3d88d6.png',
            title: '标题',
            component: wys_title,
            id: 'wys_title'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/d3f56f515b354a6889d1c31ff7b519c5.png',
            title: '视频',
            component: wys_video,
            id: 'wys_video'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/ea1d511c21b3422596d73093ddff3d6c.png',
            title: '表单',
            component: wys_form,
            id: 'wys_form'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/d3f56f515b354a6889d1c31ff7b519c5.png',
            title: '下载按钮',
            component: wys_buttondownload,
            id: 'wys_buttondownload'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/44797874f2514a21ae820373f8a94f7d.png',
            title: '电话',
            component: wys_tel,
            id: 'wys_tel'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/2bf37fcd6b4a411f95b670adc8621768.png',
            title: '文本',
            component: wys_text,
            id: 'wys_text'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/2bf37fcd6b4a411f95b670adc8621768.png',
            title: '文章',
            component: wys_article,
            id: 'wys_article'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/6cd3cbdef0ee4027b8b36330dc7f77fd.png',
            title: '二手房源列表',
            component: wys_secondList,
            id: 'wys_secondList'
        },
        {
            icon:
                'http://wap-qn.toutiaofangchan.com/adideas/6cd3cbdef0ee4027b8b36330dc7f77fd.png',
            title: '租房列表',
            component: wys_rentList,
            id: 'wys_rentList'
        },
        // {
        //     icon:
        //         'http://wap-qn.toutiaofangchan.com/adideas/6cd3cbdef0ee4027b8b36330dc7f77fd.png',
        //     title: '新房列表',
        //     component: wys_newList,
        //     id: 'wys_newList'
        // },
        // {
        //     icon:
        //         'http://wap-qn.toutiaofangchan.com/adideas/6cd3cbdef0ee4027b8b36330dc7f77fd.png',
        //     title: '小区列表',
        //     component: wys_plotList,
        //     id: 'wys_plotList'
        // }
    ]
};
