import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Switch, Route, Link, useNavigate } from "react-router-dom";
import "../Styles/Nav.css";
import { auth, db, logout } from "../utils/firebase";
import {
  query,
  collection,
  getDocs,
  where,
  onSnapshot,
  doc,
} from "firebase/firestore";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";

import NavDropdown from "react-bootstrap/NavDropdown";

function Navigation() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [err, setErr] = useState(null);
  const [currentUserData, setCurrentUserData] = useState("");
  const navigate = useNavigate();
  const [avatarURL, setAvatarURL] = useState("");

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      // console.log(data);
      // setAvatarURL(data.avatarURL);
      setName(data.name);
      setCurrentUserData(data);
      console.log("running");
      const unsub = onSnapshot(doc(db, "cities", user.uid), (doc) => {
        console.log("Current data: ", doc.data());
      });
    } catch (err) {
      setErr("An error occured while fetching user data");
    }
  };

  // const unsub = async () =>{
  //   const doc = await getDoc(q);
  //   onSnapshot(doc(db, "users", user.uid), (doc) => {
  //    console.log("Current data: ", doc.data());
  // });}

  //   const unsub =
  //     const doc = await getDoc(q);
  //     onSnapshot(doc(db, "users", user.uid), (doc) => {
  //      console.log("Current data: ", doc.data());
  //   });}

  //   const unsub = onSnapshot(doc(db, "cities", user.uid), (doc) => {
  //     console.log("Current data: ", doc.data());
  // });

  useEffect(() => {
    if (loading) return;
    if (!user && window.location.pathname !== "/register") return navigate("/");
    if (user) fetchUserName();
    // console.log(avatarURL);
  }, [user, loading, navigate, avatarURL]);
  // console.log(window.location.pathname);
  if (
    !user ||
    window.location.pathname === "/area" ||
    window.location.pathname === "/gender" ||
    window.location.pathname === "/interests" ||
    window.location.pathname === "/profile"
  )
    return null;

  return (
    <>
      <Navbar className="navbar_container" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt="Just friends logo"
              src={require("../Just-friends_images/just-friends.png")}
              width="130"
              height="130"
              id="logo"
              className="d-inline-block-align-top"
              role="logo"
            />
          </Navbar.Brand>
        </Container>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" role="navigation">
            <Nav.Link as={Link} to="/myprofile" className="navLinks">
              View profile
            </Nav.Link>

            <Nav.Link className="navLinks" as={Link} to="/chatroom">
              View chat
            </Nav.Link>

            <Nav.Link className="navLinks" as={Link} to="/safety">
              Staying safe
            </Nav.Link>

            <Nav.Link className="navLinks" as={Link} to="/" onClick={logout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="loggedIn">
          <Navbar.Text className="navLinks">Signed in as:{"  "} </Navbar.Text>
          <Navbar.Text className="navLinks" as={Link} to="/myprofile">
            {currentUserData.firstname}
          </Navbar.Text>
          <img
            className="navatar"
            src={currentUserData.avatarURL}
            alt="your avatar"
            width="130"
            height="130"
          />
        </div>
      </Navbar>
    </>
  );
}

export default Navigation;
