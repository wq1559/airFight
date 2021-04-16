import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/pages/Home';
import Login from '@/pages/Login'


Vue.use(VueRouter);

const routes = [{
    name: 'Home',
    path: '/',
    redirect: '/home',
},{
  name: 'Home',
  path: '/home',
  component: Home
},
{
    name: 'Login',
    path: '/login',
    component: Login
}]

const router = new VueRouter({
    routes
})

let flag = false;

router.beforeEach((to, from, next) => {
  if(flag === false) {
    flag = true;
    next('/login')
  }
  next();
})

export default router;