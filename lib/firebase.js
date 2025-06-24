import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIpzAMnul6bZ4IYJR7zkcbjiwir7q8hS8",
  authDomain: "garuda-phantom.firebaseapp.com",
  projectId: "garuda-phantom",
  storageBucket: "garuda-phantom.firebasestorage.app",
  messagingSenderId: "137428305427",
  appId: "1:137428305427:web:4eedbe4d39c77d1fcae1e6",
  measurementId: "G-4WPJW3C7ZK"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
const db = getFirestore(app);

export { db };
