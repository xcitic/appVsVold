import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import UserService from './services/UserService.js';
import ApiService from './services/ApiService.js';


const apiService = new ApiService();
const userService = new UserService(apiService);

Vue.prototype.$userService = userService;
Vue.prototype.$apiService = apiService;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
