import React, { useState, useEffect } from "react";
import "./AddRide.css";

import { useNavigate } from "react-router-dom";

import Selector from "../../../components/Selector";
import Spinner from "../../../components/Spinner";
import Alert from "../../../utils/Alert";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { MandatoryFieldCheck } from "../../../utils/validation";

import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// api
import { getData, postData } from "../../../api";

const AddRide = () => {
  const navigate = useNavigate();

  const rideStopsObj = {
    from: "",
    to: "",
    price: "",
    pickupTime: "",
    travelTime: "",
  };

  const [rideDetails, setrideDetails] = useState({
    rideFrom: "",
    rideTo: "",
    rideName: "",
    rideCapacity: "",
    stops: [rideStopsObj],
    luggage1: 0,
    luggage2: 0,
  });

  const [loading, setloading] = useState({ page: false, button: false });

  const [error, seterror] = useState({
    rideFrom: "",
    rideTo: "",
    rideName: "",
    rideCapacity: "",
    stops: [],
    luggage1: "",
    luggage2: "",
  });

  const [cities, setcities] = useState([]);
  const [locationList, setlocationList] = useState({
    from: cities,
    to: cities,
  });

  const getCities = async () => {
    setloading(true);
    const response = await getData("/city/cities", false);
    setloading(false);
    if (response) {
      let city = response.map((item) => ({ id: item._id, item: item.city }));
      setcities(city);
      setlocationList({ from: city, to: city });
    }
  };
  useEffect(() => {
    getCities();
  }, []);

  // submit
  const handleSubmit = async () => {
    let error = validation();
    if (
      error.rideFrom === "" &&
      error.rideTo === "" &&
      error.rideName === "" &&
      error.rideCapacity === "" &&
      error.luggage1 === "" &&
      error.luggage2 === ""
    ) {
      setloading(true);
      let payload = {
        rideFrom: rideDetails.rideFrom,
        stops: rideDetails.stops,
        // price: parseFloat(rideDetails.price).toFixed(2),
        rideTo: rideDetails.rideTo,
        rideName: rideDetails.rideName,
        rideCapacity: rideDetails.rideCapacity,
        // travelTime: parseFloat(rideDetails.travelTime).toFixed(2),
        luggage: [
          parseFloat(rideDetails.luggage1).toFixed(2),
          parseFloat(rideDetails.luggage2).toFixed(2),
        ],
      };
      const response = await postData(`/ride/add`, payload);
      if (response) {
        Alert(
          response.message,
          "",
          () => {
            navigate("/admin/ride");
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

  // validation
  const validation = () => {
    let error = {};
    error.rideFrom = MandatoryFieldCheck(rideDetails.rideFrom);
    error.rideName = MandatoryFieldCheck(rideDetails.rideName);
    error.rideCapacity = MandatoryFieldCheck(rideDetails.rideCapacity);
    // error.price = MandatoryFieldCheck(rideDetails.price);
    error.rideTo = MandatoryFieldCheck(rideDetails.rideTo);
    // error.travelTime = MandatoryFieldCheck(rideDetails.travelTime);
    error.luggage1 = MandatoryFieldCheck(rideDetails.luggage1);
    error.luggage2 = MandatoryFieldCheck(rideDetails.luggage2);
    seterror({
      rideFrom: error.rideFrom,
      rideName: error.rideName,
      rideCapacity: error.rideCapacity,
      // price: error.price,
      rideTo: error.rideTo,
      // travelTime: error.travelTime,
      luggage1: error.luggage1,
      luggage2: error.luggage2,
    });
    return error;
  };

  const locationHandler = (type, locationId) => {
    switch (type) {
      case "from":
        setlocationList({
          ...locationList,
          to: cities.filter((item) => item.id !== locationId),
        });
        break;
      case "to":
        setlocationList({
          ...locationList,
          from: cities.filter((item) => item.id !== locationId),
        });
        break;
      default:
        setlocationList({
          from: cities,
          to: cities,
        });
    }
  };
  return (
    <>
      {loading.page ? (
        <Spinner />
      ) : (
        <div className="admin add-price-page">
          <div className="title">Add Rides</div>
          <form className="login-container">
            <div className="input-container">
              <Selector
                mainTitle={"Ride Starting Location"}
                title={"Select city"}
                items={locationList.from}
                // initialSelection={pricesFrom}
                selectedItem={(e) => {
                  setrideDetails({
                    ...rideDetails,
                    rideFrom: e.length > 0 ? e[0].id : "",
                  });
                  locationHandler("from", e.length > 0 ? e[0].id : "");
                }}
                isError={error.rideFrom}
              />
            </div>
            <div className="input-container">
              <Selector
                mainTitle={"Ride Ending Location"}
                title={"Select city"}
                items={locationList.to}
                // initialSelection={pricesFrom}
                selectedItem={(e) => {
                  setrideDetails({
                    ...rideDetails,
                    rideTo: e.length > 0 ? e[0].id : "",
                  });
                  locationHandler("to", e.length > 0 ? e[0].id : "");
                }}
                isError={error.to}
              />
            </div>
            <div className="input-container">
              <label>Ride name</label>
              <input
                className={`input ${error.rideName ? "input-error" : ""}`}
                placeholder="Ride name"
                onChange={(e) =>
                  setrideDetails({
                    ...rideDetails,
                    rideName: e.target.value.trim(),
                  })
                }
                onKeyUp={(e) =>
                  (e.KeyCode === 13 || e.which === 13) && handleSubmit()
                }
              />
              <span className="error-text">{error.rideName}</span>
            </div>
            <div className="input-container">
              <label>Ride Capacity</label>
              <input
                className={`input ${error.rideCapacity ? "input-error" : ""}`}
                type="number"
                placeholder="Ride capacity"
                onChange={(e) =>
                  setrideDetails({
                    ...rideDetails,
                    rideCapacity: e.target.value.trim(),
                  })
                }
                onKeyUp={(e) =>
                  (e.KeyCode === 13 || e.which === 13) && handleSubmit()
                }
              />
              <span className="error-text">{error.rideCapacity}</span>
            </div>
            <div className="input-container">
              <label>First Luggage</label>
              <input
                className={`input ${error.luggage1 ? "input-error" : ""}`}
                type="number"
                placeholder="First luggage"
                onChange={(e) =>
                  setrideDetails({
                    ...rideDetails,
                    luggage1: e.target.value.trim(),
                  })
                }
                onKeyUp={(e) =>
                  (e.KeyCode === 13 || e.which === 13) && handleSubmit()
                }
              />
              <span className="error-text">{error.luggage1}</span>
            </div>
            <div className="input-container">
              <label>Second Luggage</label>
              <input
                className={`input ${error.luggage2 ? "input-error" : ""}`}
                type="number"
                placeholder="Second luggage"
                onChange={(e) =>
                  setrideDetails({
                    ...rideDetails,
                    luggage2: e.target.value.trim(),
                  })
                }
                onKeyUp={(e) =>
                  (e.KeyCode === 13 || e.which === 13) && handleSubmit()
                }
              />
              <span className="error-text">{error.luggage2}</span>
            </div>

            <span className="remove-stop">
              Remove Stops{" "}
              <MdDelete
                size={20}
                onClick={() => setrideDetails({ ...rideDetails, stops: [] })}
              />
            </span>

            {rideDetails.stops.map((ridestops, index) => (
              <div className="ride-stops" key={index}>
                <div className="input-container">
                  <Selector
                    mainTitle={"Pickup from"}
                    title={"Select city"}
                    items={locationList.from}
                    // initialSelection={[
                    //   {
                    //     id: ridestops.to,
                    //     item: ridestops.fromCityName,
                    //   },
                    // ]}
                    selectedItem={(e) => {
                      {
                        const updatedStops = [...rideDetails.stops];
                        updatedStops[index] = {
                          ...updatedStops[index],
                          from: e.length > 0 ? e[0].id : "",
                          fromCityName: e.length > 0 ? e[0].item : "",
                        };
                        setrideDetails({ ...rideDetails, stops: updatedStops });
                      }
                      // locationHandler("from", e.length > 0 ? e[0].id : "");
                    }}
                    isError={error.rideFrom}
                  />
                </div>
                <div className="input-container">
                  <Selector
                    mainTitle={"dropoff to"}
                    title={"Select city"}
                    items={locationList.to}
                    // initialSelection={[
                    //   {
                    //     id: ridestops.to,
                    //     item: ridestops.toCityName,
                    //   },
                    // ]}
                    selectedItem={(e) => {
                      const updatedStops = [...rideDetails.stops];
                      updatedStops[index] = {
                        ...updatedStops[index],
                        to: e.length > 0 ? e[0].id : "",
                        toCityName: e.length > 0 ? e[0].item : "",
                      };
                      setrideDetails({ ...rideDetails, stops: updatedStops });
                      // locationHandler("to", e.length > 0 ? e[0].id : "");
                    }}
                    isError={error.to}
                  />
                </div>
                <DatePicker
                  placeholderText="Select Pickup Time"
                  selected={ridestops.pickupTime}
                  onChange={(date) => {
                    const updatedStops = [...rideDetails.stops];
                    updatedStops[index] = {
                      ...updatedStops[index],
                      pickupTime: date,
                    };
                    setrideDetails({ ...rideDetails, stops: updatedStops });
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Pickup"
                  dateFormat="h:mm aa"
                  disabledKeyboardNavigation
                />
                <div className="input-container">
                  <label>Travel Time</label>
                  <input
                    className={`input ${error.travelTime ? "input-error" : ""}`}
                    type="number"
                    value={ridestops.travelTime}
                    placeholder="Travel time (in hrs)"
                    onChange={(e) => {
                      const updatedStops = [...rideDetails.stops];
                      updatedStops[index] = {
                        ...updatedStops[index],
                        travelTime: e.target.value.trim(),
                      };
                      setrideDetails({ ...rideDetails, stops: updatedStops });
                    }}
                    onKeyUp={(e) =>
                      (e.KeyCode === 13 || e.which === 13) && handleSubmit()
                    }
                  />
                  <span className="error-text">{error.travelTime}</span>
                </div>
                <div className="input-container">
                  <label>Price</label>
                  <input
                    className={`input ${error.price ? "input-error" : ""}`}
                    type="number"
                    value={ridestops.price}
                    placeholder="Price"
                    onChange={(e) => {
                      const updatedStops = [...rideDetails.stops];
                      updatedStops[index] = {
                        ...updatedStops[index],
                        price: e.target.value.trim(),
                      };
                      setrideDetails({ ...rideDetails, stops: updatedStops });
                    }}
                    onKeyUp={(e) =>
                      (e.KeyCode === 13 || e.which === 13) && handleSubmit()
                    }
                  />
                  <span className="error-text">{error.price}</span>
                </div>
              </div>
            ))}
            <span
              onClick={() =>
                setrideDetails({
                  ...rideDetails,
                  stops: [...rideDetails.stops, rideStopsObj],
                })
              }
              className="add-stops"
            >
              <FaPlusCircle />
            </span>
            <button
              onClick={() => handleSubmit()}
              type="button"
              disabled={loading}
            >
              {loading ? <Spinner type={"button"} /> : "Add"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddRide;
