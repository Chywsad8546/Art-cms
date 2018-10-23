<template>
    <Tabs>
        <TabPane label="内容" >
            <Form  :label-width="80" >

                <FormItem label="" prop="title">
                    <Upload action="cmsapi/upload/uploadimgNoDomainExt"   :format="['jpg','jpeg','png']" :on-success="uploadSuccess"
                            :on-format-error="uploadFormatError"
                            :show-upload-list="false">
                        <Button type="ghost" icon="ios-cloud-upload-outline">设置图片</Button>
                    </Upload>
                </FormItem>

                <!--<FormItem label="推送状态" prop="isPush">-->
                    <!--<Select v-model="searchData.isPush" >-->
                        <!--<Option value="0">未推送</Option>-->
                        <!--<Option value="1">推送成功</Option>-->
                        <!--<Option value="2">推送失败</Option>-->
                    <!--</Select>-->
                <!--</FormItem>-->


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

</style>

<stage-template>
    <img id="{{@ brickid}}" src="{{@ image}}" />

</stage-template>
<stage-javascript type="text/javascript">
    alert($('#{{@ brickid}}').length)
</stage-javascript>