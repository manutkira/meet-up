import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


export default {
  state: {
    user: null,
  },
  getters: {
    user(state){
      return state.user
    },
  },
  mutations: {
    registerUserForMeetup(state, payload){
      const id = payload.id
      if(state.user.registerMeetup.findIndex(meetup => meetup.id === id) >= 0){
        return
      }
      state.user.registerMeetup.push(id)
      state.user.fbKey[id] = payload.fbKey
    },
    unRegisterUserFromMeetup(state, payload){
      const registeredMeetup = state.user.registerMeetup
      registeredMeetup.splice(registeredMeetup.findIndex(meetup => meetup.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKey, payload)
    },
    setUser(state, payload){
      state.user = payload
    },
  },
  actions: {
    registerUserForMeetup({commit, getters}, payload){
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registration/').push(payload).then(data => {
        commit('setLoading', false)
        commit('registerUserForMeetup', {id: payload, fbKey: data.key})
      }).catch(err => {
        console.log(err.message);
        commit('setLoading', false)
      })
    },
    unRegisterUserFromMeetup({commit}, payload){
      commit('setLoading', true)
      const user = this.getters.user
      if(!user.fbKey){
        return
      }
      const fbKey = user.fbKey[payload]
      firebase.database().ref('/users/' + user.id + '/registration/').child(fbKey).remove().then(() => {
        commit('setLoading', false)
        commit('unRegisterUserFromMeetup', payload)
      }).catch(err => {
        console.log(err.message);
        commit('setLoading', false)
      })
    },
    singupUser({commit}, payload){
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(user => {
        commit('setLoading', false)
        const newUser = {
          id: user.user.uid,
          registerMeetup: [],
          fbKey: {}
        }
        commit('setUser', newUser)
      }).catch(err => {
        commit('setLoading', false)
        commit('setError', err)
        console.log(err.message);
      })
    },
    singinUser({commit}, payload){
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then( user => {
        commit('setLoading', false)
        const newUser = {
          id: user.user.uid,
          registerMeetup: [],
          fbKey: {}
        }
        commit('setUser', newUser)
      }).catch(err => {
        commit('setLoading', false)
        commit('setError', err)
        console.log(err.message);
      })
    },
    currentUser({commit}, payload){
      commit('setUser', {
        id: payload.uid,
        registerMeetup: [],
        fbKey: {}
      })
    },
    fetchUserData({commit, getters}){
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registration/').once('value').then( data => {
        const dataPairs = data.val()
        let registeredMeetup = []
        let swappedPairs = {}
        for (let key in dataPairs){
          registeredMeetup.push(dataPairs[key])
          swappedPairs[dataPairs[key]] = key
        }
        const updateUser = {
          id: getters.user.id,
          registerMeetup: registeredMeetup,
          fbKey: swappedPairs
        }
        commit('setLoading', false)
        commit('setUser', updateUser)
      })
    },
    logout({commit}){
      firebase.auth().signOut()
      commit('setUser', null)
    },
  },
  modules: {
  }
}
