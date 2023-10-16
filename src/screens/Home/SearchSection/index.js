import React, { useState } from "react";
import "./SearchSection.css";

import { useNavigate } from "react-router-dom";

import TaxiImage from "../../../assets/taxi.png";

import SearchArea from "../../../components/SearchArea";

const Locations = [
  { id: 1, item: "Windsor" },
  { id: 2, item: "Toronto" },
];

export default function SearchSection() {
  const navigate = useNavigate();
  const [rideSelected, setrideSelected] = useState(true);
  const [scheduleInfo, setscheduleInfo] = useState({
    from: "",
    to: "",
    date: new Date(),
    adults: 0,
    luggage: 0,
  });

  const [error, seterror] = useState({
    from: false,
    to: false,
    adults: false,
  });
  const onSearch = () => {
    let errorDict = error;
    if (scheduleInfo.from === "") errorDict = { ...errorDict, from: true };
    else errorDict = { ...errorDict, from: false };
    if (scheduleInfo.to === "") errorDict = { ...errorDict, to: true };
    else errorDict = { ...errorDict, to: false };
    if (scheduleInfo.adults === 0) errorDict = { ...errorDict, adults: true };
    else errorDict = { ...errorDict, adults: false };
    seterror(errorDict);
    if (!errorDict.from && !errorDict.to && !errorDict.adults)
      navigate(
        `scheduled/from/${scheduleInfo.from}/to/${
          scheduleInfo.to
        }/date/${scheduleInfo.date.getTime()}/adults/${
          scheduleInfo.adults
        }/luggage/${scheduleInfo.luggage}`
      );
  };
  console.log(scheduleInfo, error);
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
          <SearchArea
            locations={Locations}
            scheduleInfo={scheduleInfo}
            setscheduleInfo={setscheduleInfo}
            error={error}
          />
        ) : (
          <span className="search-area-parcel">Work in progress</span>
        )}

        <button className="search-button" onClick={onSearch}>
          Search
        </button>
      </div>
      <img className="background-image" src={TaxiImage} />
    </div>
  );
}
