import { useState } from "react";
import { setInterest } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

import "../Styles/interests.css";

const Interests = () => {
  const navigate = useNavigate();

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

  function handleSelect(e) {
    setInterest(e.target.value);
  }

  let count = 1;

  return (
    <div className="interests_body">
      <fieldset className="interest-grid">
        <legend>Select your main interest</legend>
        {interests.map((interest) => {
          return (
            <div>
              <input
                type="radio"
                value={interest}
                name="interest"
                onChange={handleSelect}
                id={interest}
              />
              <label
                for={interest}
                className={`div${count++}`}
                key={`${interest}`}
              >
                {interest}
              </label>
            </div>
          );
        })}

        <button
          className="next"
          onClick={() => {
            navigate("/profile");
          }}
        >
          Next page
        </button>
      </fieldset>
    </div>
  );
};

export default Interests;
