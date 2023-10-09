import React from "react";
import "./Schedule.css";

export default function Schedule() {
  return (
    <div className="schedule-page">
      <div className="container">
        <span className="title">Toronto to Windsor</span>
        <span>
          Choose this card if you're starting your journey in Toronto and
          heading to Windsor, with possible stops at intermediate cities along
          the way
        </span>
        <button>Book</button>
      </div>
    </div>
  );
}
