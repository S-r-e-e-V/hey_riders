import React, { useContext } from "react";
import "./Header.css";

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
import Logo from "../../assets/heyrides_logo.jpg";

// context
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();

  const { isAuthenticated, setisAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);

  return (
    <div className="header">
      <div className="titles">
        {/* <div className="logo-section"> */}
        <img onClick={() => navigate("/")} src={Logo} className="logo" />
        {/* </div> */}

        {isAuthenticated && (
          <>
            <div className="title" onClick={() => navigate("/schedule")}>
              <span>
                <AiOutlineSchedule size={13} />
              </span>
              <span>SCHEDULE</span>
            </div>

            <div className="title">
              <span>
                <BsFileBarGraph size={13} />
              </span>
              <span>TIMELINE</span>
            </div>
          </>
        )}
        <div className="title">
          <span>
            <BsExclamationCircle size={13} />
          </span>
          <span>ABOUT</span>
        </div>
        <div className="title">
          <span>
            <BsGear size={13} />
          </span>
          <span>OUR SERVICES</span>
        </div>
        <div className="title">
          <span>
            <BsCarFront size={13} />
          </span>
          <span>OUR VEHICLES</span>
        </div>
        <div className="title">
          <span>
            <BsTelephone size={13} />
          </span>
          <span onClick={() => navigate("/contact")}>CONTACT</span>
        </div>
      </div>
      {isAuthenticated ? (
        <button
          className="auth-button"
          onClick={() => setisAuthenticated(false)}
        >
          Logout
        </button>
      ) : (
        <button className="auth-button" onClick={() => navigate("/login")}>
          Login
        </button>
      )}
    </div>
  );
}
