import { defineStore } from 'pinia'

interface LoginParams {
    username: string
    password: string
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        avatar: '',
        token: '',
        username: '',
        phone: '',
        email: '',
        role: 0 // 0 为普通用户, 1 为管理员，2 为超级管理员
    }),
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setUsername(username: string) {
            this.username = username
        },
        setUserphone(phone: string) {
            this.phone = phone
        },
        setUseremail(email: string) {
            this.email = email
        },
        setUserrole(role: number) {
            this.role = role
        },
        async login(params: LoginParams) {
            try {
                // 这里替换为实际的登录 API 调用
                // const { data } = await loginApi(params)
                // this.token = data.token

                // 模拟登录成功
                if (params.username === 'Corgi' && params.password === '123456') {
                    // this.token = 'mock_token'
                    // this.userInfo = {
                    //     username: 'Corgi Admin',
                    //     avatar: '/vb-logo.png',
                    //     roles: ['admin']
                    // }
                    this.setUsername('Corgi Admin')
                    this.setUserphone('155********')
                    this.setUseremail('155****@qq.com')
                    this.setUserrole(1)
                    this.setToken('mock_token')
                    return Promise.resolve()
                }
                return Promise.reject('用户名或密码错误')
            } catch (error) {
                return Promise.reject(error)
            }
        },
        logout() {
            this.token = ''
            this.username = ''
        }
    },
    persist: true
})