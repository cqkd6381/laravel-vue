import { login, userInfo } from '@/api/login'
import { setToken, setRefreshToken } from '@/utils/auth'
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
              expires_in: res.entity.expires_in,
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
          dispatch('RefreshToken')
        })
      })
    },
    // 刷新token
    RefreshToken() {
      console.log('该更新token喽')
      console.log('先把刷新token功能写好吧')
    }
  }
}

export default user