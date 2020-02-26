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

// 登出
export function logout() {
  return fetch({
    url: '/logout',
    method: 'post'
  })
}