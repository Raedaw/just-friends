import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setProfile } from "../utils/firebase";
import { imageRegex } from "../utils/imageRegex";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../Styles/profile.css";
import React from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const schema = yup.object().shape({
  bio: yup.string().min(10).required(),
  // avatarURL: yup
  //   .string()
  //   .matches(imageRegex, "Please enter a valid image url")
  //   .required(),
});

const Profile = () => {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState({});
  const [submitInfo, setSubmitInfo] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [images, setImages] = useState([]);
  const [avatarURL, setAvatarURL] = useState([
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
  ]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    data.avatarURL = avatarURL[0];
    setProfileInfo(data);
    setSubmitInfo(data);
  
const storage = getStorage();
const storageRef = ref(storage, 'avatarURL');
const metadata = {
  contentType: "image/png"
}
uploadBytes(storageRef, avatarURL, metadata).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});
  };

  useEffect(() => {
    if (submitInfo.bio) {
      console.log(submitInfo);
      setProfile(submitInfo).then(() => {
        navigate("/chatroom");
      });
    }
  }, [submitInfo, navigate]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    // images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));

    setAvatarURL(newImageUrls);
    console.log(avatarURL);
  }, [images]);



  function onImageChange(e) {
    console.log(e.target.files);
    setImages([...e.target.files]);
const storage = getStorage();
const storageRef = ref(storage, 'some-other-type-child');
const metadata = {
  contentType: "image/jpg"
}
uploadBytes(storageRef, avatarURL, metadata).then((snapshot) => {
  console.log('Uploaded a blob or file!');

  })}


  // {...register("avatarURL")}
  return (
    <div className="selectArea">
      <>
        {avatarURL.map((imageSrc) => (
          <img src={imageSrc} className="upload_picture" alt=" your avatar" />
        ))}
        <h2>Edit Profile:</h2>
        <label className="custom-file-upload">
          {" "}
          Upload Photo
          <input
            type="file"
            multiple
            accepts="image/*"
            onChange={(e) => {onImageChange(e)}}
          />
        </label>
      </>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="write_bio" htmlFor="bio">
          Write Bio:
        </label>
        <textarea id="bio" {...register("bio")}></textarea>
        <p>{errors.bio?.message}</p>
        <input type="submit" className="submit" />
      </form>
    </div>
  );
};

export default Profile;
