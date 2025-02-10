import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const systemRoute: RouteRecordRaw = {
    path: 'system',
    name: 'System',
    redirect: '/system/user',
    meta: {
        title: '系统管理',
        icon: 'Setting'
    },
    children: [
        {
            path: '/system/user',
            name: 'User',
            component: () => import('@/views/system/user/index.vue'),
            meta: {
                title: '用户管理',
                icon: 'User'
            }
        },
        {
            path: '/system/role',
            name: 'Role',
            component: () => import('@/views/system/role/index.vue'),
            meta: {
                title: '角色管理',
                icon: 'UserFilled'
            }
        }
    ]
}

const superRoute: RouteRecordRaw = {
    path: 'super',
    name: 'Super',
    component: () => import('@/views/system/super/index.vue'),
    meta: {
        title: 'Super可见',
        icon: 'Key',
        roles: [2] // 只有 Super 管理员可见
    }
}

const adminRoute: RouteRecordRaw = {
    path: 'admin',
    name: 'Admin',
    component: () => import('@/views/system/admin/index.vue'),
    meta: {
        title: 'S/Admin可见',
        icon: 'Lock',
        roles: [1, 2] // Admin 和 Super 管理员可见
    }
}

export { superRoute, adminRoute }
export default systemRoute