import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Switch, Route, Link, useNavigate } from "react-router-dom";
// import "../Styles/Nav.css";
import { auth, db, logout } from "../utils/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";

import NavDropdown from "react-bootstrap/NavDropdown";

function Navigation() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [currentUserData, setCurrentUserData] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      // console.log(data);
      setName(data.name);
      setCurrentUserData(data);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    // if (!user) return navigate("/");
    if (user) fetchUserName();
  }, [user, loading, navigate]);
  // console.log(window.location.pathname);
  if (!user) return null;

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt="Just friends logo"
              src={require("../Just-friends_images/just-friends_logo.png")}
              width="130"
              height="130"
              id="logo"
              className="d-inline-block align-top"
            />{" "}
            Just Friends
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Navbar.Text>
                Signed in as: <a href="#login">{currentUserData.firstname}</a>
              </Navbar.Text>
              <NavDropdown title="" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/myprofile">
                  View profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/gender">
                  Edit profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/chatroom">
                  View chat
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/chatmembers">
                  View chat members
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action6">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
