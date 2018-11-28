import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login/login.vue'
import home from '@/components/home/home.vue'
import user from '@/components/users/user.vue'
import right from '@/components/right/right.vue'
import roles from '@/components/role/role.vue'

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
      component: home,
            children:[{
              name:'user',
              path: '/user',
              component: user
            },
            {
              name:'rights',
              path: '/rights',
              component: right
            },
            {
              name:'roles',
              path: '/roles',
              component: roles
            },
          ]
    }
    
  ]
})
