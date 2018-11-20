<template>
    <Form  :label-width="60" class="imgWidthCont">
    <Tabs>  
        <TabPane label="内容" >
                <Row class="navdhName"> 
                    <Col span="24">
                        <FormItem label="Select">
                            <Select v-model="share.formSelect">
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row> 
                    <Col span="24">
                        <div v-if="share.url != ''">
                            <span style="margin-right:10px;">链接到 {{share.url}}</span>
                            <a v-if="share.url != ''"  @click="share.navVisible = true">
                                编辑
                            </a>
                        </div>
                        <a class="btn" @click="newlyForm">
                            <Icon type="plus-round"></Icon>
                            新建表单
                        </a>
                    </Col>
                </Row>
                <Modal title="URL">
                    <FormItem  label="链接地址">
                        <Input v-model="share.url" placeholder="http://"></Input>
                    </FormItem>  
                </Modal>
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
                    formSelect:"",
                    navVisible:false,
                    url:"",
                    top:10,
                    right:15,
                    bottom:10,
                    left:15
                },
            };
        },
        methods: {
            newlyForm(){
                this.$router.push({
                    name: "newlybuildForm",
                   // query: { newsId: params.row.id }
                });
            }
        },
        created: function () {
        },
        mounted () {
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
    <section style="padding: {{@share.top}}px {{@share.right}}px {{@share.bottom}}px {{@share.left}}px;">
        <a href="http://{{@share.url}}" target="_blank" class="link style1">
            <span class="link-text">{{@share.name}}</span> 
        </a>
    </section>
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
    .link i {
        display: none;
        font-size: 14px;
    }
    .link.style1 i:first-child {
        display: inline;
    }

</stage-css>