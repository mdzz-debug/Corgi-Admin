<template>
    <el-form-item label="内置主题">
        <div class="theme-colors">
            <div class="theme-color-item" v-for="(color, name) in themeColors" :key="name"
                @click="handleThemeColorSelect(color)" :class="{ 'active': modelValue === color }">
                <div class="color-circle" :style="{ backgroundColor: color }"></div>
                <span class="color-name">{{ name }}</span>
            </div>
            <div class="theme-color-item custom-theme-item" @click="showColorPicker = true"
                :class="{ 'active': !Object.values(themeColors).includes(modelValue) }"
                :style="{ borderColor: !Object.values(themeColors).includes(modelValue) ? modelValue : '' }">
                <div class="color-circle custom-circle">
                    <el-icon :size="16">
                        <Plus />
                    </el-icon>
                </div>
                <span class="color-name">自定义</span>
            </div>
        </div>
        <el-dialog v-model="showColorPicker" title="自定义主题色" width="300px" align-center>
            <div class="custom-color-dialog">
                <el-color-picker v-model="currentColor" @change="handlePrimaryColorChange" show-alpha />
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showColorPicker = false">取消</el-button>
                    <el-button type="primary" @click="confirmCustomColor">确定</el-button>
                    <el-button @click="resetThemeColor">重置</el-button>
                </span>
            </template>
        </el-dialog>
    </el-form-item>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string]
    'change': [value: string]
}>()

const currentColor = ref(props.modelValue)
const showColorPicker = ref(false)

watch(() => props.modelValue, (newValue) => {
    currentColor.value = newValue
})

const confirmCustomColor = () => {
    handlePrimaryColorChange(currentColor.value)
    showColorPicker.value = false
}

const themeColors = {
    '默认': '#409EFF',
    '紫罗兰': '#7367F0',
    '樱花粉': '#F8B4D4',
    '柠檬黄': '#F7C23E',
    '天蓝色': '#17A2B8',
    '浅绿色': '#28C76F',
    '智能灰': '#6B6B6B',
    '深绿色': '#28A745',
    '深蓝色': '#0D6EFD',
    '玫瑰红': '#EA5455',
    '石板灰': '#475569',
    '中灰色': '#64748B'
}

const handleThemeColorSelect = (color: string) => {
    emit('update:modelValue', color)
    emit('change', color)
}

const handlePrimaryColorChange = (color: string) => {
    emit('update:modelValue', color)
    emit('change', color)
}

const resetThemeColor = () => {
    const defaultColor = '#409EFF'  // Element Plus 默认主题色
    emit('update:modelValue', defaultColor)
    emit('change', defaultColor)
}
</script>

<style scoped>
:deep(.el-form-item__label) {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
}

.theme-colors {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
}

.theme-color-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    width: calc(33.33% - 8px);
    box-sizing: border-box;
    border: 2px solid #e4e7ed;
    transition: border-color 0.3s;
}

.theme-color-item::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border: 2px solid var(--el-color-primary);
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
    pointer-events: none;
    border-radius: 6px;
}

.theme-color-item:hover::before {
    width: 100%;
    height: 100%;
}

.theme-color-item.active {
    border-color: var(--el-color-primary);
}

.theme-color-item.active::before {
    display: none;
}

.color-circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-bottom: 4px;
}

.color-name {
    font-size: 12px;
    color: var(--el-text-color-regular);
}

.custom-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--el-color-info-light);
    color: var(--el-color-info);
}

.custom-color-dialog {
    display: flex;
    justify-content: center;
    padding: 20px 0;
}

.dialog-footer {
    display: flex;
    justify-content: center;
    gap: 12px;
}
</style>