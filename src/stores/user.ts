import { defineStore } from 'pinia'

interface UserState {
    token: string
    userInfo: {
        username?: string
        avatar?: string
        roles?: string[]
    }
}

interface LoginParams {
    username: string
    password: string
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        token: '',
        userInfo: {}
    }),
    actions: {
        async login(params: LoginParams) {
            try {
                // 这里替换为实际的登录 API 调用
                // const { data } = await loginApi(params)
                // this.token = data.token
                
                // 模拟登录成功
                if (params.username === 'vben' && params.password === '123456') {
                    this.token = 'mock_token'
                    this.userInfo = {
                        username: 'Vben Admin',
                        avatar: '/vb-logo.png',
                        roles: ['admin']
                    }
                    return Promise.resolve()
                }
                return Promise.reject('用户名或密码错误')
            } catch (error) {
                return Promise.reject(error)
            }
        },

        logout() {
            this.token = ''
            this.userInfo = {}
        }
    },
    persist: true
})