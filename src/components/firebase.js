// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn7495OF2ZZj-D7e0arJMYPXGCam9l5Jk",
  authDomain: "cgt390-lab7.firebaseapp.com",
  projectId: "cgt390-lab7",
  storageBucket: "cgt390-lab7.firebasestorage.app",
  messagingSenderId: "902718824235",
  appId: "1:902718824235:web:57d1646dbece9d67c3af6e",
  measurementId: "G-FEJD6JCH62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { db }; // Export Firestore for use in your app
