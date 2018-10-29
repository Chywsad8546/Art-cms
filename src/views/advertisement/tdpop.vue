<template>

    <span>

            <Button v-if="!ideaCode && !ispre" type="ghost" shape="circle" icon="ios-plus-empty" @click="callparent"></Button>
            <Poptip v-if="ideaCode" trigger="hover" >
                <span  @click="cancel" :style="{cursor:'pointer',color:'#ffffff',width:'50px',textOverflow:'ellipsis',display:'inline-block','whiteSpace':'nowrap'}" >{{adName}}</span>
                <div slot="title"><i style="color:#000000">甲方公司:{{adCompany}}</i></div>
                <div slot="content">
                    <p style="color:#000000">广告计划:{{planName}}</p>
                    <p><a @click="goto">创意名称:{{adName}}</a></p>
                </div>
            </Poptip>
    </span>

</template>

<script>
    import moment from 'moment';
    import fapi from '../../api/advertisement/formtemplateApi.js';
    export default {
        name: 'tdpop',
        props: {
            planName: '',
            adCompany: String,
            adName: String,
            // "endtime":"2018-10-04 00:00:00+08",
            ideaCode: String,
            isPay: Boolean,
            positionId: '',
            // "startime":"2018-10-02 00:00:00+08",
            status: Boolean,
            day: String,
            schedulingId:''
            // xuanzhong:Boolean
        },
        data() {
            return {
                isxuanzhong: this.xuanzhong,
                ispre: moment(this.day, 'YYYY-MM-DD').isBefore(moment(0, 'HH'))
            };
        },
        methods: {
            callparent() {
                if (!this.ispre) {
                    this.$emit('changepaiqi', this.ideaCode, this.adName, this.positionId, this.day, true);
                }
            },
            cancel() {
                if (!this.ispre) {
                    this.$Modal.confirm({
                        title: '是否删除排期',
                        content: '<p>是否删除排期</p>',
                        onOk: () => {
                            console.log('schedulingId',this.schedulingId)
                            fapi.deleteSchedulingById({schedulingId: this.schedulingId}).then(response => {
                                if (response.data.data === '成功') {
                                    this.$Message.success('删除成功！');
                                    this.$emit('changepaiqi', this.ideaCode, this.adName, this.positionId, this.day, false);
                                }
                            }).catch(error => {
                            });
                        },
                        onCancel: () => {
                        }
                    });
                }

            },
            goto() {
                this.$router.push({name: 'ad_redirect', query: {id: this.ideaCode}});
            }
        }

    };
</script>

<style scoped>

</style>