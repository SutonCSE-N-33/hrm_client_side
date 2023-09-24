// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDxpN4UqjuHXcPKMkvJzqLov7zMQB12ZHI",

  authDomain: "human-resource-managemen-fb230.firebaseapp.com",

  projectId: "human-resource-managemen-fb230",

  storageBucket: "human-resource-managemen-fb230.appspot.com",

  messagingSenderId: "659496106482",

  appId: "1:659496106482:web:c12f34cb2a2eefa17f936b",

  measurementId: "G-W20TDL3WW4"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export default app;