<template>
<Form  :label-width="60" class="imgWidthCont">
    <Tabs>  
        <TabPane label="内容" >

                <FormItem label="宽度">
                    <Slider v-model="share.width" show-input></Slider>
                </FormItem>
                <FormItem label="高度">
                    <Slider v-model="share.height" show-input></Slider>
                </FormItem>
                <FormItem label="左">
                    <Slider v-model="share.left" show-input></Slider>
                </FormItem>
                <FormItem label="右">
                    <Slider v-model="share.right" show-input></Slider>
                </FormItem>
                 <FormItem label="颜色">
                    <ColorPicker v-model="share.backColor" style="margin-left:50px;" recommend />
                </FormItem>
                <Select v-model="share.lineType" style="width:200px; margin-left:30px; margin-bottom:300px">
                    <Option value="solid">实线</Option>
                    <Option value="dashed">虚线</Option>
                    <Option value="dotted">点线</Option>
                </Select>
        </TabPane>
    </Tabs>
</Form>
</template>
<script>

    export default {
        name: 'wys-img',
        data() {
            return {
                share:{
                    width:100,
                    height:22,
                    left:15,
                    right:15,
                    backColor:"#000000",
                    navVertical:"navitem0",
                    lineType:"solid",
                    navigatList:[
                        {name:"导航1",url:"",navVisible:false},
                        {name:"导航2",url:"",navVisible:false},
                        {name:"导航3",url:"",navVisible:false},
                        {name:"导航4",url:"",navVisible:false},
                    ]
                },
            };
        },
        methods: {
            removeNavigat(item){
                let index = this.share.navigatList.indexOf(item);
                this.share.navigatList.splice(index,1);
            },
            addUrl(item){
                item.navVisible = true;
            },
            addNaviPush(){
                this.share.navigatList.push({name:"新导航",url:"",navVisible:false});
            }
        },
        created: function () {
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
<div id="{{@ brickid}}" class="pictureset-box">
  <section style="padding: 0 {{@share.right}}px 0 {{@share.left}}px;overflow: hidden;">
    <div class="wysiwygSeparator" style="width: {{@share.width}}%; margin-top: {{@share.height/2}}px; margin-bottom: {{@share.height/2}}px; border-style: {{@share.lineType}}; border-color: {{@share.backColor}};"></div>
  </section>
</div>
</stage-template>
<stage-javascript type="text/javascript">

</stage-javascript>
<stage-css>
.wysiwygSeparator {
    height: 0;
    border-width: 0;
    border-top: 1px solid #e8e8e8;
    margin: 0 auto;
}
</stage-css>