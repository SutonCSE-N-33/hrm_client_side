// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATidx_9wCGKRBUJ5kCNpxc9WPyp-tpgUk",
  authDomain: "human-resource-managemen-30b58.firebaseapp.com",
  projectId: "human-resource-managemen-30b58",
  storageBucket: "human-resource-managemen-30b58.appspot.com",
  messagingSenderId: "1073275932701",
  appId: "1:1073275932701:web:250f14eb09b6623fccf6f4",
  measurementId: "G-CJ718ZF800"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default app;