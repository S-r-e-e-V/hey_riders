import React, { useState, useEffect } from "react";
import "../Admin.css";
import "./AdminCities.css";

import Spinner from "../../../components/Spinner";

// api
import { getData } from "../../../api";
import { useNavigate } from "react-router-dom";

const AdminCities = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [cities, setcities] = useState([]);

  const getCities = async () => {
    setloading(true);
    const response = await getData("/city/cities", false);
    setloading(false);
    if (response) setcities(response);
  };
  useEffect(() => {
    getCities();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin cities">
          <div className="add" onClick={() => navigate("/admin/cities/add")}>
            Add+
          </div>
          {cities.map((city) => (
            <div className="list-content">
              <div className="name">{city.city}</div>
              <div className="province">{city.province}</div>
              <div className="country">{city.country}</div>
              {/* <div className="cancel">Cancel</div> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminCities;
