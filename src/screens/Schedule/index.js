import React, { useState, useEffect, useContext, useRef } from "react";
import "./Schedule.css";
import { useNavigate, useParams } from "react-router-dom";
import SearchArea from "../../components/SearchArea";
import moment from "moment";

// image
import CarIcon from "../../assets/car_icon.png";

import Selector from "../../components/Selector";
import { getData, postData } from "../../api";
import Spinner from "../../components/Spinner";
import { AuthContext } from "../../context/AuthContext";
import Alert from "../../utils/Alert";

const ridesFromWindsor = [
  {
    id: 1,
    from: "Windsor",
    to: "Toronto",
    fromTime: new Date().setHours(5, 0, 0, 0),
    toTime: new Date().setHours(9, 0, 0, 0),
    time: new Date(),
    price: 45,
  },
  {
    id: 2,
    from: "Windsor",
    to: "Toronto",
    fromTime: new Date().setHours(10, 0, 0, 0),
    toTime: new Date().setHours(14, 0, 0, 0),
    time: new Date(),
    price: 45,
  },
  {
    id: 3,
    from: "Windsor",
    to: "Toronto",
    fromTime: new Date().setHours(15, 0, 0, 0),
    toTime: new Date().setHours(19, 0, 0, 0),
    time: new Date(),
    price: 45,
  },
  {
    id: 4,
    from: "Windsor",
    to: "Toronto",
    fromTime: new Date().setHours(17, 0, 0, 0),
    toTime: new Date().setHours(21, 0, 0, 0),
    time: new Date(),
    price: 45,
  },
];
const ridesFromToronto = [
  {
    id: 1,
    from: "Toronto",
    to: "Windsor",
    fromTime: new Date().setHours(9, 0, 0, 0),
    toTime: new Date().setHours(13, 0, 0, 0),
    time: new Date(),
    price: 45,
  },
  {
    id: 2,
    from: "Toronto",
    to: "Windsor",
    fromTime: new Date().setHours(15, 0, 0, 0),
    toTime: new Date().setHours(19, 0, 0, 0),
    time: new Date(),
    price: 45,
  },
  {
    id: 3,
    from: "Toronto",
    to: "Windsor",
    fromTime: new Date().setHours(19, 30, 0, 0),
    toTime: new Date().setHours(23, 30, 0, 0),
    time: new Date(),
    price: 45,
  },
  {
    id: 4,
    from: "Toronto",
    to: "Windsor",
    fromTime: new Date().setHours(21, 0, 0, 0),
    toTime: new Date().setHours(1, 0, 0, 0),
    time: new Date(),
    price: 45,
  },
];
export default function Schedule(props) {
  const { authDetails } = useContext(AuthContext);
  const navigate = useNavigate();
  const routeParams = useParams();
  const firstUpdate = useRef(true);
  const [scheduleInfo, setscheduleInfo] = useState({
    ...routeParams,
    date: new Date(parseInt(routeParams.date)),
    adults: parseInt(routeParams.adults),
    luggage: parseInt(routeParams.luggage),
    price: 45,
  });
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState({
    from: false,
    to: false,
    adults: false,
    pickup: false,
    dropoff: false,
  });

  // const [locations, setlocations] = useState([]);
  // const [cities, setcities] = useState([]);
  const [locations, setlocations] = useState({
    cities: [],
    pickup: [],
    dropoff: [],
    prices: [],
  });
  const [selectedRides, setselectedRides] = useState(
    scheduleInfo.from === "Windsor" ? ridesFromWindsor : ridesFromToronto
  );
  const [selectedRide, setselectedRide] = useState({
    id: 1,
    time: selectedRides[0].fromTime,
    price: 0,
    luggage: 0,
  });
  const [pointLocation, setpointLocation] = useState({
    pickup: "",
    dropoff: "",
  });

  //get  api calls
  const getCities = async () => {
    const response = await getData("/city/cities", false);
    let cities = response.map((city) => ({
      id: city._id,
      item: city.city,
    }));
    return cities;
  };

  const getPickupLocation = async () => {
    const response = await postData(
      `/location/locations`,
      { city_id: scheduleInfo.from },
      false
    );
    let pickup = response.map((city) => ({
      id: city._id,
      item: city.location,
    }));
    return pickup;
  };

  const getDropoffLocation = async () => {
    const response = await postData(
      `/location/locations`,
      { city_id: scheduleInfo.to },
      false
    );
    let dropoff = response.map((city) => ({
      id: city._id,
      item: city.location,
    }));
    return dropoff;
  };

  const getPrices = async () => {
    const response = await getData(`/price/prices`, false);
    let prices = response.map((price) => ({
      locations: [price.from._id, price.to._id],
      price: price.price,
      luggage: price.luggage,
    }));

    prices.forEach((price) => {
      if (
        price.locations.includes(scheduleInfo.from) &&
        price.locations.includes(scheduleInfo.to)
      ) {
        let luggageSum =
          scheduleInfo.luggage > 0
            ? price.luggage[0] + price.luggage[1] * (scheduleInfo.luggage - 1)
            : 0;
        setselectedRide({
          ...selectedRide,
          price: scheduleInfo.adults * price.price,
          luggage: luggageSum,
        });
      }
    });
    return prices;
  };

  const apiCalls = async () => {
    setloading(true);
    const citiesPromise = getCities();
    const pickupPromise = getPickupLocation();
    const dropOffPromise = getDropoffLocation();
    const pricePromise = getPrices();

    const [cities, pickup, dropoff, prices] = await Promise.all([
      citiesPromise,
      pickupPromise,
      dropOffPromise,
      pricePromise,
    ]);
    setlocations({ cities, pickup, dropoff, prices });
    setpointLocation({ pickup: pickup[0].id, dropoff: dropoff[0].id });
    setloading(false);
  };

  useEffect(() => {
    apiCalls();
  }, []);

  // const load locations
  const loadLocations = async () => {
    setloading(true);
    const citiesPromise = getCities();
    const pickupPromise = getPickupLocation();
    const dropOffPromise = getDropoffLocation();
    const pricePromise = getPrices();

    const [cities, pickup, dropoff, prices] = await Promise.all([
      citiesPromise,
      pickupPromise,
      dropOffPromise,
      pricePromise,
    ]);
    setlocations({ cities, pickup, dropoff });
    setpointLocation({ pickup: pickup[0].id, dropoff: dropoff[0].id });
    setselectedRides(
      scheduleInfo.from === "653dbfa79c1fb301f4375e13"
        ? ridesFromWindsor
        : ridesFromToronto
    );
    setloading(false);
  };
  console.log(locations);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    loadLocations();
  }, [scheduleInfo]);

  const combineDateAndTime = (date, time) => {
    const scheduleDate = new Date(date);
    const selectedTime = new Date(time);
    const combinedDate = new Date(
      scheduleDate.getFullYear(),
      scheduleDate.getMonth(),
      scheduleDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes(),
      selectedTime.getSeconds()
    );
    return combinedDate;
  };

  const onConfirm = async () => {
    if (validation()) {
      setloading(true);
      let payload = {
        from: {
          location_id: pointLocation.pickup,
          city_id: scheduleInfo.from,
        },
        to: {
          location_id: pointLocation.dropoff,
          city_id: scheduleInfo.to,
        },
        price: selectedRide.price + selectedRide.luggage,
        ScheduledToTime: combineDateAndTime(
          scheduleInfo.date,
          selectedRide.time
        ),
      };
      if (authDetails.isAuthenticated) {
        if (authDetails.type === "user") {
          const response = await postData("/booking/create", payload);
          if (response) {
            Alert(
              "Booking Confirmed",
              "Booking confirmed. We will reachout to you",
              () => {
                navigate("/");
              },
              false,
              () => {},
              () => {},
              true,
              "Ok"
            );
          }
        } else {
          Alert(
            "Error",
            "Please login as user to book ride",
            () => {
              navigate("/login");
            },
            false,
            () => {},
            () => {},
            true,
            "Ok"
          );
        }
      } else {
        Alert(
          "Please login error",
          "Please login to book a ride",
          () => {
            navigate("/login");
          },
          false,
          () => {},
          () => {},
          true,
          "Ok"
        );
      }

      setloading(false);
    }
  };
  const validation = () => {
    let errorDict = {};
    if (pointLocation.pickup === "") errorDict = { ...errorDict, pickup: true };
    else errorDict = { ...errorDict, pickup: false };
    if (pointLocation.dropoff === "")
      errorDict = { ...errorDict, dropoff: true };
    else errorDict = { ...errorDict, dropoff: false };
    seterror({ ...error, ...errorDict });
    if (!errorDict.pickup && !errorDict.dropoff && !errorDict.adults)
      return true;
    else return false;
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="schedule-page">
          <SearchArea
            locationsFrom={locations.cities.filter(
              (item) => item.id == scheduleInfo.from
            )}
            locationsTo={locations.cities.filter(
              (item) => item.id == scheduleInfo.to
            )}
            locations={locations.cities}
            scheduleInfo={scheduleInfo}
            setscheduleInfo={setscheduleInfo}
            error={error}
          />
          <div className="schedule-content">
            <div className="rides">
              {selectedRides.map((ride, index) => (
                <div
                  className={`ride ${
                    selectedRide.id === ride.id ? "selected" : ""
                  }`}
                  onClick={() =>
                    setselectedRide({
                      ...selectedRide,
                      id: ride.id,
                      time: ride.fromTime,
                    })
                  }
                >
                  <div className="from">
                    <div className="time">
                      {moment(ride.fromTime).format("LT")}
                    </div>
                    <div className="location">{ride.from}</div>
                  </div>
                  <div className="travel-time">
                    <img src={CarIcon} />
                    {/* <span>{moment(ride.time).format("LT")}</span> */}
                    <span>
                      {/* {moment(
                        moment(ride.toTime).diff(moment(ride.fromTime))
                      ).format("hh:mm")} */}
                      04:00
                    </span>
                  </div>
                  <div className="to">
                    <div className="time">
                      {moment(ride.toTime).format("LT")}
                    </div>
                    <div className="location">{ride.to}</div>
                  </div>
                  <div className="price">
                    ${selectedRide.price + selectedRide.luggage}
                  </div>
                </div>
              ))}
            </div>
            <div className="ride-details">
              <div className="pickup">
                <Selector
                  mainTitle={"Pick-up Location"}
                  title={"Leaving from"}
                  items={locations.pickup}
                  initialSelection={[
                    locations.pickup.length > 0 ? locations.pickup[0] : {},
                  ]}
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
                  items={locations.dropoff}
                  initialSelection={[
                    locations.dropoff.length > 0
                      ? locations.dropoff[locations.dropoff.length - 1]
                      : {},
                  ]}
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
      )}
    </>
  );
}