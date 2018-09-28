<template>
    <div>
        <Row>
            <Col span="100">
                <Card>
                    <p slot="title">
                       房源推荐
                    </p>
                    <Row>
                        <Input v-model="searchConName" placeholder="请输入..." style="width: 200px" />
                        <Button type="primary" >确定</Button>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'recommendHouse',
    data () {
        return {
        };
    },
    methods: {

    },
    mounted () {
    }
};
</script>
