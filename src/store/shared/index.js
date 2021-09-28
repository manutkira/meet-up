import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


export default {
  state: {
    loading: false,
    error: null,
  },
  getters: {
    loading(state){ 
      return state.loading
    },
    error(state){
      return state.error
    }
  },
  mutations: {
    setLoading(state, payload){
      state.loading = payload
    },
    setError(state, payload){
      state.error = payload
    },
    clearError(state){
      state.error = null
    }
  },
  actions: {
    clearError({commit}){
      commit("clearError")
    }
  },
  modules: {
  }
}