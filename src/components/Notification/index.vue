<template>
    <div class="notification-btn">
        <div class="notification-icon" @click="toggleNotification">
            <el-icon :size="20">
                <Bell />
            </el-icon>
            <el-badge :value="notifications.length" class="notification-badge" />
        </div>
        <div v-show="showNotification" class="notification-panel">
            <div class="notification-header">
                <span>通知</span>
                <el-button link type="primary" size="small" class="clear-btn">清空</el-button>
            </div>
            <div class="notification-list">
                <div v-for="item in notifications" :key="item.id" class="notification-item">
                    <el-avatar 
                        :src="item.avatar" 
                        :size="40" 
                        :style="{ backgroundColor: item.bgColor || '#409EFF' }"
                    >{{ item.initial }}</el-avatar>
                    <div class="notification-content">
                        <div class="notification-title">{{ item.title }}</div>
                        <div class="notification-desc">{{ item.description }}</div>
                        <div class="notification-time">{{ item.time }}</div>
                    </div>
                    <div class="notification-dot" v-if="item.unread"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Bell } from '@element-plus/icons-vue'
import { ref } from 'vue'

const showNotification = ref(false)
const notifications = ref([
    {
        id: 1,
        avatar: '/vb-logo.png',
        initial: 'VB',
        bgColor: '#67C23A',  // 绿色
        title: '收到了 14 份新闻报',
        description: '描述信息描述信息描述信息描述',
        time: '3小时前',
        unread: true
    },
    {
        id: 2,
        avatar: '/avatar1.png',
        initial: '朱',
        bgColor: '#E6A23C',  // 橙色
        title: '朱偏右 回复了你',
        description: '描述信息描述信息描述信息描述',
        time: '刚刚',
        unread: true
    }
])

const toggleNotification = () => {
    showNotification.value = !showNotification.value
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
    transition: background-color 0.2s;
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
</style>