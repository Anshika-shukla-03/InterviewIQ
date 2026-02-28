
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-869ab.firebaseapp.com",
  projectId: "interviewiq-869ab",
  storageBucket: "interviewiq-869ab.firebasestorage.app",
  messagingSenderId: "768639477308",
  appId: "1:768639477308:web:849e8ec093bbd473af0539"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}