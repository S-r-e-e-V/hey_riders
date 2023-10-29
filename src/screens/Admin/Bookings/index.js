import React, { useState, useEffect } from "react";
import "../Admin.css";

import Spinner from "../../../components/Spinner";

import { getData } from "../../../api";
import moment from "moment";

const AdminBookings = () => {
  const [loading, setloading] = useState(false);
  const [bookings, setbookings] = useState([]);

  const getBookings = async () => {
    setloading(true);
    const response = await getData("/booking/bookings", false);
    setloading(false);
    if (response) setbookings(response);
  };
  useEffect(() => {
    getBookings();
  }, []);
  console.log(bookings);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin bookings">
          {bookings.map((booking) => (
            <div className="list-content">
              <div className="name">{booking.user_id.name}</div>
              <div className="price">${booking.price}</div>
              <div className="from">{booking.from.location_id.location}</div>
              <div className="from">{booking.to.location_id.location}</div>
              <div className="date">
                {moment(booking.scheduledToTime).format("DD/MM/YYYY  hh:mm A")}
              </div>
              {/* <div className="cancel">Cancel</div> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminBookings;
