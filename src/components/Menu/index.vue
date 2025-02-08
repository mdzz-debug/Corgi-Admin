<template>
    <template v-for="route in routes" :key="route.path">
        <MenuItem :route="route" />
    </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import MenuItem from './MenuItem.vue'

defineProps<{
    routes: RouteRecordRaw[]
}>()

</script>

<style scoped>
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