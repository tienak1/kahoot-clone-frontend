import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAllGroup } from "../../actions/group";
import GroupList from "../../components/GroupList/GroupList";
import "../../assets/scss/components/Group.scss";
import GroupCreate from "../../components/GroupCreate/GroupCreate";
import GroupDetail from "../../components/GroupDetail/GroupDetail";
import ListUser from "../../components/ListUser/ListUser";

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
            <div className="page-contents w-100">
              <div className="row">
                <div className="col-12">
                  <GroupDetail />
                </div>
              </div>
            </div>
          </div>
          <label className="nav" htmlFor="contact">
            <span>Add Member</span>
          </label>
        </div>
      </div>

      {/* TEST THỬ ĐI NÈ  */}
    </div>
  );
}
