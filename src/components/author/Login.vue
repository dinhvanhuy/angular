<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href>Need an account?</a>
          </p>

          <ul class="error-messages">
            <li v-if="!$v.email.required && submited">email can't be blank</li>
            <li v-if="!$v.password.required && submited">email can't be blank</li>
            <li v-if="errors.length>0">{{errors}}</li>
          </ul>
          <form @submit.prevent="login">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model.trim="$v.email.$model"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model.trim="$v.password.$model"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../services/api";
import { required } from "vuelidate/lib/validators";
import router from "../../routers/router";
import EventBus from '../../services/event-bus';


export default {
  name: "Login",
  data() {
    return {
      errors: "",
      email: "",
      password: "",
      submited: false
    };
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    login() {
      this.submited = true;
      const user = {
        user: {
          email: this.email,
          password: this.password
        }
      };
      if (this.$v.$invalid) {
        return;
      }
      api.prototype.post(`/users/login`, user).then(user => {
        user.user['password'] = this.password;
        localStorage.setItem("user", JSON.stringify(user.user));
        EventBus.$emit('login', false);
        router.replace({ path: "/home" });
        if (user.errors) {
          this.errors = "email or password is invalid";
        }
      });
    }
  }
};
</script>