<template>
    <div class="setting-btn" @click="drawer = true">
        <el-icon class="setting-icon">
            <Setting />
        </el-icon>
    </div>

    <el-drawer v-model="drawer" title="系统设置" direction="rtl" size="300px">
        <div class="setting-content">
            <el-form label-position="top">
                <el-form-item label="主题色">
                    <el-color-picker v-model="themeStore.primaryColor" @change="handlePrimaryColorChange" />
                </el-form-item>

                <el-form-item label="显示面包屑">
                    <el-switch v-model="themeStore.showBreadcrumb" @change="handleBreadcrumbChange" />
                </el-form-item>


            </el-form>
        </div>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { useThemeStore } from '@/store/theme'

const drawer = ref(false)
const themeStore = useThemeStore()

const handlePrimaryColorChange = (color: string) => {
    themeStore.setPrimaryColor(color)
    // 更新根元素CSS变量
    document.documentElement.style.setProperty('--el-color-primary', color)
}

const handleBreadcrumbChange = (show: boolean) => {
    themeStore.setShowBreadcrumb(show)
}

</script>

<style scoped>
.setting-btn {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 48px;
    height: 48px;
    background-color: #409EFF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}

.setting-btn:hover {
    transform: scale(1.1);
}

.setting-icon {
    font-size: 24px;
    color: #fff;
}

.setting-content {
    padding: 20px;
}

.dark-mode-switch {
    width: 60px;
    height: 30px;
    background-color: #e6e6e6;
    border-radius: 15px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s;
}

.dark-mode-switch.is-dark {
    background-color: #1a1a1a;
}

.switch-handle {
    width: 26px;
    height: 26px;
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
    transform: translateX(30px);
}

.light-icon,
.dark-icon {
    position: absolute;
    font-size: 16px;
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