import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coach/CoachesList.vue';
import CoachDetail from './pages/coach/CoachDetail.vue';
import ContactCoach from './pages/coach/ContactCoach.vue';
import Login from './pages/auth/Login.vue';
import Register from './pages/auth/Register.vue';
import RequestList from './pages/request/RequestList.vue';
import NotFound from './NotFound.vue';

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
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/requests',
      component: RequestList,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

export default routes;
