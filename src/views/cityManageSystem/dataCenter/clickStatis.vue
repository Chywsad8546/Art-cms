<template>
    <div>
        <Row>
            <Col span="100">
            <Card>
                <p slot="title">
                    房源点击统计
                </p>
                <Row>
                    <Select v-model="model1" style="width:200px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Input v-model.trim="searchConName" placeholder="请输入姓名搜搜..." style="width: 200px" />
                    <span @click="handleSearchEsf" style="margin: 0 10px;">
                        <Button type="primary" icon="search">搜索</Button>
                    </span>
                    <Button @click="handleCancelEsf" type="ghost">取消</Button>
                </Row>
                <Row class="margin-top-10 searchable-table-con1">
                    <Table border :columns="columns" :data="data"></Table>
                </Row>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import * as table from "./data/search";

    export default {
        name: "clickStatis",
        data() {
            return {
                
                houseType:[{
                  value:1,
                  label:"出租"  
                }],
                searchConName: "",
                columns: table.columns,
                data: [],
                initTable: []
            };
        },
        methods: {
            init() {
                this.data = this.initTableEsf = table.searchTable;
            },
            search(data, argumentObj) {
                let res = data;
                let dataClone = data;
                for (let argu in argumentObj) {
                    if (argumentObj[argu].length > 0) {
                        res = dataClone.filter(d => {
                            return d[argu].indexOf(argumentObj[argu]) > -1;
                        });
                        dataClone = res;
                    }
                }
                return res;
            },
            handleSearchEsf() {
                this.data = this.initTableEsf;
                this.data = this.search(this.data, {
                    name: this.searchConName
                });
            },
            handleCancelEsf() {
                this.data = this.initTableEsf;
            }
        },
        mounted() {
            this.init();
        }
    };
</script>