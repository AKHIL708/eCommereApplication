// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0OHmOMXMIgvVtaWLLJNXMgODRthfQDgU",
  authDomain: "ecommerceapplication-2a15d.firebaseapp.com",
  projectId: "ecommerceapplication-2a15d",
  storageBucket: "ecommerceapplication-2a15d.appspot.com",
  messagingSenderId: "1009596082925",
  appId: "1:1009596082925:web:cd2a0fb215e2eca470fae4",
  measurementId: "G-PC3SQ9P80S",
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
module.exports = fireBaseApp;
