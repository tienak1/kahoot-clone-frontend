import React, { Component } from "react";
import { connect } from "react-redux";
import { Outlet, NavLink, Navigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

class NavbarTemplate extends Component {
  render() {
    let { isLoggedIn } = this.props;
    return (
      <div>
        <header
          className="bg-white text-dark p-3 nav"
          style={{
            fontWeight: "bold",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            marginTop: "-50px",
          }}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link bg-white text-dark" : "nav-link"
            }
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Kahoot_Logo.svg/2560px-Kahoot_Logo.svg.png"
              alt=""
              width={80}
            />
          </NavLink>

          <div
            className="nav-wrapper"
            style={{
              width: "92%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <NavLink
              to="/play"
              className={({ isActive }) =>
                isActive ? "nav-link bg-white text-dark" : "nav-link"
              }
            >
              Play
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? "nav-link bg-white text-dark" : "nav-link"
              }
            >
              Sign Up
            </NavLink>
            {!isLoggedIn ? (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link bg-white text-dark" : "nav-link"
                }
              >
                Login
              </NavLink>
            ) : (
              ""
            )}
            {/* {isLoggedIn ? (
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link bg-white text-dark text-right"
                    : "nav-link "
                }
              >
                Logout
              </NavLink>
            ) : (
              ""
            )} */}
            {isLoggedIn ? (
              <div className="dropdown">
                <button
                  className="btn btn-create dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Create
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Kahoot!
                    </a>
                  </li>
                  <li>
                    <NavLink
                      to="/creategroup"
                      className={({ isActive }) =>
                        isActive ? "nav-link bg-white text-dark" : "nav-link"
                      }
                    >
                      Group
                    </NavLink>
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}
            {isLoggedIn ? (
              <div
                className="user-wrapper"
                style={{
                  marginLeft: "12px",
                  fontSize: "20px",
                  backgroundColor: "rgb(19, 104, 206)",
                  padding: "6px 12px",
                  borderRadius: "50%",
                  color: "#fff",
                }}
              >
                <i className="fa-solid fa-user"></i>
              </div>
            ) : (
              ""
            )}
            {isLoggedIn ? (
              <button
                className="text-white bg-dark"
                style={{
                  margin: "0 10px",
                  padding: "10px 20px",
                  borderRadius: "30px",
                }}
                onClick={() => {
                  localStorage.removeItem("user");
                  return <Navigate to="/" />;
                }}
              >
                Log Out
              </button>
            ) : (
              ""
            )}

            {/* Presentation Button  */}
            <NavLink
              to="/myquizes"
              className="p-2"
              style={{
                backgroundColor: "#196CFF",
                color: "#fff",
                border: "1px solid #196CFF",
                borderRadius: "2px",
                textDecoration: "none",
              }}
            >
              My Presentation
            </NavLink>
            {/* Presentation Button  */}
          </div>
        </header>
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(NavbarTemplate);
