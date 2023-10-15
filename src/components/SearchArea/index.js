import React from "react";
import "./SearchArea.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Selector from "../Selector";

export default function SearchArea({ locations, date, setdate }) {
  return (
    <div className="search-area">
      <div className="location">
        <div className="from">
          <Selector
            mainTitle={"Origin"}
            title={"Leaving from"}
            items={locations}
          />
        </div>
        <div className="to">
          <Selector
            mainTitle={"Destination"}
            title={"Going to"}
            items={locations}
          />
        </div>
      </div>
      <div className="date">
        <div className="title">Date</div>
        <DatePicker
          selected={date}
          onChange={(date) => setdate(date)}
          minDate={new Date()}
          //   showTimeSelect
          //   includeTimes={timeFromWindsor}
          dateFormat="MMMM d, yyyy"
          disabledKeyboardNavigation
        />
      </div>
      <div className="passengers">
        <div className="title">Passengers</div>
        <div className="content">{0} passengers</div>
      </div>
    </div>
  );
}
