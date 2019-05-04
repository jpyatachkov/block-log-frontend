import { JwtService } from '@/services';
import Router from 'vue-router';
import Vue from 'vue';

const Assignment = () => import('@/views/Assignment');
const AssignmentCreate = () => import('@/views/AssignmentCreate');
const AssignmentUpdate = () => import('@/views/AssignmentUpdate');
const Course = () => import('@/views/Course');
const CourseCreate = () => import('@/views/CourseCreate');
const CoursesList = () => import('@/views/CoursesList');
const CourseProgress = () => import('@/views/CourseProgress');
const CourseUpdate = () => import('@/views/CourseUpdate');
const Home = () => import('@/views/Home');
const Login = () => import('@/views/Login');
const MyCoursesList = () => import('@/views/MyCoursesList');
const MyCoursesActiveList = () => import('@/views/MyCoursesActiveList');
const MyCoursesInactiveList = () => import('@/views/MyCoursesInactiveList');
const NotFound = () => import('@/views/NotFound');
const Register = () => import('@/views/Register');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/404',
      name: 'not_found',
      component: NotFound,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        forAnonymous: true,
      },
    },
    {
      path: '*',
      redirect: {
        name: 'not_found',
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
      path: '/courses/mine/active',
      name: 'my_courses_active',
      component: MyCoursesActiveList,
      meta: {
        forLoggedIn: true,
      },
    },
    {
      path: '/courses/mine/inactive',
      name: 'my_courses_inactive',
      component: MyCoursesInactiveList,
      meta: {
        forLoggedIn: true,
      },
    },
    {
      path: '/course/new',
      name: 'course_create',
      component: CourseCreate,
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
    {
      path: '/course/:id/progress',
      name: 'course_progress',
      component: CourseProgress,
      meta: {
        forLoggedIn: true,
      },
    },
    {
      path: '/course/:id/edit',
      name: 'course_update',
      component: CourseUpdate,
      meta: {
        forLoggedIn: true,
      },
    },
    {
      path: '/course/:courseId/assignment/new',
      name: 'assignment_create',
      component: AssignmentCreate,
      meta: {
        forLoggedIn: true,
      },
    },
    {
      path: '/course/:courseId/assignment/:id',
      name: 'assignment',
      component: Assignment,
      meta: {
        forLoggedIn: true,
      },
    },
    {
      path: '/course/:courseId/assignment/:id/edit',
      name: 'assignment_update',
      component: AssignmentUpdate,
      meta: {
        forLoggedIn: true,
      },
    },
  ],
});

let initialPageLoad = true;

router.beforeEach(async (to, from, next) => {
  await Vue.nextTick();

  const forAnonymous = to.matched.some((route) => route.meta.forAnonymous);
  const forLoggedIn = to.matched.some((route) => route.meta.forLoggedIn);

  const userLoggedIn = JwtService.hasToken();

  // Если пользователь залогинен,
  // при первом входе на сайт показываем ему не лендинг,
  // а список его курсов.
  if (initialPageLoad && to.name === 'home' && userLoggedIn) {
    initialPageLoad = false;
    return next({ name: 'my_courses' });
  }

  initialPageLoad = false;

  if (forLoggedIn && userLoggedIn) {
    await router.app.$store.dispatch('account/me');
  }

  if (forAnonymous && userLoggedIn) {
    return next({ name: 'home' });
  }

  if (forLoggedIn && !userLoggedIn) {
    return next({ name: 'login' });
  }

  next();
});

export default router;
