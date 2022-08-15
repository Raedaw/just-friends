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

  return (
    <div className="interests_body">
      <div>
        <h1>Select your main interest</h1>
        <form className="interest-grid">
          {interests.map((interest) => {
            return (
              <label className="interests" key={`${interest}`}>
                <input
                  type="radio"
                  value={interest}
                  name="interest"
                  onChange={handleSelect}
                />
                {` ${interest}`}
              </label>
            );
          })}
        </form>

        <button
          className="next"
          onClick={() => {
            navigate("/profile");
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Interests;
