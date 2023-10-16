import React, { useRef, useState, useEffect } from "react";
import "./SearchArea.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { AiOutlineMinusCircle, AiFillPlusCircle } from "react-icons/ai";

import Selector from "../Selector";

export default function SearchArea({
  locations,
  scheduleInfo,
  setscheduleInfo,
  error,
}) {
  const [open, setopen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setopen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="search-area">
      <div className="location">
        <div className="from">
          <Selector
            mainTitle={"Origin"}
            title={"Leaving from"}
            items={locations}
            selectedItem={(e) =>
              setscheduleInfo({ ...scheduleInfo, from: e[0] })
            }
            isError={error.from}
          />
        </div>
        <div className="to">
          <Selector
            mainTitle={"Destination"}
            title={"Going to"}
            items={locations}
            selectedItem={(e) => setscheduleInfo({ ...scheduleInfo, to: e[0] })}
            isError={error.to}
          />
        </div>
      </div>
      <div className={`date`}>
        <div className="title">Date</div>
        <DatePicker
          selected={scheduleInfo.date}
          onChange={(date) => setscheduleInfo({ ...scheduleInfo, date: date })}
          minDate={new Date()}
          //   showTimeSelect
          //   includeTimes={timeFromWindsor}
          dateFormat="MMMM d, yyyy"
          disabledKeyboardNavigation
        />
      </div>
      <div
        className={`passengers ${error.adults ? "error" : ""}`}
        ref={ref}
        onClick={() => setopen(true)}
      >
        <div className="passengers-header">
          <div className="title">Passengers</div>
          <div className="content">{scheduleInfo.adults} passengers</div>
        </div>
        {open && (
          <div className="popup-contents">
            <div className="popup-content">
              <span>Adult</span>
              <div className="controller">
                <AiOutlineMinusCircle
                  onClick={() =>
                    scheduleInfo.adults > 0
                      ? setscheduleInfo({
                          ...scheduleInfo,
                          adults: scheduleInfo.adults - 1,
                        })
                      : 0
                  }
                />
                <span>{scheduleInfo.adults}</span>
                <AiFillPlusCircle
                  onClick={() =>
                    scheduleInfo.adults > 6
                      ? 0
                      : setscheduleInfo({
                          ...scheduleInfo,
                          adults: scheduleInfo.adults + 1,
                        })
                  }
                />
              </div>
            </div>
            <div className="popup-content">
              <span>Luggage</span>
              <div className="controller">
                <AiOutlineMinusCircle
                  onClick={() =>
                    scheduleInfo.luggage > 0
                      ? setscheduleInfo({
                          ...scheduleInfo,
                          luggage: scheduleInfo.luggage - 1,
                        })
                      : 0
                  }
                />
                <span>{scheduleInfo.luggage}</span>
                <AiFillPlusCircle
                  onClick={() =>
                    setscheduleInfo({
                      ...scheduleInfo,
                      luggage: scheduleInfo.luggage + 1,
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
