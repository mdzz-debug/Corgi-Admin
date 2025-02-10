<template>
    <el-container class="layout-container" :class="{ 'dark': themeStore.isDarkMode }">
        <el-aside :width="isCollapse ? '64px' : '200px'" class="aside" style="height: 100vh;">
            <div class="logo" :class="{ 'collapsed': isCollapse }">
                <img src="/corgi-logo.png" alt="logo" />
                <span>{{ appTitle }}</span>
            </div>
            <el-menu :default-active="activeMenu" class="el-menu-vertical"
                :background-color="themeStore.isDarkMode ? '#141414' : '#ffffff'"
                :text-color="themeStore.isDarkMode ? '#d0d0d0' : '#666666'" active-text-color="#409EFF" router
                :collapse="isCollapse">
                <Menu :routes="routes" />
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="header" style="height: 56px;">
                <div class="header-left">
                    <el-icon class="collapse-btn" @click="toggleCollapse">
                        <Expand v-if="isCollapse" />
                        <Fold v-else />
                    </el-icon>
                    <el-icon class="collapse-btn collapse-btn-left" @click="handleRefresh">
                        <Refresh />
                    </el-icon>
                    <Breadcrumb v-if="themeStore.showBreadcrumb" />
                </div>
                <UserInfo />
            </el-header>
            <el-main>
                <div class="main-content">
                    <LoadingCorgi :loading="loadingStore.isLoading" />
                    <transition name="fade-slide" mode="out-in" @before-enter="() => loadingStore.setLoading(true)"
                        @after-enter="() => loadingStore.setLoading(false)">
                        <router-view />
                    </transition>
                </div>
            </el-main>
            <el-footer v-if="themeStore.showFooter" height="auto">
                <Footer />
            </el-footer>
        </el-container>
    </el-container>
    <SettingDrawer />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Expand, Fold, Refresh } from '@element-plus/icons-vue'
import { useThemeStore } from '@/stores/theme'
import { useLoadingStore } from '@/stores/loading'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import UserInfo from '@/components/UserInfo/index.vue'
import SettingDrawer from '@/components/SettingDrawer/index.vue'
import Menu from '@/components/Menu/index.vue'
import LoadingCorgi from '@/components/LoadingCorgi.vue'
import Footer from '@/components/Footer/index.vue'

const route = useRoute()
const router = useRouter()
const routes = router.options.routes.find(route => route.name === 'Layout')?.children || []
const themeStore = useThemeStore()
const isCollapse = ref(localStorage.getItem('menuCollapsed') === 'true')
const loadingStore = useLoadingStore()

const appTitle = computed(() => import.meta.env.VITE_APP_TITLE)

const activeMenu = computed(() => {
    const { meta, path } = route
    if (meta?.activeMenu) {
        return meta.activeMenu
    }
    return path
})

const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
    localStorage.setItem('menuCollapsed', isCollapse.value.toString())
}

const handleResize = () => {
    if (window.innerWidth < 992) {
        isCollapse.value = true
    } else {
        isCollapse.value = false
    }
    localStorage.setItem('menuCollapsed', isCollapse.value.toString())
}

onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})

const handleRefresh = () => {
    loadingStore.setLoading(true)
    const { fullPath } = route
    router.replace(fullPath)
    // 模拟接口 1S 后关闭
    setTimeout(() => {
        loadingStore.setLoading(false)
    }, 3000)
}


</script>

<style scoped>
.main-content {
    padding: 16px;
    position: relative;
    height: calc(100vh - 56px - 32px)
}

.loading-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.loading-icon {
    animation: loading-rotate 1s linear infinite;
    color: var(--el-color-primary);
}

@keyframes loading-rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.dark .loading-mask {
    background-color: rgba(0, 0, 0, 0.8);
}

.layout-container {
    height: 100vh;
    background-color: var(--el-bg-color);
    color: var(--el-text-color-primary);
}

.aside {
    background-color: var(--el-menu-bg-color);
    transition: width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    overflow: hidden;
    will-change: width;
    border-right: 1px solid var(--el-border-color-light);
}

.logo {
    height: 56px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    overflow: hidden;
    white-space: nowrap;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo img {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
}

.logo span {
    font-size: 16px;
    font-weight: 600;
    transition: opacity 0.2s;
    opacity: 1;
    margin-left: 12px;
}

.logo.collapsed span {
    opacity: 0;
}

:deep(.el-menu) {
    border-right: none;
    transform-origin: left;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
    transition: background-color 0.2s, color 0.2s;
    height: 40px;
    line-height: 40px;
    margin: 4px 0;
    border-radius: 8px;
    margin-right: 8px;
    margin-left: 8px;
}

:deep(.el-menu-item.is-active) {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}

:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
    background-color: #f5f7fa;
}

:deep(.el-menu--collapse) {

    .el-menu-item,
    .el-sub-menu__title {
        padding: 0 !important;
        justify-content: center;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        .el-icon {
            margin: 0;
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        span {
            opacity: 0;
            transition: opacity 0.2s;
        }
    }
}

:deep(.el-menu:not(.el-menu--collapse)) {

    .el-menu-item,
    .el-sub-menu__title {
        .menu-icon {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform: scale(1);
        }

        span {
            opacity: 1;
            transition: opacity 0.2s;
        }
    }
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--el-border-color-light);
}

.header-left {
    display: flex;
    align-items: center;
}

.collapse-btn {
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.collapse-btn-left {
    margin-left: 16px;
}

.collapse-btn:hover {
    transform: scale(1.1);
    color: var(--el-color-primary);
}

.collapse-btn:active {
    transform: scale(0.95);
}

.el-main {
    --el-main-padding: 0;
}

/* 路由切换动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.6s ease, transform 0.6s ease;
    /* 将时间从 0.4s 增加到 0.6s */
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-slide-enter-to {
    opacity: 1;
    transform: translateX(0);
}

.fade-slide-leave-from {
    opacity: 1;
    transform: translateX(0);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>