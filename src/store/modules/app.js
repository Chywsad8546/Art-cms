import {otherRouter, appRouter, homeRouter} from '@/router/router';
import Util from '@/libs/util';
import _ from 'lodash';
import {
    isdev
} from '../../../build/router.build.hook';

const app = {
    state: {
        userName: false,
        salerPhone: false,
        isFullScreen: false,
        cityId: 13,
        openedSubmenuArr: [], // 要展开的一级菜单数组
        menuTheme: 'dark', // 主题
        themeColor: '',
        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'home_index',
            keepaliveid: 'home_index'
        }],
        currentPageName: '',
        currentPath: [
            {
                title: '首页',
                path: '',
                name: 'home_index'
            }
        ], // 面包屑数组
        menuList: [],
        routers: [
            otherRouter,
            ...appRouter
        ],
        tagsList: [...otherRouter.children],
        messageCount: 0,
        fontPermission: [],
        includeIds: ['']
    },
    mutations: {
        setUserName (state, name) {
            state.userName = name;
        },
        setSalerPhone (state, phone) {
            state.salerPhone = phone;
        },
        setCityId (state, cityId) {
            state.cityId = cityId;
        },
        setFontPermission (state, list) {
            state.fontPermission.splice(0)
            state.fontPermission.push(...list);
        },
        setTagsList (state, list) {
            state.tagsList.push(...list);
        },
        clearMenus (state) {
            state.menuList.splice(0, state.menuList.length);
        },
        updateMenulist (state, apicheck) {
            let accessCode = state.fontPermission;
            let menuList = [];
            appRouter.forEach((item, index) => {
                let menuitem = _.clone(item);
                menuitem.children = [];
                let len = menuList.push(menuitem);
                let childrenArr = item.children.filter(child => {
                    let requireAuth = true;
                    if (child.meta && child.meta.requireAuth === false) {
                        requireAuth = false;
                    }
                    if (requireAuth && apicheck && !isdev) {
                        if (Util.showThisRoute(accessCode, child.name)) {
                            return child;
                        }
                    } else {
                        return child;
                    }
                });
                if (childrenArr === undefined || childrenArr.length === 0) {
                    menuList.splice(len - 1, 1);
                } else {
                    menuList[len - 1].children = childrenArr;
                }
            });
            state.menuList.splice(0)
            state.menuList.push(...menuList);
            // state.menuList = menuList;
        },
        changeMenuTheme (state, theme) {
            state.menuTheme = theme;
        },
        setMessageCount (state, count) {
            state.messageCount = count;
        },
        changeMainTheme (state, mainTheme) {
            state.themeColor = mainTheme;
        },
        addOpenSubmenu (state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        clearOpenedSubmenu (state) {
            state.openedSubmenuArr.length = 0;
        },
        setCurrentPath (state, pathArr) {
            state.currentPath = pathArr;
        },
        setCurrentPageName (state, name) {
            state.currentPageName = name;
        },
        setAvator (state, path) {
            localStorage.avatorImgPath = path;
        },
        // 根据keepaliveid，清除tag标签和keepalive缓存。所以只会清一个tag
        removeTag (state, keepaliveid) {
            state.pageOpenedList.map((item, index) => {
                if (item.keepaliveid === keepaliveid) {
                    state.pageOpenedList.splice(index, 1);
                    state.includeIds.splice(index, 1);
                }
            });
        },
        // 根据路由名称，清除tag标签和keepalive缓存。清除于这个路由关联的所有标签
        removeTagByName (state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.keepaliveid === name) {
                    state.pageOpenedList.splice(index, 1);
                    state.includeIds.splice(index, 1);
                }
            });
        },
        // 修改已经打开的的pageOpenedList数据
        pageOpenedList (state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            openedPage.keepaliveid = get.keepaliveid;
            state.pageOpenedList.splice(get.index, 1, openedPage);
        },
        clearAllTags (state) {
            state.pageOpenedList.splice(1);
            state.includeIds.splice(1);
        },
        clearOtherTags (state, vm) {
            let currentName = vm.$route.meta.keepaliveid;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.keepaliveid === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
                state.includeIds.splice(1);
            } else {
                state.includeIds.splice(currentIndex + 1);
                state.includeIds.splice(1, currentIndex - 1);
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
        },
        // setOpenedList (state) {
        //     state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [homeRouter];
        // },
        increateTag (state, tagObj) {
            state.includeIds.push(tagObj.keepaliveid);
            state.pageOpenedList.push(tagObj);
            // localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        logout (state, vm) {
            state.userName = false;
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        }
    }
};

export default app;
