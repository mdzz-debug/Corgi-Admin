<template>
    <div class="login-container">
        <div class="login-content">
            <div class="login-right">
                <div class="login-header">
                    <h2>欢迎回来 👋</h2>
                    <p>请输入您的帐户信息以开始管理您的项目</p>
                </div>
                <el-form class="login-form">
                    <el-form-item>
                        <el-select v-model="loginType" class="login-type-select">
                            <el-option label="Super" value="super" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="username" placeholder="Corgi" />
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="password" type="password" placeholder="123456" show-password>
                            <template #suffix>
                                <el-icon><View /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <div class="login-options">
                        <el-checkbox v-model="rememberMe">记住账号</el-checkbox>
                        <el-link type="primary">忘记密码？</el-link>
                    </div>
                    <el-button type="primary" class="login-button" @click="handleLogin">登录</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

const loginType = ref('super')
const username = ref('Corgi')
const password = ref('123456')
const rememberMe = ref(false)

const handleLogin = async () => {
    try {
        await authStore.login({
            username: username.value,
            password: password.value
        })
        router.push('/')
    } catch (error) {
        console.error('登录失败:', error)
    }
}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, #f0f2f5, #e6f7ff);
}

.login-content {
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
    width: 80%;
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

.login-divider {
    text-align: center;
    color: var(--el-text-color-secondary);
    margin: 24px 0;
    position: relative;
}

.login-divider::before,
.login-divider::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30%;
    height: 1px;
    background: var(--el-border-color-lighter);
}

.login-divider::before {
    left: 0;
}

.login-divider::after {
    right: 0;
}

.slide-verify {
    margin-bottom: 24px;
    height: 40px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
}

.login-footer {
    margin-top: auto;
}

.other-login {
    text-align: center;
    margin-bottom: 16px;
}

.login-icons {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 8px;
}

.login-icons .el-icon {
    font-size: 20px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    transition: color 0.3s;
}

.login-icons .el-icon:hover {
    color: var(--el-color-primary);
}

.register-link {
    text-align: center;
    color: var(--el-text-color-secondary);
}
</style>