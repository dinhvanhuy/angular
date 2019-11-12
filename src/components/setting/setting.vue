<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form>
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture"
                v-model="user.image"
                >
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name"
                v-model="user.username"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you"
                v-model="user.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email"
                v-model="user.email"
                >
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password"
                v-model="user.password"
                >
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right"
              @click="updateSetting"
              >
                Update Settings
              </button>
          </fieldset>
        </form>
         <hr>
        <button 
          class="btn btn-outline-danger"
          @click="onLogout()">
          Or click here to logout
        </button>
      </div>

    </div>
  </div>
</div>
</template>
<script>
import api from '../../services/api';
import EventBus from '../../services/event-bus';
export default {
  name: "Setting",
  data() {
    return {
      user: {
        bio: '',
        email:'',
        image: '',
        password: '',
        username: ''
      }

    };
  },
  methods: {
    fetchData() {
      const user = JSON.parse(localStorage.getItem('user'));
      this.user = {...user};
    },
    updateSetting() {
      const user = {
        user: {
          ...this.user
        }
      }
      api.prototype.put(`/user`, user)
      .then((res) => {
        res.user['password'] = this.password;
        localStorage.setItem('user', JSON.stringify(res.user));
        this.$router.replace({
          path: `/home`
        })
      })
    },
    onLogout() {
      localStorage.clear();
      EventBus.$emit('logout', true);
      this.$router.replace({path: `/home`})
    }
  },
  created() {
    this.fetchData();
  }

};
</script>