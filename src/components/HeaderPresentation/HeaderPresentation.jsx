import { Button, FloatButton } from "antd";
import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

export default function HeaderPresentation() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row align-items-center py-2">
        <div className="col-1">
          <Button type="primary" onClick={() => navigate("/presentation")}>
            <i className="fa fa-arrow-left me-2"></i>Back
          </Button>
        </div>
        <div className="col-8">
          <p className="fs-3 mb-0">{params.name}</p>
          <small>created by username</small>
        </div>
        <div className="col-3">
          <button className="btn btn-secondary mx-2">Share</button>
          <button className="btn btn-primary mx-2">Presentation</button>
        </div>
      </div>
    </div>
  );
}
