import Vue from 'vue/dist/vue.js';
import App from './App.vue';
// import VueRouter from 'vue-router'
import router from './routers/router';
// Vue.use(VueRouter)

Vue.config.productionTip = false
// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }
// const routes = [
//   { path: '/foo', component: Foo },
//   { path: '/bar', component: Bar }
// ]
// const router = new VueRouter({
//   routes // short for `routes: routes`
// })

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});
