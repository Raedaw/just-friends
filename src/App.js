import "./Styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Area from "./components/Area";
import Gender from "./components/Gender";
import Interests from "./components/Interests";
import Profile from "./components/Profile";
import MyProfile from "./components/MyProfile";
import UserProfile from "./components/UserProfile";
import Chatroom from "./components/Chatroom";
import Groupchat from "./components/Groupchat";
import Nav from "./components/Navbar";
import NotFoundPage from "./components/NotFoundPage";
import Safety from "./components/Safety";
import CameraCapture from "./components/CameraCapture";
import { useState } from "react";
import Calling from "./components/VideoCalling";
function App() {
  return (
    <div className="app">
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/VideoCall" element={<Calling />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/area" element={<Area />} />
          <Route exact path="/gender" element={<Gender />} />
          <Route exact path="/interests" element={<Interests />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/chatroom" element={<Chatroom />} />
          <Route exact path="/myprofile" element={<MyProfile />} />
          <Route exact path="/camera" element={<CameraCapture />} />
          <Route exact path="/safety" element={<Safety />} />
          <Route exact path="/profile/:uid" element={<UserProfile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
