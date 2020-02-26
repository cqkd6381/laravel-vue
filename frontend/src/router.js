import Vue from 'vue'
import Router from 'vue-router'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./components/Login'),
    meta: {}
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('./components/HelloWorld'),
    meta: {}
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('./components/UserInfo'),
    meta: {}
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})