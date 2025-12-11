// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVNZhm6SF7QQElnf2t7IsfupOPuFFLXaY",
  authDomain: "myntra-app-4cba1.firebaseapp.com",
  projectId: "myntra-app-4cba1",
  storageBucket: "myntra-app-4cba1.firebasestorage.app",
  messagingSenderId: "775648172576",
  appId: "1:775648172576:web:328294ac6ca2d4aabe3a45"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
