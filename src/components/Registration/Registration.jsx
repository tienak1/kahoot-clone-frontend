import React from "react";

export default function Registration() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-11 col-sm-11 col-md-9 col-lg-7 col-xl-6">
          {/* ALERT  */}
          {/* <div
            className="alert alert-danger alert-dismissible fade show mx-4"
            role="alert"
          >
            <h4 className="alert-heading">Error!</h4>
            <p>error_message</p>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div
            className="alert alert-success alert-dismissible fade show mx-4 qz-border qz-rounded-corner qz-card-shadow"
            role="alert"
          >
            <h4 className="alert-heading">Success!</h4>
            <p>Welcome to quizzards!</p>
            <p>You will be automatically redirected to login page...</p>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div> */}
          <div
            className="card qz-card qz-card-rounded qz-card-shadow my-4 mx-4 p-5"
            style={{ margin: "0 auto", border: "none" }}
          >
            <h3>Sign up.</h3>
            <form>
              <div className="form-group my-3">
                <label className="qz-form-label" htmlFor="inputUsername">
                  Choose username
                </label>
                <input
                  type="text"
                  formcontrolname="username"
                  className="form-control qz-text-input"
                  id="inputUsername"
                  placeholder="Your username"
                />
                {/* <div>
                  <small className="text-danger mx-2">
                    Username is required.
                  </small>
                </div> */}
              </div>
              <div className="form-group my-3">
                <label className="qz-form-label" htmlFor="inputName">
                  Your name
                </label>
                <input
                  type="name"
                  formcontrolname="name"
                  className="form-control qz-text-input"
                  id="inputName"
                  placeholder="name of user"
                />
                {/* <div>
                  <small className="text-danger mx-2">
                    E-mail ID is required.
                  </small>
                  <small className="text-danger mx-2">
                    Enter valid E-mail ID.
                  </small>
                </div> */}
              </div>
              <div className="form-group my-3">
                <label className="qz-form-label" htmlFor="inputEmail">
                  Your e-mail
                </label>
                <input
                  type="email"
                  formcontrolname="email"
                  className="form-control qz-text-input"
                  id="inputEmail"
                  placeholder="name@domain.com"
                />
                {/* <div>
                  <small className="text-danger mx-2">
                    E-mail ID is required.
                  </small>
                  <small className="text-danger mx-2">
                    Enter valid E-mail ID.
                  </small>
                </div> */}
              </div>
              <div className="form-group my-3">
                <label className="qz-form-label" htmlFor="inputPassword">
                  Password
                </label>
                <input
                  type="password"
                  formcontrolname="password"
                  className="form-control qz-text-input"
                  id="inputPassword"
                  placeholder="at least 8 characters"
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
              <div className="form-group my-3">
                <label className="qz-form-label" htmlFor="inputConfirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  formcontrolname="confirmPassword"
                  className="form-control qz-text-input"
                  id="inputConfirmPassword"
                  placeholder="at least 8 characters"
                />
                {/* <div>
                  <small className="text-danger mx-2">
                    Confirm Password is required.
                  </small>
                  <small className="text-danger mx-2">
                    Password must be at least 8 characters.
                  </small>
                </div>
                <small className="text-danger mx-2">
                  Passwords do not match.
                </small> */}
              </div>
              <div className="form-group my-3">
                <label className="qz-form-label">I am a</label>
                <div className="px-4">
                  <div className="form-check form-check-inline mr-5">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="studentRadio"
                      formcontrolname="role"
                      defaultValue="student"
                    />
                    <label className="form-check-label" htmlFor="studentRadio">
                      Student
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="teacherRadio"
                      formcontrolname="role"
                      defaultValue="teacher"
                    />
                    <label className="form-check-label" htmlFor="teacherRadio">
                      Teacher
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="teacherRadio"
                      formcontrolname="role"
                      defaultValue="assistant"
                    />
                    <label className="form-check-label" htmlFor="teacherRadio">
                      Assistant
                    </label>
                  </div>
                  {/* <div>
                    <small className="text-danger mx-2">
                      You must select role.
                    </small>
                  </div> */}
                </div>
                <div className="mt-3 float-right">
                  <p>
                    Already Registered?&nbsp;{" "}
                    <a className="font-weight-bold" href="/login">
                      Go to Login
                    </a>
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-success mt-4 btn-block w-100"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
