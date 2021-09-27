<template>
  <v-container>
      <v-layout row wrap v-if="loading">
          <v-flex xs12 sm12 offset-sm3>
              <v-progress-circular
                indeterminate
                color="green"
                v-if="loading">
                </v-progress-circular>
          </v-flex>
      </v-layout>
      <v-layout v-else>
          <v-flex xs12>
              <v-card>
                  <v-card-title>
                      <h4 class="error--text">{{meetup.title}}</h4>
                    <template v-if="userIsCreator"> 
                        <v-spacer></v-spacer>
                        <edit-meetup :meetup="meetup" color="red"/>
                    </template> 
                  </v-card-title>
                  <v-img :src="meetup.imageUrl" height="350px"></v-img>
                  <v-card-text>
                      <div class="info--text">{{meetup.date | date}} - {{meetup.location}}</div>
                      <div>
                          <edit-date :meetup="meetup"/>
                      </div>
                      <br>
                      <p>   {{meetup.description}}</p>
                  </v-card-text>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="pink lighten-4">Register</v-btn>
                  </v-card-actions>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import EditDate from './edit/EditDate.vue'
import editMeetup from './edit/editMeetup.vue'
export default {
  components: { editMeetup, EditDate },
    props: ['id'],
    computed:{
        meetup(){
            return this.$store.getters.loadedMeetup(this.id)
        },
        userAuthenticated(){
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        userIsCreator(){
            if(!this.userAuthenticated) {
                return false
            }
            return this.$store.getters.user.id === this.meetup.creatorId
        },
        loading(){
            return this.$store.getters.loading
        }
    },
}
</script>

<style>

</style>