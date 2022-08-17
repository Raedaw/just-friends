import { useState } from "react";
import VideoCall from "../VideoCall";

function Calling() {
  const [inCall, setInCall] = useState(false);

  return (
    <div className="App" style={{ height: "100%" }}>
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <button
          variant="contained"
          color="primary"
          onClick={() => setInCall(true)}
        >
          Join Call
        </button>
      )}
    </div>
  );
}

export default Calling; 