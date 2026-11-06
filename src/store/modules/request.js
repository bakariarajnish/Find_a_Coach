export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addNewRequest(state, payload) {
      state.requests.push(payload);
    },
  },
  actions: {
    contactCoach(context, data) {
      const requestData = {
        id: new Date().toISOString(),
        coachId: data.coachId,
        userEmail: data.email,
        message: data.message,
      };
      context.commit('addNewRequest', requestData);
    },
  },
  getters: {
    getAllRequests(state) {
      return state.requests;
    },
    getCoachSpecificRequest(state, getters, rootState, rootGetters) {
      const coachId = rootGetters['getLoggedInCoachId'];
      const request = state.requests.filter(
        (request) => request.coachId === coachId
      );
      return request;
    },
    hasRequests(state) {
      return state.requests && state.requests.length > 0;
    },
  },
};
