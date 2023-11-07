import React, { useContext } from "react";

// import { useLocation } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import UserHeader from "./UserHeader";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  // const location = useLocation();
  const { authDetails } = useContext(AuthContext);

  // return location.pathname.split("/")[1] === "admin" ? (
  //   <AdminHeader />
  // ) : (
  //   <UserHeader />
  // );

  return authDetails.type === "admin" ? <AdminHeader /> : <UserHeader />;
};

export default Header;
