import Mock from 'mockjs'
import type { User } from '@/types/system/user'

export const mockUsers = Mock.mock({
    'list|100': [{
        'id|+1': 1,
        name: '@cname',
        phone: /^1[3-9]\d{9}$/,
        email: '@email',
        'status|1': [0, 1],
        createTime: '@date'
    }]
}).list as User[]