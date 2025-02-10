<template>
    <div class="admin-container">
        <div class="admin-content">
            <h2>S/Admin 专属页面</h2>
            <p>这个页面只有管理员及以上权限可以看到</p>
        </div>
    </div>
</template>

<style scoped>
.admin-container {
    padding: 24px;
    background-color: var(--el-bg-color);
    min-height: 100%;
}

.admin-content {
    background-color: var(--el-bg-color-overlay);
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.admin-content h2 {
    font-size: 20px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin: 0 0 16px 0;
}

.admin-content p {
    color: var(--el-text-color-regular);
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
}
</style>