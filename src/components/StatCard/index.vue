<template>
    <el-card shadow="hover" class="stat-card">
        <div class="stat-content">
            <div class="stat-info">
                <h3 class="stat-title">{{ title }}</h3>
                <div class="stat-value">{{ formattedDisplayValue }}</div>
                <div class="stat-total">总{{ title }}: {{ formattedDisplayTotal }}</div>
            </div>
            <div class="stat-icon">
                <el-icon :size="32" :color="iconColor">
                    <component :is="icon" />
                </el-icon>
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    value: {
        type: [Number, String],
        required: true
    },
    total: {
        type: [Number, String],
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    iconColor: {
        type: String,
        default: '#409EFF'
    }
})

const displayValue = ref(0)
const formattedDisplayValue = ref('0')
const displayTotal = ref(0)
const formattedDisplayTotal = ref('0')

// 格式化数字，添加千分符
const formatNumber = (num: number | string) => {
    return Number(num).toLocaleString('en-US')
}

// 动画更新数值
const animateValue = (start: number, end: number, duration: number, isTotal = false) => {
    const startTime = performance.now()
    const updateValue = () => {
        const currentTime = performance.now()
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        if (isTotal) {
            displayTotal.value = Math.floor(start + (end - start) * progress)
            formattedDisplayTotal.value = formatNumber(displayTotal.value)
        } else {
            displayValue.value = Math.floor(start + (end - start) * progress)
            formattedDisplayValue.value = formatNumber(displayValue.value)
        }

        if (progress < 1) {
            requestAnimationFrame(updateValue)
        }
    }
    updateValue()
}

// 监听value的变化
watch(() => props.value, (newValue) => {
    const targetValue = Number(newValue)
    animateValue(displayValue.value, targetValue, 1000)
})

// 监听total的变化
watch(() => props.total, (newValue) => {
    const targetValue = Number(newValue)
    animateValue(displayTotal.value, targetValue, 1000, true)
})

// 组件挂载时初始化动画
onMounted(() => {
    const targetValue = Number(props.value)
    const totalValue = Number(props.total)
    animateValue(0, targetValue, 1000)
    animateValue(0, totalValue, 1000, true)
})
</script>

<style scoped>
.stat-card {
    height: 140px;
}

.stat-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}

.stat-info {
    flex: 1;
}

.stat-title {
    margin: 0;
    font-size: 16px;
    color: var(--el-text-color-regular);
    margin-bottom: 8px;
}

.stat-value {
    font-size: 28px;
    font-weight: bold;
    color: var(--el-text-color-primary);
    margin-bottom: 8px;
}

.stat-total {
    font-size: 14px;
    color: var(--el-text-color-secondary);
}

.stat-icon {
    padding: 16px;
    background-color: var(--el-fill-color-lighter);
    border-radius: 8px;
}
</style>