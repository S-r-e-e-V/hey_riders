import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

// icons
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

// validation
import { ValidatePassword, ValidateEmail } from "../../../utils/validation";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  const [error, seterror] = useState({ email: "", password: "" });
  const [passwordVisible, setpasswordVisible] = useState(false);
  const [loading, setloading] = useState(false);

  // submit
  const handleSubmit = async () => {
    let error = validation();
    console.log(error);
    if (error.email === "" && error.password === "") {
      if (
        credentials.email === "heyrides06@gmail.com" &&
        credentials.password === "Admin@123"
      ) {
        console.log("admin auth");
      }
      // setloading(true);
      // let payload = {
      //   email: credentials.email,
      //   password: credentials.password,
      // };
      // const response = await postData(`/login`, payload, false);
      // if (response) {
      //   console.log(response);
      //   localStorage.setItem("access_token", response.token);
      //   setisAuthenticated(true);
      // }
      // setloading(false);
    }
  };

  // validation
  const validation = () => {
    let error = {};
    error.password = ValidatePassword(credentials.password);
    error.email = ValidateEmail(credentials.email);
    seterror({
      password: error.password,
      email: error.email,
    });
    return error;
  };
  return (
    <div className="login-page">
      <span className="title">Admin Login</span>
      <form className="login-container">
        <div className="input-container">
          <input
            className={`input ${error.email ? "input-error" : ""}`}
            placeholder="email"
            onChange={(e) =>
              setcredentials({
                ...credentials,
                email: e.target.value.trim(),
              })
            }
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="error">{error.email}</span>
        </div>
        <div className="input-container">
          <input
            className={`input ${error.password ? "input-error" : ""}`}
            placeholder="password"
            type={passwordVisible ? "text" : "password"}
            onChange={(e) =>
              setcredentials({
                ...credentials,
                password: e.target.value.trim(),
              })
            }
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="password-icon">
            {passwordVisible ? (
              <BsEyeSlashFill onClick={() => setpasswordVisible(false)} />
            ) : (
              <BsEyeFill onClick={() => setpasswordVisible(true)} />
            )}
          </span>
          <span className="error">{error.password}</span>
        </div>
        {/* <div className="info-text">
          <span
            className="forgot-password-text"
            onClick={() => navigate("/forget-password")}
          >
            Forget password?
          </span>
        </div> */}
        <button onClick={() => handleSubmit()} type="button">
          Login
        </button>
      </form>
    </div>
  );
}
