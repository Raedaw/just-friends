import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setChat } from "../utils/firebase";
import { auth, db, logout, sendMessage } from "../utils/firebase";
import { query, collection, getDocs, where, orderBy } from "firebase/firestore";
import { async } from "@firebase/util";

const Groupchat = (props) => {
  const navigate = useNavigate();
  const { userData } = props;
  const [chatUsers, setChatUsers] = useState([]);
  const [currentMessageInput, setCurrentMessageInput] = useState("");
  const [message, setMessage] = useState("");
  const [messagesData, setMessagesData] = useState([]);

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

  const handleChange = (e) => {
    setCurrentMessageInput(e.target.value);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    setMessage(currentMessageInput);
  };

  

  const fetchMessages = async () => {
    const q = query(
      collection(db, "Chatrooms", "Manchester", userData.interest),
      orderBy("createdAt")
    );
    const messages= await getDocs(q)
    // const messagesData = messages.docs;
    // console.log(messagesData[0].data().createdAt.toDate());
    // console.log(messagesData[0].id)
    setMessagesData(messages.docs)
  }
   
  useEffect(() => {
    if (message) {
      sendMessage(message, userData);
    }
    fetchMessages()
  }, [message]);

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
      <ul>
        {messagesData.map((message) =>{
          return (
              <li key={message.id}>
                <p>
                  {message.data().message}
                </p>
              </li>
          )
        })}
      </ul>
      <label htmlFor="messageInput">Write Message</label>
      <textarea
        id="messageInput"
        onChange={(e) => {
          handleChange(e);
        }}
      ></textarea>
      <button
        onClick={(e) => {
          clickHandler(e);
        }}
        disabled={!currentMessageInput}
      >
        Send Message
      </button>
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
