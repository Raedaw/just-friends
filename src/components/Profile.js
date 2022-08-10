import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setProfile } from "../utils/firebase";

const Profile = () => {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState({});
  const [submitInfo, setSubmitInfo] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    // if (!profileInfo.bio || !profileInfo.avatar) {
    //   const error = "You must submit an avatar URL & bio";
    // }
    setSubmitInfo(profileInfo);
  };

  const changeHandler = (event) => {
    const newObj = { ...profileInfo };
    if (event.target.id === "bio") {
      newObj.bio = event.target.value;
    } else {
      newObj.avatarURL = event.target.value;
    }
    setProfileInfo(newObj);
  };

  useEffect(() => {
    if (profileInfo.bio && profileInfo.avatarURL) {
      setButtonDisabled(false);
    }
  }, [profileInfo]);

  useEffect(() => {
    if (submitInfo.bio) {
      setProfile(submitInfo).then(() => {
        navigate("/chatroom");
      });
    }
  }, [submitInfo]);

  return (
    <div className="selectArea">
      <h2>Edit Profile:</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="bio">Write Bio:</label>
        <textarea
          id="bio"
          onChange={(event) => {
            changeHandler(event);
          }}
        ></textarea>
        <label htmlFor="avatar">Avatar URL:</label>
        <input
          id="avatar"
          onChange={(event) => {
            changeHandler(event);
          }}
        ></input>
        <button className="submit" disabled={buttonDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Profile;

// TODO - Regex on the URL?
// TODO - Error Handling
