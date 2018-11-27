<template>
    <Form :label-width="60" class="imgWidthCont">
        <Tabs>
            <TabPane label="内容">
                <FormItem label="列数">
                    <Select v-model="share.colNum" style="width:200px; margin-left:30px; margin-bottom:300px">
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                    </Select>
                </FormItem>
            </TabPane>
        </Tabs>
    </Form>
</template>
<script>

export default {
    name: 'wys-layout',
    data () {
        return {
            share: {
                colNum: '1'
            }
        };
    },
    methods: {
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
<div id="{{@ brickid}}" class="pictureset-box">

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