<template>

    <Modal @on-ok="ok('formValidate')" :loading="ModalLoading" @on-cancel="cancel" v-model="navVisible">

        <Tabs v-model="tabsValue" style="height:300px; margin-top:20px;">
            <TabPane label="链接地址" name="formValidate">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="url" prop="url">
                        <Input v-model="formValidate.url" placeholder="http://"></Input>
                    </FormItem>
                </form>
            </TabPane>
            <TabPane label="页面" name="formValidate1">
                <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1" :label-width="80">
                    <FormItem label="列表页" prop="columnUrl">
                        <Select v-model="formValidate1.url" style="width:200px">
                            <Option v-for="item in columnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </form>
            </TabPane>
            <TabPane label="详情" name="formValidate2">
                <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="80">
                    <FormItem label="详情页" prop="url">
                        <Select v-model="formValidate2.url" style="width:200px">
                            <Option v-for="item in roomDetailList" :value="item.value" :key="item.value">{{ item.label
                                }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="详情页id" prop="id">
                        <Input v-model="formValidate2.id" placeholder="" style="width:100px;"></Input>
                    </FormItem>
                </form>
            </TabPane>
        </Tabs>

    </Modal>

</template>

<script>
export default {
    name: 'wys-img',
    props: ['isBlock', 'createUrl'],
    data () {
        return {
            ModalLoading: true,
            ruleValidate: {
                url: [
                    { required: true, message: '请输入URL', trigger: 'blur' }
                ]
            },
            ruleValidate1: {
                url: [
                    { required: true, message: '请选择列表页', trigger: 'change' }
                ]
            },
            ruleValidate2: {
                id: [
                    { required: true, message: '请输入ID', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请选择详情页', trigger: 'change' }
                ]
            },
            formValidate: {
                url: ''
            },
            formValidate1: {
                url: ''
            },
            formValidate2: {
                url: '',
                id: ''
            },
            isVisible: true,
            tabsValue: 'formValidate',
            navVisible: false,
            columnList: [
                {
                    value: 'http://m.bidewu.com/#/bj/list/secondHand',
                    label: '二手房列表'
                },
                {
                    value: 'http://m.bidewu.com/#/bj/list/rent',
                    label: '租房列表'
                },
                {
                    value: 'http://m.bidewu.com/#/bj/list/newHouse',
                    label: '新房列表'
                },
                {
                    value: 'http://m.bidewu.com/#/bj/lsit',
                    label: '小区列表'
                }
            ],
            roomDetailList: [
                {
                    value: 'http://m.bidewu.com/#/bj/details/secondHand?houseId=', // ?houseId=6431657
                    label: '二手房详情'
                },
                {
                    value: 'http://m.bidewu.com/#/bj/details/rent?rentId=', // ?rentId=FY369081&navIndex=2
                    label: '租房详情'
                },
                {
                    value: 'http://m.bidewu.com/#/bj/details/newHouse?newCode=', // ?newCode=11122587
                    label: '新房详情'
                },
                {
                    value: 'http://m.bidewu.com/#/bj/details/community?plotId=', // ?plotId=11111374
                    label: '小区详情'
                }
            ]
        };
    },
    methods: {
        cancel () {
            this.$emit('link-cancelEvent');
        },
        ok (name) {
            this.$refs[this.tabsValue].validate((valid) => {
                if (valid) {
                    this.$emit('link-okEvent', this.TransformUrl(this.tabsValue));
                    this.$Message.success('Success!');
                } else {
                    this.ModalLoading = false;
                    this.$nextTick(() => {
                        this.ModalLoading = true;
                    });
                    this.$Message.error('fail');
                }
            });
        },
        TransformUrl (tabsValue) {
            let returnUrl = {};
            returnUrl.urlType = tabsValue;
            if (this.$refs[tabsValue].model.id) {
                returnUrl.url = this.$refs[tabsValue].model.url;
                returnUrl.id = this.$refs[tabsValue].model.id;
            } else {
                returnUrl.url = this.$refs[tabsValue].model.url;
            }
            return returnUrl;
            // return this.tabsValue.url;
            // console.log(this.formValidate.url);
            // if (tabsValue === 'formValidate') {
            //     return this.formValidate.url;
            // }

            // if (tabsValue === 'formValidate1') {
            //     return this.formValidate1.url;
            // }
            // if (tabsValue === 'formValidate2') {
            //     return this.formValidate2.url + this.formValidate2.id;
            // }
        }
    },
    created: function () {
        if (this.createUrl.urlType) {
            this.tabsValue = this.createUrl.urlType;
        }
    },
    mounted () {
        if (this.createUrl.url) {
            this.$refs[this.tabsValue].model.url = this.createUrl.url;
        }
        if (this.createUrl.id) {
            this.$refs[this.tabsValue].model.id = this.createUrl.id;
        }
    },
    watch: {
        isBlock (curVal, oldVal) {
            this.navVisible = curVal;
        }
    }
};
</script>

<style scoped>
</style>