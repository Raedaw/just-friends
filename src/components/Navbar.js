import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Nav.css";
import { auth, db, logout } from "../utils/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

const Nav = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [currentUserData, setCurrentUserData] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log(data);
      setName(data.name);
      setCurrentUserData(data);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading, logout]);

  if (!user) return null;

  return (
    <div className="nav">
      <div className="nav__container">
        <div className="logged-in-as">
          <p>Logged in as: </p>
          <Link to="/myprofile">
            <p>
              {currentUserData.firstname}
              <img
                className="navatar"
                src={currentUserData.avatarURL}
                alt="your avatar image"
              />
            </p>
          </Link>
        </div>

        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Nav;