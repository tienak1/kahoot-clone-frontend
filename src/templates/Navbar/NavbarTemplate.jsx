import React, { Component } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

export default class NavbarTemplate extends Component {
  render() {
    return (
      <div>
        <header className="bg-dark text-white p-3 nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link bg-white text-dark" : "nav-link"
            }
          >
            Home
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
        <div className="content" style={{ minHeight: "75vh" }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  }
}
