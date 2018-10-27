<template>
    <div>
        <div class="roomContiner">
            <div class="room">房产类型:</div>
            <div class="roomSelect">
                <Select  v-model="modelhouse" clearable style="width:100px" :label-in-value = "true" @on-change = "houseSelectFun">
                    <Option v-for="item in houseTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </div> 
            <div class="room">           
                城市:
            </div>
            <div class="roomSelect">
                <Select  style="width:100px" v-model="modelCity" clearable :label-in-value = "true" @on-change = "citySelectFun">
                    <Option v-for="item in cityChoiceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </div>
            <div class="room">
                区县:
            </div>
            <div class="roomSelect">
                <Select style="width:100px" v-model="modelCounty" clearable :label-in-value = "true" @on-change = "districtSelectFun">
                    <Option v-for="item in districtList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </div>
                </div>
            <div class="roomContiner">
                <div class="room">房企:</div>
                <div class="roomList">
                    <CheckboxGroup class="labeldxk" v-model="modelfq" @on-change = "fqSelectFun">
                                <Checkbox  v-for="item in enterpriseList" :label="item.id">{{item.name}}</Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            <div class="roomContiner">
                <div class="room">户型:</div>
                <div class="roomList">
                    <CheckboxGroup class="labeldxk" v-model="modelhx" @on-change = "hxdxFun">
                                <Checkbox  v-for="item in huxingList" :label="item.id">{{item.name}}</Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            <div class="roomContiner">
                <div class="room">定向匹配:</div>
                <div class="roomList">
                    <CheckboxGroup class="labeldxk" v-model="modeldxpp" @on-change = "orientFun">
                                <Checkbox  v-for="item in orientList" :label="item.id">{{item.name}}</Checkbox>
                    </CheckboxGroup> 
                </div>
            </div>
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
            <div class="roomList keyHeight">
                        <Tag v-for="item,index in callbackArr7" :key="item.label" :name="item.value" closable @on-close="handleClose2(index)">{{ item.label }}</Tag>
                    <!-- <CheckboxGroup class="labeldxk" v-model="modelkeyword" @on-change = "keywordFun">
                                <Checkbox  v-for="item in keywordList" :label="item.id">{{item.name}}</Checkbox>
                    </CheckboxGroup> -->
            </div>
    </div>  
