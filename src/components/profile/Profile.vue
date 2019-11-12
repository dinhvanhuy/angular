<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>{{profile.bio}}</p>
            <button class="btn btn-sm btn-outline-secondary action-btn" v-if="!isShow"
            @click="updateFollow()"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              {{following}} {{profile.username}}
            </button>
             <router-link class="btn btn-sm btn-outline-secondary action-btn" v-if="isShow"
             :to="{path:`/settings`}"
             >
              <i class="ion-plus-round"></i>
              &nbsp;
              Edit Profile Setting
             </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item curpoint">
                <router-link class="nav-link  " :to="{path: `/${username}`}"
                :class="{'active': show}"
                 >My Articles</router-link>
              </li>
              <li class="nav-item curpoint">
                <router-link class="nav-link " :to="{path: `/${username}/favorites`}"
                :class="{'active': !show}"
                >Favorited Articles</router-link>
              </li>
            </ul>
          </div>
        <ListArticle :userName="username"></ListArticle>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../services/api';
import ListArticle from './ListArticle.vue';
export default {
   /* eslint-disable */
  name: "Profile",
  components: {
    ListArticle,
  },
  props: ['userName'],
  data() {
    return {
      username: '',
      profile: {
        bio: '',
        following: false,
        image: '',
        username: '',
      },
      show: false,
      isShow:false,
      following:''
    };
  },
  created() {
    this.show = true;
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.username = this.$route.params.username;
      this.auth(this.username);
      api.prototype.get(`/profiles/${this.username}`)
      .then(({profile}) => {
        this.profile = profile;
        if(this.profile.following) {
          this.following = 'Unfollow';
        } else {
          this.following = 'Follow';
        }
      })
    },
     auth(username) {
      let user  = JSON.parse(localStorage.getItem('user'));
      if(user.username === username) {
        this.isShow =  true;
      }
    },
    updateFollow() {
      this.profile.following = !this.profile.following;
      this.following = this.profile.following ? "Unfollow" : "Follow";
      this.profile.following
        ? api.prototype.post(`/profiles/${this.username}/follow`)
        : api.prototype.delete(
            `/profiles/${this.username}/follow`
      );
    }
  },
     watch:{
      $route (to, from){
      this.show =  ! this.show;
    }

  }
};
</script>