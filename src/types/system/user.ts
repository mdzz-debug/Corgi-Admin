// 用户状态类型
export type UserStatus = 1 | 0

// 用户搜索参数接口
export interface UserSearchQuery {
    name?: string
    phone?: string
}

// 用户数据接口
export interface User {
    id: number
    name: string
    phone: string
    email: string
    status: UserStatus
    createTime: string
}

// 分页参数接口
export interface PaginationParams {
    currentPage: number
    pageSize: number
}