</template>
<script>
     import api from '../../../../api/news/index.js';
     export default {
        props: [
            "parentlabelMsg"
        ],
        data () {
            return {
                labelArrList:[],
                labelArrNum:[],
                labelName:"",
                isshow: false,
                assnArr:[],
                labelCallArr:[{"arr1":"","arr2":""}],
                houseTypeList:[],
                cityChoiceList:[],
                districtList:[],
                enterpriseList:[],
                huxingList:[],
                orientList:[],
                keywordList:[],
                modelhouse:"",
                modelCity: "",
                modelCounty:"",
                modelfq:[],
                modelhx:[],
                modeldxpp:[],
                modelkeyword:[],
                callBackJson:{},
                callBackid:{},
                callBackname:{},
                callbackArr1:[],
                callbackArr2:[],
                callbackArr3:[],
                callbackArr4:[],
                callbackArr5:[],
                callbackArr6:[],
                callbackArr7:[],
                cityList: [],
                keyWord:"",
                keyShow:false,
                keyWordArr: []
            }
        },
        created() {
            this.tagsList();//获取标签服务
            document.addEventListener("click", function(){
                this.keyShow = false;
            });
        },
        methods: {
            handleAdd (item) {//处理标签
                let addFlag = true;
                this.keyShow = false;
                this.callbackArr7.forEach(obj=>{
                    if(obj.value == item.id){
                        addFlag = false;
                        this.$Notice.warning({
                            title: "关键词已存在！"
                        });
                        return addFlag;
                    }
                });
                if(addFlag == true){
                    let arr = {"value":item.id,"label":item.title};
                    this.callbackArr7.push(arr);
                    this.callBackJson["1"] = this.callbackArr1;
                    this.callBackJson["2"] = this.callbackArr2;
                    this.callBackJson["3"] = this.callbackArr3;
                    this.callBackJson["4"] = this.callbackArr4;
                    this.callBackJson["5"] = this.callbackArr5;
                    this.callBackJson["6"] = this.callbackArr6;
                    this.callBackJson["7"] = this.callbackArr7;
                    this.$emit("labelArr-event",this.callBackJson);
                }
               // this.callbackArr7 = [];
            },
            handleClose2 (index) {//处理标签      
                this.callbackArr7.splice(index, 1);
                this.callBackJson["1"] = this.callbackArr1;
                this.callBackJson["2"] = this.callbackArr2;
                this.callBackJson["3"] = this.callbackArr3;
                this.callBackJson["4"] = this.callbackArr4;
                this.callBackJson["5"] = this.callbackArr5;
                this.callBackJson["6"] = this.callbackArr6;
                this.callBackJson["7"] = this.callbackArr7;
                this.$emit("labelArr-event",this.callBackJson);
            },
            tagsList() {
                api.tagsList().then(response => {
                    this.cityList = response.data.data;
                    this.houseTypeList = this.cityList[0].data; //获取房产类型
                    this.cityChoiceList = this.cityList[1].data; //获取城市数组
                    this.enterpriseList = this.cityList[2].data; //获取房企数组
                    this.huxingList = this.cityList[3].data; //获取户型数组
                    this.orientList = this.cityList[4].data; //获取定向数组
                   // this.keywordList = this.cityList[5].data; //获取关键词数组
                });
            },
            selectclLabel(obj) {
                this.isshow = false;
                this.labelArrList.push(obj.title);
                this.labelArrNum.push(obj.id);
                this.labelCallArr[0].arr1 = this.labelArrList;
                this.labelCallArr[0].arr2 = this.labelArrNum;
                this.$emit("labelArr-event",this.labelCallArr);
            },
            citySelectFun(obj) {
                this.callbackArr2 = [];
                if(obj != undefined){
                    this.districtList = [];
                    let city = this.cityList[1].data;
                    city.forEach((item, index) =>{
                        if(item.id == obj.value){
                            this.districtList = item.districtList;
                        }                 
                    });
                    this.modelCounty = "";
                    let arr = {"value":obj.value,"label":obj.label};
                    this.callbackArr2.push(arr);
                }
                this.callBackJson["1"] = this.callbackArr1;
                this.callBackJson["2"] = this.callbackArr2;
                this.callBackJson["3"] = this.callbackArr3;
                this.callBackJson["4"] = this.callbackArr4;
                this.callBackJson["5"] = this.callbackArr5;
                this.callBackJson["6"] = this.callbackArr6;
                this.callBackJson["7"] = this.callbackArr7;
                this.$emit("labelArr-event",this.callBackJson);
            },
            houseSelectFun(obj){
                this.callbackArr1 = [];
                if(obj != undefined){
                    let arr = {"value":obj.value,"label":obj.label};
                    this.callbackArr1.push(arr);
                }
                this.callBackJson["1"] = this.callbackArr1;
                this.callBackJson["2"] = this.callbackArr2;
                this.callBackJson["3"] = this.callbackArr3;
                this.callBackJson["4"] = this.callbackArr4;
                this.callBackJson["5"] = this.callbackArr5;
                this.callBackJson["6"] = this.callbackArr6;
                this.callBackJson["7"] = this.callbackArr7;
                this.$emit("labelArr-event",this.callBackJson);             
            },
            districtSelectFun(obj){      
                this.callbackArr3 = [];        
                if(obj != undefined){
                    let arr = {"value":obj.value,"label":obj.label};
                    this.callbackArr3.push(arr);
                }
                this.callBackJson["1"] = this.callbackArr1;
                this.callBackJson["2"] = this.callbackArr2;
                this.callBackJson["3"] = this.callbackArr3;
                this.callBackJson["4"] = this.callbackArr4;
                this.callBackJson["5"] = this.callbackArr5;
                this.callBackJson["6"] = this.callbackArr6;
                this.callBackJson["7"] = this.callbackArr7;
                this.$emit("labelArr-event",this.callBackJson);               
            },
            fqSelectFun(cid){
                this.callbackArr4 = [];
                cid.forEach(id => {
                    this.enterpriseList.forEach(item =>{
                         if(item.id == id){
                             var arr = {"value":item.id,"label":item.name};
                             this.callbackArr4.push(arr);
                         }                    
                    }) 
                })
                this.callBackJson["1"] = this.callbackArr1;
                this.callBackJson["2"] = this.callbackArr2;
                this.callBackJson["3"] = this.callbackArr3;
                this.callBackJson["4"] = this.callbackArr4;
                this.callBackJson["5"] = this.callbackArr5;
                this.callBackJson["6"] = this.callbackArr6;
                this.callBackJson["7"] = this.callbackArr7;
                this.$emit("labelArr-event",this.callBackJson);
            },
            hxdxFun(cid){
                this.callbackArr5 = [];
                cid.forEach(id => {
                    this.huxingList.forEach(item =>{
                         if(item.id == id){
                             var arr = {"value":item.id,"label":item.name};
                             this.callbackArr5.push(arr);
                         }                    
                    }) 
                })     
                this.callBackJson["1"] = this.callbackArr1;
                this.callBackJson["2"] = this.callbackArr2;
                this.callBackJson["3"] = this.callbackArr3;
                this.callBackJson["4"] = this.callbackArr4;
                this.callBackJson["5"] = this.callbackArr5;
                this.callBackJson["6"] = this.callbackArr6;
                this.callBackJson["7"] = this.callbackArr7;
                this.$emit("labelArr-event",this.callBackJson);     
            },
            orientFun(cid){
                this.callbackArr6 = [];
                cid.forEach(id => {
                    this.orientList.forEach(item =>{
                         if(item.id == id){
                             var arr = {"value":item.id,"label":item.name};
                             this.callbackArr6.push(arr);
                         }                    
                    }) 
                })
                this.callBackJson["1"] = this.callbackArr1;
                this.callBackJson["2"] = this.callbackArr2;
                this.callBackJson["3"] = this.callbackArr3;
                this.callBackJson["4"] = this.callbackArr4;
                this.callBackJson["5"] = this.callbackArr5;
                this.callBackJson["6"] = this.callbackArr6;
                this.callBackJson["7"] = this.callbackArr7;
                this.$emit("labelArr-event",this.callBackJson);
            },
            keywordFun(cid){
                this.callbackArr7 = [];
                cid.forEach(id => {
                    this.keywordList.forEach(item =>{
                         if(item.id == id){
                             var arr = {"value":item.id,"label":item.name};
                             this.callbackArr7.push(arr);
                         }                    
                    }) 
                })
                this.callBackJson["1"] = this.callbackArr1;
                this.callBackJson["2"] = this.callbackArr2;
                this.callBackJson["3"] = this.callbackArr3;
                this.callBackJson["4"] = this.callbackArr4;
                this.callBackJson["5"] = this.callbackArr5;
                this.callBackJson["6"] = this.callbackArr6;
                this.callBackJson["7"] = this.callbackArr7;
                this.$emit("labelArr-event",this.callBackJson);
            },
            closeLabel(index) {
                this.labelArrList.splice(index, 1);
                this.labelArrNum.splice(index,1);
                this.labelCallArr[0].arr1 = this.labelArrList;
                this.labelCallArr[0].arr2 = this.labelArrNum;
                this.$emit("labelArr-event",this.labelCallArr);
            }
        },
        watch:{
            parentlabelMsg(curVal,oldVal){
                this.modelhouse = curVal[1][0];
                this.modelCity = curVal[2][0];
                this.districtList = [];
                let city = this.cityList[1].data;
                city.forEach((item, index) =>{
                    if(item.id == curVal[2][0]){
                        this.districtList = item.districtList;
                    }                 
                });
                
                let arrDate = ['1','2','3','4','5','6','7'];
                arrDate.forEach(key => {
                    curVal[key].forEach(item => {
                        this.cityList[0].data.forEach(cityItem => {
                            if(cityItem.id == item){
                                let xfarr = {"value":cityItem.id,"label":cityItem.name};
                                this.callbackArr1.push(xfarr);
                            }                           
                        }) 
                         this.cityList[1].data.forEach(cityItem => {
                            if(cityItem.id == item){
                                let xfarr = {"value":cityItem.id,"label":cityItem.name};
                                this.callbackArr2.push(xfarr);
                            }                           
                        }) 
                        if(this.districtList != null){
                            this.districtList.forEach(cityItem => {
                                if(cityItem.id == item){
                                    let xfarr = {"value":cityItem.id,"label":cityItem.name};
                                    this.callbackArr3.push(xfarr);
                                }                           
                            }) 
                        }
                        this.cityList[2].data.forEach(cityItem => {
                            if(cityItem.id == item){
                                let xfarr = {"value":cityItem.id,"label":cityItem.name};
                                this.callbackArr4.push(xfarr);
                            }                           
                        }) 
                        this.cityList[3].data.forEach(cityItem => {
                            if(cityItem.id == item){
                                let xfarr = {"value":cityItem.id,"label":cityItem.name};
                                this.callbackArr5.push(xfarr);
                            }                           
                        }) 
                        this.cityList[4].data.forEach(cityItem => {
                            if(cityItem.id == item){
                                let xfarr = {"value":cityItem.id,"label":cityItem.name};
                                this.callbackArr6.push(xfarr);
                            }                           
                        })  
                        this.cityList[5].data.forEach(cityItem => {
                            if(cityItem.id == item){
                                let xfarr = {"value":cityItem.id,"label":cityItem.name};
                                this.callbackArr7.push(xfarr);
                            }                           
                        })                                             
                    })                  
                });
                this.modelCounty = curVal[3][0];
                this.modelfq = curVal[4];
                this.modelhx = curVal[5];
                this.modeldxpp = curVal[6];
                this.modelkeyword = curVal[7];
            },
            keyWord(curVal,oldVal){
                if(curVal.length==0){
                    this.keyShow = false;
                }else{                   
                    api.tagsList({"type":7,"title":curVal}).then(response => {
                        this.keywordList = response.data.data;
                        if(this.keywordList.length > 0){
                            this.keyShow = true;
                        }
                    });
                }
            }
        }
    }
