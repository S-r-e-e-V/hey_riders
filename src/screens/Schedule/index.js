import React, { useState } from "react";
import "./Schedule.css";
import { useNavigate, useParams } from "react-router-dom";

export default function Schedule(props) {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [scheduleInfo, setscheduleInfo] = useState(routeParams);
  console.log(scheduleInfo);
  return (
    <div className="schedule-page">
      <span>Work in progress</span>
      {/* <div className="container">
        <span className="title">Toronto to Windsor</span>
        <span>
          Choose this card if you're starting your journey in Toronto and
          heading to Windsor, with possible stops at intermediate cities along
          the way
        </span>
        <button onClick={() => navigate("/schedule-details")}>Book</button>
      </div> */}
    </div>
  );
}
