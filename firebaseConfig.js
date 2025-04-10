// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvS29v_53tUTiQ3ndXIK52Ggf6_MgLcKg",
  authDomain: "auth-firebase-projeto-au-d5591.firebaseapp.com",
  projectId: "auth-firebase-projeto-au-d5591",
  storageBucket: "auth-firebase-projeto-au-d5591.firebasestorage.app",
  messagingSenderId: "265746585812",
  appId: "1:265746585812:web:3087d7092e03f506414341",
  measurementId: "G-Y2BD7LPCET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs };
