import React, { useContext } from "react";

// icons
import {
  BsExclamationCircle,
  BsGear,
  BsCarFront,
  BsTelephone,
  BsFileBarGraph,
} from "react-icons/bs";
import { AiOutlineSchedule } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

// images
import Logo from "../../assets/heyrides_logo.png";

// context
import { AuthContext } from "../../context/AuthContext";

export default function AdminHeader() {
  const navigate = useNavigate();
  const { isAuthenticated, setisAuthenticated } = useContext(AuthContext);
  return (
    <div className="header">
      <div className="titles">
        {/* <div className="logo-section"> */}
        <img onClick={() => navigate("/")} src={Logo} className="logo" />
        {/* </div> */}

        <div className="title" onClick={() => navigate("/admin/bookings")}>
          <span>
            <AiOutlineSchedule size={13} />
          </span>
          <span>Bookings</span>
        </div>
        <div className="title" onClick={() => navigate("/admin/cities")}>
          <span>
            <BsGear size={13} />
          </span>
          <span>Cities</span>
        </div>
        <div className="title" onClick={() => navigate("/admin/locations")}>
          <span>
            <BsExclamationCircle size={13} />
          </span>
          <span>Locations</span>
        </div>
        <div className="title" onClick={() => navigate("/admin/price")}>
          <span>
            <BsCarFront size={13} />
          </span>
          <span>Price</span>
        </div>
      </div>
      {isAuthenticated && (
        <button
          className="auth-button"
          onClick={() => setisAuthenticated(false)}
        >
          Logout
        </button>
      )}
    </div>
  );
}
