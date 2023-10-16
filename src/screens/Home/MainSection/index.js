import React from "react";
import "./MainSection.css";
import CarImage from "../../../assets/car.png";

export default function MainSection() {
  return (
    <div className="car-section">
      <div className="section-1">
        <span className="title">Hey Rides </span>
        <span className="content">
         "Your Journey our priority"
        </span>
        <div className="signup-button">Signup</div>
      </div>
      <div className="image-section">
        <img src={CarImage} />
      </div>
    </div>
  );
}
