import React from "react";
import CarImage from "../../../assets/car.png";
import { Grow } from "@mui/material";
import "./SecondSection.css";


export default function SecondSection() {
  return (
    
      <div className="second-section">
      <div className="section-1">
      
        <span className="title">Hey Rides </span>
        <span className="content">
          Your Journey our priority
        </span>
        
        <div className="signup-button">Signup</div>
      </div>
      <div className="image-section">
        <img src={CarImage} alt="carimage" />
      </div>
    </div>
    
    
  );
}
