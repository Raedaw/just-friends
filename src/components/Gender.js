import { useNavigate } from "react-router-dom";
import { setGender, setGenderPreference } from "../utils/firebase";
import "../Styles/gender.css";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";

const Gender = () => {
  const navigate = useNavigate();

  const myGenderHandler = (e) => {
    setGender(e.target.value);
  };

  const genderPreferenceHandler = (e) => {
    setGenderPreference(e.target.value);
  };

  const containertwo = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: containertwo.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../Just-friends_images/gender.json"),
    });
  }, []);

  return (
    <div className="body">
      <img
        className="gender_app_logo"
        alt="just friends logo"
        src={require("../Just-friends_images/just-friends_logo.png")}
      />
      <div className="containertwo" ref={containertwo}></div>

      <fieldset className="selectGender">
        <legend>
          <h2>Select Your Gender</h2>
        </legend>
        <div className="gender_radio_buttons">
          <div>
            <input
              type="radio"
              value="Male identifying"
              name="myGender"
              id="male identifying"
              onChange={(e) => {
                myGenderHandler(e);
              }}
            />
            <label for="male identifying"> Male Identifying</label>
          </div>
          <div>
            <input
              type="radio"
              value="Female identifying"
              name="myGender"
              id="female identifying"
              onChange={(e) => {
                myGenderHandler(e);
              }}
            />
            <label for="female identifying"> Female Identifying</label>
          </div>
          <div>
            <input
              type="radio"
              value="Non Binary"
              name="myGender"
              id="non binary"
              onChange={(e) => {
                myGenderHandler(e);
              }}
            />
            <label for="non binary"> Non Binary</label>
          </div>
          <div>
            <input
              type="radio"
              value="Prefer not to say"
              name="myGender"
              id="prefer not to say / other"
              onChange={(e) => {
                myGenderHandler(e);
              }}
            />
            <label for="prefer not to say / other">
              {" "}
              Prefer Not to Say / Other{" "}
            </label>
          </div>
        </div>
      </fieldset>

      <fieldset className="selectGenderPreference">
        <legend>
          <h2>Select your preference of Gender you wish to be friends with</h2>
        </legend>
        <div className="gender_preference_radio_buttons">
          <div>
            <input
              type="radio"
              value="Male"
              name="myGenderPreference"
              id="male"
              onChange={(e) => {
                genderPreferenceHandler(e);
              }}
            />
            <label for="male"> Male</label>
          </div>
          <div>
            <input
              type="radio"
              value="Female"
              name="myGenderPreference"
              id="female"
              onChange={(e) => {
                genderPreferenceHandler(e);
              }}
            />
            <label for="female"> Female</label>
          </div>
          <div>
            <input
              type="radio"
              value="Non Binary"
              name="myGenderPreference"
              id="non binary"
              onChange={(e) => {
                genderPreferenceHandler(e);
              }}
            />
            <label for="non binary"> Non Binary</label>
          </div>
          <div>
            <input
              type="radio"
              value="No Preference"
              name="myGenderPreference"
              id="no preference"
              onChange={(e) => {
                genderPreferenceHandler(e);
              }}
            />
            <label for="no preference"> No Preference</label>
          </div>
        </div>
      </fieldset>
      <button
        className="next_page"
        onClick={() => {
          navigate("/interests");
        }}
      >
        {" "}
        Next page{" "}
      </button>
    </div>
  );
};
export default Gender;