</script>
<style scoped>
    .room {
        width: 120px;
        overflow: hidden;
        float: left;
        text-align: right;
        padding-right: 10px;
    }
    .roomList {
        width: 80%;
        overflow: hidden;
        float: left;
    }
    .keyHeight {
        height: 40px;
        padding-left: 45px;
    }
    .roomSelect {
        overflow: hidden;
        float: left;        
    }
    .roomContiner {
        width: 100%;
        overflow: hidden;
    }
    .labelreact {
        position: relative;
        width: 100%;
        height: 50px;
    }
    .positrelater {
        position: absolute;
        top: 50px;
        width: 200px;
        height: 200px;
        overflow: auto;
        background: #FFFFFF;
        z-index: 1000;
    }
    .positrelater li {
        list-style: none;
    }
    .selectLabel {
        width: 100%;
        overflow: hidden;
    }
    .selectLabel li {
        list-style: none;
        float: left;

        border: 1px solid #cccccc;
        padding-left: 5px;
        padding-right:5px; 
        margin-right: 5px;
    }
    .selectLabel li  .className {
        font-size: 12px;
        display: block;
        float: left;
    }
    .selectLabel li  .classClose {
        font-size: 30px;
        display: block;
        float: left;
    }
    .labeldxk {
        display: inline;
    }
    .roomKeyWorkContiner {
        width: 100%;

    }
    .keyWordClass {
        width: 100%;
        padding-left: 123px;
        position: relative;
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
    .keyWordList {
        width: 80%;
        overflow: hidden;
    }
</style>
