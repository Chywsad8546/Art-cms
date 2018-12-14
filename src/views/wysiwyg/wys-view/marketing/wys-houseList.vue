<template>
  <Form :label-width="60" class="imgWidthCont">
    <Tabs>
      <TabPane label="内容">
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
                <Checkbox v-for="(item,index) in share.searchCondition.layout" :key="index" :label="Number(item.value)">{{item.text}}</Checkbox>
            </CheckboxGroup>
         </Col>
         <Col span="24">
            <h3>面积</h3>
            <RadioGroup v-model="share.area" type="button" size="small" @on-change="areaChange">
              <Radio v-for="(item,index) in share.searchCondition.area" :key="index" :label="item.value" style="margin-left:5px;margin-bottom:5px;">{{item.text}}</Radio>
            </RadioGroup>
         </Col>
         <Col span="24">
            <h3>朝向</h3>
            <CheckboxGroup v-model="share.secondDetailParam.forwardId">
                <Checkbox v-for="(item,index) in share.searchCondition.forward" :key="index" :label="Number(item.value)">{{item.text}}</Checkbox>
            </CheckboxGroup>
            <!-- <RadioGroup v-model="share.area" type="button" size="small" @on-change="areaChange">
              <Radio v-for="(item,index) in share.searchCondition.area" :key="index" :label="item.value" style="margin-left:5px;margin-bottom:5px;">{{item.text}}</Radio>
            </RadioGroup> -->
         </Col>
         <Col span="24">
            <h3>楼龄</h3>
            <RadioGroup v-model="share.secondDetailParam.houseYearId" type="button" size="small" @on-change="houseYearChange">
              <Radio v-for="(item,index) in share.searchCondition.houseYear" :key="index" :label="item.value" style="margin-left:5px;margin-bottom:5px;">{{item.text}}</Radio>
            </RadioGroup>
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
        <Row>
          <Col span="24">
                <Button type="primary" @click="houseSave">确定</Button>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="样式">
        <Row>
          <Col span="24">
          边距
          </Col>
        </Row>
        <FormItem label="顶">
          <Slider v-model="share.top" show-input></Slider>
        </FormItem>
        <FormItem label="右">
          <Slider v-model="share.right" show-input></Slider>
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
                minPrice:"",
                maxPrice:"",
                apartment:[],
                secondDataList:[{
                    area:"丰台"
                },{
                    area:"丰台1"
                }],
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
                let areaArr = data.split("-");
                this.share.secondDetailParam.beginArea = Number(areaArr[0]);
                this.share.secondDetailParam.endArea = Number(areaArr[1]);
        },
        conditionChoice(data){
            if(data.length > 0){
            let priceArr = data.split("-");
            this.share.secondDetailParam.beginPrice = Number(priceArr[0]);
            this.share.secondDetailParam.endPrice = Number(priceArr[1]);
            this.share.minPrice = priceArr[0];
            this.share.maxPrice = priceArr[1];
            }
        },
        areaCascChoice(data){
            if(data.length > 0){
            this.share.secondDetailParam.districtId = "";
            this.share.secondDetailParam.areaId = [];
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
            if(data.length > 0){
            this.share.secondDetailParam.subwayLineId = "";
            this.share.secondDetailParam.subwayStationId = [];
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
                this.share.secondDataList = response.data.data;
                console.log(this.share.secondDataList);
               // console.log(response.data.data);
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
        api.getCityAllInfo({cityDomain:"bj"}).then(response=>{
            this.share.districtInfo = response.data.cityAllInfos.circleDataList;
            this.share.subwayInfo = response.data.cityAllInfos.subwayDataList;
            this.share.searchCondition = response.data.cityAllInfos.searchConditionData.second;
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
    <div id="template" style="display:none;">
        <div class="item">
            <div class="item_thumb">
                <img src="#housePhotoTitle#"/>
            </div>
            <div class="house_textWidth">
                <div class="house_title_price"><h3 class="title">#houseTitle#</h3><span>#houseTotalPrices#万</span></div>
                <div class="house_desc"><div class="desc">#nearbyDistance#</div><span>#houseUnitCost#万/平米</span></div>
                <div class="house_label"><span class="label">素质住户</span><span class="label">安全性高</span><span class="label">繁华地段</span></div>
            </div>
        </div> 
    </div>
    <div class="houseOverScroll" style=" top:{{@share.top/100}}rem;left:{{@share.left/100}}rem; right:{{@share.right/100}}rem; bottom:{{@share.bottom/100}}rem;">
        <div class="houseList">
        </div>
        <div class="down4gLoad" style="display: none;"><img src="http://img.dafy.com/mall/common/img/20180108/load.gif">玩命加载中</div>
    </div>
</stage-template>
<stage-javascript type="text/javascript">
var num = 1;
var asynFlag = true;

$(document).ready(function(){
  //  houseList();
});
function houseList(){
var param = {pageNum: num, pageSize: 10};
asynFlag = false;
$t.find(".down4gLoad").show();
$.ajax({
        //几个参数需要注意一下
            type: "POST",//方法类型
            contentType: "application/json",
            dataType: "json",//预期服务器返回的数据类型
            url: "http://app.dev.bidewu.com/searchapiv2/rest/esf/getSellHouseList" ,//url
            data: JSON.stringify(param),
            success: function (result) {
                asynFlag = true;
                $t.find(".down4gLoad").hide();
                createAppendTemp(result);
                num++;
            },
            error : function() {
                alert("异常！");
            }
        });
}

function createAppendTemp(result){
    for(var i=0;i<result.data.length;i++){
        var tempHtml = $t.find("#template").html();
        var housePhotoTitle = result.data[i].housePhotoTitle;
        var houseTitle = result.data[i].houseTitle;
        var houseTotalPrices = result.data[i].houseTotalPrices;
        var nearbyDistance =  result.data[i].room+"室"+result.data[i].hall+"厅";
        var houseUnitCost = result.data[i].houseUnitCost.toFixed(2);
        tempHtml = tempHtml.replace("#housePhotoTitle#",imgSrc(housePhotoTitle,'-dongfangdi400x300'));
        tempHtml = tempHtml.replace("#houseTitle#",houseTitle);
        tempHtml = tempHtml.replace("#houseTotalPrices#",houseTotalPrices);
        tempHtml = tempHtml.replace("#nearbyDistance#",nearbyDistance);
        tempHtml = tempHtml.replace("#houseUnitCost#",houseUnitCost);
        var maxDiv = $("<div></div>");
        maxDiv.html(tempHtml);
        var liMaxDom = maxDiv.children("div");	
        $t.find(".houseList").append(liMaxDom);
    }
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
$($t.children(".houseOverScroll")).scroll(function(){
	var conOffset = this.offsetTop; // 头部高度
    var scrollTop = this.scrollTop;	// 滚动高度		    
    var scrollHeight = this.scrollHeight; // 文档高度
	var windowHeight = document.body.clientHeight-conOffset; // 文档窗口高度
	if (scrollTop + windowHeight >= scrollHeight - 100) {
        if(asynFlag){
            houseList();
        }
	}
});
</stage-javascript>
<stage-css>
.house_textWidth {
    width:6.5rem;
    margin:0 auto;
    overflow: hidden;
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
    overflow-y: scroll;
    overflow-x: hidden;
    width: 7.5rem;
    height: 600px;
    position: absolute;
    top: 0;
    left: 0;
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
.item {
    width: 6.92rem;
    background: #FFFFFF;
    border-radius: 5px;
    margin:0 auto;
    margin-top:0.2rem;
    padding-bottom:0.3rem;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.02);
}
.item_thumb {
    width:6.5rem;
    overflow:hidden;
    margin:0 auto;
    padding-top:0.2rem;
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
    width:5.4rem;
}
.house_title_price  span {
    color:#EC4A02;
    font-size:0.35rem;
    float:right;
}
.house_desc {
    font-size:0.24rem;
    overflow:hidden;
    padding-top:0.28rem;
}
.house_desc .desc {
    color:#191919;
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
    margin-right:0.15rem;
    background:#ECFAE6;
    color:#54BD76;
    font-size:0.24rem;
}
</stage-css>
