<template>
    <Tabs>
        <TabPane label="内容" >
            <Form  :label-width="80" >
                <FormItem label="" prop="title">
                    <Upload class="uploadWidth" action="cmsapi/upload/uploadimgNoDomainExt"   :format="['jpg','jpeg','png']" :on-success="uploadSuccess"
                            :on-format-error="uploadFormatError"
                            :show-upload-list="false">
                        <Button type="ghost" >添加图片</Button>
                    </Upload>
                </FormItem>
                 <FormItem label="顶">
                    <Slider v-model="share.value8" show-input></Slider>
                </FormItem>
                 <FormItem label="右">
                    <Slider v-model="share.value8" show-input></Slider>
                </FormItem>
                 <FormItem label="底">
                    <Slider v-model="share.value8" show-input></Slider>
                </FormItem>
                 <FormItem label="左">
                    <Slider v-model="share.value8" show-input></Slider>
                </FormItem>
            </Form>
        </TabPane>

    </Tabs>

</template>

<script>

    export default {
        name: 'wys-img',
        data() {
            return {
                share:{
                    value8: 25,
                    image:'http://wap-qn.toutiaofangchan.com/tpzw_image.png'
                }
            };
        },
        methods: {
            uploadSuccess (res, file) {
                if (res.code === 'success') {
                    this.share.image = this.$imgurl(res.data.url);
                }
                else {
                    this.$Notice.error({
                        title: '上传失败',
                        desc: res.data.url
                    });
                }
            },
            uploadFormatError(file) {
                this.$Notice.error({
                    title: '不能上传此格式的文件',
                    desc: ''
                });
            },
        },
        created: function () {
            // console.log('created',this.$options.customOption,this.$options.wysdocs,this.$options) // => 'foo'
        }
    };
</script>

<style scoped>
.uploadWidth button {
    width: 300px;

}
</style>

<stage-template>
    <img id="{{@ brickid}}" src="{{@ image}}" />

</stage-template>
<stage-javascript type="text/javascript">

</stage-javascript>
