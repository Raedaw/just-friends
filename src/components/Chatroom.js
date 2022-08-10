import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setChat } from "../utils/firebase";
import Groupchat from "./Groupchat";

const Chatroom = () => {
  const navigate = useNavigate();
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
          <h2>Click to Join Chat:</h2>
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
