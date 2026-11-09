import { authenticateUser } from '../../services/auth-service';

export default {
  state() {
    return {
      loggedInCoach: null,
      token: null,
      tokenExpiration: null,
    };
  },
  mutations: {
    updateLoggedInCoach(state, payload) {
      state.loggedInCoach = payload.coachId;
    },
    setCoach(state, payload) {
      state.loggedInCoach = payload.loginCoachId;
      state.token = payload.token;
      state.tokenExpiration = payload.tokenExpiresIn;
    },
  },
  getters: {
    getLoggedInCoachId(state) {
      return state.loggedInCoach;
    },
    getToken(state) {
      return state.token;
    },
  },
  actions: {
    async signUp(context, data) {
      const response = await authenticateUser(data, 'Signup');
      context.commit('setCoach', {
        loginCoachId: response.localId,
        token: response.idToken,
        tokenExpiration: response.expiresIn,
      });
    },
    async login(context, data) {
      const response = await authenticateUser(data, 'login');
      context.commit('setCoach', {
        loginCoachId: response.localId,
        token: response.idToken,
        tokenExpiresIn: response.expiresIn,
      });
    },
    logout(context) {
      context.commit('setCoach', {
        loginCoachId: null,
        token: null,
        tokenExpiresIn: null,
      });
    },
  },
};
