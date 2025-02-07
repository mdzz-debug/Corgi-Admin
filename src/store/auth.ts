import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '',
        username: ''
    }),
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setUsername(username: string) {
            this.username = username
        },
        login(username: string, token: string) {
            this.setUsername(username)
            this.setToken(token)
        },
        logout() {
            this.token = ''
            this.username = ''
        }
    },
    persist: true
})