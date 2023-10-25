import React from "react";
import "../Admin.css";
import "./AdminCities.css";

const AdminCities = () => {
  return (
    <div className="admin cities">
      <div className="add">Add+</div>
      <div className="list">
        <div className="name">City</div>
        <div className="price">Province</div>
        <div className="from">Country</div>
      </div>
    </div>
  );
};

export default AdminCities;
