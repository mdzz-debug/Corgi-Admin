<template>
    <div class="setting-btn" @click="drawer = true">
        <img src="/seeting.png" class="setting-icon" alt="设置" />
    </div>

    <el-drawer v-model="drawer" title="系统设置" direction="rtl" size="383px">
        <div class="setting-content">
            <el-form label-position="top">
                <ThemeColorPicker v-model="themeStore.primaryColor" @change="handlePrimaryColorChange" />
                <el-form-item label="显示面包屑">
                    <el-switch v-model="themeStore.showBreadcrumb" @change="handleBreadcrumbChange" />
                </el-form-item>
                <el-form-item label="显示页脚">
                    <el-switch v-model="themeStore.showFooter" @change="handleFooterChange" />
                </el-form-item>
            </el-form>
        </div>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
import ThemeColorPicker from '@/components/ThemeColorPicker/index.vue'

const drawer = ref(false)
const themeStore = useThemeStore()

const handlePrimaryColorChange = (color: string) => {
    document.documentElement.style.setProperty('--el-color-primary', color)
}

const handleBreadcrumbChange = (show: boolean) => {
    themeStore.setShowBreadcrumb(show)
}

const handleFooterChange = (show: boolean) => {
    themeStore.setShowFooter(show)
}
</script>

<style scoped>
:deep(.el-drawer__body) {
    padding: 0;
}

.setting-btn {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 48px;
    height: 48px;
    background-color: var(--el-color-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}

.setting-btn:hover {
    animation: wiggle 0.6s ease-in-out infinite;
    transform: scale(1.1);
}

.setting-icon {
    width: 24px;
    height: 24px;
    transition: transform 0.3s;
}

@keyframes wiggle {

    0%,
    100% {
        transform: scale(1.1) rotate(0deg);
    }

    25% {
        transform: scale(1.1) rotate(-10deg);
    }

    75% {
        transform: scale(1.1) rotate(10deg);
    }
}

.setting-icon {
    width: 24px;
    height: 24px;
    color: #fff;
}
</style>