import { login, userInfo, logout, refreshToken } from '@/api/login'
import { setToken, getRefreshToken, setRefreshToken, removeToken, removeRefreshToken } from '@/utils/auth'
const user = {
  state: {
    authenticated: false,
    userInfo: {
      name: null,
      email: null
    }
  },
  mutations: {
    SET_AUTH: (state, payload) => {
      state.authenticated = payload
    },
    SET_USER: (state, user) => {
      state.userInfo.name = user.name
      state.userInfo.email = user.email
    }
  },
  actions: {
    // 登录
    login({ commit }, user){
      return new Promise((resolve, reject) => {
        login(user.username, user.password).then(res => {
          if(res.status_code === 200){
            setToken(res.entity.token)
            setRefreshToken(JSON.stringify({
              refresh_token: res.entity.refresh_token,
              expires_in: res.entity.expires_in * 1000 + (new Date()).getTime(),
            }))
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户信息
    userInfo({ commit, dispatch }) {
      return new Promise((resolve) => {
        userInfo().then(res => {
          commit('SET_AUTH', true)
          commit('SET_USER', res.entity)
          resolve(res)
        }).catch(() => {
          // dispatch('refreshToken')
        })
      })
    },
    // 刷新token
    refreshToken() {
      return new Promise((resolve, reject) => {
        const refresh = JSON.parse(getRefreshToken());
        refreshToken(refresh.refresh_token).then(res => {
          if(res.status_code === 200){
            setToken(res.entity.token)
            setRefreshToken(JSON.stringify({
              refresh_token: res.entity.refresh_token,
              expires_in: res.entity.expires_in * 1000 + (new Date()).getTime(),
            }))
          }
          resolve(res)
        }).catch(err =>{
          reject(err)
        })
      })
    },
    // 退出登录
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          commit('SET_AUTH', false)
          commit('SET_USER', {
            name: null,
            email: null,
          })
          // 删除Token
          removeToken()
          // 删除RefreshToken
          removeRefreshToken()
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default user