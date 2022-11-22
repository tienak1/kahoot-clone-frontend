import React from "react";

export default function Login() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-9 col-md-7 col-lg-5 col-xl-4">
          <h1
            className="display-4 text-white font-weight-bold text-center mt-5"
            routerlink="/"
            style={{ cursor: "pointer" }}
          >
            Quizzards
          </h1>
          {/* <div
            className="alert alert-danger alert-dismissible fade show mx-4 qz-border qz-rounded-corner qz-card-shadow"
            role="alert"
          >
            <h4 className="alert-heading">Error!</h4>
            <p>Error</p>
            <button
              type="button"
              className="close btn btn-danger"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true" style={{ fontSize: "30px" }}>
                ×
              </span>
            </button> */}
        </div>
        <div className="card qz-card qz-card-rounded qz-card-shadow mt-2 mx-4 p-5">
          <h3>Log in.</h3>
          <p className="mb-4">Hello there! login to continue...</p>
          <form>
            <div className="form-group">
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
              />
              <div>
                <small className="text-danger mx-2">ID is required</small>
                <small className="text-danger mx-2">
                  Enter valid E-mail ID.
                </small>
              </div>
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
                placeholder="at least 8 characters"
              />
              <div>
                <small className="text-danger mx-2">
                  Password is required.
                </small>
                <small className="text-danger mx-2">
                  Password must be at least 8 characters.
                </small>
              </div>
            </div>
            <div className="mt-3 float-right">
              <p>
                Not registered yet?&nbsp;
                <a className="font-weight-bold" routerlink="/register">
                  Create Account
                </a>
              </p>
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-5 btn-block qz-btn qz-bg-blue"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
