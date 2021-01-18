import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Log from '@/views/Log.vue';
import HelpLine from '@/views/HelpLine.vue';
import ViewLog from '@/views/ViewLog';


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      shouldNotBeLoggedIn: true,
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      shouldNotBeLoggedIn: true
    },
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '',
    meta: {
      requiresLogin: true
    },
    name: 'Home',
    component: Home
  },
  {
    path: '/log',
    meta: {
      requiresLogin: true
    },
    name: 'Log',
    component: Log
  },
  {
    path: '/log/view/:id',
    meta: {
      requiresLogin: true
    },
    name: 'ViewLog',
    props: true,
    component: ViewLog
  },
  {
    path: '/help-line',
    meta: {
      requiresLogin: true
    },
    name: 'HelpLine',
    component: HelpLine
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if(to.matched.some(m => m.meta.requiresLogin)) {
    if (router.app.$userService.isUserLoggedIn()) {
      next()
    } else {
      next("/login");
    }
  } 
  if(to.matched.some(m => m.meta.shouldNotBeLoggedIn)) {
    if (router.app.$userService.isUserLoggedIn()) {
      next("/home")
    }
  }
  next()
})

export default router;
