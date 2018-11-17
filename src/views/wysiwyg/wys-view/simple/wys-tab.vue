<template>
       <Form  :label-width="60" class="imgWidthCont">
    <Tabs>  
        <TabPane label="内容" >
            <div v-for="item,index in share.tabList" v-dragging="{ item: item, list: share.tabList, group: 'item' }" @click="navClick(item)">
                <Row class="navdhFont">
                    <Col span="12">Tab{{index+1}}</Col>
                    <Col span="12" style="text-align:right;"><Icon @click.native="removeNavigat(item)" type="trash-a"></Icon></Col>
                </Row>
                <Row class="navdhName"> 
                    <Col span="24">
                        <FormItem  label="名称">
                            <Input v-model="item.name"></Input>
                        </FormItem>  
                    </Col>
                </Row>
            </div>
            <Button style="width:280px; margin-top:20px;" @click="addNaviPush()"><Icon type="plus-round" style="margin-right:10px;"></Icon>点击添加</Button>
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
                    tabCount:2,
                    increase:1,
                    tabListDomid:"",
                    tabDomid:"",
                    isDel:false,
                    tabList:[
                        // {name:"Tab1",url:"",navVisible:false},
                        // {name:"Tab2",url:"",navVisible:false},
                    ]
                },
            };
        },
        methods: {
            removeNavigat(item){
                if($("#"+item.id).attr("class").indexOf("cur") > 0){
                     this.$Message.error('当前选中对象不能删除');
                     return false;
                }
                $("#"+item.id).remove();
                $("#"+item.cid).remove();
                let index = this.share.tabList.indexOf(item);
                this.share.tabList.splice(index,1);
                this.share.isDel = true;
            },
            addUrl(item){
                item.navVisible = true;
            },
            addNaviPush(){
                this.share.isDel = true;
                this.share.increase += 1;
                this.share.tabCount += 1;
                this.share.tabList.push({id:this.$vnode.key+'-'+this.share.increase,cid:'con-'+this.$vnode.key+'-'+this.share.increase,name:"新导航",url:"",navVisible:false});
            },
            navClick(item){
                this.share.isDel = false;
                this.share.tabDomid = item.id;
                this.share.tabListDomid = item.cid;
            },
            tabCreatpush:function () {
               for (let index = 0; index < this.share.tabCount; index++) {
                    this.share.increase += 1;
                    this.share.tabList.push({id:this.$vnode.key+'-'+this.share.increase,cid:'con-'+this.$vnode.key+'-'+this.share.increase,name:"Tab"+index,url:"",navVisible:false});
               }
               this.share.tabDomid = this.share.tabList[0].id;
               this.share.tabListDomid = this.share.tabList[0].cid;
               this.share.isDel = false;
            }
        },
        created: function () {
            this.tabCreatpush();
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
</stage-template>

<stage-js-wys>
    if(!<%= share.isDel %>){
        $t.children(".wys-nav-List").children(".nav-inner").find(".nav-item").removeClass("cur");
        $t.children(".tabDivList").find(".tabContainer").hide();
    }
    for(var i=0; i<$t.children(".wys-nav-List").children(".nav-inner").find(".nav-item").length; i++){
        if($($t.children(".wys-nav-List").children(".nav-inner").find(".nav-item")[i]).attr("id") == "<%= share.tabDomid %>"){
            $($t.children(".wys-nav-List").children(".nav-inner").find(".nav-item")[i]).addClass("cur");
        }
    }
    for(var i=0; i<$t.children(".tabDivList").find(".tabContainer").length; i++){
        if($($t.children(".tabDivList").find("div")[i]).attr("id") == "<%= share.tabListDomid %>"){
            $($t.children(".tabDivList").find("div")[i]).show();
        }
    }
    for(var i=0; i<$t.children(".tabDivList").find("div").length; i++){
        if($($t.children(".tabDivList").find("div")[i]).attr("id") == "<%= share.tabListDomid %>"){
            $($t.children(".tabDivList").find("div")[i]).show();
        }
    }
    if($t.children('div').length<2){
        $t.append('<div class="wys-nav-List navitem1"><ul class="nav-inner"></ul></div>');
        $t.append('<div class="tabDivList"></div>');
    }
    <% for(var i = 0; i < share.tabList.length; i++){ %>
    if($('#<%= share.tabList[i].id %>').length<1){
            <% if (i==0) { %>
                $('<li id="<%= share.tabList[i].id %>" class="cur nav-item"><%= share.tabList[i].name %></li>').prependTo($t.children().children('ul'));        
                $('<div id="<%= share.tabList[i].cid %>" class="tabContainer" wys-container></div>').prependTo($t.children(".tabDivList"));
            <% } %>
            <% if (i!=0) { %>
                 $('<li id="<%= share.tabList[i].id %>" class="nav-item"><%= share.tabList[i].name %></li>').insertAfter($t.children().children('ul').children('li').eq(<%= i-1 %>));
                 $('<div id="<%= share.tabList[i].cid %>"  class="tabContainer" wys-container></div>').insertAfter($t.children(".tabDivList").children('div').eq(<%= i-1 %>)).hide();
            <% } %>
    }
    else{
        <% if (i==0) { %>
           $('#<%= share.tabList[i].id %>').html('<%= share.tabList[i].name %>');
        <% } %>
        <% if (i!=0) { %>
            $('#<%= share.tabList[i].id %>').html('<%= share.tabList[i].name %>');
        <% } %>
    }
    <% } %>
</stage-js-wys>

<stage-javascript type="text/javascript">
    $($t.children(".wys-nav-List").children(".nav-inner")).on("click","li",function(){
        $t.children(".wys-nav-List").children(".nav-inner").find(".nav-item").removeClass("cur");
        $t.children(".tabDivList").find(".tabContainer").hide();
        $(this).addClass("cur");
        $("#con-"+$(this).attr("id")).show();
    });
</stage-javascript>


<stage-css>
    .tabDivList {
        width:100%;
        overflow: hidden;
    }
    .tabDivList .tabContainer {
        min-height:200px;
    }
    .wys-nav-List {
        cursor: pointer;
        position: relative;
        height: 46px;
        line-height: 46px;
        text-align: center;
        background-color: #fff;
        width:100%;
        overflow-x: auto;
    }
    .wys-nav-List .nav-inner {
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
    .navitem0 .cur  {
        background-color: #f85959;
        border-radius: 12px;
        color: #fff;
    }
    .navitem1 .cur {
        line-height: 44px;
        height: 44px;
        color: #f85959;
        border-bottom: 2px solid #f85959;
    }
    .navitem2 .cur  {
        color: #f85959;
    } 
</stage-css>