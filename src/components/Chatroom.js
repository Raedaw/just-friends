import { useState } from "react";

import { setChat } from "../utils/firebase";
import Groupchat from "./Groupchat";
import "../Styles/chatroom.css";
const Chatroom = () => {
  const [userData, setUserData] = useState({});
  const [joined, setJoined] = useState(false);

  const clickHandler = () => {
    return setChat()
      .then((data) => {
        setUserData(data);
      })
      .then(() => {
        setJoined(true);
      });
  };

  return (
    <div className="chatContainer">
      {!joined ? (
        <div className="selectArea">
          <h1 >Click to Join Chat:</h1>
          <button className="chat" onClick={clickHandler}>
            Join Chat
          </button>
        </div>
      ) : (
        <div className="groupChat">
          <Groupchat userData={userData} />
        </div>
      )}
    </div>
  );
};

export default Chatroom;
