import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "lunch-77c6b.firebaseapp.com",
  projectId: "lunch-77c6b",
  storageBucket: "lunch-77c6b.appspot.com",
  messagingSenderId: "263423518503",
  appId: "1:263423518503:web:1a627d336b1112f99b2b02"
};

//initialize app
initializeApp(firebaseConfig)

//init serivces
const db = getFirestore();
const auth = getAuth();

export { db , auth }
