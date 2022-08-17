import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import React from "react";
import "../Styles/profile.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setProfile, storage } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
//import { Camera, FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import CameraCapture from "./CameraCapture";

const schema = yup.object().shape({
  bio: yup.string().min(10).required(),
});

function Profile() {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
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
  const [takePic, setTakePic] = useState(false);
  const [dataURI, setDataURI] = useState("");

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
        })
        .catch((err) => {
          setErr(err);
        });
    });
  };
  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));

    setAvatarURL(newImageUrls);
  }, [images]);

  useEffect(() => {}, [dataURI]);

  return (
    <div className="selectArea">
      {err ? (
        <p>{err.message}</p>
      ) : (
        <>
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
                className="upload"
              />
            </label>
            <label className="take-own-picture">
              <button
                className="takepic"
                onClick={(e) => {
                  e.preventDefault();
                  setTakePic(true);
                }}
              >
                Take Picture
              </button>
            </label>
            {takePic && (
              <>
                <br></br>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setTakePic(false);
                  }}
                >
                  Cancel
                </button>
                <CameraCapture
                  setDataURI={setDataURI}
                  setAvatarURL={setAvatarURL}
                  setTakePic={setTakePic}
                  setImageUpload={setImageUpload}
                />
              </>
            )}
            <br></br>
            <label className="write_bio" htmlFor="bio">
              Write Bio:
            </label>
            <textarea
              className="writeBioHere"
              id="bio"
              onChange={(e) => {
                setChangeBio(e.target.value);
              }}
              value={changeBio}
            ></textarea>
            <p role="alert">{errors.bio?.message}</p>
            <button
              className="submit"
              onClick={(e) => {
                uploadFile(e);
              }}
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Profile;
