<template>
    <el-dialog v-model="dialogVisible" title="忘记密码" width="400px" :close-on-click-modal="false">
        <el-steps :active="currentStep" finish-status="success" simple>
            <el-step title="验证邮箱" />
            <el-step title="重置密码" />
        </el-steps>

        <!-- 步骤1：验证邮箱 -->
        <div v-if="currentStep === 0" class="step-content">
            <el-form :model="form" :rules="rules" ref="emailFormRef">
                <el-form-item prop="email">
                    <el-input v-model="form.email" placeholder="请输入注册邮箱">
                        <template #prefix>
                            <el-icon><Message /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="verificationCode">
                    <div class="verification-code">
                        <el-input v-model="form.verificationCode" placeholder="请输入验证码">
                            <template #prefix>
                                <el-icon><Key /></el-icon>
                            </template>
                        </el-input>
                        <el-button type="primary" :disabled="isCodeSending" @click="sendVerificationCode">
                            {{ codeButtonText }}
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>

        <!-- 步骤2：重置密码 -->
        <div v-if="currentStep === 1" class="step-content">
            <el-form :model="form" :rules="rules" ref="passwordFormRef">
                <el-form-item prop="newPassword">
                    <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码" show-password>
                        <template #prefix>
                            <el-icon><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input v-model="form.confirmPassword" type="password" placeholder="请确认新密码" show-password>
                        <template #prefix>
                            <el-icon><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleNextStep">{{ currentStep === 0 ? '下一步' : '确认' }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Message, Key, Lock } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'

const dialogVisible = ref(false)
const currentStep = ref(0)
const isCodeSending = ref(false)
const countdown = ref(60)
const codeButtonText = ref('发送验证码')
const emailFormRef = ref<FormInstance>()
const passwordFormRef = ref<FormInstance>()

const form = reactive({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
})

const validateConfirmPassword = (value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== form.newPassword) {
        callback(new Error('两次输入密码不一致'))
    } else {
        callback()
    }
}

const rules = reactive({
    email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
    ],
    verificationCode: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur' }
    ],
    newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { validator: validateConfirmPassword, trigger: 'blur' }
    ]
})

const startCountdown = () => {
    isCodeSending.value = true
    countdown.value = 60
    const timer = setInterval(() => {
        countdown.value--
        codeButtonText.value = `${countdown.value}秒后重试`
        if (countdown.value <= 0) {
            clearInterval(timer)
            isCodeSending.value = false
            codeButtonText.value = '发送验证码'
        }
    }, 1000)
}

const sendVerificationCode = async () => {
    try {
        await emailFormRef.value?.validateField('email')
        // TODO: 调用发送验证码的API
        ElMessage.success('验证码已发送到您的邮箱')
        startCountdown()
    } catch (error) {
        // 验证失败
    }
}

const handleNextStep = async () => {
    if (currentStep.value === 0) {
        try {
            await emailFormRef.value?.validate()
            // TODO: 验证验证码是否正确
            currentStep.value++
        } catch (error) {
            // 验证失败
        }
    } else {
        try {
            await passwordFormRef.value?.validate()
            // TODO: 调用重置密码的API
            ElMessage.success('密码重置成功')
            dialogVisible.value = false
            currentStep.value = 0
            form.email = ''
            form.verificationCode = ''
            form.newPassword = ''
            form.confirmPassword = ''
        } catch (error) {
            // 验证失败
        }
    }
}

defineExpose({
    dialogVisible
})
</script>

<style scoped>
.step-content {
    margin-top: 20px;
}

.verification-code {
    display: flex;
    gap: 10px;
}

.verification-code .el-input {
    flex: 1;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>