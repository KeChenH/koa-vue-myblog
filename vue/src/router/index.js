import Vue from 'vue'
import Router from 'vue-router'
import list from '@/page/list'
import login from '@/page/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
