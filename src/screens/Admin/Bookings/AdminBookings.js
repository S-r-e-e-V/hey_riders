import React from "react";
import "../Admin.css";

const AdminBookings = () => {
  return (
    <div className="admin bookings">
      <div className="list">
        <div className="name">Name</div>
        <div className="price">Price</div>
        <div className="from">From</div>
        <div className="from">To</div>
        {/* <div className="cancel">Cancel</div> */}
      </div>
    </div>
  );
};

export default AdminBookings;
