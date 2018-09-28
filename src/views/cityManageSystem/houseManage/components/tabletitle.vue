<template>  
                <table class="tableTitle" border="0">
                    <tr>
                        <th width="100" rowspan="2">房源ID</th>
                        <th rowspan="2">基本信息</th>
                        <th width="180"  colspan="3">点击量</th>
                        <th width="80" rowspan="2">录入人</th>
                        <th width="150" rowspan="2">录入时间</th>
                        <th width="180" rowspan="2">管理</th>
                    </tr>
                    <tr>
                        <th width="60">昨日</th>
                        <th width="60">上周</th>
                        <th width="60">本月</th>
                    </tr>
                </table>
</template>
<script>
export default {
  name: "tabletitle",
}
</script>