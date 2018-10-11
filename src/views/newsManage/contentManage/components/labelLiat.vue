<template>
    <div>
            <div class="labelreact">
                <el-input style="width:200px" ref="labelInput" v-model="labelName" placeholder="请输入2-6个字"></el-input>
                <ul class="positrelater" v-show="isshow">
                    <li v-for="assns,index in assnArr" @click="selectclLabel(assns)">{{assns.title}}</li>
                </ul>
            </div>
            <div class="selectLabel">
                <ul>
                    <li v-for="labelList,index in labelArrList"><div class="labelLi"><span class="className">{{labelList}}</span><span @click="closeLabel(index)" class="classClose">×</span></div></li>
                    <!-- <li><div class="labelLi"><span class="className">标签2</span><span class="classClose">×</span></div></li> -->
                </ul>
            </div>
    </div>  
</template>


<script>
     import api from '../../../../api/news/index.js';
     export default {
        props: {
            
        },
        data () {
            return {
                labelArrList:[],
                labelArrNum:[],
                labelName:"",
                isshow: false,
                assnArr:[],
                labelCallArr:[{"arr1":"","arr2":""}]
            }
        },
        created() {

        },
        methods: {
            selectclLabel(obj) {
                this.isshow = false;
                this.labelArrList.push(obj.title);
                this.labelArrNum.push(obj.id);
                this.labelCallArr[0].arr1 = this.labelArrList;
                this.labelCallArr[0].arr2 = this.labelArrNum;
                //this.labelCallArr.push({"arr1":this.labelArrList,"arr2":this.labelArrNum});
                this.$emit("labelArr-event",this.labelCallArr);
            },
            closeLabel(index) {
                this.labelArrList.splice(index, 1);
                this.labelArrNum.splice(index,1);
                this.labelCallArr[0].arr1 = this.labelArrList;
                this.labelCallArr[0].arr2 = this.labelArrNum;
                this.$emit("labelArr-event",this.labelCallArr);
            },
            newsTagsList() {
                api.newsTagsList().then(response => {
                    this.assnArr = response.data.data;
                    console.log("response",response.data.data);
                }).catch(response => {
                    this.$Notice.warning({
                        title: "标签获取失败"
                    });
                })
            }
        },
        watch:{
            labelName:function(val, oldVal){
                if(val.length==0){
                    this.isshow = false;
                }else{
                    this.isshow = true;
                    this.newsTagsList();
                }
            }
        }
    }
</script>
<style scoped>
    .labelreact {
        position: relative;
        width: 200px;
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
</style>
