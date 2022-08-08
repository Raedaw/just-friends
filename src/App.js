import "./App.css";
import { getDatabase } from "firebase/database";
import axios from "axios";

function App() {
  axios
    .get(
      "https://just-friends-4c0f0-default-rtdb.europe-west1.firebasedatabase.app/.json"
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  return (
    <div className="App">
      <p>hello</p>
    </div>
  );
}

export default App;
