import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

export default function UserProfile() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [currentUserData, setCurrentUserData] = useState("");
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
      console.log(error);
    }
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserProfile();
  }, [user, loading]);

  //   useEffect(() => {
  //     fetchUserProfile();
  //   });
  return (
    <div className="userProfile">
      <h2>My Profile</h2>
      <img
        src={currentUserData.avatarURL}
        className="user_picture"
        alt="your avatar"
      />
      <h3>Account Info</h3>
      <p>
        Name: {currentUserData.firstname} {currentUserData.surname}
      </p>
      <p>Email: {currentUserData.email}</p>
      <p>Gender: {currentUserData.My_gender}</p>
      <h3>Area</h3>
      <p>{currentUserData.area}</p>
      <h3>Interest</h3>
      <p>{currentUserData.interest}</p>
      <h3>Bio</h3>
      <p>{currentUserData.bio}</p>
    </div>
  );
}
