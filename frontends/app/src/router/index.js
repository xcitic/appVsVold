import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '',
    meta: {
      requiresLogin: true
    },
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue') 
  },
  {
    path: '/log',
    meta: {
      requiresLogin: true
    },
    name: 'Log',
    component: () => import(/* webpackChunkName: "log" */ '../views/Log.vue')
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
    if (router.app.$userService.isLoggedIn) {
      next()
    } else {
      next("/login");
    }
  } else {
    next();
  }
})

export default router;
