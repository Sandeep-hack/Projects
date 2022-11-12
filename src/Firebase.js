import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiue_5EtRVSO4I1Tt-gqBTm5FyOsH7xKY",
  authDomain: "whatsapp-30777.firebaseapp.com",
  projectId: "whatsapp-30777",
  storageBucket: "whatsapp-30777.appspot.com",
  messagingSenderId: "1034201730375",
  appId: "1:1034201730375:web:b55ecb82bd6a8000f01062",
  measurementId: "G-3L2YV55GYG",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
