// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDCIgE_VG6l4jfLnJ5pSrqXHzLdZpnc7So",
  authDomain: "pet-veterinary-git-main-kishoredeveloper-projects23.vercel.app",
  projectId: "pet-website-ad1a4",
  storageBucket: "pet-website-ad1a4.firebasestorage.app",
  messagingSenderId: "614975877815",
  appId: "1:614975877815:web:5f865ef889588739cb1332",
  measurementId: "G-J5XKDC318Z"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);