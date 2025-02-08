<template>
    <div class="dark-mode-switch" :class="{ 'is-dark': themeStore.isDarkMode }" @click="handleDarkModeChange">
        <div class="switch-handle">
            <el-icon class="light-icon">
                <Sunny />
            </el-icon>
            <el-icon class="dark-icon">
                <Moon />
            </el-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const handleDarkModeChange = () => {
    themeStore.toggleDarkMode()
}
</script>

<style scoped>
.dark-mode-switch {
    width: 48px;
    height: 24px;
    background-color: #e6e6e6;
    border-radius: 12px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s;
    margin-right: 16px;
    border: 2px solid transparent;
}

.dark-mode-switch:hover {
    border-color: #42b983;
}

.dark-mode-switch.is-dark {
    background-color: #24272a;
}

.switch-handle {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s;
}

.dark-mode-switch.is-dark .switch-handle {
    transform: translateX(24px);
}

.light-icon,
.dark-icon {
    position: absolute;
    font-size: 14px;
    transition: opacity 0.3s;
}

.light-icon {
    color: #f1c40f;
    opacity: 1;
}

.dark-icon {
    color: #34495e;
    opacity: 0;
}

.dark-mode-switch.is-dark .light-icon {
    opacity: 0;
}

.dark-mode-switch.is-dark .dark-icon {
    opacity: 1;
}
</style>