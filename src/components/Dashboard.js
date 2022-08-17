import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";
import { auth, db, logout } from "../utils/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [currentUserData, setCurrentUserData] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setCurrentUserData(data);
    } catch (err) {
      console.log(err);
      setErr(err);
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
      {err ? (
        <p> {err.message}</p>
      ) : (
        <div className="dashboard__container">
          Logged in as
          <div>{name}</div>
          <div>{user?.email}</div>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
