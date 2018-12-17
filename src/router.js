import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '', redirect: 'home' },
        { path: 'home', name: 'home', component: Home },
        {
          path: 'userInfo',
          name: 'userInfo',
          component: () => import(/* webpackChunkName: 'userInfo' */ './views/UserInfo.vue')
        },
        {
          path: 'fundList',
          name: 'fundList',
          component: () => import(/* webpackChunkName: 'fundList' */ './views/FundList.vue')
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: 'register' */ './views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: 'login' */ './views/Login.vue')
    },
    {
      path: '*',
      name: 'notFound',
      component: () => import(/* webpackChunkName: 'notFound' */ './views/NotFound.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken !== undefined

  if (isLogin) {
    if (to.path === '/register' || to.path === '/login') {
      next('/index')
    } else {
      next()
    }
  } else {
    if (to.path === '/register' || to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
