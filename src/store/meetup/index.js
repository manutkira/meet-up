import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


export default {
  state: {
    loadMeetups: [
      ],
  },
  getters: {
    loadedMeetups(state){
      return state.loadMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetup(state, getters){
      return getters.loadMeetups.slice(0,5)
    },
    loadedMeetup(state){
      return (meetupId) => {
        return state.loadMeetups.find(meetup => {
          return meetup.id === meetupId
        })
      }
    },
  },
  mutations: {
    setLoadedMeetup(state, payload){
      state.loadMeetups = payload
    },
    createMeetup(state, payload){
       state.loadMeetups.push(payload)
    },
    updateMeetup(state, payload){
      const meetup = state.loadMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if(payload.title){
        meetup.title = payload.title
      }
      if(payload.description){
        meetup.description = payload.description
      }
      if(payload.date){
        meetup.date = payload.date
      }
    },
  },
  actions: {
    loadMeetups({commit}){
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value').then(data => {
        const meetups = []
        const obj = data.val()
        for (let key in obj){
          meetups.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            location: obj[key].location,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoadedMeetup', meetups)
        commit('setLoading', false)
      }).catch(err => {
        console.log(err);
        commit('setLoading', false)
      })
    },
    createMeetup({commit}, payload){
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: this.getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup).then(data => {
        key = data.key
        return key
      }).then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref('meetups/' + key + '/' + ext).put(payload.image)
      }).then(fileData => {
        return fileData.ref.getDownloadURL().then(url => {
          imageUrl = url
          return firebase.database().ref('meetups').child(key).update({imageUrl: url})
        })
      }).then(() => {
        commit('createMeetup', {
          ...meetup,
          imageUrl: imageUrl,
          id: key
        })
      }).catch(err => {
        console.log(err);
      })
    },
    updateMeetupData({commit}, payload){
      commit('setLoading', true)
      const updateObj = {}
      if(payload.title){
        updateObj.title = payload.title
      }
      if(payload.description){
        updateObj.description = payload.description
      }
      if(payload.date){
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj).then(() => {
        commit('setLoading', false)
        commit('updateMeetup', payload)
      }).catch(err => {
        commit('setLoading', false)
        console.log(err.message);
      })
    },
  },
  modules: {
  }
}