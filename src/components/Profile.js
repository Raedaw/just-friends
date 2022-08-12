import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setProfile } from "../utils/firebase";
import { imageRegex } from "../utils/imageRegex";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../Styles/profile.css";
import React from "react";
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
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLS] = useState (["https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"]);
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
  }, [submitInfo, navigate]);
  


  useEffect(() => {
      if (images.length < 1) return;
      const newImageUrls = [];
      images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
      setImageURLS(newImageUrls);
  }, [images]);

  function onImageChange(e) {
      setImages([...e.target.files]);
  }


  return (
   
    <div className="selectArea">
       <>
       { imageURLS.map(imageSrc => <img src={imageSrc} className="upload_picture" alt=" your avatar" {...register("imageURLS")}/> ) }
       <h2>Edit Profile:</h2>
       <label className="custom-file-upload"> Upload Photo
    <input type="file" multiple accepts="image/*" onChange={onImageChange}/>
    </label>
    </>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="write_bio" htmlFor="bio">Write Bio:</label>
        <textarea id="bio" {...register("bio")}></textarea>
        <p>{errors.bio?.message}</p>
        <input type="submit" className="submit" />
      </form>
    </div>
   
  );
};

export default Profile;
