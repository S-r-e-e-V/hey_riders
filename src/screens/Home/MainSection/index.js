import React from "react";
import "./MainSection.css";
import CarImage from "../../../assets/car.png";

export default function MainSection() {
  return (
    <div className="main-section">
      <div className="section-1">
        <span className="title">Reach your destination safely </span>
        <span className="content">
          Sample Content to place here. Sample Content to place here. Sample
          Content to place here. Sample Content to place here. Sample Content to
          place here
        </span>
        <div className="signup-button">Signup</div>
      </div>
      <div className="image-section">
        <img src={CarImage} />
      </div>
    </div>
  );
}
