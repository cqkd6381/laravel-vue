import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import { getToken } from './utils/auth'
import { whiteList } from '@/config/index.js';

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.name === 'login') {
      next({ name: 'userinfo' })  // 如果已经登录了跳转到个人中心
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
