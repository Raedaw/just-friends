import { useNavigate } from "react-router-dom";
import { setArea } from "../utils/firebase";
import "../Styles/area.css";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";
const Area = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    setArea().then(() => {
      navigate("/gender");
    });
  };

  const container = useRef(null);

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
