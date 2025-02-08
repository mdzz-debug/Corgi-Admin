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
                    <el-col :span="12">
                        <el-card shadow="hover" class="chart-card">
                            <h3>访问趋势</h3>
                            <div class="chart-placeholder">图表区域</div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card shadow="hover" class="chart-card">
                            <h3>用户分布</h3>
                            <div class="chart-placeholder">图表区域</div>
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
const tableData = [
    {
        date: '2023-01-01',
        visits: 1234,
        users: 123,
        orders: 45
    },
    {
        date: '2023-01-02',
        visits: 2234,
        users: 234,
        orders: 56
    },
    {
        date: '2023-01-03',
        visits: 3234,
        users: 345,
        orders: 67
    }
]
</script>

<style scoped>
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
    height: 300px;
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