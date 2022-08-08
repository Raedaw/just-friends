import "./Styles/App.css";
import { getDatabase } from "firebase/database";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";

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
      <h1>Hello</h1>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
