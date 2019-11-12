<template>
  <div id="app">
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/template/Header.vue';
import Footer from './components/template/Footer.vue';

export default {
  name: 'app',
  components: {
    Header,
    Footer,
  },
}
</script>

<style>
@import url("http://demo.productionready.io/main.css");
.curpoint {
  cursor: pointer;
}
</style>
