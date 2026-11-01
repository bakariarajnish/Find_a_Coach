import { createStore } from 'vuex';
import CoachModule from './modules/coach.js';
import RequestModule from './modules/request.js';

const store = createStore({
  modules: {
    coach: CoachModule,
    request: RequestModule,
  },
  state() {},
  mutations: {},
  getters: {},
  actions: {},
});

export default store;
