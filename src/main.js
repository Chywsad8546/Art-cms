import "babel-polyfill";
import Vue from 'vue';
import iView from 'iview';
import { router } from './router/index';
import { appRouter } from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import agentplugin from '@/libs/agentplugin';
import apibase from '@/api/api.base';
import domain from '../build/configdir/domain/domain';
import valid from '@/libs/valid.js';
import VueDND from 'awe-dnd'
import '@/styles/fonts/iconfont.js'

Vue.use(VueI18n);
Vue.use(iView);
Vue.use(agentplugin);
apibase.interceptors(store);

Vue.use(VueDND)
Vue.prototype.$domain = domain;
Vue.prototype.$valid = valid;
Vue.prototype.$imgurl = function (url, rule) {
    if (url === null || url === '' || url === undefined) {
        return 'http://wap-qn.toutiaofangchan.com/tpzw_image.png';
    }
    if (/^http(s)?:.*/.test(url)) {
        return url;
    }
    return domain.imgDomain + url + (rule ? ('-' + rule) : '');
};
Vue.prototype.$imgerr = function (e) {
    e.target.onerror = null;
    e.target.src = 'http://wap-qn.toutiaofangchan.com/tpzw_image.png';
};

Vue.prototype.$Message.config({
    duration: 3
});
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        // this.$store.commit('setOpenedList');
        // this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
    },
    created() {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
