import { useNavigate } from "react-router-dom";
import { setGender, setGenderPreference } from "../utils/firebase";
import "../Styles/gender.css";
import lottie from "lottie-web";
import { useEffect, useRef} from "react";

const Gender = () => {
    const navigate = useNavigate();
  
    const myGenderHandler = (e) => {
      setGender(e.target.value)
      };


    const genderPreferenceHandler = (e) => {
      setGenderPreference(e.target.value)
      };

      const containertwo = useRef(null)

  useEffect(() => {
lottie.loadAnimation({
container: containertwo.current,
renderer: 'svg',
loop:true,
autoplay: true,
animationData: require('../Just-friends_images/gender.json')})
  }, [])
  
  
    return (
      <div className="body">
        <img className ="gender_app_logo" alt ="just friends logo" src={require('../Just-friends_images/just-friends_logo.png')}/>
           <div className="containertwo" ref={containertwo}></div>
           <h2>Select your gender</h2>
      <div className="selectGender">
        <div className="gender_radio_buttons">
        <input type="radio" value="Male identifying" name="myGender" onChange={(e) => {myGenderHandler(e)}}/> Male Identifying
<input type="radio" value="Female identifying" name="myGender" onChange={(e) => {myGenderHandler(e)}} /> Female Identifying
<input type="radio" value="Non Binary" name="myGender" onChange={(e) => {myGenderHandler(e)}}/> Non Binary
<input type="radio" value="Prefer not to say" name="myGender" onChange={(e) => {myGenderHandler(e)}}/> Prefer Not to Say
</div>
</div>
<h2>Select your preference of gender to be friends with</h2>
<div className="selectGenderPreference">
        <div className="gender_preference_radio_buttons">
        <input type="radio" value="Male" name="myGenderPreference" onChange={(e) => {genderPreferenceHandler(e)}}/> Male
<input type="radio" value="Female" name="myGenderPreference" onChange={(e) => {genderPreferenceHandler(e)}} /> Female
<input type="radio" value="Non Binary" name="myGenderPreference" onChange={(e) => {genderPreferenceHandler(e)}}/> Non Binary
<input type="radio" value="No Preference" name="myGenderPreference" onChange={(e) => {genderPreferenceHandler(e)}}/> No Preference
</div>
</div>
<button className="next_page" onClick={(() => {navigate("/interests")})}> Next page </button>
</div>
    );
    };
export default Gender;

