<template>
  <v-container>
      <v-layout row wrap class="pt-5 mb-2">
          <v-flex xs12 sm6 class="text-xs-center text-sm-right">
              <v-btn large router class="primary" to="/meetups">Explore Meetup here</v-btn>
          </v-flex>
          <v-flex xs='12' sm='6' class="text-xs-center text-sm-left"> 
              <v-btn large router class="warning" to="/newmeetup">Organize Meetup</v-btn>
          </v-flex>
      </v-layout>
      <v-layout>
          <v-flex xs12 sm12 offset-sm3>
              <v-progress-circular
                indeterminate
                color="green"
                v-if="loading">
                </v-progress-circular>
          </v-flex>
      </v-layout>
      <v-layout row wrap class="mt-4">
          <v-flex xs12 sm12 offset-sm3>
              <h2>Join our awesome meetups!</h2>
          </v-flex>
      </v-layout>
      <v-layout row wrap v-if="!loading" class="mt-5">
          <v-flex xs='12'  justify-center>
              <v-carousel style="cursor: pointer;">
              <v-carousel-item
                v-for="meetup in meetups"
                :key="meetup.id"
                :src="meetup.imageUrl"
                @click="onLoadMeetup(meetup.id)">
                  <div class="title">{{meetup.title}}</div>
              </v-carousel-item>
              </v-carousel>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
    computed:{
        meetups(){
            return this.$store.getters.loadedMeetups
        },
        loading(){
            return this.$store.getters.loading
        }
    },
    methods: {
        onLoadMeetup(id){
            this.$router.push('/meetups/' + id)
        }
    }
}
</script>

<style>
.title{
    position: absolute;
    bottom: 50px;
   background: rgba(0, 0, 0, 0.9);
   color: aliceblue;
   padding: 20px;
   font-size: 2rem;
}
</style>