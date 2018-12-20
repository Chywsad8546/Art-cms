<template>
  <Form :label-width="60" class="imgWidthCont">
    <Tabs>
      <TabPane label="内容">
       <Form ref="formValidate" :model="share" :label-width="80">
        <Row class="navdhName">
          <Col span="24">
             <h3>区域</h3>
          </Col>
          <Col span="24">
                <cascaderMulti v-model="share.areaValue" :data="share.areaData" @on-change="areaCascChoice" placeholder="请选择"></cascaderMulti>   
          </Col>
          <Col span="24">
             <h3>地铁</h3>
          </Col>
          <Col span="24">
                <cascaderMulti v-model="share.metroValue" :data="share.metroData" @on-change="metroCascChoice" placeholder="请选择"></cascaderMulti>   
          </Col>
          <Col span="24">
             <h3>价格</h3>
          </Col>
          <Col span="24">
            <RadioGroup v-model="share.priceSelect" type="button" size="small" @on-change="conditionChoice">
              <Radio v-for="(item,index) in share.searchCondition.price" :key="index" :label="item.value" style="margin-left:5px;margin-bottom:5px;">{{item.text}}</Radio>
              <Radio  label="不限" style="margin-left:5px;margin-bottom:5px;">
                  不限
              </Radio>
           </RadioGroup>
         </Col>
         <Col span="24">
          <span>自定义：</span>
          <Input v-model="share.secondDetailParam.beginPrice" number  placeholder="最低价" style="width: 100px"></Input>
          <span>-</span>
          <Input v-model="share.secondDetailParam.endPrice"  number  placeholder="最高价" style="width: 100px"></Input>
          <span>万</span>
         </Col>
         <Col span="24">
            <h3>面积</h3>
            <RadioGroup v-model="share.area" type="button" size="small" @on-change="areaChange">
              <Radio v-for="(item,index) in share.searchCondition.area" :key="index" :label="item.value" style="margin-left:5px;margin-bottom:5px;">{{item.text}}</Radio>
              <Radio  label="不限" style="margin-left:5px;margin-bottom:5px;">
                  不限
              </Radio>
            </RadioGroup>

         </Col>
         <Col span="24">
            <h3>整租</h3>
            <CheckboxGroup v-model="share.elo"  @on-change="eloChange">
                <Checkbox v-for="(item,index) in share.searchCondition.elo" :key="index" :label="Number(item.value)">{{item.text}}</Checkbox>
            </CheckboxGroup>
         </Col>
         <Col span="24">
            <h3>合租</h3>
            <CheckboxGroup v-model="share.jlo" @on-change="jloChange">
                <Checkbox v-for="(item,index) in share.searchCondition.jlo" :key="index" :label="Number(item.value)">{{item.text}}</Checkbox>
            </CheckboxGroup>
         </Col>
         <Col span="24">
            <h3>朝向</h3>
            <CheckboxGroup v-model="share.secondDetailParam.forwardId">
                <Checkbox v-for="(item,index) in share.searchCondition.forward" :key="index" :label="Number(item.value)">{{item.text}}</Checkbox>
            </CheckboxGroup>
         </Col>
         <Col span="24">
            <h3>标签</h3>
            <CheckboxGroup v-model="share.label" style="float:left;" @on-change="labelChange">
                <Checkbox v-for="(item,index) in share.searchCondition.label" :key="index" :label="item.value">{{item.text}}</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup v-model="share.otherLabel"  @on-change="otherLabelChange">
                <Checkbox v-for="(item,index) in share.searchCondition.otherLabel" :key="index" :label="item.string" >{{item.text}}</Checkbox>
            </CheckboxGroup>
         </Col>
        </Row>
        <Row style="margin-top:10px;">
          <Col span="24">
                <Button type="primary" @click="houseSave">确定</Button>
                <Button type="primary" @click="emptyOption">重置</Button>
          </Col>
        </Row>
        </Form>
      </TabPane>
      <TabPane label="样式">
        <Row>
          <Col span="24">
          边距
          </Col>
        </Row>
        <FormItem label="顶">
          <Slider v-model="share.top" :max="500" show-input></Slider>
        </FormItem>
        <FormItem label="右">
          <Slider v-model="share.right"  show-input></Slider>
        </FormItem>
        <FormItem label="底">
          <Slider v-model="share.bottom" show-input></Slider>
        </FormItem>
        <FormItem label="左">
          <Slider v-model="share.left" show-input></Slider>
        </FormItem>
        <Collapse v-model="panelTextKey2" style="margin-bottom:10px;">
            <Panel name="1">
                文字
                <p slot="content">
                    <Row>
                        <Col span="12">
                        </Col>
                    </Row>
                </p>
            </Panel>
        </Collapse>
      </TabPane>
    </Tabs>
  </Form>
