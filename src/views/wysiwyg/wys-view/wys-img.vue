<template>
    <Row class="margin-top-10 searchable-table-con1">
        <Form  ref="searchData" :model="searchData" inline :label-width="120">
            <FormItem label="消息标题" prop="title">
                <Input v-model.trim="searchData.title" style="width:140px"></Input>
            </FormItem>

            <FormItem label="推送状态" prop="isPush">
                <Select v-model="searchData.isPush" style="width:140px">
                    <Option value="0">未推送</Option>
                    <Option value="1">推送成功</Option>
                    <Option value="2">推送失败</Option>
                </Select>
            </FormItem>


        </Form>


    </Row>
</template>

<script>
    import component_stage from '../wys-conf/component-stage';
    export default {
        name: 'wys-img',
        customOption: 'foo',
        data() {
            return {
                name: 'name123',
                age: 'age123',
                searchData: {
                    title: 'title123',
                    isPush: '0'
                }
            };
        },
        created: function () {
            // console.log('created',this.$options.customOption,this.$options.wysdocs,this.$options) // => 'foo'
        },
        watch: {
            // 如果 `question` 发生改变，这个函数就会运行
            $data: {
                handler: function (val, oldVal) {
                    component_stage.render(val,this.$options.wys_stageTemplate);
                },
                deep: true
            }
    
        }
    };
</script>

<style scoped>

</style>

<stage-template>
    "zjl'qq"{{@ name }}
    console.log('测试啊');{{@ searchData.title }}
</stage-template>