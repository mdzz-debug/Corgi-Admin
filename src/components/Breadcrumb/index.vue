<template>
    <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path" :to="item.path">
            <el-icon v-if="item.meta?.icon" class="breadcrumb-icon">
                <component :is="item.meta.icon" />
            </el-icon>
            <span>{{ item.meta?.title || item.name }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'

const route = useRoute()

interface BreadcrumbItem {
    name: string
    path: string
    meta?: {
        title?: string
        icon?: string
    }
}

const breadcrumbs = ref<BreadcrumbItem[]>([])

const getBreadcrumbs = (route: RouteLocationNormalizedLoaded) => {
    const paths = route.path.split('/').filter(Boolean)
    const items: BreadcrumbItem[] = []
    let pathAcc = ''

    paths.forEach(path => {
        pathAcc += `/${path}`
        const matchedRoute = route.matched.find(r => r.path === pathAcc)
        if (matchedRoute) {
            items.push({
                name: matchedRoute.name as string,
                path: pathAcc,
                meta: matchedRoute.meta
            })
        }
    })

    return items
}

watch(() => route.path, () => {
    breadcrumbs.value = getBreadcrumbs(route)
}, { immediate: true })
</script>

<style scoped>
.breadcrumb {
    display: flex;
    height: 56px;
    justify-self: center;
    align-items: center;
    margin-left: 16px;
}

.breadcrumb-icon {
    margin-right: 4px;
    vertical-align: -2px;
}

:deep(.el-breadcrumb__item) {
    display: inline-flex;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
}

:deep(.el-breadcrumb__item) {
    display: flex;
    align-items: center;
}

.breadcrumb-icon {
    margin-right: 4px;
    font-size: 14px;
}
</style>