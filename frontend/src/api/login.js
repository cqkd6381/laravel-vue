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