<template>
    <div class="role-container">
        <div class="role-content">
            <div class="role-header">
                <h2>角色切换</h2>
            </div>
            <div class="role-switch">
                <el-button
                    :class="['role-button', { active: authStore.role === 2 }]"
                    @click="switchRole(2)"
                >切换为 Super 账号</el-button>
                <el-button
                    :class="['role-button', { active: authStore.role === 1 }]"
                    @click="switchRole(1)"
                >切换为 Admin 账号</el-button>
                <el-button
                    :class="['role-button', { active: authStore.role === 0 }]"
                    @click="switchRole(0)"
                >切换为 User 账号</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'

const authStore = useAuthStore()

const switchRole = (role: number) => {
    authStore.setUserrole(role)
    const roleNames = ['普通用户', '管理员', '超级管理员']
    ElMessage.success(`已切换为${roleNames[role]}角色`)
}
</script>

<style scoped>
.role-container {
    padding: 24px;
    background-color: var(--el-bg-color);
    min-height: 100%;
}

.role-header {
    margin-bottom: 32px;
}

.role-header h2 {
    font-size: 20px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin: 0;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--el-border-color-light);
}

.role-content {
    background-color: var(--el-bg-color-overlay);
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.role-switch {
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: flex-start;
    margin: 0 auto;
}

.role-button {
    width: 180px;
    height: 36px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid transparent;
    padding: 0 16px;
}

.role-button.active {
    background-color: var(--el-color-primary);
    color: white;
    border-color: var(--el-color-primary);
    transform: scale(1.01);
}

.role-button:not(.active) {
    background-color: var(--el-bg-color);
    color: var(--el-text-color-primary);
    border-color: var(--el-border-color);
}

.role-button:not(.active):hover {
    transform: translateY(-1px);
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>