<template>
    <template v-for="route in routes" :key="route.path">
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
                    <template v-if="!child.meta?.hidden">
                        <el-menu-item v-if="!child.children || child.children.length === 0"
                            :index="getFullPath(child.path)">
                            <el-icon v-if="child.meta?.icon">
                                <component :is="child.meta.icon" />
                            </el-icon>
                            <span>{{ child.meta?.title || child.name }}</span>
                        </el-menu-item>
                        <el-sub-menu v-else :index="getFullPath(child.path)">
                            <template #title>
                                <el-icon v-if="child.meta?.icon">
                                    <component :is="child.meta.icon" />
                                </el-icon>
                                <span>{{ child.meta?.title || child.name }}</span>
                            </template>
                            <Menu :routes="child.children" />
                        </el-sub-menu>
                    </template>
                </template>
            </el-sub-menu>
        </template>
    </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

defineProps<{
    routes: RouteRecordRaw[]
}>()

const getFullPath = (path: string) => {
    return path.startsWith('/') ? path : `/${path}`
}
</script>

<style scoped>
/* .menu-icon {
    margin-right: 6px;
    font-size: 16px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
} */

.menu-title {
    font-size: 14px;
}

:deep(.el-sub-menu .el-menu-item) {
    min-width: unset;
    border-radius: 4px;
    margin: 2px 8px;
}

:deep(.el-menu--popup) {
    padding: 0;
    min-width: 200px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>