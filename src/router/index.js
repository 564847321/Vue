import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  '@/assets/base.css'


Vue.use(ElementUI);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
      component: login
    }
  ]
})
