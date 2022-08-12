// Import the functions you need from the SDKs you need
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  query,
  getDocs,
  getDoc,
  collection,
  where,
  setDoc,
  doc,
  updateDoc,
  onSnapshot,
  addDoc,
  serverTimestamp,
  DocumentReference,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  // signInWithGoogle
} from "firebase/auth";
import { getStorage } from "firebase/storage";

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
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const db = getFirestore(app);
// export const auth = getAuth();
// export const provider = new GoogleAuthProvider();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export const storage = getStorage(app);

// const googleProvider = new GoogleAuthProvider();
// const signInWithGoogle = async () => {
//   try {
//     const res = await signInWithPopup(auth, googleProvider);
//     const user = res.user;
//     const q = query(collection(db, "users"), where("uid", "==", user.uid));
//     const docs = await getDocs(q);
//     if (docs.docs.length === 0) {
//       await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (
  firstname,
  surname,
  email,
  password
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      firstname,
      surname,
      authProvider: "local",
      email,
      isOnline: true,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  const data = {
    isOnline: false,
  };

  setDoc(docRef, data, { merge: true })
    .then((docRef) => {
      console.log(docRef);
    })
    .then(() => {
      signOut(auth);
    })
    .catch((error) => {
      console.log(error);
    });
};

const setArea = async () => {
  const user = await auth.currentUser;
  const currentUserDoc = doc(db, "users", user.uid);
  try {
    await updateDoc(currentUserDoc, {
      area: "Manchester",
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const setProfile = async (submitInfo) => {
  const user = await auth.currentUser;
  const currentUserDoc = doc(db, "users", user.uid);
  const { bio, avatarURL } = submitInfo;
  try {
    await updateDoc(currentUserDoc, {
      bio,
      avatarURL,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const setGender = async (myGender) => {
  const user = await auth.currentUser;
  const currentUserDoc = doc(db, "users", user.uid);
  try {
    await updateDoc(currentUserDoc, {
      My_gender: `${myGender}`,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const setBio = async (bio) => {
  const user = await auth.currentUser;
  const currentUserDoc = doc(db, "users", user.uid);
  try {
    await updateDoc(currentUserDoc, {
      bio,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const setNewAvatar = async (bio) => {
  const user = await auth.currentUser;
  const currentUserDoc = doc(db, "users", user.uid);
  try {
    await updateDoc(currentUserDoc, {
      bio,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const setGenderPreference = async (preference) => {
  const user = await auth.currentUser;
  const currentUserDoc = doc(db, "users", user.uid);
  try {
    await updateDoc(currentUserDoc, {
      Gender_Preference: `${preference}`,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const setInterest = async (selectedInterest) => {
  const user = await auth.currentUser;
  const currentUserDoc = doc(db, "users", user.uid);
  try {
    await updateDoc(currentUserDoc, {
      interest: selectedInterest,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const setChat = async () => {
  // const user = await auth.currentUser;
  // console.log(user.uid);
  // const docRef = doc(db, "users", user.uid);
  // const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }

  const user = await auth.currentUser;
  const currentUserDoc = doc(db, "users", user.uid);
  const snapshot = await getDoc(currentUserDoc);
  return snapshot.data();

  // createDoc(db, userdata.area, userdata.interest);

  // updateDoc();

  // users: [user.uid];
};

const Filter = require("bad-words"),
  filter = new Filter();

const sendMessage = async (message, userData) => {
  const cleanMessage = filter.clean(message);
  // const createdAt = await serverTimestamp();
  await addDoc(collection(db, "Chatrooms", "Manchester", userData.interest), {
    message: cleanMessage,
    author: userData.uid,
    createdAt: Date.now(),
    firstname: userData.firstname,
    surname: userData.surname,
    avatarURL: userData.avatarURL,
  });
};

export {
  auth,
  db,
  // signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  signInWithEmailAndPassword,
  setArea,
  setGender,
  setGenderPreference,
  setInterest,
  setChat,
  sendMessage,
  setBio,
  setNewAvatar,
  setProfile,
};

// const analytics = getAnalytics(app);
