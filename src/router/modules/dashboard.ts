import type { RouteRecordRaw } from 'vue-router'

const dashboardRoute: RouteRecordRaw = {
    path: 'dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/analysis',
    meta: {
        title: '概况',
        icon: 'Odometer'
    },
    children: [
        {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/analysis.vue'),
            meta: {
                title: '分析台',
                icon: 'DataLine'
            }
        },
        {
            path: '/dashboard/workspace',
            name: 'Workspace',
            component: () => import('@/views/dashboard/workspace.vue'),
            meta: {
                title: '工作台',
                icon: 'Monitor'
            }
        }
    ]
}

export default dashboardRoute