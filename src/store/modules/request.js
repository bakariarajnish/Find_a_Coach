import {
  saveRequestData,
  getRequestsData,
} from '../../services/request-service';

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
    AllRequest(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    contactCoach(context, data) {
      const requestData = {
        coachId: data.coachId,
        userEmail: data.email,
        message: data.message,
      };
      saveRequestData(requestData);
      context.commit('addNewRequest', requestData);
    },
    async loadRequestData(context) {
      const coachId = context.rootGetters['getLoggedInCoachId'];
      const requestData = await getRequestsData(coachId);
      context.commit('AllRequest', requestData);
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
