import React, { useState, useEffect } from "react";
import "./EditRide.css";

import { useNavigate, useParams } from "react-router-dom";

import Selector from "../../../components/Selector";
import Spinner from "../../../components/Spinner";
import Alert from "../../../utils/Alert";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { MandatoryFieldCheck } from "../../../utils/validation";
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// api
import { getData, postData, putData } from "../../../api";

const EditRide = () => {
  const routeParams = useParams();
  const navigate = useNavigate();

  const rideStopsObj = {
    from: "",
    to: "",
    price: "",
    pickupTime: new Date(),
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

  const [loading, setloading] = useState({ page: true, button: false });

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
      return city;
    }
  };

  const getRide = async () => {
    const ride = await getData(`/ride/${routeParams.id}`);
    if (ride) {
      setrideDetails({
        ...ride,
        luggage1: ride.luggage[0],
        luggage2: ride.luggage[1],
      });
      return ride;
    }
    return null;
  };

  const apiCalls = async () => {
    setloading({ ...loading, page: true });
    const citiesPromise = getCities();
    const ridePromise = getRide();

    const [city, ride] = await Promise.all([citiesPromise, ridePromise]);
    setloading({ ...loading, page: false });
  };
  useEffect(() => {
    apiCalls();
  }, []);

  // submit
  const handleSubmit = async () => {
    let error = validation();

    if (
      error.rideFrom === "" &&
      error.rideTo === "" &&
      error.rideCapacity === "" &&
      error.rideName === "" &&
      error.luggage1 === "" &&
      error.luggage2 === ""
    ) {
      setloading({ ...loading, button: true });
      let payload = {
        rideFrom: rideDetails.rideFrom,
        stops: rideDetails.stops,

        // price: parseFloat(rideDetails.price).toFixed(2),
        rideTo: rideDetails.rideTo,
        rideName: rideDetails.rideName,
        rideCapacity: rideDetails.rideCapacity,
        to: rideDetails.to,
        // travelTime: rideDetails.travelTime,
        luggage: [
          parseFloat(rideDetails.luggage1).toFixed(2),
          parseFloat(rideDetails.luggage2).toFixed(2),
        ],
      };
      const response = await putData(`/ride/update/${routeParams.id}`, payload);
      if (response) {
        Alert(
          "Updated",
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
      setloading({ ...loading, button: false });
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
        rideDetails.rideFrom._id && (
          <div className="admin add-price-page">
            <div className="title">Edit Ride</div>
            <form className="login-container">
              <div className="input-container">
                <Selector
                  mainTitle={"Ride Starting Location"}
                  title={"Ride Starting Location"}
                  items={locationList.from}
                  initialSelection={[
                    {
                      id: rideDetails.rideFrom._id,
                      item: rideDetails.rideFrom.city,
                    },
                  ]}
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
                  title={"Ride Ending Location"}
                  items={locationList.to}
                  initialSelection={[
                    {
                      id: rideDetails.rideTo._id,
                      item: rideDetails.rideTo.city,
                    },
                  ]}
                  selectedItem={(e) => {
                    setrideDetails({
                      ...rideDetails,
                      rideTo: e.length > 0 ? e[0].id : "",
                    });
                    locationHandler("to", e.length > 0 ? e[0].id : "");
                  }}
                  isError={error.rideTo}
                />
              </div>
              <div className="input-container">
                <label>Ride name</label>
                <input
                  className={`input ${error.rideName ? "input-error" : ""}`}
                  placeholder="Ride Name"
                  value={rideDetails.rideName}
                  onChange={(e) =>
                    setrideDetails({
                      ...rideDetails,
                      rideName: e.target.value,
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
                  value={rideDetails.rideCapacity}
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
                  value={rideDetails.luggage1}
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
                  value={rideDetails.luggage2}
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
                      initialSelection={[
                        { id: ridestops.from?._id, item: ridestops.from?.city },
                      ]}
                      selectedItem={(e) => {
                        {
                          const updatedStops = [...rideDetails.stops];
                          updatedStops[index] = {
                            ...updatedStops[index],
                            from: e.length > 0 ? e[0].id : "",
                          };
                          setrideDetails({
                            ...rideDetails,
                            stops: updatedStops,
                          });
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
                      initialSelection={[
                        { id: ridestops.to?._id, item: ridestops.to?.city },
                      ]}
                      selectedItem={(e) => {
                        const updatedStops = [...rideDetails.stops];
                        updatedStops[index] = {
                          ...updatedStops[index],
                          to: e.length > 0 ? e[0].id : "",
                        };
                        setrideDetails({ ...rideDetails, stops: updatedStops });
                        // locationHandler("to", e.length > 0 ? e[0].id : "");
                      }}
                      isError={error.to}
                    />
                  </div>
                  <DatePicker
                    placeholderText="Select Pickup Time"
                    selected={new Date(ridestops.pickupTime)}
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
                      value={ridestops.travelTime}
                      className={`input ${
                        error.travelTime ? "input-error" : ""
                      }`}
                      type="number"
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
                      value={ridestops.price}
                      className={`input ${error.price ? "input-error" : ""}`}
                      type="number"
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
                disabled={loading.button}
              >
                {loading.button ? <Spinner type={"button"} /> : "Update"}
              </button>
            </form>
          </div>
        )
      )}
    </>
  );
};

export default EditRide;
