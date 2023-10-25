import React from "react";
import "../Admin.css";
import "./AdminPrice.css";

const AdminPrice = () => {
  return (
    <div className="admin cities">
      <div className="add">Add+</div>
      <div className="list">
        <div className="name">From City</div>
        <div className="price">To City</div>
        <div className="from">Price</div>
      </div>
    </div>
  );
};

export default AdminPrice;
