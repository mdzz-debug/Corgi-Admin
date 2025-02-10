<template>
    <el-dialog v-model="dialogVisible" title="个人信息" width="500px" :close-on-click-modal="false">
        <el-steps :active="activeStep" finish-status="success" simple style="margin: 20px 0">
            <el-step title="基本信息" />
            <el-step title="修改密码" />
        </el-steps>

        <!-- 基本信息步骤 -->
        <div v-if="activeStep === 0">
            <div class="avatar-upload">
                <el-avatar :size="100" :src="form.avatar" />
                <el-upload
                    class="avatar-uploader"
                    action="/api/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    accept=".jpg,.jpeg,.png,.gif,.webp"
                >
                    <el-button type="primary" class="upload-btn">更换头像</el-button>
                </el-upload>
            </div>

            <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" placeholder="请输入邮箱" />
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="form.phone" placeholder="请输入手机号" />
                </el-form-item>
            </el-form>
        </div>

        <!-- 修改密码步骤 -->
        <div v-if="activeStep === 1">
            <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" label-width="100px">
                <el-form-item label="原密码" prop="oldPassword">
                    <el-input v-model="passwordForm.oldPassword" type="password" placeholder="请输入原密码" show-password />
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="passwordForm.newPassword" type="password" placeholder="请输入新密码" show-password />
                </el-form-item>
                <el-form-item label="确认新密码" prop="confirmPassword">
                    <el-input v-model="passwordForm.confirmPassword" type="password" placeholder="请确认新密码" show-password />
                </el-form-item>
            </el-form>
        </div>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button v-if="activeStep > 0" @click="prevStep">上一步</el-button>
                <el-button v-if="activeStep < 1" type="primary" @click="nextStep">下一步</el-button>
                <el-button v-else type="primary" @click="handleSubmit">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'

const dialogVisible = ref(false)
const activeStep = ref(0)
const formRef = ref()
const passwordFormRef = ref()

const authStore = useAuthStore()

// 基本信息表单
const form = reactive({
    avatar: authStore.avatar || '/people.png',
    username: authStore.username || '',
    email: authStore.email || '',
    phone: authStore.phone || ''
})

// 密码表单
const passwordForm = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})

// 基本信息验证规则
const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
    ],
    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
}

// 密码验证规则
const passwordRules = {
    oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
    newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
    confirmPassword: [
        { required: true, message: '请确认新密码', trigger: 'blur' },
        {
            validator: (value: string, callback: Function) => {
                if (value !== passwordForm.newPassword) {
                    callback(new Error('两次输入的密码不一致'))
                } else {
                    callback()
                }
            },
            trigger: 'blur'
        }
    ]
}

const showDialog = () => {
    dialogVisible.value = true
    activeStep.value = 0
}

const closeDialog = () => {
    dialogVisible.value = false
}

const nextStep = () => {
    activeStep.value++
}

const prevStep = () => {
    activeStep.value--
}

const handleAvatarSuccess = (response: any) => {
    form.avatar = response.url
    ElMessage.success('头像上传成功')
}

const beforeAvatarUpload = (file: File) => {
    const isJPG = file.type === 'image/jpeg'
    const isPNG = file.type === 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG && !isPNG) {
        ElMessage.error('上传头像图片只能是 JPG 或 PNG 格式!')
        return false
    }
    if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!')
        return false
    }
    return true
}

const handleSubmit = async () => {
    if (activeStep.value === 0) {
        await formRef.value.validate()
        // TODO: 调用更新用户信息的API
        ElMessage.success('基本信息更新成功')
        nextStep()
    } else {
        await passwordFormRef.value.validate()
        // TODO: 调用修改密码的API
        ElMessage.success('密码修改成功')
        closeDialog()
    }
}

defineExpose({
    showDialog
})
</script>

<style scoped>
.avatar-upload {
    text-align: center;
    margin-bottom: 20px;
}

.upload-btn {
    margin-top: 10px;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>