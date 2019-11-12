import Vue from 'vue/dist/vue.js';
import App from './App.vue';
import router from './routers/router';
import Vuelidate from 'vuelidate';
import moment from 'moment'


Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('LL')
  }
});

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});
