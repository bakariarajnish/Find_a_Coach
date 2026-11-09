import { createStore } from 'vuex';
import CoachModule from './modules/coach.js';
import RequestModule from './modules/request.js';
import AuthModule from './modules/auth.js';

const store = createStore({
  modules: {
    coach: CoachModule,
    request: RequestModule,
    auth: AuthModule,
  },
});

export default store;
