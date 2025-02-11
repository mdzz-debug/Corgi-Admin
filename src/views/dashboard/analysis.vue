<template>
    <div class="analysis-container">
        <el-card class="analysis-card">
            <template #header>
                <div class="card-header">
                    <span>数据分析</span>
                </div>
            </template>
            <div class="analysis-content">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <StatCard title="用户量" :value="2000" :total="120000" icon="User" icon-color="#409EFF" />
                    </el-col>
                    <el-col :span="6">
                        <StatCard title="访问量" :value="20000" :total="500000" icon="View" icon-color="#67C23A" />
                    </el-col>
                    <el-col :span="6">
                        <StatCard title="下载量" :value="8000" :total="120000" icon="Download" icon-color="#E6A23C" />
                    </el-col>
                    <el-col :span="6">
                        <StatCard title="使用量" :value="5000" :total="50000" icon="Timer" icon-color="#F56C6C" />
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mt-4">
                    <el-col :span="24">
                        <el-card shadow="hover" class="chart-card">
                            <div class="chart-header">
                                <h3>月度访问量统计</h3>
                            </div>
                            <div v-show="currentChart === 'monthly'" ref="monthlyChartRef"
                                style="width: 100%; height: 400px"></div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mt-4">
                    <el-col :span="24">
                        <el-card shadow="hover" class="data-table">
                            <h3>数据明细</h3>
                            <el-table :data="tableData" style="width: 100%">
                                <el-table-column prop="date" label="日期" />
                                <el-table-column prop="visits" label="访问量" />
                                <el-table-column prop="users" label="用户数" />
                                <el-table-column prop="orders" label="订单数" />
                            </el-table>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { getMonthlyChartOption } from './config/monthlyChartConfig'
import { mockTableData } from '@/mock/chart'

const monthlyChartRef = ref()
const currentChart = ref('monthly')

const initMonthlyChart = () => {
    const chartDom = monthlyChartRef.value
    const myChart = echarts.init(chartDom)
    const option = getMonthlyChartOption()
    myChart.setOption(option)
}

onMounted(() => {
    initMonthlyChart()
})

const tableData = mockTableData
</script>

<style scoped>
.mb-4 {
    margin-bottom: 1rem;
}

.mt-4 {
    margin-top: 1rem;
}

.chart-card {
    margin-bottom: 1rem;
}

.chart-card h3 {
    margin-bottom: 1rem;
    font-size: 16px;
    color: var(--el-text-color-primary);
}

.analysis-container {
    padding: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.analysis-content {
    margin-top: 20px;
}

.chart-card {
    min-height: 500px;
    margin-bottom: 20px;
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.chart-header h3 {
    margin: 0;
}

.chart-placeholder {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f7fa;
    border-radius: 4px;
    margin-top: 20px;
}

.data-table {
    margin-top: 20px;
}

.mt-4 {
    margin-top: 20px;
}
</style>