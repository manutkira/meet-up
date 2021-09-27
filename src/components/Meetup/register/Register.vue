<template>
  <v-dialog width="500" persistent v-model="register">
      <template v-slot:activator="{on}">
      <v-btn accent v-on="on" class="pink mr-4">
          {{userIsRegister ? 'Unregister' : 'Register'}}
      </v-btn>
      </template>
      <v-card>
          <v-container>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-title v-if="userIsRegister">Unregister for meetup?</v-card-title>
                      <v-card-title v-else>Register for meetup?</v-card-title>
                  </v-flex>
              </v-layout>
                  <v-divider></v-divider>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-text>You can always change your decision later on.</v-card-text>
                  </v-flex>
              </v-layout>
              <v-layout>
                  <v-flex xs12>
                      <v-card-actions>
                          <v-btn class="red darken-3" @click="register = false">Cancel</v-btn>
                          <v-btn class="green darken-3" @click="onAgree">Confirm</v-btn>
                      </v-card-actions>
                  </v-flex>
              </v-layout>
          </v-container>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
    props: ['meetupId'],
    data(){
        return {
            register: false
        }
    },
    computed: {
        userIsRegister(){
            return this.$store.getters.user.registerMeetup.findIndex(meetupId => {
                return meetupId === this.meetupId
            }) >= 0
        }
    },
    methods: {
        onAgree(){
            if(this.userIsRegister){
                this.$store.dispatch('unRegisterUserFromMeetup', this.meetupId)
            }else{
                this.$store.dispatch('registerUserForMeetup', this.meetupId)

            }
        }
    }
}
</script>

<style>

</style>
