import React, { useEffect, useState } from "react";
import "../Admin.css";
import "./AdminLocations.css";

import { useNavigate } from "react-router-dom";

import Spinner from "../../../components/Spinner";
import { AiFillDelete } from "react-icons/ai";

// api
import { deleteData, getData, postData } from "../../../api";
import Alert from "../../../utils/Alert";

const AdminLocations = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [pageRefresh, setpageRefresh] = useState(false);
  const [locations, setlocations] = useState([]);

  const getLocations = async () => {
    setloading(true);
    const response = await postData("/location/locations", {}, false);
    setloading(false);

    if (response) setlocations(response);
  };
  useEffect(() => {
    getLocations();
  }, [pageRefresh]);

  const onCancel = async (id) => {
    setloading(true);
    const response = await deleteData(`/location/delete/${id}`);
    setloading(false);
    if (response) {
      Alert(
        "Successfull",
        "Message deleted successfully",
        () => {},
        false,
        () => {},
        () => {
          setpageRefresh(!pageRefresh);
        },
        true,
        "Ok"
      );
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin location">
          <div className="add" onClick={() => navigate("/admin/locations/add")}>
            Add+
          </div>
          {locations.map((location) => (
            <div className="list-content">
              <div className="name">{location.location}</div>
              <div className="city">{location.city?.city}</div>
              {/* <div className="price">City</div> */}
              <div className="cancel" onClick={() => onCancel(location._id)}>
                <AiFillDelete />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminLocations;
