import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// context
import { AuthContext } from "../context/AuthContext";

// screens
import Home from "../screens/Home";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Header from "../components/Header";
import Contact from "../screens/Contact";
import About from "../screens/About";
import Schedule from "../screens/Schedule";
import ScheduleDetails from "../screens/ScheduleDetails";
import OurServices from "../screens/Ourservices";
import AdminLogin from "../screens/Admin/Login/AdminLogin";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import AdminBookings from "../screens/Admin/Bookings/AdminBookings";
import AdminCities from "../screens/Admin/Cities/AdminCities";
import AdminLocations from "../screens/Admin/Locations/AdminLocations";
import AdminPrice from "../screens/Admin/Price/AdminPrice";

export default function Router() {
  const { isAuthenticated, setisAuthenticated } = useContext(AuthContext);
  return (
    <BrowserRouter>
      {location.pathname.split("/")[1] === "admin" ? (
        <AdminHeader />
      ) : (
        <Header />
      )}
      {isAuthenticated ? (
        <Routes>
          <Route exact path="/schedule" element={<Schedule />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/schedule-details" element={<ScheduleDetails />} />
          <Route exact path="/ourservices" element={<OurServices />} />
        </Routes>
      ) : (
        <Routes>
          {/* admin */}
          <Route exact path="/admin/heyrides" element={<AdminLogin />} />
          <Route exact path="/admin/bookings" element={<AdminBookings />} />
          <Route exact path="/admin/cities" element={<AdminCities />} />
          <Route exact path="/admin/locations" element={<AdminLocations />} />
          <Route exact path="/admin/price" element={<AdminPrice />} />

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
