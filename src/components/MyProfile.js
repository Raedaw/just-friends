import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "../Styles/Dashboard.css";
import "../Styles/myProfile.css";
import {
  auth,
  db,
  logout,
  setBio,
  setArea,
  setGender,
  setInterest,
  setNewAvatar,
  storage,
} from "../utils/firebase";
import * as yup from "yup";
import { query, collection, getDocs, where } from "firebase/firestore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

const schema = yup.object().shape({
  bio: yup.string().min(10).required(),
});

const MyProfile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [currentUserData, setCurrentUserData] = useState({});
  const [editArea, setEditArea] = useState(false);
  const [editAvatar, setEditAvatar] = useState(0);
  const [editInterest, setEditInterest] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [editGender, setEditGender] = useState(false);
  const [changeBio, setChangeBio] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [avatarURL, setAvatarURL] = useState([`${currentUserData.avatarURL}`]);
  const [images, setImages] = useState([]);

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setCurrentUserData(data);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    // if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading, editGender, editArea, editInterest, editBio, editAvatar]);

  const clickHandler = () => {
    setArea();
    setEditArea(false);
  };

  useEffect(() => {
    console.log(changeBio);
  }, [changeBio]);

  const myGenderHandler = (e) => {
    setGender(e.target.value).then(() => {
      setEditGender(false);
    });
  };

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
    setEditInterest(false);
  }

  const updateBio = (e) => {
    e.preventDefault();
    setBio(changeBio);
    setEditBio(false);
  };

  const uploadFile = (e) => {
    e.preventDefault();
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          setNewAvatar(url);
        })
        .then(() => setEditAvatar(editAvatar + 1));
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
    <div className="myProfile">
      <h2 className="myProfileTitle">My Profile</h2>
      <img
        src={currentUserData.avatarURL}
        className="upload_picture"
        alt=" your avatar"
      />
      <label className="edit-file-upload">
        {" "}
        Select new photo
        <input
          type="file"
          onChange={(event) => {
            onImageChange(event);
            setImageUpload(event.target.files[0]);
          }}
          accept="image/*"
        />
      </label>
      < button
      className="uploadPhoto"
        onClick={(e) => {
          uploadFile(e);
        }}
      >
        Upload photo
      </button>
      <div className="accountInfoBox">
      <h3>Account Info</h3>
      <p>
        Name: {currentUserData.firstname} {currentUserData.surname}
      </p>
      <p>Email: {currentUserData.email}</p>
      </div>
      <div className="profileBox">
        <div className="editGenderBox">
      <h3>Gender</h3>
      {editGender ? (
        <div className="editSelectGender">
          <div className="edit_gender_radio_buttons">
              Male Identifying
            <input
              type="radio"
              value="Male identifying"
              name="myGender"
              onChange={(e) => {
                myGenderHandler(e);
              }}
            />{" "}
             Female Identifying
            <input
              type="radio"
              value="Female identifying"
              name="myGender"
              onChange={(e) => {
                myGenderHandler(e);
              }}
            />{" "}
             Non Binary
            <input
              type="radio"
              value="Non Binary"
              name="myGender"
              onChange={(e) => {
                myGenderHandler(e);
              }}
            />{" "}
             Prefer Not to Say
            <input
              type="radio"
              value="Prefer not to say"
              name="myGender"
              onChange={(e) => {
                myGenderHandler(e);
              }}
            />{" "}
          </div>
        </div>
      ) : (
        <div className="myGender">
          <p>{currentUserData.My_gender}</p>

          <button
            onClick={() => {
              setEditGender(true);
            }}
          >
            Edit
          </button>
        </div>
        
      )}
      </div>
      <div className="editAreaBox">
      <h3>Area</h3>
      {editArea ? (
        <div className="myProfArea">
          <h2 className="myProfAreaTitle">Select your location</h2>
          <button className="myProfManchester" onClick={clickHandler}>
            MANCHESTER
          </button>
        </div>
      ) : (
        <div className="editMyProfArea">
          <p>{currentUserData.area}</p>

          <button
            onClick={() => {
              setEditArea(true);
            }}
          >
            Edit
          </button>
        </div>
      )}
      </div>
      <div className="editInterestsBox">
      <h3>Interest</h3>
      {editInterest ? (
        <div>
          <form>
            {interests.map((interest) => {
              return (
                <label className="interests" key={`${interest}`}>
                  <input
                    type="radio"
                    value={interest}
                    name="interest"
                    onChange={handleSelect}
                  />
                  {` ${interest}`}
                </label>
              );
            })}
          </form>
        </div>
      ) : (
        <div className="myInterests">
          <p>{currentUserData.interest}</p>

          <button
            onClick={() => {
              setEditInterest(true);
            }}
          >
            Edit
          </button>
        </div>
      )}
      </div>
      <div className="editBioBox">
      <h3>Bio</h3>
      {editBio ? (
        <div className="editMyBio">
          <label className="updatebio" htmlFor="bio">
            Update your bio:
          </label>
          <textarea
            id="bio"
            onChange={(e) => {
              setChangeBio(e.target.value);
            }}
            value={changeBio}
          ></textarea>
          <button onClick={updateBio}>Submit</button>
        </div>
      ) : (
        <div className="myBio">
          <p>{currentUserData.bio}</p>
          <button
            onClick={() => {
              setEditBio(true);
            }}
          >
            Edit
          </button>
        </div>
        
      )}
      </div>
      </div>
    </div>
  );
};

export default MyProfile;
