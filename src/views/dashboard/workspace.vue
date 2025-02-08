<template>
    <div class="workspace-container">
        <el-card class="workspace-card">
            <template #header>
                <div class="card-header">
                    <span>工作台</span>
                </div>
            </template>
            <div class="workspace-content">
                <el-row :gutter="20">
                    <el-col :span="16">
                        <el-card shadow="hover" class="project-card">
                            <h3>我的项目</h3>
                            <el-table :data="projectData" style="width: 100%">
                                <el-table-column prop="name" label="项目名称" />
                                <el-table-column prop="status" label="状态">
                                    <template #default="{ row }">
                                        <el-tag :type="row.status === '进行中' ? 'primary' : 'success'">
                                            {{ row.status }}
                                        </el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="progress" label="进度">
                                    <template #default="{ row }">
                                        <el-progress :percentage="row.progress" />
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" class="todo-card">
                            <h3>待办事项</h3>
                            <el-checkbox-group v-model="checkedTodos">
                                <div v-for="todo in todos" :key="todo.id" class="todo-item">
                                    <el-checkbox :label="todo.id">{{ todo.content }}</el-checkbox>
                                </div>
                            </el-checkbox-group>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mt-4">
                    <el-col :span="24">
                        <el-card shadow="hover" class="timeline-card">
                            <h3>动态</h3>
                            <el-timeline>
                                <el-timeline-item v-for="activity in activities" :key="activity.id"
                                    :timestamp="activity.time" :type="activity.type">
                                    {{ activity.content }}
                                </el-timeline-item>
                            </el-timeline>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const projectData = [
    {
        name: '项目 A',
        status: '进行中',
        progress: 30
    },
    {
        name: '项目 B',
        status: '已完成',
        progress: 100
    },
    {
        name: '项目 C',
        status: '进行中',
        progress: 75
    }
]

const todos = [
    { id: 1, content: '完成功能开发' },
    { id: 2, content: '代码审查' },
    { id: 3, content: '撰写文档' },
    { id: 4, content: '项目部署' }
]

const checkedTodos = ref([1, 2])

const activities = [
    {
        id: 1,
        content: '完成了项目 A 的需求分析',
        time: '2023-01-03 14:30',
        type: 'success'
    },
    {
        id: 2,
        content: '项目 B 已部署到生产环境',
        time: '2023-01-02 16:20',
        type: 'primary'
    },
    {
        id: 3,
        content: '开始项目 C 的开发工作',
        time: '2023-01-01 09:00',
        type: 'info'
    }
]
</script>

<style scoped>
.workspace-container {
    padding: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.workspace-content {
    margin-top: 20px;
}

.project-card,
.todo-card,
.timeline-card {
    height: 100%;
}

.todo-item {
    margin: 10px 0;
}

.mt-4 {
    margin-top: 20px;
}
</style>