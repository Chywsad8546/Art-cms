<template>
  <Form :label-width="60" class="imgWidthCont">
    <Tabs>
      <TabPane label="内容">
       <Form ref="formValidate" :model="share" :label-width="80">
        <Row class="navdhName">
           <Col span="24">
             <h3>城市</h3>
          </Col>
          <Col span="24">
            <Select v-model="share.apiCity" style="width:100px" @on-change="cityChange">
                <Option v-for="item in cityList" :value="item.city_domain" :key="item.city_domain">{{ item.city_name }}</Option>
            </Select>
          </Col>           
        </Row>

        <Row class="navdhName" v-if="share.apiCity">
            <Col span="24">
                <h3>区域</h3>
            </Col>
            <Col span="24">
                    <Select v-model="share.areaValue" style="width:100px" @on-change="districtSelect">
                        <Option v-for="item in districtInfo" :value="item.districtId" :key="item.districtId">{{ item.name }}</Option>
                    </Select>
                    <Select v-model="share.areaChildren" multiple style="width:150px">
                        <Option v-for="item in districtChildren" :value="item.circle" :key="item.circle">{{ item.name }}</Option>
                    </Select> 
            </Col>
            <Col span="24">
                <h3>地铁</h3>
            </Col>
            <Col span="24">
                    <Select v-model="share.metroValue" style="width:100px" @on-change="metroSelect">
                        <Option v-for="item in subwayInfo" :value="item.subwayid" :key="item.subwayid">{{ item.name }}</Option>
                    </Select>
                <Select v-model="share.metroChildren" multiple style="width:150px">
                        <Option v-for="item in subwayChildren" :value="item.stationid" :key="item.stationid">{{ item.station_name }}</Option>
                    </Select> 
            </Col>
            <Col span="24">
                <h3>价格</h3>
            </Col>
            <Col span="24">
                <RadioGroup v-model="share.priceSelect" type="button" size="small" @on-change="conditionChoice">
                <Radio v-for="(item,index) in searchCondition.price" :key="index" :label="item.value" style="margin-left:5px;margin-bottom:5px;">{{item.text}}</Radio>
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
            <h3>房型</h3>
                <CheckboxGroup v-model="share.secondDetailParam.layoutId">
                    <Checkbox v-for="(item,index) in searchCondition.layout" :key="index" :label="Number(item.value)">{{item.text}}</Checkbox>
                </CheckboxGroup>
            </Col>
            <Col span="24">
                <h3>面积</h3>
                <RadioGroup v-model="share.area" type="button" size="small" @on-change="areaChange">
                <Radio v-for="(item,index) in searchCondition.area" :key="index" :label="item.value" style="margin-left:5px;margin-bottom:5px;">{{item.text}}</Radio>
                <Radio  label="不限" style="margin-left:5px;margin-bottom:5px;">
                    不限
                </Radio>
                </RadioGroup>

            </Col>
            <Col span="24">
                <h3>朝向</h3>
                <CheckboxGroup v-model="share.secondDetailParam.forwardId">
                    <Checkbox v-for="(item,index) in searchCondition.forward" :key="index" :label="Number(item.value)">{{item.text}}</Checkbox>
                </CheckboxGroup>
            </Col>
            <Col span="24">
                <h3>楼龄</h3>
                <RadioGroup v-model="share.secondDetailParam.houseYearId" type="button" size="small" @on-change="houseYearChange">
                <Radio v-for="(item,index) in searchCondition.houseYear" :key="index" :label="item.value" style="margin-left:5px;margin-bottom:5px;">{{item.text}}</Radio>
                <Radio  label="不限" style="margin-left:5px;margin-bottom:5px;">
                    不限
                </Radio>
                </RadioGroup>
            </Col>
            <Col span="24">
                <h3>标签</h3>
                <CheckboxGroup v-model="share.label" style="float:left;" @on-change="labelChange">
                    <Checkbox v-for="(item,index) in searchCondition.label" :key="index" :label="item.value">{{item.text}}</Checkbox>
                </CheckboxGroup>
                <CheckboxGroup v-model="share.otherLabel"  @on-change="otherLabelChange">
                    <Checkbox v-for="(item,index) in searchCondition.otherLabel" :key="index" :label="item.string" >{{item.text}}</Checkbox>
                </CheckboxGroup>
            </Col>
             <Col span="24"  style="margin-top:10px;">
                    <Button type="primary" @click="houseSave">确定</Button>
                    <Button type="primary" @click="emptyOption">重置</Button>
            </Col>           
            </Row>
        </Form>
      </TabPane>
      <TabPane label="样式">
        <RadioGroup v-model="share.tempVertical" vertical>
            <Radio label="templateId">
                <span>大图样式</span>
            </Radio>
            <Radio label="templateId1">
                <span>小图样式</span>
            </Radio>
        </RadioGroup>

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
      </TabPane>
    </Tabs>
  </Form>
