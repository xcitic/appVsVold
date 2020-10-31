import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import UserService from './services/UserService.js';
import ApiService from './services/ApiService.js';
import LogService from './services/LogService.js';


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
