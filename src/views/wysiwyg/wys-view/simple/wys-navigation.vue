<template>
       <Form  :label-width="60" class="imgWidthCont">
    <Tabs>  
        <TabPane label="内容" >
            <div v-for="item,index in share.navigatList" v-dragging="{ item: item, list: share.navigatList, group: 'item' }">
                <Row class="navdhFont">
                    <Col span="12">导航{{index+1}}</Col>
                    <Col span="12" style="text-align:right;"><Icon @click.native="removeNavigat(item)" type="trash-a"></Icon></Col>
                </Row>
                <Row class="navdhName"> 
                    <Col span="24">
                        <FormItem  label="名称">
                            <Input v-model="item.name"></Input>
                        </FormItem>  
                    </Col>
                </Row>
                <Row style="padding-bottom:10px;">  
                    <Col span="24">
                        <div v-if="item.url != ''">
                            <span style="margin-right:10px;">链接到 {{item.url}}</span>
                            <a v-if="item.url != ''"  @click="item.navVisible = true">
                                编辑
                            </a>
                        </div>
                        <a v-if="item.url == ''" class="btn" @click="addUrl(item)">
                            <Icon type="plus-round"></Icon>
                            添加链接
                        </a>
                    </Col>
                </Row>
                <Modal title="URL" v-model="item.navVisible">
                    <FormItem  label="链接地址" v-if="item.navVisible">
                        <Input v-model="item.url"></Input>
                    </FormItem>  
                </Modal>
            </div>
            <Button style="width:280px; margin-top:20px;" @click="addNaviPush(item)"><Icon type="plus-round" style="margin-right:10px;"></Icon>点击添加</Button>
        </TabPane>
        <TabPane label="样式">
            <RadioGroup v-model="share.navVertical" vertical>
                <Radio label="navitem0" style="height:100px;">
                    <img src="http://wap-qn.toutiaofangchan.com/adideas/9fa493ff2d81473393c5bb948355aef5.png"/>
                </Radio>
                <Radio label="navitem1" style="height:100px;">
                    <img src="http://wap-qn.toutiaofangchan.com/adideas/424fa92804284d0eb247644705cde7b0.png"/>
                </Radio>
                <Radio label="navitem2" style="height:100px;">
                    <img src="http://wap-qn.toutiaofangchan.com/adideas/590d1f5447c0441286150378e3b4d494.png"/>
                </Radio>
            </RadioGroup>
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
            </FormItem>
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
                    imgTop:0,
                    imgRight:0,
                    imgBottom:0,
                    imgLeft:0,
                    navVertical:"navitem0",
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
        mounted() {
            this.$dragging.$on('dragged', ({ value }) => {
                console.log(value.item)
                console.log(value.list)
                console.log(value.group)
            });
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
<div  class="pictureset-box">
    <section style="padding: {{@share.imgTop}}px {{@share.imgRight}}px {{@share.imgBottom}}px {{@share.imgLeft}}px;">
        <div class="wys-nav-List {{@share.navVertical}}">
            <ul class="nav-inner">
                {{each share.navigatList}}
                    {{if $index==0}}
                        <li class="cur nav-item"><a href="http://{{$value.url}}" >{{$value.name}}</a><i class="line"></i></li>
                        {{else}}
                         <li class="nav-item"><a href="http://{{$value.url}}">{{$value.name}}</a><i class="line"></i></li>
                    {{/if}}
                {{/each}}
            </ul>
        </div>
    </section>
</div>
</stage-template>
<stage-javascript type="text/javascript">
    $t.children().children().children().on("click","li",function(){
        $($t.children().children().children()).find("li").removeClass("cur");
        $(this).addClass("cur");
    });
</stage-javascript>
<stage-css>

    .wys-nav-List {
        cursor: pointer;
        position: relative;
        height: 46px;
        line-height: 46px;
        text-align: center;
        background-color: #fff;
    }
    .wys-nav-List .nav-inner {
        border-top: 1px solid #f4f5f6;
        border-bottom: 2px solid #f85959;
        margin: 0;
        padding: 0;
        height: 46px;
        display: -webkit-box;
        -webkit-box-align: center;
    }
    .wys-nav-List .nav-item {
        position: relative;
        vertical-align: top;
        display: block;
        -webkit-box-flex: 1;
        width: 1px;
        padding-right: 15px;
    }
    .wys-nav-List .line {
        display: inline-block;
        vertical-align: middle;
        height: 14px;
        line-height: 14px;
        border-right: 1px solid #222;
        position: absolute;
        right: 7px;
        top: 50%;
        margin-top: -6px;
    }
    .wys-nav-List .nav-item a {
        color: #222;
        font-size: 14px;
        display: block;
        width: 100%;
        line-height: 24px;
        height: 24px;
        vertical-align: middle;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        box-sizing: border-box;
    }
    .navitem0 .cur a {
        background-color: #f85959;
        border-radius: 12px;
        color: #fff;
    }
    .navitem1 .cur a {
        line-height: 44px;
        height: 44px;
        border-bottom: 2px solid #f85959;
    }
    .navitem2 .cur a {
        color: #f85959;
    } 
</stage-css>