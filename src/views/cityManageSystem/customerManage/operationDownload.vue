<template>
    <Card>
        <p slot="title">操作流水下载</p>
        <Form ref="downData" :model="downData" :label-width="120">
            <FormItem label="起止时间" prop="timeRange">
                <DatePicker :clearable="true" :value="downData.startTime" @on-change="downStart" type="date"
                            placeholder="开始时间"></DatePicker>
                <DatePicker :clearable="true" :value="downData.endTime" @on-change="downEnd" type="date"
                            placeholder="结束时间"></DatePicker>
            </FormItem>
            <FormItem>
                <Button type="success" @click="yelsDown">余额流水下载</Button>
                <Button type="success" @click="xfjlDown" style="margin-left: 8px">消费记录下载</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
    import Qs from 'qs';
    import moment from "moment";

    export default {
        name: "operationDownload",
        data() {
            return {
                //下载相关数据
                downData: {
                    startTime: moment().subtract(1, 'days').format("YYYY-MM-DD"),
                    endTime: ''
                },
            }
        },
        methods: {
            downStart(date) {
                this.downData.startTime = date
            },
            downEnd(date) {
                this.downData.endTime = date
            },
            yelsDown() {
                // 余额流水下载
                window.open(`/v1.0.0/operationFlow/yelsDownload?${Qs.stringify(this.downData)}`)
            },
            xfjlDown() {
                // 消费记录下载
                window.open(`/v1.0.0/operationFlow/xfjlDownload?${Qs.stringify(this.downData)}`)
            }
        }
    }
</script>

<style>

</style>