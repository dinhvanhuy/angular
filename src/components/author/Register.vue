<template>
  <div class="auth-page">
    <div class="container page">
      <form @submit.prevent="register">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign up</h1>
            <p class="text-xs-center">
              <a href>Have an account?</a>
            </p>

            <ul class="error-messages">
              <li v-if="!$v.username.required && submited">username can't be blank</li>
              <li v-if="!$v.email.required && submited">email can't be blank</li>
              <li v-if="!$v.password.required && submited">password can't be blank</li>
              <li
                v-if="!$v.username.minLength && submited"
              >username is too short (minimum is 4 character)</li>
              <li
                v-if="!$v.username.maxLength && submited"
              >username is too long (maximum is 20 characters)</li>
              <li
                v-if="!$v.password.minLength && submited"
              >password is too long (minimum is 8 characters)</li>
            </ul>
            <ul class="error-messages" v-show="errors.length>0">
              <li v-for="error in errors" :key="error">{{error}}</li>
            </ul>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model.trim="$v.username.$model"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
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
            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">Sign up</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import api from "../../services/api";
import router from "../../routers/router";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      username: "",
      submited: false,
      errors: []
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(20)
    },
    password: {
      required,
      minLength: minLength(8)
    },
    email: {
      required
    }
  },
  created() {},
  methods: {
    register() {
      const user = {
        user: {
          email: this.email,
          password: this.password,
          username: this.username
        }
      };
      this.submited = true;

      if (this.$v.$invalid) {
        return;
      }

      api.prototype.post(`/users`, user).then(user => {
        localStorage.setItem("token", JSON.stringify(user.token));
        router.replace({ path: "/home" });
        if (user.errors) {
          for (let i in user.errors) {
            this.errors.push(i + " has already been taken");
          }
        }
      });
    }
  }
};
</script>