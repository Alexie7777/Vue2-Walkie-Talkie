import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQx2ICuUzH12hfiY3BGE-79ZN5YUWuNlU",
  authDomain: "vue2-walkie-talkie.firebaseapp.com",
  projectId: "vue2-walkie-talkie",
  storageBucket: "vue2-walkie-talkie.appspot.com",
  messagingSenderId: "85468634080",
  appId: "1:85468634080:web:6ea6793bef0e0c7e6aa985",
  measurementId: "G-DQXF7BHN30",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const ggProvider = new firebase.auth.GoogleAuthProvider();
export const ghProvider = new firebase.auth.GithubAuthProvider();
export const storage = firebase.storage();
