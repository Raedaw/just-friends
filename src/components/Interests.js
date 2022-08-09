import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import axios from "axios";

const Interests = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(auth.currentUser);
  const [selectedInterest, setSelectedInterest] = useState("");
  const interests = [
    "Arts & Culture",
    "Sport",
    "Travel & Outdoors",
    "Community & Environment",
    "Food",
    "Games & Technology",
    "TV & Film",
    "Parenting & Family",
    "Health & Wellbeing",
    "Pets",
  ];

  function handleClick(e) {
    if (!selectedInterest) {
      setSelectedInterest(e.target.value);
      axios
        .get(
          "https://just-friends-4c0f0-default-rtdb.europe-west1.firebasedatabase.app/"
        )
        .then((response) => {
          console.log(response.data);
        });
      // axios.post(
      //   "https://just-friends-4c0f0-default-rtdb.europe-west1.firebasedatabase.app/manchester/users"
      // );
      updateProfile(auth.currentUser, {
        age: 32,
      }).then(() => {
        console.log("profile updated");
        console.log(auth.currentUser);
      });
    } else {
      setSelectedInterest("");
    }
    console.log(selectedInterest);
  }

  return (
    <div>
      <ul className="interest-grid">
        {interests.map((interest) => {
          return (
            <li className="interest" key={interest}>
              <button
                className={
                  interest === selectedInterest ? "selected" : "not-selected"
                }
                value={interest}
                onClick={handleClick}
              >
                {interest}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Interests;
