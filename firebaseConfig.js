const firebase = require('firebase-admin');
const { initializeApp } = require("firebase-admin/app");
const serviceAccount = require('./moaley1-firebase-adminsdk-f0je6-cca4b93de4.json')
// require('firebase/compat/auth');
// require('firebase/compat/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCL1e4gmRg0F5Iv-oZRZ4BscCqfGK74rTw",
  authDomain: "moaley1.firebaseapp.com",
  databaseURL: "https://moaley1-default-rtdb.firebaseio.com",
  projectId: "moaley1",
  storageBucket: "moaley1.appspot.com",
  messagingSenderId: "1052100611364",
  appId: "1:1052100611364:web:695d9a058cef4c3f24f7b1",
  measurementId: "G-RTHWEYXPCJ"
};

initializeApp({credential: firebase.credential.cert(serviceAccount),
databaseURL: firebaseConfig});
const db = firebase.firestore();
const Notifications = db.collection("Notifications");
module.exports = Notifications;;
