<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

onMounted(() => {
  // 先初始化主题设置
  themeStore.initTheme()
  // 检查暗黑模式状态
  if (themeStore.isDarkMode) {
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive v-if="route.meta.keepAlive">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
    <component v-else :is="Component" :key="route.fullPath" />
  </router-view>
</template>


<style>
/* 添加一些全局样式 */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
