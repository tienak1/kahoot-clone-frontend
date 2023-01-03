import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAllGroup } from "../../actions/group";
import GroupList from "../../components/GroupList/GroupList";
import "../../assets/scss/components/Group.scss";
import GroupCreate from "../../components/GroupCreate/GroupCreate";

export default function Group() {
  return (
    <div className="container">
      <div className="row">
        <div className="layout">
          <input
            name="nav"
            type="radio"
            className="nav home-radio"
            id="home"
            defaultChecked="checked"
          />
          <div className="page home-page">
            <div className="page-contents">
              <p>
                <GroupList />
              </p>
            </div>
          </div>
          <label className="nav" htmlFor="home">
            <span>My Group</span>
          </label>
          <input name="nav" type="radio" className="about-radio" id="about" />
          <div className="page about-page">
            <div className="page-contents">
              <GroupCreate />
            </div>
          </div>
          <label className="nav" htmlFor="about">
            <span>Create New Group</span>
          </label>
          <input
            name="nav"
            type="radio"
            className="contact-radio"
            id="contact"
          />
          <div className="page contact-page">
            <div className="page-contents">
              <p>
                Eaque accusamus magnam error unde nam, atque provident omnis
                fugiat quam necessitatibus vel nulla sed quibusdam fuga
                veritatis assumenda alias quidem asperiores?
              </p>
            </div>
          </div>
          <label className="nav" htmlFor="contact">
            <span>Contact</span>
          </label>
        </div>
      </div>
    </div>
  );
}
