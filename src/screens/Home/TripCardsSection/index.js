import React from "react";
import "./TripCardsSection.css";
import torontoImg from "../../../assets/toronto.jpg";
import windsorImg from "../../../assets/windsor.jpg";
import TripCard from "../../../components/TripCard";

export default function TripCardsSection() {
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
      locations: ["London", "Toront"],
      price: 45,
    },
  ];
  return (
    <div className="trip-card-section">
      {trips.map((trip) => (
        <TripCard trip={trip} />
      ))}
    </div>
  );
}
