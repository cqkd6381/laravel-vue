import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import { getToken } from './utils/auth'
import { whiteList } from '@/config/index.js';

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.name === 'login') {
      next({ name: 'user' })  // 如果已经登录了跳转到个人中心
    } else {
      if (store.state.user.authenticated) {
        next()
      } else {
        store.dispatch('userInfo').then(() => {
          next({ ...to })
        })
      }
    }
  } else {
    if (whiteList.indexOf(to.name) > -1) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
