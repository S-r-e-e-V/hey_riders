import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const value = {
    isAuthenticated,
    setisAuthenticated,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
