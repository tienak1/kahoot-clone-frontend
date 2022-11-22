import React, { Component } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

export default class NavbarTemplate extends Component {
  render() {
    return (
      <div>
        <header
          className="bg-white text-dark p-3 nav"
          style={{
            fontWeight: "bold",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
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
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-link bg-white text-dark" : "nav-link"
            }
          >
            Login
          </NavLink>
        </header>
        <div className="content" style={{}}>
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  }
}
