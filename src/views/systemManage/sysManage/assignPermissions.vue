<template>
  <Card>
      <p slot="title">{{roleName}} — {{roleKey}}</p>
    <Tabs type="card">
        <TabPane label="菜单权限">
            <Tree ref="authorityTree" :data="data4" show-checkbox multiple></Tree>
            <Button style="margin-left: 40%" size="large" @click="saveAuthorityData" type="primary">保存</Button>
        </TabPane>
        <TabPane label="接口权限">
            <Tree ref="interfaceAuthorityTree" :data="dataKong" show-checkbox multiple></Tree>
            <Button style="margin-left: 40%" size="large" @click="saveInterfaceAuthorityData" type="primary">保存</Button>
        </TabPane>
        <TabPane label="数据权限">
            <Tree ref="dataAuthorityTree" :data="data" @on-check-change="disableBrothers" show-checkbox ></Tree>
            <Button style="margin-left: 40%" size="large" @click="saveDataAuthorityTree" type="primary">保存</Button>
        </TabPane>
    </Tabs>
  </Card>
</template>
<script>
    //企业
    // import {otherRouter as corpOther, appRouter as corpAppRouter} from '@/router/split/corp.router';
    //经纪人
    // import {otherRouter as jingjirenOther, appRouter as jingjirenAppRouter} from '@/router/split/jingjiren.router';
    //城市
    import {otherRouter as cityOther, appRouter as cityAppRouter} from '@/router/split/city.router';

    import api from '../../../api/system/index.js';
    import Util from '@/libs/util';
    // 判断children子集里面是否在接口返回数组中有对应数据
    import _ from 'lodash/array';
    let lastNodes = [];
    export default {
        data () {
            return {
                data4: [
                ],
                roleKey: '',
                roleName:'',
                dataKong: [],
                data: []
            };
        },
        methods: {
            init () {
                this.roleKey = this.$route.query['roleKey'];
                this.roleName = this.$route.query['roleName'];
                if (typeof this.roleKey !== 'undefined') {
                    // 接口返回数组
                    // api.getAuthorityInfoByCode({roleCode: this.roleKey, authType: '1'}).then(response => {
                    //     console.log(response.data.data);
                    //     this.getInterfaceAuthorityData(response.data.data);
                    // });

                    // 数据权限返回数组
                    // api.getAuthorityInfoByCode({roleCode: this.roleKey, authType: '2'}).then(response => {
                    //     this.getDataAuthorityTree(response.data.data.data);
                    // });

                    api.getAuthorityInfoByCode({roleCode: this.roleKey, authType: '0'}).then(response => {
                        this.getAuthorityTreeData(response.data.data);
                    });
                }
                // console.log(this.roleKey)
            },

            // router权限保存
            saveAuthorityData () {
                var authorityTreeData = this.$refs.authorityTree.getCheckedNodes();
                console.log(authorityTreeData)

                var saveAuthrityData = {
                    roleCode: this.roleKey,
                    authType: 0,
                    authCodeInfo: []
                };
                for (var i = 0; i < authorityTreeData.length; i++) {
                    var authCodeInfoItem = {};
                    if (typeof authorityTreeData[i].name !== 'undefined' && authorityTreeData[i].submitData !=='undefined') {
                        if( authorityTreeData[i].submitData ==='y'){
                            authCodeInfoItem[authorityTreeData[i].name] = authorityTreeData[i].titleName;
                            saveAuthrityData.authCodeInfo.push(authCodeInfoItem);
                        }
                    }
                }
                api.saveMenuRoleAuth(saveAuthrityData).then(response => {
                    this.$Message.success('保存成功!');
                });
            },

            // 接口权限保存
            saveInterfaceAuthorityData () {
                var interAuthorityTreeData = this.$refs.interfaceAuthorityTree.getCheckedNodes();
                var saveAuthrityData = {
                    roleKey: this.roleKey,
                    authType: 1,
                    authCodeInfo: []
                };
                for (var i = 0; i < interAuthorityTreeData.length; i++) {
                    var authCodeInfoItem = {};
                    if (typeof interAuthorityTreeData[i].name !== 'undefined') {
                        authCodeInfoItem[interAuthorityTreeData[i].name] = interAuthorityTreeData[i].title;
                        saveAuthrityData.authCodeInfo.push(authCodeInfoItem);
                    }
                }
                api.saveMenuRoleAuth(saveAuthrityData).then(response => {
                    this.$Message.success('保存成功!');
                });
            },

            // 数据权限保存
            saveDataAuthorityTree () {
                var authorityTreeData1 = this.$refs.dataAuthorityTree.getCheckedNodes();

                var saveAuthrityData = {
                    roleKey: this.roleKey,
                    authType: 2,
                    authCodeInfo: []
                };
                if (authorityTreeData1.length > 0) {
                    for (let i = 0; i < authorityTreeData1.length; i++) {
                        if(authorityTreeData1[i].parentName) {
                            var authCodeInfoItem = {};
                            authCodeInfoItem[authorityTreeData1[i].parentName] = authorityTreeData1[i].name;
                            saveAuthrityData.authCodeInfo.push(authCodeInfoItem);
                        }
                    }
                }
                api.saveMenuRoleAuth(saveAuthrityData).then(response => {
                    this.$Message.success('保存成功!');
                });
            },

            // 获取router权限tree
            getAuthorityTreeData (existdata) {
                let codesJingjiren = [];
                let codesQiye=[];
                let codesCity=[];
                for (let i = 0; i < existdata.length; i++) {
                        codesCity.push(existdata[i].authCode);
                }

                var data2 = [{
                    title: '功能权限',
                    expand: true,
                    disabled: true,
                    children: [
                        // {
                        //     title: '经纪人',
                        //     disabled: true,
                        //                                 expand: true,
                        //     //                            disabled: true,
                        //     children: [
                        //         {
                        //             title:'无菜单',
                        //             children:[]
                        //         },
                        //         {
                        //             title:'菜单',
                        //             children:[]
                        //         }
                        //     ]
                        // },
                        // {
                        //     title: '企业',
                        //     disabled: true,
                        //                                 expand: true,
                        //     //                            disabled: true,
                        //     children: [
                        //         {
                        //             title:'无菜单',
                        //             children:[]
                        //         },
                        //         {
                        //             title:'菜单',
                        //             children:[]
                        //         }
                        //     ]
                        // },
                        {
                            title: '城市',
                            disabled: true,
                            expand: true,
                            //                            disabled: true,
                            children: [
                                {
                                    title:'无菜单',
                                    children:[]
                                },
                                {
                                    title:'菜单',
                                    children:[]
                                }
                            ]
                        }
                    ]
                }];

                //经纪人
                // other路由数据
                // var oRLength = jingjirenOther.children.length;
                // for (var i = 0; i < oRLength; i++) {
                //     let level_1 = {title: '⇢ ' + jingjirenOther.children[i].title,rule:1,children:[], name: jingjirenOther.children[i].name};
                //     let level_1i = jingjirenOther.children[i];
                //     let level_moren ={title: '♜ 打开菜单', rule:1, submitData:'y', name: jingjirenOther.children[i].name, checked: Util.oneOf( jingjirenOther.children[i].name, codesJingjiren)};
                //     level_1.children.push(level_moren);
                //     if (typeof level_1i.permissions !== 'undefined' && level_1i.permissions.length > 0){
                //         let level_2 = level_1i.permissions;
                //         for (let l2 = 0; l2<level_2.length;l2++){
                //            let level_2Item ={title: '♜ ' + level_2[l2].title, submitData:'y', rule:1, name: level_2[l2].name, checked: Util.oneOf( level_2[l2].name, codesJingjiren)};
                //             level_1.children.push(level_2Item);
                //         }
                //     }
                //     data2[0].children[0].children[0].children.push(level_1);
                // }

                // // app路由数据
                // for (let j = 0; j < jingjirenAppRouter.length; j++) {
                //     let level_1 = {title: '☰ ' + jingjirenAppRouter[j].title, children: [],rule:1, name: jingjirenAppRouter[j].name, checked: Util.oneOf(jingjirenAppRouter.name, codesJingjiren)};

                //     if (typeof jingjirenAppRouter[j].children !== 'undefined' && jingjirenAppRouter[j].children.length > 0) {
                //         let level_2arr = jingjirenAppRouter[j].children;

                //         for (let child = 0; child < level_2arr.length; child++) {

                //             let level_2 = {children:[],title: '☰ '+level_2arr[child].title, rule:1, name: level_2arr[child].name}
                //             let level_3arr = [{title: ' 显示菜单', submitData:'y', rule:1, name: level_2.name, checked: Util.oneOf(level_2.name, codesJingjiren)}]
                //             if(typeof level_2arr[child].permissions !== 'undefined' && level_2arr[child].permissions.length > 0){
                //                 level_3arr = [...level_3arr,...level_2arr[child].permissions]

                //             }
                //             for(let thirdI = 0;thirdI<level_3arr.length;thirdI++){
                //                 let level_3 = level_3arr[thirdI];
                //                 level_2.children.push({title: '♜'+ level_3.title, submitData:'y', rule:1, name: level_3.name, checked: Util.oneOf(level_3.name, codesJingjiren)});
                //             }
                //             level_1.children.push(level_2);
                //         }
                //     }
                //     data2[0].children[0].children[1].children.push(level_1);
                // }

                // //企业
                // // other路由数据
                // var oRLength = corpOther.children.length;
                // for (var i = 0; i < oRLength; i++) {
                //     let level_1 = {title: '⇢ ' + corpOther.children[i].title,rule:2,children:[], name: corpOther.children[i].name};

                //     let level_1i = corpOther.children[i];
                //     let level_moren ={title: '♜ 打开菜单', rule:2,submitData:'y', name: corpOther.children[i].name, checked: Util.oneOf( corpOther.children[i].name, codesJingjiren)};
                //     level_1.children.push(level_moren);
                //     if (typeof level_1i.permissions !== 'undefined' && level_1i.permissions.length > 0){
                //         let level_2 = level_1i.permissions;
                //         for (let l2 = 0; l2<level_2.length;l2++){
                //             let level_2Item ={title: '♜ ' + level_2[l2].title,submitData:'y', rule:2, name: level_2[l2].name, checked: Util.oneOf( level_2[l2].name, codesJingjiren)};
                //             level_1.children.push(level_2Item);
                //         }
                //     }

                //     data2[0].children[1].children[0].children.push(level_1);
                // }

                // // app路由数据
                // for (var j = 0; j < corpAppRouter.length; j++) {
                //     let level_1 = {title: '☰ ' + corpAppRouter[j].title, children: [],rule:2, name: corpAppRouter[j].name, checked: Util.oneOf(corpAppRouter.name, codesQiye)};

                //     if (typeof corpAppRouter[j].children !== 'undefined' && corpAppRouter[j].children.length > 0) {
                //         let level_2arr = corpAppRouter[j].children;

                //         for (let child = 0; child < level_2arr.length; child++) {

                //             let level_2 = {children:[],title: '☰ '+level_2arr[child].title, rule:2, name: level_2arr[child].name}
                //             let level_3arr = [{title: ' 显示菜单',submitData:'y', rule:2, name: level_2.name, checked: Util.oneOf(level_2.name, codesQiye)}]
                //             if(typeof level_2arr[child].permissions !== 'undefined' && level_2arr[child].permissions.length > 0){
                //                 level_3arr = [...level_3arr,...level_2arr[child].permissions]

                //             }
                //             for(let thirdI = 0;thirdI<level_3arr.length;thirdI++){
                //                 let level_3 = level_3arr[thirdI];
                //                 level_2.children.push({title: '♜'+ level_3.title, rule:2,submitData:'y', name: level_3.name, checked: Util.oneOf(level_3.name, codesQiye)});
                //             }
                //             level_1.children.push(level_2);
                //         }
                //     }

                //     data2[0].children[1].children[1].children.push(level_1);
                // }

                //城市
                // other路由数据
                var oRLength = cityOther.children.length;
                for (var i = 0; i < oRLength; i++) {
                    let level_1 = {title: '⇢ ' + cityOther.children[i].title,rule:3,children:[], name: cityOther.children[i].name};

                    let level_1i = cityOther.children[i];
                    let level_moren ={title: '♜ 打开菜单', rule:3,submitData:'y', name: cityOther.children[i].name, checked: Util.oneOf( cityOther.children[i].name, codesCity)};
                    level_1.children.push(level_moren);
                    if (typeof level_1i.permissions !== 'undefined' && level_1i.permissions.length > 0){
                        let level_2 = level_1i.permissions;
                        for (let l2 = 0; l2<level_2.length;l2++){
                            let level_2Item ={title: '♜ ' + level_2[l2].title,submitData:'y', rule:3, name: level_2[l2].name, checked: Util.oneOf( level_2[l2].name, codesCity)};
                            level_1.children.push(level_2Item);
                        }
                    }

                    data2[0].children[0].children[0].children.push(level_1);
                }

                // app路由数据
                for (var j = 0; j < cityAppRouter.length; j++) {
                    let level_1 = {title: '☰ ' + cityAppRouter[j].title, children: [],rule:3, name: cityAppRouter[j].name, checked: Util.oneOf(cityAppRouter.name, codesCity)};

                    if (typeof cityAppRouter[j].children !== 'undefined' && cityAppRouter[j].children.length > 0) {
                        let level_2arr = cityAppRouter[j].children;

                        for (let child = 0; child < level_2arr.length; child++) {
                            let level_2 = {children:[],title: '☰ '+level_2arr[child].title, rule:3, name: level_2arr[child].name}
                            let level_3arr = [{title: ' 显示菜单',submitData:'y', rule:3, name: level_2.name, checked: Util.oneOf(level_2.name, codesCity),titleName:level_2arr[child].title}]
                            if(typeof level_2arr[child].permissions !== 'undefined' && level_2arr[child].permissions.length > 0){
                                level_3arr = [...level_3arr,...level_2arr[child].permissions]

                            }
                            for(let thirdI = 0;thirdI<level_3arr.length;thirdI++){
                                let level_3 = level_3arr[thirdI];
                                if (!level_3.titleName){
                                    level_3.titleName = level_3.title;
                                }
                                level_2.children.push({title: '♜'+level_3.title,submitData:'y', rule:3, name: level_3.name, checked: Util.oneOf(level_3.name, codesCity),titleName:level_3.titleName});
                            }
                            level_1.children.push(level_2);
                        }
                    }
                    data2[0].children[0].children[1].children.push(level_1);
                }
                this.data4 = data2;
            },

            // 获取接口权限tree
            getInterfaceAuthorityData (existdata) {
                let codes = [];
                for (let i = 0; i < existdata.length; i++) {
                    codes.push(existdata[i].authCode);
                }

                var dataItem = [{
                    title: '接口权限',
                    expand: true,
                    disabled: true,
                    children: []
                }];
                api.getInterfaceAuthority().then(response => {
                    // 获取接口返回数据和数据数组长度
                    var intData = response.data.data.data;

                    var intDataLength = intData.length;
                    // 循环遍历第一层声明第一层  声明title
                    for (var i = 0; i < intDataLength; i++) {
                        // 声明tree结构变量
                        var dataItemC = {title: intData[i].catogory, children: []};

                        // 获取返回数据第二层数据和数据长度
                        var intDataItem = intData[i].children;
                        var intDataItemLength = intData[i].children.length;

                        // 循环遍历第二层 声明title和name
                        for (var j = 0; j < intDataItemLength; j++) {
                            // 第二层tree结构变量声明

                            var itemCC = {title: intDataItem[j].description, name: intDataItem[j].codes, checked: Util.oneOf(intDataItem[j].codes.toString(), codes)};
                            // 放入第一层tree结构中children的变量中
                            dataItemC.children.push(itemCC);
                        }

                        // 放入第一层声明tree结构变量里
                        dataItem[0].children.push(dataItemC);
                    }
                });
                this.dataKong = dataItem;

            },
            //数据打勾：判断俩结果为true
           checkIsTrue(father,child,codesKey,codes){
                if(Util.oneOf(father,codesKey)){
                    for (let i=0;i<codes.length;i++){
                           if(child ==codes[i][father] ){
                              // console.log(codes[i][father])
                               return true;
                           }
                    }
                    return false
                }else {
                    return false;
                }

            },
            // 获取数据权限tree
            getDataAuthorityTree (existdata) {
                //console.log(existdata)
                let codesKey =[];
                let codes = [];
                for(let i=0;i<existdata.length;i++){
                    codesKey.push(existdata[i].authCode);
                }
                for(let i=0;i<existdata.length;i++){
                    let item={};
                    item[existdata[i].authCode]=existdata[i].authRules;
                    codes.push(item);
                }
                var dataItem = [{
                    title: '数据权限',
                    expand: true,
                    disabled: true,
                    children: [
                    ]
                }];
                api.getDataAuthority().then(response => {
                    // 获取接口返回数据和数据数组长度
                    var intData = response.data.data.data;

                    var intDataLength = intData.length;
                    // 循环遍历第一层声明第一层  声明title
                    for (var i = 0; i < intDataLength; i++) {
                        // 声明tree结构变量
                        var dataItemC = {
                            title: intData[i].description,
                            name:intData[i].beanName,
                            children:[],
                            disableCheckbox:true,
                            //checked: Util.oneOf(intData[i].beanName.toString(),codes)
                        };

                        // 获取返回数据第二层数据和数据长度
                        var intDataItem = intData[i].children;
                        var intDataItemLength = intData[i].children.length;

                        // 循环遍历第二层 声明title和name
                        for (let j = 0; j < intDataItemLength; j++) {
                            // 第二层tree结构变量声明
                            var itemCC = {
                                title: intDataItem[j].description,
                                name: intDataItem[j].method,
                                parentName:intData[i].beanName,
//                                disableCheckbox:false,
//                                brothers:intData[i].children,
                                checked: this.checkIsTrue(intData[i].beanName,intDataItem[j].method,codesKey,codes)
                                   // Util.oneOf(intDataItem[j].method.toString(),codesKey)
                            };
                            // 放入第一层tree结构中children的变量中
                            dataItemC.children.push(itemCC);
                        }
                        for (let j = 0; j < dataItemC.children.length; j++) {
                            dataItemC.children[j].brothers = dataItemC.children;
                        }
                        // 放入第一层声明tree结构变量里
                        dataItem[0].children.push(dataItemC);
                    }
                    lastNodes = this.$refs.dataAuthorityTree.getCheckedNodes();
                });
                this.data = dataItem;
            },
            disableBrothers (nodes) {
                let chayi = _.differenceWith(nodes, lastNodes, function (old, ne) {
                    return (old.parentName + '' + old.name) === (ne.parentName + '' + ne.name);
                });
                if (chayi.length > 0) {
                    for (let i = 0; i < chayi.length; i++) {
                        let single = chayi[i];
                        if(single.parentName !== undefined) {
                            for (let j = 0; j < single.brothers.length; j++) {
                                if (single.brothers[j].name === single.name) {
                                    continue;
                                }
                                // console.log('set')
                                single.brothers[j].checked = false;
                            }
                        }
                    }
                }

                lastNodes = this.$refs.dataAuthorityTree.getCheckedNodes();
            }
        },
        created () {
            this.init();
        }
    };
</script>
