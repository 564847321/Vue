import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login/login.vue'
import home from '@/components/home/home.vue'
import user from '@/components/users/user.vue'
import right from '@/components/right/right.vue'
import roles from '@/components/role/role.vue'

Vue.use(Router)

var router = new Router({
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
              name:'users',
              path: '/users',
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
// 导航守卫  vue中的概念
// 路由、导航/守卫
// 在路由配置生效之前 会先来到下面方法的cb
// to 将要生效的路由配置对象
// from 当前的路由配置对象
// next 方法 next() 会继续执行路由配置和组件渲染
router.beforeEach((to, from, next) => {
  console.log(to, from)
  // 如果要去的是login next()
  if (to.path === '/login') {
    next()
  } else {

    // 如果去的不是login
    // 判断token token存在next()
    const token = localStorage.getItem('token')
    if (!token) {
      // this.$router -> router
      // 回到登录
      // this.$message.warning('asdasd')
      Message.warning('请先登录')
      router.push({
        name: 'login'
      })
      return
    }
    next()
  }

})


export default router