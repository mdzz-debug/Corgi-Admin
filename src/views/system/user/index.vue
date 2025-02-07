<template>
    <div class="user-container">
        <el-card class="user-card">
            <template #header>
                <div class="card-header">
                    <span>用户管理</span>
                </div>
            </template>
            <div class="user-content">
                <el-empty description="用户管理页面" />
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 用户管理页面组件逻辑
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>