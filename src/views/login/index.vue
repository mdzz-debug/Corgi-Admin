<template>
    <div class="login-container">
        <el-card class="login-card">
            <template #header>
                <h3 class="login-title">系统登录</h3>
            </template>
            <el-form>
                <el-form-item>
                    <el-input v-model="username" placeholder="请输入用户名" prefix-icon="User" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="password" type="password" placeholder="请输入密码" prefix-icon="Lock" show-password />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-button" @click="handleLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()
const username = ref('')
const password = ref('')

const handleLogin = () => {
    // 这里添加登录逻辑
    authStore.login(username.value, 'dummy-token')
    router.push('/')
}
</script>

<style scoped>
.login-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f3f3f3;
}

.login-card {
    width: 400px;
}

.login-title {
    text-align: center;
    margin: 0;
    font-size: 24px;
    color: #303133;
}

.login-button {
    width: 100%;
}
</style>