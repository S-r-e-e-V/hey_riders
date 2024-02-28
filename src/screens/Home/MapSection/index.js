import React from "react";
import "./MapSection.css";
import TripCard from "../../../components/TripCard";
import torontoImg from "../../../assets/toronto.jpg";
import windsorImg from "../../../assets/windsor.jpg";

export default function MapSection() {
  const trips = [
    {
      location: "Toronto",
      image: torontoImg,
      locations: ["London", "Windsor"],
      price: 45,
    },
    {
      location: "Windsor",
      image: windsorImg,
      locations: ["London", "Toronto"],
      price: 45,
    },
  ];
  return (
    <div className="map-section">
      <div className="trips">
        {trips.map((trip) => (
          <TripCard trip={trip} />
        ))}
      </div>
      <div className="map-area">
        <iframe
          style={{ position: "relative", top: "-70px", border: "none" }}
          src="https://www.google.com/maps/d/embed?mid=1LvE4dQt-EJzEYuGWVUFs0dsEC8LQ8sI&hl=en&ehbc=2E312F"
          width="100%"
          height="480"
        ></iframe>
      </div>
    </div>
  );
}
