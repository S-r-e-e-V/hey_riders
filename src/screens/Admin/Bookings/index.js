import React, { useState, useEffect } from "react";
import "../Admin.css";

import Spinner from "../../../components/Spinner";

import { getData } from "../../../api";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const AdminBookings = () => {
  const navigator = useNavigate();
  const [loading, setloading] = useState(false);
  const [bookings, setbookings] = useState([]);

  const getBookings = async () => {
    setloading(true);
    const response = await getData("/booking/bookings");
    setloading(false);
    if (response) setbookings(response);
  };
  useEffect(() => {
    getBookings();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin bookings">
          {bookings.map((booking) => (
            <div
              className="list-content"
              onClick={() => navigator(`/admin/bookings/${booking._id}`)}
            >
              <div className="name">Name: {booking.user_id.name}</div>
              <div className="price">Price: ${booking.price}</div>
              <div className={`status`}>
                Status:{" "}
                <span className={`${booking.status}`}>{booking.status}</span>
              </div>
              <div className="from">
                Pickup: {booking.from.location_id.location}
              </div>
              <div className="to">
                Dropoff: {booking.to.location_id.location}
              </div>
              <div className="date">
                Date:{" "}
                {moment(booking.ScheduledToTime).format("DD/MM/YYYY  hh:mm A")}
              </div>
              {booking.driver && (
                <div className="driver">Driver: {booking.driver.name}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminBookings;
