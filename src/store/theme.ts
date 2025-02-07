import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        primaryColor: '#409EFF',
        showBreadcrumb: true,
        isDarkMode: false
    }),
    actions: {
        setPrimaryColor(color: string) {
            this.primaryColor = color
        },
        setShowBreadcrumb(show: boolean) {
            this.showBreadcrumb = show
        },
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode
            document.documentElement.classList.toggle('dark')
        },
    },
    persist: true
})