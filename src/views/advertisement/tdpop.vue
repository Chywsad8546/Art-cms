<template>
    <span>
        <Button v-if="!ideaCode" type="ghost" shape="circle" icon="ios-plus-empty" @click="callparent"></Button>
        <span v-if="ideaCode" @click="callparent" :style="{cursor:'pointer',color:'#32CD32',width:'50px',textOverflow:'ellipsis',display:'inline-block','whiteSpace':'nowrap'}" >{{adName}}</span>
    </span>

</template>

<script>
    export default {
        name: 'tdpop',
        props: {
            adCompany: String,
            adName: String,
            // "endtime":"2018-10-04 00:00:00+08",
            ideaCode: String,
            isPay: Boolean,
            positionId: Number,
            // "startime":"2018-10-02 00:00:00+08",
            status: Boolean,
            day:String
        },
        methods: {
            callparent() {
                this.$emit('changepaiqi',this.ideaCode,this.adName,this.positionId,this.day);
            }
        }
    };
</script>

<style scoped>

</style>