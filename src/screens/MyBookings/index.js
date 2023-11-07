import React, { useState, useEffect } from "react";
import "./MyBookings.css";

import moment from "moment";

//api
import { getData } from "../../api";

// utils
import { Capitalize } from "../../utils/StringFormat";

// components
import Spinner from "../../components/Spinner";

const MyBookings = () => {
  const [loading, setloading] = useState(false);
  const [bookings, setbookings] = useState([]);

  const getBookings = async () => {
    setloading(true);
    const response = await getData("/booking/user/bookings");
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
        <div className="my-bookings">
          {bookings.map((booking) => (
            <div className="booking-card">
              <div className="booking-header">
                <div className="scheduled-for">
                  Scheduled for:{" "}
                  <span>
                    {moment(booking.ScheduledToTime).format(
                      "DD/MM/YYYY [at] hh:mm A"
                    )}
                  </span>
                  <span>{` (${booking.from.city_id.city} to ${booking.to.city_id.city})`}</span>
                </div>
                <div className="status">
                  Status:{" "}
                  <span className={`${booking.status}`}>{booking.status}</span>
                </div>
              </div>
              <div className="booked-on">
                Booked on:{" "}
                <span>
                  {moment(booking.createdAt).format("DD/MM/YYYY [at] hh:mm A")}
                </span>
              </div>
              <div className="content">
                <div className="booking-location">
                  <span>
                    Pickup: {`${Capitalize(booking.from.location_id.location)}`}
                  </span>
                  <span>
                    Dropoff: {`${Capitalize(booking.to.location_id.location)}`}
                  </span>
                </div>
                <div className="price">{`$${booking.price}`}</div>
              </div>
              {booking.status === "Confirmed" && (
                <div className="driver-info">
                  <div className="name">Driver name: {booking.driver.name}</div>
                  <div className="ph">
                    Phone number: {booking.driver.phoneNumber}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MyBookings;
