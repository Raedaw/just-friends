// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtygjUBerjJXt4o5Esu5J0z42NcpKJTe8",
  authDomain: "just-friends-4c0f0.firebaseapp.com",
  databaseURL:
    "https://just-friends-4c0f0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "just-friends-4c0f0",
  storageBucket: "just-friends-4c0f0.appspot.com",
  messagingSenderId: "16397584182",
  appId: "1:16397584182:web:387f23ee974fb12d8c1597",
  measurementId: "G-27CTFMZGCN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

// Initialize Firebase

// const analytics = getAnalytics(app);

// export default firebase;
