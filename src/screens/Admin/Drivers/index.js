import React, { useState, useEffect } from "react";
import "../Admin.css";
import "./Drivers.css";

import Spinner from "../../../components/Spinner";

// api
import { getData } from "../../../api";
import { useNavigate } from "react-router-dom";

const AdminDrivers = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [drivers, setdrivers] = useState([]);

  const getdrivers = async () => {
    setloading(true);
    const response = await getData("/driver/drivers", false);
    setloading(false);
    if (response) setdrivers(response);
  };
  useEffect(() => {
    getdrivers();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin driver">
          <div className="add" onClick={() => navigate("/admin/drivers/add")}>
            Add+
          </div>
          {drivers.map((driver) => (
            <div className="list-content">
              <div className="name">{driver.name}</div>
              <div className="phone-number">{driver.phoneNumber}</div>

              {/* <div className="cancel">Cancel</div> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminDrivers;
