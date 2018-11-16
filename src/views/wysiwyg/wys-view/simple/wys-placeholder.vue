<template>
    <Form  :label-width="60" class="imgWidthCont">


                <FormItem label="列数" >
                    <Select v-model="share.count" @on-change="countchange">
                        <Option  :value="2" :key="2">2</Option>
                        <Option  :value="3" :key="3">3</Option>
                        <Option  :value="4" :key="4">4</Option>
                        <Option  :value="5" :key="5">5</Option>
                    </Select>
                </FormItem>





    </Form>



</template>

<script>

    export default {
        name: 'wys-placeholder',
        data() {
            return {
                share:{
                    count:0,
                    ids:[],
                    increase:1,
                    width:0
                }
            };
        },
        methods: {
            countchange:function (val) {
                console.log(val)
                if(this.share.ids.length>val){
                    while (this.share.ids.length - val >0){
                        console.log(this.share.ids)
                        var id=this.share.ids.pop();
                        $('#'+id).remove();
                    }
                }
                else if(this.share.ids.length<val){
                    while (val - this.share.ids.length>0){
                        this.share.increase += 1;
                        this.share.ids.push(this.$vnode.key+'-'+this.share.increase);
                    }
                }
                if(this.share.count>0){
                    this.share.width = parseInt(100/this.share.count);
                }


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

</style>


<stage-template>

</stage-template>
<stage-js-wys>
    if($t.children('table').length<1){
    $t.append('<table class="bk"><tr class="wys-placeholder-tr"></tr></table>');
    }
    <% for(var i = 0; i < share.ids.length; i++){ %>
    if($('#<%= share.ids[i] %>').length<1){
        <% if (i==0) { %>
            $('<td id="<%= share.ids[i] %>" wys-container width="<%= share.width %>%" height="height: 30px"></td>').insertAfter($t.find('.wys-placeholder-tr').children('td').eq(<%= i %>));
        <% } %>
        <% if (i!=0) { %>
            $('<td id="<%= share.ids[i] %>" wys-container width="<%= share.width %>%" height="height: 30px"></td>').prependTo($t.find('.wys-placeholder-tr'));
        <% } %>

    }
    else{
        <% if (i==0) { %>
            $('#<%= share.ids[i] %>').prependTo($t.find('.wys-placeholder-tr'));
        <% } %>
        <% if (i!=0) { %>
            $('#<%= share.ids[i] %>').insertAfter($t.find('.wys-placeholder-tr').children('td').eq(<%= i-1 %>));
        <% } %>

    }

    <% } %>
</stage-js-wys>
<stage-javascript type="text/javascript">


</stage-javascript>
<stage-css>
    .bk td {
    border:1px solid red;
    }

</stage-css>