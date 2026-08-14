import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBMIr2saZcJhDtqjkILYqQMyXOAXeWANwc",
  authDomain: "survly-c13e9.firebaseapp.com",
  databaseURL: "https://survly-c13e9-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "survly-c13e9",
  storageBucket: "survly-c13e9.firebasestorage.app",
  messagingSenderId: "248866389486",
  appId: "1:248866389486:web:feddf10d17033ef392a2ff",
  measurementId: "G-Y4PFP8NBF3"
};

export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
