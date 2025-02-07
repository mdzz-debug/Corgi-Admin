<template>
    <div class="role-container">
        <el-card class="role-card">
            <template #header>
                <div class="card-header">
                    <span>角色管理</span>
                </div>
            </template>
            <div class="role-content">
                <el-empty description="角色管理页面" />
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 角色管理页面组件逻辑
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>