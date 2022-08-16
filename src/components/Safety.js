import "../Styles/Saftey.css";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";
const Safety = () => {
  const containerfive = useRef(null);
  const containersix = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: containerfive.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../Just-friends_images/88252-data-security.json"),
    });
  }, []);

  useEffect(() => {
    lottie.loadAnimation({
      container: containersix.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../Just-friends_images/networkfriends.json"),
    });
  }, []);

  return (
    <div className="stayingSafeBody">
    <article className="safety">
    <h1 className="safteyHeader">Staying safe on Just Friends</h1>
    <h2>Online Saftey:</h2>
      <div className="containerfive" ref={containerfive}></div>
      <ul className="onlineSafteyInfo">
        <li>
          {" "}
          Don't share personal or identifying information such as your surname,
          address and email address
        </li>
        <br/>
        <li>
          {" "}
          Stay on Just Friends - avoid using other messaging services such as
          whatsapp or email until you have met and trust the person you are
          speaking with
        </li>
      </ul>
      <h2>Meeting up:</h2>
      <div className="containersix" ref={containersix}></div>
      <ul className="meetingUpInfo">
        <li>Always meet in a public place</li>
        <li>Meet as a group where possible</li>
        <li>
          Tell a trusted friend or family member where you are going and what
          time you are expected back
        </li>
        <br/>
        <li>
          Feeling uncomfortable? Trust your gut and leave! Your safety is more
          important than being polite
        </li>
        <br/>
        <li>
          Share your location with a trusted friend or family member when meeting up for the first time with people.
          You can find a link below on how you can do this on different devices. 
         <br/>
         </li>
         </ul>
         <br/>
         <ul>
         <li className="videoList" >
           <div className="videoContainer">

          <iframe width="560"  height="315" src="https://www.youtube.com/embed/vl2cMa8wCU4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        
          <iframe width="560" maxWidth="50%" height="315" src="https://www.youtube.com/embed/Lg2szAx4eFA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </li>
        </ul>
    </article>
    </div>
  );
};

export default Safety;
