import Vue from 'vue'
import Router from 'vue-router'
import list from '@/page/list'
import login from '@/page/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/list',
      name: 'list',
      component: list
    }
  ]
})
