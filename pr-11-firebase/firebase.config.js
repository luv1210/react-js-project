// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

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