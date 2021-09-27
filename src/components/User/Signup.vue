<template>
  <v-container>
    <v-layout v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <alert @dismissed="onDismissed" :text="error.message"></alert>
      </v-flex>
    </v-layout>
    <v-layout>
    <loading v-if="loading"/>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="green lighten-4">
        <v-card-text >
          <h1 class="ml-4 mb-5">Sign up</h1>
          <v-container>
            <form @submit.prevent="onSignup">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field name="email" label="Enter email" id="email" v-model="email" type="email">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field name="password" label="Enter password" id="password" v-model="password" type="password"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="confirmPassword"
                    label="Confirm Password"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    type="password"
                    :rules="[comparePassword]"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn class="mt-5" type="submit" :disabled="loading" :loading="loading" dark>
                    Sign Up
                    <span slot="loader" class="custom-loader">
                      <v-icon dark>cached</v-icon>
                    </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
        </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import alert from '../../shared/alert.vue'
import db from '../../firebase/firebaseInit'
import Loading from '../loading.vue'
export default {
  components: { alert, Loading },
  data(){
    return{
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  computed:{
    comparePassword(){
      return this.password !== this.confirmPassword ? 'passwords does not match!' : ''
    },
    user(){
      return this.$store.getters.user
    },
    error(){
      return this.$store.getters.error
    },
    loading(){
      return this.$store.getters.loading
    }
  },
  watch:{
    user(value){
      if(value !== null && value !== undefined){
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignup(){
      this.$store.dispatch('singupUser', {email: this.email, password: this.password})
    },
    onDismissed(){
      console.log('dismissed');
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>