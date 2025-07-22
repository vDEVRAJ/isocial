// src/app/firebase/firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ✅ Fix: storage bucket domain corrected from ".firebasestorage.app" to ".appspot.com"
const firebaseConfig = {
  apiKey: "AIzaSyDTE_aplIBmrw9p-BGMJUB7A7Ws_8PA5XE",
  authDomain: "styleshow.firebaseapp.com",
  projectId: "styleshow",
  storageBucket: "styleshow.appspot.com", // ✅ corrected
  messagingSenderId: "259364032062",
  appId: "1:259364032062:web:05431082ed7e84bc564b6f",
};

// ✅ Prevent reinitialization during hot reload
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Export Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
