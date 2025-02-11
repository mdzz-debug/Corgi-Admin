<template>
    <div class="notification-btn">
        <div class="notification-icon" @click="toggleNotification">
            <el-icon :size="20">
                <Bell />
            </el-icon>
            <el-badge v-if="notifications.filter((item: NotificationItem) => item.unread).length > 0"
                :value="notifications.filter((item: NotificationItem) => item.unread).length"
                class="notification-badge" />
        </div>
        <div v-show="showNotification" class="notification-panel">
            <div class="notification-header">
                <span>通知</span>
                <el-button link type="primary" size="small" class="clear-btn" @click="clearNotifications">清空</el-button>
            </div>
            <div class="notification-list">
                <div v-for="item in notifications" :key="item.id" class="notification-item" @click="showDetail(item)">
                    <el-avatar :src="item.avatar" :size="40" :style="{ backgroundColor: item.bgColor || '#409EFF' }">{{
            item.initial }}</el-avatar>
                    <div class="notification-content">
                        <div class="notification-title">{{ item.title }}</div>
                        <div class="notification-desc">{{ item.description }}</div>
                        <div class="notification-time">{{ item.time }}</div>
                    </div>
                    <div class="notification-dot" v-if="item.unread"></div>
                </div>
            </div>
        </div>

        <!-- 通知详情对话框 -->
        <el-dialog v-model="showDetailDialog" :title="currentNotification?.title || '通知详情'" width="30%"
            :before-close="handleDetailClose">
            <div class="notification-detail" v-if="currentNotification">
                <div class="detail-header">
                    <el-avatar :src="currentNotification.avatar" :size="50"
                        :style="{ backgroundColor: currentNotification.bgColor || '#409EFF' }">
                        {{ currentNotification.initial }}
                    </el-avatar>
                    <div class="detail-time">{{ currentNotification.time }}</div>
                </div>
                <div class="detail-content">
                    <p>{{ currentNotification.description }}</p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { Bell } from '@element-plus/icons-vue'
import { ref, onMounted, onUnmounted } from 'vue'
import type { NotificationItem } from '@/types/notification'
import { mockNotifications } from '@/mock/notifications'

const showNotification = ref(false)
const showDetailDialog = ref(false)

const currentNotification = ref<NotificationItem | null>(null)

const notifications = ref(mockNotifications)

const handleClickOutside = (event: MouseEvent) => {
    const notificationBtn = document.querySelector('.notification-btn')
    if (notificationBtn && !notificationBtn.contains(event.target as Node) && showNotification.value) {
        showNotification.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})

const toggleNotification = () => {
    showNotification.value = !showNotification.value
}

const showDetail = (notification: any) => {
    currentNotification.value = notification
    showDetailDialog.value = true
    if (notification.unread) {
        notification.unread = false
    }
}

const handleDetailClose = () => {
    showDetailDialog.value = false
    currentNotification.value = null
}

const clearNotifications = () => {
    notifications.value = []
}
</script>

<style scoped>
/* 基础布局 */
.notification-btn {
    margin: 0 12px;
    position: relative;
    line-height: 5px !important;
}

/* 图标样式 */
.notification-icon {
    position: relative;
    cursor: pointer;
    color: var(--el-text-color-regular);
}

.notification-icon:hover {
    color: var(--el-color-primary);
    animation: shake 0.5s ease-in-out;
}

.notification-badge {
    position: absolute;
    right: 0;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

/* 面板样式 */
.notification-panel {
    position: fixed;
    top: 60px;
    right: 40px;
    width: 336px;
    padding: 0;
    background: var(--el-bg-color);
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    z-index: 2000;
    animation: slideDown 0.3s ease-out;
}

.notification-panel::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 35px;
    width: 12px;
    height: 12px;
    background: inherit;
    transform: rotate(45deg);
    box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.05);
}

/* 头部样式 */
.notification-header {
    padding: 12px 16px;
    font-size: 14px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.clear-btn {
    font-size: 13px;
    padding: 0;
}

/* 列表样式 */
.notification-list {
    max-height: 300px;
    overflow: hidden auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
}

.notification-item {
    padding: 12px 16px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    cursor: pointer;
    border-bottom: 1px solid var(--el-border-color-lighter);
    transition: all 0.3s ease;
    position: relative;
    background: var(--el-bg-color);
}

.notification-item:hover {
    background-color: var(--el-fill-color-light);
}

/* 内容样式 */
.notification-content {
    flex: 1;
    min-width: 0;
}

.notification-title {
    font-size: 14px;
    margin-bottom: 4px;
    color: var(--el-text-color-primary);
}

.notification-desc,
.notification-time {
    font-size: 12px;
    color: var(--el-text-color-secondary);
}

.notification-desc {
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 16px;
}

/* 未读标记 */
.notification-dot {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--el-color-primary);
}

/* 动画 */
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

/* 详情对话框样式 */
.notification-detail {
    padding: 20px;
}

.detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.detail-time {
    font-size: 14px;
    color: var(--el-text-color-secondary);
}

.detail-content {
    font-size: 14px;
    line-height: 1.6;
    color: var(--el-text-color-primary);
}
</style>