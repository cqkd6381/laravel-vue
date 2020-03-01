import fetch from '@/utils/fetch'

// 登录
export function login(username, password) {
  return fetch({
    url: '/login',
    method: 'post',
    data: {
      email: username,
      password: password,
    }
  })
}

// 获取用户信息
export function userInfo() {
  return fetch({
    url: '/user',
    method: 'get',
  })
}

// 刷新token
export function refreshToken(refresh_token) {
  return fetch({
    url: '/token/refresh',
    method: 'post',
    headers: {
      refreshtoken: refresh_token
    }
  })
}

// 登出
export function logout() {
  return fetch({
    url: '/logout',
    method: 'post'
  })
}

// 日志
export function logs() {
  return fetch({
    url: '/logs',
    method: 'get'
  })
}