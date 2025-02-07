<template>
    <div class="user-container">
        <DarkModeSwitch />
        <div class="fullscreen-btn" @click="toggleFullScreen">
            <el-icon :size="20">
                <FullScreen v-if="!isFullscreen" />
                <Aim v-else />
            </el-icon>
        </div>
        <Notification />
        <el-dropdown @command="handleCommand">
            <span class="user-info">
                <el-avatar :size="32" src="/people.png" />
                <!-- <span>管理员</span> -->
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="profile">个人信息</el-dropdown-item>
                    <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import DarkModeSwitch from '@/components/DarkModeSwitch/index.vue'
import Notification from '@/components/Notification/index.vue'
import { FullScreen, Aim } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const authStore = useAuthStore()
const isFullscreen = ref(false)

const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
        isFullscreen.value = true
    } else {
        document.exitFullscreen()
        isFullscreen.value = false
    }
}

const handleCommand = (command: string) => {
    if (command === 'logout') {
        ElMessageBox.confirm('确认退出登录吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            authStore.logout()
            router.push('/login')
        }).catch(() => {})
    } else if (command === 'profile') {
        router.push('/system/user/profile')
    }
}
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
    margin-top: -5px;
}

.user-info span {
    margin-left: 8px;
}

.fullscreen-btn {
    margin: 0 12px;
    cursor: pointer;
    color: var(--el-text-color-regular);
}

.fullscreen-btn:hover {
    color: var(--el-color-primary);
}

.notification-btn {
    margin: 0 12px;
    cursor: pointer;
    color: var(--el-text-color-regular);
    position: relative;
    line-height: 10px !important;
}

.notification-btn:hover {
    color: var(--el-color-primary);
}

.notification-badge {
    position: absolute;
    top: -8px;
    right: -8px;
}

@keyframes shake {

    0%,
    100% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(-10deg);
    }

    75% {
        transform: rotate(10deg);
    }
}

:deep(.el-dropdown) {
    outline: none !important;
}

:deep(.el-dropdown:focus-visible) {
    outline: none !important;
}

:deep(.el-dropdown:focus) {
    outline: none !important;
}

:deep(.el-dropdown:hover) {
    border-color: transparent !important;
}

:deep(.el-avatar) {
    --el-avatar-bg-color: transparent !important;
}

::v-deep .el-dropdown:hover {
    border-color: transparent !important;
    box-shadow: none !important;
}

:deep(.fullscreen-btn) {
    line-height: 5px !important;
}

.notification-panel {
    position: absolute;
    top: calc(100% + 12px);
    right: -84px;
    width: 300px;
    background: var(--el-bg-color);
    border-radius: 4px;
    box-shadow: var(--el-box-shadow-light);
    z-index: 2000;
    animation: slideDown 0.3s ease-out;
}

.notification-panel::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 85px;
    width: 12px;
    height: 12px;
    background: var(--el-bg-color);
    transform: rotate(45deg);
    box-shadow: var(--el-box-shadow-light);
}

.notification-header {
    padding: 12px 16px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.notification-list {
    max-height: 300px;
    overflow-y: auto;
}

.notification-item {
    padding: 12px 16px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.notification-item:hover {
    background-color: var(--el-fill-color-light);
}

.notification-content {
    flex: 1;
}

.notification-title {
    font-size: 14px;
    margin-bottom: 4px;
}

.notification-time {
    font-size: 12px;
    color: var(--el-text-color-secondary);
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>