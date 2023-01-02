import React, { Component } from "react";
import { connect } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "../../assets/scss/components/NavbarTemplate.scss";

class NavbarTemplate extends Component {
  menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
  }
  render() {
    let isLoggedIn = false;
    if (localStorage.getItem("user")) isLoggedIn = true;
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
            {!isLoggedIn ? (
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "nav-link bg-white text-dark" : "nav-link"
                }
              >
                Sign Up
              </NavLink>
            ) : (
              ""
            )}
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
            {isLoggedIn ? (
              <NavLink to="/games/joingame" className="btn-play">
                Play
              </NavLink>
            ) : (
              ""
            )}
            {isLoggedIn ? (
              <div className="user-wrapper">
                <div class="dropdown">
                  <button class="dropbtn">Dropdown</button>
                  <div class="dropdown-content">
                    <a href="/">My Profile</a>
                    <NavLink to="/myquizes">Create Presentation</NavLink>
                    <NavLink to="/group">My Group</NavLink>
                    <NavLink
                      href="/"
                      onClick={() => {
                        localStorage.removeItem("user");
                        window.location.href = "http://localhost:3000";
                      }}
                    >
                      Log Out
                    </NavLink>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
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
