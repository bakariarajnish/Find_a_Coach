export default {
  namespaced: true,
  state() {
    return {
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
  },
  actions: {
    addNewCoach(context, data) {
      const coachId = new Date().toISOString();
      const coachData = {
        id: coachId,
        firstName: data.first,
        lastName: data.last,
        description: data.description,
        hourlyRate: data.rate,
        areas: data.areas,
      };
      context.dispatch('loggedInCoach', { coachId: coachId }, { root: true });
      context.commit('saveCoachData', coachData);
    },
  },
  getters: {
    getAllCoaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
  },
};
