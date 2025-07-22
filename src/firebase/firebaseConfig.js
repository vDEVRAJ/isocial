// src/app/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // ✅ Optional: for image uploads

const firebaseConfig = {
  apiKey: "AIzaSyDTE_aplIBmrw9p-BGMJUB7A7Ws_8PA5XE",
  authDomain: "styleshow.firebaseapp.com",
  projectId: "styleshow",
  storageBucket: "styleshow.appspot.com",
  messagingSenderId: "259364032062",
  appId: "1:259364032062:web:a8cb42b62563dff8564b6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export initialized services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // ✅ Optional but helpful

export { app, db, auth, storage };
