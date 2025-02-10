// 用户类型定义
export interface User {
    id: number
    name: string
    phone: string
    email: string
    status: 0 | 1 // 0: 禁用, 1: 正常
    createTime: string
}

// 模拟用户数据
export const mockUsers: User[] = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `用户${index + 1}`,
    phone: `1${String(Math.floor(Math.random() * 10000000000)).padStart(10, '0')}`,
    email: `user${index + 1}@example.com`,
    status: Math.random() > 0.3 ? 1 : 0,
    createTime: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
}))