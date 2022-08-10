import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setChat } from "../utils/firebase";
import { auth, db, logout } from "../utils/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

const Groupchat = (props) => {
  const navigate = useNavigate();
  const { userData } = props;
  const [chatUsers, setChatUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
    console.log(userData, "Current User's Info");
  }, []);

  const fetchUsers = async () => {
    const q = query(
      collection(db, "users"),
      where("interest", "==", userData.interest)
    );
    const doc = await getDocs(q);
    const allDocs = doc.docs;
    const userNames = allDocs.map((user) => {
      return { uid: user.data().uid, name: user.data().firstname };
    });
    setChatUsers(userNames);
  };

  return (
    <div className="selectArea">
      <h2>
        Welcome to the <br></br>
        {userData.area} {userData.interest} Chat
      </h2>
      <h3>Members in Chat:</h3>
      <ul>
        {chatUsers.map((user) => {
          return <li key={user.uid}>{user.name}</li>;
        })}
      </ul>
      <h3>Messages:</h3>
      <ul></ul>
      <label htmlFor="messageInput">Write Message</label>
      <textarea id="messageInput"></textarea>
      <button>Send Message</button>
    </div>
  );
};

export default Groupchat;

// import { collection, query, where, onSnapshot } from "firebase/firestore";

// const q = query(collection(db, "cities"), where("state", "==", "CA"));
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   const cities = [];
//   querySnapshot.forEach((doc) => {
//       cities.push(doc.data().name);
//   });
//   console.log("Current cities in CA: ", cities.join(", "));
// });
