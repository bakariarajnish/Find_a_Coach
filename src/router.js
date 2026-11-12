import { createRouter, createWebHistory } from 'vue-router';

import store from './store/index.js';

import CoachesList from './pages/coach/CoachesList.vue';
import Login from './pages/auth/Login.vue';
import RequestList from './pages/request/RequestList.vue';
import NotFound from './NotFound.vue';

const RegisterPage = () => import('./pages/auth/Register.vue');
const ContactCoach = () => import('./pages/coach/ContactCoach.vue');
const CoachDetail = () => import('./pages/coach/CoachDetail.vue');

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/coaches',
      component: CoachesList,
    },
    {
      path: '/coaches/:coachId',
      component: CoachDetail,
      props: true,
      children: [
        {
          path: 'contact',
          component: ContactCoach,
        },
      ],
    },
    {
      path: '/login',
      component: Login,
      meta: { isNotAuthenticated: true },
    },
    {
      path: '/register',
      component: RegisterPage,
      meta: { isAuthenticated: true },
    },
    {
      path: '/requests',
      component: RequestList,
      meta: { isAuthAndRegisterAsCoach: true },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

routes.beforeEach((to, from, next) => {
  if (to.meta.isAuthAndRegisterAsCoach && store.getters.getToken == null) {
    next('/login');
  } else if (
    to.meta.isAuthenticated &&
    store.getters.getToken !== null &&
    store.getters['coach/isRegisteredAsCoach']
  ) {
    next('/coaches');
  } else if (
    to.meta.isAuthAndRegisterAsCoach &&
    !store.getters['coach/isRegisteredAsCoach']
  ) {
    next('/register');
  } else if (to.meta.isNotAuthenticated && store.getters.getToken !== null) {
    next('/coaches');
  } else {
    next();
  }
});

export default routes;
