<template>
    <template v-if="!route.meta?.hidden">
        <el-menu-item v-if="!route.children || route.children.length === 0" :index="getFullPath(route.path)">
            <el-icon v-if="route.meta?.icon">
                <component :is="route.meta.icon" />
            </el-icon>
            <span class="menu-title">{{ route.meta?.title || route.name }}</span>
        </el-menu-item>

        <el-sub-menu v-else :index="getFullPath(route.path)">
            <template #title>
                <el-icon v-if="route.meta?.icon">
                    <component :is="route.meta.icon" />
                </el-icon>
                <span>{{ route.meta?.title || route.name }}</span>
            </template>
            <template v-for="child in route.children" :key="child.path">
                <MenuItem :route="child" />
            </template>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

defineProps<{
    route: RouteRecordRaw
}>()

const getFullPath = (path: string) => {
    return path.startsWith('/') ? path : `/${path}`
}
</script>

<style scoped>
.menu-title {
    font-size: 14px;
}
</style>