<template>
       <Form  :label-width="60" class="imgWidthCont">
    <Tabs>  
        <TabPane label="内容" >
                <Row class="navdhName"> 
                    <Col span="24">
                        <FormItem  label="名称">
                            <Input v-model="share.name"></Input>
                        </FormItem>  
                    </Col>
                </Row>
                <Row> 
                    <Col span="24">
                        <a class="btn" @click="share.navVisible = true">
                            <Icon type="plus-round"></Icon>
                            添加链接
                        </a>
                    </Col>
                </Row>
                <Modal title="URL" v-model="share.navVisible">
                    <FormItem  label="链接地址" v-if="share.navVisible">
                        <Input v-model="share.url"></Input>
                    </FormItem>  
                </Modal>
        </TabPane>
        <TabPane label="样式">
            <RadioGroup v-model="share.navVertical" vertical>
                <Radio label="navitem0" style="height:50px;">
                    <img src="http://wap-qn.toutiaofangchan.com/adideas/52b561fe138a4bb4a3161e8c3a78ec01.png"/>
                </Radio>
                <Radio label="navitem1" style="height:50px;">
                    <img src="http://wap-qn.toutiaofangchan.com/adideas/255342d0548b41e3b77173072bcd5604.png"/>
                </Radio>
                <Radio label="navitem2" style="height:50px;">
                    <img src="http://wap-qn.toutiaofangchan.com/adideas/c134232654ef427584d8622af6e9e519.png"/>
                </Radio>
                <Radio label="navitem3" style="height:50px;">
                    <img src="http://wap-qn.toutiaofangchan.com/adideas/534d8cb8bbfa448cb0ca3a7de65f73f6.png"/>
                </Radio>
            </RadioGroup>
            <!-- 
            <FormItem label="顶">
                <Slider v-model="share.imgTop" show-input></Slider>
            </FormItem>
                <FormItem label="右">
                <Slider v-model="share.imgRight" show-input></Slider>
            </FormItem>
                <FormItem label="底">
                <Slider v-model="share.imgBottom" show-input></Slider>
            </FormItem>
                <FormItem label="左">
                <Slider v-model="share.imgLeft" show-input></Slider>
            </FormItem> -->
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
                    name:"链接文字",
                    navVisible:false,
                    url:""
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
    <a href="javascript:void(0);" target="_blank" class="link style0">
        <i class=""></i> 
        <span class="link-text">{{@share.name}}</span> 
        <i class="icon-left_arrow"></i>
    </a>
</div>
</stage-template>
<stage-javascript type="text/javascript">

</stage-javascript>
<stage-css>
    .link {
        display: block;
        cursor: pointer;
        font-size: 16px;
        line-height: 22px;
        word-wrap: break-word;
        word-break: break-all;
    }
</stage-css>