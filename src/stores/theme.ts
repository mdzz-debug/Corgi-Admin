import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        primaryColor: '#409EFF',
        showBreadcrumb: true,
        isDarkMode: false,
        showFooter: true
    }),
    actions: {
        setPrimaryColor(color: string) {
            this.primaryColor = color
            this.updatePrimaryColor()
        },
        setShowBreadcrumb(show: boolean) {
            this.showBreadcrumb = show
        },
        setShowFooter(show: boolean) {
            this.showFooter = show
        },
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode
            document.documentElement.classList.toggle('dark')
        },
        updatePrimaryColor() {
            document.documentElement.style.setProperty('--el-color-primary', this.primaryColor)
        },
        initTheme() {
            this.updatePrimaryColor()
            if (this.isDarkMode) {
                document.documentElement.classList.add('dark')
            }
        }
    },
    persist: true
})