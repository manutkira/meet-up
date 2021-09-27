<template>
  <v-app>
    
    <v-app-bar class="orange lighten-4">
      <v-app-bar-nav-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <router-link to="/">
        Meet-Up
        </router-link>
        </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="item in menuItem"
        :key="item.title"
        router
        :to="item.link"
        color="teal lighten-2"
        dark
        class="hidden-xs-only ml-4">
        <v-icon left>{{item.icon}}</v-icon>
        {{item.title}}</v-btn>
      <v-btn
        v-if="userIsAuthenticated"
        @click="onLogout"
        color="teal lighten-2"
        dark
        class="hidden-xs-only ml-4">
        <v-icon left>logout</v-icon>
        logout</v-btn>
      </v-app-bar>
    <main>
      <router-view></router-view>
    </main>
    <v-navigation-drawer v-model="sideNav">
      <v-list>
        <v-list-item
          v-for="item in menuItem"
          :key="item.title"
          router
          :to="item.link">
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{item.title}}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data(){
    return{
      sideNav: false,
    }
  },
  computed: {
    menuItem(){
      let menuItem = [
          {icon: 'face', title: 'Sign up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign in', link: '/signin'},
        ]
        if(this.userIsAuthenticated){
          menuItem = [
          {icon: 'supervisor_account', title: 'view meetup', link: '/meetups'},
          {icon: 'room', title: 'Organize meetup', link: '/newmeetup'},
          {icon: 'person', title: 'Profile', link: '/profile'},
          ]
        }
        return menuItem
    },
    userIsAuthenticated(){
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout(){
      this.$store.dispatch('logout')
      this.$router.push('/signin')
    }
  }
};
</script>
