<template>
    <Row>
        <Col span="24">
        <div>           
            <Form ref="seniorForm" :model="share" :rules="ruleValidate" :label-width="100">
                <FormItem label="楼盘名称" prop="modeProName">
                    <Select v-model="share.modeProName"  filterable @on-change="handleAdd" @on-query-change="seachChange">
                        <Option v-for="item in keywordList" :value="item.newcode" :key="item.newcode">{{ item.projName }}</Option>
                    </Select>
                </FormItem>
            </Form>
        </div>
        </Col>

        <!-- <div style="width:375px; overflow: hidden;padding-left: 10px; padding-right: 10px;" class="recommendNouse">
            <div>{{@ share.projName}}</div>
            <div style="width: 375px; text-align: center; overflow: hidden; font-size:12px; height: 30px;line-height: 30px;" class="tab">
                <span style="padding-right:30px;display: block; float:left; width: 50%;">面积 {{@ share.purposearea}}</span>
                <span style="padding-right:30px;display: block; float:left; width: 50%;">户型 {{@ share.roomSet[0]}}层{{@ share.roomSet[1]}}居</span>
            </div>
            <div style="position: relative;overflow: hidden; margin-top:30px; width: 100%;">
                <div style="position: absolute;bottom:10px;left:10px; color:#FFFFFF; ">{{@share.averagePrice}}元/㎡</div>
                <img style="width: 375px;" src="{{@share.titleImagePath}}"/>
            </div>
            <div  style="text-align:left">{{@share.districtName}}</div>
            <div  style="text-align:left">最近交房 {{@share.livindate}}</div>
        </div>  -->


    </Row>
</template>
<style>
.tab {
    width: 100%;
    height: 30px;
    line-height: 30px;
    position: relative;
    position: absolute
}
.recommendNouse {
    overflow: hidden;
    display: inline-block;
    width: 30%;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
}
</style>

<stage-template>
<div  style="width:375px; position: relative; ">
        <img style="width:375px; height:556px;position: absolute;top:0px; " src="http://wap-qn.toutiaofangchan.com/adideas/a81fc0ff3c0047d59bf9bb9c228a1555.jpg"/>
        <div style="width:375px; overflow: hidden;padding-left: 10px; padding-top:50px; padding-right: 10px;" class="recommendNouse">
            <div style="position: relative;overflow: hidden; margin-top:30px; width: 100%;">
                
                <img style="width: 375px;" src="{{@share.titleImagePath}}"/>
            </div>
            <div style="width: 375px; text-align: center; overflow: hidden; font-size:12px; height: 30px;line-height: 30px;" class="tab">
                <span style="padding-right:30px;display: block; float:left; width: 50%; "><h1 style="font-size:14px;">{{@ share.projName}}</h1></span>
                <span style="padding-right:30px;display: block; float:left; width: 50%; color:red;">{{@share.averagePrice}}元/㎡</span>
            </div>
        </div>
