import Vue from 'vue'
import Vuex from 'vuex'
import {userService} from '../main.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    success: '',
    error: '',
    isFirstTimeVisit: true,
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
    }
  },
  modules: {
  }
})
