import React, { useState, useEffect } from "react";
import "./Schedule.css";
import { useNavigate, useParams } from "react-router-dom";
import SearchArea from "../../components/SearchArea";
import moment from "moment";

// image
import CarIcon from "../../assets/car_icon.png";

import Selector from "../../components/Selector";

const Locations = [
  { id: 1, item: "Windsor" },
  { id: 2, item: "Toronto" },
  { id: 3, item: "London" },
];
const rides = [
  {
    id: 1,
    from: "windsor",
    to: "toronto",
    fromTime: new Date(),
    toTime: new Date(),
    time: new Date(),
    price: 45,
  },
  {
    id: 2,
    from: "windsor",
    to: "toronto",
    fromTime: new Date(),
    toTime: new Date(),
    time: new Date(),
    price: 45,
  },
  {
    id: 3,
    from: "windsor",
    to: "toronto",
    fromTime: new Date(),
    toTime: new Date(),
    time: new Date(),
    price: 45,
  },
  {
    id: 4,
    from: "windsor",
    to: "toronto",
    fromTime: new Date(),
    toTime: new Date(),
    time: new Date(),
    price: 45,
  },
];
export default function Schedule(props) {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [scheduleInfo, setscheduleInfo] = useState({
    ...routeParams,
    date: new Date(),
    adults: parseInt(routeParams.adults),
    luggage: parseInt(routeParams.luggage),
  });
  console.log(scheduleInfo);
  const [error, seterror] = useState({
    from: false,
    to: false,
    adults: false,
    pickup: false,
    dropoff: false,
  });

  const [location, setlocation] = useState(rides);
  const [selectedRide, setselectedRide] = useState(0);
  const [pointLocation, setpointLocation] = useState({ pickup: 1, dropoff: 2 });

  useEffect(() => {
    // location update
  }, [selectedRide]);

  const onConfirm = () => {
    let errorDict = error;
    if (pointLocation.pickup === "") errorDict = { ...errorDict, pickup: true };
    else errorDict = { ...errorDict, pickup: false };
    if (pointLocation.dropoff === "")
      errorDict = { ...errorDict, dropoff: true };
    else errorDict = { ...errorDict, dropoff: false };
    seterror({ ...error, ...errorDict });
    if (!errorDict.pickup && !errorDict.dropoff && !errorDict.adults)
      console.log("successfull");
  };
  return (
    <div className="schedule-page">
      <SearchArea
        locationsFrom={Locations.filter((item) => item.id == routeParams.from)}
        locationsTo={Locations.filter((item) => item.id == routeParams.to)}
        locations={Locations}
        scheduleInfo={scheduleInfo}
        setscheduleInfo={setscheduleInfo}
        error={error}
      />
      <div className="schedule-content">
        <div className="rides">
          {rides.map((ride, index) => (
            <div
              className={`ride ${selectedRide === index ? "selected" : ""}`}
              onClick={() => setselectedRide(index)}
            >
              <div className="from">
                <div className="time">{moment(ride.fromTime).format("LT")}</div>
                <div className="location">{ride.from}</div>
              </div>
              <div className="travel-time">
                <img src={CarIcon} />
                <span>{moment(ride.time).format("LT")}</span>
              </div>
              <div className="to">
                <div className="time">{moment(ride.toTime).format("LT")}</div>
                <div className="location">{ride.to}</div>
              </div>
              <div className="price">${ride.price}</div>
            </div>
          ))}
        </div>
        <div className="ride-details">
          <div className="pickup">
            <Selector
              mainTitle={"Pick-up Location"}
              title={"Leaving from"}
              items={Locations}
              initialSelection={[Locations[0]]}
              selectedItem={(e) =>
                setpointLocation({
                  ...pointLocation,
                  pickup: e.length > 0 ? e[0].id : "",
                })
              }
              isError={error.pickup}
            />
          </div>
          <div className="dropoff">
            <Selector
              mainTitle={"Drop-off Location"}
              title={"Going to"}
              items={Locations}
              initialSelection={[Locations[0]]}
              selectedItem={(e) =>
                setpointLocation({
                  ...pointLocation,
                  dropoff: e.length > 0 ? e[0].id : "",
                })
              }
              isError={error.dropoff}
            />
          </div>
          <button className="confirm-booking" onClick={() => onConfirm()}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
