import React, { useState } from "react";
import "./SearchSection.css";

import TaxiImage from "../../../assets/taxi.png";

import SearchArea from "../../../components/SearchArea";

const Locations = [
  { id: 1, item: "Windsor" },
  { id: 2, item: "Toronto" },
];

export default function SearchSection() {
  const [date, setdate] = useState(new Date());
  const [rideSelected, setrideSelected] = useState(true);
  return (
    <div className="search-section">
      <div className="search-container">
        <div className="search-header">
          <div
            className={`ride ${rideSelected ? "selected" : ""}`}
            onClick={() => setrideSelected(true)}
          >
            Ride
          </div>
          <div
            className={`parcel ${!rideSelected ? "selected" : ""}`}
            onClick={() => setrideSelected(false)}
          >
            Parcel
          </div>
        </div>

        {rideSelected ? (
          <SearchArea locations={Locations} date={date} setdate={setdate} />
        ) : (
          <span className="search-area-parcel">Work in progress</span>
        )}

        <button className="search-button">Search</button>
      </div>
      <img className="background-image" src={TaxiImage} />
    </div>
  );
}
