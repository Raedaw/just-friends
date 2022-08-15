import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import React from "react";
import "../Styles/profile.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setBio, setNewAvatar, setProfile, storage } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  bio: yup.string().min(10).required(),
});

function Profile() {
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  );
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [avatarURL, setAvatarURL] = useState([
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
  ]);
  const [images, setImages] = useState([]);
  const [changeBio, setChangeBio] = useState("");

  const uploadFile = (e) => {
    e.preventDefault();
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          return { bio: changeBio, avatarURL: url };
        })
        .then((info) => {
          setProfile(info);
          navigate("/chatroom");
        });
    });
  };
  function onImageChange(e) {
    console.log(e.target.files);
    setImages([...e.target.files]);
  }

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));

    setAvatarURL(newImageUrls);
  }, [images]);

  return (
    <div className="selectArea">
      <img src={avatarURL} className="upload_picture" alt=" your avatar" />
      <h2>Edit Profile:</h2>
      <form>
        <label className="custom-file-upload">
          {" "}
          Upload Photo
          <input
            type="file"
            onChange={(event) => {
              onImageChange(event);
              setImageUpload(event.target.files[0]);
            }}
            accept="image/*"
            role="button"
          />
        </label>
        <br></br>
        <label className="write_bio" htmlFor="bio">
          Write Bio:
        </label>
        <textarea
          id="bio"
          onChange={(e) => {
            setChangeBio(e.target.value);
          }}
          value={changeBio}
        ></textarea>
        <p role="alert">{errors.bio?.message}</p>
        <button
          onClick={(e) => {
            uploadFile(e);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Profile;
