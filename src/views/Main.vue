<style lang="less">
    @import "./main.less";
    @import "../styles/common.less";
    @import "../styles/table.less";
    @import "../styles/css.less";
</style>

<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu :shrink="shrink" @on-change="handleSubmenuChange" :theme="menuTheme"
                             :before-push="beforePush" :open-names="openedSubmenuArr" :menu-list="menuList">
                <div slot="top" class="logo-con">
                    <img v-show="!shrink" src="../images/logo.png" key="max-logo"/>
                    <img v-show="shrink" src="../images/logo_min.png" key="min-logo"/>
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text"
                            @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>

                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                    <div style="padding-bottom:10px;position:absolute;right:100px;bottom:0px">{{ salerPhone }}&nbsp;&nbsp;客服专线：010-56028711</div>
                </div>

                <div class="header-middle-con" v-if="qufencity==1">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                    <div style="padding-bottom:10px;position:absolute;right:0;bottom:0px">
                        <Dropdown transfer @on-click="updateLoginCity">
                            <a href="javascript:void(0)">
                                {{city}}
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="北京">北京</DropdownItem>
                                <DropdownItem name="上海">上海</DropdownItem>
                                <DropdownItem name="天津">天津</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>

                <div class="header-middle-con" v-if="qufencity==2">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                    <div style="padding-bottom:10px;position:absolute;right:0;bottom:0px">
                            <a href="javascript:void(0)">
                                {{city}}
                            </a>
                    </div>
                </div>

                <div class="header-avator-con">
                    <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                    <!--<lock-screen></lock-screen>-->
                    <!--<message-tip v-model="mesCount"></message-tip>-->
                    <theme-switch></theme-switch>

                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <!--<DropdownItem name="ownSpace">个人中心</DropdownItem>-->
                                    <!-- divided 去掉分割线 -->
                                    <DropdownItem name="loginout">退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>

                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <navigation :include="includeIds">
                    <router-view :key="$route.meta.keepaliveid" v-if="$route.meta.keepalive"></router-view>
                </navigation>
                <router-view v-if="!$route.meta.keepalive"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import shrinkableMenu from "./main-components/shrinkable-menu/shrinkable-menu.vue";
    import tagsPageOpened from "./main-components/tags-page-opened.vue";
    import breadcrumbNav from "./main-components/breadcrumb-nav.vue";
    import fullScreen from "./main-components/fullscreen.vue";
    import lockScreen from "./main-components/lockscreen/lockscreen.vue";
    import messageTip from "./main-components/message-tip.vue";
    import themeSwitch from "./main-components/theme-switch/theme-switch.vue";
    import configConst from '../../build/config.js';
    import navigation from "@/libs/navigation";
    import api from '../api/company/index';
    import util from "@/libs/util.js";

    import {logout} from "@/api/login/index";

    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            lockScreen,
            messageTip,
            themeSwitch,
            navigation,
            configConst,
        },
        data() {
            return {
                shrink: false,
                isFullScreen: false,
                userName: this.$store.state.app.userName,
                salerPhone: this.$store.state.app.salerPhone,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
                cityId: this.$store.state.app.cityId,
                activeName: "-",
                city: "天津",
                qufencity: 0,
            };
        },
        computed: {
            includeIds() {
                return this.$store.state.app.includeIds;
            },
            menuList() {
                return this.$store.state.app.menuList;
            },
            pageTagsList() {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath() {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath() {
                return localStorage.avatorImgPath;
            },
            menuTheme() {
                return this.$store.state.app.menuTheme;
            },
            mesCount() {
                return this.$store.state.app.messageCount;
            }
        },
        methods: {
            init() {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                this.$store.commit("updateMenulist", true);
                if (pathArr.length >= 2) {
                    this.$store.commit("addOpenSubmenu", pathArr[1].name);
                }
                // let messageCount = 3;
                // this.messageCount = messageCount.toString();
                // this.checkTag(this.$route.name);
                this.$store.commit("setMessageCount", 32);
            },
            updateLoginCity(name) {
                this.city = name;
                if (name === "北京") {
                    this.cityId = 12;
                } else if (name === "上海") {
                    this.cityId = 13;
                } else if (name === "天津") {
                    this.cityId = 14;
                }
                api.updateLoginCityChange({"cityId": this.cityId}).then(response => {
                    location.reload();
                });
            },
            toggleClick() {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown(name) {
                if (name === "ownSpace") {
                    // util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: "perCenter"
                    });
                } else if (name === "loginout") {
                    // 退出登录
                    var that = this;
                    logout()
                        .then(function () {
                            that.$store.commit("logout", that);
                            that.$store.commit("clearOpenedSubmenu");
                            that.$router.push({
                                name: "login"
                            });
                        })
                        .catch(function () {
                            that.$store.commit("logout", that);
                            that.$store.commit("clearOpenedSubmenu");
                            that.$router.push({
                                name: "login"
                            });
                        });
                }
            },
            // checkTag (name) {
            //     let openpageHasTag = this.pageTagsList.some(item => {
            //         if (item.name === name) {
            //             return true;
            //         }
            //     });
            //     if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
            //         util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
            //     }
            // },
            handleSubmenuChange(val) {
                // console.log(val)
            },
            loadCity(cityid) {
                if (cityid === 12) {
                    this.city = "北京";
                } else if (cityid === 13) {
                    this.city = "上海";
                } else if (cityid === 14) {
                    this.city = "天津";
                }
            },
            beforePush(name) {
                return true;
            },
            fullscreenChange(isFullScreen) {
                // console.log(isFullScreen);
            }
        },
        watch: {
            $route(to) {
                this.$store.commit("setCurrentPageName", to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit("addOpenSubmenu", pathArr[1].name);
                }
                // this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            }
        },
        mounted() {
            this.init();
        },
        created() {
            this.loadCity(this.cityId);
            this.qufencity = configConst.qufencity;
            // 显示打开的页面的列表
            // this.$store.commit('setOpenedList');
        }
    };
</script>
