// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7etwcm0SnLWpPkJrcIKSdcoYT2Q9fECM",
  authDomain: "mart-56538.firebaseapp.com",
  projectId: "mart-56538",
  storageBucket: "mart-56538.appspot.com",
  messagingSenderId: "372560193297",
  appId: "1:372560193297:web:ffb6c57a4b896e01914eb0",
  measurementId: "G-25F69TMMM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }
