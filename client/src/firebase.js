// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "clone-web-thp.firebaseapp.com",
  projectId: "clone-web-thp",
  storageBucket: "clone-web-thp.appspot.com",
  messagingSenderId: "1048189116092",
  appId: "1:1048189116092:web:ad7df2d2f1ed7e03a0bab9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);