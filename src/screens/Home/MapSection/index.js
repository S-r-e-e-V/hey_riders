import React from "react";
import "./MapSection.css"; // Make sure to update MapSection.css with flexbox styles
import CarImage from "../../../assets/RO.png";
import torontoImg from "../../../assets/toronto.jpg";
import windsorImg from "../../../assets/windsor.jpg";

export default function MapSection() {
  return (
    <div className="map-section">
      <div className="map-design">
        <img src={CarImage} alt="Car Image" className="map-image" />
      </div>
      <div className="map-area">
        <iframe
          style={{ border: "none" }}
          src="https://www.google.com/maps/d/embed?mid=1LvE4dQt-EJzEYuGWVUFs0dsEC8LQ8sI&hl=en&ehbc=2E312F"
          width="100%"
          height="480"
        ></iframe>
      </div>
    </div>
  );
}