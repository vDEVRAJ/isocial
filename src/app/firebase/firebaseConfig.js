import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDTE_aplIBmrw9p-BGMJUB7A7Ws_8PA5XE",
  authDomain: "styleshow.firebaseapp.com",
  projectId: "styleshow",
  storageBucket: "styleshow.appspot.com",
  messagingSenderId: "259364032062",
  appId: "1:259364032062:web:05431082ed7e84bc564b6f"
};

const app = initializeApp(firebaseConfig);
export default app;
