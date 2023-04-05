const firebase = require('firebase-admin');
const { initializeApp } = require("firebase-admin/app");
// require('firebase/compat/auth');
// require('firebase/compat/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCnbE44feutaPpuJ4TSZ3v_e8W7vW1FOtM",
  authDomain: "moalemy-88619.firebaseapp.com",
  projectId: "moalemy-88619",
  storageBucket: "moalemy-88619.appspot.com",
  messagingSenderId: "447167686068",
  appId: "1:447167686068:web:3e1d290da21df58cfd7ee1",
  measurementId: "G-WWDR5ZT2F0"
};

initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
module.exports = User;
