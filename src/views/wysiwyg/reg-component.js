import wys_img from './wys-view/simple/wys-img.vue';
import wys_imgAtlas from './wys-view/simple/wys-imgAtlas.vue';
import wysHasMiss from './wys-view/simple/wys-wrong';
import groupdrawing from './wys-view/simple/groupdrawing.vue';
import wys_tab from './wys-view/simple/wys-tab.vue';

export default {

    stageComponents: [
        {
            icon: 'http://wap-qn.bidewu.com/00081291-a6c4-11e8-94d8-00cfe03e854e.jpg',
            component: wys_img,
            id: 'wys_img'
        },
        {
            icon: 'http://wap-qn.bidewu.com/003a814f-a6d1-11e8-8d43-00cfe03e854e.jpg',
            component: wysHasMiss,
            id: 'wysHasMiss'
        },
        {
            icon: 'http://wap-qn.toutiaofangchan.com/adideas/4901ee050c6045efbac845f5c7e03614.jpg',
            component: wys_imgAtlas,
            id: 'wys_imgAtlas'
        },
        {
            icon: 'http://wap-qn.toutiaofangchan.com/adideas/4901ee050c6045efbac845f5c7e03614.jpg',
            component: groupdrawing,
            id: 'groupdrawing'
        },
        {
            icon: 'http://wap-qn.toutiaofangchan.com/adideas/4901ee050c6045efbac845f5c7e03614.jpg',
            component: wys_tab,
            id: 'wys_tab'
        },
    ]
};
