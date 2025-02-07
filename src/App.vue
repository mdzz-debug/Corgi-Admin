<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/store/theme'

const themeStore = useThemeStore()

onMounted(() => {
  // 初始化时检查暗黑模式状态
  if (themeStore.isDarkMode) {
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <router-view />
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
