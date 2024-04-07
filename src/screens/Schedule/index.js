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

import NoContent from "../../components/NoContent";
import { CalculateTime, addTimeToDate } from "../../utils/TimeCalculations";
import { WithInPickUpArea } from "../../constant/Config";

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
  });
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState({
    from: false,
    to: false,
    adults: false,
    pickup: false,
    dropoff: false,
    customLocation: false,
  });

  const [cities, setcities] = useState([]);
  const [locations, setlocations] = useState({
    pickup: [],
    dropoff: [],
    rides: [],
  });
  const [selectedRide, setselectedRide] = useState({
    id: 0,
    time: "",
    price: 0,
    bookingsLeft: 7,
  });
  const [pointLocation, setpointLocation] = useState({
    pickup: "",
    dropoff: "",
    customLocation: "",
  });

  const getCityName = (id) => {
    return cities.filter((item) => item.id == id).length > 0
      ? cities.filter((item) => item.id == id)[0]
      : "";
  };

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

  const getRides = async () => {
    const response = await getData(
      `/ride/stop/${scheduleInfo.from}/${scheduleInfo.to}`,
      false
    );
    let rides = response.map((ride) => {
      return {
        ...ride,
        totalPrice:
          ride.stops.price * scheduleInfo.adults +
          (scheduleInfo.luggage > 0
            ? ride.luggage[0] + ride.luggage[1] * (scheduleInfo.luggage - 1)
            : 0),
        bookingsLeft: calculateSeatesLeft(
          ride.rideCapacity,
          ride.stops.pickupTime,
          ride.validBookings
        ),
      };
    });
    return rides;
  };

  const apiCalls = async () => {
    setloading(true);
    const citiesPromise = getCities();
    const pickupPromise = getPickupLocation();
    const dropOffPromise = getDropoffLocation();
    const ridePromise = getRides();

    const [cities, pickup, dropoff, rides] = await Promise.all([
      citiesPromise,
      pickupPromise,
      dropOffPromise,
      ridePromise,
    ]);
    setlocations({ pickup, dropoff, rides });
    setcities(cities);

    setpointLocation({
      pickup: pickup[0] ? pickup[0].id : 0,
      dropoff: dropoff[0] ? dropoff[0].id : 0,
      type: "",
      customLocation: "",
    });
    setloading(false);
  };

  useEffect(() => {
    apiCalls();
  }, []);
  // const load locations
  const loadLocations = async () => {
    setloading(true);
    const pickupPromise = getPickupLocation();
    const dropOffPromise = getDropoffLocation();
    const ridePromise = getRides();

    const [pickup, dropoff, rides] = await Promise.all([
      pickupPromise,
      dropOffPromise,
      ridePromise,
    ]);
    setlocations({ pickup, dropoff, rides });

    setpointLocation({
      pickup: pickup[0] ? pickup[0].id : 0,
      dropoff: dropoff[0] ? dropoff[0].id : 0,
      customLocation: "",
    });
    setloading(false);
  };
  console.log(locations);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    loadLocations();
  }, [scheduleInfo.from, scheduleInfo.to]);

  const priceCalculation = () => {
    let rides = locations.rides.map((ride) => {
      return {
        ...ride,
        totalPrice:
          ride.stops.price * scheduleInfo.adults +
          (scheduleInfo.luggage > 0
            ? ride.luggage[0] + ride.luggage[1] * (scheduleInfo.luggage - 1)
            : 0),
      };
    });
    setlocations({ ...locations, rides: rides });
  };
  useEffect(() => {
    priceCalculation();
  }, [scheduleInfo.adults, scheduleInfo.luggage]);

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
          customLocation:
            pointLocation.pickup === WithInPickUpArea
              ? pointLocation.customLocation
              : "",
        },
        to: {
          location_id: pointLocation.dropoff,
          city_id: scheduleInfo.to,
          customLocation:
            pointLocation.dropoff === WithInPickUpArea
              ? pointLocation.customLocation
              : "",
        },
        ride_id: selectedRide.id,
        price: selectedRide.price,
        ScheduledToTime: selectedRide.time,
        adult: scheduleInfo.adults,
        luggage: scheduleInfo.luggage,
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
          "U are not loggedin",
          "Please login to confirm booking",
          () => {
            navigate("/login", { state: payload });
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
    let seatsAvailable =
      selectedRide.bookingsLeft >= scheduleInfo.adults ? true : false;
    console.log(seatsAvailable);
    if (pointLocation.pickup === "") errorDict = { ...errorDict, pickup: true };
    else errorDict = { ...errorDict, pickup: false };
    if (pointLocation.dropoff === "")
      errorDict = { ...errorDict, dropoff: true };
    else errorDict = { ...errorDict, dropoff: false };
    if (
      (pointLocation.pickup === "6564e158f3d3c3b55fe5854b" ||
        pointLocation.dropoff === "6564e158f3d3c3b55fe5854b") &&
      pointLocation.customLocation === ""
    )
      errorDict = { ...errorDict, customLocation: true };
    else errorDict = { ...errorDict, customLocation: false };
    if (selectedRide.id == 0)
      Alert(
        "Please select the ride",
        "To confirm the booking you need to select a ride",
        () => {},
        false,
        () => {},
        () => {},
        true,
        "Ok"
      );
    if (!seatsAvailable)
      Alert(
        "Sorry, Seats not available",
        "Required number of seats not available for this date",
        () => {},
        false,
        () => {},
        () => {},
        true,
        "Ok"
      );

    seterror({ ...error, ...errorDict });
    if (
      !errorDict.pickup &&
      !errorDict.dropoff &&
      !errorDict.adults &&
      !errorDict.customLocation &&
      selectedRide.id !== 0 &&
      seatsAvailable
    )
      return true;
    else return false;
  };
  const calculateSeatesLeft = (rideCapacity, pickupTime, bookings) => {
    let date = combineDateAndTime(scheduleInfo.date, pickupTime);
    // let count = bookings.filter((item) =>
    //   moment(new Date(item.ScheduledToTime)).isSame(new Date(date))
    // );
    // let sum = 0;
    // count.forEach((item) => (sum = item.adult));
    let count = bookings.reduce((total, item) => {
      if (moment(new Date(item.ScheduledToTime)).isSame(new Date(date))) {
        return total + item.adult;
      }
      return total;
    }, 0);
    // console.log(date, count);
    return rideCapacity - count;
  };
  const checkTime = () => {
    let flag = true;
    locations.rides.forEach((ride) => {
      if (
        checkAvailableRides(
          combineDateAndTime(scheduleInfo.date, ride.stops.pickupTime),
          ride.rideCancelledDays ? ride.rideCancelledDays : []
        )
      ) {
        flag = false;
      }
    });
    return flag;
  };
  const checkAvailableRides = (date, cancelledDaysList) => {
    const cancelledDays = cancelledDaysList.map((date) => {
      return new Date(date).toISOString().split("T")[0];
    });
    cancelledDays.sort();

    if (cancelledDays.length > 0)
      return (
        moment(date).isAfter(new Date()) &&
        (moment(date).isBefore(cancelledDays[0]) ||
          moment(date).isAfter(
            cancelledDays[cancelledDays.length - 1] + "T23:59:59.999Z"
          ))
      );
    else return moment(date).isAfter(new Date());
  };

  const updateTotalBookingsCalculation = () => {
    let rides = locations.rides.map((ride) => {
      return {
        ...ride,
        bookingsLeft: calculateSeatesLeft(
          ride.rideCapacity,
          ride.stops.pickupTime,
          ride.validBookings
        ),
      };
    });
    setlocations({ ...locations, rides: rides });
  };
  useEffect(() => {
    updateTotalBookingsCalculation();
  }, [scheduleInfo.date]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="schedule-page">
          <SearchArea
            locationsFrom={cities.filter(
              (item) => item.id == scheduleInfo.from
            )}
            locationsTo={cities.filter((item) => item.id == scheduleInfo.to)}
            locations={cities}
            scheduleInfo={scheduleInfo}
            setscheduleInfo={setscheduleInfo}
            error={error}
          />
          <div className="schedule-content">
            <div className="rides">
              {checkTime() && <NoContent content={"No Rides Available"} />}
              {locations.rides.map(
                (ride, index) =>
                  checkAvailableRides(
                    combineDateAndTime(
                      scheduleInfo.date,
                      ride.stops.pickupTime
                    ),
                    ride.rideCancelledDays ? ride.rideCancelledDays : []
                  ) && (
                    <div
                      className={`ride ${
                        selectedRide.id === ride._id ? "selected" : ""
                      }`}
                      onClick={() =>
                        setselectedRide({
                          id: ride._id,
                          time: combineDateAndTime(
                            scheduleInfo.date,
                            ride.stops.pickupTime
                          ),
                          price: ride.totalPrice,
                          bookingsLeft: ride.bookingsLeft,
                        })
                      }
                    >
                      <div className="ride-content">
                        <div className="from">
                          <div className="time">
                            {moment(ride.stops.pickupTime).format("LT")}
                          </div>
                          <div className="location">
                            {getCityName(scheduleInfo.from).item}
                          </div>
                        </div>
                        <div className="travel-time">
                          <img src={CarIcon} />
                          <span>{CalculateTime(ride.stops.travelTime)}</span>
                        </div>
                        <div className="to">
                          <div className="time">
                            {moment(
                              addTimeToDate(
                                ride.stops.pickupTime,
                                ride.stops.travelTime
                              )
                            ).format("LT")}
                          </div>
                          <div className="location">
                            {getCityName(scheduleInfo.to).item}
                          </div>
                        </div>
                      </div>
                      <div className="price-section">
                        <div className="price">
                          <span>Price : </span> ${ride.totalPrice}
                        </div>
                        <div className="bookings-left">{`(${ride.bookingsLeft} seats left)`}</div>
                      </div>
                    </div>
                  )
              )}
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
                    locations.dropoff.length > 0 ? locations.dropoff[0] : {},
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
              {(pointLocation.pickup === "6564e158f3d3c3b55fe5854b" ||
                pointLocation.dropoff === "6564e158f3d3c3b55fe5854b") && (
                <div
                  className={`custom-location ${
                    error.customLocation ? "error" : ""
                  }`}
                >
                  <input
                    value={pointLocation.customLocation}
                    placeholder="Enter the location"
                    onChange={(e) =>
                      setpointLocation({
                        ...pointLocation,
                        customLocation: e.target.value,
                      })
                    }
                  />
                </div>
              )}
              {/* {pointLocation.dropoff === "6564e158f3d3c3b55fe5854b" && (
                <div className="custom-location">
                  <input
                    placeholder="Enter the dropoff location"
                    onChange={(e) =>
                      setpointLocation({
                        ...pointLocation,
                        type: "dropoff",
                        customLocation: e.target.value.trim(),
                      })
                    }
                  />
                </div>
              )} */}
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
