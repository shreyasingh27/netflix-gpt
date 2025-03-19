// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1bdcs9gYjCMUr2VvEGYduMzEM0yFhkn0",
  authDomain: "netflix-gpt-2fd7d.firebaseapp.com",
  projectId: "netflix-gpt-2fd7d",
  storageBucket: "netflix-gpt-2fd7d.firebasestorage.app",
  messagingSenderId: "416884745587",
  appId: "1:416884745587:web:cb9e11888d3fa3925c1106",
  measurementId: "G-PCYMBDJT45",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
