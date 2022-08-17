import { useState } from "react";
import VideoCall from "../VideoCall";
import "./calling-script";
import {
  joinStream,
  toggleCamera,
  toggleMic,
  leaveAndRemoveLocalStream,
} from "./calling-script";
import "./random.css";

function Calling() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <button
        id="join-btn"
        onClick={() => {
          joinStream();
        }}
      >
        Join Stream
      </button>

      <div id="stream-wrapper">
        <div id="video-streams"></div>

        <div id="stream-controls">
          <button
            id="leave-btn"
            onClick={() => {
              leaveAndRemoveLocalStream();
            }}
          >
            Leave Stream
          </button>
          <button
            id="mic-btn"
            onClick={(e) => {
              toggleMic(e);
            }}
          >
            Mic On
          </button>
          <button
            id="camera-btn"
            onClick={(e) => {
              toggleCamera(e);
            }}
          >
            Camera on
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calling;
