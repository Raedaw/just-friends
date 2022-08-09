import { useNavigate } from "react-router-dom";
import { setGender, setGenderPreference } from "../utils/firebase";

const Gender = () => {
    const navigate = useNavigate();
  
    const myGenderHandler = (e) => {
      setGender(e.target.value)
      };


    const genderPreferenceHandler = (e) => {
      setGenderPreference(e.target.value)
      };
  
  
    return (
      <div>
      <div className="selectGender">
        <h2>Select Your Gender:</h2>
        <input type="radio" value="Male identifying" name="myGender" onChange={(e) => {myGenderHandler(e)}}/> Male Identifying
<input type="radio" value="Female identifying" name="myGender" onChange={(e) => {myGenderHandler(e)}} /> Female Identifying
<input type="radio" value="Non Binary" name="myGender" onChange={(e) => {myGenderHandler(e)}}/> Non Binary
<input type="radio" value="Prefer not to say" name="myGender" onChange={(e) => {myGenderHandler(e)}}/> Prefer Not to Say
</div>
<div className="selectGenderPreference">
        <h2>Select your preference of Gender you wish to be friends with:</h2>
        <input type="radio" value="Male" name="myGenderPreference" onChange={(e) => {genderPreferenceHandler(e)}}/> Male
<input type="radio" value="Female" name="myGenderPreference" onChange={(e) => {genderPreferenceHandler(e)}} /> Female
<input type="radio" value="Non Binary" name="myGenderPreference" onChange={(e) => {genderPreferenceHandler(e)}}/> Non Binary
<input type="radio" value="No Preference" name="myGenderPreference" onChange={(e) => {genderPreferenceHandler(e)}}/> No Preference
</div>
<button onClick={(() => {navigate("/interests")})}> Next page </button>
</div>
    );
    };
export default Gender;

