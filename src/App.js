import "./Styles/App.css";
import { getDatabase } from "firebase/database";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Area from "./components/Area";
import Gender from "./components/Gender";
import Interests from "./components/Interests";
import Profile from "./components/Profile";

function App() {
  // axios
  //   .get(
  //     "https://just-friends-4c0f0-default-rtdb.europe-west1.firebasedatabase.app/.json"
  //   )
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  return (
    <div className="app">
      <h1>JustFriends</h1>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          {/* <Route exact path="/reset" element={<Reset />} /> */}
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/area" element={<Area />} />
          <Route exact path="/gender" element={<Gender />} />
          <Route exact path="/interests" element={<Interests />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