</template>

<script>
import api from '../../../../api/wysiwyg/main.js';
import wysLink from '../components/link.vue';
import { Script } from 'vm';
export default {
    name: 'wys-link',
    components: {
        wysLink
    },
    data () {
        return {
            share: {
                name: '链接文字',
                navVisible: false,
                url: '',
                urlData: {},
                top: 10,
                right: 0,
                bottom: 0,
                left: 0,
                areaValue:[],
                areaData: [],
                metroData:[],
                metroValue:[],
                priceSelect:"",
                searchCondition:[],
                apartment:[],
                secondDataList:{},
                rentDetailUrl:'',
                ajaxDomain:'',
                secondDetailParam:{
                   pageNum: 1,
                   pageSize: 10,
                }
            },
            districtInfo:[],
            subwayInfo:[],
            panelTextKey2:'1',
            regionText:"区域",
        };
    },
    methods: {
        jloChange(data){
            this.share.secondDetailParam.elo = data.join();
        },
        eloChange(data){
            this.share.secondDetailParam.jlo = data.join();
        },
        emptyOption(){
            this.share.secondDetailParam = {
                pageNum: 1,
                pageSize: 10,                 
            }
            this.share.secondDataList = {};
            this.share.priceSelect = "";
            this.share.area = "";
            this.share.areaValue = [];
            this.share.metroValue = [];
            this.$refs["formValidate"].resetFields();
        },
        labelChange(data){
            delete this.share.secondDetailParam.labelId;
            if(data[0]){
                this.share.secondDetailParam.labelId = [Number(data[0])];
            }
        },
        otherLabelChange(data){
            this.share.searchCondition.otherLabel.forEach(item=>{
                delete this.share.secondDetailParam[item.string];
                data.forEach(sitem=>{
                    if(sitem ===  item.string){
                        this.share.secondDetailParam[sitem]=item.value;
                    }
                })
            })
        },
        houseYearChange(data){
            console.log(data);
        },
        areaChange(data){
                if(data === '不限'){
                    this.share.secondDetailParam.beginArea = '';
                    this.share.secondDetailParam.endArea = '';
                    return false;
                }           
                let areaArr = data.split("-");
                this.share.secondDetailParam.beginArea = Number(areaArr[0]);
                this.share.secondDetailParam.endArea = Number(areaArr[1]);
        },
        conditionChoice(data){
            if(data === '不限'){
                this.share.secondDetailParam.beginPrice = '';
                this.share.secondDetailParam.endPrice = '';
                return false;
            }
            if(data.length > 0){
                let priceArr = data.split("-");
                this.share.secondDetailParam.beginPrice = Number(priceArr[0]);
                this.share.secondDetailParam.endPrice = Number(priceArr[1]);
            }
        },
        areaCascChoice(data){
            this.share.secondDetailParam.districtId = "";
            this.share.secondDetailParam.areaId = [];
            if(data.length > 0){
                for(var i=0;i<data.length;i++){
                    if(i===0){
                        this.share.secondDetailParam.districtId = data[i];
                    }else{
                        this.share.secondDetailParam.areaId.push(data[i]);
                    }
                }
            }
        },
        metroCascChoice(data){
            this.share.secondDetailParam.subwayLineId = "";
            this.share.secondDetailParam.subwayStationId = [];
            if(data.length > 0){
                for(var i=0;i<data.length;i++){
                    if(i===0){
                        this.share.secondDetailParam.subwayLineId = data[i];
                    }else{
                        this.share.secondDetailParam.subwayStationId.push(data[i]);
                    }
                }
            }
        },
        houseSave(){
            api.getRentHouseSearchList(this.share.secondDetailParam).then(response=>{
                console.log(response);
                this.share.secondDataList = response.data;
            });
        },
        removeNavigat (item) {
            let index = this.share.navigatList.indexOf(item);
            this.share.navigatList.splice(index, 1);
        },
        addUrl (item) {
            item.navVisible = true;
        },
        addNaviPush () {
            this.share.navigatList.push({ name: '新导航', url: '', navVisible: false });
        },
        cancelPopup () {
            this.share.navVisible = !this.share.navVisible;
        },
        okPopup (data) {
            this.share.navVisible = !this.share.navVisible;
            this.share.url = data.url;
            this.share.urlData = data;
            if (data.id) {
                this.share.url += data.id;
            }
        }
    },
    created: function () {
        this.share.ajaxDomain = this.$domain.ajaxDomain;
        this.share.rentDetailUrl = this.$domain.rentDetailUrl;
        api.getCityAllInfo({cityDomain:"bj"}).then(response=>{
            this.share.districtInfo = response.data.cityAllInfos.circleDataList;
            this.share.subwayInfo = response.data.cityAllInfos.subwayDataList;
            this.share.searchCondition = response.data.cityAllInfos.searchConditionData.rent;
            // this.share.label = this.share.searchCondition.label.concat(this.share.searchCondition.otherLabel);
            // console.log(this.share.label);
            this.share.districtInfo.forEach(item=>{
                this.share.areaData.push({value:item.districtId,label:item.name,children:[{value:"",label:"不限",multiple: false}]});
                item.children.forEach(sItem=>{
                    this.share.areaData.forEach(dataItem=>{
                        dataItem.children.push({value:sItem.circle,label:sItem.name,multiple: true});
                    })
                })
            })
            this.share.subwayInfo.forEach(item=>{
            this.share.metroData.push({value:item.subwayid,label:item.name,children:[]});
                item.children.forEach(sItem=>{
                    this.share.metroData.forEach(dataItem=>{
                        dataItem.children.push({value:sItem.stationid,label:sItem.station_name,multiple: true});
                    })
                })
            })
        });
    // console.log('created',this.$options.customOption,this.$options.wysdocs,this.$options) // => 'foo'
    },
    mounted () {
    // console.log(this.$refs.upload.fileList);
    // this.uploadList = this.$refs.upload.fileList;
    }
};
</script>
<style scoped>
.navdhFont {
  font-size: 20px;
  border-top: 1px solid #cccccc;
  margin-right: 20px;
  padding-top: 10px;
}
.navdhName {
  margin-top: 20px;
  padding-right: 20px;
}
</style>
<stage-template>
    <div class="templateId" style="display:none;">
        <div class="typeMin_item">
            <a href="<%= share.rentDetailUrl %>?id=#houseId#" target="_self">
                <div class="typeMin_item_thumb">
                    <div class="img-box">
                        <img src="#houseTitleImg#"/>
                    </div>
                </div>
                <div class="typeMin_house_textWidth">
                    <div class="typeMin_house_title_price"><span class="#rentLabelClass#">#rentLabelName#</span><h3 class="title">#zufangName#</h3></div>
                    <p class="price"><span>#rentHousePrice#</span>元/月</p>
                    <div class="typeMin_house_desc"><div class="desc">#room#室 | #houseArea#㎡ | #forward# </div></div>
                    <div class="typeMin_house_label">#labelSpan#</div>
                    <div><span class="typeMin_rent_address">#districtName# #areaName#</span></div>
                </div>
            </a>
        </div>
    </div>
    <div class="typeMin_houseOverScroll" style="padding:{{@share.top/100}}rem {{@share.right/100}}rem {{@share.bottom/100}}rem {{@share.left/100}}rem;">
        <div class="typeMin_rentList">
        </div>
        <div class="typeMin_down4gLoad" style="display: none;"><img src="http://img.dafy.com/mall/common/img/20180108/load.gif">加载中</div>
    </div>
