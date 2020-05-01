import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBjA292VaGKerZrnUd9_6alGJ1l64TrUig",
  authDomain: "crwn-db-a934b.firebaseapp.com",
  databaseURL: "https://crwn-db-a934b.firebaseio.com",
  projectId: "crwn-db-a934b",
  storageBucket: "crwn-db-a934b.appspot.com",
  messagingSenderId: "957651886406",
  appId: "1:957651886406:web:0df9f66de709d03b838547",
  measurementId: "G-39L5YZWLKJ",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
