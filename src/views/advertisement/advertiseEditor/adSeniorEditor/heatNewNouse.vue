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
    </Row>
</template>
<stage-template>
        <div class="list-item" style="padding-top:20px;padding-left:20px;">
            <div class="title-img" style="position: relative;float: left;width: 100px;height: 80px;overflow: hidden;">
                <img style="width:100%" src="{{@ share.titleImagePath}}"> 
            </div>
            <div class="title-content" style="position: absolute;left: 0; width: 100%;height: 80px;padding-left: 150px;-webkit-box-sizing: border-box; box-sizing: border-box;">
                <h2 style="line-height: 1.43;font-weight: 700;overflow: hidden; font-size: 14px;-o-text-overflow: ellipsis; text-overflow: ellipsis;white-space: nowrap;">{{@ share.projName}}<span style="margin-left: 0.2rem;color: #666;">{{@ share.districtName}}</span></h2> 
                <div class="price-set" style="position: absolute;top: 41%;">
                    <div class="title-price" style="display: inline-block;color: #ff4848;">
                        <span style="font-weight: 700;line-height: 0.6;font-size: 16px;">{{@ share.totalPrice}}</span> 
                        <em style="font-size: 12px;display: inline-block;vertical-align: top;">万</em>
                    </div>
                </div> 
            <div class="piece-bottom" style="position: absolute;left: 0;bottom: -20px;color: #666; width: 100%;padding-bottom: 10px;padding-left: 130px; -webkit-box-sizing: border-box;box-sizing: border-box;overflow: hidden;-o-text-overflow: ellipsis;text-overflow: ellipsis;white-space: nowrap;font-size: 12px;">
                    <span style="display: inline-block;padding: 5px 5px; max-width: 200px; margin-left: 10px; -webkit-box-sizing: border-box;box-sizing: border-box;border-radius: 10px; overflow: hidden;font-size: 12px;-o-text-overflow: ellipsis;text-overflow: ellipsis; white-space: nowrap;">{{@ share.purposearea}}</span> 
                    <span style="display: inline-block;padding: 5px 5px; max-width: 200px; margin-left: 10px; -webkit-box-sizing: border-box;box-sizing: border-box;border-radius: 10px; overflow: hidden;font-size: 12px;-o-text-overflow: ellipsis;text-overflow: ellipsis; white-space: nowrap;" >{{@ share.rightYear}}</span>
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
                    modeProName:0
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
                            nOrE:0,
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
                    this.share.projName = response.data.data.projName
                    this.share.totalPrice = response.data.data.totalPrice;
                    this.share.purposearea = response.data.data.minArea+"-"+response.data.data.maxArea+'㎡';
                    this.share.rightYear = response.data.data.livindate;
                    this.share.districtName = response.data.data.districtName;
                    this.share.titleImagePath = response.data.data.titleImagePath;
                    this.share.newcode = response.data.data.newcode;
                    this.share.modeProName = response.data.data.newcode + '';
                    this.keywordList = [{"newcode":response.data.data.newcode + '',"projName":response.data.data.projName}];
                    this.formisShow = true;
                })
            },
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