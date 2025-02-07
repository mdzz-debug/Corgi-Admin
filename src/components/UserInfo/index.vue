<template>
    <div class="user-container">
        <DarkModeSwitch />
        <el-dropdown>
            <span class="user-info">
                <el-avatar size="small" src="/people.png" />
                <span>管理员</span>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import DarkModeSwitch from '@/components/DarkModeSwitch/index.vue'
</script>

<style scoped>
.user-container {
    display: flex;
    align-items: center;
}

.user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.user-info span {
    margin-left: 8px;
}

:deep(.el-dropdown:focus-visible) {
    outline: none;
}

:deep(.el-dropdown:focus) {
    outline: none;
}

:deep(.el-avatar) {
    --el-avatar-bg-color: transparent !important;
}

::v-deep .el-dropdown:hover {
    border-color: transparent !important;
    box-shadow: none !important;
}
</style>