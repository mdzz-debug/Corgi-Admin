// 图表数据接口
export interface ChartData {
    date: string
    visits: number
    users: number
    orders: number
}

// 统计卡片数据接口
export interface StatData {
    title: string
    value: number
    total: number
    icon: string
    iconColor: string
}

// 月度图表配置接口
export interface MonthlyChartOption {
    xAxis: {
        type: string
        data: string[]
    }
    yAxis: {
        type: string
    }
    series: Array<{
        name: string
        type: string
        data: number[]
    }>
}