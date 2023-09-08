import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5O7vtfsigthVgcj2FPc5i48Cw8efOFq0",
  authDomain: "lubb-test.firebaseapp.com",
  projectId: "lubb-test",
  storageBucket: "lubb-test.appspot.com",
  messagingSenderId: "431189664035",
  appId: "1:431189664035:web:01b3434d4f1b630ed0ac96",
  measurementId: "G-7VYKH6NXN5",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore();

export {
  auth,
  db,
  collection,
  addDoc,
  getDoc,
  doc,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
};
