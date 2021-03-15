import firebase from 'firebase/app';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyAzfoIuJn2uYOWhUgvt2fr9wAIKJzzOhxg",
    authDomain: "mystudyapp-3f210.firebaseapp.com",
    projectId: "mystudyapp-3f210",
    storageBucket: "mystudyapp-3f210.appspot.com",
    messagingSenderId: "483888169599",
    appId: "1:483888169599:web:7def1fe1f52605c06ef54a",
    measurementId: "G-KZSZD3SZWM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();