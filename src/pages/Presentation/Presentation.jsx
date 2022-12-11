import React from "react";
import ListPresentation from "../../components/ListPresentation/ListPresentation";
import ModalPresentation from "../../components/ModalPresentation/ModalPresentation";

export default function Presentation() {
  return (
    <div className="container py-4">
      <div className="row mt-3">
        <h5>My Presentation</h5>
      </div>
      <div className="row my-4">
        <div className="col-3">
          <button
            className="p-2"
            style={{
              backgroundColor: "#196CFF",
              color: "#fff",
              border: "1px solid #196CFF",
              borderRadius: "2px",
              textDecoration: "none",
            }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="fa fa-plus p-1"></i>
            New Presentation
          </button>
        </div>
      </div>
      {/* List Presentation  */}
      <ListPresentation />
      {/* List Presentation  */}
      <ModalPresentation />
    </div>
  );
}
