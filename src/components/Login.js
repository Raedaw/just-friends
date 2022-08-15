import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db, firebaseConfig } from "../utils/firebase";
import {
  auth,
  signInWithEmailAndPassword,
  // signInWithGoogle,
} from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../Styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const data = {
        isOnline: true,
      };

      setDoc(docRef, data, { merge: true })
        // .then((docRef) => {})
        .then(() => {
          navigate("/chatroom");
        })
        .catch((err) => {
          setErr(err);
        });
    }
  }, [user, loading]);

  return (
    <div className="login_area">
      <div className="login">

        <div className="login__container" role="login">
          <img
            className="login_logo"
            alt="just friends logo"
            src={require("../Just-friends_images/just-friends_logo.png")}
          />
          <input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            aria-required="true"
          />
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-required="true"
          />
          <button
            className="login__btn"
            onClick={() =>
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  user = userCredential.user;
                })

        <div className="login__container">
          {err ? (
            <p> {err.message}</p>
          ) : (
            <>
              <img
                className="login_logo"
                alt="just friends logo"
                src={require("../Just-friends_images/just-friends_logo.png")}
              />
              <input
                type="text"
                className="login__textBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              />
              <input
                type="password"
                className="login__textBox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button
                className="login__btn"
                onClick={() =>
                  signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                      user = userCredential.user;
                    })


                    .catch((error) => {
                      setErr(error);
                    })
                }
              >
                Login
              </button>
            </>
          )}
          {/* <button className="login__btn login__google" onClick={signInWithGoogle}>
 Login with Google
</button> */}
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
