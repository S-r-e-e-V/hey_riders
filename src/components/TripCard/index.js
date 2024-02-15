import React from "react";
import "./TripCard.css";
import { LuCar } from "react-icons/lu";

export default function TripCard({ trip }) {
  return (
    <div class="trip">
      <img src={trip.image} />
      <div className="trip-contents">
        <div class="trip-heading">{trip.location}</div>
        <div className="main-trip-content">
          <div className="trip-locations">
            {trip.locations.map((location) => (
              <div className="trip-location">
                <LuCar />
                <span>{location}</span>
              </div>
            ))}
          </div>
          <div className="price">From: ${trip.price}</div>
        </div>
      </div>
    </div>
  );
}
