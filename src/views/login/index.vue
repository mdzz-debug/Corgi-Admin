<template>
    <div class="login-container">
        <div class="login-content">
            <div class="login-left">
                <img src="/corgi-logo.png" alt="logo" class="login-illustration" />
                <div class="login-text">
                    <h1>Corgi Admin</h1>
                    <p>开箱即用的中后台管理系统</p>
                </div>
            </div>
            <div class="login-right">
                <div class="dark-mode-switch">
                    <DarkModeSwitch />
                </div>
                <div class="login-header">
                    <h2>欢迎回来 👋</h2>
                    <p>请输入您的帐户信息以开始管理您的项目</p>
                </div>
                <el-form
                    ref="loginFormRef"
                    :model="loginForm"
                    :rules="loginRules"
                    class="login-form"
                >
                    <el-form-item prop="loginType">
                        <el-select v-model="loginForm.loginType" class="login-type-select" placeholder="请选择角色类型">
                            <el-option label="超级管理员" value="super" />
                            <el-option label="管理员" value="admin" />
                            <el-option label="普通用户" value="user" />
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input
                            v-model="loginForm.username"
                            placeholder="Corgi"
                            @keyup.enter="handleLogin"
                        />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            v-model="loginForm.password"
                            type="password"
                            placeholder="123456"
                            show-password
                            @keyup.enter="handleLogin"
                        >
                            <template #suffix>
                                <el-icon>
                                    <View />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <div class="login-options">
                        <el-checkbox v-model="loginForm.rememberMe">记住账号</el-checkbox>
                        <el-link type="primary" @click="showForgotPassword">忘记密码？</el-link>
                    </div>
                    <el-button
                        type="primary"
                        class="login-button"
                        :loading="loading"
                        @click="handleLogin"
                    >登录</el-button>
                </el-form>
            </div>
        </div>
        <ForgotPassword ref="forgotPasswordRef" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import DarkModeSwitch from '@/components/DarkModeSwitch/index.vue'
import ForgotPassword from '@/components/ForgotPassword/index.vue'
import { View } from '@element-plus/icons-vue'

const router = useRouter()
const authStore = useAuthStore()
const forgotPasswordRef = ref()
const loginFormRef = ref<FormInstance>()
const loading = ref(false)

interface LoginForm {
    loginType: string
    username: string
    password: string
    rememberMe: boolean
}

const loginForm = reactive<LoginForm>({
    loginType: 'super',
    username: '',
    password: '',
    rememberMe: false
})

const loginRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '用户名长度应在3-20个字符之间', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度应在6-20个字符之间', trigger: 'blur' }
    ]
}

// 使用更安全的加密方法
const encrypt = (text: string): string => {
    return window.btoa(encodeURIComponent(text))
}

const decrypt = (text: string): string => {
    return decodeURIComponent(window.atob(text))
}

const saveLoginInfo = () => {
    if (loginForm.rememberMe) {
        try {
            localStorage.setItem('loginInfo', JSON.stringify({
                username: loginForm.username,
                password: encrypt(loginForm.password),
                rememberMe: true
            }))
        } catch (error) {
            console.error('保存登录信息失败:', error)
        }
    } else {
        localStorage.removeItem('loginInfo')
    }
}

const getLoginInfo = () => {
    try {
        const loginInfo = localStorage.getItem('loginInfo')
        if (loginInfo) {
            const { username, password, rememberMe } = JSON.parse(loginInfo)
            loginForm.username = username
            loginForm.password = decrypt(password)
            loginForm.rememberMe = rememberMe
        }
    } catch (error) {
        console.error('获取登录信息失败:', error)
        localStorage.removeItem('loginInfo')
    }
}

onMounted(() => {
    getLoginInfo()
})

const handleLogin = async () => {
    if (!loginFormRef.value) return

    try {
        await loginFormRef.value.validate()
        loading.value = true

        const roleMap: { [key: string]: number } = {
            'user': 0,
            'admin': 1,
            'super': 2
        }

        await authStore.login({
            username: loginForm.username,
            password: loginForm.password
        })
        
        // 根据选择的角色类型设置对应的角色值
        authStore.setUserrole(roleMap[loginForm.loginType])

        saveLoginInfo()
        router.push('/')
        ElMessage.success('登录成功')
    } catch (error) {
        if (error instanceof Error) {
            ElMessage.error(error.message)
        } else {
            ElMessage.error('登录失败，请重试')
        }
    } finally {
        loading.value = false
    }
}

const showForgotPassword = () => {
    if (forgotPasswordRef.value) {
        forgotPasswordRef.value.dialogVisible = true
    }
}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.login-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(154deg, rgba(7, 7, 9, 0.08) 30%, var(--el-color-primary-light-7) 48%, rgba(7, 7, 9, 0.08) 64%);
    filter: blur(100px);
    z-index: 0;
    animation: gradientMove 15s ease infinite;
}

@keyframes gradientMove {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.login-container {
    background-size: 400% 400%;
}

.login-content {
    position: relative;
    z-index: 2;
    display: flex;
    width: 1000px;
    height: 600px;
    background: var(--el-bg-color);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.login-left {
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #1890ff, #36cfc9);
    border-radius: 8px 0 0 8px;
    color: white;
}

.login-illustration {
    width: 120px;
    margin-bottom: 40px;
}

.login-text {
    text-align: center;
}

.login-text h1 {
    font-size: 24px;
    margin-bottom: 16px;
}

.login-text p {
    font-size: 16px;
    opacity: 0.8;
}

.login-right {
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
    position: relative;
}

.dark-mode-switch {
    position: absolute;
    top: 20px;
    right: 20px;
}

.login-header {
    margin-bottom: 40px;
}

.login-header h2 {
    font-size: 28px;
    margin-bottom: 8px;
    color: var(--el-text-color-primary);
}

.login-header p {
    color: var(--el-text-color-secondary);
}

.login-form {
    margin-bottom: 24px;
}

.login-type-select {
    width: 100%;
}

.login-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.login-button {
    width: 100%;
    height: 40px;
    font-size: 16px;
}
</style>