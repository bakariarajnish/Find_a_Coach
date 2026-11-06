import { createStore } from 'vuex';
import CoachModule from './modules/coach.js';
import RequestModule from './modules/request.js';

const store = createStore({
  modules: {
    coach: CoachModule,
    request: RequestModule,
  },
  state() {
    return {
      loggedInCoach: null,
    };
  },
  mutations: {
    updateLoggedInCoach(state, payload) {
      state.loggedInCoach = payload.coachId;
    },
  },
  getters: {
    getLoggedInCoachId(state) {
      console.log(state.loggedInCoach);
      return state.loggedInCoach;
    },
  },
  actions: {
    loggedInCoach(context, data) {
      context.commit('updateLoggedInCoach', data);
    },
  },
});

export default store;
