import { useNavigate } from "react-router-dom";
import { setArea } from "../utils/firebase";
import "../Styles/area.css";
import lottie from "lottie-web";
import { useEffect, useRef, useState } from "react";
// import { getDistance } from "geolib";
import getDistance from "geolib/es/getDistance";

const Area = () => {
  const [locationPosition, setLocationPosition] = useState({});
  const navigate = useNavigate();
  const geolib = require("geolib");

  const clickHandler = () => {
    setArea().then(() => {
      navigate("/gender");
    });
  };

  const container = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("geolocation not available");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocationPosition({
          ...position,
          defaultLatitude: position.coords.latitude,
          defaultLongitude: position.coords.longitude,
        });
      });
    }
  }, []);

  const coords = [
    {
      name: "manchester",
      latitude: 53.4808,
      longitude: -2.2426,
    },
    {
      name: "birmingham",
      latitude: 52.4862,
      longitude: -1.8904,
    },
    {
      name: "london",
      latitude: 51.5072,
      longitude: 0.1276,
    },
  ];

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position.coords);
      coords.forEach((coord) => {
        console.log(
          "You are ",
          geolib.getDistance(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            {
              latitude: coord.latitude,
              longitude: coord.longitude,
            }
          ) / 1000,
          `kms away from ${coord.name}`
        );
      });
    },
    () => {
      console.log("Position could not be determined.");
    }
  );

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../Just-friends_images/location (1).json"),
    });
  }, []);

  return (
    <div className="selectArea" role="select location">
      <h1>Select your location</h1>
      <button className="manchester" onClick={clickHandler}>
        MANCHESTER
      </button>
      <div className="container" ref={container}></div>
    </div>
  );
};

export default Area;
