import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setProfile } from "../utils/firebase";
import { imageRegex } from "../utils/imageRegex";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  bio: yup.string().min(10).required(),
  avatarURL: yup
    .string()
    .matches(imageRegex, "Please enter a valid image url")
    .required(),
});

const Profile = () => {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState({});
  const [submitInfo, setSubmitInfo] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setProfileInfo(data);
    setSubmitInfo(data);
  };

  useEffect(() => {
    if (submitInfo.bio) {
      setProfile(submitInfo).then(() => {
        navigate("/chatroom");
      });
    }
  }, [submitInfo]);

  return (
    <div className="selectArea">
      <form onSubmit={handleSubmit(onSubmit)}>
        <legend>
          <h2>Edit Profile:</h2>
        </legend>
        <label for="bio">Write Bio:</label>
        <textarea id="bio" {...register("bio")}></textarea>
        <p>{errors.bio?.message}</p>
        <label for="avatar">Avatar URL:</label>
        <input id="avatar" {...register("avatarURL")}></input>
        <p>{errors.avatarURL?.message}</p>
        <input type="submit" className="submit" />
      </form>
    </div>
  );
};

export default Profile;
