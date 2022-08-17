import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { setChat } from "../utils/firebase";
import "../Styles/chatroom.css";
import { db, sendMessage } from "../utils/firebase";
import {
  query,
  collection,
  getDocs,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import "../Styles/Groupchat.css";
import Online from "./online";
//import Calling from "./VideoCalling.js";
import Dropdown from "react-bootstrap/Dropdown";

const Groupchat = (props) => {
  const navigate = useNavigate();
  const { userData } = props;

  const [chatUsers, setChatUsers] = useState([]);
  const [currentMessageInput, setCurrentMessageInput] = useState("");
  const [message, setMessage] = useState("");
  const [messagesData, setMessagesData] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const bottomRef = useRef(null);

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
      collection(db, "Chatrooms", userData.area, userData.interest),
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
      where("interest", "==", userData.interest),
      where("area", "==", userData.area)
    );
    const q2 = query(
      collection(db, "users"),
      where("area", "==", userData.area)
    );
    const unsubscribe = onSnapshot(q && q2, (querySnapshot) => {
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
      sendMessage(message, userData, userData.area);
    }
  }, [message]);

  useEffect(() => {
    fetchMessages();
  }, [messagesData.length]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData.length]);

  const routeChange = () =>{ 
    let path = ('/VideoCall')
    navigate(path);
  }
  

  return (
    <div className="selectArea">
      <h2 className="roomName">
        Welcome to the <br></br>
        {userData.area} {userData.interest} Chat
      </h2>
      <button onClick={routeChange}>
            Video Call 
          </button>
      {/* <h3 className="active_member_header">Members online:</h3>
      <ul className="listOfActiveUsers">
        {onlineUsers.map((user) => {
          return (
            <li className="isActive" key={user.uid}>
              <Link className="isActive" to={`/profile/${user.uid}`}>
                <Online /> {user.firstname}
              </Link>
            </li>
          );
        })}
      </ul> */}
      <Dropdown className="dropDownBox">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {onlineUsers.length} users online
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {onlineUsers.map((user) => {
            return (
              <Dropdown.Item as={Link} to={`/profile/${user.uid}`}>
                <Online />
                {user.firstname}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <ul className="messages_box">
        {messagesData.map((message) => {
          // const date = new Date(message.data().createdAt.seconds * 1000);
          return (
            <li
              key={message.id}
              className={
                message.data().firstname === userData.firstname &&
                message.data().surname === userData.surname
                  ? "myMessageCard"
                  : "messageCard"
              }
            >
              <img
                src={message.data().avatarURL}
                alt={message.firstname}
                className={
                  message.data().avatarURL === userData.avatarURL
                    ? "myMessage-avatar"
                    : "message-avatar"
                }
              ></img>
              <p
                className={
                  message.data().firstname === userData.firstname &&
                  message.data().surname === userData.surname
                    ? "myName"
                    : "name"
                }
              >
                {message.data().firstname} {message.data().surname}:{" "}
              </p>

              <p
                className={
                  message.data().firstname === userData.firstname &&
                  message.data().surname === userData.surname
                    ? "myMessage"
                    : "message"
                }
              >
                {message.data().message}
              </p>
              <p
                className={
                  message.data().firstname === userData.firstname &&
                  message.data().surname === userData.surname
                    ? "myMessageSent"
                    : "messageSent"
                }
              >
                Sent at:{" "}
                {`${new Date(message.data().createdAt)
                  .toString()
                  .slice(0, -31)}`}
              </p>
            </li>
          );
        })}
        <div ref={bottomRef} />
      </ul>

      <label htmlFor="messageInput"></label>
      <textarea
        className="writeMessage"
        id="messageInput"
        value={currentMessageInput}
        placeholder="Type message here..."
        onChange={(e) => {
          handleChange(e);
        }}
      ></textarea>
      <button
        className="send_message_button"
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
