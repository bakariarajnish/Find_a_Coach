let timer;
import { authenticateUser } from '../../services/auth-service';

export default {
  state() {
    return {
      loggedInCoach: null,
      token: null,
      tokenExpiration: null,
      userDidLogout: false,
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
      state.userDidLogout = false;
    },
    setAutoLogout(state) {
      state.userDidLogout = true;
    },
  },
  getters: {
    getLoggedInCoachId(state) {
      return state.loggedInCoach;
    },
    getToken(state) {
      return state.token;
    },
    userDidLogout(state) {
      return state.userDidLogout;
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
      const expiresInMilliseconds = +response.expiresIn * 1000;
      //const expiresInMilliseconds = 30000;
      const tokenExpiration = new Date().getTime() + expiresInMilliseconds;
      localStorage.setItem('token', response.idToken);
      localStorage.setItem('loginCoachId', response.localId);
      localStorage.setItem('tokenExpiration', tokenExpiration);
      console.log('TokenExpIN', tokenExpiration);

      timer = setTimeout(function () {
        context.dispatch('autoLogout');
      }, expiresInMilliseconds);

      context.commit('setCoach', {
        loginCoachId: response.localId,
        token: response.idToken,
        tokenExpiresIn: tokenExpiration,
      });
    },
    autoLogin(context) {
      const token = localStorage.getItem('token');
      const loginCoachId = localStorage.getItem('loginCoachId');
      const tokenExpiration = +localStorage.getItem('tokenExpiration');
      const tokenExpirationTimeLeft = tokenExpiration - new Date().getTime();
      console.log('tokenExpirationTimeLeft', tokenExpirationTimeLeft);

      if (tokenExpirationTimeLeft < 0) {
        context.dispatch('autoLogout');
        return;
      }
      timer = setTimeout(function () {
        context.dispatch('autoLogout');
      }, tokenExpirationTimeLeft);

      if (token && loginCoachId) {
        context.commit('setCoach', {
          token,
          loginCoachId,
          tokenExpiresIn: tokenExpiration,
        });
      }
    },
    logout(context) {
      localStorage.removeItem('token');
      localStorage.removeItem('loginCoachId');
      localStorage.removeItem('tokenExpiration');
      clearTimeout(timer);
      context.commit('setCoach', {
        loginCoachId: null,
        token: null,
        tokenExpiresIn: null,
      });
    },
    autoLogout(context) {
      context.dispatch('logout');
      context.commit('setAutoLogout');
    },
  },
};
