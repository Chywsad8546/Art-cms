<template>
    <Row>
        <Col span="24">
        <div>
            <div class="roomKeyWorkContiner">
                <div class="room">内容关键词:</div>
                <div class="keyWordClass">
                    <div class="keyWordList">
                        <Input v-model="keyWord" placeholder="请输入关键字" clearable style="width: 200px"></Input>
                    </div>
                    <div v-if="keyShow" class="associationKey">
                        <ul>
                            <li v-for="item in keywordList" @click="handleAdd(item)">{{item.title}}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="list-item">
                <div class="title-img">
                    <img src="http://s1.qn.toutiaofangchan.com/5ac2f95e-e7df-11e7-bd2e-14abc5f0dc77.jpg-dongfangdi400x300"> 
                    <p class="tag">
                        <span  class="property-type">别墅</span>
                         <span style="background: rgb(190, 154, 70);">在售</span>
                    </p>
                </div>
                <div class="title-content">
                    <h2>金科天玺<span>昌平 六环</span></h2> 
                    <div class="price-set">
                        <div class="title-price">
                            <span>¥2800</span> 
                            <em data-v-340af6a5="">万</em>
                        </div>
                    </div> 
                    <div class="piece-bottom">
                        <span class="tag-style">351-397㎡</span> 
                        <span class="tag-style">2017/3/31</span>
                    </div>
                </div>
            </div>
            
                <!-- <ul>
                    <li class="item">
                        <div class="item flex-vertical" style="width: 4.2rem;">
                            <div class="pic-box">
                                <img src="http://image.5i5j.com/picture/house/4045/40459049/shinei/jaakklip772af5c0.jpg" alt="" class="pic">
                                <div class="tag-top-box">
                                    <div class="tag-top low-price">捡漏</div>
                                    <div class="tag-top cut-price">降价</div>
                                    </div>
                                    <div class="delete-mask none">
                                        <div class="delete-btn">删除</div>
                                    </div>
                                </div> 
                                <div class="info-box">
                                    <p class="title">望京西园一区</p> 
                                    <p class="pirce-area"><span class="price"><strong>405</strong> <em>万</em></span> 
                                    <span><strong>59.28㎡</strong></span> 
                                    <span>1室</span></p> 
                                    <div class="detail-tag-wrapper">
                                        <span class="tag low-price">总价低于商圈同户型65.27万</span>
                                        <span class="tag cut-price">降45万</span>
                                    </div>
                                </div>
                        </div>
                    </li>
                </ul> -->
            </div>
        </Col>
    </Row>
</template>
<stage-template>
丰富的是否
    {{@ share.adCompany}}

</stage-template>
<script>
    export default {
        name: 'xinfang-top5-editor',
        data() {
            return {
                share: {
                    adCompany: ''
                },
                keyWord: "",
                keywordList: [
                    {id:1,title:"房源1"},
                    {id:2,title:"房源2"},
                ],
                keyShow:false,
                formItem: {
                    adName: ''
                },
                ruleValidate: {
                    'share.adCompany': [
                        {required: true, message: '请填写', trigger: 'blur'}
                    ],
                    'formItem.adName': [
                        {required: true, message: '请填写', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            save() {
                this.$refs['form'].validate((commvalid) => {
                    console.log('commvalid',commvalid);
                });
            },
            handleAdd (item) {//处理标签
                console.log(item);
                this.keyShow = false;
            },
        },
       watch:{
            keyWord(curVal,oldVal){
                if(curVal.length==0){
                    this.keyShow = false;
                }else{
                    this.keyShow = true;             
                    // api.tagsList({"type":7,"title":curVal}).then(response => {
                    //     this.keywordList = response.data.data;
                    //     if(this.keywordList.length > 0){
                    //         this.keyShow = true;
                    //     }
                    // });
                }
            }
        }
    };
</script>

<style scoped>
    .list-item .title-content h2 {
        line-height: 1.43;
        font-weight: 700;
        overflow: hidden;
        font-size: 45px;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .list-item .title-content {
        position: absolute;
        left: 0;
        width: 100%;
        height: 2.2rem;
        padding-left: 3.46667rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .list-item .title-img {
        position: relative;
        float: left;
        width: 2.93333rem;
        height: 2.2rem;
        overflow: hidden;
    }
    .list-item .title-img .tag {
        position: absolute;
        bottom: 0;
    }
    .list-item .title-img .tag span.property-type {
        background-color: #924548;
    }
    .roomKeyWorkContiner {
        width: 100%;
    }
    .room {
        width: 120px;
        overflow: hidden;
        float: left;
        line-height: 30px;
        text-align: right;
        padding-right: 10px;
    }
    .keyWordClass {
        width: 100%;
        padding-left: 123px;
        position: relative;
    }
    .keyWordList {
        width: 80%;
        overflow: hidden;
    }
    .associationKey {
        position: absolute;
        top:33px;
        background: #FFFFFF;
        width: 200px;
        z-index: 10;
        height: 150px;
        min-height: 150px;
        overflow: auto;       
    }
    .associationKey li {
        padding-left: 10px;
    }
    .associationKey li:active {
        background: #cccccc;
    }
    .associationKey li:hover{background: #000000;color: #FFFFFF}
</style>