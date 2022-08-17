import { useState } from "react";
import { setChat } from "../utils/firebase";
import Groupchat from "./Groupchat";
import "../Styles/chatroom.css";

const Chatroom = () => {
  const [userData, setUserData] = useState({});
  const [joined, setJoined] = useState(false);
  const [err, setErr] = useState(null);

  const clickHandler = () => {
    return setChat()
      .then((data) => {
        setUserData(data);
      })
      .then(() => {
        setJoined(true);
      })
      .catch((err) => {
        console.log(err);
        setErr(err.msg);
      });
  };

  return (
    <div className="chatContainer">
      {err ? (
        <p> {err.message}</p>
      ) : !joined ? (
        <div className="selectArea">
          <h1 className="joinChat">Click to Join Chat:</h1>
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
