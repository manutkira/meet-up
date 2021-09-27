<template>
  <v-dialog width="350px" persistent v-model="editDialog">
      <template v-slot:activator="{on}">
      <v-btn accent v-on="on">
          Edit Date
      </v-btn>
      </template>
      <v-card>
          <v-container>
              <v-layout wrap>
                  <v-flex xs12>
                      <v-card-title>Edit Meetup Date</v-card-title>
                  </v-flex>
              </v-layout>
                  <v-divider></v-divider>
              <v-layout>
                  <v-flex xs12>
                      <v-date-picker v-model="editableDate" style="width: 100%" actions>
                          <template slot-scope="{save, cancel}">
                              <v-btn class="red darken-1" @click="editDialog">Close</v-btn>
                              <v-btn class="red darken-1" @click="onSaveChange">Save</v-btn>
                          </template>
                      </v-date-picker>
                  </v-flex>
              </v-layout>
          </v-container>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
    props: ['meetup'],
    data(){
        return{
            editDialog: false,
            editableDate: null,
        }
    },
    methods: {
        onSaveChange(){
            const newDate = new Date(this.meetup.date)
            const newDay = new Date(this.editableDate).getUTCDate()
            const newMonth = new Date(this.editableDate).getUTCMonth()
            const newYear = new Date(this.editableDate).getUTCFullYear()
            newDate.setUTCDate(newDay)
            newDate.setUTCMonth(newMonth)
            newDate.setUTCFullYear(newYear)
            this.$store.dispatch('updateMeetupData', {
            id: this.meetup.id,
            date: newDate
            })
        }
    },
    created() {
        //  let date = new Date(this.meetup.date) //set Date to the date of meetup

        // let day = date.getUTCDate()  // +1 cuz the days are counted from 0-30
        // let month = date.getUTCMonth() +1 // +1 cuz the months are counted from 0 to 11
        // let year = date.getUTCFullYear()


        // this.editableDate = year+"-"+month+"-"+day

         let date = new Date(this.meetup.date)
            let day = date.getUTCDate() +1
            if (day.toString().length == 1) {
                day = "0"+ day
            }
            let month = date.getUTCMonth() + 1
                if (month.toString().length == 1) {
                    month = "0"+month
                }
            let year = date.getUTCFullYear()
            this.editableDate = year+"-"+month+"-"+day

    }
}
</script>

<style>

</style>