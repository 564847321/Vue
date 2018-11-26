import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  '@/assets/base.css'
import MyHttpServer from '@/plugins/http.js';

import login from '@/components/login/login.vue'
import home from '@/components/home/home.vue'


Vue.use(MyHttpServer);
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
    },
    { 
      name:'home',
      path: '/home',
      component: home
    }
  ]
})
