import * as echarts from 'echarts'

export const getMonthlyChartOption = () => ({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
                type: 'dashed'
            }
        }
    },
    series: [{
        name: '访问量',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
            width: 0
        },
        showSymbol: false,
        areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(128, 255, 165)'
            }, {
                offset: 1,
                color: 'rgb(1, 191, 236)'
            }])
        },
        emphasis: {
            focus: 'series'
        },
        data: [3000, 2000, 3200, 5000, 3000, 4200, 3100, 2100, 2800, 5200, 6000, 3000]
    }]
})