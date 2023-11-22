import React, { useState, useEffect } from "react";
import "../Admin.css";
import "./AdminCities.css";

import Spinner from "../../../components/Spinner";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

// api
import { deleteData, getData } from "../../../api";
import { useNavigate } from "react-router-dom";
import Alert from "../../../utils/Alert";

const AdminCities = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [pageRefresh, setpageRefresh] = useState(false);
  const [cities, setcities] = useState([]);

  const getCities = async () => {
    setloading(true);
    const response = await getData("/city/cities", false);
    setloading(false);
    if (response) setcities(response);
  };
  useEffect(() => {
    getCities();
  }, [pageRefresh]);

  const onCancel = async (id) => {
    setloading(true);
    const response = await deleteData(`/city/delete/${id}`);
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
        <div className="admin cities">
          <div className="add" onClick={() => navigate("/admin/cities/add")}>
            Add+
          </div>
          {cities.map((city) => (
            <div className="list-content">
              <div className="name">{city.city}</div>
              <div className="province">{city.province}</div>
              <div className="country">{city.country}</div>
              <div className="action-buttons">
                <div
                  className="edit"
                  onClick={() => navigate(`/admin/cities/edit/${city._id}`)}
                >
                  <MdEdit />
                </div>
                <div className="cancel" onClick={() => onCancel(city._id)}>
                  <AiFillDelete />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminCities;
