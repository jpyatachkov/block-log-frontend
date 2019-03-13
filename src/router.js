import { JwtService } from '@/services';
import Router from 'vue-router';
import Vue from 'vue';

const Home = () => import('@/views/Home');
const Login = () => import('@/views/Login');
const Register = () => import('@/views/Register');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        forAnonymous: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        forAnonymous: true,
      },
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        forLoggedIn: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const forAnonymous = to.matched.some((route) => route.meta.forAnonymous);
  const forLoggedIn = to.matched.some((route) => route.meta.forLoggedIn);

  const userLoggedIn = JwtService.hasToken();

  if (forAnonymous && userLoggedIn) {
    return next({ name: 'home' });
  } else if (forLoggedIn && !userLoggedIn) {
    return next({ name: 'login' });
  } else {
    return next();
  }
});

export default router;