</stage-template>
<stage-javascript type="text/javascript">
var num = 1;
var asynFlag = true;
var param = <%- $imports.tojson(share.secondDetailParam) %>;
$(document).ready(function(){
    var houseArr = <%- $imports.tojson(share.secondDataList) %>;
    if(JSON.stringify(houseArr) != '{}'){
        createAppendTemp(houseArr);
    }
});
function houseList(){
asynFlag = false;
$t.find(".typeMin_down4gLoad").show();
$.ajax({
        //几个参数需要注意一下
            type: "POST",//方法类型
            contentType: "application/json",
            dataType: "json",//预期服务器返回的数据类型
            url: "<%= share.ajaxDomain %>/searchapiv2/rest/rent/getRentHouseSearchList" ,//url
            data: JSON.stringify(param),
            success: function (result) {
                asynFlag = true;
                $t.find(".typeMin_down4gLoad").hide();
                createAppendTemp(result);
            },
            error : function() {
                alert("异常！");
            }
        });
}

function createAppendTemp(result){
    if(result.rentDetailsList <= 0){
        return false;
    }
    for(var i=0;i<result.rentDetailsList.length;i++){
        var tempHtml = $t.find(".templateId").html();
        var rentData = result.rentDetailsList[i];
        var zufangName = rentData.zufangName;
        var houseTitleImg = rentData.houseTitleImg;
        var nearbyDistance = rentData.nearbyDistance;
        var houseArea = rentData.houseArea;
        var areaName = rentData.areaName;
        var districtName = rentData.districtName;
        var forward = rentData.forward;
        var room = rentData.room;
        var houseId = rentData.houseId;
        var rentHousePrice = rentData.rentHousePrice;
        var rentType = rentData.rentType;
        var rentHouseTagsName = rentData.rentHouseTagsName.slice(0,2);
        var labelSpan = "";
        for(var k=0;k<rentHouseTagsName.length;k++){
            labelSpan +="<span class=\"label\">"+rentHouseTagsName[k]+"</span>";
        }
        var rentLabelName = "";
        var rentLabelClass = "";
        if(rentType == 1){
            rentLabelName = "整租";
            rentLabelClass = "yellow";
        }
        if(rentType == 2){
            rentLabelName = "合租";
            rentLabelClass = "green";
        }
        tempHtml = tempHtml.replace("#areaName#",areaName);
        tempHtml = tempHtml.replace("#districtName#",districtName);
        tempHtml = tempHtml.replace("#zufangName#",zufangName);
        tempHtml = tempHtml.replace("#rentLabelName#",rentLabelName);
        tempHtml = tempHtml.replace("#houseTitleImg#",houseTitleImg);
        tempHtml = tempHtml.replace("#nearbyDistance#",nearbyDistance);
        tempHtml = tempHtml.replace("#rentLabelClass#",rentLabelClass);
        tempHtml = tempHtml.replace("#houseArea#",houseArea);
        tempHtml = tempHtml.replace("#houseId#",houseId);
        tempHtml = tempHtml.replace("#labelSpan#",labelSpan);
        tempHtml = tempHtml.replace("#room#",room);
        tempHtml = tempHtml.replace("#rentHousePrice#",rentHousePrice);
        tempHtml = tempHtml.replace("#forward#",forward);
        var maxDiv = $("<div></div>");
        maxDiv.html(tempHtml);
        var liMaxDom = maxDiv.children("div");	
        $t.find(".typeMin_rentList").append(liMaxDom);
    }
    param.pageNum ++;
}
function imgSrc(img,size){
  if (img) {
    let _oldImg = img.split(",");
    let _img;
    _oldImg[0].indexOf("http") > -1
      ? (_img = img)
      : (_img = "http://s1.qn.toutiaofangchan.com/" + _oldImg[0] + size);
    return _img;
  } else {
    return "http://wap-qn.toutiaofangchan.com/adideas/59e957da82c24de2adc233719527d4f6.png";
  }
}
/**
 * 屏幕滚动后加载列表
 */
