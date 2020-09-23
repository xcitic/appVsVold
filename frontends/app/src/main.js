import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import UserService from './services/UserService.ts';
import ApiService from './services/ApiService.ts';


const apiService = new ApiService();
export const userService = new UserService(apiService);

Vue.prototype.$userService = userService;
Vue.prototype.$apiService = apiService;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
