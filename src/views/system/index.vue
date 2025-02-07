<template>
    <div class="system-container">
        <el-card class="system-card">
            <template #header>
                <div class="card-header">
                    <span>系统管理</span>
                </div>
            </template>
            <div class="system-content">
                <el-empty description="系统管理页面" />
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 系统管理页面组件逻辑
</script>

<style scoped>
.system-container {
    padding: 20px;
}

.system-card {
    margin-bottom: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>