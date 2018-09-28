<template>  
<Alert type="warning" class="margin-top-10" >
    友情提示：
    <template slot="desc">
        <!-- 1、房源置顶后如果取消发布，将不退回费用，请谨慎购买置顶时长。<br> -->
        1、房源取消发布后，自动不在店铺展示，也会自动取消店铺推荐。<br>
        2、管理员会对发布的房源进行抽查，若发现违规行为会强制下架房源，且不可重新发布。<br>
        3、点击量为每日凌晨统计，只能查询截止到前一天的点击量。
    </template>
</Alert>
</template>
<script>
export default {
  name: "bottomAlert"
};
</script>