<style lang="less">
@import '../../../main.less';
@import '../../../../styles/common.less';
@import '../../../../styles/table.less';
@import '../../../../styles/css.less';
@import '../../../../../node_modules/dragula/dist/dragula.css';
img {
  max-width: 100%;
  height: auto;
  border: none;
  interpolation-mode: bicubic;
  vertical-align: middle;
}
.wysi_active {
  border: 1px solid #71a5f5;
}
.wysi_hrive {
  border: 1px solid #71a5f5;
}
.gu-mirror {
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  opacity: 1;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
  filter: alpha(opacity=100);
}
.gu-hide {
  display: none !important;
}
.gu-unselectable {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}
.gu-transit {
  opacity: 1;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
  filter: alpha(opacity=100);
}
.wys-main {
  width: 1920px;
  height: 100%;
  background: #ffffff;
}
.wys-menu-left {
  width: 260px;
  overflow: hidden;
  float: left;
  background: #ffffff;
  box-sizing: border-box;
  height: 95%;
}
.wys-content {
  float: left;
  box-sizing: border-box;
  min-width: 400px;
  position: relative;
  max-height: 100%;
  height: 100%;
}
.wys-isscrll {
  padding: 0px 360px 0 360px;
  overflow: auto;
  background: #f2f3f4;
  max-height: 100%;
  height: 100%;
}
.wys-contentOver {
  width: 375px;
  height: 100%;
  text-align: center;
  background: #ffffff;
  overflow: hidden;
}
/*滚动条样式*/
.wys-isscrll::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.wys-isscrll::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #cacbcb;
}
.wys-isscrll::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: #edeeef;
}
.wys_title {
  position: absolute;
  top: -40px;
  left: 0;
  width: 160px;
  text-align: center;
  line-height: 40px;
  border-radius: 10px 10px 0 0;
  height: 40px;
  background: #f2f3f4;
  z-index: 10;
}
.workarea-main {
  border-left: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  position: relative;
  height: 100%;
  background-color: #f2f3f4;
  margin: 0 0 0 260px;
  padding-bottom: 1px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  min-width: 620px;
}
.workarea-stage {
  position: relative;
  top: 10px;
  height: 100%;
  overflow: hidden;
}
.phone-box {
  position: relative;
  width: 100%;
  height: 100%;
  padding-left: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.phone-wrapper {
  position: relative;
  overflow: visible;
  box-sizing: content-box;
  width: 340px;
  margin: 0 auto 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.phone-wrapper .signal-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 320px;
  height: 43px;
  z-index: 10;
  background: #222;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.wys-edit-right {
  position: absolute;
  background-color: #fff;
  box-shadow: 3px 3px 5px hsla(0, 4%, 69%, 0.1);
  display: none;
  box-sizing: border-box;
  bottom: 0;
}
#right {
  display: block;
  width: 320px;
  padding-left: 20px;
  box-sizing: border-box;
  top: 0;
  right: 0;
}
#main {
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 2px;
}
.layout.edit {
  margin: 0 auto;
  min-height: calc(100% - 66px);
  min-width: 1200px;
  box-sizing: border-box;
  height: auto;
}
.phone-wrapper .screen-border {
  position: relative;
  top: 43px;
  width: 375px;
  height: 625px;
  background-color: #fff;
}
.phone-wrapper .workarea {
  overflow-x: hidden;
  overflow-y: overlay;
  box-sizing: border-box;
  width: 330px;
  height: 524px;
  background: transparent;
}
.phone-wrapper .workarea::-webkit-scrollbar {
  display: none;
}
.operate-bar-wrap {
  float: right;
  position: relative;
}
.operate-bar {
  padding: 8px 25px 13px;
  height: 32px;
  box-sizing: content-box;
}
.operate-bar .btn {
  font-size: 14px;
  color: #222;
  padding: 0 8px 0 0;
  position: relative;
  display: -ms-inline-flexbox;
  display: inline-flex;
  cursor: pointer;
  -ms-flex-align: center;
  align-items: center;
  line-height: 20px;
  color: #444;
}
.btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  max-height: 38px;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 9px 16px;
  font-size: 14px;
  line-height: 1.42857143;
  border-radius: 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.wysiwyg_rightScroll {
  box-sizing: border-box;
  height: 85%;
  overflow-y: overlay;
  overflow-x: hidden;
}
.wysiwyg-leftIcon {
  width: 64px;
  height: 90px;
  float: left;
  margin-left: 15px;
  text-align: center;
}
.wysiwyg-contitle {
  font-size: 16px;
  padding-left: 20px;
  margin: 10px 0 10px 0;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.wysiw_form_Tab {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #2d8cf0;
  font-size: 16px;
}
</style>

<template>
    <div style="height:100%">
        <div class="wys-header">
            <div class="wys-header-left"><img src="http://wap-qn.toutiaofangchan.com/adideas/4fa0cb767c5a42e7af2aa85003704eb1.jpg" />
            </div>
            <div class="wys-header-content"></div>
        </div>
        <div id="main" class="layout edit">
            <div class="wys-menu-left">
                <div id="wysiwyg_componentbox">
                    <div class="wysiw_form_Tab">
                        表单
                    </div>
                </div>
            </div>
            <section id="middle" class="workarea-main">
                <div class="workarea-stage">
                    <div class="phone-box">

                        <Card>
                            <p slot="title">
                                表单列表
                            </p>
                            <a href="#" slot="extra" @click.prevent="newlyForm">
                                <Icon type="plus-circled"></Icon>
                                新建表单
                            </a>
                        </Card>
                        <Table border :columns="columns7" :data="formList"></Table>
                        <Page :total="total" show-sizer @on-change="pageChange" style="margin-top:20px;"></Page>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<style>
.form-preview .device {
  width: 240px;
  height: 440px;
  background-image: url(http://wap-qn.toutiaofangchan.com/adideas/fbb1e06f20cf4c6388ac409de1fe8adf.png);
  background-size: cover;
  margin: 10px;
}
.form-preview .screen {
  width: 320px;
  height: 445px;
  padding-top: 20px;
  margin: 0;
  transform: translate(-40px, -8px) scale(0.7);
  background-color: #fff;
  overflow: auto;
}
.form-preview .screen .input-group-i {
  padding: 5px 18px;
  position: relative;
  border-collapse: separate;
}
.form-control {
  display: block;
  width: 100%;
  height: 35px;
  padding: 9px 16px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #222;
  background-color: #fff;
  background-image: none;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  -webkit-transition: border-color ease-in-out 0.15s,
    box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.form-preview .screen .form-preview-radio .radio-item {
  margin-right: 10px;
}
</style>

<script>
import api from '../../../../api/wysiwyg/main.js';
export default {
    data () {
        return {
            columns7: [
                {
                    title: '表单ID',
                    key: '_id'
                },
                {
                    title: '表单名',
                    key: 'title'
                },
                {
                    title: '表单创建时间',
                    key: 'create_time'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index);
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            formList: [],
            total: 0,
            searchData: {}
        };
    },
    methods: {
        pageChange (page) {
            this.searchData.pageNum = page;
            this.init();
        },
        getDiyFormStructure () {
            api.getDiyFormStructure(this.searchData).then(response => {
                this.formList = response.data.data;
                this.total = response.data.count;
            });
        },
        newlyForm () {
            this.$router.push({
                name: 'newlybuildForm'
                // query: { newsId: params.row.id }
            });
        },
        init () {
            this.getDiyFormStructure();
        }
    },
    mounted () {

    },
    created () {
        this.init();
    }
};
</script>
