import firebase, { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQx2ICuUzH12hfiY3BGE-79ZN5YUWuNlU",
  authDomain: "vue2-walkie-talkie.firebaseapp.com",
  projectId: "vue2-walkie-talkie",
  storageBucket: "vue2-walkie-talkie.appspot.com",
  messagingSenderId: "85468634080",
  appId: "1:85468634080:web:6ea6793bef0e0c7e6aa985",
  measurementId: "G-DQXF7BHN30",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
