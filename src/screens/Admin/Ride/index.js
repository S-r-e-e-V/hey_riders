import React, { useEffect, useState } from "react";
import "../Admin.css";
import "./AdminRide.css";

import { useNavigate } from "react-router-dom";

import Spinner from "../../../components/Spinner";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

// api
import { deleteData, getData } from "../../../api";
import Alert from "../../../utils/Alert";
import NoContent from "../../../components/NoContent";
import moment from "moment";

const AdminRide = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [pageRefresh, setpageRefresh] = useState(false);
  const [ride, setride] = useState([]);

  const getRides = async () => {
    setloading(true);
    const response = await getData("/ride/rides", false);
    setloading(false);
    if (response) setride(response);
  };
  useEffect(() => {
    getRides();
  }, [pageRefresh]);

  // const onCancel = async (id) => {
  //   setloading(true);
  //   const response = await deleteData(`/ride/delete/${id}`);
  //   setloading(false);
  //   if (response) {
  //     Alert(
  //       "Successfull",
  //       "Message deleted successfully",
  //       () => {},
  //       false,
  //       () => {},
  //       () => {
  //         setpageRefresh(!pageRefresh);
  //       },
  //       true,
  //       "Ok"
  //     );
  //   }
  // };
  const findRideDetails = (ride) => {
    const res = ride.stops.filter(
      (stop) =>
        stop.from._id === ride.rideFrom._id && stop.to._id === ride.rideTo._id
    );
    return res.length > 0 ? res[0] : 0;
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin location">
          <div className="add" onClick={() => navigate("/admin/ride/add")}>
            Add+
          </div>
          {ride.length > 0 ? (
            ride.map((item) => (
              <div className="list-content">
                <div className="list-details">
                  <div>
                    <div className="ride-name">{item.rideName}</div>
                    <div className="from">Ride from: {item.rideFrom.city}</div>
                    <div className="to">Ride to: {item.rideTo.city}</div>
                  </div>
                  <div>
                    <div className="travel-time">
                      Starting time:{" "}
                      {moment(findRideDetails(item).pickupTime).format(
                        "HH:mm A"
                      )}
                    </div>
                    <div className="price">
                      Price: ${findRideDetails(item).price}
                    </div>
                  </div>
                </div>
                <div className="action-buttons">
                  <div
                    className="edit"
                    onClick={() => navigate(`/admin/ride/edit/${item._id}`)}
                  >
                    <MdEdit />
                  </div>
                  <div
                    className="cancel"
                    onClick={() => navigate(`/admin/ride/cancel/${item._id}`)}
                  >
                    <AiFillDelete />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NoContent content={"No Bookings Available"} />
          )}
        </div>
      )}
    </>
  );
};

export default AdminRide;
