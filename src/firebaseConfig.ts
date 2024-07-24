 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9zFpHeTFi06RyZl68WSzdfrAdF6e_uLE",
  authDomain: "wash-time-backoffice.firebaseapp.com",
  projectId: "wash-time-backoffice",
  storageBucket: "wash-time-backoffice.appspot.com",
  messagingSenderId: "853829137221",
  appId: "1:853829137221:web:5e493f0fb7a48ffc4e442c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider