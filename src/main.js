import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import filterDate from './filters/date'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.config.productionTip = false
Vue.filter('date', filterDate)

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('currentUser', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
