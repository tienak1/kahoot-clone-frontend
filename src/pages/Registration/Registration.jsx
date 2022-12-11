import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { connect } from "react-redux";
import { register } from "../../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 8 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 8 and 40 characters.
      </div>
    );
  }
};

const vconfirmPassword = (value, props, components) => {
  const password = components.undefined[3];
  if (password && value !== password.value) {
    return (
      <div className="alert alert-danger" role="alert">
        The passwords do not match.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

    this.state = {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      successful: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
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

  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(
            this.state.username,
            this.state.name,
            this.state.email,
            this.state.password
          )
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  render() {
    const { message } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-11 col-sm-11 col-md-9 col-lg-7 col-xl-6">
            <div
              className="card qz-card qz-card-rounded qz-card-shadow my-4 mx-4 p-5"
              style={{ margin: "0 auto", border: "none" }}
            >
              <h3>Sign up.</h3>
              <Form
                onSubmit={this.handleRegister}
                ref={(c) => {
                  this.form = c;
                }}
              >
                <div className="form-group my-3">
                  <label className="qz-form-label" htmlFor="inputUsername">
                    Choose username
                  </label>
                  <Input
                    type="text"
                    formcontrolname="username"
                    className="form-control qz-text-input"
                    id="inputUsername"
                    placeholder="Your username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>
                <div className="form-group my-3">
                  <label className="qz-form-label" htmlFor="inputName">
                    Your name
                  </label>
                  <Input
                    type="name"
                    formcontrolname="name"
                    className="form-control qz-text-input"
                    id="inputName"
                    placeholder="name of user"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[required]}
                  />
                </div>
                <div className="form-group my-3">
                  <label className="qz-form-label" htmlFor="inputEmail">
                    Your e-mail
                  </label>
                  <Input
                    type="email"
                    formcontrolname="email"
                    className="form-control qz-text-input"
                    id="inputEmail"
                    placeholder="name@domain.com"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>
                <div className="form-group my-3">
                  <label className="qz-form-label" htmlFor="inputPassword">
                    Password
                  </label>
                  <Input
                    type="password"
                    formcontrolname="password"
                    className="form-control qz-text-input"
                    id="inputPassword"
                    placeholder="at least 8 characters"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <div className="form-group my-3">
                  <label
                    className="qz-form-label"
                    htmlFor="inputConfirmPassword"
                  >
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    formcontrolname="confirmPassword"
                    className="form-control qz-text-input"
                    id="inputConfirmPassword"
                    placeholder="at least 8 characters"
                    value={this.state.confirmPassword}
                    onChange={this.onChangeConfirmPassword}
                    validations={[required, vconfirmPassword]}
                  />
                </div>
                <div className="form-group my-3">
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
                {message && (
                  <div className="form-group">
                    <div
                      className={
                        this.state.successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
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
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
