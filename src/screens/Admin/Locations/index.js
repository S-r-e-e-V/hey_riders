import React, { useEffect, useState } from "react";
import "../Admin.css";
import "./AdminLocations.css";

import { useNavigate } from "react-router-dom";

import Spinner from "../../../components/Spinner";

// api
import { getData, postData } from "../../../api";

const AdminLocations = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [locations, setlocations] = useState([]);

  const getLocations = async () => {
    setloading(true);
    const response = await postData("/location/locations", {}, false);
    setloading(false);

    if (response) setlocations(response);
  };
  useEffect(() => {
    getLocations();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin location">
          {/* <div className="add" onClick={() => navigate("/admin/locations/add")}>
            Add+
          </div> */}
          {locations.map((location) => (
            <div className="list-content">
              <div className="name">{location.location}</div>
              <div className="city">{location.city?.city}</div>
              {/* <div className="price">City</div> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminLocations;
