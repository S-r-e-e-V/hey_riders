import React from "react";
import "./Schedule.css";
import { useNavigate } from "react-router-dom";

export default function Schedule() {
  const navigate = useNavigate();
  return (
    <div className="schedule-page">
      <div className="container">
        <span className="title">Toronto to Windsor</span>
        <span>
          Choose this card if you're starting your journey in Toronto and
          heading to Windsor, with possible stops at intermediate cities along
          the way
        </span>
        <button onClick={() => navigate("/schedule-details")}>Book</button>
      </div>
      {/* <div className="container">
        <span className="title">Windsor to Toronto</span>
        <span>
          Choose this card if you're starting your journey in Windsor and
          heading to Toronto, with possible stops at intermediate cities along
          the way
        </span>
        <button>Book</button>
      </div> */}
    </div>
  );
}
