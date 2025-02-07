import type { RouteRecordRaw } from 'vue-router'

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

export default systemRoute