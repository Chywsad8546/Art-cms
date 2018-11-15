import wys_img from './wys-view/simple/wys-img.vue';
import wys_imgAtlas from './wys-view/simple/wys-imgAtlas.vue';
import wysHasMiss from './wys-view/simple/wys-wrong';
import groupdrawing from './wys-view/simple/groupdrawing.vue';
import wys_pic from './wys-view/simple/wys-pic.vue';

export default {

    stageComponents: [
        // {
        //     icon: 'http://wap-qn.bidewu.com/00081291-a6c4-11e8-94d8-00cfe03e854e.jpg',
        //     component: wys_img,
        //     id: 'wys_img'
        // },
        {
            icon: 'http://wap-qn.bidewu.com/003a814f-a6d1-11e8-8d43-00cfe03e854e.jpg',
            component: wysHasMiss,
            hide:true,
            id: 'wysHasMiss'
        },
        {
            icon: 'http://wap-qn.toutiaofangchan.com/adideas/f201497cc5804d7eae6162cb898b62d4.png',
            title:'图集',
            component: wys_imgAtlas,
            id: 'wys_imgAtlas'
        },
        {
            icon: 'http://wap-qn.toutiaofangchan.com/adideas/40722bf51e2947f3b64c8754f4d898cb.png',
            title:'组图',
            component: groupdrawing,
            id: 'groupdrawing'
        },
        {
            icon: 'http://wap-qn.toutiaofangchan.com/adideas/6e710a9d302d462bb257868c307507d2.png',
            title:'图片',
            component: wys_pic,
            id: 'wys_pic'
        },
    ]
};
