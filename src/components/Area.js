import { useNavigate } from "react-router-dom";
import { setArea } from "../utils/firebase";

const Area = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    setArea().then(() => {
      navigate("/gender");
    });
  };

  return (
    <div className="selectArea">
      <h2>Select Your Location:</h2>
      <button className="manchester" onClick={clickHandler}>
        Manchester
      </button>
    </div>
  );
};

export default Area;
