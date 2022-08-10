import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  setDoc,
  doc,
  updateDoc,
  onSnapshot
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

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

export default function Chat() {


  return (
      <div>
    <div>chat</div>
    </div>
  )
}
