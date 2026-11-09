import { fetchCoachesData } from '../../services/coach-service';

export default {
  namespaced: true,
  state() {
    return {
      timeLastCoachesLoaded: null,
      coaches: [
        {
          id: 'c1',
          firstName: 'Maximilian',
          lastName: 'Schwarzmüller',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30,
        },
        {
          id: 'c2',
          firstName: 'Julie',
          lastName: 'Jones',
          areas: ['frontend', 'career'],
          description:
            'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30,
        },
      ],
    };
  },
  mutations: {
    saveCoachData(state, newCoachData) {
      state.coaches.push(newCoachData);
    },
    loadCoachData(state, payload) {
      state.coaches = payload;
    },
    saveLastTimeCoachesLoaded(state) {
      state.timeLastCoachesLoaded = new Date().getTime();
    },
  },
  actions: {
    async addNewCoach(context, data) {
      const coachId = context.rootGetters.getLoggedInCoachId;
      const coachData = {
        firstName: data.first,
        lastName: data.last,
        description: data.description,
        hourlyRate: data.rate,
        areas: data.areas,
      };
      const token = context.rootGetters.getToken;
      console.log('CONTEXT', context);
      console.log('TOKEN', token);
      const response = await fetch(
        `https://find-a-coach-e6fed-default-rtdb.firebaseio.com/coaches/${coachId}.json?auth=${token}`,
        {
          method: 'PUT',
          body: JSON.stringify(coachData),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        //handle error
      } else {
        console.log(responseData);
        //context.dispatch('loggedInCoach', { coachId: coachId }, { root: true });
        context.commit('saveCoachData', coachData);
      }
    },
    async loadCoachesData(context) {
      const coachesData = await fetchCoachesData();
      context.commit('loadCoachData', coachesData);
    },
    updateLastTimeCoachesLoaded(context) {
      context.commit('saveLastTimeCoachesLoaded');
    },
  },
  getters: {
    getAllCoaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    getLastRefreshTime(state) {
      return state.timeLastCoachesLoaded;
    },
    getCoachDetail(state, getters, rootState) {
      return rootState.auth.loggedInCoach;
    },
    isRegisteredAsCoach(state, getters) {
      let isRegisteredAsCoach = state.coaches.findIndex(
        (coach) => coach.id === getters.getCoachDetail
      );
      return isRegisteredAsCoach === -1 ? false : true;
    },
  },
};
