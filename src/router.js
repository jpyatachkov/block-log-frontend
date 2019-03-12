import Router from 'vue-router';
import Vue from 'vue';

const Login = () => import('@/views/Login');
const Register = () => import('@/views/Register');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  /* eslint-disable */
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ],
  /* eslint-enable */
});

export default router;
