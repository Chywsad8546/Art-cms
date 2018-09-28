<template>
	<div>
		<Row>
			<Col span="100">
			<Card>
				<p slot="title">下属企业</p>
				<Row>
					<Col span="6">
					<p>下级企业列表：</p>
					<Tree :empty-text="emptyText" :data="listData" @on-select-change="selectchange"></Tree>
					<!--<Cascader @on-change="listChange" :data="listData" size="large"></Cascader>-->
					</Col>
				</Row>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
import api from '../../../api/company/index.js';
import * as table from './data/subordinateValue';
export default {
	data() {
		return {
			emptyText: "您所登录的公司没有下属企业",
			searchdata: {
				corpId: 21
			},
			data: {
			},
			listData: [],
			listData2: []
		};
	},
	methods: {
		// 选择节点企业详细信息展示
		selectchange(nodes) {
			console.log(nodes)
			let node = nodes[0];
			var selectValueR = { corpId: node.value };
			api.getCorp(selectValueR).then(response => {
				this.data = response.data.data;
			});
		},
		// 移除空的子节点
		removeChildren(val) {
			for (let i = 0; i < val.length; i++) {
				if (val[i].children.length == 0) {
					delete val[i].children;
				} else {
					this.removeChildren(val[i].children);
				}
			}
			return val;
		},
		// 获取下级企业列表
		init() {
			api.getCustomerAgentList().then(response => {
				var rval = this.removeChildren(response.data.data.data);
				this.totree(rval);
				// 默认展开一级
				rval.forEach((item) => {
					item.expand = true;
				})
				this.listData = rval;
			});
		},
		// 树形数据的处理
		totree(val) {
			val.forEach((item, index) => {
				item.title = item.label;
				item.expand = false;
				if (item.children) {
					this.totree(item.children);
				}
			});
		},

		// 选择展示
		// listChange(value, selectedData) {
		//     if (value.length > 0) {
		//         var selectValueR = { corpId: value[value.length - 1] };
		//         api.getCorp(selectValueR).then(response => {
		//             this.data = response.data.data;
		//         });
		//     }
		// }
	},
	created() {
		this.init();
	}
};
</script>