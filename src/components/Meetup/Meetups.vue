<template>
  <v-container>
      <v-layout v-for="meetup in meetups" :key="meetup.id" class="mb-4">
          <v-flex xs12>
              <v-card class="purple lighten-4" >
                  <v-container fluid>
                      <v-layout row>
                          <v-flex xs5 sm4 mb5>
                          <v-img :src="meetup.imageUrl" height="130px" class="mt-5 mb-5" contain ></v-img>
                          </v-flex>
                          <v-flex  xs7 sm5 md4>
                              <v-card-title primary-title>
                                  <div >
                                      <h4 class="white--text mb-0 ">{{meetup.title}}</h4>
                                      <div>{{meetup.date | date}}</div>
                                  </div>
                                  <v-card-actions>
                                      <v-btn class="pink lighten-3 mt-5" :to="'/meetups/' + meetup.id">
                                          <v-icon left dark>arrow_forward</v-icon>
                                          View Meetup
                                      </v-btn>
                                  </v-card-actions>
                              </v-card-title>
                          </v-flex>
                      </v-layout>
                  </v-container>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
    computed:{
        meetups(){
            return this.$store.getters.loadedMeetups
        }
    },
}
</script>

<style>
</style>