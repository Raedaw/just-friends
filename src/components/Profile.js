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
  const [avatarUrl, setAvatarUrl] = useState("https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg")
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

    console.log(data)
  };

  useEffect(() => {
    if (submitInfo.bio) {
      setProfile(submitInfo).then(() => {
        navigate("/chatroom");
      });
    }
  }, [submitInfo]);
  

 const changePic = (url) => {

 }


  console.log(avatarUrl)
  return (
    <div className="selectArea">
      <img className="photo_placeholder" alt="yourprofilepicture" src={avatarUrl}/>
      <h2>Edit Profile:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="bio">Write Bio:</label>
        <textarea id="bio" {...register("bio")}></textarea>
        <p>{errors.bio?.message}</p>
        <label htmlFor="avatar">Avatar URL:</label>
        <input id="avatar" onFocus={(event) => changePic(event.target.value)} {...register("avatarURL")}></input>
        <p>{errors.avatarURL?.message}</p>
        <input type="submit" className="submit" />
      </form>
    </div>
  );
};

export default Profile;
