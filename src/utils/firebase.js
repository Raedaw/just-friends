// Import the functions you need from the SDKs you need
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
  signOut(auth);
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
  setProfile,
  setGender,
  setGenderPreference,
  setInterest,
};

// const analytics = getAnalytics(app);
