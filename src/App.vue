<template>
  <div id="app">
  <Header></Header>
  
    <!-- <router-link to="/home">Go to Foo</router-link>
    <router-link to="/editor">Go to Bar</router-link> -->
 
  <router-view></router-view>
  <Footer></Footer>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
// import Home from './components/Home.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';


export default {
  name: 'app',
  components: {
    Header,
    Footer,
    // HelloWorld,
    // Home
  },
}
</script>

<style>
@import url("http://demo.productionready.io/main.css");
</style>
