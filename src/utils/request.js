/**
 * 封装axios请求模块
 */
import store from '@/store'
import axios from 'axios'
const request = axios.create({
  baseURL: 'http://42.192.129.12:8000'
})

/**
 * 设置请求拦截器
 */
request.interceptors.request.use(
  function (config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default request
