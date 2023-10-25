import React from "react";
import "../Admin.css";
import "./AdminLocations.css";

const AdminLocations = () => {
  return (
    <div className="admin cities">
      <div className="add">Add+</div>
      <div className="list">
        <div className="name">Location</div>
        <div className="price">City</div>
      </div>
    </div>
  );
};

export default AdminLocations;