</template>

<script>
import api from '../../../../api/wysiwyg/main.js';
import wysLink from '../components/link.vue';
import { Script } from 'vm';
import { setTimeout } from 'timers';
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
                apiCity:'',
                areaValue:'',
                metroValue:[],
                areaChildren:'',
                priceSelect:"",
                apartment:[],
                secondDataList:{},
                secondDetailUrl:'',
                tempVertical:'templateId',
                ajaxDomain:'',
                secondDetailParam:{
                   pageNum: 1,
                   pageSize: 10,
                }
            },
            areaValue:[],
            districtChildren:[],
            searchCondition:[],
            metroData:[],
            areaData: [],
            districtInfo:[],
            subwayInfo:[],
            subwayChildren:[],
            panelTextKey2:'1',
            regionText:"区域",
            cityList:[],
            id: this.$route.query.id
        };
    },
    methods: {
        getWapCity(){
            api.getWapCity().then(response=>{
                response.data.wapCityList.forEach(cityItem=>{
                    cityItem.cityJson.forEach(jsonItem=>{
                         this.cityList.push(jsonItem);
                    });
                });
            })
        },
        cityChange(data){
            this.share.secondDetailParam.apiCity = data;
            api.getCityAllInfo({cityDomain:data}).then(response=>{
                this.districtInfo = response.data.cityAllInfos.circleDataList;
                this.subwayInfo = response.data.cityAllInfos.subwayDataList;
                this.searchCondition = response.data.cityAllInfos.searchConditionData.second;
                // this.share.label = this.share.searchCondition.label.concat(this.share.searchCondition.otherLabel);
                // console.log(this.share.label);
                this.districtInfo.forEach(item=>{
                    if(item.districtId === this.share.areaValue){
                        this.districtChildren = item.children;
                    }
                })
                this.subwayInfo.forEach(item=>{
                    if(item.subwayid === this.share.metroValue){
                        this.subwayChildren = item.children;
                    }
                })
            });
        },
        metroSelect(value){
            this.subwayInfo.forEach(item=>{
                if(item.subwayid === value){
                    console.log(item.children);
                    this.subwayChildren = item.children;
                }
            });
        },
        districtSelect(value){
            this.districtInfo.forEach(item=>{
                if(item.districtId === value){
                    this.districtChildren = item.children;
                }
            });
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
            this.searchCondition.otherLabel.forEach(item=>{
                delete this.share.secondDetailParam[item.string];
                data.forEach(sitem=>{
                    if(sitem ===  item.string){
                        this.share.secondDetailParam[sitem]=item.value;
                    }
                })
            })
        },
        houseYearChange(data){
            if(data === '不限'){
                this.share.secondDetailParam.houseYearId = '';
            }
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
        areaCascChoice(){

            this.share.secondDetailParam.districtId = "";
            this.share.secondDetailParam.areaId = [];
            if(this.share.areaValue.length > 0){
                for(var i=0;i<this.share.areaValue.length;i++){
                    if(i===0){
                        this.share.secondDetailParam.districtId = this.share.areaValue[i];
                    }else{
                        this.share.secondDetailParam.areaId.push(this.share.areaValue[i]);
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
            api.getSellHouseList(this.share.secondDetailParam).then(response=>{
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
        this.share.secondDetailUrl = this.$domain.mUrl;
        this.getWapCity();
        var that = this;
        setTimeout(function(){
            if(that.share.apiCity){
                api.getCityAllInfo({cityDomain:that.share.apiCity}).then(response=>{
                    that.districtInfo = response.data.cityAllInfos.circleDataList;
                    that.subwayInfo = response.data.cityAllInfos.subwayDataList;
                    that.searchCondition = response.data.cityAllInfos.searchConditionData.second;
                    // this.share.label = this.share.searchCondition.label.concat(this.share.searchCondition.otherLabel);
                    // console.log(this.share.label);
                    that.districtInfo.forEach(item=>{
                        if(item.districtId === that.share.areaValue){
                            that.districtChildren = item.children;
                        }
                    })
                    that.subwayInfo.forEach(item=>{
                        if(item.subwayid === that.share.metroValue){
                            that.subwayChildren = item.children;
                        }
                    })
                });
            }
        },500);
    },
    mounted () {
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
    <div class="templateId1" style="display:none;">
        <div class="typeMin_item">
            <a href="<%= share.secondDetailUrl %>/<%= share.apiCity %>/detail/second?id=#houseId#" target="_self">
                <div class="typeMin_item_thumb">
                    <div class="typeMin_tag-list">
                            #tagList#
                    </div>
                    <div class="img-box">
                        <img src="#housePhotoTitle#"/>
                    </div>
                </div>
                <div class="typeMin_house_textWidth">
                    <div class="typeMin_house_title_price"><h3 class="title">#plotNameAccurate#</h3></div>
                    <div class="typeMin_house_desc"><div class="desc">#nearbyDistance# | #buildArea#㎡ | #floor#/共#totalFloor#层 </div></div>
                    <div class="typeMin_house_label">#labelSpan#</div>
                    <div class="typeMin_secRess"><span class="price">#houseTotalPrices#<span>万</span></span><span class="typeMin_rent_address"> | #area# #houseBusinessName#</span></div>
                </div>
            </a>
        </div>
    </div>
    <div class="templateId" style="display:none;">
        <div class="item">
            <a href="<%= share.secondDetailUrl %>/<%= share.apiCity %>/detail/second?id=#houseId#" target="_self">
                <div class="item_thumb">
                        <div class="tag-list">
                            #tagList#
                        </div>
                    <img src="#housePhotoTitle#"/>
                </div>
                <div class="house_textWidth">
                    <div class="house_Price">#houseTotalPrices#<span>万/套</span></div>
                    <div class="house_title_price"><h3 class="title">#plotNameAccurate#</h3></div>
                    <div class="house_desc"><div class="desc"><span class="address">#area# #houseBusinessName#</span>#nearbyDistance# | #buildArea#㎡ | #floor#/共#totalFloor#层</div></div>
                    <div class="house_label">#labelSpan#</div>
                </div>
            </a>
        </div> 
    </div>
    <div class="houseOverScroll" style="padding:{{@share.top/100}}rem {{@share.right/100}}rem {{@share.bottom/100}}rem {{@share.left/100}}rem;">
        <div class="<%= share.tempVertical == 'templateId' ? 'houseList' : 'houseList houseBackList' %>">
        </div>
        <div class="down4gLoad" style="display: none;"><img src="http://img.dafy.com/mall/common/img/20180108/load.gif">加载中</div>
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
$t.find(".down4gLoad").show();
$.ajax({
        //几个参数需要注意一下
            type: "POST",//方法类型
            contentType: "application/json",
            dataType: "json",//预期服务器返回的数据类型
            url: "<%= share.ajaxDomain %>/searchapiv2/rest/esf/getSellHouseList" ,//url
            data: JSON.stringify(param),
            success: function (result) {
                asynFlag = true;
                $t.find(".down4gLoad").hide();
                createAppendTemp(result);
            },
            error : function() {
                alert("异常！");
            }
        });
}

function createAppendTemp(result){
    if(result.data <= 0){
        return false;
    }
    if(param.pageNum == 1){
        $t.find(".houseList").html("");
    }
    var tempId = ".<%= share.tempVertical %>";
    for(var i=0;i<result.data.length;i++){
        var tempHtml = $t.find(tempId).html();
        var housePhotoTitle = result.data[i].housePhotoTitle;
        var houseTitle = result.data[i].houseTitle;
        var plotNameAccurate = result.data[i].plotNameAccurate;
        var houseTotalPrices = result.data[i].houseTotalPrices;
        var totalFloor = result.data[i].totalFloor;
        var floor = result.data[i].floor;
        var buildArea = result.data[i].buildArea;
        var houseId = result.data[i].houseId;
        var area = result.data[i].area;
        var houseBusinessName = result.data[i].houseBusinessName;
        var tagList = "";
        var houseLableList = result.data[i].houseLableList;
        for(var t=0;t<houseLableList.length;t++){
            tagList +="<span class=\"tag\"><img src="+houseLableList[t].icon+"></span>";
        }
        if(tempId == ".templateId"){
            var houseSubjectList = result.data[i].houseSubjectList.slice(0,2);
            var labelSpan = "";
            for(var k=0;k<houseSubjectList.length;k++){
                labelSpan +="<span class=\"label\">"+houseSubjectList[k].text+"</span>";
            }
        }else{
            var tagsName = result.data[i].tagsName.slice(0,4);
            var labelSpan = "";
            for(var k=0;k<tagsName.length;k++){
                labelSpan +="<span class=\"label\">"+tagsName[k]+"</span>";
            }
        }
        var nearbyDistance =  result.data[i].room+"室"+result.data[i].hall+"厅";
        var houseUnitCost = result.data[i].houseUnitCost.toFixed(2);
        tempHtml = tempHtml.replace("#housePhotoTitle#",imgSrc(housePhotoTitle,'-dongfangdi400x300'));
        tempHtml = tempHtml.replace("#plotNameAccurate#",plotNameAccurate);
        tempHtml = tempHtml.replace("#labelSpan#",labelSpan);
        tempHtml = tempHtml.replace("#tagList#",tagList);
        tempHtml = tempHtml.replace("#area#",area);
        tempHtml = tempHtml.replace("#houseBusinessName#",houseBusinessName);
        tempHtml = tempHtml.replace("#houseTotalPrices#",houseTotalPrices);
        tempHtml = tempHtml.replace("#nearbyDistance#",nearbyDistance);
        tempHtml = tempHtml.replace("#houseUnitCost#",houseUnitCost);
        tempHtml = tempHtml.replace("#totalFloor#",totalFloor);
        tempHtml = tempHtml.replace("#floor#",floor);
        tempHtml = tempHtml.replace("#buildArea#",buildArea);
        tempHtml = tempHtml.replace("#houseId#",houseId);
        
        var maxDiv = $("<div></div>");
        maxDiv.html(tempHtml);
        var liMaxDom = maxDiv.children("div");
        $t.find(".houseList").append(liMaxDom);
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
.tag-list {
    position: absolute;
    top: 0.2rem;
    left: 0;
    margin-left: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.tag {
    display: inline-block;
    width: 0.5rem;
    height: 0.4rem;
    background-size: 100% 100%;
    margin-left: 0.15rem;
}
.tag img {
    width:100%;
}
.house_textWidth {
    width:6.76rem;
    margin:0 auto;
    overflow: hidden;
    position: relative;
}
.house_Price {
    position: absolute;
    right:0;
    z-index:20;
    top:0.28rem;
    color:#FE4D4D;
    font-size:0.5rem;
}
.house_Price span {
    font-size:0.25rem;
    margin-left:0.1rem;
    color:#2E2E2E;
}
.down4gLoad {
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
    color: #999999;
    display: none;
    font-size: 0.24rem;
}
.down4gLoad img {
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.1rem;
    margin-bottom: 0.04rem;
}
.houseOverScroll {
    width: 7.5rem;
    overflow: hidden;
}
.houseOverScroll::-webkit-scrollbar-track-piece {
  background-color: rgba(0, 0, 0, 0);
  border-left: 1px solid rgba(0, 0, 0, 0);
}
.houseOverScroll::-webkit-scrollbar {
  width: 5px;
  height: 13px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.houseOverScroll::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5);
  background-clip: padding-box;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  min-height: 28px;
}
.houseOverScroll::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.houseList {
    overflow: hidden;
}
.houseBackList {
    background:#FFFFFF;
}
.item {
    width: 7.08rem;
    background: #FFFFFF;
    border-radius: 5px;
    margin:0 auto;
    margin-top:0.2rem;
    padding-bottom:0.3rem;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.02);
}
.item_thumb {
    width:6.7rem;
    overflow:hidden;
    margin:0 auto;
    padding-top:0.2rem;
    position: relative;
}
.item_thumb img {
    width:100%;
}
.house_title_price {
    padding-top:0.3rem;
    overflow:hidden;
}
.house_title_price h3{
    font-size:0.32rem;
}
.house_title_price  .title {
    float:left;
    font-size:0.4rem;
    color:#282828;
}
.house_desc .desc .address {
    color:#666666;
    float:left;
    display:table-cell;
    vertical-align:bottom;
    margin-right:0.2rem;
}
.house_desc .desc .address:before {
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
.house_desc {
    font-size:0.24rem;
    overflow:hidden;
    padding-top:0.2rem;
}
.house_desc .desc {
    color:#666666;
    float:left;
}
.house_desc span {
    float:right;
}
.house_label {
    padding-top:0.2rem;
    overflow:hidden;
}
.house_label .label {
    margin-right:0.1rem;
    background:#EDF9FF;
    color:#419AB8;
    font-size:0.22rem;
}



.typeMin_tag-list {
    position: absolute;
    top: 0;
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
    font-size: 0.32rem;
    color:#fe4d4d;
    display:block;
    float:left;
    font-weight: 700;
    margin-right:0.1rem;
    vertical-align: text-bottom;
}
.typeMin_item .price span {
    display: inline-block;
    line-height: 1;
    font-size: 0.25rem;
    color: #fe4d4d;
    font-family: DIN-Medium;
}

.typeMin_rent_address {
    color:#666666;
    display:block;
    float:left;
    font-size:0.25rem;
}
.typeMin_house_desc {
    font-size:0.24rem;
    overflow:hidden;
    margin-top:0.1rem;
}
.typeMin_house_desc .desc {
    color:#191919;
    float:left;
}
.typeMin_house_desc span {
    float:right;
}
.typeMin_secRess {
    overflow:hidden;
    margin-top:0.1rem;
}
.typeMin_house_label {
    overflow:hidden;
    margin-top:0.1rem;
}
.typeMin_house_label .label {
    margin-right:0.1rem;
    background:#EDF9FF;
    color:#419AB8;
    font-size:0.22rem;
}
</stage-css>
