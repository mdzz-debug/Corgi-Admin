<template>
    <div class="user-container">
        <el-card class="user-card">
            <template #header>
                <div class="card-header">
                    <span>用户管理</span>
                    <div class="search-area">
                        <el-input
                            v-model="searchQuery.name"
                            placeholder="请输入姓名"
                            style="width: 200px; margin-right: 10px"
                            clearable
                            @clear="handleSearch"
                        />
                        <el-input
                            v-model="searchQuery.phone"
                            placeholder="请输入手机号"
                            style="width: 200px; margin-right: 10px"
                            clearable
                            @clear="handleSearch"
                        />
                        <el-button type="primary" @click="handleSearch">搜索</el-button>
                    </div>
                </div>
            </template>
            <div class="user-content">
                <el-table
                    :data="displayUsers"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="id" label="ID" width="80" />
                    <el-table-column prop="name" label="姓名" width="120" />
                    <el-table-column prop="phone" label="手机号" width="120" />
                    <el-table-column prop="email" label="邮箱" />
                    <el-table-column prop="status" label="状态" width="100">
                        <template #default="{ row }">
                            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
                                {{ row.status === 1 ? '正常' : '禁用' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="120" />
                </el-table>
                <div class="pagination-container">
                    <el-pagination
                        v-model:current-page="currentPage"
                        v-model:page-size="pageSize"
                        :page-sizes="[10, 20, 50, 100]"
                        :total="filteredUsers.length"
                        layout="total, sizes, prev, pager, next"
                        :prev-text="'上一页'"
                        :next-text="'下一页'"
                        :total-text="'总条数：'"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                    />
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockUsers, type User } from './data'

// 搜索条件
const searchQuery = ref({
    name: '',
    phone: ''
})

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)

// 选中的用户
const selectedUsers = ref<User[]>([])

// 根据搜索条件过滤用户
const filteredUsers = computed(() => {
    return mockUsers.filter(user => {
        const nameMatch = user.name.toLowerCase().includes(searchQuery.value.name.toLowerCase())
        const phoneMatch = user.phone.includes(searchQuery.value.phone)
        return nameMatch && phoneMatch
    })
})

// 当前页显示的用户
const displayUsers = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredUsers.value.slice(start, end)
})

// 处理搜索
const handleSearch = () => {
    currentPage.value = 1
}

// 处理页码改变
const handleCurrentChange = (val: number) => {
    currentPage.value = val
}

// 处理每页条数改变
const handleSizeChange = (val: number) => {
    pageSize.value = val
    currentPage.value = 1
}

// 处理选择变化
const handleSelectionChange = (val: User[]) => {
    selectedUsers.value = val
}
</script>

<style scoped>
.user-container {
    padding: 20px;
}

.user-card {
    margin-bottom: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-area {
    display: flex;
    align-items: center;
}

.pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>