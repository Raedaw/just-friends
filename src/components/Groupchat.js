import { useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { setChat } from "../utils/firebase";
import { auth, db, logout, sendMessage } from "../utils/firebase";
import {
  query,
  collection,
  getDocs,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { async } from "@firebase/util";
import "../Styles/Groupchat.css";

const Groupchat = (props) => {
  const navigate = useNavigate();
  const { userData } = props;
  const [chatUsers, setChatUsers] = useState([]);
  const [currentMessageInput, setCurrentMessageInput] = useState("");
  const [message, setMessage] = useState("");
  const [messagesData, setMessagesData] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const q = query(
      collection(db, "users"),
      where("interest", "==", userData.interest)
    );
    const doc = await getDocs(q);
    const allDocs = doc.docs;
    const userNames = allDocs.map((user) => {
      return {
        uid: user.data().uid,
        name: user.data().firstname,
        isOnline: user.data().isOnline,
      };
    });
    setChatUsers(userNames);
  };

  const handleChange = (e) => {
    setCurrentMessageInput(e.target.value);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    setMessage(currentMessageInput);
    setCurrentMessageInput("");
  };

  const fetchMessages = async () => {
    const q = query(
      collection(db, "Chatrooms", "Manchester", userData.interest),
      orderBy("createdAt")
    );
    const messages = await onSnapshot(q, (querySnapshot) => {
      const allmessage = [];
      querySnapshot.forEach((doc) => {
        allmessage.push(doc);
      });
      setMessagesData(allmessage);
    });

    // await setMessagesData(allmessage)

    // .then((messages) => {
    //   console.log(messages, "dis one");
    //   setMessagesData(messages);
    // });
  };

  // const q = query(collection(db, "cities"), where("state", "==", "CA"));
  // const unsubscribe = onSnapshot(q,

  // (querySnapshot) => {
  //   const cities = [];
  //   querySnapshot.forEach((doc) => {
  //       cities.push(doc.data().name);
  //   });
  //   console.log("Current cities in CA: ", cities.join(", "));
  // });

  // useEffect(() => {
  //   const fetchOnlineUsers = async () => {
  //     const q = query(collection(db, "users", userData.isOnline));
  //     const onlineUsersSnap = await onSnapshot(q, (querySnapshot) => {
  //       const allUsersOnline = [];
  //       querySnapshot.forEach((doc) => {
  //         console.log(doc.data());
  //         allUsersOnline.push(doc);
  //       });
  //       console.log(allUsersOnline);
  //       setOnlineUsers(allUsersOnline);
  //     }).then(() => {
  //       fetchOnlineUsers();
  //     });
  //   };
  // }, [onlineUsers]);
  const fetchOnlineUsers = () => {
    const q = query(
      collection(db, "users"),
      where("interest", "==", userData.interest)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allPeopleOnline = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().isOnline) {
          allPeopleOnline.push(doc.data());
        }
        setOnlineUsers(allPeopleOnline);
      });
    });
  };

  useEffect(() => {
    fetchOnlineUsers();
  }, [onlineUsers.length]);

  useEffect(() => {
    if (message) {
      sendMessage(message, userData);
    }
  }, [message]);

  useEffect(() => {
    fetchMessages();
  }, [messagesData.length]);

  return (
    <div className="selectArea">
      <h2>
        Welcome to the <br></br>
        {userData.area} {userData.interest} Chat
      </h2>
      <h3>Members online:</h3>
      <ul>
        {onlineUsers.map((user) => {
          return <li key={user.uid}>{user.firstname + "🟢"}</li>;
        })}
      </ul>
      <h3>Messages:</h3>
      <ul>
        {messagesData.map((message) => {
          // const date = new Date(message.data().createdAt.seconds * 1000);
          return (
            <li key={message.id} className="message-card">
              <p>
                {message.data().firstname} {message.data().surname}:{" "}
                {message.data().message}
                <img
                  src={message.data().avatarURL}
                  alt={message.firstname}
                  className="message-avatar"
                ></img>
              </p>
              <p>
                Sent at:{" "}
                {`${new Date(message.data().createdAt)
                  .toString()
                  .slice(0, -31)}`}
              </p>
            </li>
          );
        })}
      </ul>
      <label htmlFor="messageInput">Write Message</label>
      <textarea
        id="messageInput"
        value={currentMessageInput}
        placeholder="Type message here..."
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
// })
