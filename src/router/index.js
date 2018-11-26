import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';

import login from '@/components/login/login.vue'
import home from '@/components/home/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    { name:'login',
      path: '/login',
      component: login
    },
    { 
      name:'home',
      path: '/home',
      component: home
    }
  ]
})
