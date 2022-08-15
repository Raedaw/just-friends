import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import "../Styles/usersProfile.css";

export default function UserProfile() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [currentUserData, setCurrentUserData] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const { uid } = useParams();
  const db = getFirestore();
  const fetchUserProfile = async () => {
    const docRef = doc(db, "users", `${uid}`);
    const docSnap = await getDoc(docRef);
    setCurrentUserData(docSnap.data());
    try {
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
    } catch (error) {
      setErr(error);
    }
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
      } else {
        setErr("Document does not exist");
      }
    } catch (error) {
      setErr(error);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserProfile();
  }, [user, loading]);

  return (
    <>
      {err ? (
        <p> {err.message}</p>
      ) : (
        <div className="userProfile">
          <img
            src={currentUserData.avatarURL}
            className="user_picture"
            alt="your avatar"
          />
          <h3 className="usersName">
            {currentUserData.firstname} {currentUserData.surname}
          </h3>
          <div className="infoArea">
            <h3>Gender: {currentUserData.My_gender}</h3>
            <h3>Area: {currentUserData.area}</h3>
            <h3>Interest: {currentUserData.interest}</h3>
          </div>
          <h3 className="usersBio">
            {" "}
            {currentUserData.firstname}'s Bio{" "}
            <p className="usersBioArea">{currentUserData.bio}</p>{" "}
          </h3>
        </div>
      )}
    </>
  );
}
