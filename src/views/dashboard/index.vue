<template>
    <div class="dashboard-container">
        <el-card class="dashboard-card">
            <template #header>
                <div class="card-header">
                    <span>仪表盘</span>
                </div>
            </template>
            <div class="dashboard-content">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-card shadow="hover" class="data-card">
                            <h3>访问量</h3>
                            <div class="data-value">1,234</div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" class="data-card">
                            <h3>用户数</h3>
                            <div class="data-value">567</div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" class="data-card">
                            <h3>订单数</h3>
                            <div class="data-value">89</div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 仪表盘组件逻辑
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dashboard-content {
    margin-top: 20px;
}

.data-card {
    text-align: center;
    padding: 20px;
}

.data-card h3 {
    margin: 0;
    font-size: 16px;
    color: #606266;
}

.data-value {
    font-size: 28px;
    font-weight: bold;
    color: #409EFF;
    margin-top: 10px;
}
</style>