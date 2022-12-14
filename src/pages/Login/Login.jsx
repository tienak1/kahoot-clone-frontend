import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./Login.module.css";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { login } from "../../actions/auth";

import { GoogleLogin } from "@react-oauth/google";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.email, this.state.password))
        .then(() => {
          history.push("/"); // TODO: redirect to home page
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }
  responseGoogleSuccess = (response) => {
    console.log(response);
    this.setState({ isLoggedIn: true });
  };

  // Error Handler
  responseGoogleError = (response) => {
    console.log(response);
  };
  render() {
    const { isLoggedIn, message } = this.props;

    if (isLoggedIn) {
      return <Navigate to="/" />; // TODO: redirect to home page
    }

    return (
      <div className="container-fluid" style={{ backgroundColor: "#eaeaea" }}>
        <div className="row">
          <div
            className="card qz-card qz-card-rounded qz-card-shadow p-3 "
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
            <Form
              onSubmit={this.handleLogin}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div className="form-group my-3">
                <label className="qz-form-label" htmlFor="exampleInputEmail1">
                  Your e-mail
                </label>
                <Input
                  type="text"
                  formcontrolname="email"
                  className="form-control qz-text-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="name@domain.com"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label
                  className="qz-form-label"
                  htmlFor="exampleInputPassword1"
                >
                  Password
                </label>
                <Input
                  type="password"
                  formcontrolname="password"
                  className="form-control qz-text-input"
                  id="exampleInputPassword1"
                  placeholder="at least 6 characters"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required]}
                />
              </div>

              <button
                disabled={this.state.loading}
                className="btn btn-success w-100 mt-4"
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                Log in
              </button>
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
              <h6 className="text-center my-2">or</h6>
              <GoogleLogin
                onSuccess={this.responseGoogleSuccess}
                onError={this.responseGoogleError}
                useOneTap
              />
              <div className="mt-3 float-right text-center">
                <p>
                  Don't have an account?&nbsp;
                  <a className="font-weight-bold" href="/signup">
                    Sign up
                  </a>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
  };
}

export default connect(mapStateToProps)(Login);
