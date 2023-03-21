import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  let [authMode, setAuthMode] = useState("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(["access_token"]);
  // const [loginStatus, setLoginStatus] = useState("")
  const [errorMessage, setErrorMessage] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  // OnSubmit register Form
  const onSubmitRegister = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://recipe-mernurl.herokuapp.com/auth/register", {
        // await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
    } catch (error) {
      console.error("registererror", error);
    }
  };

  // OnSubmit Login Form
  const onSubmitLogin = async (event, req, res) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://recipe-mernurl.herokuapp.com/auth/login",
        {
          //const response = await axios.post("http://localhost:3001/auth/login", {
          username,
          password,
        }
      );
      // console.log("userIDAUTH46", response);
      if (!response.data.userID) {
        //setLoginStatus(false)
        // console.log("Data ", response.data);
        // console.log("Status ", response.status);
        // console.log("Headers ", response.headers);

        setErrorMessage(response.data.message);
        navigate("/auth");
      } else {
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/");
        //res.send(response.data);
      }
    } catch (error) {
      console.log("loginerror", error);
      // console.log("loginmessage", res.message);
      //return res.status(401).send(error.message);
    }
  };

  // onClick Password
  const onSubmitPassword = async (event) => {
    // event.preventDefault()
    setShow(true)
  }

  if (authMode === "signup") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={onSubmitLogin}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Login</h3>
            <div className="form-group mt-3">
              <label>User name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="User name"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2" onClick={onSubmitPassword}>
              Forgot{" "}
              <a href="https://media.tenor.com/M3MEScrStf4AAAAM/the-big-short-fuck.gif" allowFullScreen alt="funny GIF" style={{ fontSize: 16 }}>
                password?
              </a>
            </p>
          </div>
          <div className="errorMessage">{errorMessage}</div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={onSubmitRegister}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          {/* <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                        />
                    </div> */}
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot{" "}
            <a href="##" style={{ fontSize: 16 }}>
              password?
            </a>
          </p>
        </div>
        {/* <div className="errorMessage">{errorMessage}</div> */}
      </form>
    </div>
  );
};
