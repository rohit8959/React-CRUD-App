// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV8apWxxy0jOetTVD8kFK-L4A3Nf4VMKg",
  authDomain: "crud-app-98307.firebaseapp.com",
  projectId: "crud-app-98307",
  storageBucket: "crud-app-98307.firebasestorage.app",
  messagingSenderId: "712992642163",
  appId: "1:712992642163:web:88631b4c771534dcbb4606",
  measurementId: "G-FKLYZQX09Q"
};

// Initialize Firebase
const firebaseAppConfig = initializeApp(firebaseConfig);
export default firebaseAppConfig;
