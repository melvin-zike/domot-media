import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB2R4VRVSNVrhdsg2nuHCaDBsmto3IvAi0",
    authDomain: "domot-social.firebaseapp.com",
    projectId: "domot-social",
    storageBucket: "domot-social.appspot.com",
    messagingSenderId: "174439525811",
    appId: "1:174439525811:web:e3ccf5d08265e5d0fd2fc6",
    measurementId: "G-VHR6J8TKVQ"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export default storage;