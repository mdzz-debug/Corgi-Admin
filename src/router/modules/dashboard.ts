import type { RouteRecordRaw } from 'vue-router'

const dashboardRoute: RouteRecordRaw = {
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
        title: '仪表盘',
        icon: 'Odometer'
    }
}

export default dashboardRoute