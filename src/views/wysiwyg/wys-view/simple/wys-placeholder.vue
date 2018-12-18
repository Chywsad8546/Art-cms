<template>
    <Form :label-width="60"
          class="imgWidthCont">

        <FormItem label="列数">
            <Select v-model="share.count"
                    @on-change="countchange">
                <Option :value="2"
                        :key="2">2</Option>
                <Option :value="3"
                        :key="3">3</Option>
                <Option :value="4"
                        :key="4">4</Option>
                <Option :value="5"
                        :key="5">5</Option>
            </Select>
        </FormItem>

    </Form>

</template>

<script>
export default {
    name: 'wys-placeholder',
    data () {
        return {
            share: {
                count: 2,
                ids: [],
                increase: 1,
                width: 50

            }
        };
    },
    methods: {
        countchange: function (val) {
            if (this.share.ids.length > val) {
                while (this.share.ids.length - val > 0) {
                    var id = this.share.ids.pop();
                    $('#' + id).remove();
                }
            } else if (this.share.ids.length < val) {
                while (val - this.share.ids.length > 0) {
                    this.share.increase += 1;
                    this.share.ids.push(this.$vnode.key + '-' + this.share.increase);
                }
            }
            if (this.share.count > 0) {
                this.share.width = parseInt(100 / this.share.count);
            }
        }
    },
    created: function () {
        this.countchange(this.share.count);
    },
    mounted () {
    }
};
</script>

<style scoped>
</style>


<stage-template>
</stage-template>
<stage-js-wys>
    if($t.children('ul').length<1){
        $t.append('<ul class="layout-container-table edit-page"></ul>');
    }

    <% for(var i = 0; i < share.ids.length; i++){ %>
    if($('#<%= share.ids[i] %>').length<1){
        <% if (i==0) { %>
            $('<li style="width:<%= share.width %>%" id="<%= share.ids[i] %>" class="snapshoot-box" id="<%= share.ids[i] %>" wys-container ></li>').prependTo($t.children('ul'));
        <% } %>
        <% if (i!=0) { %>
            $('<li style="width:<%= share.width %>%" id="<%= share.ids[i] %>" class="snapshoot-box" id="<%= share.ids[i] %>" wys-container ></li>').insertAfter($t.children('ul').children('li').eq(<%= i-1 %>));
        <% } %>
    }
    else{
        <% if (i==0) { %>
            $('#<%= share.ids[i] %>').css('width','<%= share.width %>%');
            $('#<%= share.ids[i] %>').prependTo($t.children('ul'));
        <% } %>
        <% if (i!=0) { %>
            $('#<%= share.ids[i] %>').css('width','<%= share.width %>%');
            $('#<%= share.ids[i] %>').insertAfter($t.children('ul').children('li').eq(<%= i-1 %>));
        <% } %>
    }
    <% } %>
</stage-js-wys>
<stage-javascript type="text/javascript">


</stage-javascript>
<stage-css>
.layout-container-table.edit-page {

}
.layout-container-table {
    display: -ms-flexbox;
    display: flex;
    position: relative;
    min-height: 50px;
    width: 100%;
}
.layout-container-table .snapshoot-box {
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    min-height: 50px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
    background: none;
    list-style: none;
    min-height: 40px!important;
}
.layout-container-table.edit-page .snapshoot-box~.snapshoot-box:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: #999;
}
</stage-css>