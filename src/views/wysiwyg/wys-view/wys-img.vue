<template>
    <Row class="margin-top-10 searchable-table-con1">
        <Form  ref="searchData" :model="searchData" inline :label-width="120">

            <Upload id="iviewUp" action="/cmsapi/sys/uploadImg" :on-success="successPreview">
                <i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
            </Upload>

        </Form>
    </Row>
</template>

<script>

    export default {
        name: 'wys-img',
        data() {
            return {
                name: 'name123',
                age: 'age123',
                searchData: {
                    title: 'title123',
                    isPush: '0'
                },
                share:{
                    loadimg:""  
                }
            };
        },
        methods: {
            successPreview(file) {
                this.share.loadimg = file.data;
            },
        },
        created: function () {
            // console.log('created',this.$options.customOption,this.$options.wysdocs,this.$options) // => 'foo'
        }
    };
</script>

<style scoped>
.abc {
    overflow: hidden;

}
</style>

<stage-template>
   <div style="width:375px;overflow: hidden;">
        <img style="width:100%" src="{{@share.loadimg}}"/>
   </div>
</stage-template>
