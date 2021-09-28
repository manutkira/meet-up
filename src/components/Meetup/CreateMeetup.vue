<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3> 
        <h1 class="warning--text mb-5">Create a new meetup</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="createMeetup">
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                v-model="title"
                label="Title"
                id="title"
                required>
              </v-text-field> 
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                v-model="location"
                label="Location"
                id="location"
                required>
              </v-text-field> 
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised color="red" @click="onPickFile">Upload Photo</v-btn>
             <input
               type="file"
               style="display: none"
               ref="fileInput"
               accept="image/*"
               @change="onFilePick"/>
               
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm12 offset-sm3 class="mt-5">
              <img :src="imageUrl" height="150" alt="">
            </v-flex>
          </v-layout>
          <v-layout r>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                name="description"
                v-model="description"
                label="Description"
                id="description"
                multi-line
                required>
              </v-textarea> 
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <h2>Choose a date</h2>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3 >
              <v-date-picker color="green lighten-1" v-model="date"></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <h2>Choose a time</h2>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3 class="mb-6">
              <v-time-picker format="24hr" color="green lighten-1" v-model="time"></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="red mt-6"
                :disabled="!formValid"
                type="submit">create meetup</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data(){
    return{
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: new Date().toISOString().substr(0, 10),
      time: new Date(),
      image: null
    }
  },
  computed: {
    formValid(){
      return this.title !== '' && this.location !== '' && this.imageUrl !== '' && this.description !== ''
    },
    validData(){
      const date = new Date(this.date)
      if(typeof this.time === 'string'){
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
        }else{
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
      return date
    }
  },
  methods: {
    onPickFile(){
      this.$refs.fileInput.click()
    },
    onFilePick(e){
      console.log(e.target);
      const files = e.target.files
      let filename = files[0].name
      if(filename.lastIndexOf('.') <= 0){
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },
    createMeetup(){
      if(!this.formValid){
        return
      }
      if(!this.image){
        return
      }
      const meetupData ={
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.validData
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    }
  }
}
</script>

<style>
.required label::after {
    content: "*";
}
</style>