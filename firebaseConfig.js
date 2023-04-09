const firebase = require('firebase-admin');
const { initializeApp } = require("firebase-admin/app");
const serviceAccount = require('./moalemy-54d19-firebase-adminsdk-3xshx-5db105a3d9.json')


const firebaseConfig = {
  apiKey: "AIzaSyDgCmRAtjY-jqVRmHb4W_dlmkJoZnwbZs8",
  authDomain: "moalemy-54d19.firebaseapp.com",
  projectId: "moalemy-54d19",
  storageBucket: "moalemy-54d19.appspot.com",
  messagingSenderId: "239715172398",
  appId: "1:239715172398:web:79534f914a21f869c11fbf",
  measurementId: "G-51Y8PNXGK8"
};

initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: firebaseConfig
});
const db = firebase.firestore();
const Notifications = db.collection("Notifications");
module.exports = {Notifications, db};
