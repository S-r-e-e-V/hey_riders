import React from "react";

import { useLocation } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import UserHeader from "./UserHeader";

const Header = () => {
  const location = useLocation();
  console.log(location);
  return location.pathname.split("/")[1] === "admin" ? (
    <AdminHeader />
  ) : (
    <UserHeader />
  );
};

export default Header;
