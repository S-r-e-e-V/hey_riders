import React, { useState } from "react";
import "./ScheduleDetails.css";

// components
import Selector from "../../components/Selector";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Locations = [
  { id: 1, item: "Windsor" },
  { id: 2, item: "Toronto" },
];
const passengers = [
  { id: 0, item: 1 },
  { id: 1, item: 2 },
  { id: 2, item: 3 },
  { id: 3, item: 4 },
  { id: 4, item: 5 },
  { id: 5, item: 6 },
  { id: 6, item: 7 },
];
const luggages = [
  { id: 0, item: 1 },
  { id: 1, item: 2 },
  { id: 2, item: 3 },
  { id: 3, item: 4 },
];
export default function ScheduleDetails() {
  const [date, setdate] = useState(new Date());
  const d = new Date();
  const timeFromWindsor = [];
  const timeFromToronto = [];
  [5, 10, 15, 17].forEach((element) => {
    let d = new Date();
    d.setHours(element);
    d.setMinutes(0);
    d.setSeconds(0);
    timeFromWindsor.push(new Date(d));
  });
  [9, 15, 19, 21].forEach((element) => {
    let d = new Date();
    d.setHours(element);
    if (element == 19) {
      d.setMinutes(30);
    } else {
      d.setMinutes(0);
    }
    d.setSeconds(0);
    timeFromWindsor.push(new Date(d));
  });
  return (
    <div className="schedule-details">
      <div className="pickup-city">
        <Selector title={"Select Pickup City"} items={Locations} />
      </div>
      <div className="dropoff-city">
        <Selector title={"Select Dropoff City"} items={Locations} />
      </div>

      <div className="pickup-location">
        <Selector title={"Select Pickup Location"} items={Locations} />
      </div>
      <div className="dropoff-location">
        <Selector title={"Select Dropoff Location"} items={Locations} />
      </div>
      <div className="specific-location">
        <input value={"sample"} />
      </div>
      <div className="date-time">
        <DatePicker
          selected={date}
          onChange={(date) => setdate(date)}
          showTimeSelect
          includeTimes={timeFromWindsor}
          dateFormat="MMMM d, yyyy h:mm aa"
          disabledKeyboardNavigation
        />
      </div>
      <div className="passengers">
        <Selector title={"Number of passengers"} items={passengers} />
      </div>
      <div className="luggages">
        <Selector title={"Number of luggages"} items={luggages} />
      </div>
    </div>
  );
}
