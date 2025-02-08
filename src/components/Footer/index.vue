<template>
    <footer class="app-footer">
        <div class="footer-content">
            <div class="footer-section links">
                <el-space>
                    <el-link type="primary" href="https://github.com" target="_blank">GitHub</el-link>
                    <el-divider direction="vertical" />
                    <el-link type="primary" href="https://element-plus.org" target="_blank">Element Plus</el-link>
                    <el-divider direction="vertical" />
                    <el-link type="primary" href="https://vuejs.org" target="_blank">Vue.js</el-link>
                </el-space>
            </div>
            <div class="footer-section info">
                <span class="copyright">© {{ currentYear }} Corgi Admin. All rights reserved.</span>
                <el-divider direction="vertical" />
                <el-link class="icp" type="info" href="https://beian.miit.gov.cn"
                    target="_blank">粤ICP备xxxxxxxx号</el-link>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-footer {
    width: 100%;
    padding: 12px 0;
    background-color: var(--el-bg-color);
    border-top: 1px solid var(--el-border-color-lighter);
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.footer-section {
    text-align: center;
}

.info {
    display: flex;
    align-items: center;
    gap: 8px;
}

.copyright {
    color: var(--el-text-color-regular);
    font-size: 14px;
}

.icp {
    font-size: 12px;
}

@media screen and (max-width: 768px) {
    .footer-content {
        padding: 0 16px;
    }

    .links :deep(.el-space) {
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>