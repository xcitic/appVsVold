import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import './registerServiceWorker';
import UserService from './services/UserService';
import ApiService from './services/ApiService';
import LogService from './services/LogService'


const apiService = new ApiService();
export const userService = new UserService(apiService);
export const logService = new LogService(apiService);

Vue.prototype.$userService = userService;
Vue.prototype.$apiService = apiService;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
