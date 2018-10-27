<template>

    <span>
        <!--<span v-if="xuanzhong">-->
            <!--<Button type="success" shape="circle" icon="checkmark-circled" @click="cancel"></Button>-->
        <!--</span>-->
        <!--<span v-if="!xuanzhong">-->
            <Poptip v-if="ideaCode" trigger="hover" >
                <span   :style="{cursor:'pointer',color:'#ffffff',width:'50px',textOverflow:'ellipsis',display:'inline-block','whiteSpace':'nowrap'}" >{{adName}}</span>
                <div slot="title"><i style="color:#000000">甲方公司:{{adCompany}}</i></div>
                <div slot="content">
                    <p style="color:#000000">广告计划:{{planName}}</p>
                    <p><a @click="goto">创意名称:{{adName}}</a></p>
                </div>
            </Poptip>
        <!--</span>-->
    </span>

</template>

<script>
    import moment from 'moment';
    export default {
        name: 'tdpop',
        props: {
            planName:'',
            adCompany: String,
            adName: String,
            // "endtime":"2018-10-04 00:00:00+08",
            ideaCode: String,
            isPay: Boolean,
            positionId: '',
            // "startime":"2018-10-02 00:00:00+08",
            status: Boolean,
            day: String
            // xuanzhong:Boolean
        },
        data() {
            return {
                isxuanzhong: this.xuanzhong,
                ispre: moment(this.day, 'YYYY-MM-DD').isBefore(moment(0, "HH"))
            };
        },
        methods: {
            callparent() {
                if (!this.ispre) {
                    this.$emit('changepaiqi', this.ideaCode, this.adName, this.positionId, this.day, true);
                }
            },
            cancel() {
                this.$emit('changepaiqi', this.ideaCode, this.adName, this.positionId, this.day, false);
            },
            goto() {
                this.$router.push({name: 'ad_redirect', query: {id: this.ideaCode}});
            }
        }

    };
</script>

<style scoped>

</style>