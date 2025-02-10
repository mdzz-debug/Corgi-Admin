<template>
    <div class="super-container">
        <div class="super-content">
            <h2>Super 专属页面</h2>
            <p>这个页面只有超级管理员可以看到</p>
        </div>
    </div>
</template>

<style scoped>
.super-container {
    padding: 24px;
    background-color: var(--el-bg-color);
    min-height: 100%;
}

.super-content {
    background-color: var(--el-bg-color-overlay);
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.super-content h2 {
    font-size: 20px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin: 0 0 16px 0;
}

.super-content p {
    color: var(--el-text-color-regular);
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
}
</style>