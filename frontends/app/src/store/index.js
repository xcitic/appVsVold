import Vue from 'vue'
import Vuex from 'vuex'
import {userService, logService} from '../main.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    success: '',
    error: '',
    firstTimeVisit: true,
    username: null,
    token: null,
    logs: [],
    viewingLog: null,
  },
  mutations: {
    setError(state, msg) {
      state.error = msg;
    },
    setFirstTimeVisit(state) {
      state.firstTimeVisit = false;
    },

    setUserInfo(state, userInfo) {
      state.firstTimeVisit = userInfo.firstTimeVisit;
      state.username = userInfo.username;
      state.token = userInfo.token;
    },

    clearUserInfo(state) {
      state.username = null
      state.token = null;
      state.firstTimeVisit = true;
    },

    setAllLogs(state, logs) {
      state.logs = [...logs];
    },

    addLog(state, newLog) {
      state.logs = [newLog, ...state.logs];
    },

    setViewingLog(state, log) {
      state.viewingLog = log;
    }
  },
  actions: {
    async updateHasVisited({commit}) {
      try {
        const response = await userService.updateFirstTimeVisit(true)
        this.commit('setFirstTimeVisit', false);
      } catch(e) {
        commit('setError', e);
        throw e;
      }
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

    async userLogout({commit}) {
      await userService.logout();
      commit('clearUserInfo');
    },

    async userRegister({commit}, credentials) {
      try {
        const response = await userService.register(credentials);
        commit('setUserInfo', response);
      } catch (e) {
        throw e;
      }
    },

    async checkAuthentication({commit}) {
      if (userService.isLoggedIn) {
        const userInfo = {
          token: userService.token,
          username: userService.username,
          firstTimeVisit: userService.firstTimeVisit
        }
        commit('setUserInfo', userInfo);
      }
    },

    async saveLog({commit}, payload) {
      try {
        const newLog = await logService.saveLog(payload);
        commit('addLog', newLog);
      } catch (e) {
        throw e;
      }
    },

    async getAllLogs({commit}) {
      try {
        const logs = await logService.getAllLogs();
        commit('setAllLogs', logs);
      } catch (e) {
        throw e;
      }
    },

    async setViewingLog({commit}, log) {
      commit('setViewingLog', log);
    },

    async getOneLog({commit}, logId) {
      try {
        const log = await logService.getOneLog(logId);
        commit('setViewingLog', log);
      } catch (e) {
        throw e;
      }
    }
  },
  modules: {
  }
})
