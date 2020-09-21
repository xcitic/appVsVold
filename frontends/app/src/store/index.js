import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isFirstTimeVisit: true
  },
  mutations: {
    setIsFirstTimeVisit(state) {
      state.isFirstTimeVisit = false;
    }
  },
  actions: {
    updateHasVisited({commit}) {
      this.commit('setIsFirstTimeVisit', false);
    }
  },
  modules: {
  }
})
