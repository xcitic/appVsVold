import Vue from 'vue'
import Vuex from 'vuex'
import {userService, logService} from '../main.js';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    success: '',
    error: '',
    isFirstTimeVisit: false,
    user: null,
    username: null,
    token: null
  },
  mutations: {
    setError(state, msg) {
      state.error = msg;
    },
    setIsFirstTimeVisit(state) {
      state.isFirstTimeVisit = false;
    },

    setUserInfo(state, userInfo) {
      state.isFirstTimeVisit = userInfo.firstTimeVisit || true;
      state.username = userInfo.username;
      state.token = userInfo.token;
    }
  },
  actions: {
    updateHasVisited({commit}) {
      this.commit('setIsFirstTimeVisit', false);
    },

    async userLogin({commit}, credentials) {
      try {
        const response = await userService.login(credentials);
        commit('setUserInfo', response);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    async userRegister({commit}, credentials) {
      try {
        const response = await userService.register(credentials);
        commit('setUserInfo', response);
      } catch (e) {
        throw e;
      }
    },

    async getLogs({commit}) {
      try {
        const logs = await logService.getMyLogs();
        commit('setLogs', logs);
      } catch (e) {
        throw e;
      }
    }
  },
})

export default store;
