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
    component: () => import('./components/common/Login'),
    meta: {}
  },
  {
    path: '/',
    redirect: '/statistic/global'
  },
  {
    path: '',
    name: 'layout',
    component: () => import('./components/common/Layout'),
    meta: {},
    children: [
      {
        path: '/statistic/global',
        name: 'statistic_global',
        component: () => import('./components/home/StatisticGlobal'),
        meta: {}
      },{
        path: '/statistic/increment',
        name: 'statistic_increment',
        component: () => import('./components/home/StatisticIncrement'),
        meta: {}
      },
      {
        path: '/userinfo',
        name: 'userinfo',
        component: () => import('./components/common/UserInfo'),
        meta: {}
      },
      {
        path: '/user/list',
        name: 'user_list',
        component: () => import('./components/user/Index'),
        meta: {}
      },
      {
        path: '/setting/role',
        name: 'setting_role',
        component: () => import('./components/setting/RoleSetting'),
        meta: {}
      },
      {
        path: '/setting/user',
        name: 'setting_user',
        component: () => import('./components/setting/UserSetting'),
        meta: {}
      },
      {
        path: '/breadcrumb',
        name: 'breadcrumb',
        component: () => import('./components/common/Breadcrumb'),
        meta: {}
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})