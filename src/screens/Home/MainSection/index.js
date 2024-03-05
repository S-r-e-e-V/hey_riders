import React from "react";
import "./MainSection.css";
import CarImage from "../../../assets/kk copy.png";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/heyride_copy.png"

export default function MainSection() {
  const navigate = useNavigate();
  return (
    <div className="car-section" img src ={Logo}>
      <div className="section-1">
        <span className="title">Hey Rides </span>
        <span className="content">"Your Journey our priority"</span>
        <div className="signup-button" onClick={() => navigate("/signup")}>
          Signup
        </div>
      </div>
      <div className="image-section">
        <img src={CarImage} />
      </div>
    </div>
  );
}
