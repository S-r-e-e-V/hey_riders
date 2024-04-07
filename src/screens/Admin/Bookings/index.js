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
import { WithInPickUpArea } from "../../../constant/Config";

const AdminBookings = () => {
  const navigator = useNavigate();
  const [loading, setloading] = useState(false);
  const [bookings, setbookings] = useState([]);
  const [rides, setrides] = useState([]);
  const [rideDetails, setrideDetails] = useState(null);
  const [filterList, setfilterList] = useState([]);

  var today = new Date();
  var endDate = new Date(today.setMonth(today.getMonth() + 3));
  const [date, setdate] = useState({
    startDate: new Date().setHours(0, 0, 0, 0),
    endDate: endDate,
  });

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

  const getRides = async () => {
    const response = await getData("/ride/rides", false);
    if (response) {
      let rides = response.map((item) => ({
        id: item._id,
        item: item.rideName,
      }));
      return rides;
    }
  };

  // filter bookings
  const filterBookings = () => {
    let res = bookings.filter((booking) => rideDetails === booking.ride_id._id);
    setfilterList(res);
  };

  // clear filter
  const handleClearFilter = () => {
    setdate({
      startDate: new Date(),
      endDate: endDate,
    });

    setrideDetails(null);
  };

  // api calls
  const apiCall = async () => {
    setloading(true);
    const ridesPromise = getRides();
    const bookingsPromise = getBookings();

    const [rides, bookings] = await Promise.all([
      ridesPromise,
      bookingsPromise,
    ]);
    setrides(rides);
    setbookings(bookings);
    setfilterList(bookings);

    setrideDetails(null);
    setloading(false);
  };
  useEffect(() => {
    apiCall();
  }, [date, isnotConfirmedFilter]);

  useEffect(() => {
    if (!isnotConfirmedFilter.isFilter) filterBookings();
  }, [rideDetails]);

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
          <div className="filter">
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
              title={"Select ride"}
              items={rides}
              // initialSelection={locationsFrom}
              selectedItem={(e) => {
                setrideDetails(e.length > 0 ? e[0].id : "");
              }}
            />
            {/* <DatePicker
              className="date-picker"
              selected={time}
              placeholderText="Select Time"
              onChange={(date) => {
                settime(date);
              }}
              showTimeSelect
              showTimeSelectOnly
              timeCaption="Time"
              timeIntervals={15}
              dateFormat="h:mm aa"
              customInput={<CustomDatepicker />}
            /> */}
            <DatePicker
              className="date-picker"
              // selected={time}
              onChange={(dates) => {
                const [start, end] = dates;
                setdate({
                  startDate: start,
                  endDate: end,
                });
              }}
              startDate={date.startDate}
              endDate={date.endDate}
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
                <div className="main-container">
                  <div>
                    <div className="name">Name: {booking.user_id.name}</div>
                    <div>Phone: {booking.user_id.phone}</div>
                  </div>
                  <div>
                    <div className={`status`}>
                      Status:{" "}
                      <span className={`${booking.status}`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="price">
                      Price: <span>${booking.price}</span>
                    </div>
                  </div>
                </div>
                <div className="ride-name">
                  Ride Name: {booking.ride_id.rideName}
                </div>
                <div className="date">
                  Scheduled for:{" "}
                  {moment(booking.ScheduledToTime).format(
                    "DD/MM/YYYY  hh:mm A"
                  )}
                </div>
                <div className="from">
                  Pickup:{" "}
                  {booking.from.location_id._id === WithInPickUpArea
                    ? booking.from.customLocation
                    : booking.from.location_id.location}{" "}
                  <span className="city-name">{` (${booking.from.city_id.city})`}</span>
                </div>
                <div className="to">
                  Dropoff:{" "}
                  {booking.to.location_id._id === WithInPickUpArea
                    ? booking.to.customLocation
                    : booking.to.location_id.location}
                  <span className="city-name">
                    {" "}
                    {` (${booking.to.city_id.city})`}
                  </span>
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
