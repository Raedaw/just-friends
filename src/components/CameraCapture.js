import React, { useState } from "react";
// import "./styles.css";
import { Camera, FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

const CameraCapture = (props) => {
  const {
    setDataURI,
    setAvatarURL,
    setTakePic,
    setImageUpload,
    setUpdatedAvatar,
  } = props;
  return (
    <div className="camera">
      <Camera
        idealFacingMode={FACING_MODES.USER}
        isImageMirror={false}
        isFullScreen={true}
        isMaxResolution={true}
        // idealResolution={{
        //   width: 3024,
        //   height: 4032
        // }}
        sizeFactor={1}
        onTakePhoto={(dataURI) => {
          fetch(dataURI)
            .then((response) => response.blob())
            .then((myBlob) => {
              // console.log(myBlob);
              const objectURL = URL.createObjectURL(myBlob);
              setAvatarURL(objectURL);
              setUpdatedAvatar(objectURL);

              return myBlob;
              // dataURI = objectURL;
            })
            .then((dataURI) => {
              setDataURI(dataURI);
              setImageUpload(dataURI);
              setTakePic(false);
              // console.log(dataURI);
              // console.log(dataURI);
            });
        }}
      />
      {/* <a href={dataURI} download>
        <img src={dataURI} alt="" />
      </a> */}
    </div>
  );
};

export default CameraCapture;
