import { useState } from "react";
import { setInterest } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

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
    <div>
      <fieldset className="interest-grid">
        <legend>Select an interest</legend>
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
              <label for={interest} className="interest" key={`${interest}`}>
                {interest}
              </label>
            </div>
          );
        })}

        <button
          onClick={() => {
            navigate("/profile");
          }}
        >
          Next
        </button>
      </fieldset>
    </div>
  );
};

export default Interests;
