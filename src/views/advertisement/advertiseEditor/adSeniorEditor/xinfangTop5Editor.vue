<template>
    <Row>
        <Col span="24">


                <Form ref="form" :model="{share:share,formItem:formItem}" :rules="ruleValidate" :label-width="80">
                    <FormItem label="楼盘名称" required prop="share.adCompany">
                        <Input v-model="share.adCompany" placeholder="请填写内容"></Input>
                    </FormItem>
                    <FormItem label="创意名称" required prop="formItem.adName">
                        <Input v-model="formItem.adName" placeholder="请填写内容"></Input>
                    </FormItem>

                </Form>
        </Col>
    </Row>
</template>
<stage-template>
    {{@ share.adCompany}}

</stage-template>
<script>
    export default {
        name: 'xinfang-top5-editor',
        data() {
            return {
                share: {
                    adCompany: ''
                },
                formItem: {
                    adName: ''
                },
                ruleValidate: {
                    'share.adCompany': [
                        {required: true, message: '请填写', trigger: 'blur'}
                    ],
                    'formItem.adName': [
                        {required: true, message: '请填写', trigger: 'blur'}
                    ]
                }

            };
        },
        methods: {
            // save() {
            //     this.$refs['form'].validate((commvalid) => {
            //         console.log('commvalid',commvalid);
            //     });
            // }
        }
    };
</script>

<style scoped>

</style>