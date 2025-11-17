import { FirebaseError, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { get, getDatabase, onValue, push, ref, set, update } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: "https://antiplagium-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const firestore = getFirestore(app);

export { database, firestore, ref, set, get, onValue, push, update, FirebaseError };

export const auth = getAuth();
