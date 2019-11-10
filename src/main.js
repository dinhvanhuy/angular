import Vue from 'vue/dist/vue.js';
import App from './App.vue';
import router from './routers/router';
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});
