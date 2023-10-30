import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// context
import { AuthContext } from "../context/AuthContext";

// screens
import Home from "../screens/Home";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Contact from "../screens/Contact";
import About from "../screens/About";
import Schedule from "../screens/Schedule";
import ScheduleDetails from "../screens/ScheduleDetails";
import OurServices from "../screens/Ourservices";
import AdminBookings from "../screens/Admin/Bookings";
import AdminCities from "../screens/Admin/Cities";
import AdminLocations from "../screens/Admin/Locations";
import AdminPrice from "../screens/Admin/Price";
import AddCity from "../screens/Admin/AddCity";
import AddLocation from "../screens/Admin/AddLocation";
import AddPrice from "../screens/Admin/AddPrice";
import Header from "../components/Header";

function Router() {
  const { authDetails, setauthDetails } = useContext(AuthContext);

  useEffect(() => {
    let heyRidesAuth = localStorage.getItem("hey_rides_auth")
      ? JSON.parse(localStorage.getItem("hey_rides_auth"))
      : null;

    heyRidesAuth
      ? setauthDetails({
          type: heyRidesAuth.userType,
          isAuthenticated: true,
          name: heyRidesAuth.name,
        })
      : setauthDetails({ type: "user", isAuthenticated: false, name: "" });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      {authDetails.isAuthenticated ? (
        <Routes>
          {/* admin */}
          {authDetails.type === "admin" && (
            <>
              <Route exact path="/admin/bookings" element={<AdminBookings />} />
              <Route exact path="/admin/cities" element={<AdminCities />} />
              <Route exact path="/admin/cities/add" element={<AddCity />} />
              <Route
                exact
                path="/admin/locations"
                element={<AdminLocations />}
              />
              <Route
                exact
                path="/admin/locations/add"
                element={<AddLocation />}
              />
              <Route exact path="/admin/price" element={<AdminPrice />} />
              <Route exact path="/admin/price/add" element={<AddPrice />} />
            </>
          )}

          <Route
            exact
            path="/scheduled/from/:from/to/:to/date/:date/adults/:adults/luggage/:luggage"
            element={<Schedule />}
          />
          <Route exact path="/ourservices" element={<OurServices />} />
          <Route exact path="/ourservices" element={<OurServices />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          {/* admin */}
          <Route exact path="/admin/login" element={<Login />} />

          {/* user */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            exact
            path="/scheduled/from/:from/to/:to/date/:date/adults/:adults/luggage/:luggage"
            element={<Schedule />}
          />
          <Route exact path="/ourservices" element={<OurServices />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
export default Router;
