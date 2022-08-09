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
      <form className="interest-grid">
        {interests.map((interest) => {
          return (
            <label className="interest" key={`${interest}`}>
              <input
                type="radio"
                value={interest}
                name="interest"
                onChange={handleSelect}
              />
              {interest}
            </label>
          );
        })}

        <button
          onClick={() => {
            navigate("/profile");
          }}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Interests;
