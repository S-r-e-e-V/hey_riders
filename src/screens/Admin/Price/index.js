import React, { useEffect, useState } from "react";
import "../Admin.css";
import "./AdminPrice.css";

import { useNavigate } from "react-router-dom";

import Spinner from "../../../components/Spinner";

// api
import { getData } from "../../../api";

const AdminPrice = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [price, setprice] = useState([]);

  const getprice = async () => {
    setloading(true);
    const response = await getData("/price/prices", false);
    setloading(false);
    if (response) setprice(response);
  };
  useEffect(() => {
    getprice();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin location">
          <div className="add" onClick={() => navigate("/admin/price/add")}>
            Add+
          </div>
          {price.map((item) => (
            <div className="list-content">
              <div className="from">{item.from.city}</div>
              <div className="to">{item.to.city}</div>
              <div className="price">${item.price}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminPrice;
