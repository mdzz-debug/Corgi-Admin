import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api', // 设置默认的请求地址
    timeout: 15000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

// 请求拦截器
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 在这里可以添加token等认证信息
        const token = localStorage.getItem('token')
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const { data } = response
        // 这里可以根据后端的响应结构进行调整
        if (data.code === 200) {
            return data
        } else {
            ElMessage.error(data.message || '请求失败')
            return Promise.reject(new Error(data.message || '请求失败'))
        }
    },
    (error) => {
        let message = ''
        if (error.response && error.response.status) {
            switch (error.response.status) {
                case 401:
                    message = '未授权，请重新登录'
                    // 这里可以添加重定向到登录页的逻辑
                    break
                case 403:
                    message = '拒绝访问'
                    break
                case 404:
                    message = '请求错误,未找到该资源'
                    break
                case 500:
                    message = '服务器端出错'
                    break
                default:
                    message = `连接错误${error.response.status}`
            }
        } else {
            message = '网络连接异常,请稍后再试!'
        }
        ElMessage.error(message)
        return Promise.reject(error)
    }
)

export default service