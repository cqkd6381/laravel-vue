import axios from 'axios'
import store from '../store/store'
import router from '../router'
import { getToken, removeToken, getRefreshToken } from './auth'
import { config, whiteList } from '@/config/index'

// 创建axios实例
const service = axios.create({
  baseURL: config.develop.api,
  // baseURL: config.production.api,
  timeout: 6000,
  withCredentials: false
})

// request拦截器
let refreshStatus = true;
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['Authorization'] = getToken()
  }
  return new Promise(resolve => {
    const refreshToken = getRefreshToken();
    if(refreshStatus && refreshToken){
      refreshStatus = false;
      const date = (new Date()).getTime();
      const expires_in = new Date(JSON.parse(refreshToken).expires_in).getTime();
      // console.log(`剩余${expires_in - date}毫秒刷新token`);
      if(date > expires_in){
        // console.log('可以更新token了')
        store.dispatch('refreshToken').then(() => {
          refreshStatus = true;
          config.headers['Authorization'] =  getToken();
          resolve(config);
        }).catch(() => {
          refreshStatus = true;
          resolve(config);
        })
      }else{
        refreshStatus = true;
        resolve(config);
      }
    }else{
      resolve(config);
    }
  })
}, error => {
  return Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response.status === 401) {
      removeToken();
      store.commit('SET_AUTH', false);
      router.push({ name: 'login' });
      return false;
    }
    // 如果不在白名单里面&&token被删除了，则跳转
    if(whiteList.indexOf(router.history.current.name) < 0 && !getToken()){
      router.push({ name: 'login' });
      return false;
    }
    return error.response.data;
  }
)

export default service