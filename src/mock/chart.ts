import Mock from 'mockjs'

export const mockMonthlyVisits = Mock.mock({
    'data|12': [{
        'value|1000-6000': 3000
    }]
}).data.map((item: { value: number }) => item.value)

export const mockTableData = Mock.mock({
    'list|10': [{
        date: '@date',
        'visits|1000-5000': 2000,
        'users|100-1000': 500,
        'orders|10-100': 50
    }]
}).list