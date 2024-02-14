import React, { useState, useEffect, forwardRef, useRef } from "react";
import "../Admin.css";
import "./AdminBookings.css";

import Spinner from "../../../components/Spinner";

import { getData, postData } from "../../../api";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import NoContent from "../../../components/NoContent";
import Selector from "../../../components/Selector";

const AdminBookings = () => {
  const navigator = useNavigate();
  const [loading, setloading] = useState(false);
  const [bookings, setbookings] = useState([]);
  const [cities, setcities] = useState([]);
  const [locationDetails, setlocationDetails] = useState(null);
  const [filterList, setfilterList] = useState([]);

  var today = new Date();
  var endDate = new Date(today.setMonth(today.getMonth() + 3));
  const [date, setdate] = useState({
    startDate: new Date(),
    endDate: endDate,
  });

  var initialTime = new Date();
  initialTime.setHours(0, 0, 0, 0);
  const [time, settime] = useState("");
  const [isnotConfirmedFilter, setisnotConfirmedFilter] = useState({
    isFilter: false,
    text: "See bookings yet to Confirm",
  });

  const getBookings = async () => {
    const bookings = await postData("/booking/bookings", {
      startTime: date.startDate,
      endTime: date.endDate,
      isPending: isnotConfirmedFilter.isFilter,
    });
    if (bookings) {
      return bookings;
    }
  };
  const getCities = async () => {
    const response = await getData("/city/cities", false);
    if (response) {
      let city = response.map((item) => ({ id: item._id, item: item.city }));
      return city;
    }
  };

  const filterBookings = () => {
    let t = new Date(time);
    let queryHour = t.getHours();
    let queryMinutes = t.getMinutes();

    let filterData = [];
    if (locationDetails == null && time === "") {
      filterData = bookings;
    } else {
      bookings.forEach((element) => {
        let date = new Date(element.ScheduledToTime);
        let hour = date.getHours();
        let min = date.getMinutes();
        if (!locationDetails) {
          if (queryHour == hour && queryMinutes == min) {
            filterData.push(element);
          }
        } else if (time === "") {
          if (locationDetails === element.from.city_id._id) {
            filterData.push(element);
          }
        } else {
          if (
            queryHour == hour &&
            queryMinutes == min &&
            locationDetails === element.from.city_id._id
          ) {
            filterData.push(element);
          }
        }
      });
    }
    setfilterList(filterData);
  };
  const handleClearFilter = () => {
    setdate({
      startDate: new Date(),
      endDate: endDate,
    });
    settime("");
    setlocationDetails(null);
  };
  const apiCall = async () => {
    setloading(true);
    const citiesPromise = getCities();
    const bookingsPromise = getBookings();

    const [city, bookings] = await Promise.all([
      citiesPromise,
      bookingsPromise,
    ]);
    setcities(city);
    setbookings(bookings);
    setfilterList(bookings);
    settime("");
    setlocationDetails(null);
    setloading(false);
  };
  useEffect(() => {
    apiCall();
  }, [date, isnotConfirmedFilter]);

  useEffect(() => {
    if (!isnotConfirmedFilter.isFilter) filterBookings();
  }, [time, locationDetails]);

  //  custom datepicker
  const CustomDatepicker = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value ? value : "Select time"}
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
                      text: "See bookings yet to Confirm",
                    })
                  : setisnotConfirmedFilter({
                      isFilter: true,
                      text: "Apply date and time filter",
                    })
              }
            >
              {isnotConfirmedFilter.text}
            </button>
            <Selector
              // mainTitle={"Origin"}
              title={"Traveling To"}
              items={cities}
              // initialSelection={locationsFrom}
              selectedItem={(e) => {
                setlocationDetails(e.length > 0 ? e[0].id : "");
              }}
            />
            <DatePicker
              className="date-picker"
              selected={time}
              placeholderText="Select Time"
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
            <button className="clear" onClick={() => handleClearFilter()}>
              Clear Filters
            </button>
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
