<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{path:`/home`}">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link class="nav-link active" :to="{path: `/home`}">Home</router-link>
        </li>
        <li class="nav-item" v-if="!isShow">
          <router-link class="nav-link" :to="{path:`/editor`}">
            <i class="ion-compose"></i>&nbsp;New Post
          </router-link>
        </li>
        <li class="nav-item" v-if="!isShow">
          <router-link class="nav-link" :to="{path:`/settings`}">Settings</router-link>
        </li>
        <li class="nav-item" v-if="!isShow">
          <router-link class="nav-link" :to="{path:`/${user.username}`}">
            <img
              class="user-pic"
              :src="user.image ? user.image : 'https://static.productionready.io/images/smiley-cyrus.jpg'"
            />
            {{ user.username }}
          </router-link>
        </li>

        <li class="nav-item" v-show="isShow">
          <router-link class="nav-link" :to="{path:`/login`}">Sign in</router-link>
        </li>
        <li class="nav-item" v-show="isShow">
          <router-link class="nav-link" :to="{path:`/register`}">Sign up</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import EventBus from '../../services/event-bus';
export default {
  name: "Header",
  data() {
    return {
      isShow: false,
      user: {},
    };
  },
  methods: {
    getUser() {
      const user = JSON.parse(localStorage.getItem("user"));
      this.user  = user;
      if (user == null) {
        this.isShow = true;
      }
    }
  },
  created() {
    this.getUser();
  },
  mounted() {
    EventBus.$on('logout', (isShow) =>{
      this.isShow =  isShow;
    });
    EventBus.$on('login', (isShow) =>{
      console.log(isShow);
      this.isShow =  isShow;
    });

  }
};
</script>