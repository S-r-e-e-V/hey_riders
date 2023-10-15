import React, { useState, useContext } from "react";
import "./Signup.css";

import { useNavigate } from "react-router-dom";

// icons
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

// context
import { AuthContext } from "../../context/AuthContext";

// validation
import {
  MandatoryFieldCheck,
  ValidatePassword,
  ValidateUserName,
} from "../../utils/validation";

export default function Signup() {
  const navigate = useNavigate();
  const { setisAuthenticated } = useContext(AuthContext);

  const [credentials, setcredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    location: "",
  });
  const [error, seterror] = useState({ username: "", password: "" });
  const [passwordVisible, setpasswordVisible] = useState(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false);
  const [loading, setloading] = useState(false);

  // submit
  const handleSubmit = async () => {
    let error = validation();
    console.log(error);
    if (error.username === "" && error.password === "") {
      if (
        credentials.username === "heyriders" &&
        credentials.password === "Qwerty@123"
      ) {
        setisAuthenticated(true);
      }
      // setloading(true);
      // let payload = {
      //   username: credentials.username,
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
    error.username = ValidateUserName(credentials.username);
    error.confirmPassword = ValidatePassword(credentials.confirmPassword);
    error.location = MandatoryFieldCheck(credentials.location);
    if (credentials.password !== credentials.confirmPassword) {
      error.confirmPassword = "Password is not matching";
    }
    seterror({
      password: error.password,
      username: error.username,
      confirmPassword: error.confirmPassword,
      location: error.location,
    });
    return error;
  };
  return (
    <div className="signup-page">
      <span className="title">Signup</span>
      <form className="login-container">
        <div className="input-container">
          <input
            className={`input ${error.username ? "input-error" : ""}`}
            placeholder="username"
            onChange={(e) =>
              setcredentials({
                ...credentials,
                username: e.target.value.trim(),
              })
            }
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="error">{error.username}</span>
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
        <div className="input-container">
          <input
            className={`input ${error.confirmPassword ? "input-error" : ""}`}
            placeholder="confirm password"
            type={confirmPasswordVisible ? "text" : "password"}
            onChange={(e) =>
              setcredentials({
                ...credentials,
                confirmPassword: e.target.value.trim(),
              })
            }
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="password-icon">
            {confirmPasswordVisible ? (
              <BsEyeSlashFill
                onClick={() => setconfirmPasswordVisible(false)}
              />
            ) : (
              <BsEyeFill onClick={() => setconfirmPasswordVisible(true)} />
            )}
          </span>
          <span className="error">{error.confirmPassword}</span>
        </div>
        <div className="input-container">
          <input
            className={`input ${error.location ? "input-error" : ""}`}
            placeholder="location"
            onChange={(e) =>
              setcredentials({
                ...credentials,
                location: e.target.value.trim(),
              })
            }
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="error">{error.location}</span>
        </div>
        <button onClick={() => handleSubmit()} type="button">
          Login
        </button>
      </form>
    </div>
  );
}
