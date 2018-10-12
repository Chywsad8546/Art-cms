<template>
    <div>
            <div class="articlezjcontentPopup">
                <div class="timingclassfb">定时发表</div>
                <div style="padding-left:80px">
                    请选择发表时间：
                    <Select v-model="dateValue"  style="width:100px">
                        <Option v-for="item in dateoptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="timeValue" style="width:100px">
                        <Option v-for="item in timeoptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>时
                    <Select v-model="branchValue"  style="width:100px">
                        <Option v-for="item in branchoptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>分
                </div>
                <p>(只能选择2小时-7天范围内的时间)</p>    
                <p>本文将于 {{stryear}} 年 {{dateExhibition}} {{timeValue > 9  ? timeValue : "0"+timeValue}}:{{branchValue > 9 ? branchValue : "0"+branchValue }} 发表  </p>                  
                <div class="botton">
                    <Button type="primary" @click="confirmxz()">确定</Button>
                    <Button @click="cancelFun()">取消</Button>
                </div>
            </div>  
            <div class="articlezjPopupBack" @click="uploadImg"></div>
    </div>  
</template>


<script>
     export default {
        props: {
            
        },
        data () {
            return {
                dateoptions: [],
                timeoptions: [],
                branchoptions: [],
                    dateValue: '',
                    timeValue: 0,
                    branchValue: 0,
                    dateExhibition: "0",
                    stryear: "",
                    dateArr: []
            }
        },
        created() {
            
            this.getMySplitDate();
            this.stryear = this.dateArr[0].strYear;
            let stryear = this.dateArr[0].strYear;//年份
            let strMonth = this.dateArr[0].strMonth;//月份
            let strmyDate = this.dateArr[0].strmyDate;//日
            for(let i = 0;i < 7; i++){
                this.dateoptions.push({"value":strMonth+"/"+(strmyDate+i),"label":strMonth+"月"+(strmyDate+i)+"日"});
            }
            for(let k=0;k<24;k++){
                this.timeoptions.push({"value":k,"label":k});
            }
            for(let j=0;j<60;j++){
                this.branchoptions.push({"value":j,"label":j});
            }
            this.dateValue = strMonth+"/"+strmyDate;
            this.forArrFun(strMonth+"/"+strmyDate);
        },
        methods: {
            confirmxz() {
                let callBackTime = this.stryear+"/"+this.dateValue+ " "+this.transformTime(this.timeValue)+":"+this.transformTime(this.branchValue);
                this.$emit("confirm-event",callBackTime);
            },
            transformTime(time) {
                let strTime = time>9 ? time : "0"+time;
                return strTime;
            },
            cancelFun() {
                this.$emit("cancel-event","");
            },
            uploadImg() {
                this.$emit("cancel-event","");
            },
            dateEvent(selVal) {
                this.forArrFun(selVal);
            },
            forArrFun(selVal) {            
                let self = this;
                this.dateoptions.forEach(function(obj){             
                    if(obj.value == selVal){
                       self.dateExhibition = obj.label;
                    }
                });
            },
            getMySplitDate(){
                let myDate = new Date();
                let strYear = myDate.getFullYear();
                let strMonth =  myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
                let strmyDate = myDate.getDate(); //获取当前日(1-31)
                let arr = {"strYear":strYear,"strMonth":strMonth,"strmyDate":strmyDate};
                this.dateArr.push(arr);
            }
        }
    }
</script>
<style scoped>
.el-form-item__label {
    width: 150px !important;
}
.timingclassfb {
    width: 100%;
    height: 80px;
    line-height: 80px;
    padding-left: 10px;
    font-size: 24px;
    border-bottom:1px solid #e0dada; 
}
.articlezjcontentPopup {
    background: #fff;
    width: 668px;
    height: 300px;
    z-index: 2200;
    top: 25%;
    left: 30%;
    border: 1px solid #cccccc;
    position: fixed;
}
.articlezjcontentPopup .botton {
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: absolute;
    bottom: 0;
    text-align: center;
}
.articlezjcontentPopup p{
    text-align: center
}
.uploadimg-list {
    overflow: hidden;
    list-style: none;
    padding: 0;
    border-radius: 4px;
}
.uploadimg-list li {
    float: left;
    width: 16.66%;
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    transition: color .15s linear;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
}
.uploadimg-list .checked:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0,0,0,.5);
    background-image: url("../img/pitchImg.png");
    -moz-background-size: 40px 40px;
    background-size: 40px 40px;
    background-position: 100% 0;
    background-repeat: no-repeat;
    text-align: center;
    color: #fffacd;
}
.uploadimg-list li img {
    width: 100%;
}
.popupUploadImg {
    width: 100%;
    height: 100PX;
    position: absolute;
    top: 50%;
    margin-top: -50px;
    left: 0;
    right: 0;
    text-align: center;
}
.popupUploadImg p{
    line-height: 50px;
    color: #333;
}
.articlezjPopupBack {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2100;
    opacity: .5;
    background: #000;
}
</style>
