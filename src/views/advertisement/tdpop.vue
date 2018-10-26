<template>
    <!--<Poptip  title="Title" :style="{width:'100%',height:'100%'}" content="content">-->

    <!--</Poptip>-->
    <!--<Icon type="ios-plus-outline"></Icon>-->
    <!--<Icon type="clock"></Icon>-->
    <span>
        <Button v-if="!ideaCode" type="ghost" shape="circle" icon="ios-plus-empty" @click="callparent"></Button>
        <span v-if="ideaCode" @click="callparent" :style="{cursor:'pointer',color:'#32CD32',width:'50px',textOverflow:'ellipsis',display:'inline-block','whiteSpace':'nowrap'}" >{{adName}}</span>
    </span>

    <!--<Button :long="true" type="success" :style="{width:'50px',textOverflow:'ellipsis'}">身无分文访问速度威风威风</Button>-->
    <!--<Button type="text" :style="{width:'100%',height:'100%'}"></Button>-->
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
            status: Boolean
        },
        methods: {
            callparent() {
                this.$emit('changepaiqi');
            }
        }
    };
</script>

<style scoped>

</style>