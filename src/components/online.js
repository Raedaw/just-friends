import lottie from "lottie-web";
import { useEffect, useRef} from "react";
import "../Styles/Groupchat.css";

const Online = () => {


const containerFour= useRef(null)

  useEffect(() => {
lottie.loadAnimation({
container: containerFour.current,
renderer: 'svg',
loop:true,
autoplay: true,
animationData: require('../Just-friends_images/IsActive.json')})
  }, [])

  return(
    <div className="containerFour" ref={containerFour}></div>

  )
}

export default Online;