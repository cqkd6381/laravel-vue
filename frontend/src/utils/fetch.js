import axios from 'axios'
import { getToken } from './auth'
import { config } from '@/config/index'

// 创建axios实例
const service = axios.create({
  baseURL: config.develop.api,
  // baseURL: config.production.api,
  timeout: 1200000,
  withCredentials: false
})

// request拦截器
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['Authorization'] = getToken()
  }
  return new Promise(resolve => {
    resolve(config)
  })
}, err => {
  return Promise.reject(err)
})

// response拦截器
service.interceptors.response.use(response => {
  const res = response.data
  return res
}, err => {
  return err.response.data;
})

export default service