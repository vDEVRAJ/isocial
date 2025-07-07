import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTE_aplIBmrw9p-BGMJUB7A7Ws_8PA5XE",
  authDomain: "styleshow.firebaseapp.com",
  projectId: "styleshow",
  storageBucket: "styleshow.appspot.com", // ✅ corrected
  messagingSenderId: "259364032062",
  appId: "1:259364032062:web:a8cb42b62563dff8564b6f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
