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
      console.log(e);
      // navigate("/gender");
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
        className="find nearest"
        onClick={findNearest}
        visibility={!nearestLocation ? "visible" : "hidden"}
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
      <ButtonGroup aria-label="locations" onClick={clickHandler}>
        <Button variant="secondary" value="London">
          London
        </Button>
        <Button variant="secondary" value="Manchester">
          Manchester
        </Button>
        <Button variant="secondary" value="Birmingham">
          Birmingham
        </Button>
      </ButtonGroup>
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
