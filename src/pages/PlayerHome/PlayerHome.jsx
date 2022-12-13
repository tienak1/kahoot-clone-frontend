import React from "react";
import { NavLink } from "react-router-dom";
import "./PlayerHome.module.css";

export default function PlayerHome() {
  return (
    <div
      style={{
        background: "rgb(250,70,101)",
        background:
          "linear-gradient(115deg, rgba(250,70,101,1) 0%, rgba(56,18,114,1) 55%, rgba(56,18,114,1) 93%)",
        width: "100%",
        height: "101vh",
        marginTop: "-50px",
      }}
    >
      <div className="container text-center align-items-center justify-content-center">
        <div
          className="content"
          style={{
            paddingTop: "32vh",
          }}
        >
          <h1 id="title" className="text-white">
            Join a Game
          </h1>
          <form action="/player/">
            <input
              id="name"
              type="text"
              name="name"
              autofocus
              placeholder="Display Name"
              className="form-control my-3"
            />
            <input
              id="pin"
              type="text"
              name="pin"
              placeholder="Game Pin"
              className="form-control my-3"
            />

            <button id="joinButton" className="btn btn-dark">
              Join
            </button>
          </form>
          <br />
          <center>
            <NavLink
              to="/create/"
              id="host"
              style={{
                textDecoration: "none",
              }}
            >
              Click here to host a Kahoot!
            </NavLink>
          </center>
        </div>
      </div>
    </div>
  );
}
