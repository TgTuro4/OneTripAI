// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEkMpEqnldSNa4IKY7HrjFXzonR0kOTLo",
  authDomain: "ai-trip-v2.firebaseapp.com",
  projectId: "ai-trip-v2",
  storageBucket: "ai-trip-v2.appspot.com",
  messagingSenderId: "84775508864",
  appId: "1:84775508864:web:138f3e7e3d420e4f753f65",
  measurementId: "G-HERBM45Q03"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);