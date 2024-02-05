import React, { useState, useEffect, forwardRef } from "react";
import "../Admin.css";
import "./AdminBookings.css";

import Spinner from "../../../components/Spinner";

import { getData, postData } from "../../../api";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import NoContent from "../../../components/NoContent";

const AdminBookings = () => {
  const navigator = useNavigate();
  const [loading, setloading] = useState(false);
  const [bookings, setbookings] = useState([]);
  const [filterList, setfilterList] = useState([]);

  var today = new Date();
  var endDate = new Date(today.setMonth(today.getMonth() + 3));
  const [date, setdate] = useState({
    startDate: new Date(),
    endDate: endDate,
  });

  var initialTime = new Date();
  initialTime.setHours(5, 0, 0, 0);
  const [time, settime] = useState(initialTime);
  const [isnotConfirmedFilter, setisnotConfirmedFilter] = useState({
    isFilter: false,
    text: "See bookings not confirmed",
  });

  const getBookings = async () => {
    setloading(true);
    const response = await postData("/booking/bookings", {
      startTime: date.startDate,
      endTime: date.endDate,
      isPending: isnotConfirmedFilter.isFilter,
    });
    setloading(false);
    if (response) {
      setbookings(response);
      setfilterList(response);
    }
  };
  useEffect(() => {
    getBookings();
  }, [date, isnotConfirmedFilter]);

  const filterTime = () => {
    let t = new Date(time);
    let queryHour = t.getHours();
    let queryMinutes = t.getMinutes();

    setfilterList(
      bookings.filter((item) => {
        let date = new Date(item.ScheduledToTime);
        let hour = date.getHours();
        let min = date.getMinutes();
        return queryHour == hour && queryMinutes == min;
      })
    );
  };
  useEffect(() => {
    if (!isnotConfirmedFilter.isFilter) filterTime();
  }, [time]);

  //  custom datepicker
  const CustomDatepicker = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin bookings">
          <div className="datepicker">
            <button
              className="button"
              onClick={() =>
                isnotConfirmedFilter.isFilter
                  ? setisnotConfirmedFilter({
                      isFilter: false,
                      text: "See bookings not Confirmed",
                    })
                  : setisnotConfirmedFilter({
                      isFilter: true,
                      text: "Apply date and time filter",
                    })
              }
            >
              {isnotConfirmedFilter.text}
            </button>
            <DatePicker
              className="date-picker"
              selected={time}
              onChange={(date) => {
                settime(date);
              }}
              showTimeSelect
              showTimeSelectOnly
              includeTimes={[
                new Date().setHours(5, 0, 0, 0),
                new Date().setHours(10, 0, 0, 0),
                new Date().setHours(15, 0, 0, 0),
                new Date().setHours(18, 0, 0, 0),
                new Date().setHours(9, 0, 0, 0),
                new Date().setHours(19, 30, 0, 0),
                new Date().setHours(22, 0, 0, 0),
              ]}
              timeCaption="Time"
              timeIntervals={30}
              dateFormat="h:mm aa"
              customInput={<CustomDatepicker />}
            />
            <DatePicker
              className="date-picker"
              selected={time}
              onChange={(dates) => {
                const [start, end] = dates;
                setdate({
                  startDate: start,
                  endDate: end,
                });
              }}
              startDate={date.startDate}
              endDate={date.endDate}
              minDate={new Date()}
              selectsRange
              monthsShown={2}
              customInput={<CustomDatepicker />}
            />
          </div>
          {filterList.length > 0 ? (
            filterList.map((booking) => (
              <div
                className="list-content"
                onClick={() => navigator(`/admin/bookings/${booking._id}`)}
              >
                <div>
                  <div className="name">Name: {booking.user_id.name}</div>
                  <div className={`status`}>
                    Status:{" "}
                    <span className={`${booking.status}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
                <div>
                  {/* <div className="date">
                    Scheduled for:{" "}
                    {moment(booking.ScheduledToTime).format(
                      "DD/MM/YYYY  hh:mm A"
                    )} */}
                  <div>Phone: {booking.user_id.phone}</div>
                  <div className="price">
                    Price: <span>${booking.price}</span>
                  </div>
                </div>
                <div className="date">
                  Scheduled for:{" "}
                  {moment(booking.ScheduledToTime).format(
                    "DD/MM/YYYY  hh:mm A"
                  )}
                </div>
                <div className="from">
                  Pickup:{" "}
                  {booking.from.location_id._id === "6564e158f3d3c3b55fe5854b"
                    ? booking.from.customLocation
                    : booking.from.location_id.location}
                </div>
                <div className="to">
                  Dropoff:{" "}
                  {booking.to.location_id._id === "6564e158f3d3c3b55fe5854b"
                    ? booking.to.customLocation
                    : booking.to.location_id.location}
                </div>

                {booking.driver && (
                  <span className="driver">
                    Driver: <span> {booking.driver.name}</span>
                  </span>
                )}
              </div>
            ))
          ) : (
            <NoContent content={"No Bookings Available"} />
          )}
        </div>
      )}
    </>
  );
};

export default AdminBookings;
