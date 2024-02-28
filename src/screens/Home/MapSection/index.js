import React from "react";
import "./MapSection.css";

export default function MapSection() {
  return (
    <div className="map-section">
      <div className="map-area">
        <iframe
          style={{ position: "relative", top: "-70px", border: "none" }}
          src="https://www.google.com/maps/d/embed?mid=1LvE4dQt-EJzEYuGWVUFs0dsEC8LQ8sI&hl=en&ehbc=2E312F"
          width="640"
          height="480"
        ></iframe>
      </div>
    </div>
  );
}