$(document).scroll(function(){
    var scrollTop = $(document).scrollTop();	// 滚动高度		    
    var scrollHeight = $(document).height(); // 文档高度
	var windowHeight = document.body.clientHeight; // 文档窗口高度
	if (scrollTop + windowHeight >= scrollHeight - 100) {
        if(asynFlag){
            houseList();
        }
	}
});
</stage-javascript>
<stage-css>
.typeMin_tag-list {
    position: absolute;
    top: 0.2rem;
    left: 0;
    margin-left: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.typeMin_tag {
    display: inline-block;
    width: 0.5rem;
    height: 0.4rem;
    background-size: 100% 100%;
    margin-left: 0.15rem;
}
.typeMin_tag img {
    width:100%;
}
.typeMin_house_textWidth {
    width:3.6rem;
    margin:0 auto;
    float:left;
    overflow: hidden;
    position: relative;
}
.typeMin_house_Price {
    position: absolute;
    right:0;
    z-index:20;
    bottom:-0.1rem;
    color:#FE4D4D;
    font-size:0.5rem;
}
.typeMin_house_Price span {
    font-size:0.25rem;
    color:#2E2E2E;
}
.typeMin_down4gLoad {
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
    color: #999999;
    display: none;
    font-size: 0.24rem;
}
.typeMin_down4gLoad img {
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.1rem;
    margin-bottom: 0.04rem;
}
.typeMin_houseOverScroll {
    width: 7.5rem;
    overflow: hidden;
}
.typeMin_rentList {
    overflow: hidden;
    width:7.5rem;
    background: #FFFFFF;
}
.typeMin_item {
    width: 6.7rem;
    background: #FFFFFF;
    margin:0 auto;
    margin-top:0.3rem;
    overflow:hidden;
    padding-bottom:0.35rem;
    border-bottom:1px solid #EBEBEB;
}
.typeMin_item_thumb {
    width:2.85rem;
    overflow:hidden;
    margin:0 auto;
    float:left;
    margin-right:0.25rem;
    position: relative;
}
.typeMin_item_thumb .img-box {
    width:2.85rem;
    height:2.1rem;
    border-radius: 0.1rem;
    overflow: hidden;
}
.typeMin_item_thumb .img-box img {
    width:100%;
}
.typeMin_house_title_price {
    overflow:hidden;
}
.typeMin_house_title_price .green {
    background-color: #37dc9c;
    color:#FFFFFF;
    font-size:0.25rem;
    padding:0.02rem 0.1rem 0.02rem 0.1rem;
    float:left;
    margin: 0.1rem 0.12rem 0 0;
    display:block;
}
.typeMin_house_title_price .yellow {
    background-color: #ffc32f;
    color:#FFFFFF;
    font-size:0.25rem;
    padding:0.02rem 0.1rem 0.02rem 0.1rem;
    float:left;
    margin: 0.1rem 0.12rem 0 0;
    display:block;
}
.typeMin_house_title_price h3{
    font-size:0.32rem;
}
.typeMin_house_title_price  .title {
    font-size:0.3rem;
    color:#282828;
    line-height: 0.6rem;
    display: block;
}
.typeMin_item .price {
    margin-top: 0.1rem;
    font-size: 0.2rem;
    color:#282828;
    vertical-align: text-bottom;
}
.typeMin_item .price span {
    display: inline-block;
    line-height: 1;
    font-size: 0.32rem;
    color: #fe4d4d;
    font-family: DIN-Medium;
}

.typeMin_rent_address {
    color:#666666;
    font-size:0.25rem;
    float:left;
    display:table-cell;
    vertical-align:bottom;
}
.typeMin_rent_address:before {
    content: "";
    display: inline-block;
    margin-right: 0.1rem;
    background-size: 100% 100%;
    width: 0.23rem;
    height: 0.23rem;
    background-image: url("http://wap-qn.toutiaofangchan.com/adideas/b7f7bb4d528e4997941f8dabf3916560.png");
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.typeMin_house_desc {
    font-size:0.24rem;
    overflow:hidden;
}
.typeMin_house_desc .desc {
    color:#191919;
    float:left;
}
.typeMin_house_desc span {
    float:right;
}
.typeMin_house_label {
    overflow:hidden;
}
.typeMin_house_label .label {
    margin-right:0.1rem;
    background:#EDF9FF;
    color:#419AB8;
    font-size:0.22rem;
}
</stage-css>
