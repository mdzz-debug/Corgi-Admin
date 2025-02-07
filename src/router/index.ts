import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/store/auth'

import dashboardRoute from './modules/dashboard'
import systemRoute from './modules/system'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Layout',
        component: () => import('@/layout/index.vue'),
        redirect: '/dashboard',
        children: [
            dashboardRoute,
            systemRoute
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            hidden: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const token = authStore.token
    if (to.path === '/login') {
        next()
    } else if (!token) {
        next('/login')
    } else {
        next()
    }
})

export default router