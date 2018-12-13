<template>
  <Form :label-width="60" class="imgWidthCont">
    <Tabs>
      <TabPane label="内容">
        <Row class="navdhName">
          <Col span="24">
                    <RadioGroup v-model="share.regionText" @on-change="radioClick">
                        <Radio label="附近"></Radio>
                        <Radio label="区域"></Radio>
                        <Radio label="地铁"></Radio>
                    </RadioGroup>
          </Col>
          <Col span="24">

                <!-- <Cascader :data="data" v-model="value2"></Cascader> -->
                <cascaderMulti v-model="value2" :data="data" placeholder="状态码"></cascaderMulti>

                <!-- <Select v-model="share.districtText" size="small" style="width:100px" v-if="share.regionText ==='区域'">
                    <Option v-for="item in share.districtInfo" :value="item.districtId" :key="item.districtId">{{ item.name }}</Option>
                </Select>
                <Select v-model="share.distanceText" size="small" style="width:100px"  v-if="share.regionText ==='附近'">
                    <Option v-for="item in share.distanceItems" :value="item.value" :key="item.value">{{ item.text }}</Option>
                </Select>
                <Select v-model="share.subwayText" size="small" style="width:100px"  v-if="share.regionText ==='地铁'">
                    <Option v-for="item in share.subwayInfo" :value="item.subwayid" :key="item.subwayid">{{ item.name }}</Option>
                </Select> -->
                <!-- <Select v-model="share.searchConditionText" size="small" style="width:100px">
                    <Option v-for="item in share.searchCondition" :value="item.districtId" :key="item.districtId">{{ item.name }}</Option>
                </Select> -->
          </Col>
        </Row>
        <Row>
          <Col span="24">
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
                regionText:"区域",
                regionList:[{
                        value: '附近',
                        label: '附近'
                    },{
                        value: '区域',
                        label: '区域'
                    },{
                        value: '地铁',
                        label: '地铁'
                    }],
                districtInfo:[],
                distanceItems:[{ label: "不限", value: "" },{ label: "1000米内", value: 1 },{ label: "2000米内", value: 2 },{ label: "3000米内", value: 3 }]
                // 条件配置获取
            },
            panelTextKey2:'1',
            value2:[],
            data: [
                // {
                //     value: 'beijing',
                //     label: '北京',
                //     children: [
                //         {
                //             value: 'gugong',
                //             label: '故宫'
                //         },
                //         {
                //             value: 'tiantan',
                //             label: '天坛'
                //         },
                //         {
                //             value: 'wangfujing',
                //             label: '王府井'
                //         }
                //     ]
                // }, {
                //     value: 'jiangsu',
                //     label: '江苏',
                //     children: [
                //         {
                //             value: 'nanjing',
                //             label: '南京',
                //             children: [
                //                 {
                //                     value: 'fuzimiao',
                //                     label: '夫子庙',
                //                 }
                //             ]
                //         },
                //         {
                //             value: 'suzhou',
                //             label: '苏州',
                //             children: [
                //                 {
                //                     value: 'zhuozhengyuan',
                //                     label: '拙政园',
                //                 },
                //                 {
                //                     value: 'shizilin',
                //                     label: '狮子林',
                //                 }
                //             ]
                //         }
                //     ],
                // }
                ],
                // end_code: [],
                // end_codes: [{
                //     value: 1000,
                //     label: "接通",
                //     children: [{
                //     label: "已报价",
                //     value: 1100,
                //     children: [],
                //     multiple: true //可忽略项，当为true时该项为多选
                //     }]
                // }]
        };
    },
    methods: {
        radioClick(){
            this.data = [];
            this.value2 = [];
            if(this.share.regionText === "区域"){
                this.share.districtInfo.forEach(item=>{
                    this.data.push({value:item.districtId,label:item.name,children:[]});
                    item.children.forEach(sItem=>{
                        this.data.forEach(dataItem=>{
                            dataItem.children.push({value:sItem.circle,label:sItem.name,multiple: true});
                        })
                    })
                })
            }
            if(this.share.regionText === "附近"){
                this.data = this.share.distanceItems;
            }
            if(this.share.regionText === "地铁"){

                this.share.subwayInfo.forEach(item=>{
                    console.log(item);
                     this.data.push({value:item.subwayid,label:item.name,children:[]});
                    item.children.forEach(sItem=>{
                        this.data.forEach(dataItem=>{
                            dataItem.children.push({value:sItem.stationid,label:sItem.station_name,multiple: true});
                        })
                    })
                })

            }
            console.log(this.share.regionText);
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
            this.share.districtInfo.forEach(item=>{
                this.data.push({value:item.districtId,label:item.name,children:[]});
                item.children.forEach(sItem=>{
                    this.data.forEach(dataItem=>{
                        dataItem.children.push({value:sItem.circle,label:sItem.name,multiple: true});
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
    houseList();
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
                num++;
            },
            error : function() {
                alert("异常！");
            }
        });
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
