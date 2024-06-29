import React, { useContext, useEffect } from "react";
import axios from "axios";
import { store } from "../ContextProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import './style.css'
AOS.init({
  duration: "2000",
});
const Landingscreen = () => {
  const { setUser}=useContext(store)
    useEffect(()=>{
      const func=async()=>{
          await axios.get("https://grocery-webesite-deploy.onrender.com/getUser", {
              headers: {
              'x-auth-token': localStorage.getItem('token')
              }
            })
          .then(result => {
              setUser(result.data)
             
          })
          .catch(err => console.log(err))
      }
      func();
    },[])
  return (
    <div  className="Landing" >
        <div className="LandingInfo">
          <h2 className="LandingInfoH2" data-aos="zoom-in">
            Welcome
          </h2>
          <h2  data-aos="zoom-out">
            Feel the difference.
          </h2>
          <Link to="/home">
            <button className="Landingbtn">Order Now</button>
          </Link>
          <p className="LandingInfoquote">Eat healthy, Stay Healthy</p>
        </div>
      </div>
  );
};
export default Landingscreen;
