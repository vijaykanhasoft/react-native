import firebase from '@react-native-firebase/app';

var firebaseConfig = {
  apiKey: "AIzaSyBrjvppMeK7AVhKa2hHUK95OfRf1AC_fhw",
  authDomain: "fir-a4613.firebaseapp.com",
  databaseURL: "https://fir-a4613.firebaseio.com",
  projectId: "fir-a4613",
  storageBucket: "fir-a4613.appspot.com",
  appId: "1:959562225903:ios:82c820e51aa4879c2a631a",
  messagingSenderId: "959562225903"
}

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;