</div>
</div>
</stage-template>
<script>
    import api from '@/api/advertisement/advertiseEditor/adSeniorEditor';
    import ad from '@/api/advertisement/ad';
    export default {
        name: 'xinfang-top5-editor',
        data() {
            return {
                shareIncludes:['newcode'],
                share: {
                    projName: '',  //楼盘名称
                    totalPrice: '',  //小区总价
                    purposearea: '', //建筑面积
                    rightYear: '',  //年限	
                    districtName: '',//区域名称
                    titleImagePath: '', //标题图
                    newcode: '',
                    modeProName:'',
                    roomSet:'',
                    averagePrice:''
                },
                keyWord: "",
                formisShow: false,
                model11: '',
                keywordList: [
                ],
                getProjInfosDetail: {},
                keyShow:false,
                formItem: {
                    adName: ''
                },
                ruleValidate: {
                    'modeProName': [
                        { required: true, message: '请填写', trigger: 'change'}
                    ]
                }
            };
        },
        methods: {
            seachChange(query){
                    api.getProjInfos(
                        {
                            nOrE:1,
                            projName:query
                        }
                    ).then(response => {
                        this.keywordList = response.data.data.data;
                        this.keywordList.forEach(item => {
                            item.newcode = item.newcode+'';
                        })
                    })
            },
            save(success,fail) {
                this.$refs['seniorForm'].validate((commvalid) => {
                    if (commvalid) {
                        success();
                    }else{
                        fail();
                    }
                });
            },
            handleAdd (id) {//处理标签
                api.getProjDetail({
                    newcode:id
                }).then(response => {
                    console.log(this.share.modeProName);
                    this.share.projName = response.data.data.projName;
                    this.share.totalPrice = response.data.data.totalPrice;
                    this.share.purposearea = response.data.data.minArea+"-"+response.data.data.maxArea+'㎡';
                    this.share.rightYear = response.data.data.livindate;
                    this.share.address = response.data.data.address;
                    this.share.titleImagePath = response.data.data.titleImagePath;
                    this.share.newcode = response.data.data.newcode;
                    this.share.livindate = response.data.data.livindate;
                    this.share.averagePrice = response.data.data.averagePrice;
                    this.share.roomSet = "";
                    if(response.data.data.roomSet){
                        response.data.data.roomSet.forEach(item => {
                            this.share.roomSet += item+"居"; 
                        });
                    }
                    this.share.modeProName = response.data.data.newcode + '';
                    this.keywordList = [{"newcode":response.data.data.newcode + '',"projName":response.data.data.projName}];
                    this.formisShow = true;
                })
            }
        },
        created() {
                if(this.$route.query.id){
                    ad.getIdea(
                        this.$route.query.id
                    ).then(response => {
                        this.handleAdd(JSON.parse(response.data.data.adData).newcode);
                    })
                }
        }
    };
</script>

<style scoped>
    .list-item .title-content h2 span {
        margin-left: 20px;
        color: #666;
        font-size: 12px;
    }
    .list-item .title-content .piece-bottom .tag-style {
        display: inline-block;
        padding: 5px 5px;
        max-width: 200px;
        margin-left: 10px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 10px;
        overflow: hidden;
        font-size: 12px;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .list-item .title-content .piece-bottom .tag-style {
        display: inline-block;
        padding: 10px 20px;
        max-width: 200px;
        margin-left: 10px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 10px;
        overflow: hidden;
        font-size: 12px;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .list-item .title-content .piece-bottom {
        position: absolute;
        left: 0;
        bottom: -20px;
        color: #666;
        width: 100%;
        padding-bottom: 10px;
        padding-left: 80px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
    }
    .list-item .title-content .price-set .title-price em {
        margin-left: 0.06667rem;
        font-size: 12px;
        display: inline-block;
        vertical-align: top;
    }
    .list-item .title-content .price-set .title-price span {
        font-weight: 700;
        line-height: 0.6;
        font-size: 16px;
    }
    .list-item .title-content .price-set .title-price {
        display: inline-block;
        color: #ff4848;
    }
    .list-item .title-content .price-set {
        position: absolute;
        top: 41%;
    }
    .list-item .title-content h2 {
        line-height: 1.43;
        font-weight: 700;
        overflow: hidden;
        font-size: 14px;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .list-item .title-content {
        position: absolute;
        left: 0;
        width: 100%;
        height: 80px;
        padding-left: 110px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .list-item .title-img {
        position: relative;
        float: left;
        width: 100px;
        height: 80px;
        overflow: hidden;
    }
    .list-item .title-img .tag {
        position: absolute;
        bottom: 0;
    }
   .list-item .title-img .tag span {
        display: inline-block;
        padding: 5px 5px;
        margin-right: 5px;
        line-height: 1;
        text-align: center;
        color: #fff;
        border-radius: 10px;
        font-size: 10px;
    }
    .list-item .title-img .tag span.property-type {
        background-color: #924548;
    }
    .roomKeyWorkContiner {
        width: 100%;
        margin-bottom: 10px;
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