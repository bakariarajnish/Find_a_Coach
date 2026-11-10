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
      return context.dispatch('auth', { ...data, mode: 'signup' });
    },
    async login(context, data) {
      return context.dispatch('auth', { ...data, mode: 'login' });
    },
    async auth(context, data) {
      const response = await authenticateUser(data);
      localStorage.setItem('token', response.idToken);
      localStorage.setItem('loginCoachId', response.localId);
      context.commit('setCoach', {
        loginCoachId: response.localId,
        token: response.idToken,
        tokenExpiresIn: response.expiresIn,
      });
    },
    autoLogin(context) {
      const token = localStorage.getItem('token');
      const loginCoachId = localStorage.getItem('loginCoachId');
      if (token && loginCoachId) {
        context.commit('setCoach', {
          token,
          loginCoachId,
        });
      }
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
