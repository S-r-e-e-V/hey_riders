import React, { useState, useEffect } from "react";
import "./CancelRide.css";

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
import { getData, postData } from "../../../api";

const CancelRide = () => {
  const routeParams = useParams();
  const navigate = useNavigate();

  const [rideDetails, setrideDetails] = useState({
    id: routeParams.id,
    rideName: "",
    rideCancelledDays: [],
  });

  const [loading, setloading] = useState({ page: false, button: false });

  // submit
  const handleSubmit = async () => {
    try {
      setloading(true);
      const response = await postData(`/ride/cancel/${rideDetails.id}`, {
        rideCancelledDays: rideDetails.rideCancelledDays,
      });
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
    } catch (error) {
      Alert(
        error.message,
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
      setloading(false);
    }
  };

  const getRide = async () => {
    const ride = await getData(`/ride/${routeParams.id}`);
    if (ride) {
      setrideDetails({
        id: ride._id,
        rideName: ride.rideName,
        rideCancelledDays:
          ride.rideCancelledDays?.length > 0 ? ride.rideCancelledDays : [],
      });
    }
  };

  useEffect(() => {
    getRide();
  }, []);
  console.log(rideDetails);
  return (
    <>
      {loading.page ? (
        <Spinner />
      ) : (
        <div className="admin cancel-ride-page">
          <div className="title">Cancel Ride ({rideDetails.rideName})</div>

          <form className="login-container">
            {rideDetails.rideCancelledDays.map((date, index) => (
              <div className="dates" key={index}>
                {console.log("date:", date)}
                <DatePicker
                  placeholderText="Select dates to cancel ride"
                  selected={new Date(date)}
                  onChange={(date) => {
                    const updatedDates = [...rideDetails.rideCancelledDays];
                    updatedDates[index] = date;
                    setrideDetails({
                      ...rideDetails,
                      rideCancelledDays: updatedDates,
                    });
                  }}
                  dateFormat="dd-MM-yyyy"
                  disabledKeyboardNavigation
                />
                <span className="remove-stop">
                  <MdDelete
                    size={20}
                    onClick={() =>
                      setrideDetails({
                        ...rideDetails,
                        rideCancelledDays: rideDetails.rideCancelledDays.filter(
                          (item, i) => i != index
                        ),
                      })
                    }
                  />
                </span>
              </div>
            ))}
            {rideDetails.rideCancelledDays.length <= 1 && (
              <span
                onClick={() =>
                  setrideDetails({
                    ...rideDetails,
                    rideCancelledDays: [
                      ...rideDetails.rideCancelledDays,
                      new Date(),
                    ],
                  })
                }
                className="add-date"
              >
                <span>Add date</span> <FaPlusCircle />
              </span>
            )}
            <button
              onClick={() => handleSubmit()}
              type="button"
              disabled={loading.button}
            >
              {loading.button ? <Spinner type={"button"} /> : "Confirm"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CancelRide;
