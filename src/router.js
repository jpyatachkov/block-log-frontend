import { JwtService } from '@/services';
import Router from 'vue-router';
import Vue from 'vue';

const Course = () => import('@/views/Course');
const CoursesList = () => import('@/views/CoursesList');
// const Home = () => import('@/views/Home');
const Login = () => import('@/views/Login');
const MyCoursesList = () => import('@/views/MyCoursesList');
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
      path: '/courses',
      name: 'courses',
      component: CoursesList,
      meta: {
        forLoggedIn: true,
      },
    },
    {
      path: '/courses/mine',
      name: 'my_courses',
      component: MyCoursesList,
      meta: {
        forLoggedIn: true,
      },
    },
    {
      path: '/course/:id',
      name: 'course',
      component: Course,
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
