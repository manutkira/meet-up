<template>
  <v-dialog width="350px" persistent v-model="editDialog">
      <template v-slot:activator="{on}">
      <v-btn fab accent v-on="on">
          <v-icon>edit</v-icon>
      </v-btn>
      </template>
      <v-card>
          <v-container>
              <v-layout wrap>
                  <v-flex xs12>
                      <v-card-title>Edit Meetup</v-card-title>
                  </v-flex>
              </v-layout>
                  <v-divider></v-divider>
              <v-layout>
                  <v-flex xs12>
                      <v-card-text>
                          <v-text-field
                            name="title"
                            v-model="editedTitle"
                            label="Title"
                            id="title"
                            required>
                        </v-text-field> 
                        <v-textarea
                            name="description"
                            v-model="editedDescription"
                            label="Description"
                            id="description"
                            multi-line
                            required>
                        </v-textarea> 
                      </v-card-text>
                  </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout>
                  <v-flex xs12>
                      <v-card-actions>
                          <v-btn  class="blue darken-1" @click="editDialog = false">Close</v-btn>
                          <v-btn  class="blue darken-1" @click="onSaveChange">Save</v-btn>
                      </v-card-actions>
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
        return {
            editDialog: false,
            dialog: false,
            editedTitle: this.meetup.title,
            editedDescription: this.meetup.description,
        }
    },
    methods: {
        onSaveChange(){
            if(this.editedTitle.trim() === '' || this.editedDescription.trim() === ''){
                return
            }
            this.editDialog = false
            this.$store.dispatch('updateMeetupData', {
                id: this.meetup.id,
                title: this.editedTitle,
                description: this.editedDescription
            })
        },
    }
}
</script>

<style>

</style>