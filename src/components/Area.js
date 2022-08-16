import { useNavigate } from "react-router-dom";
import { setArea } from "../utils/firebase";
import "../Styles/area.css";
import lottie from "lottie-web";
import { useEffect, useRef, useState } from "react";
// import { getDistance } from "geolib";
import getDistance from "geolib/es/getDistance";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Area = () => {
  const [locationPosition, setLocationPosition] = useState({});
  const [nearestLocation, setNearestLocation] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const geolib = require("geolib");

  const clickHandler = (e) => {
    setArea(e.target.value).then(() => {
      navigate("/gender");
    });
  };

  const clickHandlerNearest = () => {
    setArea(nearestLocation).then(() => {
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
      name: "Manchester",
      latitude: 53.4808,
      longitude: -2.2426,
    },
    {
      name: "Birmingham",
      latitude: 52.4862,
      longitude: -1.8904,
    },
    {
      name: "London",
      latitude: 51.5072,
      longitude: 0.1276,
    },
  ];

  // navigator.geolocation.getCurrentPosition(
  //   (position) => {
  //     console.log(position.coords);
  //     coords.forEach((coord) => {
  //       console.log(
  //         "You are ",
  //         geolib.getDistance(
  //           {
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           },
  //           {
  //             latitude: coord.latitude,
  //             longitude: coord.longitude,
  //           }
  //         ) / 1000,
  //         `kms away from ${coord.name}`
  //       );
  //     });
  //   },
  //   () => {
  //     console.log("Position could not be determined.");
  //   }
  // );

  function findNearest() {
    navigator.geolocation.getCurrentPosition((position) => {
      const nearest = geolib.findNearest(
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        coords
      );
      setNearestLocation(nearest.name);
    });
  }

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
      <button
        className={!nearestLocation ? "manchester" : "nearest_hidden"}
        onClick={findNearest}
      >
        Find your nearest location
      </button>
      {nearestLocation ? (
        <div>
          <p> Your nearest location is:</p>
          <button className="manchester" onClick={clickHandlerNearest}>
            {nearestLocation}
          </button>
        </div>
      ) : (
        <></>
      )}
      <br />
      <p>or select from the following options:</p>
      <div className="inline">
        <Button
          className="button"
          variant="light"
          value="London"
          onClick={clickHandler}
        >
          London
        </Button>
        {"  "}
        <Button
          className="button"
          variant="light"
          value="Manchester"
          onClick={clickHandler}
        >
          Manchester
        </Button>
        {"  "}
        <Button
          className="button"
          variant="light"
          value="Birmingham"
          onClick={clickHandler}
        >
          Birmingham
        </Button>
      </div>
      {/* <button className="manchester" onClick={clickHandler}>
        Manchester
      </button>
      <button className="manchester" onClick={clickHandler}>
        Birmingham
      </button>
      <button className="manchester" onClick={clickHandler}>
        London
      </button> */}
      <div className="container" ref={container}></div>
    </div>
  );
};

export default Area;
