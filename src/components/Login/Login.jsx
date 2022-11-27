import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import GoogleLogin from "react-google-login";

export default function Login() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dataLogin = {
    email,
    password,
  };
  const pass = (googleData) => {
    console.log(googleData);
  };
  const failure = (googleData) => console.log(googleData);
  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
  return (
    <div className="container-fluid" style={{ backgroundColor: "#eaeaea" }}>
      <div className="row">
        <div
          className="card qz-card qz-card-rounded qz-card-shadow w-25 p-3 "
          style={{
            margin: "0 auto",
            border: "none",
            borderRadius: "0px",
            marginTop: "0.5%",
            marginBottom: "0.5%",
          }}
        >
          <h3 className="text-center" style={{ fontWeight: "bold" }}>
            Log in
          </h3>
          <form>
            <div className="form-group my-3">
              <label className="qz-form-label" htmlFor="exampleInputEmail1">
                Your e-mail
              </label>
              <input
                type="email"
                formcontrolname="email"
                className="form-control qz-text-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="name@domain.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <div>
                <small className="text-danger mx-2">ID is required</small>
                <small className="text-danger mx-2">
                  Enter valid E-mail ID.
                </small>
              </div> */}
            </div>
            <div className="form-group">
              <label className="qz-form-label" htmlFor="exampleInputPassword1">
                Password
              </label>
              <input
                type="password"
                formcontrolname="password"
                className="form-control qz-text-input"
                id="exampleInputPassword1"
                placeholder="at least 6 characters"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <div>
                <small className="text-danger mx-2">
                  Password is required.
                </small>
                <small className="text-danger mx-2">
                  Password must be at least 8 characters.
                </small>
              </div> */}
            </div>

            <button type="button" className="btn btn-success w-100 mt-4">
              Log in
            </button>
            <h6 className="text-center my-2">or</h6>
            <button
              type="submit"
              className="btn btn-white w-100"
              // style={{ border: "1px solid black" }}
            >
              {loginData ? (
                <div>
                  <h3>You logged in as {loginData.email}</h3>
                  <button>Log Out</button>
                </div>
              ) : (
                <GoogleLogin
                  clientId="288813152175-ncbjomls3niek02psr1pn6kogln59m63.apps.googleusercontent.com"
                  buttonText="Continue with Google"
                  onSuccess={pass}
                  onFailure={failure}
                  cookiePolicy={"single_host_origin"}
                />
              )}
            </button>

            <div className="mt-3 float-right text-center">
              <p>
                Don't have an account?&nbsp;
                <a className="font-weight-bold" href="/signup">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
