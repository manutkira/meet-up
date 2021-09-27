import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBDzmefU3vep9952vUvujER2BHEC3Zuto4",
  authDomain: "meetups-904b6.firebaseapp.com",
  projectId: "meetups-904b6",
  storageBucket: "meetups-904b6.appspot.com",
  messagingSenderId: "398046795339",
  appId: "1:398046795339:web:78c3550a137df7fdf49fce"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  export default firebaseApp.firestore()