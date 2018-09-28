export const columns = [
    {
        key: 'name',
        title: '基本信息',
        render: (h, params) => {
            return h('div', [
                h('strong', params.row.name)
            ]);
        }
    },
    {
        key: 'tel',
        title: '点击量',
    },
    {
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                        click: () => {
                            this.show(params.index);
                        }
                    }
                }, 'View'),
                h('Button', {
                    props: {
                        type: 'error',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                            this.remove(params.index);
                        }
                    }
                }, 'Delete')
            ]);
        }
    }
];

export const searchTable = [
    {
        name: '二手房房源标题',
        tel: '17712345678'
    },
    {
        name: '二手房房源标题',
        tel: '17787654321'
    },
    {
        name: '二手房房源标题',
        tel: '12212345678'
    },
    {
        name: '二手房房源标题',
        tel: '13312345678'
    }
];
