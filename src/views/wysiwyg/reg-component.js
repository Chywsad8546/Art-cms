import wys_img from './wys-view/wys-img.vue';
import wys_wrong from './wys-view/wys-wrong';

export default {

    stageComponents: [
        {
            icon: 'http://wap-qn.bidewu.com/00081291-a6c4-11e8-94d8-00cfe03e854e.jpg',
            component: wys_img,
            id: 'wys_img'
        },
        {
            icon: 'http://wap-qn.bidewu.com/003a814f-a6d1-11e8-8d43-00cfe03e854e.jpg',
            component: wys_wrong,
            id: 'wys_wrong'
        }
    ]
};
